import motor.motor_asyncio
import os
from dotenv import load_dotenv
from bson import ObjectId

# Load environment variables
load_dotenv()

# MongoDB connection
MONGO_URI = os.getenv("MONGO_URI")
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
db = client["SmartGov"]
collection = db["AppoinmentNew"]

async def debug_collection():
    print("=== Debugging AppoinmentNew Collection ===")
    
    # 1. Count total documents
    count = await collection.count_documents({})
    print(f"Total documents in collection: {count}")
    
    # 2. Get first few documents
    print("\n=== First 5 documents ===")
    async for doc in collection.find().limit(5):
        print(f"ID: {doc.get('_id')}")
        print(f"Appointment ID: {doc.get('appointment_id')}")
        print(f"User ID: {doc.get('user_id')}")
        print("---")
    
    # 3. Try to find the specific document
    print("\n=== Looking for specific document ===")
    try:
        doc = await collection.find_one({"_id": ObjectId("689cab6cbf8c4f47139fe116")})
        if doc:
            print("✅ Found document by ObjectId")
            print(f"Appointment ID: {doc.get('appointment_id')}")
        else:
            print("❌ Document not found by ObjectId")
    except Exception as e:
        print(f"❌ Error finding by ObjectId: {e}")
    
    # 4. Try to find by appointment_id
    try:
        doc = await collection.find_one({"appointment_id": 156})
        if doc:
            print("✅ Found document by appointment_id")
            print(f"ObjectId: {doc.get('_id')}")
        else:
            print("❌ Document not found by appointment_id")
    except Exception as e:
        print(f"❌ Error finding by appointment_id: {e}")
    
    # 5. Check collection names
    print("\n=== Available collections ===")
    collections = await db.list_collection_names()
    for col in collections:
        if "appointment" in col.lower() or "apoinment" in col.lower():
            print(f"Found collection: {col}")

if __name__ == "__main__":
    import asyncio
    asyncio.run(debug_collection())
