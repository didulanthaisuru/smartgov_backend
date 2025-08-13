from pydantic import BaseModel
from typing import Optional

# Pydantic model for user profile
class UserProfile(BaseModel):
    first_name: Optional[str] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None
    profile_picture: Optional[str] = None  # base64 string