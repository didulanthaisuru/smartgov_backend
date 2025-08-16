from fastapi import APIRouter, HTTPException
from typing import Dict, Any

from services import chat_web_socket

# Create router
router = APIRouter(tags=["WebSocket"])

@router.get("/websocket/health")
async def websocket_health_check():
    """Check WebSocket server health and status."""
    try:
        # Get active connections count
        active_count = len(chat_web_socket.active_connections)
        
        return {
            "status": "healthy",
            "service": "SmartGov WebSocket",
            "active_connections": active_count,
            "socket_io_path": "/socket.io",
            "server_info": {
                "async_mode": "asgi",
                "cors_enabled": True,
                "logger_enabled": True
            }
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "service": "SmartGov WebSocket",
            "error": str(e),
            "active_connections": 0
        }

@router.get("/websocket/connections")
async def get_websocket_connections():
    """Get all active WebSocket connections."""
    try:
        connections = chat_web_socket.get_active_connections()
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
        rooms = chat_web_socket.get_room_members("admin_room")
        return {
            "status": "success",
            "rooms": {
                "admin_room": rooms,
                "user_room": chat_web_socket.get_room_members("user_room"),
                "general_room": chat_web_socket.get_room_members("general_room")
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting rooms: {str(e)}")
