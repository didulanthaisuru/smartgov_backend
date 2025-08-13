import os
import asyncio
from dotenv import load_dotenv
# We only need the async client from motor
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

# Use AsyncIOMotorClient to create the client, not MongoClient
client = AsyncIOMotorClient(MONGO_URI)

# The database object for the rest of your app to use
db = client["SmartGov"]

# --- Optional: A function to test the async connection ---
async def ping_server():
    try:
        await client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to async MongoDB!")
    except Exception as e:
        print(e)

# You can run this test when your app starts if you like
if __name__ == "__main__":
    asyncio.run(ping_server())