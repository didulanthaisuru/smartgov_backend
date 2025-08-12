from fastapi import APIRouter
from .auth import router as auth_router

# Main router that includes all route modules
api_router = APIRouter()

# Include authentication routes
api_router.include_router(auth_router)

# You can add more routers here as you build more features
# api_router.include_router(services_router)
# api_router.include_router(bookings_router)