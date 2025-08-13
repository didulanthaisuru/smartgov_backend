from fastapi import FastAPI
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