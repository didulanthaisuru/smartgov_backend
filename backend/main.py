from fastapi import FastAPI
from database_config import connect_to_mongo, close_mongo_connection
from routes.routes import api_router
# from config import settings

from routes.dashboard import router as dashboard_router

from routes.appoinment import router as appointment_router
from routes.document import router as document_router
from routes.insights import router as insights_router
from routes.insights_derect import router as insights_direct_router
#rom routes.adminimport router as admin_router


from fastapi.middleware.cors import CORSMiddleware

# Create FastAPI app
app = FastAPI(
    title="SmartGov API",
    description="Government Services Management System",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "message": "SmartGov API is running",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc"
    }



# Include all routers from the centralized routes file
app.include_router(api_router, prefix=settings.API_V1_STR)

# Include all routers
app.include_router(dashboard_router)
app.include_router(appointment_router)
app.include_router(document_router)
app.include_router(insights_router)
app.include_router(insights_direct_router)
#pp.include_router(admin_router)


@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "SmartGov Backend"}

# Include API routes
app.include_router(api_router, prefix="/api/v1")

