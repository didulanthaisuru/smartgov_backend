import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setShowSidebar(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    setShowSidebar(false);
  };

  if (!showSidebar) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="w-60 bg-blue-50 bg-opacity-20 backdrop-blur-md h-full shadow-lg">
        <div className="p-6">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-10 bg-orange-500 rounded"></div>
              <span className="text-3xl font-medium text-black">Smart Gov</span>
            </div>
            <button
              onClick={() => setShowSidebar(false)}
              className="p-2 hover:bg-white hover:bg-opacity-30 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Items */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4 cursor-pointer hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors" onClick={() => handleNavigation('/profile')}>
              <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="text-xl text-black">My Profile</span>
            </div>

            <div className="flex items-center space-x-4 cursor-pointer hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors" onClick={() => handleNavigation('/services')}>
              <div className="w-12 h-12 bg-green-600 rounded flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-xl text-black">Services</span>
            </div>

            <div className="flex items-center space-x-4 cursor-pointer hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors" onClick={() => handleNavigation('/chatbot')}>
              <div className="w-12 h-12 bg-indigo-600 rounded flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="text-xl text-black">AI Assistant</span>
            </div>

            <div className="flex items-center space-x-4 cursor-pointer hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors" onClick={() => handleNavigation('/analytics')}>
              <div className="w-12 h-12 bg-yellow-600 rounded flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-xl text-black">Analytics</span>
            </div>

            <div className="flex items-center space-x-4 cursor-pointer hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors" onClick={() => handleNavigation('/appointments')}>
              <div className="w-12 h-12 bg-teal-600 rounded flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xl text-black">Appointments</span>
            </div>

            <div className="flex items-center space-x-4 cursor-pointer hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors" onClick={() => handleNavigation('/contact-us')}>
              <div className="w-12 h-12 bg-purple-600 rounded flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26c.31.17.69.17 1-.01L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xl text-black">Contact Us</span>
            </div>

            <div className="flex items-center space-x-4 cursor-pointer hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors" onClick={handleLogout}>
              <div className="w-12 h-12 bg-red-600 rounded flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <span className="text-xl text-black">Log Out</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-black bg-opacity-50" onClick={() => setShowSidebar(false)}></div>
    </div>
  );
};

export default Sidebar;
