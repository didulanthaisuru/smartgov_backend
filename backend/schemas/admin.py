from pydantic import BaseModel
from datetime import date,time


class appointment_detail_card_request(BaseModel):
	date: date
	service_id: str  # Changed to str to accept ObjectId strings


class appointment_detail_card(BaseModel):
	appointment_id: str
	duration: time
	appoinment_user_name: str
	appoitment_status: str   #approve/pending/decline
	predicted_duration: time


class view_detailed_appointment_request(BaseModel):
    appointment_id: str


class view_detailed_appointment_response(BaseModel):
    appointment_id: str
    appointment_user_nic: str
    appointment_user_mobile_number: str
    duration: time
    appointment_time: time
    appointment_date: date
    payment_status: bool

    #documents

class appointment_approval_request(BaseModel):
    appointment_id: str

class appointment_approval_response(BaseModel):
    message: str

class appointment_decline_request(BaseModel):
    appointment_id: str
    reason: str
    
class appointment_decline_response(BaseModel):
    message: str







