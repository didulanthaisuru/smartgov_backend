import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const ChatbotPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState('English');
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Sidebar */}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      {/* Header */}
      <div className="flex justify-between items-center p-4">
        {/* Enhanced Hamburger Menu */}
        <button
          onClick={() => setShowSidebar(true)}
          className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors shadow-sm border border-gray-300"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-12 h-16 bg-orange-500 rounded"></div>
          <span className="text-2xl font-medium text-black">Smart Gov</span>
        </div>

        {/* Language Selector */}
        <div className="flex items-center space-x-1 bg-white bg-opacity-20 border border-black rounded-xl px-3 py-2">
          <span className="text-sm text-black">{language}</span>
          <div className="w-6 h-6 bg-gray-400 rounded-sm"></div>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 px-4 py-6 space-y-6 pb-32">
        {/* Bot Avatar Icons */}
        <div className="flex justify-between px-4">
          <div className="w-7 h-7 bg-teal-200 rounded-lg flex items-center justify-center">
            <div className="w-5 h-5 bg-gray-400 rounded"></div>
          </div>
          <div className="w-7 h-7 bg-orange-200 rounded-lg flex items-center justify-center">
            <div className="w-5 h-5 bg-gray-400 rounded"></div>
          </div>
        </div>

        {/* Bot Avatar and Introduction Message */}
        <div className="flex items-start space-x-3">
          <div className="w-7 h-7 bg-teal-300 rounded-full flex items-center justify-center">
            <div className="w-5 h-5 bg-white rounded-full"></div>
          </div>
          <div className="max-w-96 bg-white border border-gray-300 rounded-lg p-3 shadow-sm relative">
            <div className="w-1 h-16 bg-blue-900 absolute -left-1 top-0 rounded-l-lg"></div>
            <p className="text-sm text-gray-700 leading-relaxed ml-2">
              This AI chatbot has been developed to optimize communication and simplify work processes, ultimately leading to smoother operations.
            </p>
          </div>
        </div>

        {/* User Message */}
        <div className="flex justify-end items-start space-x-3">
          <div className="max-w-28 bg-white border border-gray-300 rounded-lg p-3 shadow-sm relative">
            <div className="w-1 h-11 bg-black absolute -right-1 top-0 rounded-r-lg"></div>
            <p className="text-sm text-gray-700 mr-2">Thank You :)</p>
          </div>
          <div className="w-7 h-7 bg-orange-300 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Profile Avatar */}
      <div className="fixed bottom-24 left-5">
        <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
      </div>

      {/* Chat Input */}
      <div className="fixed bottom-0 left-0 right-0 p-9 bg-white">
        <div className="max-w-md mx-auto relative">
          <div className="bg-orange-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="| Ask anything about Your Service."
                className="flex-1 bg-transparent text-gray-600 placeholder-gray-500 outline-none text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="w-7 h-7 bg-gray-400 rounded hover:bg-gray-500 transition-colors flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
