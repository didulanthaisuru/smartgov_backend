// Admin-specific header component
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Bell, LogOut, User, Settings } from 'lucide-react';

const AdminHeader = ({ title, setShowSidebar, children }) => {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/admin/login';
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="flex justify-between items-center p-4 lg:p-6">
        <div className="flex items-center">
          {/* Admin Hamburger Menu */}
          <button
            onClick={() => setShowSidebar(true)}
            className="w-12 h-12 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors shadow-sm border border-blue-300 mr-4"
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
            <div className="ml-2">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800">{title}</h1>
              <p className="text-sm text-gray-600">Administrator Portal</p>
            </div>
          )}
        </div>

        {/* Right side content (notifications, profile, etc.) */}
        <div className="flex items-center space-x-3">
          {children}
          
          {/* Notifications */}
          <button className="relative w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Admin Profile Info with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-3 bg-blue-50 hover:bg-blue-100 rounded-lg p-3 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-gray-800">{user?.admin_name || 'Admin'}</p>
                <p className="text-xs text-gray-600">{user?.service_id || 'Administrator'}</p>
              </div>
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">{user?.admin_name || 'Admin'}</p>
                  <p className="text-xs text-gray-600">{user?.email || 'admin@example.com'}</p>
                </div>
                
                <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  <Settings className="w-4 h-4 mr-3" />
                  Settings
                </button>
                
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {showProfileMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowProfileMenu(false)}
        />
      )}
    </div>
  );
};

export default AdminHeader;
