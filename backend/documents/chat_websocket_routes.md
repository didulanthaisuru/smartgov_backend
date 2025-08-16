# Chat WebSocket Routes Documentation

## File: `backend/routes/chat_web_socket.py`

### Overview
This module provides WebSocket-based chat functionality and REST endpoints for chat management. It enables real-time communication between users and administrators, with support for chat history, user management, and connection status monitoring.

### Router Configuration
- **Prefix**: `/chat`
- **Tags**: `["chat"]`

### Dependencies
- **Services**: `services.chat_web_socket`
- **Dependencies**: `dependencies.auth`, `dependencies.admin_auth`
- **Models**: `models.user`, `models.AdminInDB`, `models.UserInDB`

---

## Endpoints

### 1. WebSocket Status
**Endpoint**: `GET /chat/status`

**Description**: Checks WebSocket server status and active connections.

**Response**:
```json
{
  "status": "running",
  "active_connections": "integer",
  "socket_io_path": "/socket.io",
  "supported_events": [
    "connect", "disconnect", "join_room", "leave_room", 
    "send_message", "typing", "mark_read", "get_online_users"
  ]
}
```

---

### 2. Get Chat History (Admin)
**Endpoint**: `GET /chat/history/user/{user_id}`

**Description**: API route to fetch the chat history for a specific user. Admin access only.

**Parameters**:
- `user_id` (path): The user ID to get chat history for
- `direction` (query): Filter messages - "inbound", "outbound", or "both" (default)

**Response**: Array of messages
```json
[
  {
    "_id": "string",
    "sender_id": "string",
    "receiver_id": "string",
    "message_text": "string",
    "timestamp": "datetime",
    "appointment_id": "string",
    "service_id": "string"
  }
]
```

**Dependencies**: `get_current_admin`

---

### 3. Get My Chat History (User)
**Endpoint**: `GET /chat/history/self`

**Description**: API route for a user to fetch their own chat history.

**Response**: Array of messages
```json
[
  {
    "_id": "string",
    "sender_id": "string",
    "receiver_id": "string",
    "message_text": "string",
    "timestamp": "datetime",
    "appointment_id": "string",
    "service_id": "string"
  }
]
```

**Dependencies**: `get_current_user`

**Service Function**: `chat_web_socket.get_chat_history_service(user_id, database_config.db)`

---

### 4. Get Chat Users (Admin)
**Endpoint**: `GET /chat/users`

**Description**: API route to fetch all users for the admin chat list.

**Response**: Array of users
```json
[
  {
    "user_id": "string",
    "user_name": "string",
    "last_message": "string",
    "last_message_time": "datetime",
    "unread_count": "integer"
  }
]
```

**Dependencies**: `get_current_admin`

**Service Function**: `chat_web_socket.get_chat_users_service(database_config.db)`

---

### 5. Test WebSocket
**Endpoint**: `GET /chat/test`

**Description**: Test endpoint to verify WebSocket functionality.

**Response**:
```json
{
  "message": "WebSocket routes are working",
  "socket_io_path": "/socket.io",
  "available_endpoints": [
    "/api/chat/status",
    "/api/chat/history/self",
    "/api/chat/users",
    "/websocket/health"
  ],
  "websocket_events": [
    "connect", "disconnect", "join_room", "leave_room",
    "send_message", "typing", "mark_read", "get_online_users",
    "heartbeat", "get_connection_info"
  ]
}
```

---

## WebSocket Events

### Connection Events
- **connect**: Establishes WebSocket connection
- **disconnect**: Closes WebSocket connection
- **heartbeat**: Connection health check

### Room Management
- **join_room**: Join a specific chat room
- **leave_room**: Leave a chat room
- **get_connection_info**: Get connection details

### Messaging Events
- **send_message**: Send a chat message
- **typing**: Typing indicator
- **mark_read**: Mark messages as read
- **get_online_users**: Get list of online users

---

## Related Files

### Services
- **File**: `backend/services/chat_web_socket.py`
- **Purpose**: Contains WebSocket server and chat business logic

