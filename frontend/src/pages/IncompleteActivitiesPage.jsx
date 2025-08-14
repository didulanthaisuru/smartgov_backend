import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IncompleteActivitiesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const incompleteActivities = [
    {
      id: 1,
      title: 'Business Registration',
      pendingDocuments: [
        { name: 'Grama niladari certificate', status: 'Pending Upload' },
        { name: 'Address proof', status: 'Pending Upload' },
        { name: 'Consent letter', status: 'Verified' }
      ],
      uploadedCount: 1,
      totalCount: 3
    }
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Decorative Elements with Blur */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-blue-100 opacity-30 backdrop-blur-lg"></div>
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[600px] rounded-full bg-blue-100 opacity-30 backdrop-blur-lg"></div>
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
          {/* Incomplete Icon */}
          <div className="w-6 h-6 flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeDasharray="5,5" strokeWidth="2"/>
              <circle cx="12" cy="12" r="3" fill="currentColor"/>
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

      {/* Title and Progress */}
      <div className="relative z-10 px-10 py-6">
        <h2 className="text-4xl font-normal text-black mb-4 text-left">Incomplete Activities</h2>
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-2">
            <div className="w-52 bg-white border border-black h-3">
              <div className="bg-[#8C322A] h-3" style={{ width: '33%' }}></div>
            </div>
            <span className="text-sm text-black">1 of 3 Uploaded</span>
          </div>
          <p className="text-sm text-black text-left">2 Documents are required for completion</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 bg-white rounded-t-3xl rounded-b-3xl shadow-[0_4px_250px_rgba(0,0,0,0.25)] mx-9 min-h-[500px] p-6">
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

        {/* Incomplete Activities List */}
        <div className="space-y-6">
          {incompleteActivities.map((activity) => (
            <div key={activity.id} className="bg-[#F8CB93] rounded-xl p-6 shadow-md">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-black mb-1 leading-tight text-left">
                    Business <br />Registration
                  </h3>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-black">Pending Documents</p>
                </div>
              </div>

              {/* Document List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pl-4">
                  <span className="text-sm text-black text-left">Grama niladari certificate</span>
                  <span className="text-sm text-black">Verified</span>
                </div>
                <div className="flex items-center justify-between pl-4">
                  <span className="text-sm text-black text-left">Address proof</span>
                  <span className="text-sm text-black">Pending Upload</span>
                </div>
                <div className="flex items-center justify-between pl-4">
                  <span className="text-sm text-black text-left">Consent letter</span>
                  <span className="text-sm text-black">Pending Upload</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Padding */}
      <div className="h-8"></div>
    </div>
  );
};

export default IncompleteActivitiesPage;
