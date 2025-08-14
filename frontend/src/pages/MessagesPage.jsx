// MessagesPage.js (Updated)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { CheckCircle, AlertCircle, Bell, MessageSquare } from 'lucide-react';

const MessagesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
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
      {/* Sidebar */}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      
      {/* Background Decorative Elements with Enhanced Blur */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-blue-100 opacity-30 backdrop-blur-[15px]"></div>
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[600px] rounded-full bg-blue-100 opacity-30 backdrop-blur-[15px]"></div>
        <div className="absolute top-80 -left-36 w-[600px] h-[750px] rounded-full bg-blue-100 opacity-30 backdrop-blur-[15px]"></div>
      </div>

      {/* Header */}
      <div className="relative z-10">
        <Header 
          title="Messages" 
          setShowSidebar={setShowSidebar} 
        />
      </div>

      {/* Title and Summary */}
      <div className="relative z-10 px-10 py-6">
        <h2 className="text-4xl font-normal text-black mb-2 text-left">Messages</h2>
        <p className="text-sm text-black mb-6 text-left">You have 3 unread Messages</p>
      </div>

      {/* Main Content Area with Enhanced Blur */}
      <div className="relative z-10 bg-white rounded-t-3xl rounded-b-3xl shadow-[0_4px_15px_rgba(0,0,0,0.25)] backdrop-blur-[15px] mx-8 min-h-[500px] p-6">
        {/* Search and Filter Bar with Enhanced Styling */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 mr-4">
            <div className="relative bg-[rgba(242,151,39,0.5)] rounded-[14.5px] px-6 py-3 flex items-center shadow-[0_4px_15px_rgba(0,0,0,0.25)] backdrop-blur-[15px]">
              <input
                type="text"
                placeholder="Search Messages"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent text-sm text-black placeholder-black placeholder-opacity-25 border-none outline-none"
              />
              <svg 
                onClick={() => console.log('Search clicked:', searchTerm)}
                className="w-6 h-6 text-black opacity-50 ml-3 hover:opacity-75 transition-opacity cursor-pointer" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </div>
          </div>
          
          <button className="bg-[rgba(242,151,39,0.5)] rounded-xl px-4 py-3 shadow-[0_4px_15px_rgba(0,0,0,0.25)] backdrop-blur-[15px] flex items-center hover:bg-[rgba(242,151,39,0.7)] transition-colors">
            <span className="text-sm text-black opacity-75 mr-2">Order By</span>
            <div className="w-4 h-4 flex items-center justify-center opacity-75">
              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </div>
          </button>
        </div>

        {/* Enhanced Messages List */}
        <div className="space-y-4">
          {filteredMessages.map((message) => (
            <div key={message.id} className="bg-[rgba(242,151,39,0.5)] rounded-xl p-6 shadow-[0_4px_15px_rgba(0,0,0,0.25)] backdrop-blur-[15px]">
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
      </div>

      {/* Bottom Padding */}
      <div className="h-8"></div>
    </div>
  );
};

export default MessagesPage;