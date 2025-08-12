from typing import Optional
from datetime import datetime, timedelta
from fastapi import HTTPException, status

from services.user_service import user_service
from schemas.auth import UserRegister, UserResponse, UserLogin, Token
from models import UserInDB
from utils.auth import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES

class AuthService:
    
    async def register_user_validation(self, user_data: UserRegister) -> UserResponse:
        """Handle user registration business logic"""
        # Check if user already exists
        if user_service.get_user_by_email(user_data.email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email already exists"
            )
        
        if user_service.get_user_by_nic(user_data.nic):
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
        
        return new_user
    
    async def sign_in_validation(self, login_data: UserLogin) -> Token:
        """Handle user login business logic"""
        user = user_service.authenticate_user_by_nic(login_data.nic, login_data.passcode)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect NIC or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Create access token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"nic": user.nic, "email": user.email},
            expires_delta=access_token_expires
        )
        
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
            expires_in=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            user=user_response
        )
    
    async def get_current_user_info(self, current_user: UserInDB) -> UserResponse:
        """Get current user information"""
        return UserResponse(
            nic=current_user.nic,
            first_name=current_user.first_name,
            last_name=current_user.last_name,
            phone_number=current_user.phone_number,
            email=current_user.email,
            created_at=current_user.created_at
        )

# Create service instance
auth_service = AuthService()
