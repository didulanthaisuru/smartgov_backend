# Main Routes Documentation

## File: `backend/routes/routes.py`

### Overview
This module serves as the main router configuration file that consolidates all individual route modules into a single API router. It provides a centralized way to manage and organize all API endpoints across the application.

### Purpose
- **Router Consolidation**: Combines all route modules into a single API router
- **Endpoint Organization**: Organizes endpoints by functionality and access level
- **API Structure**: Defines the overall API structure and hierarchy
- **Dependency Management**: Manages route dependencies and imports

---

## Router Configuration

### Main API Router
```python
api_router = APIRouter()
```

### Included Routers

#### Authentication Routes
- **Auth Router**: User authentication (`/auth`)
- **Admin Router**: Admin authentication (`/admin`)

#### Service Management Routes
- **Dashboard Router**: Service information (`/dashboard_services`)
- **Appointment Router**: Appointment management (`/appointment_creation`)
- **Document Router**: Document uploads (`/upload_document`)

#### Analytics and Insights Routes
- **Insights Router**: Analytics endpoints (`/insights`)
- **Insights Direct Router**: Direct analytics access (`/insights-direct`)

#### Utility Routes
- **QR Scanner Router**: QR code functionality (`/qr`)
- **Rating Router**: Rating and feedback (`/ratings`)

#### User Management Routes
- **User Profile Router**: User profile management (`/profile`)
- **User Appointment Get Router**: User appointment retrieval (`/appointments_view`)

#### Admin Management Routes
- **Admin Dashboard Router**: Admin dashboard (`/api/admin/dashboard`)
- **Admin Portal Router**: Admin portal functionality (`/admin`)
- **Admin Appointment Updates Router**: Appointment updates (`/admin/appointments`)

#### Communication Routes
- **Chat Routes Router**: Chat functionality (`/chat`)
- **Chat WebSocket Router**: WebSocket chat (`/chat`)

---

## Route Organization

### Public Routes
- **Service Information**: Dashboard services, QR generation
- **Authentication**: User and admin registration/login

### User Routes
- **Profile Management**: User profile updates
- **Appointment Management**: Appointment creation and retrieval
- **Document Upload**: Document submission
- **Chat**: User chat functionality

### Admin Routes
- **Admin Dashboard**: Appointment and document management
- **Admin Portal**: Comprehensive admin functionality
- **Analytics**: Insights and reporting
- **Appointment Updates**: Step and completion management

---

## API Structure

### Base URL Structure
```
/api/
├── auth/                    # User authentication
├── admin/                   # Admin authentication and management
├── dashboard_services/      # Service information
├── appointment_creation/    # Appointment management
├── upload_document/         # Document uploads
├── insights/               # Analytics (POST)
├── insights-direct/        # Analytics (GET)
├── qr/                     # QR code functionality
├── ratings/                # Rating system
├── profile/                # User profile management
├── appointments_view/      # User appointment retrieval
└── chat/                   # Chat functionality
```

### Endpoint Categories

#### Authentication & Authorization
- User registration and login
- Admin registration and login
- Token management and verification

#### Service Management
- Main services listing
- Sub-services by main service
- Service details and requirements

#### Appointment System
- Appointment creation and management
- Appointment status tracking
- User appointment retrieval
- Admin appointment updates

#### Document Management
- Document upload functionality
- Document status tracking
- Document approval system

#### Analytics & Reporting
- Appointment insights
- Service performance metrics
- Weekly and daily analytics

#### Communication
- Real-time chat functionality
- Chat history management
- User-admin communication

---

## Dependencies

### Imported Routers
```python
from .auth import router as auth_router
from .admin import router as admin_router
from .dashboard import router as dashboard_router
from .appoinment import router as appointment_router
from .document import router as document_router
from .insights import router as insights_router
from .insights_derect import router as insights_direct_router
from .qr_scanner import router as qr_scanner_router
from .user_appointment_get import router as user_appointment_get_router
from .admin_appointment_updates import router as admin_appointment_updates_router
from .admin_dashboard import router as admin_dashboard_router
from .rating import router as rating_router
from .user_profile import router as user_profile_router
```

### Router Inclusion
```python
api_router.include_router(auth_router)
api_router.include_router(admin_router)
api_router.include_router(dashboard_router)
api_router.include_router(appointment_router)
api_router.include_router(document_router)
api_router.include_router(insights_router)
api_router.include_router(insights_direct_router)
api_router.include_router(qr_scanner_router)
api_router.include_router(user_appointment_get_router)
api_router.include_router(admin_appointment_updates_router)
api_router.include_router(admin_dashboard_router)
api_router.include_router(rating_router)
api_router.include_router(user_profile_router)
```

---

## Usage

### Main Application Integration
```python
from fastapi import FastAPI
from routes.routes import api_router

app = FastAPI(title="Tech Triathlon API")

# Include the main API router
app.include_router(api_router, prefix="/api")
```

### API Documentation
- **Swagger UI**: Available at `/docs`
- **ReDoc**: Available at `/redoc`
- **OpenAPI Schema**: Available at `/openapi.json`

---

## Security Considerations

### Route Protection
- **Public Routes**: Service information, authentication
- **User Routes**: Require user authentication
- **Admin Routes**: Require admin authentication
- **Mixed Routes**: Different access levels for different endpoints

### Authentication Flow
1. **Public Access**: Service browsing, authentication endpoints
2. **User Authentication**: JWT token validation for user routes
3. **Admin Authentication**: JWT token validation for admin routes
4. **Role-based Access**: Different permissions for different user types

---

## Performance Considerations

### Router Optimization
- **Lazy Loading**: Routers loaded only when needed
- **Efficient Imports**: Minimal import overhead
- **Route Caching**: FastAPI route caching
- **Middleware Optimization**: Efficient middleware application

### API Structure Benefits
- **Modular Design**: Easy to maintain and extend
- **Clear Separation**: Logical endpoint organization
- **Scalability**: Easy to add new route modules
- **Testing**: Isolated testing of route modules

---

## Future Enhancements

### Planned Improvements
- **Route Versioning**: API version management
- **Route Analytics**: Endpoint usage tracking
- **Route Documentation**: Enhanced documentation
- **Route Testing**: Automated route testing

### Advanced Features
- **Route Middleware**: Custom middleware per route
- **Route Caching**: Intelligent route caching
- **Route Monitoring**: Real-time route monitoring
- **Route Optimization**: Performance optimization
