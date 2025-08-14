from fastapi import FastAPI
from database_config import connect_to_mongo, close_mongo_connection
<<<<<<< HEAD
from routes.routes import api_router
from config import settings
=======
from routes.dashboard import router as dashboard_router

from routes.appoinment import router as appointment_router
from routes.document import router as document_router
from routes.insights import router as insights_router
from routes.insights_derect import router as insights_direct_router
#rom routes.adminimport router as admin_router
>>>>>>> cb8f237f79c80a35b5db4a0d7c45a8e873f47b50

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

<<<<<<< HEAD
# Include all routers from the centralized routes file
app.include_router(api_router, prefix=settings.API_V1_STR)
=======
# Include all routers
app.include_router(dashboard_router)
app.include_router(appointment_router)
app.include_router(document_router)
app.include_router(insights_router)
app.include_router(insights_direct_router)
#pp.include_router(admin_router)
>>>>>>> cb8f237f79c80a35b5db4a0d7c45a8e873f47b50
