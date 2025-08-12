Endpoint Details
GET /admin/completed-tasks
Description: Retrieves a list of all completed appointments for a given date.

Method: GET

URL: /admin/completed-tasks

Query Parameters
Parameter

Type

Description

Required

query_date

string

The date to retrieve tasks for (format YYYY-MM-DD).

Yes

Example URL: http://127.0.0.1:8000/admin/completed-tasks?date=2025-07-08

API Responses
  Success Response (200 OK)
Returns a JSON object containing a list of completed tasks.

{
  "completed_tasks": [
    {
      "appointment_id": "63a5e3c4b5f6d7e8f9g0h1i2",
      "time": "8:30",
      "user_name": "Nimal Perera",
      "duration_in_minutes": 44,
      "rating": 5,
      "message": "Service was excellent and very fast."
    }
  ]
}

  Error Response (500 Internal Server Error)
Returns an error detail if the server encounters an unexpected issue.

{
  "detail": "An unexpected error occurred: [error message]"
}

Dependencies
Service Function: This route calls the get_completed_tasks_by_date function to fetch data.

Location: The service function is located in services/admin/completed_tasks_service.py.