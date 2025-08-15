from pydantic import BaseModel


class ChatMessage(BaseModel):
    receiver_id: str
    message_text: str
    appointment_id: str
    service_id: str

class MarkAsReadPayload(BaseModel):
    sender_id: str