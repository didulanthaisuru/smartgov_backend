from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date, time
from bson import ObjectId

class DailySubserviceMatrixRequest(BaseModel):
    date: Optional[date] = None
    service_id: Optional[int] = None
    main_service_id: Optional[int] = None

class DailySubserviceMatrixResponse(BaseModel):
    id: str = Field(default=None, alias="_id")
    matrics_id: str = Field(..., alias="matrics_id")
    date: date
    day_of_week: str
    service_id: int
    main_service_id: int
    total_appointments: int
    appointment_ids: dict
    no_appointment_user_count: int
    average_processing_time: time
    no_show_count: int

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
