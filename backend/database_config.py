import motor.motor_asyncio
import os
from dotenv import load_dotenv

load_dotenv()

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
collection_ratings = db["ratings"]

# JWT Configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-this-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

# Add async stubs for FastAPI startup/shutdown compatibility
async def connect_to_mongo():
    pass

async def close_mongo_connection():
    pass

