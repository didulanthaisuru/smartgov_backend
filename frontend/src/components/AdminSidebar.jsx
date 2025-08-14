// Admin-specific sidebar navigation
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminSidebar = ({ showSidebar, setShowSidebar }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
    setShowSidebar(false);
  };

  const handleLogout = () => {
    logout();
    setShowSidebar(false);
  };

  if (!showSidebar) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="w-72 bg-gradient-to-b from-blue-900 to-blue-800 h-full shadow-2xl">
        <div className="p-6">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-12 bg-orange-500 rounded-lg shadow-lg"></div>
              <div>
                <span className="text-2xl font-bold text-white">Smart Gov</span>
                <p className="text-blue-200 text-sm">Admin Portal</p>
              </div>
            </div>
            <button
              onClick={() => setShowSidebar(false)}
              className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Admin Info */}
          <div className="bg-blue-700 bg-opacity-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">{user?.admin_name || 'Admin'}</p>
                <p className="text-blue-200 text-sm">Administrator</p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="space-y-3">
            <div className="flex items-center space-x-4 cursor-pointer hover:bg-blue-700 hover:bg-opacity-50 rounded-lg p-3 transition-colors" onClick={() => handleNavigation('/admin/dashboard')}>
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-white font-medium">Dashboard</span>
            </div>

            <div className="flex items-center space-x-4 cursor-pointer hover:bg-blue-700 hover:bg-opacity-50 rounded-lg p-3 transition-colors" onClick={() => handleNavigation('/admin/users')}>
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <span className="text-white font-medium">User Management</span>
            </div>

            <div className="flex items-center space-x-4 cursor-pointer hover:bg-blue-700 hover:bg-opacity-50 rounded-lg p-3 transition-colors" onClick={() => handleNavigation('/admin/services')}>
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-white font-medium">Service Management</span>
            </div>

            <div className="flex items-center space-x-4 cursor-pointer hover:bg-blue-700 hover:bg-opacity-50 rounded-lg p-3 transition-colors" onClick={() => handleNavigation('/admin/appointments')}>
              <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-white font-medium">Appointments</span>
            </div>

            <div className="flex items-center space-x-4 cursor-pointer hover:bg-blue-700 hover:bg-opacity-50 rounded-lg p-3 transition-colors" onClick={() => handleNavigation('/admin/analytics')}>
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-white font-medium">Analytics & Reports</span>
            </div>

            <div className="flex items-center space-x-4 cursor-pointer hover:bg-blue-700 hover:bg-opacity-50 rounded-lg p-3 transition-colors" onClick={() => handleNavigation('/admin/settings')}>
              <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-white font-medium">Settings</span>
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-blue-700"></div>

            <div className="flex items-center space-x-4 cursor-pointer hover:bg-red-600 hover:bg-opacity-50 rounded-lg p-3 transition-colors" onClick={handleLogout}>
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <span className="text-white font-medium">Logout</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-black bg-opacity-50" onClick={() => setShowSidebar(false)}></div>
    </div>
  );
};

export default AdminSidebar;
