from database_config import db
from datetime import datetime

messages_collection = db.messages


async def save_message(sender_id: str, receiver_id: str,service_id:str,appointment_id: str, message_text: str):
    """Saves a chat message to the database."""
    message = {
        "sender_id": sender_id,
        "receiver_id": receiver_id,
        "service_id":service_id,
        "appointment_id": appointment_id,
        "message_text": message_text,
        "timestamp": datetime.now(),
        "is_read": False
    }
    
    await messages_collection.insert_one(message)
    return message


async def mark_messages_as_read(reader_id: str, sender_id: str):
    """
    Marks all unread messages from a specific sender to the reader as read.
    """
    # Find all messages sent BY the 'sender_id' TO the 'reader_id'
    # that are currently unread.
    query = {
        "sender_id": sender_id,
        "receiver_id": reader_id,
        "is_read": False
    }

    # Set the 'is_read' field to true for all matching documents.
    update = {"$set": {"is_read": True}}

    # Use update_many to modify all matching messages in one operation.
    result = await messages_collection.update_many(query, update)

    # Return the number of messages that were updated.
    return result.modified_count