from fastapi import FastAPI
from database_config import connect_to_mongo, close_mongo_connection
from routes.dashboard import router as dashboard_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


origins = [
    "http://localhost:5173", # The origin of your React app
    # Add any other origins if needed
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

# Include routers
app.include_router(dashboard_router)

# Note: Uncomment these when you have the actual routers implemented
# app.include_router(insights_router)
# app.include_router(admin_router)