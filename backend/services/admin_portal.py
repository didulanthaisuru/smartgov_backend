from schemas.admin_portal import (
    appointment_detail_card_request, appointment_detail_card, 
    view_detailed_appointment_request, view_detailed_appointment_response,
    RequiredDocument, get_subservice_details_request, get_subservice_details_response,
    SubServiceDocument, SubServiceStep, get_selected_appoinment_details_with_pdf_states_request,
    get_selected_appoinment_details_with_pdf_states_response, DocumentItem
)
from database_config import collection_apointment, collection_users, collection_uploaded_documents, collection_required_documents, collection_sub_services
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
        
        # Get required documents with upload status
        required_documents = await _get_required_documents_with_status(
            appointment_doc.get("sub_service_id"), 
            appointment_object_id
        )
        
        # Get sub-service name
        sub_service_name = None
        if appointment_doc.get("sub_service_id"):
            sub_service_doc = await collection_sub_services.find_one({"_id": appointment_doc.get("sub_service_id")})
            if sub_service_doc:
                sub_service_name = sub_service_doc.get("service_name")
        
        # Determine overall appointment status
        appointment_status = _determine_appointment_status(appointment_doc)
        
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
                payment_status=appointment_data["payment_status"],
                required_documents=required_documents,
                sub_service_name=sub_service_name,
                appointment_status=appointment_status
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

async def _get_required_documents_with_status(sub_service_id, appointment_object_id: ObjectId) -> list:
    """
    Get required documents for the sub-service with their upload status.
    
    Args:
        sub_service_id: ObjectId of the sub-service
        appointment_object_id: ObjectId of the appointment
        
    Returns:
        list: List of required documents with upload status
    """
    try:
        # Get the sub-service document to find required documents
        sub_service_doc = await collection_sub_services.find_one({"_id": sub_service_id})
        
        if not sub_service_doc:
            logger.warning(f"Sub-service not found: {sub_service_id}")
            return []
        
        required_docs = sub_service_doc.get("required_docs", [])
        logger.info(f"Found {len(required_docs)} required documents for sub-service: {sub_service_doc.get('service_name', 'Unknown')}")
        
        # Get uploaded documents for this appointment
        uploaded_docs = []
        async for doc in collection_uploaded_documents.find({"appointment_id": appointment_object_id}):
            uploaded_docs.append(doc)
        
        # Create a map of uploaded documents by required_doc_id
        uploaded_docs_map = {}
        for doc in uploaded_docs:
            required_doc_id = doc.get("required_doc_id")
            if required_doc_id:
                uploaded_docs_map[str(required_doc_id)] = doc
        
        # Build the result list
        result = []
        for required_doc_ref in required_docs:
            # Handle both ObjectId and string formats
            if isinstance(required_doc_ref, dict) and "$oid" in required_doc_ref:
                required_doc_id = ObjectId(required_doc_ref["$oid"])
            elif isinstance(required_doc_ref, ObjectId):
                required_doc_id = required_doc_ref
            else:
                required_doc_id = ObjectId(required_doc_ref)
            
            # Get the required document details from required_documents collection
            required_doc = await collection_required_documents.find_one({"_id": required_doc_id})
            
            if required_doc:
                # Create RequiredDocument object
                doc_info = RequiredDocument(
                    doc_id=str(required_doc_id),
                    doc_name=required_doc.get("doc_name", "Unknown Document"),
                    description=required_doc.get("description", ""),
                    is_uploaded=str(required_doc_id) in uploaded_docs_map,
                    upload_status="Uploaded" if str(required_doc_id) in uploaded_docs_map else "Not Uploaded"
                )
                
                # Add upload details if document is uploaded
                if str(required_doc_id) in uploaded_docs_map:
                    uploaded_doc = uploaded_docs_map[str(required_doc_id)]
                    doc_info.uploaded_doc_id = str(uploaded_doc.get("_id"))
                    doc_info.admin_status = uploaded_doc.get("doc_status", "Pending")
                    doc_info.accuracy = uploaded_doc.get("accuracy")
                
                result.append(doc_info)
            else:
                logger.warning(f"Required document not found: {required_doc_id}")
        
        logger.info(f"Returning {len(result)} required documents with status")
        return result
        
    except Exception as e:
        logger.error(f"Error getting required documents with status: {e}")
        return []

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


