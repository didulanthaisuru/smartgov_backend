from fastapi import APIRouter, Form, UploadFile
from schemas.usr_profile import UserProfile
from services.user_profile import get_user, update_user
from typing import Optional

router = APIRouter()

# GET user profile
@router.get("/user/{nic}", response_model=UserProfile)
def read_user_profile(nic: str):
    return get_user(nic)

# PUT update user profile
@router.put("/user/{nic}")
async def edit_user_profile(
    nic: str,
    first_name: Optional[str] = Form(None),
    phone_number: Optional[str] = Form(None),
    address: Optional[str] = Form(None),
    profile_picture: Optional[UploadFile] = None
):
    return await update_user(nic, first_name, phone_number, address, profile_picture)
