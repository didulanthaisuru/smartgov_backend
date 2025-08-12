# Import the 'db' object from your new config file
from database_config import db

def get_total_appointments_count():
    """
    Retrieves the count of appointments from MongoDB
    where the status is not 'completed'.
    """
    # Access your collection directly from the 'db' object
    appointments_collection = db.appointment
    # The rest of the function remains the same
    query = {"status": {"$ne": "completed"}}
    count = appointments_collection.count_documents(query)
    print(count)
    return count