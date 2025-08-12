from fastapi import FastAPI
from routes.admin import dashboard_routes,appointment_routes

app = FastAPI(title="Smart Gov API")



@app.get("/")
def read_root():
    return {"message": "SmartGov API is running"}


app.include_router(dashboard_routes.router)
app.include_router(appointment_routes.router)
