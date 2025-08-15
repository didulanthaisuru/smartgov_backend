from fastapi import APIRouter

# Import all API routers
from .auth import router as auth_router
from .admin import router as admin_router  # Commented out due to missing dependencies
#from .admin_portal import router as admin_portal_router
from .dashboard import router as dashboard_router
from .appoinment import router as appointment_router
from .document import router as document_router
from .insights import router as insights_router
from .insights_derect import router as insights_direct_router
from .qr_scanner import router as qr_scanner_router
#rom .user import router as user_router
from .user_appointment_get import router as user_appointment_get_router
from .admin_appointment_updates import router as admin_appointment_updates_router
from .admin_dashboard import router as admin_dashboard_router

# Create main API router
api_router = APIRouter()

# Include all routers
api_router.include_router(auth_router)
api_router.include_router(admin_router)  # Commented out due to missing dependencies
#api_router.include_router(admin_portal_router)
api_router.include_router(dashboard_router)
api_router.include_router(appointment_router)
api_router.include_router(document_router)
api_router.include_router(insights_router)
api_router.include_router(insights_direct_router)
api_router.include_router(qr_scanner_router)
#pi_router.include_router(user_router)
api_router.include_router(user_appointment_get_router)
api_router.include_router(admin_appointment_updates_router)
api_router.include_router(admin_dashboard_router)



# api_router.include_router(health_router, tags=["Health Check"])
# api_router.include_router(utility_router, tags=["Utilities"])
