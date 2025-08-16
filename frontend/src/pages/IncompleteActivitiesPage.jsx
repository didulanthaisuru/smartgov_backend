import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentService from '../services/appointmentService';
import AuthService from '../services/authService';

const IncompleteActivitiesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [incompleteActivities, setIncompleteActivities] = useState([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [uploadedDocuments, setUploadedDocuments] = useState(0);

  // Fetch incomplete activities on component mount
  useEffect(() => {
    const fetchIncompleteActivities = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get user ID from auth service
        const authData = AuthService.getAuthData();
        if (!authData?.userData?.id) {
          throw new Error('User ID not found. Please login again.');
        }

        const userId = authData.userData.id;
        console.log('Fetching incomplete activities for user:', userId);

        // Fetch incomplete appointments
        const result = await AppointmentService.getIncompleteAppointments(userId);
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to fetch incomplete activities');
        }

        // Transform the data to match the UI structure
        const transformedActivities = result.data.map((appointment) => {
          // Generate mock documents based on appointment data
          // In a real scenario, you would fetch actual document data from the backend
          const mockDocuments = [
            { 
              name: 'Application Form', 
              status: appointment.appointment_date ? 'Verified' : 'Pending Upload' 
            },
            { 
              name: 'Identity Proof', 
              status: appointment.is_fully_completed ? 'Verified' : 'Pending Upload' 
            },
            { 
              name: 'Address Proof', 
              status: 'Pending Upload' 
            },
            { 
              name: 'Supporting Documents', 
              status: 'Pending Upload' 
            }
          ];

          const uploadedCount = mockDocuments.filter(doc => doc.status === 'Verified').length;
          const totalCount = mockDocuments.length;

          return {
            id: appointment.appointment_id,
            title: appointment.service_name,
            pendingDocuments: mockDocuments,
            uploadedCount,
            totalCount,
            appointment_date: appointment.appointment_date,
            is_fully_completed: appointment.is_fully_completed
          };
        });

        setIncompleteActivities(transformedActivities);

        // Calculate overall statistics
        const totalDocs = transformedActivities.reduce((sum, activity) => sum + activity.totalCount, 0);
        const uploadedDocs = transformedActivities.reduce((sum, activity) => sum + activity.uploadedCount, 0);
        const progress = totalDocs > 0 ? Math.round((uploadedDocs / totalDocs) * 100) : 0;

        setTotalDocuments(totalDocs);
        setUploadedDocuments(uploadedDocs);
        setOverallProgress(progress);

      } catch (err) {
        console.error('Error fetching incomplete activities:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIncompleteActivities();
  }, []);

  const filteredActivities = incompleteActivities.filter(activity =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8C3C2A] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading incomplete activities...</p>
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
              <div className="bg-[#8C322A] h-3" style={{ width: `${overallProgress}%` }}></div>
            </div>
            <span className="text-sm text-black">{uploadedDocuments} of {totalDocuments} Uploaded</span>
          </div>
          <p className="text-sm text-black text-left">
            {totalDocuments - uploadedDocuments} Documents are required for completion
          </p>
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
          {filteredActivities.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Incomplete Activities</h3>
              <p className="text-gray-500">All your activities are complete or you don't have any incomplete activities.</p>
            </div>
          ) : (
            filteredActivities.map((activity) => (
              <div key={activity.id} className="bg-[#F8CB93] rounded-xl p-6 shadow-md">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-black mb-1 leading-tight text-left">
                      {activity.title}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-black">Pending Documents</p>
                  </div>
                </div>

                {/* Document List */}
                <div className="space-y-3">
                  {activity.pendingDocuments.map((document, index) => (
                    <div key={index} className="flex items-center justify-between pl-4">
                      <span className="text-sm text-black text-left">{document.name}</span>
                      <span className={`text-sm ${
                        document.status === 'Verified' ? 'text-green-600 font-semibold' : 
                        document.status === 'Pending Upload' ? 'text-red-600 font-semibold' : 
                        'text-black'
                      }`}>
                        {document.status}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Progress Summary */}
                <div className="mt-4 pt-3 border-t border-black border-opacity-20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-black opacity-70">
                      {activity.uploadedCount} of {activity.totalCount} documents uploaded
                    </span>
                    <span className="text-xs font-semibold text-black">
                      {Math.round((activity.uploadedCount / activity.totalCount) * 100)}% Complete
                    </span>
                  </div>
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
    </div>
  );
};

export default IncompleteActivitiesPage;
