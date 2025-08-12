from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from models import AdminInDB
from services.admin_service import admin_service
from utils.auth import decode_access_token

# Security scheme for admins
admin_oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/admin/token")

def get_current_admin(token: str = Depends(admin_oauth2_scheme)) -> AdminInDB:
    """
    Get current authenticated admin from JWT token
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    token_data = decode_access_token(token)
    
    if token_data is None:
        raise credentials_exception
    
    # Check if token has admin role
    if token_data.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied. Admin role required."
        )
    
    admin = admin_service.get_admin_by_id(token_data["admin_id"])
    
    if admin is None:
        raise credentials_exception
    
    if not admin.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Admin account is deactivated"
        )
    
    return admin
