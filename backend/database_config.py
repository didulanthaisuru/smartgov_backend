# Add async stubs for FastAPI startup/shutdown compatibility
async def connect_to_mongo():
	pass

async def close_mongo_connection():
	pass
import motor.motor_asyncio
import os
from dotenv import load_dotenv

# load environment variables from the .env file
load_dotenv()

# MongoDB URI from .env file
MONGO_URI = os.getenv("MONGO_URI")

# create a client instance for MongoDB
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)

# database
db = client["SmartGov"] 

#collections
collection_insights = db["insights"]
collection_apointment = db["AppoinmentNew"]
collection_users = db["user_with_user_id"]
collection_uploaded_documents = db["uploaded_documents"]
collection_required_documents = db["required_documents"]
collection_sub_services = db["sub_services"] 
collection_main_services = db["main_services"]
 # Sub-services are stored in sub_services collection