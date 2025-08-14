import requests
import json

def test_subservice_details():
    """Test the subservice details API endpoint"""
    
    url = "http://127.0.0.1:8000/get_subservice_details"
    
    # Test data
    payload = {
        "subservice_id": "689cd830ef2618d4dfe5a594"
    }
    
    headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
    
    print("Testing Subservice Details Endpoint")
    print("=" * 50)
    print(f"URL: {url}")
    print(f"Payload: {json.dumps(payload, indent=2)}")
    print()
    
    try:
        response = requests.post(url, json=payload, headers=headers)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")
        print()
        
        if response.status_code == 200:
            data = response.json()
            print("✅ SUCCESS! Response:")
            print(json.dumps(data, indent=2))
            
            # Verify required document names are included
            print("\n📋 Required Documents:")
            for i, doc in enumerate(data.get('required_documents', []), 1):
                print(f"  {i}. {doc.get('doc_name', 'Unknown')}")
                print(f"     Description: {doc.get('description', 'No description')}")
                print(f"     ID: {doc.get('doc_id')}")
                print()
            
            print("🔄 Service Steps:")
            for step in data.get('steps', []):
                print(f"  Step {step.get('step_id')}: {step.get('step_name')}")
                
        else:
            print("❌ ERROR!")
            print(f"Response: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Connection Error: Make sure the server is running on http://127.0.0.1:8000")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_subservice_details()
