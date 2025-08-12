from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, OAuth2PasswordRequestForm
from datetime import timedelta
from typing import Dict, Any

from schemas.auth import UserLogin, UserRegister, LoginResponse, UserResponse, Token
from models import UserInDB
from services.user_service import user_service
from dependencies.auth import get_current_user, get_current_active_user
from utils.auth import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    OAuth2 compatible token endpoint for Swagger UI authentication
    Use email as username
    """
    # Authenticate user (form_data.username will be the email)
    user = user_service.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"nic": user.nic, "email": user.email},
        expires_delta=access_token_expires
    )
    
    # Update last login
    user_service.update_user_last_login(user.nic)
    
    # Prepare user response
    user_response = UserResponse(
        nic=user.nic,
        first_name=user.first_name,
        last_name=user.last_name,
        phone_number=user.phone_number,
        email=user.email,
        created_at=user.created_at
    )
    
    return Token(
        access_token=access_token,
        token_type="bearer",
        expires_in=ACCESS_TOKEN_EXPIRE_MINUTES * 60,  # in seconds
        user=user_response
    )

@router.post("/register", response_model=Dict[str, Any], status_code=status.HTTP_201_CREATED)
async def register_user(user_data: UserRegister):
    """
    Register a new user
    """
    # Check if user already exists
    existing_user_email = user_service.get_user_by_email(user_data.email)
    if existing_user_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )
    
    existing_user_nic = user_service.get_user_by_nic(user_data.nic)
    if existing_user_nic:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this NIC already exists"
        )
    
    # Create new user
    new_user = user_service.create_user(user_data)
    if not new_user:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create user"
        )
    
    return {
        "message": "User registered successfully",
        "user": new_user
    }

@router.post("/login", response_model=LoginResponse)
async def login_user(login_data: UserLogin):
    """
    Authenticate user and return JWT token
    """
    # Authenticate user
    user = user_service.authenticate_user(login_data.email, login_data.passcode)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"nic": user.nic, "email": user.email},
        expires_delta=access_token_expires
    )
    
    # Update last login
    user_service.update_user_last_login(user.nic)
    
    # Prepare user response
    user_response = UserResponse(
        nic=user.nic,
        first_name=user.first_name,
        last_name=user.last_name,
        phone_number=user.phone_number,
        email=user.email,
        created_at=user.created_at
    )
    
    return LoginResponse(
        message="Login successful",
        user=user_response,
        access_token=access_token,
        token_type="bearer",
        expires_in=ACCESS_TOKEN_EXPIRE_MINUTES * 60  # in seconds
    )

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: UserInDB = Depends(get_current_active_user)):
    """
    Get current authenticated user information
    """
    return UserResponse(
        nic=current_user.nic,
        first_name=current_user.first_name,
        last_name=current_user.last_name,
        phone_number=current_user.phone_number,
        email=current_user.email,
        created_at=current_user.created_at
    )

@router.post("/logout")
async def logout_user(current_user: UserInDB = Depends(get_current_active_user)):
    """
    Logout user (in a real app, you might want to blacklist the token)
    """
    return {"message": f"User {current_user.first_name} logged out successfully"}

@router.put("/deactivate")
async def deactivate_account(current_user: UserInDB = Depends(get_current_active_user)):
    """
    Deactivate current user account
    """
    success = user_service.deactivate_user(current_user.nic)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to deactivate account"
        )
    
    return {"message": "Account deactivated successfully"}

@router.get("/test-protected")
async def test_protected_route(current_user: UserInDB = Depends(get_current_active_user)):
    """
    Test route to verify JWT authentication is working
    """
    return {
        "message": "This is a protected route",
        "user_nic": current_user.nic,
        "user_name": f"{current_user.first_name} {current_user.last_name}"
    }
