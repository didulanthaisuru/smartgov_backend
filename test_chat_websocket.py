#!/usr/bin/env python3
"""
Test script for the chat WebSocket functionality
"""

import asyncio
import socketio
import json
from datetime import datetime

# Create Socket.IO client
sio = socketio.AsyncClient()

class ChatTester:
    def __init__(self):
        self.connected = False
        self.messages_received = []
        
    async def setup_events(self):
        """Setup Socket.IO event handlers"""
        
        @sio.event
        async def connect():
            print("✅ Connected to WebSocket server")
            self.connected = True
            
        @sio.event
        async def disconnect():
            print("❌ Disconnected from WebSocket server")
            self.connected = False
            
        @sio.on('receive_message')
        async def on_message(data):
            print(f"📨 Message received: {data}")
            self.messages_received.append(data)
            
        @sio.on('user_joined')
        async def on_user_joined(data):
            print(f"👋 User joined: {data}")
            
        @sio.on('user_left')
        async def on_user_left(data):
            print(f"👋 User left: {data}")
            
        @sio.on('user_typing')
        async def on_typing(data):
            print(f"⌨️  User typing: {data}")
        
    async def test_connection(self):
        """Test basic WebSocket connection"""
        try:
            print("🔗 Testing WebSocket connection...")
            await self.setup_events()
            await sio.connect('http://localhost:8000', socketio_path='/socket.io')
            await asyncio.sleep(2)
            
            if self.connected:
                print("✅ WebSocket connection successful!")
                return True
            else:
                print("❌ WebSocket connection failed!")
                return False
                
        except Exception as e:
            print(f"❌ Connection error: {e}")
            return False
    
    async def test_room_joining(self):
        """Test joining chat rooms"""
        try:
            print("\n🏠 Testing room joining...")
            
            # Test user joining room
            test_room = "user_chat_test123"
            await sio.emit('join_room', {
                'room': test_room,
                'user_type': 'user'
            })
            
            await asyncio.sleep(1)
            print("✅ Room joining test completed!")
            return True
            
        except Exception as e:
            print(f"❌ Room joining error: {e}")
            return False
    
    async def test_message_sending(self):
        """Test sending messages"""
        try:
            print("\n💬 Testing message sending...")
            
            test_room = "user_chat_test123"
            test_message = {
                'room': test_room,
                'sender_id': 'test_user_123',
                'receiver_id': 'admin',
                'content': 'Hello, this is a test message!',
                'timestamp': datetime.now().isoformat(),
                'message_type': 'text'
            }
            
            await sio.emit('send_message', test_message)
            await asyncio.sleep(2)
            
            print("✅ Message sending test completed!")
            return True
            
        except Exception as e:
            print(f"❌ Message sending error: {e}")
            return False
    
    async def test_typing_indicators(self):
        """Test typing indicators"""
        try:
            print("\n⌨️  Testing typing indicators...")
            
            await sio.emit('typing', {
                'room': 'user_chat_test123',
                'user_id': 'test_user_123',
                'is_typing': True
            })
            
            await asyncio.sleep(1)
            
            await sio.emit('typing', {
                'room': 'user_chat_test123',
                'user_id': 'test_user_123',
                'is_typing': False
            })
            
            print("✅ Typing indicators test completed!")
            return True
            
        except Exception as e:
            print(f"❌ Typing indicators error: {e}")
            return False
    
    async def run_all_tests(self):
        """Run all WebSocket tests"""
        print("🧪 Starting WebSocket Chat Tests\n")
        
        results = []
        
        # Test connection
        results.append(await self.test_connection())
        
        if not self.connected:
            print("❌ Cannot proceed with tests - connection failed")
            return False
        
        # Test room joining
        results.append(await self.test_room_joining())
        
        # Test message sending
        results.append(await self.test_message_sending())
        
        # Test typing indicators
        results.append(await self.test_typing_indicators())
        
        # Disconnect
        await sio.disconnect()
        
        # Results summary
        print(f"\n📊 Test Results Summary:")
        print(f"✅ Passed: {sum(results)}/{len(results)} tests")
        print(f"❌ Failed: {len(results) - sum(results)}/{len(results)} tests")
        
        if all(results):
            print("\n🎉 All WebSocket tests passed!")
            return True
        else:
            print("\n⚠️  Some tests failed. Check the logs above.")
            return False

async def main():
    tester = ChatTester()
    success = await tester.run_all_tests()
    return success

if __name__ == "__main__":
    print("🚀 WebSocket Chat System Test")
    print("=" * 50)
    
    try:
        result = asyncio.run(main())
        if result:
            print("\n✅ All tests completed successfully!")
            exit(0)
        else:
            print("\n❌ Some tests failed!")
            exit(1)
    except KeyboardInterrupt:
        print("\n⏹️  Tests interrupted by user")
        exit(1)
    except Exception as e:
        print(f"\n💥 Unexpected error: {e}")
        exit(1)
