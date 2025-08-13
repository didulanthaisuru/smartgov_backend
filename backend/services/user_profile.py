from fastapi import HTTPException, UploadFile
import base64
from database_config import db

users_collection = db["users"]

# Convert MongoDB document to dict
def user_to_dict(user):
    result = {
        "first_name": user["first_name"] ,
        "phone_number": user["phone_number"],
    }
    if "address" in user:
        result["address"] = user["address"]
    if "profile_picture" in user:
        result["profile_picture"] = user["profile_picture"]
    return result

# Get user by ID
def get_user(nic: str):
    user = users_collection.find_one({"nic": nic})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user_to_dict(user)

# Update user profile
async def update_user(nic: str, first_name: str, phone_number: str, address: str, profile_picture: UploadFile = None):
    user = users_collection.find_one({"nic": nic})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    update_data = {
        "first_name": first_name,
        "phone_number": phone_number,
        "address": address
    }

    if profile_picture:
        content = await profile_picture.read()
        encoded_string = base64.b64encode(content).decode("utf-8")
        update_data["profile_picture"] = encoded_string

    users_collection.update_one({"nic": nic}, {"$set": update_data})
    return {"message": "Profile updated successfully"}
