from fastapi import APIRouter
from .auth import router as auth_router
from .admin import router as admin_router

# Main router that includes all route modules
api_router = APIRouter()

# Include authentication routes
api_router.include_router(auth_router)  # User authentication
api_router.include_router(admin_router)  # Admin authentication
