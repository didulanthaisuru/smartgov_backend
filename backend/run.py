#!/usr/bin/env python3
"""
Run script for the SmartGov API

This script starts the FastAPI application using uvicorn.
"""

import uvicorn
from config import settings

if __name__ == "__main__":
    print("🚀 Starting SmartGov API Server...")
    print(f"📍 Host: {settings.HOST}")
    print(f"🔌 Port: {settings.PORT}")
    print(f"🔄 Reload: {settings.RELOAD}")
    print(f"🐛 Debug: {settings.DEBUG_MODE}")
    print(f"📊 Log Level: {settings.LOG_LEVEL}")
    print("=" * 50)
    
    # Start the uvicorn server
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.RELOAD,
        log_level=settings.LOG_LEVEL
    )
