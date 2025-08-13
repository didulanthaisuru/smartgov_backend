from database_config import db
from typing import Optional

async def get_appointments_list(date: Optional[str]):
    """
    Builds and executes an async MongoDB aggregation pipeline 
    to fetch appointments, filtered by date.
    """
    pipeline = []

    # Stage 1: Match by 'completion_date' if a date is provided.
    if date:
        pipeline.append({"$match": {"completion_date": date}})

    # Stage 2: Project the data to match the desired output format.
    pipeline.append(
        {
            "$project": {
                "_id": 0,
                "bookingId": {"$toString": "$_id"},
                "userName": "$user_name",
                "time": "$time",
                "status": "$status",
                "predictedDuration": "$duration_in_minutes"
            }
        }
    )

    # --- THIS IS THE CORRECTED PART ---
    # 1. Execute the pipeline (this returns an awaitable cursor)
    appointments_cursor = db.appointment.aggregate(pipeline)
    
    # 2. Convert the cursor to a list using motor's async method
    appointments = await appointments_cursor.to_list(length=None) # length=None gets all documents
    
    # Return the final results
    return {"appointments": appointments, "total": len(appointments)}