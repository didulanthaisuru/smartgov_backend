import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PreviousActivitiesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const [activities, setActivities] = useState([
    {
      id: 1,
      title: 'Permit for timber transport',
      status: 'Completed',
      description: 'Permit Issued successfully',
      completedDate: '2025-07-05',
      rating: 0,
      feedback: ''
    },
    {
      id: 2,
      title: 'Water connection approval',
      status: 'Completed',
      description: 'Water connection approved',
      completedDate: '2025-06-20',
      rating: 0,
      feedback: ''
    }
  ]);

  const handleStarClick = (activityId, star) => {
    setActivities(prev =>
      prev.map(act =>
        act.id === activityId ? { ...act, rating: star } : act
      )
    );
  };

  const handleFeedbackChange = (activityId, value) => {
    setActivities(prev =>
      prev.map(act =>
        act.id === activityId ? { ...act, feedback: value } : act
      )
    );
  };

  const handleSubmitFeedback = (activityId) => {
    const activity = activities.find(act => act.id === activityId);
    console.log(`Feedback for "${activity.title}":`, {
      rating: activity.rating,
      feedback: activity.feedback
    });
    alert('Feedback submitted!');
  };

  const filteredActivities = activities.filter(act =>
    act.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[800px] h-[730px] rounded-full bg-blue-100 opacity-30"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-6 py-6">
        <button 
          onClick={() => navigate('/profile')}
          className="w-9 h-9 flex items-center justify-center"
        >
          <div className="w-9 h-9 bg-gray-300 rounded"></div>
        </button>

        <div className="flex items-center">
          <div className="w-8 h-8 flex items-center justify-center mr-4 bg-white shadow-md rounded-lg">
            <svg className="w-6 h-6 text-black" stroke="currentColor" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12,6 12,12 16,14"/>
            </svg>
          </div>
          
          <div className="flex items-center">
            <div className="w-15 h-20 bg-gray-300 rounded mr-4"></div>
            <h1 className="text-2xl font-medium text-black">Smart Gov</h1>
          </div>
        </div>

        <div className="flex items-center bg-white bg-opacity-20 border border-black rounded-xl px-4 py-2">
          <span className="text-sm font-normal text-black mr-2">English</span>
          <div className="w-6 h-6 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Title and Summary */}
      <div className="relative z-10 px-10 py-6">
        <h2 className="text-4xl font-normal text-black mb-4 text-left">Previous Activities</h2>
        <p className="text-sm text-black mb-6 text-left">View your previous activities here</p>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 bg-white rounded-3xl shadow-[0_4px_250px_rgba(0,0,0,0.25)] mx-9 min-h-[500px] p-6">
        {/* Search Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 mr-4">
            <div className="relative bg-[#F8CB93] rounded-xl px-6 py-3 flex items-center shadow-md">
              <input
                type="text"
                placeholder="Search activities"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent text-sm text-black placeholder-black placeholder-opacity-25 border-none outline-none"
              />
              <svg 
                onClick={() => console.log('Search clicked:', searchTerm)}
                className="w-6 h-6 text-black opacity-50 ml-3 hover:opacity-75 transition-opacity cursor-pointer" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Activities List */}
        <div className="space-y-6">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="bg-[#F8CB93] rounded-xl p-6 shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-normal text-black">{activity.title}</h3>
                <p className="text-sm text-black">{activity.status}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-bold text-black">{activity.description}</p>
              </div>

              {/* Rating */}
              <div className="mb-3 flex items-center space-x-2">
                <span className="text-sm font-bold text-black">Rate our service:</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <svg
                      key={star}
                      onClick={() => handleStarClick(activity.id, star)}
                      className={`w-6 h-6 cursor-pointer ${activity.rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>

              {/* Feedback */}
              <div className="mb-4 relative">
                <textarea
                  value={activity.feedback}
                  onChange={(e) => handleFeedbackChange(activity.id, e.target.value)}
                  placeholder="Leave your feedback here..."
                  className="w-full bg-white rounded-xl py-2 px-4 pr-12 shadow-md resize-none h-12 text-sm text-gray-700 border-none outline-none"
                />
                <button
                  onClick={() => handleSubmitFeedback(activity.id)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-8"></div>
    </div>
  );
};

export default PreviousActivitiesPage;
