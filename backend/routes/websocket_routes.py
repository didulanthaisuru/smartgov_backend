from fastapi import APIRouter, HTTPException
from typing import Dict, Any

from services import chat_web_socket

# Create router
router = APIRouter(tags=["WebSocket"])

@router.get("/websocket/connections")
async def get_websocket_connections():
    """Get all active WebSocket connections."""
    try:
        connections = chat_web_socket.active_connections
        return {
            "status": "success",
            "active_connections": len(connections),
            "connections": connections
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting connections: {str(e)}")

@router.get("/websocket/rooms")
async def get_websocket_rooms():
    """Get all WebSocket rooms and their members."""
    try:
        # Get rooms from the socket.io manager
        sio = chat_web_socket.sio
        admin_room = sio.manager.get_participants(sio.namespace, "admin_room")
        user_room = sio.manager.get_participants(sio.namespace, "user_room")
        general_room = sio.manager.get_participants(sio.namespace, "general_room")
        
        return {
            "status": "success",
            "rooms": {
                "admin_room": list(admin_room),
                "user_room": list(user_room),
                "general_room": list(general_room)
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting rooms: {str(e)}")
