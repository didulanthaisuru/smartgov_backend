import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthService from '../services/authService';

const PreviousActivitiesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activities, setActivities] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(0);
  const [userId, setUserId] = useState(null);

  // Get user ID on component mount
  useEffect(() => {
    const authData = AuthService.getAuthData();
    if (authData?.userData?.id) {
      setUserId(authData.userData.id);
    } else {
      setError('User ID not found. Please login again.');
      setLoading(false);
    }
  }, []);

  // Fetch previous appointments when userId is available
  useEffect(() => {
    const fetchPreviousAppointments = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        setError(null);

        const response = await axios.post(
          "http://localhost:8000/api/v1/appointments_view/previous",
          { user_id: userId }
        );

        console.log("Fetched previous appointments:", response.data);

        // Fetch existing ratings for each appointment
        const activitiesWithRatings = await Promise.all(
          response.data.map(async (item) => {
            try {
              // Fetch rating for this appointment using the rating endpoint
              const ratingResponse = await axios.get(
                `http://localhost:8000/api/v1/ratings/appointment/${item.appointment_id}`
              );

              console.log(`Rating for appointment ${item.appointment_id}:`, ratingResponse.data);

              return {
                id: item.appointment_id,
                name: item.service_name || "Untitled Appointment",
                appointment_date: item.appointment_date || "N/A",
                is_fully_completed: item.is_fully_completed ?? false,
                rating: ratingResponse.data?.rating || 0,
                feedback: ratingResponse.data?.feedback || ""
              };
            } catch (error) {
              console.log(`No existing rating for appointment ${item.appointment_id}:`, error.message);
              return {
                id: item.appointment_id,
                name: item.service_name || "Untitled Appointment",
                appointment_date: item.appointment_date || "N/A",
                is_fully_completed: item.is_fully_completed ?? false,
                rating: 0,
                feedback: ""
              };
            }
          })
        );

        setActivities(activitiesWithRatings);
      } catch (error) {
        console.error("Error fetching previous activities:", error);
        setError("Failed to fetch previous activities.");
      } finally {
        setLoading(false);
      }
    };

    fetchPreviousAppointments();
  }, [userId]);

  const filteredActivities = activities.filter(activity =>
    activity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFeedbackSubmit = async () => {
    if (selectedActivity && feedbackText.trim() && rating > 0) {
      try {
        // Prepare rating data according to the backend schema
        const ratingData = {
          appointment_id: selectedActivity.id,
          user_id: userId,
          rating: rating,
          feedback: feedbackText
        };

        console.log('Sending rating data:', ratingData);

        // Send to rating endpoint using the backend rating API
        const ratingResponse = await axios.post(
          "http://localhost:8000/api/v1/ratings/",
          ratingData
        );

        console.log('Rating response:', ratingResponse.data);

        // Update the activity with rating and feedback
        const updatedActivities = activities.map(activity => 
          activity.id === selectedActivity.id 
            ? { ...activity, rating, feedback: feedbackText }
            : activity
        );
        
        setActivities(updatedActivities);
        
        // Close the modal
        setShowFeedback(false);
        setFeedbackText('');
        setRating(0);
        setSelectedActivity(null);
        
        // Success message
        alert('Thank you for your feedback! Your rating has been saved to the database.');
        
      } catch (error) {
        console.error('Error submitting rating:', error);
        alert('Failed to submit rating. Please try again.');
      }
    }
  };

  const openFeedbackModal = (activity) => {
    setSelectedActivity(activity);
    setShowFeedback(true);
    setFeedbackText(activity.feedback || '');
    setRating(activity.rating || 0);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8C3C2A] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading previous activities...</p>
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
        <h2 className="text-4xl font-normal text-black mb-4 text-left">Previous Activities</h2>
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-black">
            View your previous activities here ({activities.length} total)
          </p>
          {/* Rating Statistics */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <span className="text-green-600">⭐</span>
              <span className="text-gray-600">
                {activities.filter(a => a.rating > 0).length} rated
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-gray-400">📝</span>
              <span className="text-gray-600">
                {activities.filter(a => a.rating === 0).length} not rated
              </span>
            </div>
            {activities.filter(a => a.rating > 0).length > 0 && (
              <div className="flex items-center space-x-1">
                <span className="text-yellow-600">★</span>
                <span className="text-gray-600">
                  Avg: {(activities.reduce((sum, a) => sum + a.rating, 0) / activities.filter(a => a.rating > 0).length).toFixed(1)}/5
                </span>
              </div>
            )}
          </div>
        </div>
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
          {filteredActivities.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Previous Activities</h3>
              <p className="text-gray-500">You don't have any previous activities to display.</p>
            </div>
          ) : (
            filteredActivities.map((activity) => (
              <div key={activity.id} className="bg-[#F8CB93] rounded-xl p-6 shadow-md">
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-normal text-black">{activity.name}</h3>
                    <div className="flex items-center space-x-2">
                      {/* Rating status indicator */}
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        activity.rating > 0 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {activity.rating > 0 ? '⭐ Rated' : '📝 Not Rated'}
                      </span>
                      {/* Completion status */}
                      <span className={`text-sm px-3 py-1 rounded-full ${
                        activity.is_fully_completed 
                          ? 'bg-green-100 text-green-800 font-semibold' 
                          : 'bg-red-100 text-red-800 font-semibold'
                      }`}>
                        {activity.is_fully_completed ? 'Completed' : 'Incomplete'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-bold text-black">
                    {activity.is_fully_completed 
                      ? `${activity.name} completed successfully` 
                      : `${activity.name} was not completed`}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Date: {activity.appointment_date}
                  </p>
                </div>

                {/* Rating Section - Show existing rating or rating input */}
                {activity.rating > 0 ? (
                  // Show existing rating with enhanced styling
                  <div className="mb-4">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-green-800">Your Rating</p>
                        <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                          Rated
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-6 h-6 ${
                              star <= activity.rating ? 'text-yellow-500' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                        <span className="ml-2 text-sm font-medium text-gray-700">
                          {activity.rating}/5
                        </span>
                      </div>
                                             {activity.feedback && (
                         <div className="bg-white rounded-lg p-3 border border-green-100">
                           <p className="text-sm text-gray-700 italic">
                             "{activity.feedback}"
                           </p>
                         </div>
                       )}
                    </div>
                  </div>
                ) : (
                  // Show rating input for activities without ratings
                  <div className="mb-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-blue-800">Rate our service</span>
                        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                          Not Rated
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 mb-3">
                        <span className="text-xs text-blue-600 mr-2">Click to rate:</span>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className="w-6 h-6 text-yellow-500 cursor-pointer hover:text-yellow-600 hover:scale-110 transition-all duration-200"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                      </div>
                      
                      <div className="relative">
                        <textarea 
                          placeholder="Leave your feedback here..."
                          className="w-full bg-white rounded-lg py-2 px-4 pr-12 shadow-sm resize-none h-12 text-sm text-gray-700 border border-blue-200 outline-none focus:border-blue-400 transition-colors"
                        />
                        <button 
                          onClick={() => openFeedbackModal(activity)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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

      {/* Feedback Modal */}
      {showFeedback && selectedActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 m-6 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-black">
                {selectedActivity.rating > 0 ? 'Edit Feedback' : 'Leave Feedback'} for {selectedActivity.name}
              </h3>
              {selectedActivity.rating > 0 && (
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  Current: {selectedActivity.rating}/5
                </span>
              )}
            </div>
            
            {/* Rating Stars */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Rate this service:</p>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingChange(star)}
                    className={`w-8 h-8 ${
                      star <= rating ? 'text-yellow-500' : 'text-gray-300'
                    } hover:text-yellow-400 transition-colors`}
                  >
                    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>
            
            <textarea 
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="w-full h-24 p-3 border border-gray-300 rounded-lg text-sm resize-none"
              placeholder="Please share your experience..."
            />
            <div className="flex space-x-3 mt-4">
              <button 
                onClick={() => {
                  setShowFeedback(false);
                  setFeedbackText('');
                  setRating(0);
                  setSelectedActivity(null);
                }}
                className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleFeedbackSubmit}
                disabled={!feedbackText.trim() || rating === 0}
                className="flex-1 py-2 px-4 bg-[#8C322A] text-white rounded-lg text-sm hover:bg-[#7A2A22] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedActivity.rating > 0 ? 'Update' : 'Submit'}
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
