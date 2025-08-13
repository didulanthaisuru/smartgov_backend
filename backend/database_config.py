import os
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = "SmartGov" 

# Create a new client and connect to the server
class Database:
    client: AsyncIOMotorClient = None

db = Database()

async def connect_to_mongo():
    """Connects to the MongoDB database."""
    print("Connecting to MongoDB...")
    db.client = AsyncIOMotorClient(MONGO_URI)
    print("Successfully connected to MongoDB!")

async def close_mongo_connection():
    """Closes the MongoDB connection."""
    print("Closing MongoDB connection...")
    db.client.close()
    print("MongoDB connection closed.")

async def get_database() -> AsyncIOMotorClient:
    """
    A dependency function to get the database client.
    This will be used in your route functions.
    """
    return db.client[DB_NAME]


#Test the db connection
if __name__ == "__main__":

    async def main():
        await connect_to_mongo()
        try:
            db_instance = await get_database()
            await db_instance.client.admin.command('ping')
            print("Pinged your deployment. You successfully connected to MongoDB!")
        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            await close_mongo_connection()

    # Run the async main function
    asyncio.run(main())


