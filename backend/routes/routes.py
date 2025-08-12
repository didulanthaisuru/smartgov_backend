from fastapi import APIRouter
from .auth import router as auth_router

# Main router that includes all route modules
api_router = APIRouter()


api_router.include_router(auth_router)
