from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional
from models import UserInDB
from services.user_service import user_service
from utils.auth import decode_access_token

# Security schemes
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/token")
http_bearer = HTTPBearer()

def get_current_user_oauth2(token: str = Depends(oauth2_scheme)) -> UserInDB:
    """
    Dependency to get current authenticated user from OAuth2 token (for Swagger UI)
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    token_data = decode_access_token(token)
    
    if token_data is None:
        raise credentials_exception
    
    user = user_service.get_user_by_id(token_data["nic"])  # Using NIC now
    
    if user is None:
        raise credentials_exception
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User account is deactivated"
        )
    
    return user

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(http_bearer)) -> UserInDB:
    """
    Dependency to get current authenticated user from JWT token (for direct Bearer auth)
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    token = credentials.credentials
    token_data = decode_access_token(token)
    
    if token_data is None:
        raise credentials_exception
    
    user = user_service.get_user_by_id(token_data["nic"])  # Using NIC now
    
    if user is None:
        raise credentials_exception
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User account is deactivated"
        )
    
    return user

def get_current_active_user(current_user: UserInDB = Depends(get_current_user_oauth2)) -> UserInDB:
    """
    Dependency to get current active user (using OAuth2 for better Swagger UI)
    """
    if not current_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    return current_user

def get_optional_current_user(credentials: Optional[HTTPAuthorizationCredentials] = Depends(http_bearer)) -> Optional[UserInDB]:
    """
    Dependency to optionally get current user (for endpoints that work with or without authentication)
    """
    if not credentials:
        return None
    
    try:
        token = credentials.credentials
        token_data = decode_access_token(token)
        
        if token_data is None:
            return None
        
        user = user_service.get_user_by_id(token_data["nic"])  # Using NIC now
        
        if user is None or not user.is_active:
            return None
        
        return user
    except:
        return None
