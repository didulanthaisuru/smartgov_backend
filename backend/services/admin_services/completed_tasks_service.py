from typing import List, Dict, Any
import pymongo
from database_config import db

async def get_completed_tasks_by_date(date: str) -> List[Dict[str, Any]]:
    """
    Retrieves a list of completed appointments from the database for a given date.

    Args:
        date: The date to filter appointments by, in "YYYY-MM-DD" format.

    Returns:
        A list of dictionaries, where each dictionary is a completed appointment.
    """
    try:
        # Use the 'appointment' collection
        collection = db["appointment"] 

        query = {
            "completion_date": date,
            "status": "completed" 
        }

        projection = {
            "_id": 0, 
            "time": 1,
            "user_name": 1,
            "duration_in_minutes": 1,
            "rating": 1,
            "message": 1
        }
        
        cursor = collection.find(query, projection)
        tasks = await cursor.to_list(length=None)  # This line fixes the error
        return tasks

    except pymongo.errors.PyMongoError as e:
        print(f"Database error in get_completed_tasks_by_date: {e}")
        raise