import asyncio
import motor.motor_asyncio
import os
from dotenv import load_dotenv
from bson import ObjectId

# Load environment variables
load_dotenv()

# MongoDB connection
MONGO_URI = os.getenv("MONGO_URI")
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
db = client["SmartGov"]
collection_sub_services = db["required_documents"]
collection_required_documents = db["required_documents"]

async def test_subservice_details():
    """Test the subservice details functionality"""
    
    # Test subservice ID from your example
    test_subservice_id = "689cd830ef2618d4dfe5a594"
    
    print(f"Testing subservice details for ID: {test_subservice_id}")
    print("=" * 60)
    
    try:
        # Convert to ObjectId
        subservice_object_id = ObjectId(test_subservice_id)
        
        # Find the sub-service document
        subservice_doc = await collection_sub_services.find_one({"_id": subservice_object_id})
        
        if not subservice_doc:
            print("❌ Sub-service not found!")
            return
        
        print(f"✅ Found sub-service: {subservice_doc.get('service_name', 'Unknown')}")
        print(f"💰 Payment amount: {subservice_doc.get('payment_amount', 0)}")
        print()
        
        # Get required documents
        required_docs = subservice_doc.get("required_docs", [])
        print(f"📄 Required documents ({len(required_docs)}):")
        
        for i, doc_ref in enumerate(required_docs, 1):
            # Handle both ObjectId and string formats
            if isinstance(doc_ref, dict) and "$oid" in doc_ref:
                doc_id = ObjectId(doc_ref["$oid"])
            elif isinstance(doc_ref, ObjectId):
                doc_id = doc_ref
            else:
                doc_id = ObjectId(doc_ref)
            
            # Get document details
            required_doc = await collection_required_documents.find_one({"_id": doc_id})
            
            if required_doc:
                print(f"  {i}. {required_doc.get('doc_name', 'Unknown Document')}")
                print(f"     Description: {required_doc.get('description', 'No description')}")
                print(f"     ID: {doc_id}")
            else:
                print(f"  {i}. ❌ Document not found: {doc_id}")
            print()
        
        # Get steps
        steps = subservice_doc.get("steps", [])
        print(f"🔄 Service steps ({len(steps)}):")
        
        for step in steps:
            if isinstance(step, dict) and "step_id" in step and "step_name" in step:
                print(f"  Step {step['step_id']}: {step['step_name']}")
        
        print()
        print("✅ Test completed successfully!")
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    asyncio.run(test_subservice_details())
