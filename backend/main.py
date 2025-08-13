from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.user_profile import router as user_profile_router


app = FastAPI()

app = FastAPI(
    title="SmartGov",
    description="Smart Government app for managing citizen services and government operations.",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

app.include_router(user_profile_router, prefix="/api", tags=["user_profile"])


# Simple health endpoint
@app.get("/health")
async def health():
    return {"status": "ok"}