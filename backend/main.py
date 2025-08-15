from fastapi import FastAPI, HTTPException
from database_config import connect_to_mongo, close_mongo_connection
from routes.routes import api_router
from fastapi.middleware.cors import CORSMiddleware

import stripe
from pydantic import BaseModel

stripe.api_key = "sk_test_51RwId9Agvx5HIouQNwqI5N51tJR0Xd53CxTAdRT6zBwqhSSkFamyYygq5txef9AuWsiDbBMzxreWV78vBgkSDyoh00rYqRORiy"

# Create FastAPI app
app = FastAPI(
    title="SmartGov API",
    description="Government Services Management System",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "message": "SmartGov API is running",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "SmartGov Backend"}

class PaymentRequest(BaseModel):
    amount: int  # amount in cents

@app.post("/create-payment-intent")
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

# Include API routes
app.include_router(api_router, prefix="/api/v1")
