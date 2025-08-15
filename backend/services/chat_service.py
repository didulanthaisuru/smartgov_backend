import socketio
from pymongo.mongo_client import MongoClient
from bson import ObjectId
# Corrected: Use absolute imports and import the module
import database_config
from models import user

# --- WebSocket Setup ---
# Create the Socket.IO server instance here with proper CORS configuration
sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ]
)
# When mounting the Socket.IO app under "/socket.io" in FastAPI, the sub-app should
# handle requests at its root, so set socketio_path to empty.
socket_app = socketio.ASGIApp(sio, socketio_path="")

# --- Database Collection Helper ---
def get_chat_collection():
    """Returns the messages collection from the database."""
    return database_config.db["messages"]

# --- Service Logic for Chat History and Users ---

async def get_chat_history_service(user_id: str, db):
    """Fetches the chat history for a specific user from the database."""
    collection = db["messages"]
    messages = []
    async for message in collection.find({
        "$or": [
            {"sender_id": user_id},
            {"receiver_id": user_id}
        ]
    }).sort("timestamp", 1):
        message["_id"] = str(message["_id"])
        messages.append(message)
    return messages

async def get_chat_users_service(db):
    """Fetches all non-admin users for the admin chat list."""
    users_collection = db["users"]
    users = []
    # Query for users that either don't have a role field or have role != "admin"
    async for user in users_collection.find({
        "$or": [
            {"role": {"$ne": "admin"}},
            {"role": {"$exists": False}}
        ]
    }):
        user["_id"] = str(user["_id"])
        users.append(user)
    return users

# --- Real-time WebSocket Event Handlers ---

# Store active connections
active_connections = {}

@sio.event
async def connect(sid, environ):
    """Handles a new client connection."""
    print(f"Socket connected: {sid}")
    # Store the connection
    active_connections[sid] = {
        "connected_at": str(ObjectId()),
        "rooms": []
    }

@sio.event
async def disconnect(sid):
    """Handles a client disconnection."""
    print(f"Socket disconnected: {sid}")
    # Remove the connection
    if sid in active_connections:
        del active_connections[sid]

@sio.on("join_room")
async def join_room(sid, data):
    """Allows a client to join a specific chat room."""
    room = data.get("room")
    user_type = data.get("user_type", "user")  # "user" or "admin"
    
    if room:
        await sio.enter_room(sid, room)
        
        # Store room information
        if sid in active_connections:
            active_connections[sid]["rooms"].append(room)
            active_connections[sid]["user_type"] = user_type
            
        print(f"{user_type} {sid} joined room: {room}")
        
        # Debug: Show all sockets in the room
        try:
            # Use the default namespace '/'
            room_sockets = sio.manager.get_participants('/', room)
            print(f"All sockets in room {room}: {list(room_sockets)}")
        except Exception as e:
            print(f"Could not get room participants: {e}")
        
        # Notify others in the room that someone joined
        await sio.emit("user_joined", {
            "user_type": user_type,
            "room": room,
            "timestamp": str(ObjectId())
        }, room=room, skip_sid=sid)

@sio.on("leave_room")
async def leave_room(sid, data):
    """Allows a client to leave a specific chat room."""
    room = data.get("room")
    
    if room:
        await sio.leave_room(sid, room)
        
        # Remove room from stored information
        if sid in active_connections and room in active_connections[sid]["rooms"]:
            active_connections[sid]["rooms"].remove(room)
            
        print(f"{sid} left room: {room}")
        
        # Notify others in the room that someone left
        await sio.emit("user_left", {
            "room": room,
            "timestamp": str(ObjectId())
        }, room=room)

