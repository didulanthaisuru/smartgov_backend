# SmartGov Platform

## Project Overview

SmartGov is a comprehensive web-based, mobile-responsive platform designed to digitize and streamline government services for citizens in Sri Lanka. The platform serves as a single online portal that transforms traditional government service delivery through automation, transparency, and enhanced user experience.

### Primary Limitations

#### Service Scope Restriction
- **Single Service Implementation**: SmartGov is currently developed and operational for only one government service - Birth Certificate processing
- **Specific Sub-Service**: The platform is fully configured for "New Born Certificate at hospital" service
  - Payment Amount: LKR 250
  - Processing Steps: 2-step workflow (Document Verification → Certificate Issuance)
  - Required Documentation: 4 mandatory documents for application completion
- **Complete Workflow Available**: The entire workflow for this birth certificate sub-service has been fully developed and is functional
- **Scalable Architecture**: While limited to one service, the platform is built with scalable architecture to accommodate future service expansions

## Technology Stack

- **Backend**: FastAPI, Starlette root, Motor/MongoDB, python-socketio
- **Frontend**: React + Vite, socket.io-client, Tailwind CSS
- **Database**: MongoDB
- **Default ports**: API 8000, Frontend 5173, MongoDB 27017
- **Socket.IO path**: `/socket.io`

## Project Structure

```
tech_triathlon_repo/
├── backend/                          # FastAPI backend application
│   ├── core/                         # Core application modules
│   │   └── connection_manager.py     # Database connection management
│   ├── dependencies/                 # Authentication and dependency injection
│   │   ├── admin_auth.py            # Admin authentication middleware
│   │   └── auth.py                  # User authentication middleware
│   ├── documents/                    # API documentation and route specifications
│   │   ├── admin_appointment_updates_routes.md
│   │   ├── admin_dashboard_full_routes.md
│   │   ├── admin_portal_routes.md
│   │   ├── admin_routes.md
│   │   ├── appointment_routes.md
│   │   ├── auth_routes.md
│   │   ├── chat_routes.md
│   │   ├── chat_websocket_routes.md
│   │   ├── dashboard_endpoints.md
│   │   ├── dashboard_routes.md
│   │   ├── dashboard_service.md
│   │   ├── document_routes.md
│   │   ├── insights_direct_routes.md
│   │   ├── insights_routes.md
│   │   ├── qr_scanner_routes.md
│   │   ├── rating_routes.md
│   │   ├── routes_main.md
│   │   ├── user_appointment_get_routes.md
│   │   └── user_profile_routes.md
│   ├── routes/                       # API route handlers
│   │   ├── admin_appointment_updates.py
│   │   ├── admin_dashboard_full.py
│   │   ├── admin_portal.py
│   │   ├── admin.py
│   │   ├── appoinment.py
│   │   ├── auth.py
│   │   ├── chat_routes.py
│   │   ├── chat_web_socket.py
│   │   ├── dashboard.py
│   │   ├── document.py
│   │   ├── insights_derect.py
│   │   ├── insights.py
│   │   ├── payment_routes.py
│   │   ├── qr_scanner.py
│   │   ├── rating.py
│   │   ├── routes.py
│   │   ├── user_appointment_get.py
│   │   ├── user_profile.py
│   │   └── websocket_routes.py
│   ├── schemas/                      # Pydantic data models and validation
│   │   ├── admin_appointment_updates.py
│   │   ├── admin_dashboard_full.py
│   │   ├── admin_portal.py
│   │   ├── admin_services/           # Admin-specific schemas
│   │   │   ├── appointment_schemas.py
│   │   │   └── dashboard_schemas.py
│   │   ├── admin.py
│   │   ├── appoinment.py
│   │   ├── auth.py
│   │   ├── chat_schemas.py
│   │   ├── dashboard.py
│   │   ├── document.py
│   │   ├── insights_derect.py
│   │   ├── insights.py
│   │   ├── qr_schemas.py
│   │   ├── rating.py
│   │   ├── user_appointment_get.py
│   │   └── usr_profile.py
│   ├── services/                     # Business logic and service layer
│   │   ├── admin_appointment_updates.py
│   │   ├── admin_auth_service.py
│   │   ├── admin_dashboard_full.py
│   │   ├── admin_portal.py
│   │   ├── admin_service.py
│   │   ├── admin_services/           # Admin-specific services
│   │   │   ├── appointments_service.py
│   │   │   ├── dashboard_service.py
│   │   │   └── qr_code_scanner.py
│   │   ├── appoinment.py
│   │   ├── auth_service.py
│   │   ├── chat_service.py
│   │   ├── chat_web_socket.py
│   │   ├── dashboard.py
│   │   ├── document.py
│   │   ├── insights_derect.py
│   │   ├── insights.py
│   │   ├── rating.py
│   │   ├── user_appointment_get.py
│   │   ├── user_profile.py
│   │   └── user_service.py
│   ├── uploads/                      # User uploaded files storage
│   ├── utils/                        # Utility functions
│   │   └── auth.py                   # Authentication utilities
│   ├── database_config.py           # Database configuration
│   ├── main.py                      # FastAPI application entry point
│   ├── models.py                    # Database models
│   ├── projectstructure.md          # Project structure documentation
│   └── requirements.txt             # Python dependencies
├── frontend/                         # React frontend application
│   ├── public/                       # Static assets
│   ├── src/
│   │   ├── assets/                   # Images and static resources
│   │   │   └── images/
│   │   │       ├── figma/            # Design assets
│   │   │       └── logo/             # Logo assets
│   │   ├── components/               # React components
│   │   │   ├── activities/           # Activity-related components
│   │   │   ├── admin/                # Admin-specific components
│   │   │   ├── auth/                 # Authentication components
│   │   │   ├── dashboard/            # Dashboard components
│   │   │   ├── figma/                # Design system components
│   │   │   └── shared/               # Shared/common components
│   │   ├── context/                  # React context providers
│   │   ├── contexts/                 # Additional context providers
│   │   ├── documents/                # Frontend documentation
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── pages/                    # Page components
│   │   │   └── admin/                # Admin pages
│   │   ├── services/                 # API service layer
│   │   └── utils/                    # Frontend utilities
│   ├── index.html                    # HTML entry point
│   ├── package.json                  # Node.js dependencies
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   └── vite.config.js               # Vite build configuration
└── README.md                         # This file
```

