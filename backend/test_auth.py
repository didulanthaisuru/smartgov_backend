"""
Test script for SmartGov Authentication API
Run this script to test the authentication endpoints
"""
import requests
import json

# API base URL
BASE_URL = "http://localhost:8000/api/v1"

def test_register():
    """Test user registration"""
    print("=== Testing User Registration ===")
    
    register_data = {
        "first_name": "Didula",
        "last_name": "Thaisuru",
        "nic": "200012345678",
        "phone_number": "0771234567",
        "email": "didula@example.com",
        "passcode": "secure123"
    }
    
    response = requests.post(f"{BASE_URL}/auth/register", json=register_data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    return response.status_code == 201

def test_login():
    """Test user login"""
    print("\n=== Testing User Login ===")
    
    login_data = {
        "email": "didula@example.com",
        "passcode": "secure123"
    }
    
    response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 200:
        return response.json().get("access_token")
    return None

def test_protected_route(token):
    """Test protected route with JWT token"""
    print("\n=== Testing Protected Route ===")
    
    headers = {
        "Authorization": f"Bearer {token}"
    }
    
    response = requests.get(f"{BASE_URL}/auth/me", headers=headers)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    return response.status_code == 200

def test_test_protected():
    """Test the test-protected endpoint"""
    print("\n=== Testing Test Protected Endpoint ===")
    
    # First login to get token
    login_data = {
        "email": "didula@example.com",
        "passcode": "secure123"
    }
    
    login_response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    if login_response.status_code != 200:
        print("Login failed!")
        return False
    
    token = login_response.json().get("access_token")
    headers = {
        "Authorization": f"Bearer {token}"
    }
    
    response = requests.get(f"{BASE_URL}/auth/test-protected", headers=headers)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    return response.status_code == 200

def main():
    """Run all tests"""
    print("🚀 Starting SmartGov Authentication Tests\n")
    
    try:
        # Test registration
        if test_register():
            print("✅ Registration test passed")
        else:
            print("❌ Registration test failed")
            return
        
        # Test login
        token = test_login()
        if token:
            print("✅ Login test passed")
        else:
            print("❌ Login test failed")
            return
        
        # Test protected route
        if test_protected_route(token):
            print("✅ Protected route test passed")
        else:
            print("❌ Protected route test failed")
        
        # Test another protected route
        if test_test_protected():
            print("✅ Test protected endpoint passed")
        else:
            print("❌ Test protected endpoint failed")
        
        print("\n🎉 All tests completed!")
        
    except requests.exceptions.ConnectionError:
        print("❌ Connection error! Make sure the server is running on http://localhost:8000")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()
