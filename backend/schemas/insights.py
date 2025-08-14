from pydantic import BaseModel
from typing import List, Optional, Any
from datetime import date, datetime

class InsightQuery(BaseModel):
    sub_service_id: str
    date: date

class WeeklyInsightQuery(BaseModel):
    sub_service_id: str
    date: date  # This date will be used to determine the week

class MainServiceQuery(BaseModel):
    sub_service_id: str
    main_service_id: str
    date: date

class WeeklyMainServiceQuery(BaseModel):
    sub_service_id: str
    main_service_id: str
    date: date  # This date will be used to determine the week

class WeeklyCountQuery(BaseModel):
    sub_service_id: str
    date: date  # This date will be used to determine the week

class WeeklyMainServiceCountQuery(BaseModel):
    sub_service_id: str
    main_service_id: str
    date: date  # This date will be used to determine the week

class DayCount(BaseModel):
    day_of_week: str
    date_number: str  # NEW: Format like "2025-08-14"
    appointment_count: int
    status: str = "active"  # active, no_appointments

class WeeklyCountResponse(BaseModel):
    sub_service_id: str
    week_start: date
    week_end: date
    day_counts: List[DayCount]
    total_appointments: int

class SubServiceStep(BaseModel):
    step_id: int
    step_name: str
    status: bool
    completed_by: Optional[str] = None

class InsightDetail(BaseModel):
    _id: Optional[str] = None
    appointment_id: str
    user_id: str
    sub_service_id: str
    sub_service_steps: List[SubServiceStep]
    created_at: Optional[datetime] = None
    is_fully_completed: bool
    appointment_date: date
    day_of_week: str  # Monday, Tuesday, Wednesday, etc.
    actual_date: str  # NEW: Format like "2025-08-14"
    appoinment_time: Optional[datetime] = None
    predicted_duration: Optional[datetime] = None
    payment_status: bool
    status: str = "completed"  # Default status
