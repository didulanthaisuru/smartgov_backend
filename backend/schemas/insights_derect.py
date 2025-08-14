from pydantic import BaseModel
from typing import List, Optional
from datetime import date, time

class InsightDirectQuery(BaseModel):
    service_id: Optional[str] = None
    sub_service_id: Optional[str] = None
    main_service_id: Optional[str] = None
    date: Optional[date] = None

class InsightDirectResponse(BaseModel):
    date: date
    sub_service_id: str
    main_service_id: str
    average_processing_time: str  # Format: "HH:MM:SS"
    no_show_count: int
    predicted_number_of_visitors: int

class InsightDirectListResponse(BaseModel):
    insights: List[InsightDirectResponse]
    total_count: int
