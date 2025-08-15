# User Profile API Documentation

## How the API Works

The API provides endpoints for **retrieving** and **updating** user profile data. It is structured using **services** and **routes** to separate business logic from HTTP request handling.

## 1. Retrieving User Profile

**Endpoint:** `GET /user/{nic}`

**Process:**
1. The API receives a request with the user's NIC.
2. The `user_service` fetches the corresponding document from the MongoDB `users` collection.
3. Only the fields present in the database are returned:
   - `first_name` and `phone_number` (always required)
   - `address` and `profile_picture` (optional)
   - `created_at` and `updated_at` (timestamps)

## 2. Updating User Profile

**Endpoint:** `PUT /user/{nic}`

**Process:**
1. The API accepts **optional form fields**: `first_name`, `phone_number`, `address`, and `profile_picture`.
2. Only the fields provided in the request are updated; others remain unchanged.
3. The `updated_at` timestamp is set to the current UTC time whenever any field is updated.
4. If a new profile picture is provided, it is **converted to Base64** and stored directly in the database as a string.

## How Profile Picture is Stored

### 1. File Upload
The user uploads an image via the API using the `profile_picture` form field.

### 2. Conversion to Base64
- The image file is read as binary.
- The binary data is converted to a **Base64 encoded string** using Python's `base64` module.

**Example:**
```python
content = await profile_picture.read()
encoded_string = base64.b64encode(content).decode("utf-8")
```

### 3. Storage in MongoDB
- The Base64 string is stored in the user's document in the `profile_picture` field.
- No file is saved on the server filesystem.
- This makes it easy to retrieve the picture directly from the database for display in web or mobile apps.

### 4. Retrieval
- When the user profile is requested via `GET /user/{nic}`, the Base64 string is returned.
- Frontend apps can decode this string to display the image.

## Benefits of Base64 Storage

- Simplifies file management by keeping everything in the database.
- Eliminates the need for separate file storage or URL management.
- Ensures the profile picture is tightly coupled with the user profile.