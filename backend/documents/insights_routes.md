# Insights Routes Documentation

## File: `backend/routes/insights.py`

### Overview
This module provides comprehensive analytics and insights endpoints for appointment data analysis. It supports both daily and weekly insights, allowing administrators to view appointment details, counts, and trends for specific services and time periods.

### Router Configuration
- **Prefix**: `/insights`
- **Tags**: `["insights"]`

### Dependencies
- **Services**: `services.insights`
- **Schemas**: `schemas.insights`

---

## Endpoints

### 1. View Service Insights by Date
**Endpoint**: `POST /insights/view-service_insights`

**Description**: Retrieves full appointment details for a specific sub-service and date.

**Request Model**: `InsightQuery`
```json
{
  "sub_service_id": "string",
  "query_date": "date"
}
```

**Response Model**: `List[InsightDetail]`
```json
[
  {
    "appointment_id": "string",
    "user_name": "string",
    "appointment_date": "datetime",
    "appointment_time": "datetime",
    "status": "string",
    "payment_status": "boolean",
    "sub_service_name": "string",
    "main_service_name": "string"
  }
]
```

**Service Function**: `get_insights_by_date_sub_service(query)`

---

### 2. View Main Service Insights by Date
**Endpoint**: `POST /insights/view-mainservice-insights`

**Description**: Retrieves full appointment details for a specific sub-service, main service, and date.

**Request Model**: `MainServiceQuery`
```json
{
  "sub_service_id": "string",
  "main_service_id": "string",
  "query_date": "date"
}
```

**Response Model**: `List[InsightDetail]`
```json
[
  {
    "appointment_id": "string",
    "user_name": "string",
    "appointment_date": "datetime",
    "appointment_time": "datetime",
    "status": "string",
    "payment_status": "boolean",
    "sub_service_name": "string",
    "main_service_name": "string"
  }
]
```

**Service Function**: `get_insights_by_date_main_service(query)`

---

### 3. View Weekly Service Insights
**Endpoint**: `POST /insights/view-weekly-service_insights`

**Description**: Retrieves full appointment details for a specific sub-service and week (based on the given date).

**Request Model**: `WeeklyInsightQuery`
```json
{
  "sub_service_id": "string",
  "week_start_date": "date"
}
```

**Response Model**: `List[InsightDetail]`
```json
[
  {
    "appointment_id": "string",
    "user_name": "string",
    "appointment_date": "datetime",
    "appointment_time": "datetime",
    "status": "string",
    "payment_status": "boolean",
    "sub_service_name": "string",
    "main_service_name": "string"
  }
]
```

**Service Function**: `get_weekly_insights_by_sub_service(query)`

---

### 4. View Weekly Main Service Insights
**Endpoint**: `POST /insights/view-weekly-mainservice-insights`

**Description**: Retrieves full appointment details for a specific sub-service, main service, and week.

**Request Model**: `WeeklyMainServiceQuery`
```json
{
  "sub_service_id": "string",
  "main_service_id": "string",
  "week_start_date": "date"
}
```

**Response Model**: `List[InsightDetail]`
```json
[
  {
    "appointment_id": "string",
    "user_name": "string",
    "appointment_date": "datetime",
    "appointment_time": "datetime",
    "status": "string",
    "payment_status": "boolean",
    "sub_service_name": "string",
    "main_service_name": "string"
  }
]
```

**Service Function**: `get_weekly_insights_by_main_service(query)`

---

### 5. Weekly Appointment Counts
**Endpoint**: `POST /insights/weekly-appointment-counts`

**Description**: Retrieves appointment counts for each day of the week for a specific sub-service.

**Request Model**: `WeeklyCountQuery`
```json
{
  "sub_service_id": "string",
  "week_start_date": "date"
}
```

**Response Model**: `WeeklyCountResponse`
```json
{
  "sub_service_id": "string",
  "week_start_date": "date",
  "daily_counts": {
    "monday": "integer",
    "tuesday": "integer",
    "wednesday": "integer",
    "thursday": "integer",
    "friday": "integer",
    "saturday": "integer",
    "sunday": "integer"
  },
  "total_count": "integer"
}
```

