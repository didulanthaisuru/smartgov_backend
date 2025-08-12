from typing import Optional
from datetime import datetime, timedelta
from fastapi import HTTPException, status

from services.admin_service import admin_service
from schemas.admin import AdminRegister, AdminResponse, AdminLogin, AdminToken
from models import AdminInDB
from utils.auth import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES

class AdminAuthService:
    
    async def register_admin_validation(self, admin_data: AdminRegister) -> AdminResponse:
        """Handle admin registration business logic"""
        # Check if admin already exists
        if admin_service.get_admin_by_email(admin_data.email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Admin with this email already exists"
            )
        
        # Create new admin
        new_admin = admin_service.create_admin(admin_data)
        if not new_admin:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create admin"
            )
        
        return new_admin
    
    async def admin_sign_in_validation(self, login_data: AdminLogin) -> AdminToken:
        """Handle admin login business logic"""
        admin = admin_service.authenticate_admin(login_data.email, login_data.passcode)
        if not admin:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Create access token with admin role
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={
                "admin_id": admin.admin_id, 
                "email": admin.email, 
                "role": "admin",
                "service_id": admin.service_id
            },
            expires_delta=access_token_expires
        )
        
        # Prepare admin response
        admin_response = AdminResponse(
            admin_id=admin.admin_id,
            admin_name=admin.admin_name,
            service_id=admin.service_id,
            email=admin.email,
            created_at=admin.created_at
        )
        
        return AdminToken(
            access_token=access_token,
            token_type="bearer",
            expires_in=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            admin=admin_response,
            role="admin"
        )
    
    async def get_current_admin_info(self, current_admin: AdminInDB) -> AdminResponse:
        """Get current admin information"""
        return AdminResponse(
            admin_id=current_admin.admin_id,
            admin_name=current_admin.admin_name,
            service_id=current_admin.service_id,
            email=current_admin.email,
            created_at=current_admin.created_at
        )

# Create service instance
admin_auth_service = AdminAuthService()
