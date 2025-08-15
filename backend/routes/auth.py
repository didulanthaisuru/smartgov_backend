from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from schemas.auth import UserLogin, UserRegister, UserResponse, Token
from models import UserInDB
from services.auth_service import auth_service
from dependencies.auth import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserRegister):
    """Register a new user"""
    return await auth_service.register_user_validation(user_data)

@router.post("/sign_in", response_model=Token)
async def sign_in(login_data: UserLogin):
    """User sign in with NIC and password"""
    return await auth_service.sign_in_validation(login_data)

@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    """OAuth2 login endpoint - Use NIC as username in Swagger UI"""
    # Convert OAuth2 form to UserLogin format
    from schemas.auth import UserLogin
    login_data = UserLogin(nic=form_data.username, passcode=form_data.password)
    return await auth_service.sign_in_validation(login_data)

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: UserInDB = Depends(get_current_user)):
    """Get current authenticated user information"""
    return await auth_service.get_current_user_info(current_user)

@router.get("/verify")
async def verify_user_token(current_user: UserInDB = Depends(get_current_user)):
    """Verify user token is valid"""
    return {
        "valid": True,
        "user": {
            "first_name": current_user.first_name,
            "last_name": current_user.last_name,
            "nic": current_user.nic,
            "email": current_user.email,
            "phone_number": current_user.phone_number
        }
    }
