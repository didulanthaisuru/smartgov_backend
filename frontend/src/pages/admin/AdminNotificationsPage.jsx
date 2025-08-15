import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';

const AdminNotificationsPage = () => {
  const { user } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('recent');

  const notifications = [
    {
      id: 1,
      title: 'New Appointment added.',
      date: '2025-07-11',
      isRead: false
    },
    {
      id: 2,
      title: 'Appointment Changed',
      date: '2025-07-10',
      isRead: false
    }
  ];

  const filteredNotifications = notifications.filter(notification =>
    notification.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white relative">
      {/* Admin Sidebar */}
      <AdminSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      
      {/* Header */}
      <AdminHeader 
        title={`${user?.service_id || 'Birth Certificate'} Notifications`}
        setShowSidebar={setShowSidebar}
      />

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Search and Filter Controls */}
        <div className="flex space-x-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <div className="bg-orange-200 rounded-2xl shadow-lg h-12 flex items-center px-4">
              <Search className="w-5 h-5 text-black mr-3" />
              <input
                type="text"
                placeholder="Search Notifications"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-sm text-black placeholder-black placeholder-opacity-25 flex-1 outline-none"
              />
            </div>
          </div>

          {/* Order By Dropdown */}
          <div className="relative">
            <div className="bg-orange-200 rounded-xl shadow-lg h-12 flex items-center px-4">
              <select
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
                className="bg-transparent text-sm text-black placeholder-opacity-25 outline-none appearance-none pr-8"
              >
                <option value="recent">Order By</option>
                <option value="date">Date</option>
                <option value="title">Title</option>
              </select>
              <ChevronDown className="w-4 h-4 text-black ml-2" />
            </div>
          </div>
        </div>

        {/* Notifications Container */}
        <div className="bg-white shadow-2xl rounded-xl p-6">
          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div key={notification.id} className="bg-orange-200 rounded-xl p-4 shadow-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-normal text-black flex-1">
                      {notification.title}
                    </h3>
                    <span className="text-xs text-black opacity-50 ml-4">
                      {notification.date}
                    </span>
                  </div>
                  
                  {/* Additional notification content if needed */}
                  <div className="text-sm text-black">
                    {/* This area can be used for notification description */}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No notifications found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotificationsPage;
