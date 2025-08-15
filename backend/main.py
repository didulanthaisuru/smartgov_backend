
"""
SmartGov API with WebSocket Support

This application integrates FastAPI with Socket.IO for real-time chat functionality.
The architecture uses Starlette to mount both FastAPI and Socket.IO applications:

- FastAPI: Handles HTTP API endpoints at root path "/"
- Socket.IO: Handles WebSocket connections at "/socket.io"

WebSocket Events Supported:
- connect/disconnect: Connection management
- join_room/leave_room: Room management
- send_message: Real-time messaging
- typing: Typing indicators
- mark_read: Message read status
- get_online_users: User presence
- heartbeat: Connection keep-alive
- get_connection_info: Connection details

API Endpoints:
- /api/chat/*: Chat-related HTTP endpoints
- /websocket/health: WebSocket health check
- /api/chat/test: WebSocket test endpoint
"""

from fastapi import FastAPI, HTTPException
from starlette.applications import Starlette

from fastapi.middleware.cors import CORSMiddleware

from database_config import connect_to_mongo, close_mongo_connection, collection_users, db
from routes.routes import api_router

import stripe
from pydantic import BaseModel


from routes import chat_web_socket as chat_web_socket_routes
from services import chat_web_socket

stripe.api_key = "sk_test_51RwId9Agvx5HIouQNwqI5N51tJR0Xd53CxTAdRT6zBwqhSSkFamyYygq5txef9AuWsiDbBMzxreWV78vBgkSDyoh00rYqRORiy"

# Create FastAPI app
fastapi_app = FastAPI(
    title="SmartGov API",
    description="Government Services Management System",
    version="1.0.0"
)

# Add CORS middleware
fastapi_app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Socket.IO under FastAPI so FastAPI startup/shutdown events run reliably
# Build a root Starlette app and mount socket.io separately to avoid double CORS headers
root_app = Starlette()
root_app.mount("/socket.io", chat_web_socket.socket_app)
root_app.mount("/", fastapi_app)

# Export the root app
app = root_app

@fastapi_app.get("/")
def read_root():
    return {
        "message": "SmartGov API is running",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc"
    }

@fastapi_app.get("/health")
def health_check():
    return {"status": "healthy", "service": "SmartGov Backend"}

@fastapi_app.get("/websocket/health")
async def websocket_health_check():
    """Check WebSocket server health and status."""
    try:
        # Get active connections count
        active_count = len(chat_web_socket.active_connections)
        
        return {
            "status": "healthy",
            "service": "SmartGov WebSocket",
            "active_connections": active_count,
            "socket_io_path": "/socket.io",
            "server_info": {
                "async_mode": "asgi",
                "cors_enabled": True,
                "logger_enabled": True
            }
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "service": "SmartGov WebSocket",
            "error": str(e),
            "active_connections": 0
        }

class PaymentRequest(BaseModel):
    amount: int  # amount in cents

@fastapi_app.post("/create-payment-intent")
def create_payment_intent(request: PaymentRequest):
    try:
        intent = stripe.PaymentIntent.create(
            amount=request.amount,
            currency="usd",
            automatic_payment_methods={"enabled": True},
        )
        return {"clientSecret": intent["client_secret"]}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Include chat_web_socket routes
fastapi_app.include_router(chat_web_socket_routes.router, prefix="/api")

# Include API routes
fastapi_app.include_router(api_router, prefix="/api/v1")

@fastapi_app.on_event("startup")
async def on_startup():
    # Connect to Mongo and ensure indexes that our services expect
    await connect_to_mongo()
    try:
        if collection_users is not None:
            # Ensure async index creation (Motor) to avoid sync PyMongo calls in import time
            await collection_users.create_index("email", unique=True)
            await collection_users.create_index("nic", unique=True)
        if db is not None:
            admins = db["admins"]
            await admins.create_index("email", unique=True)
            await admins.create_index("admin_id", unique=True)
    except Exception as e:
        # Log and continue; app can still run without indexes in dev
        print(f"Index creation warning: {e}")

@fastapi_app.on_event("shutdown")
async def on_shutdown():
    await close_mongo_connection()

