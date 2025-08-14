import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const OngoingActivitiesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('date');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const activities = [
    {
      id: 1,
      title: 'Getting Birth Certificate',
      progress: 63,
      status: 'Form CRO1 Received',
      steps: [
        { name: 'GN Submitted Form B23', completed: true, date: null },
        { name: 'Form CRO1 Received', completed: 'current', date: null },
        { name: 'Printing The New Certificate', completed: false, date: null }
      ]
    },
    {
      id: 2,
      title: 'Business Registration',
      progress: 55,
      status: 'Working on document proofing',
      steps: [
        { name: 'Relevent Documents Recived', completed: true, date: null },
        { name: 'Working on document proofing', completed: 'current', date: null },
        { name: 'Sent for the final signature', completed: false, date: null }
      ]
    },
    {
      id: 3,
      title: 'NIC Application',
      progress: 48,
      status: 'Send Documents to district secratrait office',
      steps: [
        { name: 'DS verified the doccuments ', completed: true, date: null },
        { name: 'Send Documents to district secratrait office', completed: 'current', date: null },
        { name: 'Send to the Department of Registration', completed: false, date: null }
      ]
    }
  ];

  const filteredActivities = activities.filter(activity =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedActivity(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Sidebar */}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      
      {/* Background Decorative Elements with Enhanced Blur */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-blue-100 opacity-30 backdrop-blur-[15px]"></div>
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[600px] rounded-full bg-blue-100 opacity-30 backdrop-blur-[15px]"></div>
        <div className="absolute top-80 -left-36 w-[600px] h-[750px] rounded-full bg-blue-100 opacity-30 backdrop-blur-[15px]"></div>
      </div>

      {/* Header */}
      <div className="relative z-10">
        <Header 
          title="Ongoing Activities" 
          setShowSidebar={setShowSidebar} 
        />
      </div>

      {/* Title */}
      <div className="relative z-10 px-10 py-6">
        <h2 className="text-4xl font-normal text-black mb-2 text-left">Ongoing Activities</h2>
        
        {/* Progress Bar */}
        <div className="mb-8 flex items-center space-x-4">
          <div className="w-52 bg-white border border-black h-3">
            <div className="bg-[#8C322A] h-3" style={{ width: '63%' }}></div>
          </div>
          <span className="text-sm text-black">63%</span>
        </div>
      </div>

      {/* Main Content Area with Enhanced Blur */}
      <div className="relative z-10 bg-white rounded-3xl shadow-[0_4px_15px_rgba(0,0,0,0.25)] backdrop-blur-[15px] mx-8 min-h-[500px] p-6">
        {/* Search and Filter Bar with Enhanced Styling */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 mr-4">
            <div className="relative bg-[rgba(242,151,39,0.5)] rounded-[14.5px] px-6 py-3 flex items-center shadow-[0_4px_15px_rgba(0,0,0,0.25)] backdrop-blur-[15px]">
              <input
                type="text"
                placeholder="Search Activities"
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
          
          <button className="bg-[rgba(242,151,39,0.5)] rounded-xl px-4 py-3 shadow-[0_4px_15px_rgba(0,0,0,0.25)] backdrop-blur-[15px] flex items-center hover:bg-[rgba(242,151,39,0.7)] transition-colors">
            <span className="text-sm text-black opacity-75 mr-2">Order By</span>
            <div className="w-4 h-4 flex items-center justify-center opacity-75">
              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </div>
          </button>
        </div>

        {/* Enhanced Activities List */}
        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <div 
              key={activity.id} 
              className="bg-[rgba(242,151,39,0.5)] rounded-xl p-6 shadow-[0_4px_15px_rgba(0,0,0,0.25)] backdrop-blur-[15px] cursor-pointer hover:bg-[rgba(242,151,39,0.6)] transition-colors"
              onClick={() => openModal(activity)}
            >
              <div className="flex items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-6">
                    <h3 className="text-sm font-normal text-black">{activity.title}</h3>
                    <p className="text-xs text-black">{activity.progress}% Completed</p>
                  </div>
                </div>
              </div>

              {/* Enhanced Progress Steps with Timeline */}
              <div className="relative">
                <div className="space-y-2">
                  {activity.steps.map((step, index) => (
                    <div key={index}>
                      <p className={`text-sm text-left ${
                        step.completed === 'current' ? 'font-bold text-black' : 
                        step.completed === true ? 'text-black opacity-50' : 
                        'text-black opacity-50'
                      }`}>
                        {step.name}
                      </p>
                      {step.date && (
                        <p className={`text-xs mt-1 text-left ${
                          step.date.includes('completed') ? 'text-black opacity-50 font-normal' :
                          'text-black opacity-50 font-bold'
                        }`}>
                          {step.date}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Icons */}
              <div className="flex justify-end space-x-3 mt-4">
                {/* Eye Icon */}
                <button className="bg-transparent border-none p-0 hover:opacity-70 transition-opacity">
                  <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                </button>
                
                {/* More Information Icon */}
                <button className="bg-transparent border-none p-0 hover:opacity-70 transition-opacity">
                  <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Padding */}
      <div className="h-8"></div>

      {/* Modal for Activity Details */}
      {isModalOpen && selectedActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#F8CB93] rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl backdrop-blur-[15px]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-black border-opacity-20">
              <h2 className="text-xl font-semibold text-black">{selectedActivity.title}</h2>
              <button 
                onClick={closeModal}
                className="w-14 h-14 flex items-center justify-center rounded-full hover:bg-black hover:bg-opacity-10 transition-colors"
              >
                <svg className="w-12 h-12 text-[#8C322A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Progress Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-black">Progress</span>
                  <span className="text-sm font-bold text-black">{selectedActivity.progress}% Completed</span>
                </div>
                <div className="w-full bg-black bg-opacity-20 rounded-full h-3">
                  <div 
                    className="bg-[#8C322A] h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${selectedActivity.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Current Status */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-black mb-2">Current Status</h3>
                <p className="text-sm font-bold text-black bg-black bg-opacity-10 px-3 py-2 rounded-lg">
                  {selectedActivity.status}
                </p>
              </div>

              {/* Steps Timeline */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-black mb-4">Process Steps</h3>
                <div className="space-y-4">
                  {selectedActivity.steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      {/* Step Indicator */}
                      <div className={`w-4 h-4 rounded-full mt-0.5 flex-shrink-0 ${
                        step.completed === true ? 'bg-green-500' :
                        step.completed === 'current' ? 'bg-yellow-500' :
                        'bg-gray-300'
                      }`}>
                        {step.completed === true && (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      
                      {/* Step Content */}
                      <div className="flex-1">
                        <p className={`text-sm ${
                          step.completed === 'current' ? 'font-bold text-black' : 
                          step.completed === true ? 'text-black opacity-70' : 
                          'text-black opacity-50'
                        }`}>
                          {step.name}
                        </p>
                        {step.date && (
                          <p className="text-xs text-black opacity-60 mt-1">{step.date}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OngoingActivitiesPage;
