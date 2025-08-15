from fastapi import FastAPI
from database_config import connect_to_mongo, close_mongo_connection, collection_users, db

from routes.dashboard import router as dashboard_router

from routes.appoinment import router as appointment_router
from routes.document import router as document_router
from routes.insights import router as insights_router
from routes.insights_derect import router as insights_direct_router


from routes.routes import api_router
from config import settings
from fastapi.middleware.cors import CORSMiddleware
from routes.routes import api_router

from routes import chat as chat_routes
from services import chat_service
from starlette.applications import Starlette

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


fastapi_app.include_router(chat_routes.router, prefix="/api")

# Mount Socket.IO under FastAPI so FastAPI startup/shutdown events run reliably
# Build a root Starlette app and mount socket.io separately to avoid double CORS headers
root_app = Starlette()
root_app.mount("/socket.io", chat_service.socket_app)
root_app.mount("/", fastapi_app)

# Ensure DB connect/index creation when mounted under Starlette (FastAPI startup won't fire)
@root_app.on_event("startup")
async def root_startup():
    await connect_to_mongo()
    try:
        if collection_users is not None:
            await collection_users.create_index("email", unique=True)
            await collection_users.create_index("nic", unique=True)
        if db is not None:
            admins = db["admins"]
            await admins.create_index("email", unique=True)
            await admins.create_index("admin_id", unique=True)
    except Exception as e:
        print(f"Index creation warning (root): {e}")

@root_app.on_event("shutdown")
async def root_shutdown():
    await close_mongo_connection()

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
