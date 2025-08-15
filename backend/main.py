from fastapi import FastAPI
from database_config import connect_to_mongo, close_mongo_connection
from routes.routes import api_router
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

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "SmartGov Backend"}

# Include API routes
app.include_router(api_router, prefix="/api/v1")
