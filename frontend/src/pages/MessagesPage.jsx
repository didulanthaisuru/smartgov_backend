// MessagesPage.js (Updated)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageSwitcher from '../components/languageSwitcher'; // Correct import path
import HamburgerMenu from '../components/HamburgerMenu';
import { CheckCircle, AlertCircle, Bell, MessageSquare } from 'lucide-react';

const MessagesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  // State for selected language, now managed by the parent
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const messages = [
    {
      id: 1,
      from: 'BR Admin',
      date: '2025-07-11',
      content: 'Hi Imasha Jayarathne, we are regret to inform that your birth certificate doesn\'t match our requirement. Please upload another one.',
      type: 'error'
    },
    {
      id: 2,
      from: 'NIC Admin',
      date: '2025-07-10',
      content: 'Hi Imasha Jayarathne, we are happy to inform you that your grama niladari approval got verified and now have gone to the permit processing stage.',
      type: 'success'
    },
    {
      id: 3,
      from: 'License Admin',
      date: '2025-07-09',
      content: 'Hi Imasha Jayarathne, we are happy to inform you that your business registration is at the final stage and it will be send to the final signature on 13th monday. you can borrow it on 2.00 pm',
      type: 'info'
    }
  ];

  const getMessageIcon = (type) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'error': return AlertCircle;
      case 'info': return Bell;
      default: return MessageSquare;
    }
  };


  const filteredMessages = messages.filter(message =>
    message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.from.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handler for language change from the child component
  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    console.log(`Language changed to: ${lang}`);
    // You can add more logic here to handle the language change,
    // like updating the app's state for translations
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">


     <header className="relative z-10 bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section: Hamburger Menu */}
        <div className="flex items-center">
          <HamburgerMenu />
        </div>

        {/* Center Section: Logo/Title */}
        <div className="flex items-center space-x-3">
          <div className="w-[45px] h-[45px] bg-gray-300 rounded-full flex-shrink-0"></div>
          <h1 className="text-xl font-semibold text-gray-800">Smart Gov</h1>
        </div>

        {/* Right Section: Language Switcher */}
        <div className="flex items-center">
          <LanguageSwitcher onLanguageChange={handleLanguageChange} />
        </div>
      </div>
    </header>

      {/* Title and Summary */}
      <div className="relative z-10 px-6 py-6">
        <h2 className="text-4xl font-normal text-black mb-4">Messages</h2>
        <p className="text-sm text-black mb-6">You have 3 unread Messages</p>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 bg-white rounded-t-3xl shadow-[0_4px_250px_rgba(0,0,0,0.25)] mx-6 min-h-[500px] p-6">
        {/* Search and Filter Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 mr-4">
            <div className="relative bg-[#F8CB93] rounded-xl px-6 py-3 flex items-center shadow-md">
              <span className="text-sm text-black opacity-25 mr-3">Search Messages</span>
              <svg className="w-4 h-4 text-black opacity-25" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </div>
          </div>

          <div className="bg-[#F8CB93] rounded-xl px-4 py-3 shadow-md flex items-center">
            <span className="text-sm text-black opacity-25 mr-2">Order By</span>
            <svg className="w-6 h-6 text-black opacity-25" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.76 9.34L12 13.63l4.24-4.29L17.66 10.9 12 16.61 6.34 10.9z" />
            </svg>
          </div>
        </div>

        {/* Messages List */}
        <div className="space-y-3">
          {filteredMessages.map((message) => (
            <div key={message.id} className="bg-[#F8CB93] rounded-xl p-6 shadow-md">
              <div className="flex items-start justify-between mb-4">
                <div className="text-xs text-black opacity-50">
                  By {message.from}
                </div>
                <div className="text-xs text-black opacity-50">
                  {message.date}
                </div>
              </div>

              <p className="text-sm text-black leading-relaxed">
                {message.content}
              </p>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => navigate('/chatbot')}
              className="bg-blue-100 rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-blue-200 transition-colors"
            >
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-sm text-blue-600">Need Help?</span>
            </button>

            <button
              onClick={() => navigate('/contact-us')}
              className="bg-green-100 rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-green-200 transition-colors"
            >
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26c.31.17.69.17 1-.01L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-green-600">Contact Us</span>
            </button>
          </div>
        </div>

        {/* Bottom Padding */}
        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default MessagesPage;