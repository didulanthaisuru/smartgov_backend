from database_config import collection_apointment, collection_sub_services, collection_main_services
from schemas.insights import (
    InsightQuery, MainServiceQuery, WeeklyInsightQuery, WeeklyMainServiceQuery, 
    WeeklyCountQuery, WeeklyMainServiceCountQuery, WeeklyCountResponse, DayCount, InsightDetail
)
from datetime import date, datetime, timedelta
from typing import List
import asyncio
from bson import ObjectId

async def get_insights_by_date_sub_service(query: InsightQuery) -> List[InsightDetail]:
    """
    Get appointment details for a specific sub_service and date
    """
    try:
        # Convert date to datetime for MongoDB query
        start_date = datetime.combine(query.date, datetime.min.time())
        end_date = datetime.combine(query.date, datetime.max.time())
        
        # Convert string sub_service_id to ObjectId
        try:
            sub_service_object_id = ObjectId(query.sub_service_id)
        except Exception:
            raise ValueError(f"Invalid sub_service_id format: {query.sub_service_id}")
        
        # Query appointments for the specific sub_service and date
        pipeline = [
            {
                "$match": {
                    "sub_service_id": sub_service_object_id,
                    "appointment_date": {
                        "$gte": start_date,
                        "$lte": end_date
                    }
                }
            },
            {
                "$project": {
                    "_id": 1,
                    "appointment_id": 1,
                    "user_id": 1,
                    "sub_service_id": 1,
                    "sub_service_steps": 1,
                    "created_at": 1,
                    "is_fully_completed": 1,
                    "appointment_date": 1,
                    "appoinment_time": 1,
                    "predicted_duration": 1,
                    "payment_status": 1
                }
            }
        ]
        
        cursor = collection_apointment.aggregate(pipeline)
        appointments = await cursor.to_list(length=None)
        
        # Convert to InsightDetail objects and group by day
        day_names = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        appointments_by_day = {day: [] for day in day_names}
        
        for appointment in appointments:
            # Convert MongoDB date to Python date
            appointment_date = appointment.get("appointment_date")
            if isinstance(appointment_date, datetime):
                appointment_date = appointment_date.date()
            elif isinstance(appointment_date, dict) and "$date" in appointment_date:
                # Handle MongoDB extended JSON format
                appointment_date = datetime.fromisoformat(appointment_date["$date"].replace("Z", "+00:00")).date()
            
            # Calculate day of week
            day_of_week = day_names[appointment_date.weekday()] if appointment_date else "Unknown"
            
            # Convert ObjectId to string if needed
            sub_service_id = appointment.get("sub_service_id", "")
            if isinstance(sub_service_id, ObjectId):
                sub_service_id = str(sub_service_id)
            
            # Convert _id to string if needed
            appointment_id_str = str(appointment.get("_id", "")) if appointment.get("_id") else None
            
            # Handle datetime fields
            created_at = appointment.get("created_at")
            if isinstance(created_at, dict) and "$date" in created_at:
                created_at = datetime.fromisoformat(created_at["$date"].replace("Z", "+00:00"))
            
            appoinment_time = appointment.get("appoinment_time")
            if isinstance(appoinment_time, dict) and "$date" in appoinment_time:
                appoinment_time = datetime.fromisoformat(appoinment_time["$date"].replace("Z", "+00:00"))
            
            predicted_duration = appointment.get("predicted_duration")
            if isinstance(predicted_duration, dict) and "$date" in predicted_duration:
                predicted_duration = datetime.fromisoformat(predicted_duration["$date"].replace("Z", "+00:00"))
            
            insight_detail = InsightDetail(
                _id=appointment_id_str,
                appointment_id=appointment.get("appointment_id", ""),
                user_id=appointment.get("user_id", ""),
                sub_service_id=sub_service_id,
                sub_service_steps=appointment.get("sub_service_steps", []),
                created_at=created_at,
                is_fully_completed=appointment.get("is_fully_completed", False),
                appointment_date=appointment_date or query.date,
                day_of_week=day_of_week,
                actual_date=appointment_date.strftime("%Y-%m-%d") if appointment_date else query.date.strftime("%Y-%m-%d"),
                appoinment_time=appoinment_time,
                predicted_duration=predicted_duration,
                payment_status=appointment.get("payment_status", False),
                status="completed"  # Default status
            )
            appointments_by_day[day_of_week].append(insight_detail)
        
        # Create final list with all days, including empty ones
        insight_details = []
        for day in day_names:
            if appointments_by_day[day]:
                insight_details.extend(appointments_by_day[day])
            else:
                # Add empty appointment for days with no data
                empty_appointment = InsightDetail(
                    _id=None,
                    appointment_id="",
                    user_id="",
                    sub_service_id=query.sub_service_id,
                    sub_service_steps=[],
                    created_at=None,
                    is_fully_completed=False,
                    appointment_date=query.date,
                    day_of_week=day,
                    actual_date=query.date.strftime("%Y-%m-%d"),
                    appoinment_time=None,
                    predicted_duration=None,
                    payment_status=False,
                    status="no_appointments"
                )
                insight_details.append(empty_appointment)
        
        return insight_details
        
    except Exception as e:
        raise Exception(f"Error getting insights by sub_service and date: {str(e)}")

