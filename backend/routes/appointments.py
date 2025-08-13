from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["appointments"])

@router.get("/test")
def test_endpoint():
    return {"message": "Appointments router is working"}
