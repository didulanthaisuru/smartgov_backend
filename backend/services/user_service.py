from typing import Optional
from datetime import datetime
from pymongo.collection import Collection
from pymongo.errors import DuplicateKeyError
from database_config import db
from models import user, UserInDB
from schemas.auth import UserRegister, UserResponse
from utils.auth import get_password_hash, verify_password

class UserService:
    def __init__(self):
        self.collection: Collection = db["users"]
        # Create unique indexes
        self.collection.create_index("email", unique=True)
        self.collection.create_index("nic", unique=True)  # NIC is primary key
    
    def create_user(self, user_data: UserRegister) -> Optional[UserResponse]:
        """Create a new user"""
        try:
            # Check if user already exists
            if self.get_user_by_email(user_data.email):
                return None
            
            if self.get_user_by_nic(user_data.nic):
                return None
            
            # Hash password and create user
            hashed_password = get_password_hash(user_data.passcode)
            
            user_doc = {
                "nic": user_data.nic,  # Primary identifier
                "first_name": user_data.first_name,
                "last_name": user_data.last_name,
                "phone_number": user_data.phone_number,
                "email": user_data.email,
                "hashed_password": hashed_password,
                "is_active": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
            
            result = self.collection.insert_one(user_doc)
            
            if result.inserted_id:
                return UserResponse(
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
    
    def get_user_by_email(self, email: str) -> Optional[UserInDB]:
        """Get user by email"""
        user_doc = self.collection.find_one({"email": email})
        if user_doc:
            return UserInDB(**user_doc)
        return None
    
    def get_user_by_nic(self, nic: str) -> Optional[UserInDB]:
        """Get user by NIC"""
        user_doc = self.collection.find_one({"nic": nic})
        if user_doc:
            return UserInDB(**user_doc)
        return None
    
    def get_user_by_id(self, nic: str) -> Optional[UserInDB]:
        """Get user by NIC (primary identifier)"""
        user_doc = self.collection.find_one({"nic": nic})
        if user_doc:
            return UserInDB(**user_doc)
        return None
    
    def authenticate_user(self, email: str, password: str) -> Optional[UserInDB]:
        """Authenticate user with email and password"""
        user = self.get_user_by_email(email)
        if not user:
            return None
        
        if not user.is_active:
            return None
            
        if not verify_password(password, user.hashed_password):
            return None
            
        return user
    
    def update_user_last_login(self, nic: str):
        """Update user's last login timestamp"""
        self.collection.update_one(
            {"nic": nic},
            {"$set": {"last_login": datetime.utcnow(), "updated_at": datetime.utcnow()}}
        )
    
    def deactivate_user(self, nic: str) -> bool:
        """Deactivate a user"""
        result = self.collection.update_one(
            {"nic": nic},
            {"$set": {"is_active": False, "updated_at": datetime.utcnow()}}
        )
        return result.modified_count > 0
    
    def activate_user(self, nic: str) -> bool:
        """Activate a user"""
        result = self.collection.update_one(
            {"nic": nic},
            {"$set": {"is_active": True, "updated_at": datetime.utcnow()}}
        )
        return result.modified_count > 0

# Create service instance
user_service = UserService()
