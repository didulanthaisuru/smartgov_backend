from database_config import db
from typing import Optional


def get_appointments_list(date: Optional[str]):
    """
    Builds a MongoDB aggregation pipeline to fetch appointments,
    filtered by date.
    """
    appointments_collection = db.appointment

    pipeline = []

    # Stage 1: Match by 'completion_date' if a date is provided.
    # This is the primary fix for your filter.
    if date:
        pipeline.append({"$match": {"completion_date": date}})

    # Stage 2: Project the data to match the desired output format.
    # This now uses the correct field names from your collection.
    pipeline.append(
        {
            "$project": {
                "_id": 0,
                # Using the document's _id as the bookingId
                "bookingId": {"$toString": "$_id"},
                "userName": "$user_name",
                "time": "$time",
                "status": "$status",
                "predictedDuration": "$duration_in_minutes"
            }
        }
    )

    # Execute the pipeline
    appointments = list(appointments_collection.aggregate(pipeline))
    
    # Return the results and the total count
    return {"appointments": appointments, "total": len(appointments)}