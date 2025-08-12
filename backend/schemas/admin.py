from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

# Admin Registration Schemas
class AdminRegister(BaseModel):
    admin_name: str = Field(..., min_length=2, max_length=100)
    service_id: str = Field(..., description="Service ID that admin manages")
    email: str = Field(..., description="Admin email address")
    passcode: str = Field(..., min_length=6, description="Admin password")

class AdminLogin(BaseModel):
    email: str = Field(..., description="Admin email")
    passcode: str = Field(..., min_length=6, description="Admin password")

class AdminResponse(BaseModel):
    admin_id: int
    admin_name: str
    service_id: str
    email: str
    created_at: Optional[datetime] = None

class AdminToken(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    admin: AdminResponse
    role: str = "admin"
