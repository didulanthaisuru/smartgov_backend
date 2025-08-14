from fastapi import FastAPI
from database_config import connect_to_mongo, close_mongo_connection
from routes.routes import api_router
from config import settings

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.PROJECT_DESCRIPTION,
    version=settings.PROJECT_VERSION
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo_connection()

@app.get("/")
def read_root():
    return {"message": "SmartGov API is running"}

# Include all routers from the centralized routes file
app.include_router(api_router, prefix=settings.API_V1_STR)