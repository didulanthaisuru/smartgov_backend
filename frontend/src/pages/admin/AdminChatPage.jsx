import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import { Send, Menu } from 'lucide-react';

const AdminChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "This AI chatbot has been developed to optimize communication and simplify work processes, ultimately leading to smoother operations.",
      sender: 'bot',
      timestamp: new Date()
    },
    {
      id: 2,
      text: "Thank You :)",
      sender: 'user',
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: "Thank you for your message. How can I assist you further?",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <Menu size={24} className="text-black" />
              <h1 className="text-lg font-medium text-black">Admin Support Chat</h1>
            </div>
            
            {/* Language Switcher */}
            <div className="flex items-center gap-2 px-3 py-2 border border-black rounded-xl bg-white bg-opacity-20">
              <span className="text-sm font-normal text-black">English</span>
              <div className="w-6 h-6 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && (
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 bg-teal-300 rounded-md flex items-center justify-center">
                      <div className="w-5 h-5 bg-gray-600 rounded"></div>
                    </div>
                    <div className="max-w-md bg-white border border-gray-200 rounded-md p-3 shadow-sm">
                      <div className="w-1 h-full bg-blue-900 absolute left-0 top-0 rounded-l-md"></div>
                      <p className="text-sm font-normal text-gray-700 leading-relaxed">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                )}
                
                {msg.sender === 'user' && (
                  <div className="flex items-start gap-3">
                    <div className="max-w-md bg-white border border-gray-200 rounded-md p-3 shadow-sm">
                      <div className="w-1 h-full bg-gray-900 absolute right-0 top-0 rounded-r-md"></div>
                      <p className="text-sm font-normal text-gray-700 leading-relaxed">
                        {msg.text}
                      </p>
                    </div>
                    <div className="w-7 h-7 bg-orange-300 rounded-md flex items-center justify-center">
                      <div className="w-5 h-5 bg-gray-600 rounded"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4">
            <div className="flex items-center gap-3 bg-orange-200 rounded-xl p-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything about Your Service."
                className="flex-1 bg-transparent outline-none text-gray-600 text-sm placeholder-gray-500"
              />
              <button 
                onClick={handleSendMessage}
                className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                <Send size={16} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* User Avatar */}
          <div className="absolute bottom-20 left-4">
            <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChatPage;
