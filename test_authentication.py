#!/usr/bin/env python3
"""
Test authentication endpoints with the created credentials
"""

import asyncio
import aiohttp
import json

async def test_admin_login():
    """Test admin login"""
    try:
        print("👨‍💼 Testing admin login...")
        
        async with aiohttp.ClientSession() as session:
            login_data = {
                "email": "a@gmail.com",
                "passcode": "avishka123"
            }
            
            async with session.post(
                "http://localhost:8000/api/v1/admin/sign_in",
                json=login_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 200:
                    result = await response.json()
                    print(f"✅ Admin login successful!")
                    print(f"   Token type: {result.get('token_type', 'N/A')}")
                    print(f"   Access token: {result.get('access_token', 'N/A')[:50]}...")
                    return result.get('access_token')
                else:
                    error = await response.text()
                    print(f"❌ Admin login failed: {response.status} - {error}")
                    return None
                    
    except Exception as e:
        print(f"❌ Admin login error: {e}")
        return None

async def test_user_login():
    """Test user login"""
    try:
        print("\n👤 Testing user login...")
        
        async with aiohttp.ClientSession() as session:
            login_data = {
                "nic": "200235112766",
                "passcode": "12345678"
            }
            
            async with session.post(
                "http://localhost:8000/api/v1/auth/sign_in",
                json=login_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 200:
                    result = await response.json()
                    print(f"✅ User login successful!")
                    print(f"   Token type: {result.get('token_type', 'N/A')}")
                    print(f"   Access token: {result.get('access_token', 'N/A')[:50]}...")
                    return result.get('access_token')
                else:
                    error = await response.text()
                    print(f"❌ User login failed: {response.status} - {error}")
                    return None
                    
    except Exception as e:
        print(f"❌ User login error: {e}")
        return None

async def test_chat_endpoints(admin_token, user_token):
    """Test chat endpoints with authentication"""
    try:
        print("\n💬 Testing chat endpoints...")
        
        async with aiohttp.ClientSession() as session:
            # Test chat users endpoint (admin only)
            if admin_token:
                headers = {"Authorization": f"Bearer {admin_token}"}
                async with session.get(
                    "http://localhost:8000/api/chat/users",
                    headers=headers
                ) as response:
                    if response.status == 200:
                        users = await response.json()
                        print(f"✅ Chat users endpoint: Found {len(users)} users")
                    else:
                        error = await response.text()
                        print(f"❌ Chat users endpoint failed: {response.status} - {error}")
            
            # Test chat history endpoint (both admin and user)
            for token, role in [(admin_token, "admin"), (user_token, "user")]:
                if token:
                    headers = {"Authorization": f"Bearer {token}"}
                    async with session.get(
                        "http://localhost:8000/api/chat/history/test_user_123",
                        headers=headers
                    ) as response:
                        if response.status == 200:
                            history = await response.json()
                            print(f"✅ Chat history endpoint ({role}): Found {len(history)} messages")
                        else:
                            error = await response.text()
                            print(f"⚠️  Chat history endpoint ({role}): {response.status} - No messages found")
        
        return True
    except Exception as e:
        print(f"❌ Chat endpoints test error: {e}")
        return False

async def main():
    """Main test function"""
    print("🧪 Testing Authentication and Chat Endpoints")
    print("=" * 60)
    
    # Test admin login
    admin_token = await test_admin_login()
    
    # Test user login
    user_token = await test_user_login()
    
    # Test chat endpoints
    if admin_token or user_token:
        await test_chat_endpoints(admin_token, user_token)
    
    # Summary
    print("\n📊 Authentication Test Summary:")
    print(f"   Admin Login: {'✅ Success' if admin_token else '❌ Failed'}")
    print(f"   User Login: {'✅ Success' if user_token else '❌ Failed'}")
    
    if admin_token and user_token:
        print("\n🎉 Both authentication tests passed!")
        print("\n🚀 Ready for chat testing!")
        print("\nNext steps:")
        print("1. Open frontend: http://localhost:5174/")
        print("2. Login with either credential set")
        print("3. Navigate to chat pages")
        print("4. Test real-time messaging")
        return True
    else:
        print("\n⚠️  Some authentication tests failed.")
        return False

if __name__ == "__main__":
    try:
        result = asyncio.run(main())
        exit(0 if result else 1)
    except KeyboardInterrupt:
        print("\n⏹️  Tests interrupted by user")
        exit(1)
    except Exception as e:
        print(f"\n💥 Unexpected error: {e}")
        exit(1)
