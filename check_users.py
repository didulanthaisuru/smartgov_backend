#!/usr/bin/env python3
"""
Check what users exist in the database
"""

import asyncio
import sys
import os

# Add the backend directory to the path so we can import modules
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

from database_config import db

async def check_users():
    """Check what users exist in the database"""
    try:
        print("🔍 Checking users in database...")
        
        # Check users collection
        users_collection = db["users"]
        user_count = await users_collection.count_documents({})
        print(f"📊 Total users in collection: {user_count}")
        
        if user_count > 0:
            print("\n👥 Users found:")
            async for user in users_collection.find({}):
                print(f"   - {user.get('first_name', 'N/A')} {user.get('last_name', 'N/A')}")
                print(f"     Email: {user.get('email', 'N/A')}")
                print(f"     NIC: {user.get('nic', 'N/A')}")
                print(f"     Role: {user.get('role', 'user')}")
                print(f"     Active: {user.get('is_active', True)}")
                print()
        else:
            print("❌ No users found in database")
            
        # Check admin collection
        admin_collection = db["admin"]
        admin_count = await admin_collection.count_documents({})
        print(f"📊 Total admins in collection: {admin_count}")
        
        if admin_count > 0:
            print("\n👨‍💼 Admins found:")
            async for admin in admin_collection.find({}):
                print(f"   - {admin.get('admin_name', 'N/A')}")
                print(f"     Email: {admin.get('email', 'N/A')}")
                print(f"     Admin ID: {admin.get('admin_id', 'N/A')}")
                print(f"     Service ID: {admin.get('service_id', 'N/A')}")
                print(f"     Active: {admin.get('is_active', True)}")
                print()
        else:
            print("❌ No admins found in database")
            
    except Exception as e:
        print(f"❌ Error checking database: {e}")

if __name__ == "__main__":
    asyncio.run(check_users())