async def get_subservice_details(query: get_subservice_details_request) -> get_subservice_details_response:
    """
    Get detailed information about a sub-service including required documents and steps.
    
    This function retrieves comprehensive sub-service details including:
    - Basic sub-service information (name, payment amount)
    - Required documents with descriptions
    - Service steps/process flow
    
    Args:
        query: get_subservice_details_request containing subservice_id
        
    Returns:
        get_subservice_details_response: Detailed sub-service information
        
    Raises:
        ValueError: If subservice_id is not found or invalid
        
    Example:
        >>> query = get_subservice_details_request(subservice_id="689cd830ef2618d4dfe5a594")
        >>> result = await get_subservice_details(query)
    """
    try:
        # Validate and convert subservice_id to ObjectId
        try:
            subservice_object_id = ObjectId(query.subservice_id)
        except (ValueError, TypeError) as e:
            logger.error(f"Invalid ObjectId format for subservice_id: {query.subservice_id}")
            raise ValueError(f"Invalid subservice_id format: {query.subservice_id}")
        
        logger.info(f"Fetching sub-service details for ID: {query.subservice_id}")
        
        # Find the sub-service document
        subservice_doc = await collection_sub_services.find_one({"_id": subservice_object_id})
        
        if not subservice_doc:
            logger.error(f"Sub-service not found with id: {query.subservice_id}")
            raise ValueError(f"Sub-service not found with id: {query.subservice_id}")
        
        logger.info(f"Found sub-service: {subservice_doc.get('service_name', 'Unknown')}")
        
        # Get required documents details
        required_documents = await _get_required_documents_details(subservice_doc.get("required_docs", []))
        
        # Get steps information
        steps = _extract_steps(subservice_doc.get("steps", []))
        
        # Create sub-service details response
        try:
            subservice_details = get_subservice_details_response(
                subservice_id=query.subservice_id,
                service_name=subservice_doc.get("service_name", "Unknown Service"),
                payment_amount=float(subservice_doc.get("payment_amount", 0)),
                required_documents=required_documents,
                steps=steps
            )
        except Exception as response_error:
            logger.error(f"Error creating response object: {response_error}")
            raise ValueError(f"Error creating response: {str(response_error)}")
        
        logger.info(f"Successfully retrieved sub-service details: {query.subservice_id}")
        return subservice_details
        
    except ValueError as ve:
        logger.error(f"Validation error: {ve}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error fetching sub-service details: {e}")
        raise ValueError(f"Error retrieving sub-service details: {str(e)}")


async def _get_required_documents_details(required_docs_refs: list) -> List[SubServiceDocument]:
    """
    Get detailed information about required documents.
    
    Args:
        required_docs_refs: List of required document references from sub-service
        
    Returns:
        List[SubServiceDocument]: List of required documents with details
    """
    try:
        result = []
        for doc_ref in required_docs_refs:
            # Handle both ObjectId and string formats
            if isinstance(doc_ref, dict) and "$oid" in doc_ref:
                doc_id = ObjectId(doc_ref["$oid"])
            elif isinstance(doc_ref, ObjectId):
                doc_id = doc_ref
            else:
                doc_id = ObjectId(doc_ref)
            
            # Get the required document details from required_documents collection
            required_doc = await collection_required_documents.find_one({"_id": doc_id})
            
            if required_doc:
                doc_info = SubServiceDocument(
                    doc_id=str(doc_id),
                    doc_name=required_doc.get("doc_name", "Unknown Document"),
                    description=required_doc.get("description", "")
                )
                result.append(doc_info)
            else:
                logger.warning(f"Required document not found: {doc_id}")
        
        logger.info(f"Found {len(result)} required documents")
        return result
        
    except Exception as e:
        logger.error(f"Error getting required documents details: {e}")
        return []


def _extract_steps(steps_data: list) -> List[SubServiceStep]:
    """
    Extract steps information from sub-service document.
    
    Args:
        steps_data: Steps data from sub-service document
        
    Returns:
        List[SubServiceStep]: List of service steps
    """
    try:
        result = []
        for step in steps_data:
            if isinstance(step, dict) and "step_id" in step and "step_name" in step:
                step_info = SubServiceStep(
                    step_id=int(step["step_id"]),
                    step_name=str(step["step_name"])
                )
                result.append(step_info)
        
        logger.info(f"Found {len(result)} service steps")
        return result
        
    except Exception as e:
        logger.error(f"Error extracting steps: {e}")
        return []


