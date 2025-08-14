import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OngoingActivitiesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('date');

  const activities = [
    {
      id: 1,
      title: 'Getting Birth Certificate',
      progress: 63,
      status: 'Information Verifying Stage',
      steps: [
        { name: 'Information Retrieval Stage', completed: true, date: null },
        { name: 'Information Verifying Stage', completed: 'current', date: null },
        { name: 'Printing the new certificate', completed: false, date: null }
      ]
    },
    {
      id: 2,
      title: 'Vehicle License Update',
      progress: 55,
      status: 'Issuing the new license',
      steps: [
        { name: 'Tax Calculation Stage', completed: true, date: null },
        { name: 'Issuing the new license', completed: 'current', date: null },
        { name: 'Sent for the final signature', completed: false, date: null }
      ]
    },
    {
      id: 3,
      title: 'Permit for falling trees',
      progress: 48,
      status: 'Permit have been processed',
      steps: [
        { name: 'Grama Niladari approval received', completed: true, date: null },
        { name: 'Permit have been processed', completed: 'current', date: null },
        { name: 'Sent for the final signature', completed: false, date: null }
      ]
    },
    {
      id: 4,
      title: 'Business Registration',
      progress: 55,
      status: 'Working on document proofing',
      steps: [
        { name: 'Relevant Documents Received', completed: true, date: 'completed on 2025-08-07' },
        { name: 'Working on document proofing', completed: 'current', date: null },
        { name: 'Sent for the final signature', completed: false, date: 'Estimated to complete on 2025-08-08' }
      ]
    }
  ];

  const filteredActivities = activities.filter(activity =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Decorative Elements with Enhanced Blur */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-blue-100 opacity-30 backdrop-blur-[15px]"></div>
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[600px] rounded-full bg-blue-100 opacity-30 backdrop-blur-[15px]"></div>
        <div className="absolute top-80 -left-36 w-[600px] h-[750px] rounded-full bg-blue-100 opacity-30 backdrop-blur-[15px]"></div>
      </div>

      {/* Header with Enhanced Styling */}
      <div className="relative z-10 flex items-center justify-between px-6 py-6">
        <button 
          onClick={() => navigate('/profile')}
          className="w-9 h-9 flex items-center justify-center"
        >
          <div className="w-9 h-9 bg-gray-300 rounded"></div>
        </button>

        <div className="flex items-center">
          {/* Settings Icon */}
          <div className="w-6 h-6 flex items-center justify-center mr-4 shadow-md">
            <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
            </svg>
          </div>
          
          <div className="flex items-center">
            <div className="w-15 h-20 bg-gray-300 rounded mr-4 shadow-md"></div>
            <h1 className="text-2xl font-medium text-black">Smart Gov</h1>
          </div>
        </div>

        <div className="flex items-center bg-white bg-opacity-20 border border-black rounded-xl px-4 py-2 shadow-md">
          <span className="text-sm font-normal text-black mr-2 drop-shadow-md">English</span>
          <div className="w-6 h-6 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Title */}
      <div className="relative z-10 px-10 py-6">
        <h2 className="text-4xl font-normal text-black mb-2">Ongoing Activities</h2>
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-black">Overall Progress</span>
            <span className="text-xs text-black">63%</span>
          </div>
          <div className="w-52 bg-white border border-black rounded-full h-3">
            <div className="bg-[#8C322A] h-3 rounded-full" style={{ width: '63%' }}></div>
          </div>
        </div>
      </div>

      {/* Main Content Area with Enhanced Blur */}
      <div className="relative z-10 bg-white rounded-t-3xl shadow-[0_4px_15px_rgba(0,0,0,0.25)] backdrop-blur-[15px] mx-8 min-h-[500px] p-6">
        {/* Search and Filter Bar with Enhanced Styling */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 mr-4">
            <div className="relative bg-[rgba(242,151,39,0.5)] rounded-[14.5px] px-6 py-3 flex items-center shadow-[0_4px_15px_rgba(0,0,0,0.25)] backdrop-blur-[15px]">
              <span className="text-sm text-black opacity-25 mr-3">Search Activities</span>
              <div className="w-4 h-4 flex items-center justify-center opacity-25">
                <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-[rgba(242,151,39,0.5)] rounded-xl px-4 py-3 shadow-[0_4px_15px_rgba(0,0,0,0.25)] backdrop-blur-[15px] flex items-center">
            <span className="text-sm text-black opacity-25 mr-2">Order By</span>
            <div className="w-6 h-6 flex items-center justify-center opacity-25">
              <svg className="w-2 h-1.5 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.76 9.34L12 13.63l4.24-4.29z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Enhanced Activities List */}
        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="bg-[rgba(242,151,39,0.5)] rounded-xl p-6 shadow-[0_4px_15px_rgba(0,0,0,0.25)] backdrop-blur-[15px]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-sm font-normal text-black mb-1">{activity.title}</h3>
                  <p className="text-sm text-black">{activity.progress}% Completed</p>
                </div>
                <button className="w-6 h-6 flex items-center justify-center opacity-80">
                  <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                  </svg>
                </button>
              </div>

              {/* Enhanced Progress Steps with Timeline */}
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1 top-4 bottom-4 w-0 border-l border-[#8C322A]"></div>
                
                <div className="space-y-3">
                  {activity.steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3 relative">
                      {/* Timeline Dot */}
                      <div className={`w-2 h-2 rounded-full mt-2 z-10 ${
                        step.completed === true ? 'bg-[#8C322A]' : 
                        step.completed === 'current' ? 'bg-[#8C322A] ring-2 ring-[#8C322A] ring-opacity-50' : 
                        'bg-gray-300'
                      }`}></div>
                      
                      <div className="flex-1">
                        <p className={`text-sm ${
                          step.completed === 'current' ? 'font-bold text-black' : 
                          step.completed === true ? 'text-black opacity-50' : 
                          'text-black opacity-50'
                        }`}>
                          {step.name}
                        </p>
                        {step.date && (
                          <p className={`text-xs mt-1 ${
                            step.date.includes('completed') ? 'text-black opacity-50 font-normal' :
                            'text-black opacity-50 font-bold'
                          }`}>
                            {step.date}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
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

      {/* Bottom Padding */}
      <div className="h-8"></div>
    </div>
  );
};

export default OngoingActivitiesPage;
