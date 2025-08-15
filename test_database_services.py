#!/usr/bin/env python3
"""
Manual test to verify database and chat functionality
"""

import asyncio
import sys
import os

# Add the backend directory to the path
sys.path.append('/home/tharuka/Documents/GitHub/smartgov_backend/backend')

from services.chat_service import get_chat_history_service, get_chat_users_service
import database_config

async def test_database_connection():
    """Test basic database connectivity"""
    try:
        print("🔗 Testing database connection...")
        
        # Test database connection
        db = database_config.db
        
        # Try to list collections
        collections = await db.list_collection_names()
        print(f"✅ Database connected! Collections found: {collections}")
        
        return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False

async def test_chat_services():
    """Test chat service functions"""
    try:
        print("\n📊 Testing chat services...")
        
        # Test get_chat_users_service
        print("Testing get_chat_users_service...")
        users = await get_chat_users_service(database_config.db)
        print(f"✅ Found {len(users)} users in database")
        
        if users:
            # Test get_chat_history_service with first user
            test_user_id = users[0].get('_id')
            print(f"Testing get_chat_history_service for user: {test_user_id}")
            history = await get_chat_history_service(test_user_id, database_config.db)
            print(f"✅ Found {len(history)} messages for user {test_user_id}")
        
        return True
    except Exception as e:
        print(f"❌ Chat services test failed: {e}")
        return False

async def test_message_storage():
    """Test message storage in database"""
    try:
        print("\n💾 Testing message storage...")
        
        db = database_config.db
        messages_collection = db["messages"]
        
        # Insert a test message
        test_message = {
            "sender_id": "test_user_123",
            "receiver_id": "admin",
            "content": "Database test message",
            "timestamp": "2025-08-15T16:25:00.000Z",
            "message_type": "text"
        }
        
        result = await messages_collection.insert_one(test_message)
        print(f"✅ Test message inserted with ID: {result.inserted_id}")
        
        # Retrieve the message
        retrieved = await messages_collection.find_one({"_id": result.inserted_id})
        if retrieved:
            print(f"✅ Message retrieved successfully: {retrieved['content']}")
            
            # Clean up - delete the test message
            await messages_collection.delete_one({"_id": result.inserted_id})
            print("✅ Test message cleaned up")
            
        return True
    except Exception as e:
        print(f"❌ Message storage test failed: {e}")
        return False

async def main():
    """Run all database and service tests"""
    print("🧪 Starting Database and Service Tests")
    print("=" * 50)
    
    results = []
    
    # Test database connection
    results.append(await test_database_connection())
    
    # Test chat services
    results.append(await test_chat_services())
    
    # Test message storage
    results.append(await test_message_storage())
    
    # Results summary
    print(f"\n📊 Test Results Summary:")
    print(f"✅ Passed: {sum(results)}/{len(results)} tests")
    print(f"❌ Failed: {len(results) - sum(results)}/{len(results)} tests")
    
    if all(results):
        print("\n🎉 All database and service tests passed!")
        return True
    else:
        print("\n⚠️  Some tests failed. Check the logs above.")
        return False

if __name__ == "__main__":
    print("🚀 Database and Service Test")
    print("=" * 50)
    
    try:
        result = asyncio.run(main())
        if result:
            print("\n✅ All tests completed successfully!")
            exit(0)
        else:
            print("\n❌ Some tests failed!")
            exit(1)
    except KeyboardInterrupt:
        print("\n⏹️  Tests interrupted by user")
        exit(1)
    except Exception as e:
        print(f"\n💥 Unexpected error: {e}")
        exit(1)
