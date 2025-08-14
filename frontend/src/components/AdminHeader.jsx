// Admin-specific header component
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const AdminHeader = ({ title, setShowSidebar, children }) => {
  const { user } = useAuth();

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex justify-between items-center p-6">
        <div className="flex items-center">
          {/* Admin Hamburger Menu */}
          <button
            onClick={() => setShowSidebar(true)}
            className="w-12 h-12 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors shadow-sm border border-blue-300"
          >
            <svg
              className="w-6 h-6 text-blue-700"
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
          
          {title && (
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
              <p className="text-sm text-gray-600">Admin Portal</p>
            </div>
          )}
        </div>

        {/* Right side content (notifications, profile, etc.) */}
        <div className="flex items-center space-x-4">
          {children}
          
          {/* Admin Profile Info */}
          <div className="flex items-center space-x-3 bg-blue-50 rounded-lg p-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{user?.admin_name || 'Admin'}</p>
              <p className="text-xs text-gray-600">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