**Service Function**: `get_weekly_appointment_counts(query)`

---

### 6. Weekly Appointment Counts by Main Service
**Endpoint**: `POST /insights/weekly-appointment-counts-mainservice`

**Description**: Retrieves appointment counts for each day of the week for a specific sub-service and main service.

**Request Model**: `WeeklyMainServiceCountQuery`
```json
{
  "sub_service_id": "string",
  "main_service_id": "string",
  "week_start_date": "date"
}
```

**Response Model**: `WeeklyCountResponse`
```json
{
  "sub_service_id": "string",
  "main_service_id": "string",
  "week_start_date": "date",
  "daily_counts": {
    "monday": "integer",
    "tuesday": "integer",
    "wednesday": "integer",
    "thursday": "integer",
    "friday": "integer",
    "saturday": "integer",
    "sunday": "integer"
  },
  "total_count": "integer"
}
```

**Service Function**: `get_weekly_appointment_counts_main_service(query)`

---

## Analytics Features

### Daily Insights
- Appointment details for specific dates
- Filtered by sub-service or main service
- Complete appointment information

### Weekly Insights
- Appointment details for entire weeks
- Based on week start date
- Comprehensive weekly analysis

### Appointment Counts
- Daily breakdown of appointments
- Weekly totals and trends
- Service-specific analytics

---

## Related Files

### Schemas
- **File**: `backend/schemas/insights.py`
- **Purpose**: Defines Pydantic models for insights requests/responses

### Services
- **File**: `backend/services/insights.py`
- **Purpose**: Contains business logic for analytics operations

### Models
- **File**: `backend/models.py`
- **Purpose**: Database models for appointments and services

---

## Usage Examples

### Get Daily Service Insights
```bash
curl -X POST "http://localhost:8000/insights/view-service_insights" \
  -H "Content-Type: application/json" \
  -d '{
    "sub_service_id": "service456",
    "query_date": "2024-01-15"
  }'
```

### Get Weekly Service Insights
```bash
curl -X POST "http://localhost:8000/insights/view-weekly-service_insights" \
  -H "Content-Type: application/json" \
  -d '{
    "sub_service_id": "service456",
    "week_start_date": "2024-01-15"
  }'
```

### Get Weekly Appointment Counts
```bash
curl -X POST "http://localhost:8000/insights/weekly-appointment-counts" \
  -H "Content-Type: application/json" \
  -d '{
    "sub_service_id": "service456",
    "week_start_date": "2024-01-15"
  }'
```

---

## Data Analysis Capabilities

### Time-based Analysis
- **Daily Analysis**: Appointment details for specific dates
- **Weekly Analysis**: Appointment trends over weeks
- **Date Range Analysis**: Custom date range insights

### Service-based Analysis
- **Sub-Service Analysis**: Specific service performance
- **Main Service Analysis**: Category-level insights
- **Cross-Service Analysis**: Comparative analytics

### Statistical Insights
- **Appointment Counts**: Daily and weekly totals
- **Trend Analysis**: Appointment patterns over time
- **Service Performance**: Popular services and peak times

---

## Error Handling

The module implements comprehensive error handling:
- **400 Bad Request**: Invalid query parameters
- **500 Internal Server Error**: Database or service errors

---

## Performance Considerations

### Database Optimization
- Efficient date-based queries
- Indexed searches on appointment dates
- Optimized aggregations for counts

### Caching Strategy
- Cache frequently accessed insights
- Cache weekly summaries
- Implement cache invalidation on data updates

---

## Security Considerations

### Access Control
- Admin-only access to insights
- Service-specific data filtering
- Audit trails for analytics access

### Data Privacy
- Anonymized user data in insights
- Aggregated statistics for privacy
- Compliance with data protection regulations

---

## Dependencies

- FastAPI for routing and HTTP handling
- Pydantic for data validation
- Custom insights service for analytics logic
- Database models for data persistence
- Date/time libraries for temporal analysis
