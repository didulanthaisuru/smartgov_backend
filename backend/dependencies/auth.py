from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from models import UserInDB
from services.user_service import user_service
from utils.auth import decode_access_token

# Security scheme - OAuth2 for Swagger UI with NIC as username
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/token")

async def get_current_user(token: str = Depends(oauth2_scheme)) -> UserInDB:
    """
    Get current authenticated user from JWT token
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    token_data = decode_access_token(token)
    
    if token_data is None:
        raise credentials_exception
    
    user = await user_service.get_user_by_id(token_data["nic"])
    
    if user is None:
        raise credentials_exception
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User account is deactivated"
        )
    
    return user
