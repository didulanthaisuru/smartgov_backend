from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta

from schemas.auth import UserLogin, UserRegister, UserResponse, Token
from models import UserInDB
from services.user_service import user_service
from dependencies.auth import get_current_user
from utils.auth import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register_user(user_data: UserRegister):
    """Register a new user"""
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

@router.post("/login", response_model=Token)
async def login_user(login_data: UserLogin):
    """Simple JSON login endpoint - Use NIC and password"""
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

@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    """OAuth2 login endpoint - Use NIC as username in Swagger UI"""
    user = user_service.authenticate_user_by_nic(form_data.username, form_data.password)
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

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: UserInDB = Depends(get_current_user)):
    """Get current authenticated user information"""
    return UserResponse(
        nic=current_user.nic,
        first_name=current_user.first_name,
        last_name=current_user.last_name,
        phone_number=current_user.phone_number,
        email=current_user.email,
        created_at=current_user.created_at
    )
