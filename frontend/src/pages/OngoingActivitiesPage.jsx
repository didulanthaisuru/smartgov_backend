import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentService from '../services/appointmentService';
import AuthService from '../services/authService';

const OngoingActivitiesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('date');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activities, setActivities] = useState([]);
  const [overallProgress, setOverallProgress] = useState(0);

  // Fetch ongoing activities on component mount
  useEffect(() => {
    const fetchOngoingActivities = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get user ID from auth service
        const authData = AuthService.getAuthData();
        if (!authData?.userData?.id) {
          throw new Error('User ID not found. Please login again.');
        }

        const userId = authData.userData.id;
        console.log('Fetching ongoing activities for user:', userId);

        // Fetch ongoing appointments
        const result = await AppointmentService.getOngoingAppointments(userId);
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to fetch ongoing activities');
        }

        // Transform the data to match the UI structure
        const transformedActivities = result.data.map((appointment, index) => ({
          id: appointment.appointment_id,
          title: appointment.service_name,
          progress: appointment.is_fully_completed ? 100 : 50, // Simple progress calculation
          status: appointment.is_fully_completed ? 'Completed' : 'In Progress',
          appointment_date: appointment.appointment_date,
          is_fully_completed: appointment.is_fully_completed,
          // Add steps based on appointment data (you can enhance this)
          steps: [
            { 
              name: 'Application Submitted', 
              completed: true, 
              date: appointment.appointment_date ? 'Completed' : null 
            },
            { 
              name: 'Processing', 
              completed: appointment.is_fully_completed ? true : 'current', 
              date: null 
            },
            { 
              name: 'Final Review', 
              completed: appointment.is_fully_completed, 
              date: null 
            }
          ]
        }));

        setActivities(transformedActivities);

        // Calculate overall progress
        const totalProgress = transformedActivities.length > 0 ? 
          transformedActivities.reduce((sum, activity) => sum + activity.progress, 0) / transformedActivities.length : 0;
        setOverallProgress(Math.round(totalProgress));

      } catch (err) {
        console.error('Error fetching ongoing activities:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOngoingActivities();
  }, []);

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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8C3C2A] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ongoing activities...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Activities</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-[#8C3C2A] text-white px-4 py-2 rounded-lg hover:bg-[#7A3424] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
        <h2 className="text-4xl font-normal text-black mb-2 text-left">Ongoing Activities</h2>
        
        {/* Progress Bar */}
        <div className="mb-8 flex items-center space-x-4">
          <div className="w-52 bg-white border border-black h-3">
            <div className="bg-[#8C322A] h-3" style={{ width: `${overallProgress}%` }}></div>
          </div>
          <span className="text-sm text-black">{overallProgress}%</span>
        </div>
      </div>

      {/* Main Content Area with Enhanced Blur */}
      <div className="relative z-10 bg-white rounded-t-3xl shadow-[0_4px_15px_rgba(0,0,0,0.25)] backdrop-blur-[15px] mx-8 min-h-[500px] p-6">
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
          {filteredActivities.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Ongoing Activities</h3>
              <p className="text-gray-500">You don't have any ongoing activities at the moment.</p>
            </div>
          ) : (
            filteredActivities.map((activity) => (
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
            ))
          )}
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