## Backend Documentation

The backend folder contains comprehensive documentation in the `documents/` directory, including:

### API Route Documentation
- **Admin Routes**: Complete documentation for admin portal functionality
- **Appointment Routes**: Appointment booking and management endpoints
- **Authentication Routes**: User registration, login, and session management
- **Chat Routes**: Real-time messaging and communication features
- **Dashboard Routes**: User dashboard and analytics endpoints
- **Document Routes**: File upload and document management
- **Insights Routes**: Analytics and reporting functionality
- **QR Scanner Routes**: QR code scanning and verification
- **Rating Routes**: User feedback and rating system
- **User Profile Routes**: Profile management and user information

### Service Documentation
- **Dashboard Service**: Business logic for dashboard functionality
- **Admin Services**: Specialized services for administrative functions

## Environment Variables

### Backend (`backend/.env`):
- `MONGO_URI` - MongoDB connection string
- `SECRET_KEY` - JWT secret key for authentication
- `ACCESS_TOKEN_EXPIRE_MINUTES` - JWT token expiration time

### Frontend (`frontend/.env`):
- `VITE_API_BASE_URL` - Backend API base URL
- `VITE_APP_NAME` - Application name
- `VITE_APP_VERSION` - Application version
- `VITE_NODE_ENV` - Environment (development/production)
- `VITE_FEATURE_ADMIN_DASHBOARD` - Admin dashboard feature flag
- `VITE_FEATURE_REAL_TIME_UPDATES` - Real-time updates feature flag

### Root (`.env`):
- `MONGO_URI` - MongoDB connection string
- `SECRET_KEY` - JWT secret key
- `ACCESS_TOKEN_EXPIRE_MINUTES` - Token expiration time

> Note: The complete contents for these `.env` files are included in other documents.

## Running with Docker

```bash
# From repository root
cp .env.example .env  # will be provided; edit values as needed
docker compose up --build
```

Services:
- Backend (FastAPI + Socket.IO): http://localhost:8000
- Frontend (built + served by Nginx): http://localhost:5173
- MongoDB: localhost:27017 (volume-backed)

Common operations:
```bash
# Rebuild a service
docker compose build backend frontend

# Start/stop
docker compose up -d
docker compose down

# Tail logs
docker compose logs -f backend
```

## Running locally without Docker

### 1) Start MongoDB
Ensure MongoDB 6+ is running locally or use a remote cluster.

Example local URI for your backend `.env`:
```
MONGO_URI=mongodb://localhost:27017/SmartGov 
```

### 2) Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Create backend/.env with the variables listed above

# Run API + Socket.IO
uvicorn main:app --host 0.0.0.0 --port 8000
```

Health checks:
- REST health: http://localhost:8000/health
- WebSocket health: http://localhost:8000/websocket/health
- Socket.IO: http://localhost:8000/socket.io

### 3) Frontend
```bash
cd frontend
npm install

# Create frontend/.env with VITE_API_BASE_URL (e.g., http://localhost:8000)

npm run dev
```

Open the UI at: http://localhost:5173

## CORS and Real-time Features
- CORS allows http://localhost:5173 (and 127.0.0.1:5173) by default.
- The Socket.IO client must connect using the same API base and path `/socket.io` with `withCredentials: true`.

## Quick Reference
- API: http://localhost:8000
- API docs: http://localhost:8000/docs
- Frontend: http://localhost:5173
- Socket.IO path: http://localhost:8000/socket.io

> Reminder: The content of the `.env` files is maintained in separate documents; add those values before running.
