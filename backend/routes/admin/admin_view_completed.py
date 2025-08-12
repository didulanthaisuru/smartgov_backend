from fastapi import APIRouter, HTTPException, Query
from typing import List, Dict, Any
from datetime import date

from services.admin_services.completed_tasks_service import get_completed_tasks_by_date

# Define your router
router = APIRouter(
    prefix="/admin",
    tags=["Admin - Completed Tasks"]
)

@router.get("/completed-tasks", response_model=Dict[str, List[Dict[str, Any]]])
async def get_completed_tasks_for_date(

    query_date: str = Query(..., description="Date to fetch tasks for (YYYY-MM-DD)", regex=r"^\d{4}-\d{2}-\d{2}$")
):
    try:

        completed_tasks = get_completed_tasks_by_date(query_date)

        if not completed_tasks:
            return {"completed_tasks": []}

        return {"completed_tasks": completed_tasks}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")
