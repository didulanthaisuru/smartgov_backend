from pydantic import BaseModel
from datetime import date

class InsightQuery(BaseModel):
	date: date
	service_id: int
	main_service_id: int

class MainServiceQuery(BaseModel):
	date: date
	main_service_id: int

class InsightDetail(BaseModel):
	id: str  # MongoDB ObjectId as string
	date: date
	day_of_week: str
	service_id: int
	main_service_id: int
	average_processing_time: str
	no_show_count: int
