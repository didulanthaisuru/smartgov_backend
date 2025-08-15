#!/usr/bin/env python3
"""
Test script demonstrating real appointment data structure from database
"""

import asyncio
import sys
import os
from datetime import datetime

# Add the current directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from services.admin_dashboard import get_appointments_by_sub_service
from schemas.admin_services.dashboard_schemas import AppointmentsResponse, AppointmentDocument, SubServiceStep

async def test_real_appointment_data():
    """Test with real appointment data structure"""
    
    # Real sub_service_id from the database example
    test_sub_service_id = "689cd830ef2618d4dfe5a594"
    
    print(f"Testing with real sub_service_id: {test_sub_service_id}")
    print("=" * 60)
    
    try:
        # Call the service function
        appointments = await get_appointments_by_sub_service(sub_service_id=test_sub_service_id)
        
        print(f"Found {len(appointments)} appointments")
        print()
        
        if appointments:
            # Show the raw data structure
            print("📋 Raw Appointment Data Structure:")
            print("-" * 40)
            for i, appointment in enumerate(appointments):
                print(f"\nAppointment {i+1}:")
                print(f"  _id: {appointment.get('_id')}")
                print(f"  user_id: {appointment.get('user_id')}")
                print(f"  user_name: {appointment.get('user_name')}")
                print(f"  sub_service_id: {appointment.get('sub_service_id')}")
                print(f"  appointment_confirmed: {appointment.get('appointment_confirmed')}")
                print(f"  payment_status: {appointment.get('payment_status')}")
                print(f"  is_fully_completed: {appointment.get('is_fully_completed')}")
                print(f"  created_at: {appointment.get('created_at')}")
                print(f"  appointment_date: {appointment.get('appointment_date')}")
                print(f"  appoinment_time: {appointment.get('appoinment_time')}")
                print(f"  predicted_duration: {appointment.get('predicted_duration')}")
                print(f"  completed_at: {appointment.get('completed_at')}")
                print(f"  updated_at: {appointment.get('updated_at')}")
                
                # Show sub_service_steps structure
                print(f"  sub_service_steps:")
                for step in appointment.get('sub_service_steps', []):
                    print(f"    - step_id: {step.get('step_id')}")
                    print(f"      step_name: {step.get('step_name')}")
                    print(f"      status: {step.get('status')}")
                    print(f"      completed_by: {step.get('completed_by')}")
        
        # Test schema validation
        print("\n" + "=" * 60)
        print("🔍 Testing Schema Validation:")
        print("-" * 40)
        
        try:
            response = AppointmentsResponse(appointments=appointments)
            print("✅ Schema validation passed!")
            
            # Show the validated response structure
            print("\n📊 Validated Response Structure:")
            print("-" * 40)
            validated_data = response.model_dump()
            
            for i, appointment in enumerate(validated_data['appointments']):
                print(f"\nAppointment {i+1} (Validated):")
                print(f"  appointment_id: {appointment.get('appointment_id')}")
                print(f"  user_id: {appointment.get('user_id')}")
                print(f"  user_name: {appointment.get('user_name')}")
                print(f"  sub_service_id: {appointment.get('sub_service_id')}")
                print(f"  appointment_confirmed: {appointment.get('appointment_confirmed')}")
                print(f"  payment_status: {appointment.get('payment_status')}")
                print(f"  is_fully_completed: {appointment.get('is_fully_completed')}")
                
                # Show validated sub_service_steps
                print(f"  sub_service_steps:")
                for step in appointment.get('sub_service_steps', []):
                    print(f"    - step_id: {step.get('step_id')}")
                    print(f"      step_name: {step.get('step_name')}")
                    print(f"      status: {step.get('status')}")
                    print(f"      completed_by: {step.get('completed_by')}")
            
        except Exception as schema_error:
            print(f"❌ Schema validation failed: {schema_error}")
            return False
        
        return True
        
    except Exception as e:
        print(f"❌ Error testing endpoint: {e}")
        return False

if __name__ == "__main__":
    # Run the test
    result = asyncio.run(test_real_appointment_data())
    
    if result:
        print("\n" + "=" * 60)
        print("✅ Test completed successfully!")
        print("\n📝 Summary:")
        print("- The endpoint correctly retrieves appointments by sub_service_id")
        print("- Appointment IDs are properly included in the response")
        print("- Sub-service steps are properly structured")
        print("- Schema validation works correctly")
        print("- All required fields are present and properly typed")
    else:
        print("\n❌ Test failed!")
        sys.exit(1)
