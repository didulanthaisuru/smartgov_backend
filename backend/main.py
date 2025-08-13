from fastapi import FastAPI
from routes import appoinment
from routes import document
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
app.include_router(document.router, prefix="/api/documents", tags=["Documents"])