async def get_insights_by_date_main_service(query: MainServiceQuery) -> List[InsightDetail]:
    """
    Get appointment details for a specific sub_service, main_service and date
    """
    try:
        # Convert string sub_service_id to ObjectId
        try:
            sub_service_object_id = ObjectId(query.sub_service_id)
        except Exception:
            raise ValueError(f"Invalid sub_service_id format: {query.sub_service_id}")
        
        # First, get the sub_service from sub_services collection using _id
        sub_service = await collection_sub_services.find_one({"_id": sub_service_object_id})
        if not sub_service:
            raise ValueError(f"Sub-service with ID {query.sub_service_id} not found")
        
        # Get the main service to verify the relationship
        try:
            main_service_object_id = ObjectId(query.main_service_id)
        except Exception:
            raise ValueError(f"Invalid main_service_id format: {query.main_service_id}")
        
        main_service = await collection_main_services.find_one({"_id": main_service_object_id})
        if not main_service:
            raise ValueError(f"Main-service with ID {query.main_service_id} not found")
        
        # Verify that the sub_service belongs to the specified main_service
        # Check if the sub_service_id exists in the main_service's sub_services array
        if sub_service_object_id not in [ObjectId(sub_id) for sub_id in main_service.get("sub_services", [])]:
            raise ValueError(f"Sub-service {query.sub_service_id} does not belong to main-service {query.main_service_id}")
        
        # Convert date to datetime for MongoDB query
        start_date = datetime.combine(query.date, datetime.min.time())
        end_date = datetime.combine(query.date, datetime.max.time())
        
        # Query appointments for the specific sub_service and date
        pipeline = [
            {
                "$match": {
                    "sub_service_id": sub_service_object_id,
                    "appointment_date": {
                        "$gte": start_date,
                        "$lte": end_date
                    }
                }
            },
            {
                "$project": {
                    "_id": 1,
                    "appointment_id": 1,
                    "user_id": 1,
                    "sub_service_id": 1,
                    "sub_service_steps": 1,
                    "created_at": 1,
                    "is_fully_completed": 1,
                    "appointment_date": 1,
                    "appoinment_time": 1,
                    "predicted_duration": 1,
                    "payment_status": 1
                }
            }
        ]
        
        cursor = collection_apointment.aggregate(pipeline)
        appointments = await cursor.to_list(length=None)
        
        # Convert to InsightDetail objects and group by day
        day_names = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        appointments_by_day = {day: [] for day in day_names}
        
        for appointment in appointments:
            # Convert MongoDB date to Python date
            appointment_date = appointment.get("appointment_date")
            if isinstance(appointment_date, datetime):
                appointment_date = appointment_date.date()
            elif isinstance(appointment_date, dict) and "$date" in appointment_date:
                # Handle MongoDB extended JSON format
                appointment_date = datetime.fromisoformat(appointment_date["$date"].replace("Z", "+00:00")).date()
            
            # Calculate day of week
            day_of_week = day_names[appointment_date.weekday()] if appointment_date else "Unknown"
            
            # Convert ObjectId to string if needed
            sub_service_id = appointment.get("sub_service_id", "")
            if isinstance(sub_service_id, ObjectId):
                sub_service_id = str(sub_service_id)
            
            # Convert _id to string if needed
            appointment_id_str = str(appointment.get("_id", "")) if appointment.get("_id") else None
            
            # Handle datetime fields
            created_at = appointment.get("created_at")
            if isinstance(created_at, dict) and "$date" in created_at:
                created_at = datetime.fromisoformat(created_at["$date"].replace("Z", "+00:00"))
            
            appoinment_time = appointment.get("appoinment_time")
            if isinstance(appoinment_time, dict) and "$date" in appoinment_time:
                appoinment_time = datetime.fromisoformat(appoinment_time["$date"].replace("Z", "+00:00"))
            
            predicted_duration = appointment.get("predicted_duration")
            if isinstance(predicted_duration, dict) and "$date" in predicted_duration:
                predicted_duration = datetime.fromisoformat(predicted_duration["$date"].replace("Z", "+00:00"))
            
            insight_detail = InsightDetail(
                _id=appointment_id_str,
                appointment_id=appointment.get("appointment_id", ""),
                user_id=appointment.get("user_id", ""),
                sub_service_id=sub_service_id,
                sub_service_steps=appointment.get("sub_service_steps", []),
                created_at=created_at,
                is_fully_completed=appointment.get("is_fully_completed", False),
                appointment_date=appointment_date or query.date,
                day_of_week=day_of_week,
                actual_date=appointment_date.strftime("%Y-%m-%d") if appointment_date else query.date.strftime("%Y-%m-%d"),
                appoinment_time=appoinment_time,
                predicted_duration=predicted_duration,
                payment_status=appointment.get("payment_status", False),
                status="completed"  # Default status
            )
            appointments_by_day[day_of_week].append(insight_detail)
        
        # Create final list with all days, including empty ones
        insight_details = []
        for day in day_names:
            if appointments_by_day[day]:
                insight_details.extend(appointments_by_day[day])
            else:
                # Add empty appointment for days with no data
                empty_appointment = InsightDetail(
                    _id=None,
                    appointment_id="",
                    user_id="",
                    sub_service_id=query.sub_service_id,
                    sub_service_steps=[],
                    created_at=None,
                    is_fully_completed=False,
                    appointment_date=query.date,
                    day_of_week=day,
                    actual_date=query.date.strftime("%Y-%m-%d"),
                    appoinment_time=None,
                    predicted_duration=None,
                    payment_status=False,
                    status="no_appointments"
                )
                insight_details.append(empty_appointment)
        
        return insight_details
        
    except Exception as e:
        raise Exception(f"Error getting insights by main_service and date: {str(e)}")

