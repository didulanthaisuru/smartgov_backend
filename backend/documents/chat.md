## Real-Time API (WebSockets)

This section details the endpoints used for real-time chat functionality.

### Establish a Chat Connection

Establishes a persistent WebSocket connection for real-time, bi-directional messaging between clients (users and admins).

* **URL:** `ws://<your-server-address>/ws/{client_id}`
* **Method:** `WebSocket`
* **Path Parameters:**
    * `client_id` (string, required): The unique ID of the connecting client (e.g., "user_101" or "admin_1").

---

### Sending and Receiving Messages

Once a client is connected, messages are sent and received as a JSON string over the WebSocket connection.

#### Message Payload Format

Both client-to-server and server-to-client messages use the following JSON structure:

```json
{
  "receiver_id": "admin_1",
  "service_id": "SERVICE_ABC",
  "appointment_id": "APPOINTMENT_456",
  "message_text": "Hello, I have a question about this appointment."
}