// Admin-specific sidebar navigation
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="fixed left-0 top-0 w-64 h-full bg-gradient-to-b from-blue-900 to-blue-800 shadow-2xl z-40">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-12 bg-orange-500 rounded-lg shadow-lg"></div>
          <div>
            <span className="text-2xl font-bold text-white">Smart Gov</span>
            <p className="text-blue-200 text-sm">Admin Portal</p>
          </div>
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

          <div className="flex items-center space-x-4 cursor-pointer hover:bg-blue-700 hover:bg-opacity-50 rounded-lg p-3 transition-colors" onClick={() => handleNavigation('/admin/tasks')}>
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <span className="text-white font-medium">Tasks Management</span>
          </div>

          <div className="flex items-center space-x-4 cursor-pointer hover:bg-blue-700 hover:bg-opacity-50 rounded-lg p-3 transition-colors" onClick={() => handleNavigation('/admin/completed-tasks')}>
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-white font-medium">Completed Tasks</span>
          </div>

          <div className="flex items-center space-x-4 cursor-pointer hover:bg-blue-700 hover:bg-opacity-50 rounded-lg p-3 transition-colors" onClick={() => handleNavigation('/admin/notifications')}>
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-5 5v-5zM8.828 2l2.122 2.122a2 2 0 002.828 0L16 2h1a1 1 0 011 1v12a1 1 0 01-1 1H7a1 1 0 01-1-1V3a1 1 0 011-1h1.828z" />
              </svg>
            </div>
            <span className="text-white font-medium">Notifications</span>
          </div>

          <div className="flex items-center space-x-4 cursor-pointer hover:bg-blue-700 hover:bg-opacity-50 rounded-lg p-3 transition-colors" onClick={() => handleNavigation('/admin/chat')}>
            <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <span className="text-white font-medium">Support Chat</span>
          </div>

          <div className="flex items-center space-x-4 cursor-pointer hover:bg-blue-700 hover:bg-opacity-50 rounded-lg p-3 transition-colors" onClick={() => handleNavigation('/admin/qr-scan')}>
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <span className="text-white font-medium">QR Scanner</span>
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
  );
};

export default AdminSidebar;