async def get_weekly_insights_by_sub_service(query: WeeklyInsightQuery) -> List[InsightDetail]:
    """
    Get appointment details for a specific sub_service and week (based on the given date)
    """
    try:
        # Calculate the start and end of the week (Monday to Sunday)
        # Get the day of the week (0=Monday, 6=Sunday)
        day_of_week = query.date.weekday()
        
        # Calculate Monday of the week
        monday = query.date - timedelta(days=day_of_week)
        # Calculate Sunday of the week
        sunday = monday + timedelta(days=6)
        
        # Convert dates to datetime for MongoDB query
        start_date = datetime.combine(monday, datetime.min.time())
        end_date = datetime.combine(sunday, datetime.max.time())
        
        # Convert string sub_service_id to ObjectId
        try:
            sub_service_object_id = ObjectId(query.sub_service_id)
        except Exception:
            raise ValueError(f"Invalid sub_service_id format: {query.sub_service_id}")
        
        # Query appointments for the specific sub_service and week
        pipeline = [
            {
                "$match": {
                    "sub_service_id": sub_service_object_id,
                    "appointment_date": {
                        "$gte": start_date,
                        "$lte": end_date
                    }
                }
            },
            {
                "$project": {
                    "_id": 1,
                    "appointment_id": 1,
                    "user_id": 1,
                    "sub_service_id": 1,
                    "sub_service_steps": 1,
                    "created_at": 1,
                    "is_fully_completed": 1,
                    "appointment_date": 1,
                    "appoinment_time": 1,
                    "predicted_duration": 1,
                    "payment_status": 1
                }
            }
        ]
        
        cursor = collection_apointment.aggregate(pipeline)
        appointments = await cursor.to_list(length=None)
        
        # Convert to InsightDetail objects and group by day
        day_names = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        appointments_by_day = {day: [] for day in day_names}
        
        for appointment in appointments:
            # Convert MongoDB date to Python date
            appointment_date = appointment.get("appointment_date")
            if isinstance(appointment_date, datetime):
                appointment_date = appointment_date.date()
            elif isinstance(appointment_date, dict) and "$date" in appointment_date:
                # Handle MongoDB extended JSON format
                appointment_date = datetime.fromisoformat(appointment_date["$date"].replace("Z", "+00:00")).date()
            
            # Calculate day of week
            day_of_week = day_names[appointment_date.weekday()] if appointment_date else "Unknown"
            
            # Convert ObjectId to string if needed
            sub_service_id = appointment.get("sub_service_id", "")
            if isinstance(sub_service_id, ObjectId):
                sub_service_id = str(sub_service_id)
            
            # Convert _id to string if needed
            appointment_id_str = str(appointment.get("_id", "")) if appointment.get("_id") else None
            
            # Handle datetime fields
            created_at = appointment.get("created_at")
            if isinstance(created_at, dict) and "$date" in created_at:
                created_at = datetime.fromisoformat(created_at["$date"].replace("Z", "+00:00"))
            
            appoinment_time = appointment.get("appoinment_time")
            if isinstance(appoinment_time, dict) and "$date" in appoinment_time:
                appoinment_time = datetime.fromisoformat(appoinment_time["$date"].replace("Z", "+00:00"))
            
            predicted_duration = appointment.get("predicted_duration")
            if isinstance(predicted_duration, dict) and "$date" in predicted_duration:
                predicted_duration = datetime.fromisoformat(predicted_duration["$date"].replace("Z", "+00:00"))
            
            insight_detail = InsightDetail(
                _id=appointment_id_str,
                appointment_id=appointment.get("appointment_id", ""),
                user_id=appointment.get("user_id", ""),
                sub_service_id=sub_service_id,
                sub_service_steps=appointment.get("sub_service_steps", []),
                created_at=created_at,
                is_fully_completed=appointment.get("is_fully_completed", False),
                appointment_date=appointment_date or query.date,
                day_of_week=day_of_week,
                actual_date=appointment_date.strftime("%Y-%m-%d") if appointment_date else query.date.strftime("%Y-%m-%d"),
                appoinment_time=appoinment_time,
                predicted_duration=predicted_duration,
                payment_status=appointment.get("payment_status", False),
                status="completed"  # Default status
            )
            appointments_by_day[day_of_week].append(insight_detail)
        
        # Create final list with all days, including empty ones
        insight_details = []
        for day in day_names:
            if appointments_by_day[day]:
                insight_details.extend(appointments_by_day[day])
            else:
                # Add empty appointment for days with no data
                empty_appointment = InsightDetail(
                    _id=None,
                    appointment_id="",
                    user_id="",
                    sub_service_id=query.sub_service_id,
                    sub_service_steps=[],
                    created_at=None,
                    is_fully_completed=False,
                    appointment_date=query.date,
                    day_of_week=day,
                    actual_date=query.date.strftime("%Y-%m-%d"),
                    appoinment_time=None,
                    predicted_duration=None,
                    payment_status=False,
                    status="no_appointments"
                )
                insight_details.append(empty_appointment)
        
        return insight_details
        
    except Exception as e:
        raise Exception(f"Error getting weekly insights by sub_service: {str(e)}")

