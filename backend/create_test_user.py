from services.user_service import user_service
from schemas.auth import UserRegister
from utils.auth import get_password_hash

def create_test_user():
    """Create a test user for login testing"""
    try:
        # Test user data
        test_user_data = UserRegister(
            first_name="Test",
            last_name="User",
            nic="123456789012",
            phone_number="+94123456789",
            email="test@example.com",
            passcode="password123"
        )
        
        # Check if user already exists
        existing_user = user_service.get_user_by_nic(test_user_data.nic)
        if existing_user:
            print("Test user already exists!")
            return
        
        # Create the user
        new_user = user_service.create_user(test_user_data)
        if new_user:
            print("Test user created successfully!")
            print(f"NIC: {new_user.nic}")
            print(f"Email: {new_user.email}")
            print(f"Name: {new_user.first_name} {new_user.last_name}")
        else:
            print("Failed to create test user")
            
    except Exception as e:
        print(f"Error creating test user: {e}")

if __name__ == "__main__":
    create_test_user()