### Dependencies
- **File**: `backend/dependencies/auth.py`
- **Purpose**: User authentication middleware

- **File**: `backend/dependencies/admin_auth.py`
- **Purpose**: Admin authentication middleware

### Models
- **File**: `backend/models.py`
- **Purpose**: Database models for users and admins

---

## Usage Examples

### Check WebSocket Status
```bash
curl -X GET "http://localhost:8000/chat/status"
```

### Get Chat History (Admin)
```bash
curl -X GET "http://localhost:8000/chat/history/user/user123" \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN"
```

### Get My Chat History (User)
```bash
curl -X GET "http://localhost:8000/chat/history/self" \
  -H "Authorization: Bearer USER_JWT_TOKEN"
```

### Get Chat Users (Admin)
```bash
curl -X GET "http://localhost:8000/chat/users" \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN"
```

### Test WebSocket
```bash
curl -X GET "http://localhost:8000/chat/test"
```

---

## WebSocket Client Integration

### JavaScript Client Example
```javascript
// Connect to WebSocket
const socket = io('http://localhost:8000', {
  path: '/socket.io'
});

// Connection events
socket.on('connect', () => {
  console.log('Connected to chat server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from chat server');
});

// Join user room
socket.emit('join_room', { user_id: 'user123' });

// Send message
socket.emit('send_message', {
  receiver_id: 'admin456',
  appointment_id: 'appointment789',
  service_id: 'service123',
  message_text: 'Hello, I need help'
});

// Receive message
socket.on('receive_message', (data) => {
  console.log('Received message:', data);
});

// Typing indicator
socket.emit('typing', { receiver_id: 'admin456', is_typing: true });
```

---

## Chat System Architecture

### Connection Management
- **Socket.IO Server**: Handles WebSocket connections
- **Connection Pooling**: Manages multiple connections
- **Room Management**: Organizes users into chat rooms
- **Connection Monitoring**: Tracks active connections

### Message Handling
- **Real-time Messaging**: Instant message delivery
- **Message Persistence**: Store messages in database
- **Message Routing**: Route messages to correct recipients
- **Message History**: Retrieve chat history

---

## Error Handling

The module implements comprehensive error handling:
- **400 Bad Request**: Invalid request parameters
- **401 Unauthorized**: Missing or invalid authentication
- **404 Not Found**: User or chat history not found
- **500 Internal Server Error**: WebSocket or database errors

---

## Security Considerations

### Authentication
- **JWT Token Validation**: Validate tokens for all endpoints
- **Admin Authorization**: Restrict admin endpoints to admin users
- **User Authorization**: Users can only access their own data
- **Connection Security**: Secure WebSocket connections

### Data Privacy
- **Message Encryption**: Encrypt sensitive messages
- **User Isolation**: Users can only see their own messages
- **Admin Access Control**: Admins have limited access to user data
- **Audit Logging**: Log all chat activities

---

## Performance Considerations

### WebSocket Performance
- **Connection Pooling**: Efficient connection management
- **Message Queuing**: Queue messages for offline users
- **Load Balancing**: Distribute connections across servers
- **Memory Management**: Optimize memory usage

### Database Performance
- **Indexed Queries**: Optimize message retrieval
- **Pagination**: Paginate large chat histories
- **Message Archiving**: Archive old messages
- **Caching**: Cache frequently accessed data

---

## Dependencies

- FastAPI for routing and HTTP handling
- Socket.IO for WebSocket functionality
- JWT for authentication
- Motor for async MongoDB operations
- Custom chat WebSocket service for business logic
- Authentication middleware

---

## Future Enhancements

### Planned Features
- **Message Encryption**: End-to-end encryption
- **File Sharing**: Share files in chat
- **Voice Messages**: Voice message support
- **Message Reactions**: Emoji reactions to messages

### Advanced Features
- **Chat Bots**: Automated chat responses
- **Message Translation**: Multi-language support
- **Chat Analytics**: Message analytics and insights
- **Chat Backup**: Automatic chat backup
