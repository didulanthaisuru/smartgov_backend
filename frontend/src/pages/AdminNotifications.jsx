import React, { useState } from 'react';
import { ArrowLeft, Search, ChevronDown } from 'lucide-react';

const NotificationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Easy to edit notifications data
  const notifications = [
    {
      id: 1,
      type: 'appointment',
      title: 'New Appointment added.',
      date: '2025.07.11',
      isNew: true
    },
    {
      id: 2,
      type: 'change',
      title: 'Appointment Changed',
      date: '2025.07.10',
      isNew: true
    },
    {
      id: 3,
      type: 'completion',
      title: 'Certificate Completed',
      date: '2025.07.09',
      isNew: false
    },
    {
      id: 4,
      type: 'approval',
      title: 'Document Approved',
      date: '2025.07.08',
      isNew: false
    }
  ];

  const filterOptions = ['All', 'New', 'Appointments', 'Changes', 'Completed'];

  const handleBackClick = () => {
    alert('Navigating back to dashboard...');
    // Add your navigation logic here
    // Example: window.location.href = '/dashboard';
  };

  const handleNotificationClick = (notification) => {
    alert(`Opening notification: ${notification.title}`);
    // Add your notification click logic here
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'All' || 
      (filterType === 'New' && notification.isNew) ||
      (filterType === 'Appointments' && notification.type === 'appointment') ||
      (filterType === 'Changes' && notification.type === 'change') ||
      (filterType === 'Completed' && notification.type === 'completion');
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="w-full mx-auto" style={{ maxWidth: '430px' }}>
        
        {/* Header */}
        <header className="bg-white px-4 py-4 shadow-sm">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Birth Certificate Admin</h1>
          </div>
        </header>

        {/* Search and Filter Section */}
        <div className="p-4 bg-white border-b border-gray-100">
          <div className="flex space-x-3 mb-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search Notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-orange-100 rounded-full px-4 py-2 pr-10 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-600" />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="bg-orange-200 rounded-full px-4 py-2 text-gray-800 font-medium hover:bg-orange-300 transition-colors duration-200 flex items-center space-x-1"
              >
                <span>{filterType}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showFilterDropdown && (
                <div className="absolute top-full mt-1 right-0 bg-white rounded-lg shadow-lg border z-10 min-w-32">
                  {filterOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setFilterType(option);
                        setShowFilterDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-orange-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="p-4 space-y-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className="w-full bg-orange-100 rounded-lg p-4 text-left hover:bg-orange-150 transition-colors duration-200 border border-orange-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">
                      {notification.title}
                      {notification.isNew && (
                        <span className="ml-2 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                      )}
                    </p>
                  </div>
                  <span className="text-sm text-gray-600 ml-4">
                    {notification.date}
                  </span>
                </div>
              </button>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No notifications found</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default NotificationsPage;