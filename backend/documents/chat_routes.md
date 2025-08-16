# Chat Routes Documentation

## File: `backend/routes/chat_routes.py`

### Overview
This module provides WebSocket-based chat functionality and REST endpoints for message management. It enables real-time communication between users and administrators, with support for message persistence and read status tracking.

### Router Configuration
- **Prefix**: None (root level)
- **Tags**: `["Chat"]`

### Dependencies
- **Core**: `core.connection_manager`
- **Services**: `services.chat_service`
- **Schemas**: `schemas.chat_schemas`

---

## Endpoints

### 1. WebSocket Chat Endpoint
**Endpoint**: `WS /ws/{client_id}`

**Description**: WebSocket endpoint for real-time chat communication between clients.

**Parameters**:
- `client_id` (path): Unique identifier for the client connection

**WebSocket Events**:
- **Connect**: Establishes WebSocket connection
- **Message**: Sends/receives chat messages
- **Disconnect**: Closes WebSocket connection

**Message Format**:
```json
{
  "receiver_id": "string",
  "appointment_id": "string",
  "service_id": "string",
  "message_text": "string"
}
```

**Service Functions**:
- `save_message()`: Persists message to database
- `manager.send_personal_message()`: Sends message to specific receiver

---

### 2. Mark Messages as Read
**Endpoint**: `PUT /chat/read/{reader_id}`

**Description**: Marks all messages in a conversation as read for the specified reader.

**Parameters**:
- `reader_id` (path): ID of the user who is reading the messages

**Request Model**: `MarkAsReadPayload`
```json
{
  "sender_id": "string"
}
```

**Response**:
```json
{
  "message": "Messages marked as read successfully",
  "updated_count": "integer"
}
```

**Service Function**: `mark_messages_as_read(reader_id: str, sender_id: str)`

---

## Chat System Architecture

### Connection Management
- Uses `ConnectionManager` for WebSocket connection handling
- Maintains active connections with client IDs
- Handles connection/disconnection events

### Message Flow
1. **Message Sending**:
   - Client sends message via WebSocket
   - Message is parsed and validated
   - Message is saved to database
   - Message is forwarded to receiver

2. **Message Receiving**:
   - Receiver gets message via WebSocket
   - Message is displayed in chat interface
   - Read status can be updated via REST API

### Message Persistence
- All messages are stored in database
- Messages include sender, receiver, appointment, and service context
- Timestamps are automatically added

---

## Related Files

### Core
- **File**: `backend/core/connection_manager.py`
- **Purpose**: Manages WebSocket connections and message routing

### Services
- **File**: `backend/services/chat_service.py`
- **Purpose**: Contains business logic for chat operations

### Schemas
- **File**: `backend/schemas/chat_schemas.py`
- **Purpose**: Defines Pydantic models for chat requests/responses

---

## Usage Examples

### WebSocket Connection
```javascript
// Client-side WebSocket connection
const ws = new WebSocket('ws://localhost:8000/ws/user123');

ws.onopen = function() {
    console.log('Connected to chat server');
};

ws.onmessage = function(event) {
    const message = JSON.parse(event.data);
    console.log('Received:', message);
};

// Send a message
ws.send(JSON.stringify({
    receiver_id: "admin456",
    appointment_id: "appointment789",
    service_id: "service123",
    message_text: "Hello, I need help with my appointment"
}));
```

### Mark Messages as Read
```bash
curl -X PUT "http://localhost:8000/chat/read/user123" \
  -H "Content-Type: application/json" \
  -d '{
    "sender_id": "admin456"
  }'
```

---

## Message Structure

### Message Fields
- **sender_id**: ID of the message sender
- **receiver_id**: ID of the message receiver
- **appointment_id**: Associated appointment ID
- **service_id**: Associated service ID
- **message_text**: Actual message content
- **timestamp**: Message creation time (auto-generated)

### Message Types
- **User to Admin**: User sends message to administrator
- **Admin to User**: Administrator responds to user
- **System Messages**: Automated notifications (future feature)

---

## Error Handling

### WebSocket Errors
- **Connection Errors**: Handled by WebSocket library
- **Message Parsing Errors**: Invalid JSON format
- **Service Errors**: Database connection issues

### REST API Errors
- **400 Bad Request**: Invalid request payload
- **404 Not Found**: Reader or sender not found
- **500 Internal Server Error**: Database operation failures

---

## Security Considerations

### WebSocket Security
- Client ID validation
- Message content sanitization
- Rate limiting for message sending
- Connection timeout handling

### Data Privacy
- Messages are associated with specific appointments
- Access control based on user permissions
- Message encryption (consider for sensitive data)

---

## Performance Considerations

### WebSocket Performance
- Efficient connection management
- Message queuing for offline users
- Connection pooling for high load

### Database Performance
- Indexed queries for message retrieval
- Pagination for large message histories
- Message archiving for old conversations

---

## Dependencies

- FastAPI for routing and WebSocket handling
- WebSocket library for real-time communication
- JSON for message serialization
- Custom connection manager for WebSocket management
- Chat service for business logic
- Database for message persistence

---

## Future Enhancements

### Planned Features
- **Message Encryption**: End-to-end encryption for sensitive conversations
- **File Attachments**: Support for document sharing in chat
- **Message Reactions**: Emoji reactions to messages
- **Typing Indicators**: Real-time typing status
- **Message Search**: Search functionality for chat history
- **Message Threading**: Organized conversation threads

### Scalability Improvements
- **Redis Integration**: For better message caching
- **Message Queuing**: For handling high message volumes
- **Load Balancing**: For multiple chat servers
- **Message Compression**: For reducing bandwidth usage
