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
        print("Failed to decode token")
        raise credentials_exception
    
    print(f"Decoded token data: {token_data}")
    
    # Check if the token contains the nic field (user token)
    if "nic" not in token_data:
        print(f"Token does not contain 'nic' field. Available fields: {list(token_data.keys())}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token format for user authentication"
        )
    
    user = await user_service.get_user_by_id(token_data["nic"])
    
    if user is None:
        print(f"User not found for nic: {token_data['nic']}")
        raise credentials_exception
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User account is deactivated"
        )
    
    return user
