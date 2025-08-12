# Import the 'db' object from your new config file
from database_config import db

def get_total_appointments_count_for_admin(admin_id: int):
    """
    Retrieves the count of appointments from MongoDB for a specific admin
    where the status is not 'completed'.
    """
    # Access your collection
    appointments_collection = db.appointment

    # The query now filters by BOTH admin_id AND status
    # In MongoDB, listing multiple fields in a query acts as a logical AND
    query = {
        "admin_id": admin_id,
        "status": {"$ne": "completed"}
    }

    # Execute the query and count the matching documents
    count = appointments_collection.count_documents(query)

    return count