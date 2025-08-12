from fastapi import APIRouter, UploadFile, File, Form, Response, HTTPException
from services.admin_services.qr_code_scanner import QRService
from schemas.qr_schemas import QRBase64Response, QRScanResponse

router = APIRouter(prefix="/qr", tags=["QR"])

@router.post("/generate", response_class=Response)
async def generate_qr(key: str = Form(...)):
    if not key:
        raise HTTPException(status_code=400, detail="`key` is required")
    return Response(content=QRService.generate_qr(key), media_type="image/png")

@router.get("/generate/{key}", response_class=Response)
async def generate_qr_get(key: str):
    return Response(content=QRService.generate_qr(key), media_type="image/png")

@router.post("/generate_base64", response_model=QRBase64Response)
async def generate_qr_base64(key: str = Form(...)):
    if not key:
        raise HTTPException(status_code=400, detail="`key` is required")
    return QRBase64Response(key=key, data_uri=QRService.generate_qr_base64(key))

@router.post("/scan", response_model=QRScanResponse)
async def scan_qr(file: UploadFile = File(...)):
    contents = await file.read()
    try:
        results = QRService.scan_qr_from_bytes(contents)
    except Exception:
        raise HTTPException(status_code=400, detail="Unable to open image file")
    if not results:
        return QRScanResponse(success=False, results=[], detail="No QR/barcode detected")
    return QRScanResponse(success=True, results=results)
