#!/bin/bash

# Test script for User Appointment API Endpoints
# Make sure your FastAPI server is running on localhost:8000

BASE_URL="http://localhost:8000"
USER_ID="user123"

echo "Testing User Appointment API Endpoints"
echo "======================================"

# Test 1: Get Ongoing Appointments
echo -e "\n1. Testing GET Ongoing Appointments"
echo "POST $BASE_URL/appointments_view/ongoing"
curl -X POST "$BASE_URL/appointments_view/ongoing" \
  -H "Content-Type: application/json" \
  -d "{\"user_id\": \"$USER_ID\"}" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s

# Test 2: Get Incomplete Appointments
echo -e "\n\n2. Testing GET Incomplete Appointments"
echo "POST $BASE_URL/appointments_view/incomplete"
curl -X POST "$BASE_URL/appointments_view/incomplete" \
  -H "Content-Type: application/json" \
  -d "{\"user_id\": \"$USER_ID\"}" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s

# Test 3: Get Previous Appointments
echo -e "\n\n3. Testing GET Previous Appointments"
echo "POST $BASE_URL/appointments_view/previous"
curl -X POST "$BASE_URL/appointments_view/previous" \
  -H "Content-Type: application/json" \
  -d "{\"user_id\": \"$USER_ID\"}" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s

# Test 4: Get Ongoing Appointment Details
echo -e "\n\n4. Testing GET Ongoing Appointment Details"
APPOINTMENT_ID="689db25103b6e08e79db7d7f"
echo "POST $BASE_URL/appointments_view/ongoing/$APPOINTMENT_ID"
curl -X POST "$BASE_URL/appointments_view/ongoing/$APPOINTMENT_ID" \
  -H "Content-Type: application/json" \
  -d "{\"user_id\": \"$USER_ID\"}" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s

# Test 5: Get Incomplete Appointment Details
echo -e "\n\n5. Testing GET Incomplete Appointment Details"
APPOINTMENT_ID="689db25203b6e08e79db7d80"
echo "POST $BASE_URL/appointments_view/incomplete/$APPOINTMENT_ID"
curl -X POST "$BASE_URL/appointments_view/incomplete/$APPOINTMENT_ID" \
  -H "Content-Type: application/json" \
  -d "{\"user_id\": \"$USER_ID\"}" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s

# Test 6: Get Previous Appointment Details
echo -e "\n\n6. Testing GET Previous Appointment Details"
APPOINTMENT_ID="689db25303b6e08e79db7d81"
echo "POST $BASE_URL/appointments_view/previous/$APPOINTMENT_ID"
curl -X POST "$BASE_URL/appointments_view/previous/$APPOINTMENT_ID" \
  -H "Content-Type: application/json" \
  -d "{\"user_id\": \"$USER_ID\"}" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s

# Test 7: Error Case - Invalid Appointment ID
echo -e "\n\n7. Testing Error Case - Invalid Appointment ID"
echo "POST $BASE_URL/appointments_view/ongoing/invalid_id"
curl -X POST "$BASE_URL/appointments_view/ongoing/invalid_id" \
  -H "Content-Type: application/json" \
  -d "{\"user_id\": \"$USER_ID\"}" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s

# Test 8: Error Case - Wrong User ID
echo -e "\n\n8. Testing Error Case - Wrong User ID"
APPOINTMENT_ID="689db25103b6e08e79db7d7f"
echo "POST $BASE_URL/appointments_view/ongoing/$APPOINTMENT_ID"
curl -X POST "$BASE_URL/appointments_view/ongoing/$APPOINTMENT_ID" \
  -H "Content-Type: application/json" \
  -d "{\"user_id\": \"wrong_user\"}" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s

# Test 9: Error Case - Non-existent User
echo -e "\n\n9. Testing Error Case - Non-existent User"
echo "POST $BASE_URL/appointments_view/ongoing"
curl -X POST "$BASE_URL/appointments_view/ongoing" \
  -H "Content-Type: application/json" \
  -d "{\"user_id\": \"non_existent_user\"}" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s

echo -e "\n\nAPI Testing completed!"
