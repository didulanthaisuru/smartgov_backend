from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from schemas.admin import AdminLogin, AdminRegister, AdminResponse, AdminToken
from models import AdminInDB
from services.admin_auth_service import admin_auth_service
from dependencies.admin_auth import get_current_admin

router = APIRouter(prefix="/admin", tags=["Admin Authentication"])

@router.post("/register", response_model=AdminResponse, status_code=status.HTTP_201_CREATED)
async def register_admin(admin_data: AdminRegister):
    """Register a new admin"""
    return await admin_auth_service.register_admin_validation(admin_data)

@router.post("/sign_in", response_model=AdminToken)
async def admin_sign_in(login_data: AdminLogin):
    """Admin sign in with email and password"""
    return await admin_auth_service.admin_sign_in_validation(login_data)

@router.post("/token", response_model=AdminToken)
async def admin_login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    """OAuth2 admin login endpoint - Use email as username in Swagger UI"""
    # Convert OAuth2 form to AdminLogin format
    from schemas.admin import AdminLogin
    login_data = AdminLogin(email=form_data.username, passcode=form_data.password)
    return await admin_auth_service.admin_sign_in_validation(login_data)

@router.get("/me", response_model=AdminResponse)
async def get_current_admin_info(current_admin: AdminInDB = Depends(get_current_admin)):
    """Get current authenticated admin information"""
    return await admin_auth_service.get_current_admin_info(current_admin)

@router.get("/dashboard")
async def admin_dashboard(current_admin: AdminInDB = Depends(get_current_admin)):
    """Admin dashboard - Protected route"""
    return {
        "message": f"Welcome to admin dashboard, {current_admin.admin_name}",
        "admin_id": current_admin.admin_id,
        "service_id": current_admin.service_id,
        "role": "admin"
    }
