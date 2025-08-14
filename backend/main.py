from fastapi import FastAPI
from database_config import connect_to_mongo, close_mongo_connection
from routes.dashboard import router as dashboard_router

from routes.appoinment import router as appointment_router
from routes.document import router as document_router
from routes.insights import router as insights_router
from routes.insights_derect import router as insights_direct_router
#rom routes.adminimport router as admin_router

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


origins = [
    "http://localhost:5173", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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

# Include all routers
app.include_router(dashboard_router)
app.include_router(appointment_router)
app.include_router(document_router)
app.include_router(insights_router)
app.include_router(insights_direct_router)
#pp.include_router(admin_router)