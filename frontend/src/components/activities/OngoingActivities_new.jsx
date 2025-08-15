import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OngoingActivities = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('English');
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const activities = [
    {
      id: 1,
      title: 'ID Card Renewal',
      description: 'National Identity Card renewal application',
      status: 'In Progress',
      progress: 60,
      date: '2024-01-15',
      department: 'Department of Registration',
      statusColor: 'orange'
    },
    {
      id: 2,
      title: 'Birth Certificate',
      description: 'Birth certificate issuance request',
      status: 'Approved',
      progress: 100,
      date: '2024-01-10',
      department: 'Registrar General\'s Department',
      statusColor: 'green'
    },
    {
      id: 3,
      title: 'Police Clearance',
      description: 'Police clearance certificate application',
      status: 'Under Review',
      progress: 30,
      date: '2024-01-12',
      department: 'Sri Lanka Police',
      statusColor: 'blue'
    },
    {
      id: 4,
      title: 'Passport Application',
      description: 'New passport application submission',
      status: 'Document Required',
      progress: 20,
      date: '2024-01-18',
      department: 'Department of Immigration',
      statusColor: 'red'
    }
  ];

  const filters = ['All', 'In Progress', 'Approved', 'Under Review', 'Document Required'];

  const filteredActivities = selectedFilter === 'All' 
    ? activities 
    : activities.filter(activity => activity.status === selectedFilter);

  const getStatusBadgeClass = (statusColor) => {
    const baseClass = "px-3 py-1 rounded-full text-xs font-medium";
    switch (statusColor) {
      case 'green':
        return `${baseClass} bg-green-100 text-green-600`;
      case 'orange':
        return `${baseClass} bg-orange-100 text-orange-600`;
      case 'blue':
        return `${baseClass} bg-blue-100 text-blue-600`;
      case 'red':
        return `${baseClass} bg-red-100 text-red-600`;
      default:
        return `${baseClass} bg-gray-100 text-gray-600`;
    }
  };

  const getProgressBarClass = (statusColor) => {
    switch (statusColor) {
      case 'green':
        return 'bg-green-500';
      case 'orange':
        return 'bg-orange-500';
      case 'blue':
        return 'bg-blue-500';
      case 'red':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              <div className="w-4 h-4 bg-gray-600 rounded transform rotate-45"></div>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded"></div>
              <span className="text-xl font-bold text-gray-800">Smart Gov</span>
            </div>
          </div>
          
          {/* Language Selector */}
          <div className="flex items-center space-x-1 bg-gray-100 border border-gray-300 rounded-xl px-3 py-1">
            <span className="text-sm text-gray-700">{language}</span>
            <div className="w-4 h-3 bg-gray-400 rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Page Title */}
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Ongoing Activities</h1>
        <p className="text-gray-600 text-sm">Track your government service applications</p>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 mb-6">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedFilter === filter
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Activities List */}
      <div className="px-4 space-y-4">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            {/* Activity Header */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-lg">{activity.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                <p className="text-gray-500 text-xs mt-1">{activity.department}</p>
              </div>
              <span className={getStatusBadgeClass(activity.statusColor)}>
                {activity.status}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-medium text-gray-800">{activity.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getProgressBarClass(activity.statusColor)}`}
                  style={{ width: `${activity.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Activity Footer */}
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Applied: {activity.date}</span>
              <button className="text-orange-500 text-sm font-medium hover:text-orange-600">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Card */}
      <div className="px-4 mt-6">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white">
          <h3 className="font-bold text-lg mb-2">Activity Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{activities.length}</div>
              <div className="text-orange-100 text-sm">Total Applications</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {activities.filter(a => a.status === 'Approved').length}
              </div>
              <div className="text-orange-100 text-sm">Completed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex flex-col items-center py-2 text-gray-400"
          >
            <div className="w-6 h-6 bg-gray-400 rounded mb-1"></div>
            <span className="text-xs">Dashboard</span>
          </button>
          
          <button className="flex flex-col items-center py-2 text-orange-500">
            <div className="w-6 h-6 bg-orange-500 rounded mb-1"></div>
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

export default OngoingActivities;
