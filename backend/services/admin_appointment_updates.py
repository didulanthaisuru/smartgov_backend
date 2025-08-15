from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Dict, Any
from datetime import datetime
from bson import ObjectId

from schemas.admin_appointment_updates import (
    appointment_steps_update_request,
    appointment_completion_update_request
)

async def update_appointment_steps(
    db: AsyncIOMotorClient, 
    update_request: appointment_steps_update_request
) -> Dict[str, Any]:
    """
    Updates the status and completion details for specific steps in an appointment.
    """
    try:
        # Find the appointment
        appointment = await db.AppoinmentNew.find_one(
            {"_id": ObjectId(update_request.appointment_id)}
        )
        
        if not appointment:
            raise ValueError("Appointment not found")
        
        # Create a copy of the current steps to modify
        current_steps = appointment.get("sub_service_steps", [])
        steps_modified = False
        
        # Update the steps based on the request
        for step_update in update_request.steps:
            # Find the corresponding step in the appointment
            for step in current_steps:
                if step["step_id"] == step_update.step_id:
                    # Check if the status actually needs to change
                    if step["status"] != step_update.status:
                        # Update the step
                        step["status"] = step_update.status
                        if step_update.status:
                            # When marking as completed, store the current datetime
                            step["completed_by"] = datetime.utcnow()
                        else:
                            # When marking as incomplete, clear the completion timestamp
                            step["completed_by"] = None
                        steps_modified = True
                    break
        
        # Only update if there were actual changes
        if steps_modified:
            # Update the appointment in the database
            result = await db.AppoinmentNew.update_one(
                {"_id": ObjectId(update_request.appointment_id)},
                {
                    "$set": {
                        "sub_service_steps": current_steps,
                        "updated_at": datetime.utcnow()
                    }
                }
            )
            
            if result.matched_count == 0:
                raise ValueError("Appointment not found during update")
            
            return {
                "appointment_id": update_request.appointment_id,
                "updated_steps": [step for step in current_steps if step["step_id"] in [s.step_id for s in update_request.steps]],
                "updated_at": datetime.utcnow()
            }
        else:
            # No changes were needed
            return {
                "appointment_id": update_request.appointment_id,
                "message": "No changes were needed - steps already in requested state",
                "updated_steps": [step for step in current_steps if step["step_id"] in [s.step_id for s in update_request.steps]]
            }
        
    except Exception as e:
        raise Exception(f"Error updating appointment steps: {str(e)}")

async def update_appointment_completion(
    db: AsyncIOMotorClient, 
    update_request: appointment_completion_update_request
) -> Dict[str, Any]:
    """
    Updates the overall completion status of an appointment.
    """
    try:
        # Find the appointment
        appointment = await db.AppoinmentNew.find_one(
            {"_id": ObjectId(update_request.appointment_id)}
        )
        
        if not appointment:
            raise ValueError("Appointment not found")
        
        # Check if the completion status actually needs to change
        if appointment.get("is_fully_completed") == update_request.is_fully_completed:
            return {
                "appointment_id": update_request.appointment_id,
                "message": "No changes were needed - appointment already in requested completion state",
                "is_fully_completed": update_request.is_fully_completed
            }
        
        # Update the completion status
        update_data = {
            "is_fully_completed": update_request.is_fully_completed,
            "updated_at": datetime.utcnow()
        }
        
        # If marking as completed, add completion timestamp
        if update_request.is_fully_completed:
            update_data["completed_at"] = datetime.utcnow()
        
        # Update the appointment in the database
        result = await db.AppoinmentNew.update_one(
            {"_id": ObjectId(update_request.appointment_id)},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise ValueError("Appointment not found during update")
        
        return {
            "appointment_id": update_request.appointment_id,
            "is_fully_completed": update_request.is_fully_completed,
            "updated_at": datetime.utcnow()
        }
        
    except Exception as e:
        raise Exception(f"Error updating appointment completion: {str(e)}")