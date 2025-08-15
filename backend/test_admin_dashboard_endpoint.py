#!/usr/bin/env python3
"""
Test script for the admin dashboard appointments endpoint
"""

import asyncio
import sys
import os

# Add the current directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from services.admin_dashboard import get_appointments_by_sub_service
from schemas.admin_services.dashboard_schemas import AppointmentsResponse

async def test_appointments_endpoint():
    """Test the appointments by sub-service endpoint"""
    
    # Test with a real sub_service_id from the database example
    test_sub_service_id = "689cd830ef2618d4dfe5a594"  # From the database example
    
    print(f"Testing appointments endpoint with sub_service_id: {test_sub_service_id}")
    
    try:
        # Call the service function
        appointments = await get_appointments_by_sub_service(sub_service_id=test_sub_service_id)
        
        print(f"Found {len(appointments)} appointments")
        
        # Test the response schema
        response = AppointmentsResponse(appointments=appointments)
        
        print("✅ Schema validation passed")
        print(f"Response structure: {response.model_dump()}")
        
        # Print appointment details
        for i, appointment in enumerate(appointments):
            print(f"\nAppointment {i+1}:")
            print(f"  Appointment ID: {appointment.get('_id', 'N/A')}")
            print(f"  User Name: {appointment.get('user_name', 'N/A')}")
            print(f"  User ID: {appointment.get('user_id', 'N/A')}")
            print(f"  Sub Service ID: {appointment.get('sub_service_id', 'N/A')}")
            print(f"  Appointment Confirmed: {appointment.get('appointment_confirmed', 'N/A')}")
            print(f"  Payment Status: {appointment.get('payment_status', 'N/A')}")
            print(f"  Created At: {appointment.get('created_at', 'N/A')}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error testing endpoint: {e}")
        return False

if __name__ == "__main__":
    # Run the test
    result = asyncio.run(test_appointments_endpoint())
    
    if result:
        print("\n✅ Test completed successfully!")
    else:
        print("\n❌ Test failed!")
        sys.exit(1)
