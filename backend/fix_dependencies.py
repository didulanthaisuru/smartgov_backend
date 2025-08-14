#!/usr/bin/env python3
"""
Script to fix JWT dependencies
"""

import subprocess
import sys

def fix_jwt_dependencies():
    """Fix JWT dependencies by uninstalling old jose and installing correct packages"""
    print("🔧 Fixing JWT dependencies...")
    
    try:
        # Uninstall the problematic jose package
        print("🗑️  Uninstalling old jose package...")
        subprocess.run([sys.executable, "-m", "pip", "uninstall", "jose", "-y"], check=True)
        
        # Install the correct python-jose package
        print("📦 Installing python-jose[cryptography]...")
        subprocess.run([sys.executable, "-m", "pip", "install", "python-jose[cryptography]==3.3.0"], check=True)
        
        # Install passlib for password hashing
        print("📦 Installing passlib[bcrypt]...")
        subprocess.run([sys.executable, "-m", "pip", "install", "passlib[bcrypt]==1.7.4"], check=True)
        
        print("✅ JWT dependencies fixed successfully!")
        print("🚀 You can now run the application with: python run.py")
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Error fixing dependencies: {e}")
        print("Please run the following commands manually:")
        print("pip uninstall jose -y")
        print("pip install python-jose[cryptography]==3.3.0")
        print("pip install passlib[bcrypt]==1.7.4")

if __name__ == "__main__":
    fix_jwt_dependencies()

