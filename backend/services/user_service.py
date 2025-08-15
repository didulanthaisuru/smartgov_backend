from typing import Optional
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorCollection
from pymongo.errors import DuplicateKeyError
import database_config
from models import user, UserInDB
from schemas.auth import UserRegister, UserResponse
from utils.auth import get_password_hash, verify_password

class UserService:
    def __init__(self):
        # Collection resolved at runtime to avoid None before DB connects
        self.collection: Optional[AsyncIOMotorCollection] = None
        # Indexes are ensured on app startup to avoid sync calls here.

    def _col(self) -> AsyncIOMotorCollection:
        if database_config.db is None:
            raise RuntimeError("Database not connected yet")
        return database_config.db["users"]
    
    async def create_user(self, user_data: UserRegister) -> Optional[UserResponse]:
        """Create a new user"""
        try:
            # Check if user already exists
            if await self.get_user_by_email(user_data.email) or await self.get_user_by_nic(user_data.nic):
                return None
            
            # Hash password and create user
            hashed_password = get_password_hash(user_data.passcode)
            
            user_doc = {
                "nic": user_data.nic,
                "first_name": user_data.first_name,
                "last_name": user_data.last_name,
                "phone_number": user_data.phone_number,
                "email": user_data.email,
                "hashed_password": hashed_password,
                "is_active": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
            
            result = await self._col().insert_one(user_doc)
            
            if result.inserted_id:
                return UserResponse(
                    _id=str(result.inserted_id),
                    nic=user_data.nic,
                    first_name=user_data.first_name,
                    last_name=user_data.last_name,
                    phone_number=user_data.phone_number,
                    email=user_data.email,
                    created_at=user_doc["created_at"]
                )
            return None
            
        except DuplicateKeyError:
            return None
        except Exception as e:
            print(f"Error creating user: {e}")
            return None
    
    async def get_user_by_email(self, email: str) -> Optional[UserInDB]:
        """Get user by email"""
        user_doc = await self._col().find_one({"email": email})
        if user_doc:
            return UserInDB(**user_doc)
        return None
    
    async def get_user_by_nic(self, nic: str) -> Optional[UserInDB]:
        """Get user by NIC"""
        user_doc = await self._col().find_one({"nic": nic})
        if user_doc:
            return UserInDB(**user_doc)
        return None
    
    async def get_user_by_id(self, nic: str) -> Optional[UserInDB]:
        """Get user by NIC (primary identifier)"""
        return await self.get_user_by_nic(nic)
    
    async def authenticate_user_by_nic(self, nic: str, password: str) -> Optional[UserInDB]:
        """Authenticate user with NIC and password"""
        user = await self.get_user_by_nic(nic)
        if not user or not user.is_active:
            return None
            
        if not verify_password(password, user.hashed_password):
            return None
            
        return user

# Create service instance
user_service = UserService()
