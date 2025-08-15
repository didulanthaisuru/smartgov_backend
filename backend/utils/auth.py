import os
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from dotenv import load_dotenv
from database_config import SECRET_KEY, ACCESS_TOKEN_EXPIRE_MINUTES,ALGORITHM

load_dotenv()



# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Hash a password"""
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Create a JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str) -> Optional[dict]:
    """Verify and decode a JWT token"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

def decode_access_token(token: str):
    """Decode access token and return user/admin data"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        # Check if it's an admin token (has admin_id and role)
        if "admin_id" in payload and "role" in payload:
            admin_id = payload.get("admin_id")
            email = payload.get("email")
            role = payload.get("role")
            service_id = payload.get("service_id")
            if admin_id is None or email is None or role != "admin":
                return None
            return {"admin_id": admin_id, "email": email, "role": role, "service_id": service_id}
        
        # Check if it's a user token (has nic and email)
        elif "nic" in payload and "email" in payload:
            nic = payload.get("nic")
            email = payload.get("email")
            if nic is None or email is None:
                return None
            return {"nic": nic, "email": email}
        
        return None
    except JWTError:
        return None
