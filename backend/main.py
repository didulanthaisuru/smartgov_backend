from fastapi import FastAPI
from routes.admin import admin_view_completed

app = FastAPI()

app.include_router(admin_view_completed.router) 

@app.get("/")
def read_root():
    return {"message": "SmartGov API is running"}
