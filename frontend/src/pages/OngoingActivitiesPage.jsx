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
      status: 'Form CR01 Received',
      steps: [
        { name: 'Form CR01 Received', completed: true, date: 'completed on 2025-08-05' },
        { name: 'GN submitted Form B23', completed: false, date: null },
        { name: 'Printing the new certificate', completed: false, date: 'Estimated to complete on 2025-08-09' }
      ]
    },
    {
      id: 2,
      title: 'Business Registration',
      progress: 55,
      status: 'Working on document proofing',
      steps: [
        { name: 'Working on document proofing', completed: true, date: null },
        { name: 'Relevant Documents Received', completed: false, date: null },
        { name: 'Sent for the final signature', completed: false, date: null }
      ]
    },
    {
      id: 3,
      title: 'NIC Application',
      progress: 48,
      status: 'Send Documents to district secretariat office',
      steps: [
        { name: 'Send Documents to district secretariat office', completed: true, date: null },
        { name: 'DS verified the documents', completed: false, date: null },
        { name: 'Send to the Department of registration', completed: false, date: null }
      ]
    }
  ];

  const filteredActivities = activities.filter(activity =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-blue-100 opacity-30"></div>
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[600px] rounded-full bg-blue-100 opacity-30"></div>
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
          <div className="w-11 h-11 bg-black rounded-xl flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
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

      {/* Main Content Area */}
      <div className="relative z-10 bg-white rounded-t-3xl shadow-lg mx-8 min-h-[500px] p-6">
        {/* Search and Filter Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 mr-4">
            <div className="relative bg-orange-200 rounded-xl px-4 py-3 flex items-center">
              <span className="text-sm text-black opacity-25 mr-3">Search Activities</span>
              <svg className="w-4 h-4 text-black opacity-25" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </div>
          </div>
          
          <div className="bg-[#F8CB93] rounded-xl px-4 py-3 shadow-md flex items-center">
            <span className="text-sm text-black opacity-25 mr-2">Order By</span>
            <svg className="w-4 h-4 text-black opacity-25" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </div>
        </div>

        {/* Activities List */}
        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="bg-[#F8CB93] rounded-xl p-6 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-sm font-normal text-black mb-1">{activity.title}</h3>
                  <p className="text-sm text-black">{activity.progress}% Completed</p>
                </div>
                <button className="w-6 h-6 flex items-center justify-center">
                  <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </button>
              </div>

              {/* Progress Steps */}
              <div className="space-y-3">
                {activity.steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${step.completed ? 'bg-[#8C322A]' : 'bg-gray-300'}`}></div>
                    <div className="flex-1">
                      <p className={`text-sm ${step.completed ? 'font-bold text-black' : 'text-black opacity-50'}`}>
                        {step.name}
                      </p>
                      {step.date && (
                        <p className="text-xs text-black opacity-50">{step.date}</p>
                      )}
                    </div>
                  </div>
                ))}
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
