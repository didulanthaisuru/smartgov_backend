from pydantic import BaseModel
from typing import List
from datetime import date

class InsightQuery(BaseModel):
    sub_service_id: str
    date: date

class MainServiceQuery(BaseModel):
    sub_service_id: str
    main_service_id: str
    date: date

class InsightDetail(BaseModel):
    appointment_id: int
    user_id: int
    sub_service_id: str
    appointment_date: date
    status: str

class AppointmentCountResponse(BaseModel):
    total_count: int
    appointment_ids: List[int]

class SubServiceInsightResponse(BaseModel):
    sub_service_id: str
    date: date
    total_appointments: int
    appointment_ids: List[int]

class MainServiceInsightResponse(BaseModel):
    sub_service_id: str
    main_service_id: str
    date: date
    total_appointments: int
    appointment_ids: List[int]
