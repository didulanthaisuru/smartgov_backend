from database_config import collection_admin, collection_apointment, collection_sub_services, collection_required_documents, collection_uploaded_documents
from typing import Optional, List
from bson import ObjectId

async def get_admin_service_info(admin_id: str):
    """
    Retrieves admin service information (sub_service_id and admin_name) from MongoDB for a specific admin.
    
    Args:
        admin_id (str): The admin ID to search for (MongoDB ObjectId as string)
        
    Returns:
        dict: Dictionary containing service_id and admin_name, or None if admin not found
    """
    try:
        # Convert string to ObjectId and search by _id
        admin_doc = await collection_admin.find_one({"_id": ObjectId(admin_id)})
        
        if admin_doc:
            # Combine first_name and last_name to create admin_name
            first_name = admin_doc.get("first_name", "")
            last_name = admin_doc.get("last_name", "")
            admin_name = f"{first_name} {last_name}".strip()
            
            # Return only the required fields
            return {
                "service_id": admin_doc.get("sub_service_id"),
                "admin_name": admin_name
            }
        else:
            return None
            
    except Exception as e:
        print(f"Error retrieving admin service info: {e}")
        return None

async def get_appointments_by_sub_service(sub_service_id: str):
    """
    Retrieves full appointment details for a specific sub_service_id from MongoDB where appointment_confirmed is true.
    
    Args:
        sub_service_id (str): The sub service ID to search for (MongoDB ObjectId as string)
        
    Returns:
        list: List of appointment documents, or empty list if no appointments found
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
            appointment["_id"] = str(appointment["_id"])
            if "sub_service_id" in appointment:
                appointment["sub_service_id"] = str(appointment["sub_service_id"])
            appointments.append(appointment)
        
        return appointments
            
    except Exception as e:
        print(f"Error retrieving appointments: {e}")
        return []

async def get_required_documents_by_sub_service(sub_service_id: str):
    """
    Retrieves required document IDs and names for a specific sub_service_id from MongoDB.
    
    Args:
        sub_service_id (str): The sub service ID to search for (MongoDB ObjectId as string)
        
    Returns:
        list: List of document details with _id and doc_name, or empty list if not found
    """
    try:
        # First, get the sub service document to find required_docs
        sub_service_doc = await collection_sub_services.find_one({"_id": ObjectId(sub_service_id)})
        
        if not sub_service_doc or "required_docs" not in sub_service_doc:
            return []
        
        required_docs = sub_service_doc["required_docs"]
        documents = []
        
        # For each required doc ID, get the document details
        for doc_id in required_docs:
            doc_doc = await collection_required_documents.find_one({"_id": doc_id})
            if doc_doc:
                document_data = {
                    "_id": str(doc_doc["_id"]),
                    "doc_name": doc_doc.get("doc_name", ""),
                    "description": doc_doc.get("description", "")
                }
                print(f"Document data: {document_data}")  # Debug print
                documents.append(document_data)
        
        return documents
            
    except Exception as e:
        print(f"Error retrieving required documents: {e}")
        return []

async def get_uploaded_document_details(required_doc_id: str, appointment_id: str):
    """
    Retrieves uploaded document details for a specific required document ID and appointment ID from MongoDB.
    
    Args:
        required_doc_id (str): The required document ID to search for (MongoDB ObjectId as string)
        appointment_id (str): The appointment ID to search for (MongoDB ObjectId as string)
        
    Returns:
        dict: Uploaded document details, or None if not found
    """
    try:
        # Convert appointment_id to booking_id format (assuming appointment_id is the booking_id)
        booking_id = appointment_id
        
        # Search for uploaded document with the given required_doc_id and booking_id
        uploaded_doc = await collection_uploaded_documents.find_one({
            "required_doc_id": required_doc_id,
            "booking_id": booking_id
        })
        
        if uploaded_doc:
            # Convert ObjectId to string for JSON serialization
            uploaded_doc["_id"] = str(uploaded_doc["_id"])
            return uploaded_doc
        else:
            return None
            
    except Exception as e:
        print(f"Error retrieving uploaded document details: {e}")
        return None

async def approve_uploaded_document(document_id: str):
    """
    Updates uploaded document status from 'pending' to 'approved' in MongoDB.
    
    Args:
        document_id (str): The uploaded document ID to update (MongoDB ObjectId as string)
        
    Returns:
        dict: Success message with document ID, or None if update failed
    """
    try:
        # Update the document status from 'pending' to 'approved'
        result = await collection_uploaded_documents.update_one(
            {"_id": ObjectId(document_id), "doc_status": "pending"},
            {"$set": {"doc_status": "approved"}}
        )
        
        if result.modified_count > 0:
            return {
                "message": "Successfully approved",
                "document_id": document_id
            }
        else:
            return None
            
    except Exception as e:
        print(f"Error approving uploaded document: {e}")
        return None