async def get_weekly_insights_by_main_service(query: WeeklyMainServiceQuery) -> List[InsightDetail]:
    """
    Get appointment details for a specific sub_service, main_service and week (based on the given date)
    """
    try:
        # Calculate the start and end of the week (Monday to Sunday)
        # Get the day of the week (0=Monday, 6=Sunday)
        day_of_week = query.date.weekday()
        
        # Calculate Monday of the week
        monday = query.date - timedelta(days=day_of_week)
        # Calculate Sunday of the week
        sunday = monday + timedelta(days=6)
        
        # Convert dates to datetime for MongoDB query
        start_date = datetime.combine(monday, datetime.min.time())
        end_date = datetime.combine(sunday, datetime.max.time())
        
        # Convert string sub_service_id to ObjectId
        try:
            sub_service_object_id = ObjectId(query.sub_service_id)
        except Exception:
            raise ValueError(f"Invalid sub_service_id format: {query.sub_service_id}")
        
        # First, get the sub_service from sub_services collection using _id
        sub_service = await collection_sub_services.find_one({"_id": sub_service_object_id})
        if not sub_service:
            raise ValueError(f"Sub-service with ID {query.sub_service_id} not found")
        
        # Get the main service to verify the relationship
        try:
            main_service_object_id = ObjectId(query.main_service_id)
        except Exception:
            raise ValueError(f"Invalid main_service_id format: {query.main_service_id}")
        
        main_service = await collection_main_services.find_one({"_id": main_service_object_id})
        if not main_service:
            raise ValueError(f"Main-service with ID {query.main_service_id} not found")
        
        # Verify that the sub_service belongs to the specified main_service
        # Check if the sub_service_id exists in the main_service's sub_services array
        if sub_service_object_id not in [ObjectId(sub_id) for sub_id in main_service.get("sub_services", [])]:
            raise ValueError(f"Sub-service {query.sub_service_id} does not belong to main-service {query.main_service_id}")
        
        # Query appointments for the specific sub_service and week
        pipeline = [
            {
                "$match": {
                    "sub_service_id": sub_service_object_id,
                    "appointment_date": {
                        "$gte": start_date,
                        "$lte": end_date
                    }
                }
            },
            {
                "$project": {
                    "_id": 1,
                    "appointment_id": 1,
                    "user_id": 1,
                    "sub_service_id": 1,
                    "sub_service_steps": 1,
                    "created_at": 1,
                    "is_fully_completed": 1,
                    "appointment_date": 1,
                    "appoinment_time": 1,
                    "predicted_duration": 1,
                    "payment_status": 1
                }
            }
        ]
        
        cursor = collection_apointment.aggregate(pipeline)
        appointments = await cursor.to_list(length=None)
        
        # Convert to InsightDetail objects and group by day
        day_names = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        appointments_by_day = {day: [] for day in day_names}
        
        for appointment in appointments:
            # Convert MongoDB date to Python date
            appointment_date = appointment.get("appointment_date")
            if isinstance(appointment_date, datetime):
                appointment_date = appointment_date.date()
            elif isinstance(appointment_date, dict) and "$date" in appointment_date:
                # Handle MongoDB extended JSON format
                appointment_date = datetime.fromisoformat(appointment_date["$date"].replace("Z", "+00:00")).date()
            
            # Calculate day of week
            day_of_week = day_names[appointment_date.weekday()] if appointment_date else "Unknown"
            
            # Convert ObjectId to string if needed
            sub_service_id = appointment.get("sub_service_id", "")
            if isinstance(sub_service_id, ObjectId):
                sub_service_id = str(sub_service_id)
            
            # Convert _id to string if needed
            appointment_id_str = str(appointment.get("_id", "")) if appointment.get("_id") else None
            
            # Handle datetime fields
            created_at = appointment.get("created_at")
            if isinstance(created_at, dict) and "$date" in created_at:
                created_at = datetime.fromisoformat(created_at["$date"].replace("Z", "+00:00"))
            
            appoinment_time = appointment.get("appoinment_time")
            if isinstance(appoinment_time, dict) and "$date" in appoinment_time:
                appoinment_time = datetime.fromisoformat(appoinment_time["$date"].replace("Z", "+00:00"))
            
            predicted_duration = appointment.get("predicted_duration")
            if isinstance(predicted_duration, dict) and "$date" in predicted_duration:
                predicted_duration = datetime.fromisoformat(predicted_duration["$date"].replace("Z", "+00:00"))
            
            insight_detail = InsightDetail(
                _id=appointment_id_str,
                appointment_id=appointment.get("appointment_id", ""),
                user_id=appointment.get("user_id", ""),
                sub_service_id=sub_service_id,
                sub_service_steps=appointment.get("sub_service_steps", []),
                created_at=created_at,
                is_fully_completed=appointment.get("is_fully_completed", False),
                appointment_date=appointment_date or query.date,
                day_of_week=day_of_week,
                actual_date=appointment_date.strftime("%Y-%m-%d") if appointment_date else query.date.strftime("%Y-%m-%d"),
                appoinment_time=appoinment_time,
                predicted_duration=predicted_duration,
                payment_status=appointment.get("payment_status", False),
                status="completed"  # Default status
            )
            appointments_by_day[day_of_week].append(insight_detail)
        
        # Create final list with all days, including empty ones
        insight_details = []
        for day in day_names:
            if appointments_by_day[day]:
                insight_details.extend(appointments_by_day[day])
            else:
                # Add empty appointment for days with no data
                empty_appointment = InsightDetail(
                    _id=None,
                    appointment_id="",
                    user_id="",
                    sub_service_id=query.sub_service_id,
                    sub_service_steps=[],
                    created_at=None,
                    is_fully_completed=False,
                    appointment_date=query.date,
                    day_of_week=day,
                    actual_date=query.date.strftime("%Y-%m-%d"),
                    appoinment_time=None,
                    predicted_duration=None,
                    payment_status=False,
                    status="no_appointments"
                )
                insight_details.append(empty_appointment)
        
        return insight_details
        
    except Exception as e:
        raise Exception(f"Error getting weekly insights by main_service: {str(e)}")

