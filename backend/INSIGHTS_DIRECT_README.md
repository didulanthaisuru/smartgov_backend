# Insights Direct API Endpoints

This document describes the GET endpoints available in the `insights_direct` module for retrieving insights data.

## Overview

The insights_direct endpoints allow you to retrieve insights data based on various parameters including:
- `service_id`: The main service identifier
- `sub_service_id`: The sub-service identifier  
- `main_service_id`: The main service category identifier
- `date`: The date for which to retrieve insights

## Response Format

All endpoints return data in the following format:

```json
{
  "insights": [
    {
      "date": "2025-08-01",
      "sub_service_id": "SUB001",
      "main_service_id": "MAIN001", 
      "average_processing_time": "00:25:00",
      "no_show_count": 2,
      "predicted_number_of_visitors": 6
    }
  ],
  "total_count": 1
}
```

## Available Endpoints

### 1. Get Insights with Query Parameters

**Endpoint:** `GET /insights-direct/`

**Description:** Retrieve insights data using query parameters

**Query Parameters:**
- `service_id` (optional): Service ID to filter by
- `sub_service_id` (optional): Sub-service ID to filter by  
- `main_service_id` (optional): Main service ID to filter by
- `query_date` (optional): Date to filter by (YYYY-MM-DD format)

**Example:**
```
GET /insights-direct/?sub_service_id=SUB001&main_service_id=MAIN001&query_date=2025-08-01
```

### 2. Get Insights by Sub-Service ID

**Endpoint:** `GET /insights-direct/sub-service/{sub_service_id}`

**Description:** Retrieve insights data for a specific sub-service

**Path Parameters:**
- `sub_service_id`: The sub-service identifier

**Query Parameters:**
- `query_date` (optional): Date to filter by (YYYY-MM-DD format)

**Example:**
```
GET /insights-direct/sub-service/SUB001?query_date=2025-08-01
```

### 3. Get Insights by Main Service ID

**Endpoint:** `GET /insights-direct/main-service/{main_service_id}`

**Description:** Retrieve insights data for a specific main service

**Path Parameters:**
- `main_service_id`: The main service identifier

**Query Parameters:**
- `query_date` (optional): Date to filter by (YYYY-MM-DD format)

**Example:**
```
GET /insights-direct/main-service/MAIN001?query_date=2025-08-01
```

### 4. Get Insights by Service ID

**Endpoint:** `GET /insights-direct/service/{service_id}`

**Description:** Retrieve insights data for a specific service (finds all sub-services under this service)

**Path Parameters:**
- `service_id`: The service identifier

**Query Parameters:**
- `query_date` (optional): Date to filter by (YYYY-MM-DD format)

**Example:**
```
GET /insights-direct/service/SERVICE001?query_date=2025-08-01
```

### 5. Get Insights by Sub-Service and Main Service

**Endpoint:** `GET /insights-direct/sub-service/{sub_service_id}/main-service/{main_service_id}`

**Description:** Retrieve insights data for a specific sub-service and main service combination

**Path Parameters:**
- `sub_service_id`: The sub-service identifier
- `main_service_id`: The main service identifier

**Query Parameters:**
- `query_date` (optional): Date to filter by (YYYY-MM-DD format)

**Example:**
```
GET /insights-direct/sub-service/SUB001/main-service/MAIN001?query_date=2025-08-01
```

### 6. Get Insights by Date

**Endpoint:** `GET /insights-direct/date/{query_date}`

**Description:** Retrieve insights data for a specific date with optional service filters

**Path Parameters:**
- `query_date`: The date to filter by (YYYY-MM-DD format)

**Query Parameters:**
- `service_id` (optional): Service ID to filter by
- `sub_service_id` (optional): Sub-service ID to filter by
- `main_service_id` (optional): Main service ID to filter by

**Example:**
```
GET /insights-direct/date/2025-08-01?sub_service_id=SUB001&main_service_id=MAIN001
```

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200 OK`: Successful request
- `400 Bad Request`: Invalid parameters or validation errors
- `500 Internal Server Error`: Server-side errors

Error responses include a detail message explaining the issue.

## Data Processing

The endpoints automatically handle:
- Date formatting and validation
- Processing time conversion to HH:MM:SS format
- Default values for missing fields
- Sorting results by date (newest first)

## Testing

You can test the endpoints using the provided test script:

```bash
python test_insights_direct.py
```

Make sure the FastAPI server is running on `http://localhost:8000` before running the tests.

## Database Collections

The endpoints query the following MongoDB collections:
- `insights`: Main insights data
- `sub_services`: Sub-service information
- `main_services`: Main service information
- `appointments`: Appointment data (for reference)
