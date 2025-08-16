# Rating Routes Documentation

## File: `backend/routes/rating.py`

### Overview
This module provides rating and feedback functionality for appointments. It allows users to create ratings for completed appointments and administrators to view rating data for analysis and service improvement.

### Router Configuration
- **Prefix**: `/ratings`
- **Tags**: `["Ratings"]`

### Dependencies
- **Services**: `services.rating`
- **Schemas**: `schemas.rating`

---

## Endpoints

### 1. Create Rating
**Endpoint**: `POST /ratings/`

**Description**: Creates a new rating for a completed appointment.

**Request Model**: `RatingCreate`
```json
{
  "appointment_id": "string",
  "rating": "integer",
  "comment": "string",
  "user_id": "string"
}
```

**Response Model**: `RatingResponse`
```json
{
  "rating_id": "string",
  "appointment_id": "string",
  "rating": "integer",
  "comment": "string",
  "user_id": "string",
  "created_at": "datetime"
}
```

**Service Function**: `create_rating_service(data)`

---

### 2. Get Rating by Appointment
**Endpoint**: `GET /ratings/appointment/{appointment_id}`

**Description**: Retrieves the rating for a specific appointment.

**Parameters**:
- `appointment_id` (path): The unique identifier of the appointment

**Response**:
```json
{
  "rating_id": "string",
  "appointment_id": "string",
  "rating": "integer",
  "comment": "string",
  "user_id": "string",
  "created_at": "datetime"
}
```

**Service Function**: `get_rating_by_appointment_service(appointment_id)`

---

### 3. Get All Ratings
**Endpoint**: `GET /ratings/`

**Description**: Retrieves all ratings in the system (admin functionality).

**Response Model**: `List[dict]`
```json
[
  {
    "rating_id": "string",
    "appointment_id": "string",
    "rating": "integer",
    "comment": "string",
    "user_id": "string",
    "created_at": "datetime"
  }
]
```

**Service Function**: `get_all_ratings_service()`

---

## Rating System Features

### Rating Creation
- **Appointment-based**: Ratings are linked to specific appointments
- **User Feedback**: Users can provide numerical ratings and comments
- **Validation**: Ensures appointment exists and is completed
- **Duplicate Prevention**: One rating per appointment

### Rating Retrieval
- **Individual Ratings**: Get rating for specific appointment
- **Bulk Access**: Admin access to all ratings
- **User Context**: Ratings include user information
- **Timestamps**: Creation time tracking

---

## Related Files

### Schemas
- **File**: `backend/schemas/rating.py`
- **Purpose**: Defines Pydantic models for rating requests/responses

### Services
- **File**: `backend/services/rating.py`
- **Purpose**: Contains business logic for rating operations

### Models
- **File**: `backend/models.py`
- **Purpose**: Database models for ratings and appointments

---

## Usage Examples

### Create Rating
```bash
curl -X POST "http://localhost:8000/ratings/" \
  -H "Content-Type: application/json" \
  -d '{
    "appointment_id": "appointment789",
    "rating": 5,
    "comment": "Excellent service, very professional staff",
    "user_id": "user123"
  }'
```

### Get Rating for Appointment
```bash
curl -X GET "http://localhost:8000/ratings/appointment/appointment789"
```

### Get All Ratings (Admin)
```bash
curl -X GET "http://localhost:8000/ratings/"
```

---

## Rating System Design

### Rating Scale
- **1-5 Scale**: Standard 5-point rating system
- **1**: Very Poor
- **2**: Poor
- **3**: Average
- **4**: Good
- **5**: Excellent

### Rating Components
- **Numerical Rating**: 1-5 scale
- **Text Comment**: Optional detailed feedback
- **Appointment Context**: Links to specific service
- **User Information**: Anonymous or identified feedback

---

## Business Rules

### Rating Creation
- Only completed appointments can be rated
- One rating per appointment per user
- Rating must be between 1-5
- Comments are optional but encouraged

### Rating Access
- Users can view their own ratings
- Admins can view all ratings
- Ratings are used for service improvement
- Anonymous ratings for privacy

---

## Error Handling

The module implements comprehensive error handling:
- **400 Bad Request**: Invalid rating data
- **404 Not Found**: Appointment not found
- **409 Conflict**: Rating already exists
- **422 Unprocessable Entity**: Validation errors

---

## Security Considerations

### Access Control
- User authentication for rating creation
- Admin-only access to all ratings
- Appointment ownership validation
- Rate limiting for rating submissions

### Data Privacy
- User consent for rating collection
- Anonymous rating options
- Data retention policies
- GDPR compliance considerations

---

## Performance Considerations

### Database Optimization
- Indexed queries on appointment_id
- Efficient rating aggregation
- Optimized bulk rating retrieval
- Caching for frequently accessed ratings

### Analytics Support
- Rating statistics calculation
- Service performance metrics
- Trend analysis capabilities
- Export functionality for reports

---

## Dependencies

- FastAPI for routing and HTTP handling
- Pydantic for data validation
- Custom rating service for business logic
- Database models for data persistence
- Authentication middleware

---

## Future Enhancements

### Planned Features
- **Rating Analytics**: Statistical analysis of ratings
- **Service Performance**: Service-specific rating metrics
- **Rating Trends**: Time-based rating analysis
- **Feedback Categories**: Categorized feedback types

### Advanced Features
- **Rating Moderation**: Admin review of ratings
- **Response System**: Admin responses to ratings
- **Rating Incentives**: Rewards for providing ratings
- **Rating Export**: Data export for analysis
