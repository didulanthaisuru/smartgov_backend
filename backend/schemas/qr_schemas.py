from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class QRBase64Response(BaseModel):
    key: str
    data_uri: str

class QRScanResult(BaseModel):
    data: str
    type: str
    rect: Optional[Dict[str, Any]]

class QRScanResponse(BaseModel):
    success: bool
    results: List[QRScanResult]
    detail: Optional[str] = None