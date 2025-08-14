from fastapi import APIRouter

# Import all API routers
from .auth import router as auth_router
from .admin import router as admin_router
#from .admin_portal import router as admin_portal_router
from .dashboard import router as dashboard_router
from .appoinment import router as appointment_router
from .document import router as document_router
from .insights import router as insights_router

# Create main API router
api_router = APIRouter()

api_router.include_router(auth_router, tags=["Authentication"])

api_router.include_router(admin_router, tags=["Admin Authentication"])
#api_router.include_router(admin_portal_router, tags=["Admin Portal"])

api_router.include_router(dashboard_router, tags=["Dashboard Services"])

api_router.include_router(appointment_router, tags=["Appointments"])

api_router.include_router(document_router, tags=["Documents"])

api_router.include_router(insights_router, tags=["Analytics & Insights"])

# api_router.include_router(health_router, tags=["Health Check"])
# api_router.include_router(utility_router, tags=["Utilities"])
