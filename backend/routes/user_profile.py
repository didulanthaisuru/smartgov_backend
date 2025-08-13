from fastapi import APIRouter, Form, UploadFile
from schemas.usr_profile import UserProfile
from services.user_profile import get_user, update_user

router = APIRouter()

# GET user profile
@router.get("/user/{nic}", response_model=UserProfile)
def read_user_profile(nic: str):
    return get_user(nic)

# PUT update user profile
@router.put("/user/{nic}")
async def edit_user_profile(
    nic: str,
    first_name: str = Form(...),
    phone_number: str = Form(...),
    address: str = Form(...),
    profile_picture: UploadFile = None
):
    return await update_user(nic, first_name, phone_number, address, profile_picture)
