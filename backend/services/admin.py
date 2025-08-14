from schemas.admin import appointment_detail_card_request,appointment_detail_card, view_detailed_appointment_request, view_detailed_appointment_response
from database_config import collection_apointment, collection_users, collection_uploaded_documents, collection_required_documents
from datetime import datetime, time
from typing import List
from bson import ObjectId
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def get_all_appointments_list(query: appointment_detail_card_request) -> List[appointment_detail_card]:
    """
    Get all appointments for a specific date and service_id.
    
    Args:
        query: appointment_detail_card_request containing date and service_id
        
    Returns:
        List[appointment_detail_card]: List of appointment details
        
    Raises:
        ValueError: If service_id is not a valid ObjectId
    """
    try:
        # Convert date to datetime for proper MongoDB comparison
        start_of_day = datetime.combine(query.date, datetime.min.time())
        end_of_day = datetime.combine(query.date, datetime.max.time())
        
        # Validate and convert service_id to ObjectId
        try:
            service_id_filter = ObjectId(query.service_id)
        except (ValueError, TypeError) as e:
            logger.error(f"Invalid ObjectId format for service_id: {query.service_id}")
            raise ValueError(f"Invalid service_id format: {query.service_id}")
        
        # Build MongoDB query
        mongo_query = {
            "appointment_date": {
                "$gte": start_of_day,
                "$lte": end_of_day,
                "$ne": None
            },
            "sub_service_id": service_id_filter,
        }
        
        logger.info(f"Querying appointments with filter: {mongo_query}")
        
        cursor = collection_apointment.find(mongo_query)
        
        appointments = []
        async for appointment_doc in cursor:
            try:
                # Validate required fields
                if not appointment_doc.get("appointment_id"):
                    logger.warning(f"Missing appointment_id in document: {appointment_doc.get('_id')}")
                    continue
                
                # Determine appointment status
                appointment_status = _determine_appointment_status(appointment_doc)
                
                # Extract duration from predicted_duration
                duration = _extract_duration(appointment_doc.get("predicted_duration"))
                predicted_duration = _extract_duration(appointment_doc.get("predicted_duration"))
                
                # Create appointment detail card
                appointment_card = appointment_detail_card(
                    appointment_id=str(appointment_doc.get("appointment_id")),
                    duration=duration,
                    appoinment_user_name=str(appointment_doc.get("user_id", "Unknown")),
                    appoitment_status=appointment_status,
                    predicted_duration=predicted_duration
                )
                appointments.append(appointment_card)
                
            except Exception as doc_error:
                logger.error(f"Error processing appointment document {appointment_doc.get('_id')}: {doc_error}")
                continue
        
        logger.info(f"Successfully retrieved {len(appointments)} appointments")
        return appointments
        
    except ValueError as ve:
        logger.error(f"Validation error: {ve}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error fetching appointments: {e}")
        return []

def _determine_appointment_status(appointment_doc: dict) -> str:
    """
    Determine the appointment status based on document fields.
    
    Args:
        appointment_doc: MongoDB document
        
    Returns:
        str: Status string (pending, in_progress, completed)
    """
    if appointment_doc.get("is_fully_complered"):
        return "completed"
    elif appointment_doc.get("sub_service_steps"):
        return "in_progress"
    else:
        return "pending"

def _extract_duration(predicted_duration) -> time:
    """
    Extract duration from predicted_duration field.
    
    Args:
        predicted_duration: Duration value from MongoDB
        
    Returns:
        time: Duration as time object
    """
    try:
        if isinstance(predicted_duration, datetime):
            return time(
                hour=predicted_duration.hour,
                minute=predicted_duration.minute
            )
        elif isinstance(predicted_duration, int):
            # If it's stored as minutes
            return time(
                hour=predicted_duration // 60,
                minute=predicted_duration % 60
            )
        else:
            return time(0, 0)
    except Exception as e:
        logger.warning(f"Error extracting duration from {predicted_duration}: {e}")
        return time(0, 0)

