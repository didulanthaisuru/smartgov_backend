#!/usr/bin/env python3
"""
Test script for insights_direct endpoints
"""

import requests
import json
from datetime import date

# Base URL for the API
BASE_URL = "http://localhost:8000"

def test_insights_direct_endpoints():
    """Test the three insights_direct endpoints"""
    
    print("Testing Insights Direct Endpoints...")
    print("=" * 50)
    
    # Test 1: Get insights by sub_service_id and date
    print("\n1. Testing GET /insights-direct/sub-service/SUB001/date/2025-08-01:")
    try:
        response = requests.get(
            f"{BASE_URL}/insights-direct/sub-service/SUB001/date/2025-08-01"
        )
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2, default=str)}")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Exception: {e}")
    
    # Test 2: Get insights by main_service_id and date
    print("\n2. Testing GET /insights-direct/main-service/MAIN001/date/2025-08-01:")
    try:
        response = requests.get(
            f"{BASE_URL}/insights-direct/main-service/MAIN001/date/2025-08-01"
        )
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2, default=str)}")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Exception: {e}")
    
    # Test 3: Get insights by sub_service_id, main_service_id and date
    print("\n3. Testing GET /insights-direct/sub-service/SUB001/main-service/MAIN001/date/2025-08-01:")
    try:
        response = requests.get(
            f"{BASE_URL}/insights-direct/sub-service/SUB001/main-service/MAIN001/date/2025-08-01"
        )
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2, default=str)}")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Exception: {e}")

if __name__ == "__main__":
    test_insights_direct_endpoints()