# Legacy functions for backward compatibility
def get_insights_by_date_sub_service_sync(query: InsightQuery):
    """
    Synchronous wrapper for the async function
    """
    return asyncio.run(get_insights_by_date_sub_service(query))

def get_insights_by_date_main_service_sync(query: MainServiceQuery):
    """
    Synchronous wrapper for the async function
    """
    return asyncio.run(get_insights_by_date_main_service(query))

async def get_weekly_appointment_counts(query: WeeklyCountQuery) -> WeeklyCountResponse:
    """
    Get appointment counts for each day of the week for a specific sub_service
    """
    try:
        # Calculate the start and end of the week (Monday to Sunday)
        day_of_week = query.date.weekday()
        monday = query.date - timedelta(days=day_of_week)
        sunday = monday + timedelta(days=6)
        
        # Convert dates to datetime for MongoDB query
        start_date = datetime.combine(monday, datetime.min.time())
        end_date = datetime.combine(sunday, datetime.max.time())
        
        # Convert string sub_service_id to ObjectId
        try:
            sub_service_object_id = ObjectId(query.sub_service_id)
        except Exception:
            raise ValueError(f"Invalid sub_service_id format: {query.sub_service_id}")
        
        # Query appointments for the specific sub_service and week
        pipeline = [
            {
                "$match": {
                    "sub_service_id": sub_service_object_id,
                    "appointment_date": {
                        "$gte": start_date,
                        "$lte": end_date
                    }
                }
            },
            {
                "$project": {
                    "appointment_date": 1
                }
            }
        ]
        
        cursor = collection_apointment.aggregate(pipeline)
        appointments = await cursor.to_list(length=None)
        
        # Create day count mapping using Python's weekday
        day_names = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        day_counts = []
        total_appointments = 0
        
        # Initialize count for each day
        day_count_map = {i: 0 for i in range(7)}  # 0=Monday, 6=Sunday
        
        for appointment in appointments:
            appointment_date = appointment.get("appointment_date")
            if isinstance(appointment_date, datetime):
                day_index = appointment_date.weekday()  # 0=Monday, 6=Sunday
                day_count_map[day_index] += 1
                total_appointments += 1
            elif isinstance(appointment_date, dict) and "$date" in appointment_date:
                # Handle MongoDB extended JSON format
                date_obj = datetime.fromisoformat(appointment_date["$date"].replace("Z", "+00:00"))
                day_index = date_obj.weekday()  # 0=Monday, 6=Sunday
                day_count_map[day_index] += 1
                total_appointments += 1
        
        for i, day_name in enumerate(day_names):
            count = day_count_map[i]
            # Calculate the actual date for this day of the week
            day_date = monday + timedelta(days=i)
            
            day_count = DayCount(
                day_of_week=day_name,
                date_number=day_date.strftime("%Y-%m-%d"),
                appointment_count=count,
                status="active" if count > 0 else "no_appointments"
            )
            day_counts.append(day_count)
        
        return WeeklyCountResponse(
            sub_service_id=query.sub_service_id,
            week_start=monday,
            week_end=sunday,
            day_counts=day_counts,
            total_appointments=total_appointments
        )
        
    except Exception as e:
        raise Exception(f"Error getting weekly appointment counts: {str(e)}")

