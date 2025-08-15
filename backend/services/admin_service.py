from typing import Optional
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorCollection
from pymongo.errors import DuplicateKeyError
from database_config import db
from models import admin, AdminInDB
from schemas.admin import AdminRegister, AdminResponse
from utils.auth import get_password_hash, verify_password

class AdminService:
    def __init__(self):
        self.collection: AsyncIOMotorCollection = db["admins"]
        # Create unique indexes
        self.collection.create_index("email", unique=True)
        self.collection.create_index("admin_id", unique=True)
    
    async def get_next_admin_id(self) -> int:
        """Generate next admin ID"""
        last_admin = await self.collection.find_one({}, sort=[("admin_id", -1)])
        return 1000 if not last_admin else last_admin["admin_id"] + 1
    
    async def create_admin(self, admin_data: AdminRegister) -> Optional[AdminResponse]:
        """Create a new admin"""
        try:
            # Check if admin already exists
            if await self.get_admin_by_email(admin_data.email):
                return None
            
            # Hash password and create admin
            hashed_password = get_password_hash(admin_data.passcode)
            admin_id = await self.get_next_admin_id()
            
            admin_doc = {
                "admin_id": admin_id,
                "admin_name": admin_data.admin_name,
                "service_id": admin_data.service_id,
                "email": admin_data.email,
                "hashed_password": hashed_password,
                "is_active": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
            
            result = await self.collection.insert_one(admin_doc)
            
            if result.inserted_id:
                return AdminResponse(
                    admin_id=admin_id,
                    admin_name=admin_data.admin_name,
                    service_id=admin_data.service_id,
                    email=admin_data.email,
                    created_at=admin_doc["created_at"]
                )
            return None
            
        except DuplicateKeyError:
            return None
        except Exception as e:
            print(f"Error creating admin: {e}")
            return None
    
    async def get_admin_by_email(self, email: str) -> Optional[AdminInDB]:
        """Get admin by email"""
        admin_doc = await self.collection.find_one({"email": email})
        if admin_doc:
            return AdminInDB(**admin_doc)
        return None
    
    async def get_admin_by_id(self, admin_id: int) -> Optional[AdminInDB]:
        """Get admin by ID"""
        admin_doc = await self.collection.find_one({"admin_id": admin_id})
        if admin_doc:
            return AdminInDB(**admin_doc)
        return None
    
    async def authenticate_admin(self, email: str, password: str) -> Optional[AdminInDB]:
        """Authenticate admin with email and password"""
        admin = await self.get_admin_by_email(email)
        if not admin or not admin.is_active:
            return None
            
        if not verify_password(password, admin.hashed_password):
            return None
            
        return admin

# Create service instance
admin_service = AdminService()