@sio.on("send_message")
async def send_message(sid, data):
    """Handles incoming messages, saves them, and broadcasts them."""
    try:
        # Use the database instance directly from database_config
        db = database_config.db
        collection = db["messages"]
        
        room = data.get("room")
        # Normalize IDs to strings to ensure consistent matching across clients
        sender_id = data.get("sender_id")
        receiver_id = data.get("receiver_id")
        try:
            sender_id = str(sender_id) if sender_id is not None else None
            receiver_id = str(receiver_id) if receiver_id is not None else None
        except Exception:
            pass

        message_data = {
            "sender_id": sender_id,
            "receiver_id": receiver_id,
            "content": data.get("content"),
            "timestamp": data.get("timestamp"),
            "message_type": data.get("message_type", "text")
        }

        print(f"Processing message from {message_data['sender_id']} to {message_data['receiver_id']} in room {room}")

        # Save message to the database (continue even if this fails)
        try:
            result = await collection.insert_one(message_data)
            message_data["_id"] = str(result.inserted_id)
            print(f"Message saved to database with ID: {message_data['_id']}")
        except Exception as db_error:
            print(f"Failed to save message to database: {db_error}")
            # Continue processing even if database save fails
            message_data["_id"] = str(ObjectId())  # Generate a temporary ID

        # Broadcast the message to the room (excluding the sender to prevent echo)
        print(f"Broadcasting message to room {room} (excluding sender {sid})")
        await sio.emit("receive_message", message_data, room=room, skip_sid=sid)
        print(f"Message sent in room {room}: {message_data['content'][:50]}...")
        
        # Also emit to all sockets in the room for debugging
        try:
            room_sockets = sio.manager.get_participants('/', room)
            print(f"Sockets in room {room}: {list(room_sockets)}")
        except Exception as e:
            print(f"Could not get room participants: {e}")
        
        # Emit to admin dashboard for notifications if sender is user (not admin)
        # Admin IDs are typically smaller numbers (< 10000), user IDs/NICs are longer
        sender_id = data.get("sender_id")
        is_admin_sender = (
            sender_id == "admin" or 
            (isinstance(sender_id, (int, str)) and str(sender_id).isdigit() and len(str(sender_id)) <= 4)
        )
        
        if not is_admin_sender:
            print(f"Sending notification to admin dashboard for user message from {sender_id}")
            await sio.emit("new_user_message", {
                "user_id": sender_id,
                "room": room,
                "preview": message_data["content"][:50] + "..." if len(message_data["content"]) > 50 else message_data["content"],
                "timestamp": message_data["timestamp"]
            }, room="admin_dashboard")
        else:
            print(f"Not sending notification - message from admin {sender_id}")
            
    except Exception as e:
        print(f"Error sending message: {e}")
        await sio.emit("message_error", {
            "error": "Failed to send message",
            "details": str(e)
        }, room=sid)

@sio.on("typing")
async def handle_typing(sid, data):
    """Handles typing indicators."""
    room = data.get("room")
    user_id = data.get("user_id")
    is_typing = data.get("is_typing", False)
    
    if room and user_id:
        await sio.emit("user_typing", {
            "user_id": user_id,
            "is_typing": is_typing,
            "room": room
        }, room=room, skip_sid=sid)

@sio.on("mark_read")
async def mark_messages_read(sid, data):
    """Marks messages as read."""
    try:
        db = database_config.db
        collection = db["messages"]
        
        room = data.get("room")
        user_id = data.get("user_id")
        
        # Update messages as read
        await collection.update_many(
            {
                "receiver_id": user_id,
                "read": {"$ne": True}
            },
            {
                "$set": {"read": True, "read_at": data.get("timestamp")}
            }
        )
        
        # Notify the sender that messages were read
        await sio.emit("messages_read", {
            "room": room,
            "reader_id": user_id,
            "timestamp": data.get("timestamp")
        }, room=room, skip_sid=sid)
        
    except Exception as e:
        print(f"Error marking messages as read: {e}")

@sio.on("get_online_users")
async def get_online_users(sid, data):
    """Returns list of online users in a room."""
    room = data.get("room")
    
    if room:
        # Get all sockets in the room
        room_sockets = sio.manager.get_participants(sio.namespace, room)
        
        online_users = []
        for socket_id in room_sockets:
            if socket_id in active_connections:
                conn_info = active_connections[socket_id]
                online_users.append({
                    "socket_id": socket_id,
                    "user_type": conn_info.get("user_type", "unknown"),
                    "connected_at": conn_info.get("connected_at")
                })
        
        await sio.emit("online_users_list", {
            "room": room,
            "users": online_users,
            "count": len(online_users)
        }, room=sid)
