from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class UserLogin(BaseModel):
    email: str = Field(..., description="User email address")
    passcode: str = Field(..., min_length=6, description="User password")

class UserRegister(BaseModel):
    first_name: str = Field(..., min_length=2, max_length=50)
    last_name: str = Field(..., min_length=2, max_length=50)
    nic: str = Field(..., min_length=10, max_length=12, description="National Identity Card number")
    phone_number: str = Field(..., min_length=10, max_length=15)
    email: str = Field(..., description="User email address")
    passcode: str = Field(..., min_length=6, description="User password")

class UserResponse(BaseModel):
    nic: str  # Primary identifier
    first_name: str
    last_name: str
    phone_number: str
    email: str
    created_at: Optional[datetime] = None

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user: UserResponse

class TokenData(BaseModel):
    nic: Optional[str] = None
    email: Optional[str] = None

class LoginResponse(BaseModel):
    message: str
    user: UserResponse
    access_token: str
    token_type: str = "bearer"
    expires_in: int
