from database_config import collection_apointment, collection_users, collection_sub_services, collection_required_documents, collection_uploaded_documents
from typing import List, Optional, Dict, Any
from bson import ObjectId

async def get_appointments_by_sub_service_full(sub_service_id: str):
    """
    Retrieves full appointment details for a specific sub_service_id from MongoDB where appointment_confirmed is true.
    Includes user names by joining with the users collection.
    
    Args:
        sub_service_id (str): The sub service ID to search for (MongoDB ObjectId as string)
        
    Returns:
        list: List of appointment documents with user names, or empty list if no appointments found
    """
    try:
        # Convert string to ObjectId and search by sub_service_id and appointment_confirmed = true
        cursor = collection_apointment.find({
            "sub_service_id": ObjectId(sub_service_id),
            "appointment_confirmed": True
        })
        
        appointments = []
        async for appointment in cursor:
            # Convert ObjectId to string for JSON serialization
            appointment["_id"] = str(appointment["_id"])  # This will be mapped to appointment_id in the schema
            if "sub_service_id" in appointment:
                appointment["sub_service_id"] = str(appointment["sub_service_id"])
            
            # Ensure sub_service_steps is properly structured
            if "sub_service_steps" in appointment and isinstance(appointment["sub_service_steps"], list):
                # Validate each step has required fields
                for step in appointment["sub_service_steps"]:
                    if not isinstance(step, dict):
                        step = {}
                    # Ensure all required fields exist
                    step.setdefault("step_id", 0)
                    step.setdefault("step_name", "Unknown Step")
                    step.setdefault("status", False)
                    step.setdefault("completed_by", None)
            
            # Get user details from users collection using user_id (which references user's _id)
            user_name = "Unknown User"
            if "user_id" in appointment:
                try:
                    # user_id in appointment references the user's _id (ObjectId)
                    user_doc = await collection_users.find_one({"_id": ObjectId(appointment["user_id"])})
                    if user_doc:
                        first_name = user_doc.get("first_name", "")
                        last_name = user_doc.get("last_name", "")
                        user_name = f"{first_name} {last_name}".strip()
                except Exception as e:
                    print(f"Error fetching user details for user_id {appointment['user_id']}: {e}")
                    user_name = "Unknown User"
            
            # Add user_name to appointment data
            appointment["user_name"] = user_name
            appointments.append(appointment)
        
        return appointments
            
    except Exception as e:
        print(f"Error retrieving appointments: {e}")
        return []

async def get_appointment_details_by_id(appointment_id: str):
    """
    Retrieves complete appointment details for a specific appointment_id.
    Includes user name, required document details, and all uploaded document details.
    
    Args:
        appointment_id (str): The appointment ID to search for (MongoDB ObjectId as string)
        
    Returns:
        dict: Complete appointment details with user name, required documents, and uploaded documents,
        or None if appointment not found
    """
    try:
        # Get appointment details
        appointment = await collection_apointment.find_one({"_id": ObjectId(appointment_id)})
        
        if not appointment:
            return None
        
        # Convert ObjectId to string for JSON serialization
        appointment["_id"] = str(appointment["_id"])
        if "sub_service_id" in appointment:
            appointment["sub_service_id"] = str(appointment["sub_service_id"])
        
        # Ensure sub_service_steps is properly structured
        if "sub_service_steps" in appointment and isinstance(appointment["sub_service_steps"], list):
            for step in appointment["sub_service_steps"]:
                if not isinstance(step, dict):
                    step = {}
                step.setdefault("step_id", 0)
                step.setdefault("step_name", "Unknown Step")
                step.setdefault("status", False)
                step.setdefault("completed_by", None)
        
        # Get user details from users collection
        user_name = "Unknown User"
        if "user_id" in appointment:
            try:
                user_doc = await collection_users.find_one({"_id": ObjectId(appointment["user_id"])})
                if user_doc:
                    first_name = user_doc.get("first_name", "")
                    last_name = user_doc.get("last_name", "")
                    user_name = f"{first_name} {last_name}".strip()
            except Exception as e:
                print(f"Error fetching user details for user_id {appointment['user_id']}: {e}")
                user_name = "Unknown User"
        
        # Add user_name to appointment data
        appointment["user_name"] = user_name
        
        # Get sub-service details to get required documents
        required_documents = []
        if "sub_service_id" in appointment:
            try:
                sub_service = await collection_sub_services.find_one({"_id": ObjectId(appointment["sub_service_id"])})
                if sub_service and "required_docs" in sub_service:
                    # Get required document details
                    for doc_id in sub_service["required_docs"]:
                        try:
                            doc_details = await collection_required_documents.find_one({"_id": doc_id})
                            if doc_details:
                                doc_details["_id"] = str(doc_details["_id"])
                                required_documents.append(doc_details)
                        except Exception as e:
                            print(f"Error fetching required document {doc_id}: {e}")
            except Exception as e:
                print(f"Error fetching sub-service details: {e}")
        
        # Get uploaded documents for this appointment
        uploaded_documents = []
        try:
            cursor = collection_uploaded_documents.find({"appointment_id": ObjectId(appointment_id)})
            async for uploaded_doc in cursor:
                uploaded_doc["_id"] = str(uploaded_doc["_id"])
                if "appointment_id" in uploaded_doc:
                    uploaded_doc["appointment_id"] = str(uploaded_doc["appointment_id"])
                if "required_doc_id" in uploaded_doc:
                    uploaded_doc["required_doc_id"] = str(uploaded_doc["required_doc_id"])
                uploaded_documents.append(uploaded_doc)
        except Exception as e:
            print(f"Error fetching uploaded documents: {e}")
        
        return {
            "appointment": appointment,
            "required_documents": required_documents,
            "uploaded_documents": uploaded_documents
        }
            
    except Exception as e:
        print(f"Error retrieving appointment details: {e}")
        return None
