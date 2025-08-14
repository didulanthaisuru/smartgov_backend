# Insights Direct API Endpoints

This document describes the GET endpoints available in the `insights_direct` module for retrieving insights data.

## Overview

The insights_direct endpoints allow you to retrieve insights data based on the MongoDB collection structure. The endpoints are designed to work with the actual insights collection format.

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

### 1. Get Insights by Sub-Service ID and Date

**Endpoint:** `GET /insights-direct/sub-service/{sub_service_id}/date/{query_date}`

**Description:** Retrieve insights data for a specific sub_service_id and date

**Path Parameters:**
- `sub_service_id`: The sub-service identifier
- `query_date`: The date to filter by (YYYY-MM-DD format)

**Example:**
```
GET /insights-direct/sub-service/SUB001/date/2025-08-01
```

### 2. Get Insights by Main Service ID and Date

**Endpoint:** `GET /insights-direct/main-service/{main_service_id}/date/{query_date}`

**Description:** Retrieve insights data for a specific main_service_id and date (returns all sub-services under that main service)

**Path Parameters:**
- `main_service_id`: The main service identifier
- `query_date`: The date to filter by (YYYY-MM-DD format)

**Example:**
```
GET /insights-direct/main-service/MAIN001/date/2025-08-01
```

**Expected Response (with your database):**
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
    },
    {
      "date": "2025-08-01",
      "sub_service_id": "SUB002",
      "main_service_id": "MAIN001",
      "average_processing_time": "00:30:00",
      "no_show_count": 1,
      "predicted_number_of_visitors": 8
    }
  ],
  "total_count": 2
}
```

### 3. Get Insights by Sub-Service ID, Main Service ID and Date

**Endpoint:** `GET /insights-direct/sub-service/{sub_service_id}/main-service/{main_service_id}/date/{query_date}`

**Description:** Retrieve insights data for a specific sub_service_id, main_service_id and date combination

**Path Parameters:**
- `sub_service_id`: The sub-service identifier
- `main_service_id`: The main service identifier
- `query_date`: The date to filter by (YYYY-MM-DD format)

**Example:**
```
GET /insights-direct/sub-service/SUB001/main-service/MAIN001/date/2025-08-01
```

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200 OK`: Successful request
- `400 Bad Request`: Invalid parameters or validation errors
- `500 Internal Server Error`: Server-side errors

Error responses include a detail message explaining the issue.

## Data Processing

The endpoints automatically handle:
- MongoDB date format conversion (including extended JSON format)
- Date range queries for the entire day
- Default values for missing fields
- Sorting results by date (newest first)

## Testing

You can test the endpoints using the provided test script:

```bash
python test_insights_direct.py
```

Make sure the FastAPI server is running on `http://localhost:8000` before running the tests.

## Database Collection

The endpoints query the `insights` MongoDB collection with the following structure:

```json
{
  "_id": {
    "$oid": "689df223fa4f64fd4a00200f"
  },
  "date": {
    "$date": "2025-08-01T00:00:00.000Z"
  },
  "sub_service_id": "SUB001",
  "main_service_id": "MAIN001",
  "average_processing_time": "00:25:00",
  "no_show_count": 2,
  "predicted_number_of_visitors": 6
}
```
