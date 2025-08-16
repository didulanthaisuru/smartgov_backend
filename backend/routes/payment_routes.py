# =============================================================================
# PAYMENT ROUTES
# =============================================================================

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import stripe

# Create router
router = APIRouter(tags=["Payment"])

# Stripe Configuration
stripe.api_key = "sk_test_51RwId9Agvx5HIouQNwqI5N51tJR0Xd53CxTAdRT6zBwqhSSkFamyYygq5txef9AuWsiDbBMzxreWV78vBgkSDyoh00rYqRORiy"

class PaymentRequest(BaseModel):
    amount: int  # amount in cents

class PaymentResponse(BaseModel):
    clientSecret: str
    status: str = "success"

@router.post("/create-payment-intent", response_model=PaymentResponse)
def create_payment_intent(request: PaymentRequest):
    """Create a Stripe payment intent."""
    try:
        intent = stripe.PaymentIntent.create(
            amount=request.amount,
            currency="usd",
            automatic_payment_methods={"enabled": True},
        )
        return PaymentResponse(clientSecret=intent["client_secret"])
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/payment/health")
def payment_health_check():
    """Check payment service health."""
    try:
        # Test Stripe connection
        stripe.PaymentIntent.list(limit=1)
        return {
            "status": "healthy",
            "service": "SmartGov Payment",
            "provider": "Stripe",
            "currency": "usd"
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "service": "SmartGov Payment",
            "error": str(e)
        }
