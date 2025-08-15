from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class RatingCreate(BaseModel):
    appointment_id: str = Field(..., description="ID of the appointment being rated")
    rating: int = Field(..., ge=1, le=5, description="Rating from 1 to 5")
    feedback: str = Field(..., min_length=1, max_length=1000, description="User feedback text")

class RatingResponse(BaseModel):
    rating_id: str
    appointment_id: str
    rating: int
    feedback: str
    created_at: datetime
    message: str

class RatingInDB(BaseModel):
    appointment_id: str
    rating: int
    feedback: str
    created_at: datetime = Field(default_factory=datetime.now)
