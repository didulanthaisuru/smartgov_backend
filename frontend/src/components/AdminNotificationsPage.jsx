import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminNotificationsPage = () => {
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
    <div className="flex min-h-screen bg-white">
      <AdminSidebar />
      
      <div className="flex-1 ml-64">
        <AdminHeader />
        
        <div className="p-6">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-normal text-black mb-8">
                Birth Certificate Admin
              </h1>
            </div>

            {/* Profile Image */}
            <div className="flex justify-end mb-8">
              <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
            </div>

            {/* Notifications Container */}
            <div className="bg-white shadow-2xl rounded-xl p-6">
              {/* Search and Filter Controls */}
              <div className="flex space-x-4 mb-6">
                {/* Search Bar */}
                <div className="flex-1 relative">
                  <div className="bg-orange-200 rounded-2xl shadow-lg h-8 flex items-center px-4">
                    <Search className="w-4 h-4 text-black mr-2" />
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
                  <div className="bg-orange-200 rounded-xl shadow-lg h-8 flex items-center px-3">
                    <select
                      value={orderBy}
                      onChange={(e) => setOrderBy(e.target.value)}
                      className="bg-transparent text-sm text-black placeholder-opacity-25 outline-none appearance-none pr-4"
                    >
                      <option value="recent">Order By</option>
                      <option value="date">Date</option>
                      <option value="title">Title</option>
                    </select>
                    <ChevronDown className="w-3 h-3 text-black ml-1" />
                  </div>
                </div>
              </div>

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

              {/* Empty state for additional notifications */}
              <div className="mt-6 text-center">
                <div className="text-sm text-black">
                  {/* Space for additional content */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotificationsPage;
