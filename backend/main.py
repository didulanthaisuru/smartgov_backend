from fastapi import FastAPI
from routes.dashboard import router as service_router
from routes.user_appointment_get import router as appointment_router
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

app.include_router(service_router)
app.include_router(appointment_router)