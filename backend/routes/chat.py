from fastapi import APIRouter, Depends, HTTPException, Query
# Corrected: Use absolute imports and import the module itself
import database_config
from dependencies.auth import get_current_user
from dependencies.admin_auth import get_current_admin
from models import user, AdminInDB, UserInDB
from services import chat_service

# --- API Router Setup ---
router = APIRouter(
    prefix="/chat",
    tags=["chat"],
)

# The socket server instance is now imported from the service
sio = chat_service.sio

# --- API Endpoints for Chat History ---
@router.get("/history/user/{user_id}")
async def get_chat_history(
    user_id: str,
    current_admin: AdminInDB = Depends(get_current_admin),
    direction: str = Query("both", description="Filter messages: inbound (user->admin), outbound (admin->user), or both")
):
    """API route to fetch the chat history for a specific user. Admin access only.

    direction:
    - inbound: messages sent by the user to admin
    - outbound: messages sent by admin to the user
    - both: all messages either direction (default)
    """
    db = database_config.db
    collection = db["messages"]
    admin_id_str = str(current_admin.admin_id)

    if direction == "inbound":
        query = {"sender_id": user_id, "receiver_id": {"$in": ["admin", admin_id_str]}}
    elif direction == "outbound":
        query = {"sender_id": admin_id_str, "receiver_id": user_id}
    else:
        query = {"$or": [{"sender_id": user_id}, {"receiver_id": user_id}]}

    messages = []
    async for message in collection.find(query).sort("timestamp", 1):
        message["_id"] = str(message["_id"]) if "_id" in message else None
        messages.append(message)
    return messages


@router.get("/history/self")
async def get_my_chat_history(current_user: UserInDB = Depends(get_current_user)):
    """API route for a user to fetch their own chat history."""
    # Prefer NIC as canonical identifier
    user_id = current_user.nic
    return await chat_service.get_chat_history_service(user_id, database_config.db)

@router.get("/users")
async def get_chat_users(current_admin: AdminInDB = Depends(get_current_admin)):
    """API route to fetch all users for the admin chat list."""
    return await chat_service.get_chat_users_service(database_config.db)