async def get_selected_appoinment_details_with_pdf_states(query: get_selected_appoinment_details_with_pdf_states_request) -> get_selected_appoinment_details_with_pdf_states_response:
    """
    Get selected appointment details with PDF states including uploaded documents.
    
    This function retrieves comprehensive appointment details including:
    - Basic appointment information (ID, date, time, duration)
    - User details (NIC, phone number)
    - Uploaded documents with their states and required_doc_id
    
    Args:
        query: get_selected_appoinment_details_with_pdf_states_request containing appointment_id
        
    Returns:
        get_selected_appoinment_details_with_pdf_states_response: Detailed appointment information with PDF states
        
    Raises:
        ValueError: If appointment_id is not found or invalid
    """
    try:
        # Validate and convert appointment_id to ObjectId
        try:
            appointment_object_id = ObjectId(query.appointment_id)
        except (ValueError, TypeError) as e:
            logger.error(f"Invalid ObjectId format for appointment_id: {query.appointment_id}")
            raise ValueError(f"Invalid appointment_id format: {query.appointment_id}")
        
        logger.info(f"Fetching appointment details with PDF states for ID: {query.appointment_id}")
        
        # Find the appointment document
        appointment_doc = await collection_apointment.find_one({"_id": appointment_object_id})
        
        if not appointment_doc:
            logger.error(f"Appointment not found with id: {query.appointment_id}")
            raise ValueError(f"Appointment not found with id: {query.appointment_id}")
        
        logger.info(f"Found appointment: {appointment_doc.get('appointment_id', 'Unknown')}")
        
        # Enhanced user lookup with multiple strategies
        user_info = await _get_user_information(appointment_doc.get("user_id"))
        
        # Get uploaded documents with their states
        documents = await _get_uploaded_documents_with_states(appointment_object_id)
        
        # Extract and validate appointment data
        appointment_data = _extract_appointment_data(appointment_doc)
        
        # Create appointment details response with PDF states
        try:
            appointment_details = get_selected_appoinment_details_with_pdf_states_response(
                appointment_id=str(appointment_doc.get("appointment_id", "")),
                appointment_user_nic=user_info.get("nic", "Unknown"),
                appointment_user_mobile_number=user_info.get("phone_number", "Unknown"),
                duration=appointment_data["duration"],
                appointment_time=appointment_data["appointment_time"],
                appointment_date=appointment_data["appointment_date"],
                payment_status=appointment_data["payment_status"],
                documents=documents
            )
        except Exception as response_error:
            logger.error(f"Error creating response object: {response_error}")
            raise ValueError(f"Error creating response: {str(response_error)}")
        
        logger.info(f"Successfully retrieved appointment details with PDF states: {query.appointment_id}")
        return appointment_details
        
    except ValueError as ve:
        logger.error(f"Validation error: {ve}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error fetching appointment details with PDF states: {e}")
        raise ValueError(f"Error retrieving appointment details: {str(e)}")


async def _get_uploaded_documents_with_states(appointment_object_id: ObjectId) -> List[DocumentItem]:
    """
    Get uploaded documents with their states and required_doc_id.
    
    Args:
        appointment_object_id: ObjectId of the appointment
        
    Returns:
        List[DocumentItem]: List of uploaded documents with states
    """
    try:
        result = []
        
        # Get uploaded documents for this appointment
        async for uploaded_doc in collection_uploaded_documents.find({"appointment_id": appointment_object_id}):
            try:
                # Get the required document details
                required_doc_id = uploaded_doc.get("required_doc_id")
                required_doc = None
                
                if required_doc_id:
                    # Try to find the required document by ID
                    required_doc = await collection_required_documents.find_one({"_id": required_doc_id})
                
                # Create DocumentItem
                doc_item = DocumentItem(
                    document_id=str(uploaded_doc.get("_id")),
                    required_doc_id=required_doc_id,  # Integer required_doc_id
                    name=required_doc.get("doc_name", "Unknown Document") if required_doc else "Unknown Document",
                    description=required_doc.get("description", "") if required_doc else "",
                    view_link=uploaded_doc.get("file_path"),  # File path as view link
                    accuracy=uploaded_doc.get("accuracy"),
                    status=uploaded_doc.get("doc_status", "Unknown")
                )
                
                result.append(doc_item)
                
            except Exception as doc_error:
                logger.error(f"Error processing uploaded document {uploaded_doc.get('_id')}: {doc_error}")
                continue
        
        logger.info(f"Found {len(result)} uploaded documents with states")
        return result
        
    except Exception as e:
        logger.error(f"Error getting uploaded documents with states: {e}")
        return []

        