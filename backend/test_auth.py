"""
Simple test script for SmartGov Authentication API
"""
import requests
import json

BASE_URL = "http://localhost:8000/api/v1"

def test_register():
    """Test user registration"""
    print("=== Testing Registration ===")
    register_data = {
        "first_name": "Didula",
        "last_name": "Thaisuru", 
        "nic": "200012345678",
        "phone_number": "0771234567",
        "email": "didula@example.com",
        "passcode": "secure123"
    }
    
    response = requests.post(f"{BASE_URL}/auth/register", json=register_data)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    return response.status_code == 201

def test_login():
    """Test login with NIC via JSON login endpoint"""
    print("\n=== Testing Login (JSON) ===")
    login_data = {
        "nic": "200012345678",
        "passcode": "secure123"
    }
    
    response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 200:
        return response.json().get("access_token")
    return None

def test_oauth2_login():
    """Test login with NIC via OAuth2 token endpoint"""
    print("\n=== Testing OAuth2 Login ===")
    login_data = {
        "username": "200012345678",  # NIC as username
        "password": "secure123"
    }
    
    response = requests.post(
        f"{BASE_URL}/auth/token", 
        data=login_data,  # OAuth2 uses form data
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 200:
        return response.json().get("access_token")
    return None

def test_protected_route(token):
    """Test protected route"""
    print("\n=== Testing Protected Route ===")
    headers = {"Authorization": f"Bearer {token}"}
    
    response = requests.get(f"{BASE_URL}/auth/me", headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    return response.status_code == 200

def main():
    """Run tests"""
    print("🚀 Testing SmartGov Authentication\n")
    
    try:
        # Test registration
        if test_register():
            print("✅ Registration passed")
        else:
            print("❌ Registration failed")
            return
        
        # Test JSON login
        token = test_login()
        if token:
            print("✅ JSON Login passed")
        else:
            print("❌ JSON Login failed")
            return
        
        # Test OAuth2 login
        oauth_token = test_oauth2_login()
        if oauth_token:
            print("✅ OAuth2 Login passed")
        else:
            print("❌ OAuth2 Login failed")
        
        # Test protected route
        if test_protected_route(token):
            print("✅ Protected route passed")
        else:
            print("❌ Protected route failed")
        
        print("\n🎉 All tests completed!")
        
    except requests.exceptions.ConnectionError:
        print("❌ Server not running on http://localhost:8000")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()