async def get_weekly_appointment_counts_main_service(query: WeeklyMainServiceCountQuery) -> WeeklyCountResponse:
    """
    Get appointment counts for each day of the week for a specific sub_service and main_service
    """
    try:
        # Calculate the start and end of the week (Monday to Sunday)
        day_of_week = query.date.weekday()
        monday = query.date - timedelta(days=day_of_week)
        sunday = monday + timedelta(days=6)
        
        # Convert dates to datetime for MongoDB query
        start_date = datetime.combine(monday, datetime.min.time())
        end_date = datetime.combine(sunday, datetime.max.time())
        
        # Convert string sub_service_id to ObjectId
        try:
            sub_service_object_id = ObjectId(query.sub_service_id)
        except Exception:
            raise ValueError(f"Invalid sub_service_id format: {query.sub_service_id}")
        
        # First, get the sub_service from sub_services collection using _id
        sub_service = await collection_sub_services.find_one({"_id": sub_service_object_id})
        if not sub_service:
            raise ValueError(f"Sub-service with ID {query.sub_service_id} not found")
        
        # Get the main service to verify the relationship
        try:
            main_service_object_id = ObjectId(query.main_service_id)
        except Exception:
            raise ValueError(f"Invalid main_service_id format: {query.main_service_id}")
        
        main_service = await collection_main_services.find_one({"_id": main_service_object_id})
        if not main_service:
            raise ValueError(f"Main-service with ID {query.main_service_id} not found")
        
        # Verify that the sub_service belongs to the specified main_service
        # Check if the sub_service_id exists in the main_service's sub_services array
        if sub_service_object_id not in [ObjectId(sub_id) for sub_id in main_service.get("sub_services", [])]:
            raise ValueError(f"Sub-service {query.sub_service_id} does not belong to main-service {query.main_service_id}")
        
        # Query appointments for the specific sub_service and week
        pipeline = [
            {
                "$match": {
                    "sub_service_id": sub_service_object_id,
                    "appointment_date": {
                        "$gte": start_date,
                        "$lte": end_date
                    }
                }
            },
            {
                "$project": {
                    "appointment_date": 1
                }
            }
        ]
        
        cursor = collection_apointment.aggregate(pipeline)
        appointments = await cursor.to_list(length=None)
        
        # Create day count mapping using Python's weekday
        day_names = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        day_counts = []
        total_appointments = 0
        
        # Initialize count for each day
        day_count_map = {i: 0 for i in range(7)}  # 0=Monday, 6=Sunday
        
        for appointment in appointments:
            appointment_date = appointment.get("appointment_date")
            if isinstance(appointment_date, datetime):
                day_index = appointment_date.weekday()  # 0=Monday, 6=Sunday
                day_count_map[day_index] += 1
                total_appointments += 1
            elif isinstance(appointment_date, dict) and "$date" in appointment_date:
                # Handle MongoDB extended JSON format
                date_obj = datetime.fromisoformat(appointment_date["$date"].replace("Z", "+00:00"))
                day_index = date_obj.weekday()  # 0=Monday, 6=Sunday
                day_count_map[day_index] += 1
                total_appointments += 1
        
        for i, day_name in enumerate(day_names):
            count = day_count_map[i]
            # Calculate the actual date for this day of the week
            day_date = monday + timedelta(days=i)
            
            day_count = DayCount(
                day_of_week=day_name,
                date_number=day_date.strftime("%Y-%m-%d"),
                appointment_count=count,
                status="active" if count > 0 else "no_appointments"
            )
            day_counts.append(day_count)
        
        return WeeklyCountResponse(
            sub_service_id=query.sub_service_id,
            week_start=monday,
            week_end=sunday,
            day_counts=day_counts,
            total_appointments=total_appointments
        )
        
    except Exception as e:
        raise Exception(f"Error getting weekly appointment counts for main service: {str(e)}")
