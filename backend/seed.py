import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
from bson import ObjectId

# Load environment variables
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = "SmartGov"
COLLECTION_NAME = "services"

# Define the dummy data with doc_id as an integer
dummy_services = [
    {
        "_id": ObjectId(),
        "service_name": "Birth Certificates Issue",
        "department_id": 101,
        "icon_name": "child_friendly",
        "sub_services": [
            {
                "service_id": 1101,
                "service_name": "New Born Certificate at hospital",
                "required_documents": [
                    {"doc_id": 1, "doc_name": "Hospital Birth Report"}, # CHANGED
                    {"doc_id": 2, "doc_name": "Parent's National ID Copy"} # CHANGED
                ],
                "payment_amount": 250.00
            },
            {
                "service_id": 1102,
                "service_name": "Get Copy of Existing Birth Certificate",
                "required_documents": [
                    {"doc_id": 3, "doc_name": "Applicant's National ID Copy"} # CHANGED
                ],
                "payment_amount": 500.50
            }
        ]
    },
    {
        "_id": ObjectId(),
        "service_name": "Business Registration",
        "department_id": 205,
        "icon_name": "business_center",
        "sub_services": [
            {
                "service_id": 2101,
                "service_name": "Register a New Private Company",
                "required_documents": [
                    {"doc_id": 4, "doc_name": "Company Registration Form 1"}, # CHANGED
                    {"doc_id": 5, "doc_name": "Articles of Association"} # CHANGED
                ],
                "payment_amount": 5000.00
            }
        ]
    }
]

async def seed_database():
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[DB_NAME]
    collection = db[COLLECTION_NAME]
    
    print("Connecting to database...")
    try:
        print(f"Deleting existing documents from '{COLLECTION_NAME}' collection...")
        await collection.delete_many({})
        print("Inserting new dummy data...")
        await collection.insert_many(dummy_services)
        print(f"Successfully inserted {len(dummy_services)} documents.")
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        client.close()
        print("Database connection closed.")

if __name__ == "__main__":
    asyncio.run(seed_database())
