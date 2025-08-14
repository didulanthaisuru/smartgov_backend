import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';

const ProfileDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('English');
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleGoToActivities = () => {
    navigate('/activities');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        setShowSidebar={setShowSidebar}
        showLanguageSelector={true}
        language={language}
      />

      {/* Main Content */}
      <div className="px-4 py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <div className="flex items-center space-x-4">
            {/* Profile Picture */}
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-orange-600">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </span>
            </div>
            
            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-gray-600 text-sm">{user.email}</p>
              <p className="text-gray-500 text-xs">NIC: {user.nicNumber}</p>
            </div>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="text-red-500 text-sm font-medium hover:text-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 mb-6 text-white">
          <h3 className="text-lg font-bold mb-2">Welcome back, {user.name}!</h3>
          <p className="text-orange-100 text-sm">
            Access your government services and track your applications
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={handleGoToActivities}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                <div className="w-6 h-6 bg-blue-500 rounded"></div>
              </div>
              <h5 className="font-medium text-gray-800 text-sm">Ongoing Activities</h5>
              <p className="text-gray-500 text-xs mt-1">View your active applications</p>
            </button>
            
            <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                <div className="w-6 h-6 bg-green-500 rounded"></div>
              </div>
              <h5 className="font-medium text-gray-800 text-sm">New Application</h5>
              <p className="text-gray-500 text-xs mt-1">Start a new service request</p>
            </button>
            
            <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                <div className="w-6 h-6 bg-purple-500 rounded"></div>
              </div>
              <h5 className="font-medium text-gray-800 text-sm">Documents</h5>
              <p className="text-gray-500 text-xs mt-1">Manage your documents</p>
            </button>
            
            <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-3">
                <div className="w-6 h-6 bg-yellow-500 rounded"></div>
              </div>
              <h5 className="font-medium text-gray-800 text-sm">Support</h5>
              <p className="text-gray-500 text-xs mt-1">Get help and support</p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">ID Card Renewal</p>
                <p className="text-xs text-gray-500">Application submitted</p>
              </div>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Birth Certificate</p>
                <p className="text-xs text-gray-500">Document approved</p>
              </div>
              <span className="text-xs text-gray-400">1 day ago</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Police Clearance</p>
                <p className="text-xs text-gray-500">Under review</p>
              </div>
              <span className="text-xs text-gray-400">3 days ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          <button className="flex flex-col items-center py-2 text-orange-500">
            <div className="w-6 h-6 bg-orange-500 rounded mb-1"></div>
            <span className="text-xs">Dashboard</span>
          </button>
          
          <button 
            onClick={handleGoToActivities}
            className="flex flex-col items-center py-2 text-gray-400"
          >
            <div className="w-6 h-6 bg-gray-400 rounded mb-1"></div>
            <span className="text-xs">Activities</span>
          </button>
          
          <button className="flex flex-col items-center py-2 text-gray-400">
            <div className="w-6 h-6 bg-gray-400 rounded mb-1"></div>
            <span className="text-xs">Documents</span>
          </button>
          
          <button className="flex flex-col items-center py-2 text-gray-400">
            <div className="w-6 h-6 bg-gray-400 rounded mb-1"></div>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