async def get_detailed_appointment(query: view_detailed_appointment_request) -> view_detailed_appointment_response:
    """
    Get detailed information about a specific appointment.
    
    This function retrieves comprehensive appointment details including:
    - Basic appointment information (ID, date, time, duration)
    - User details (NIC, phone number)
    - Document upload status
    - Payment status
    
    Args:
        query: view_detailed_appointment_request containing appointment_id
        
    Returns:
        view_detailed_appointment_response: Detailed appointment information
        
    Raises:
        ValueError: If appointment_id is not found or invalid
        
    Example:
        >>> query = view_detailed_appointment_request(appointment_id="689cab6cbf8c4f47139fe116")
        >>> result = await get_detailed_appointment(query)
    """
    try:
        # Validate and convert appointment_id to ObjectId
        try:
            appointment_object_id = ObjectId(query.appointment_id)
        except (ValueError, TypeError) as e:
            logger.error(f"Invalid ObjectId format for appointment_id: {query.appointment_id}")
            raise ValueError(f"Invalid appointment_id format: {query.appointment_id}")
        
        logger.info(f"Fetching detailed appointment for ID: {query.appointment_id}")
        
        # Find the appointment document
        appointment_doc = await collection_apointment.find_one({"_id": appointment_object_id})
        
        if not appointment_doc:
            logger.error(f"Appointment not found with id: {query.appointment_id}")
            raise ValueError(f"Appointment not found with id: {query.appointment_id}")
        
        logger.info(f"Found appointment: {appointment_doc.get('appointment_id', 'Unknown')}")
        
        # Enhanced user lookup with multiple strategies
        user_info = await _get_user_information(appointment_doc.get("user_id"))
        
        # Get uploaded documents count and status
        document_info = await _get_document_information(appointment_object_id)
        
        # Extract and validate appointment data
        appointment_data = _extract_appointment_data(appointment_doc)
        
        # Create detailed appointment response with enhanced validation
        try:
            detailed_appointment = view_detailed_appointment_response(
                appointment_id=str(appointment_doc.get("appointment_id", "")),
                appointment_user_nic=user_info.get("nic", "Unknown"),
                appointment_user_mobile_number=user_info.get("phone_number", "Unknown"),
                duration=appointment_data["duration"],
                appointment_time=appointment_data["appointment_time"],
                appointment_date=appointment_data["appointment_date"],
                payment_status=appointment_data["payment_status"]
            )
        except Exception as response_error:
            logger.error(f"Error creating response object: {response_error}")
            raise ValueError(f"Error creating response: {str(response_error)}")
        
        logger.info(f"Successfully retrieved detailed appointment: {query.appointment_id}")
        return detailed_appointment
        
    except ValueError as ve:
        logger.error(f"Validation error: {ve}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error fetching detailed appointment: {e}")
        raise ValueError(f"Error retrieving appointment details: {str(e)}")

