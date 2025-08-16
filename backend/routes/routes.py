from fastapi import APIRouter

# =============================================================================
# IMPORT ALL API ROUTERS
# =============================================================================

# Authentication & Authorization
from .auth import router as auth_router
from .admin import router as admin_router  # Commented out due to missing dependencies

# Core Service Routes
from .dashboard import router as dashboard_router
from .appoinment import router as appointment_router
from .document import router as document_router

# Analytics & Insights
from .insights import router as insights_router
from .insights_derect import router as insights_direct_router

# Utility Services
from .qr_scanner import router as qr_scanner_router
from .rating import router as rating_router

# User Management
from .user_appointment_get import router as user_appointment_get_router
from .user_profile import router as user_profile_router

# Admin Management
from .admin_appointment_updates import router as admin_appointment_updates_router
from .admin_dashboard_full import router as admin_dashboard_full_router

# WebSocket & Payment Services
from .websocket_routes import router as websocket_router
from .payment_routes import router as payment_router

# =============================================================================
# CREATE MAIN API ROUTER
# =============================================================================
api_router = APIRouter()

# =============================================================================
# INCLUDE ALL ROUTERS
# =============================================================================

# Authentication & Authorization
api_router.include_router(auth_router)
# api_router.include_router(admin_router)  # Commented out due to missing dependencies

# Core Service Routes
api_router.include_router(dashboard_router)
api_router.include_router(appointment_router)
api_router.include_router(document_router)

# Analytics & Insights
api_router.include_router(insights_router)
api_router.include_router(insights_direct_router)

# Utility Services
api_router.include_router(qr_scanner_router)
api_router.include_router(rating_router)

# User Management
api_router.include_router(user_appointment_get_router)
api_router.include_router(user_profile_router)

# Admin Management
api_router.include_router(admin_appointment_updates_router)
api_router.include_router(admin_dashboard_full_router)

# WebSocket & Payment Services
api_router.include_router(websocket_router)
api_router.include_router(payment_router)

# =============================================================================
# FUTURE ROUTERS (COMMENTED OUT)
# =============================================================================
# api_router.include_router(admin_portal_router)
# api_router.include_router(user_router)
# api_router.include_router(health_router, tags=["Health Check"])
# api_router.include_router(utility_router, tags=["Utilities"])
