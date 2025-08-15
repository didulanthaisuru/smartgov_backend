import logging
import os
from typing import Optional

import motor.motor_asyncio
from dotenv import load_dotenv
from pymongo.errors import ConfigurationError

load_dotenv()

# MongoDB configuration
MONGO_URI = os.getenv("MONGO_URI") or "mongodb://localhost:27017"
DB_NAME = os.getenv("DB_NAME", "SmartGov")

# Globals initialized lazily in connect_to_mongo()
client: Optional[motor.motor_asyncio.AsyncIOMotorClient] = None
db = None

# Collections (set after db is initialized)
collection_apointment = None
collection_admin = None
collection_insights = None
collection_main_services = None
collection_messages = None
collection_required_documents = None
collection_users = None
collection_uploaded_documents = None
collection_sub_services = None

async def _init_collections():
	global collection_apointment, collection_admin, collection_insights, collection_main_services
	global collection_messages, collection_required_documents, collection_users
	global collection_uploaded_documents, collection_sub_services
	if db is None:
		return
	collection_apointment = db["AppoinmentNew"]
	collection_admin = db["admin"]
	collection_insights = db["insights"]
	collection_main_services = db["main_services"]
	collection_messages = db["messages"]
	collection_required_documents = db["required_documents"]
	collection_users = db["users"]
	collection_uploaded_documents = db["uploaded_documents"]
	collection_sub_services = db["sub_services"]  # Sub-services are stored in sub_services collection

async def connect_to_mongo():
	"""Establish MongoDB connection with fallback to localhost if SRV DNS fails."""
	global client, db, MONGO_URI
	uri = MONGO_URI
	log = logging.getLogger("database")
	try:
		client = motor.motor_asyncio.AsyncIOMotorClient(uri, serverSelectionTimeoutMS=3000)
		# Ping to verify connection
		await client.admin.command("ping")
		db = client[DB_NAME]
		await _init_collections()
		log.info(f"Connected to MongoDB at {uri} (db={DB_NAME})")
	except ConfigurationError as ce:
		msg = str(ce)
		log.warning(f"MongoDB configuration error: {msg}")
		if "DNS query name does not exist" in msg or uri.startswith("mongodb+srv://"):
			# Fallback to localhost
			fallback = "mongodb://localhost:27017"
			log.info("Falling back to local MongoDB at %s", fallback)
			client = motor.motor_asyncio.AsyncIOMotorClient(fallback, serverSelectionTimeoutMS=3000)
			await client.admin.command("ping")
			db = client[DB_NAME]
			await _init_collections()
			MONGO_URI = fallback
		else:
			raise
	except Exception as e:
		log.error(f"Failed to connect to MongoDB: {e}")
		raise

async def close_mongo_connection():
	"""Close MongoDB connection if open."""
	global client
	if client is not None:
		client.close()
		client = None

