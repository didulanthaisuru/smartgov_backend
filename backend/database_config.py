import motor.motor_asyncio
import os
from dotenv import load_dotenv
# Add async stubs for FastAPI startup/shutdown compatibility


load_dotenv()

# load environment variables from the .env file
# load environment variables from the .env file

# MongoDB URI from .env file
# MongoDB URI from .env file
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = "SmartGov" 

# create a client instance for MongoDB
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)

# database
db = client["SmartGov"] 

#collections
collection_apointment = db["AppoinmentNew"]
collection_admin = db["admin"]
collection_insights = db["insights"]
collection_main_services = db["main_services"]
collection_messages = db["messages"]
collection_required_documents = db["required_documents"]
collection_users = db["users"]
collection_uploaded_documents = db["uploaded_documents"]
collection_sub_services = db["sub_services"] 
 # Sub-services are stored in sub_services collection

async def connect_to_mongo():
	pass

async def close_mongo_connection():
	pass

# Add async stubs for FastAPI startup/shutdown compatibility
async def connect_to_mongo():
	pass

async def close_mongo_connection():
	pass

