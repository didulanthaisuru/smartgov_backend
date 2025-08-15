import base64
from io import BytesIO
from PIL import Image
import qrcode
from pyzbar.pyzbar import decode

class QRService:
    @staticmethod
    def pil_image_to_png_bytes(img: Image.Image) -> bytes:
        buf = BytesIO()
        img.save(buf, format="PNG")
        return buf.getvalue()

    @staticmethod
    def encode_key(key: str) -> str:
        # Encode the key string into base64 string (safe for QR)
        return base64.b64encode(key.encode('utf-8')).decode('utf-8')

    @staticmethod
    def decode_key(encoded_key: str) -> str:
        # Decode the base64 encoded string back to original
        return base64.b64decode(encoded_key.encode('utf-8')).decode('utf-8')

    @staticmethod
    def generate_qr(key: str) -> bytes:
        encoded = QRService.encode_key(key)
        qr = qrcode.QRCode(
            version=1, error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=10, border=4
        )
        qr.add_data(encoded)
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white").convert("RGB")
        return QRService.pil_image_to_png_bytes(img)

    @staticmethod
    def generate_qr_base64(key: str) -> str:
        encoded = QRService.encode_key(key)
        img = qrcode.make(encoded).convert("RGB")
        png_bytes = QRService.pil_image_to_png_bytes(img)
        return f"data:image/png;base64,{base64.b64encode(png_bytes).decode('utf-8')}"

    @staticmethod
    def scan_qr_from_bytes(contents: bytes):
        img = Image.open(BytesIO(contents)).convert("RGB")
        decoded = decode(img)
        results = []
        for d in decoded:
            try:
                # The decoded data is the encoded base64 string, so decode it back to original
                encoded_text = d.data.decode("utf-8")
                data_text = QRService.decode_key(encoded_text)
            except Exception:
                # fallback, if decoding fails, just return raw base64 string
                data_text = base64.b64encode(d.data).decode("utf-8")

            results.append({
                "data": data_text,
                "type": d.type,
                "rect": {
                    "left": d.rect.left,
                    "top": d.rect.top,
                    "width": d.rect.width,
                    "height": d.rect.height
                }
            })
        return results