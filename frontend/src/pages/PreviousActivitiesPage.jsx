import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PreviousActivitiesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const previousActivities = [
    {
      id: 1,
      title: 'Permit for timber transport',
      status: 'Completed',
      description: 'Permit Issued successfully',
      completedDate: '2025-07-05',
      rating: 0
    }
  ];

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
          {/* History Icon */}
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
        <h2 className="text-4xl font-normal text-black mb-4">Previous Activities</h2>
        <p className="text-sm text-black mb-6">View your previous activities here</p>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 bg-white rounded-t-3xl shadow-[0_4px_250px_rgba(0,0,0,0.25)] mx-9 min-h-[500px] p-6">
        {/* Search and Filter Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 mr-4">
            <div className="relative bg-[#F8CB93] rounded-xl px-6 py-3 flex items-center shadow-md">
              <span className="text-sm text-black opacity-25 mr-3">Search activities</span>
              <svg className="w-4 h-4 text-black opacity-25" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </div>
          </div>
          
          <div className="bg-[#F8CB93] rounded-xl px-4 py-3 shadow-md flex items-center">
            <span className="text-sm text-black opacity-25 mr-2">Order By</span>
            <svg className="w-6 h-6 text-black opacity-25" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.76 9.34L12 13.63l4.24-4.29L17.66 10.9 12 16.61 6.34 10.9z"/>
            </svg>
          </div>
        </div>

        {/* Previous Activities List */}
        <div className="space-y-6">
          {previousActivities.map((activity) => (
            <div key={activity.id} className="bg-[#F8CB93] rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-sm font-normal text-black mb-1">{activity.title}</h3>
                  <p className="text-sm text-black">{activity.status}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm font-bold text-black">
                  {activity.description}
                </p>
              </div>

              {/* Rating Section */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-black">Rate our service -</span>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-6 h-6 text-yellow-400 cursor-pointer"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={() => setShowFeedback(true)}
                  className="w-full bg-white rounded-xl py-3 px-4 shadow-md"
                >
                  <span className="text-sm text-gray-500">Feedback</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-4">
            <button 
              onClick={() => navigate('/chatbot')}
              className="bg-blue-100 rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-blue-200 transition-colors"
            >
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-sm text-blue-600">Need Help?</span>
            </button>
            
            <button 
              onClick={() => navigate('/contact-us')}
              className="bg-green-100 rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-green-200 transition-colors"
            >
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26c.31.17.69.17 1-.01L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-green-600">Contact Us</span>
            </button>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 m-6 max-w-sm w-full">
            <h3 className="text-lg font-medium text-black mb-4">Leave Feedback</h3>
            <textarea 
              className="w-full h-24 p-3 border border-gray-300 rounded-lg text-sm"
              placeholder="Please share your experience..."
            />
            <div className="flex space-x-3 mt-4">
              <button 
                onClick={() => setShowFeedback(false)}
                className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowFeedback(false)}
                className="flex-1 py-2 px-4 bg-[#8C322A] text-white rounded-lg text-sm"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Padding */}
      <div className="h-8"></div>
    </div>
  );
};

export default PreviousActivitiesPage;
