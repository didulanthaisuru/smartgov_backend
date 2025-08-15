#!/usr/bin/env python3
"""
Comprehensive test script for all insights endpoints
"""

import requests
import json
from datetime import date

# Base URL for the API
BASE_URL = "http://127.0.0.1:8000"

def test_insights_direct_endpoints():
    """Test insights_direct endpoints"""
    print("=== Testing Insights Direct Endpoints ===")
    
    # Test 1: Get insights by date and sub_service_id
    print("\n1. Testing GET /insights-direct/sub-service/{sub_service_id}/date/{query_date}")
    sub_service_id = "SUB001"
    query_date = "2025-08-01"
    
    response = requests.get(f"{BASE_URL}/insights-direct/sub-service/{sub_service_id}/date/{query_date}")
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        print("Response:", json.dumps(response.json(), indent=2))
    else:
        print("Error:", response.text)
    
    # Test 2: Get insights by main_service_id and date
    print("\n2. Testing GET /insights-direct/main-service/{main_service_id}/date/{query_date}")
    main_service_id = "MAIN001"
    
    response = requests.get(f"{BASE_URL}/insights-direct/main-service/{main_service_id}/date/{query_date}")
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        print("Response:", json.dumps(response.json(), indent=2))
    else:
        print("Error:", response.text)
    
    # Test 3: Get insights by sub_service_id, main_service_id and date
    print("\n3. Testing GET /insights-direct/sub-service/{sub_service_id}/main-service/{main_service_id}/date/{query_date}")
    
    response = requests.get(f"{BASE_URL}/insights-direct/sub-service/{sub_service_id}/main-service/{main_service_id}/date/{query_date}")
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        print("Response:", json.dumps(response.json(), indent=2))
    else:
        print("Error:", response.text)

def test_existing_insights_endpoints():
    """Test existing insights POST endpoints"""
    print("\n=== Testing Existing Insights POST Endpoints ===")
    
    # Test 1: POST /insights/view-service_insights
    print("\n1. Testing POST /insights/view-service_insights")
    payload = {
        "sub_service_id": "689cd830ef2618d4dfe5a595",
        "date": "2025-08-14"
    }
    
    response = requests.post(f"{BASE_URL}/insights/view-service_insights", json=payload)
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"Found {len(result)} appointments")
        if result:
            print("First appointment:", json.dumps(result[0], indent=2))
        else:
            print("No appointments found for this date")
    else:
        print("Error:", response.text)
    
    # Test 2: POST /insights/view-mainservice-insights
    print("\n2. Testing POST /insights/view-mainservice-insights")
    payload = {
        "sub_service_id": "689cd830ef2618d4dfe5a595",
        "main_service_id": "MAIN001",
        "date": "2025-08-14"
    }
    
    response = requests.post(f"{BASE_URL}/insights/view-mainservice-insights", json=payload)
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"Found {len(result)} appointments")
        if result:
            print("First appointment:", json.dumps(result[0], indent=2))
        else:
            print("No appointments found for this date")
    else:
        print("Error:", response.text)

def test_weekly_insights_endpoints():
    """Test weekly insights POST endpoints"""
    print("\n=== Testing Weekly Insights POST Endpoints ===")
    
    # Test 1: POST /insights/view-weekly-service_insights
    print("\n1. Testing POST /insights/view-weekly-service_insights")
    payload = {
        "sub_service_id": "689cd830ef2618d4dfe5a595",
        "date": "2025-08-14"  # This will get the week containing Aug 14, 2025
    }
    
    response = requests.post(f"{BASE_URL}/insights/view-weekly-service_insights", json=payload)
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"Found {len(result)} appointments for the week")
        if result:
            print("First appointment:", json.dumps(result[0], indent=2))
        else:
            print("No appointments found for this week")
    else:
        print("Error:", response.text)
    
    # Test 2: POST /insights/view-weekly-mainservice-insights
    print("\n2. Testing POST /insights/view-weekly-mainservice-insights")
    payload = {
        "sub_service_id": "689cd830ef2618d4dfe5a595",
        "main_service_id": "MAIN001",
        "date": "2025-08-14"  # This will get the week containing Aug 14, 2025
    }
    
    response = requests.post(f"{BASE_URL}/insights/view-weekly-mainservice-insights", json=payload)
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"Found {len(result)} appointments for the week")
        if result:
            print("First appointment:", json.dumps(result[0], indent=2))
        else:
            print("No appointments found for this week")
    else:
        print("Error:", response.text)

def test_with_different_dates():
    """Test with different dates to see if data exists"""
    print("\n=== Testing with Different Dates ===")
    
    # Test with the exact date from the database document
    print("\n1. Testing with exact date from database (2025-08-14)")
    payload = {
        "sub_service_id": "689cd830ef2618d4dfe5a595",
        "date": "2025-08-14"
    }
    
    response = requests.post(f"{BASE_URL}/insights/view-service_insights", json=payload)
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"Found {len(result)} appointments")
        if result:
            print("First appointment:", json.dumps(result[0], indent=2))
        else:
            print("No appointments found for this date")
    else:
        print("Error:", response.text)
    
    # Test with a different date to see if any data exists
    print("\n2. Testing with a different date (2025-08-15)")
    payload["date"] = "2025-08-15"
    
    response = requests.post(f"{BASE_URL}/insights/view-service_insights", json=payload)
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"Found {len(result)} appointments")
        if result:
            print("First appointment:", json.dumps(result[0], indent=2))
        else:
            print("No appointments found for this date")
    else:
        print("Error:", response.text)

if __name__ == "__main__":
    # Test insights_direct endpoints
    test_insights_direct_endpoints()
    
    # Test existing insights POST endpoints
    test_existing_insights_endpoints()
    
    # Test weekly insights POST endpoints
    test_weekly_insights_endpoints()
    
    # Test with different dates
    test_with_different_dates()
    
    print("\n=== All Tests Completed ===")