async def _get_user_information(user_id) -> dict:
    """
    Enhanced user lookup with multiple strategies.
    
    Args:
        user_id: User identifier from appointment document
        
    Returns:
        dict: User information or empty dict if not found
    """
    if not user_id:
        logger.warning("No user_id provided in appointment")
        return {}
    
    user_info = None
    
    # Strategy 1: Direct user_id match (for integer user_ids)
    try:
        user_info = await collection_users.find_one({"user_id": user_id})
        if user_info:
            logger.info(f"Found user by direct user_id: {user_id}")
            return user_info
    except Exception as e:
        logger.warning(f"Error in direct user lookup: {e}")
    
    # Strategy 2: Try as ObjectId (for string user_ids that are ObjectIds)
    try:
        if isinstance(user_id, str) and len(user_id) == 24:
            user_object_id = ObjectId(user_id)
            user_info = await collection_users.find_one({"_id": user_object_id})
            if user_info:
                logger.info(f"Found user by ObjectId: {user_id}")
                return user_info
    except Exception as e:
        logger.warning(f"Error in ObjectId user lookup: {e}")
    
    # Strategy 3: Try as string user_id (for string user_ids)
    try:
        if isinstance(user_id, str):
            user_info = await collection_users.find_one({"user_id": user_id})
            if user_info:
                logger.info(f"Found user by string user_id: {user_id}")
                return user_info
    except Exception as e:
        logger.warning(f"Error in string user lookup: {e}")
    
    # Strategy 4: Try to find by _id if user_id is numeric (fallback)
    try:
        if isinstance(user_id, int):
            # Try to find user by _id if user_id might be a reference to _id
            # This is a fallback strategy
            user_info = await collection_users.find_one({"_id": ObjectId(str(user_id).zfill(24))})
            if user_info:
                logger.info(f"Found user by _id fallback: {user_id}")
                return user_info
    except Exception as e:
        logger.warning(f"Error in _id fallback lookup: {e}")
    
    logger.warning(f"Could not find user with user_id: {user_id} (type: {type(user_id)})")
    return {}

async def _get_document_information(appointment_object_id: ObjectId) -> dict:
    """
    Get document upload information for the appointment.
    
    Args:
        appointment_object_id: ObjectId of the appointment
        
    Returns:
        dict: Document information including count and status
    """
    try:
        # Count uploaded documents
        doc_count = await collection_uploaded_documents.count_documents({
            "appointment_id": appointment_object_id
        })
        
        # Get document details for status analysis
        uploaded_docs = []
        async for doc in collection_uploaded_documents.find({"appointment_id": appointment_object_id}):
            uploaded_docs.append(doc)
        
        # Analyze document status
        pending_docs = sum(1 for doc in uploaded_docs if doc.get("doc_status") == "Pending")
        approved_docs = sum(1 for doc in uploaded_docs if doc.get("doc_status") == "Approved")
        
        logger.info(f"Found {doc_count} uploaded documents for appointment")
        
        return {
            "total_documents": doc_count,
            "pending_documents": pending_docs,
            "approved_documents": approved_docs,
            "documents": uploaded_docs
        }
        
    except Exception as e:
        logger.error(f"Error fetching document information: {e}")
        return {
            "total_documents": 0,
            "pending_documents": 0,
            "approved_documents": 0,
            "documents": []
        }

def _extract_appointment_data(appointment_doc: dict) -> dict:
    """
    Extract and validate appointment data from MongoDB document.
    
    Args:
        appointment_doc: MongoDB appointment document
        
    Returns:
        dict: Extracted and validated appointment data
    """
    try:
        # Extract duration
        duration = _extract_duration(appointment_doc.get("predicted_duration"))
        
        # Extract appointment time
        appointment_time = None
        if appointment_doc.get("appoinment_time"):
            app_time = appointment_doc.get("appoinment_time")
            if isinstance(app_time, datetime):
                appointment_time = time(app_time.hour, app_time.minute)
        
        # Extract appointment date
        appointment_date = None
        if appointment_doc.get("appointment_date"):
            app_date = appointment_doc.get("appointment_date")
            if isinstance(app_date, datetime):
                appointment_date = app_date.date()
        
        # Determine payment status (enhanced logic)
        payment_status = _determine_payment_status(appointment_doc)
        
        return {
            "duration": duration,
            "appointment_time": appointment_time,
            "appointment_date": appointment_date,
            "payment_status": payment_status
        }
        
    except Exception as e:
        logger.error(f"Error extracting appointment data: {e}")
        return {
            "duration": time(0, 0),
            "appointment_time": None,
            "appointment_date": None,
            "payment_status": False
        }

def _determine_payment_status(appointment_doc: dict) -> bool:
    """
    Determine payment status based on appointment data.
    
    Args:
        appointment_doc: MongoDB appointment document
        
    Returns:
        bool: Payment status
    """
    # For now, return False as requested
    # This can be enhanced later with actual payment logic
    return False

        