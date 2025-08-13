from fastapi import FastAPI
<<<<<<< HEAD
from backend.routes.document import router as documents_router
from backend.database_config import connect_to_mongo, close_mongo_connection

app = FastAPI()

app.include_router(documents_router)

@app.get("/")
async def root():
    return {"message": "Document Upload Service"}

@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()
=======
from routes import appoinment
from database_config import connect_to_mongo, close_mongo_connection

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo_connection()

@app.get("/")
def read_root():
    return {"message": "SmartGov API is running"}

app.include_router(appoinment.router, prefix="/api", tags=["Appointments"])
>>>>>>> 3081573dc5c2b19c6461ddfe6f563bfed7b61e6c
