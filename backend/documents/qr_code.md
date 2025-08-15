# QR Code Generator and Decoder Explanation

This module provides functionality to generate and decode QR codes for securely encoding keys (e.g., appointment IDs) using Base64 encoding.

---

## How the QR Code Generator Works

1. **Take the appointment ID (or any key) as input.**
2. **Encode the key into a Base64 string.**  
   This converts the original string into a Base64-encoded string, which is safe for embedding inside QR codes.
3. **Generate a QR code from the Base64-encoded string.**  
   The QR code is created using the encoded data, so the actual appointment ID is not directly embedded but encoded first.
4. **Return the QR code image as PNG bytes or as a Base64 string for easy usage in web or apps.**

---

## How the QR Code Decoder Works

1. **Scan or read the QR code image to extract the embedded data.**  
   The scanner decodes the QR code and retrieves the Base64-encoded string.
2. **Decode the Base64 string back to the original key (e.g., appointment ID).**
3. **Check the decoded key against your database or system for validation or further processing.**

---

## Why External Authorities Cannot Access the True Data Directly

- The data embedded in the QR code is **Base64-encoded**, which is not human-readable plain text.
- Anyone scanning the QR code without knowledge of the decoding step will only see an encoded string, **not the actual appointment ID**.
- This adds a layer of obfuscation, preventing casual interception or misuse.
- **Additional security measures** (like encryption, access control, or tokenization) can be added on top of this for stronger protection.
- Therefore, **external parties scanning the QR code directly cannot retrieve the true data unless they perform the proper Base64 decoding and have access rights to interpret it.**

---

## Summary

| Step                    | Description                          |
|-------------------------|------------------------------------|
| Input                   | Appointment ID or key (plain text) |
| Encoding                | Convert to Base64 string            |
| QR Code Generation      | Embed Base64 string into QR code   |
| QR Code Scanning        | Read Base64 string from QR code    |
| Decoding                | Convert Base64 string back to original key |
| Validation              | Verify key against database/system |

This process ensures that the actual data is not exposed directly in the QR code, enhancing security and privacy.

---

*This code uses the `qrcode` library for generating QR codes, and `pyzbar` for scanning and decoding QR codes from images.*
