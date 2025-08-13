import json
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from core.connection_manager import manager
from services.chat_service import save_message,mark_messages_as_read
from schemas.chat_schemas import MarkAsReadPayload
router = APIRouter(tags=["Chat"])


@router.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await manager.connect(websocket, client_id)
    try:
        while True:
            data = await websocket.receive_text()
            message_data = json.loads(data)

            # You must call the service function with 'await'
            await save_message(
                sender_id=client_id,
                receiver_id=message_data["receiver_id"],
                appointment_id=message_data["appointment_id"],
                # FIX: Add the missing service_id from the payload
                service_id=message_data["service_id"],
                message_text=message_data["message_text"]
            )

            await manager.send_personal_message(data, message_data["receiver_id"])
    except WebSocketDisconnect:
        manager.disconnect(client_id)
        print(f"Client #{client_id} has disconnected.")



@router.put("/chat/read/{reader_id}")
async def mark_as_read(reader_id: str, payload: MarkAsReadPayload):
    """
    Marks all messages in a conversation for the reader as read.
    `reader_id` is the ID of the user who is reading the messages.
    `sender_id` in the payload is the ID of the other person in the chat.
    """
    modified_count = await mark_messages_as_read(
        reader_id=reader_id,
        sender_id=payload.sender_id
    )
    return {
        "message": "Messages marked as read successfully",
        "updated_count": modified_count
    }