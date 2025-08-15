import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import HelpSection from '../components/HelpSection';

const PreviousActivitiesPage = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [language, setLanguage] = useState('English');
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
      {/* Header Component */}
      <Header 
        title="Previous Activities" 
        setShowSidebar={setShowSidebar}
        showLanguageSelector={true}
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* Sidebar Component */}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[800px] h-[730px] rounded-full bg-blue-100 opacity-30"></div>
      </div>

      {/* Title and Summary */}
      <div className="relative z-10 px-10 py-6">
        <h2 className="text-4xl font-normal text-black mb-4 text-left">Previous Activities</h2>
        <p className="text-sm text-black mb-6 text-left">View your previous activities here</p>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 bg-white rounded-3xl shadow-[0_4px_250px_rgba(0,0,0,0.25)] mx-9 min-h-[500px] p-6">
        {/* Search and Filter Bar */}
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
          
          <button className="bg-[#F8CB93] rounded-xl px-4 py-3 shadow-md flex items-center hover:bg-[rgba(248,203,147,0.8)] transition-colors">
            <span className="text-sm text-black opacity-75 mr-2">Order By</span>
            <div className="w-4 h-4 flex items-center justify-center opacity-75">
              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </div>
          </button>
        </div>

        {/* Previous Activities List */}
        <div className="space-y-6">
          {previousActivities.map((activity) => (
            <div key={activity.id} className="bg-[#F8CB93] rounded-xl p-6 shadow-md">
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-normal text-black">{activity.title}</h3>
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
                        className="w-6 h-6 text-yellow-500 cursor-pointer"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <textarea 
                    placeholder="Leave your feedback here..."
                    className="w-full bg-white rounded-xl py-2 px-4 pr-12 shadow-md resize-none h-12 text-sm text-gray-700 border-none outline-none"
                  />
                  <button 
                    onClick={() => setShowFeedback(true)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <HelpSection />
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
