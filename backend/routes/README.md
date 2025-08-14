# SmartGov API Routes

This directory contains all the API route definitions for the SmartGov backend system. The routes are organized by functionality and centralized through the `routes.py` file.

## Structure

```
routes/
├── __init__.py
├── routes.py              # Main routes configuration file
├── README.md             # This file
├── auth.py               # User authentication routes
├── admin.py              # Admin authentication routes
├── admin_portal.py       # Admin portal management routes
├── dashboard.py          # Dashboard and services routes
├── appoinment.py         # Appointment management routes
├── document.py           # Document upload and management routes
└── insights.py           # Analytics and insights routes
```

## Route Organization

### 1. Authentication Routes (`auth.py`)
- **Prefix**: `/auth`
- **Tags**: `["Authentication"]`
- **Endpoints**:
  - `POST /register` - User registration
  - `POST /sign_in` - User login
  - `POST /token` - OAuth2 token endpoint
  - `GET /me` - Get current user info
  - `GET /verify` - Verify user token

### 2. Admin Authentication Routes (`admin.py`)
- **Prefix**: `/admin`
- **Tags**: `["Admin Authentication"]`
- **Endpoints**:
  - `POST /register` - Admin registration
  - `POST /sign_in` - Admin login
  - `POST /token` - OAuth2 admin token endpoint
  - `GET /me` - Get current admin info
  - `GET /dashboard` - Admin dashboard
  - `GET /verify` - Verify admin token

### 3. Admin Portal Routes (`admin_portal.py`)
- **Prefix**: `/admin`
- **Tags**: `["Admin Portal"]`
- **Endpoints**:
  - `POST /get_all_appointments_list` - Get appointments by date and service
  - `POST /view_all_detailes_of_selected_appointment` - View appointment details
  - `POST /get_selected_appoinment_details_with_pdf_states` - Get appointment with PDF states
  - `POST /get_subservice_details` - Get sub-service details

### 4. Dashboard Services Routes (`dashboard.py`)
- **Prefix**: `/dashboard_services`
- **Tags**: `["Dashboard Services"]`
- **Endpoints**:
  - `GET /` - Get all main services
  - `GET /{main_service_id}/subservices` - Get sub-services for main service
  - `GET /{main_service_id}/subservices/{sub_service_id}` - Get sub-service details

### 5. Appointment Routes (`appoinment.py`)
- **Prefix**: `/appointment_creation`
- **Tags**: `["Appointments"]`
- **Endpoints**:
  - `POST /` - Create complete appointment
  - `POST /empty` - Create empty appointment
  - `GET /user/{user_id}` - Get user appointments
  - `GET /{appointment_id}` - Get appointment by ID
  - `PATCH /{appointment_id}` - Update appointment

### 6. Document Routes (`document.py`)
- **Prefix**: `/upload_document`
- **Tags**: `["Documents"]`
- **Endpoints**:
  - `POST /` - Upload document

### 7. Insights Routes (`insights.py`)
- **Prefix**: `/insights`
- **Tags**: `["Analytics & Insights"]`
- **Endpoints**:
  - `POST /view-service_insights` - View service insights
  - `POST /view-mainservice-insights` - View main service insights
  - `GET /appointments/count/sub-service/{sub_service_id}/date/{appointment_date}` - Get appointment count by sub-service
  - `GET /appointments/count/sub-service/{sub_service_id}/main-service/{main_service_id}/date/{appointment_date}` - Get appointment count by main service

## API Versioning

All routes are prefixed with `/api/v1` in the main application, so the full URL structure is:
```
http://localhost:8000/api/v1/{route_prefix}/{endpoint}
```

## Adding New Routes

To add new routes:

1. Create a new route file in this directory (e.g., `new_feature.py`)
2. Define your router with appropriate prefix and tags
3. Import and include it in `routes.py`
4. Add appropriate documentation

Example:
```python
# new_feature.py
from fastapi import APIRouter

router = APIRouter(prefix="/new-feature", tags=["New Feature"])

@router.get("/")
async def get_new_feature():
    return {"message": "New feature endpoint"}
```

Then in `routes.py`:
```python
from .new_feature import router as new_feature_router

# Add to appropriate section
api_router.include_router(new_feature_router, tags=["New Feature"])
```

## Best Practices

1. **Consistent Naming**: Use descriptive prefixes and tags
2. **Documentation**: Include docstrings for all endpoints
3. **Error Handling**: Implement proper error handling in route handlers
4. **Validation**: Use Pydantic schemas for request/response validation
5. **Security**: Implement proper authentication and authorization
6. **Testing**: Write tests for all endpoints

## Dependencies

Each route file should import:
- `fastapi.APIRouter` for router creation
- Appropriate schemas from `schemas/` directory
- Service functions from `services/` directory
- Dependencies from `dependencies/` directory (if needed)
