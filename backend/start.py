#!/usr/bin/env python3
"""
Startup script for SmartGov API

This script provides different options for starting the application.
"""

import os
import sys
import subprocess
from config import settings

def print_banner():
    """Print application banner"""
    print("=" * 60)
    print("🚀 SmartGov API Server")
    print("=" * 60)
    print(f"📋 Project: {settings.PROJECT_NAME}")
    print(f"📦 Version: {settings.PROJECT_VERSION}")
    print(f"🌐 Host: {settings.HOST}")
    print(f"🔌 Port: {settings.PORT}")
    print(f"🔄 Reload: {settings.RELOAD}")
    print(f"🐛 Debug: {settings.DEBUG_MODE}")
    print("=" * 60)

def start_development():
    """Start the application in development mode"""
    print_banner()
    print("🛠️  Starting in DEVELOPMENT mode...")
    
    # Set development environment variables
    os.environ["DEBUG_MODE"] = "True"
    os.environ["RELOAD"] = "True"
    os.environ["LOG_LEVEL"] = "debug"
    
    # Start the server
    subprocess.run([sys.executable, "run.py"])

def start_production():
    """Start the application in production mode"""
    print_banner()
    print("🏭 Starting in PRODUCTION mode...")
    
    # Set production environment variables
    os.environ["DEBUG_MODE"] = "False"
    os.environ["RELOAD"] = "False"
    os.environ["LOG_LEVEL"] = "info"
    
    # Start the server
    subprocess.run([sys.executable, "run.py"])

def start_test():
    """Start the application in test mode"""
    print_banner()
    print("🧪 Starting in TEST mode...")
    
    # Set test environment variables
    os.environ["DEBUG_MODE"] = "True"
    os.environ["RELOAD"] = "False"
    os.environ["LOG_LEVEL"] = "debug"
    os.environ["PORT"] = "8001"  # Use different port for testing
    
    # Start the server
    subprocess.run([sys.executable, "run.py"])

def show_help():
    """Show help information"""
    print("SmartGov API Startup Script")
    print("\nUsage:")
    print("  python start.py [mode]")
    print("\nModes:")
    print("  dev     - Development mode (default)")
    print("  prod    - Production mode")
    print("  test    - Test mode")
    print("  help    - Show this help")
    print("\nExamples:")
    print("  python start.py dev")
    print("  python start.py prod")
    print("  python start.py test")

if __name__ == "__main__":
    mode = sys.argv[1] if len(sys.argv) > 1 else "dev"
    
    if mode == "dev":
        start_development()
    elif mode == "prod":
        start_production()
    elif mode == "test":
        start_test()
    elif mode == "help":
        show_help()
    else:
        print(f"❌ Unknown mode: {mode}")
        show_help()
        sys.exit(1)
