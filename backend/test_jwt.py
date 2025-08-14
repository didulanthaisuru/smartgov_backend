#!/usr/bin/env python3
"""
Test script to verify JWT functionality
"""

def test_jwt_imports():
    """Test that JWT imports work correctly"""
    try:
        from jose import JWTError, jwt
        from passlib.context import CryptContext
        print("✅ JWT imports successful!")
        return True
    except ImportError as e:
        print(f"❌ JWT import error: {e}")
        return False

def test_jwt_functions():
    """Test basic JWT functionality"""
    try:
        from jose import JWTError, jwt
        from passlib.context import CryptContext
        from datetime import datetime, timedelta
        
        # Test password hashing
        pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        password = "test_password"
        hashed = pwd_context.hash(password)
        verified = pwd_context.verify(password, hashed)
        
        if verified:
            print("✅ Password hashing works!")
        else:
            print("❌ Password hashing failed!")
            return False
        
        # Test JWT encoding/decoding
        secret_key = "test-secret-key"
        data = {"user_id": 123, "email": "test@example.com"}
        
        # Encode
        token = jwt.encode(data, secret_key, algorithm="HS256")
        print("✅ JWT encoding works!")
        
        # Decode
        decoded = jwt.decode(token, secret_key, algorithms=["HS256"])
        if decoded == data:
            print("✅ JWT decoding works!")
        else:
            print("❌ JWT decoding failed!")
            return False
        
        return True
        
    except Exception as e:
        print(f"❌ JWT functionality test failed: {e}")
        return False

if __name__ == "__main__":
    print("🧪 Testing JWT functionality...")
    
    if test_jwt_imports() and test_jwt_functions():
        print("🎉 All JWT tests passed!")
        print("🚀 The application should now work correctly.")
    else:
        print("❌ JWT tests failed. Please run: python fix_dependencies.py")

