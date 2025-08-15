import React, { useState } from 'react';
import { Bell, Calendar, Star } from 'lucide-react';

// Reusable Pill Component
const Pill = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-1 px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
      isActive
        ? 'bg-orange-200 text-gray-800'
        : 'bg-orange-100 text-gray-500 hover:bg-orange-200'
    }`}
  >
    {label}
  </button>
);

// Star Rating Component
const StarRating = ({ rating = 5 }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3 h-3 ${
            star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

// Appointment Card Component
const AppointmentCard = ({ appointment, onRateClick }) => {
  return (
    <div className="bg-blue-100 rounded-lg p-4 shadow-sm mb-4 border border-blue-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Time */}
          <div className="text-lg font-semibold text-gray-900">
            {appointment.time}
          </div>
          
          {/* Name and Duration */}
          <div>
            <div className="font-medium text-gray-900">{appointment.name}</div>
            <div className="text-sm text-gray-600">Duration: {appointment.duration}</div>
          </div>
        </div>

        {/* Right Side - Rating and Rate Button */}
        <div className="flex flex-col items-end space-y-2">
          {/* Rating Stars */}
          <StarRating rating={appointment.rating} />
          
          {/* Rate Button */}
          <button
            onClick={() => onRateClick(appointment)}
            className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            Rated
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminRates = () => {
  // Easy to edit states and data
  const [activeTab, setActiveTab] = useState('Details');
  const [selectedDate, setSelectedDate] = useState(new Date('2025-07-08'));
  const [showCalendar, setShowCalendar] = useState(false);
  
  // Easy to edit appointments data with ratings
  const appointments = [
    {
      id: 1,
      time: '8.30',
      name: 'Nimal Perera',
      duration: '14min',
      rating: 5,
      status: 'rated'
    },
    {
      id: 2,
      time: '10.30',
      name: 'Kavindu Sampath',
      duration: '30min',
      rating: 5,
      status: 'rated'
    },
    {
      id: 3,
      time: '12.30',
      name: 'Tharshini Raj',
      duration: '50min',
      rating: 5,
      status: 'rated'
    },
    {
      id: 4,
      time: '14.30',
      name: 'Suresh Kumar',
      duration: '20min',
      rating: 5,
      status: 'rated'
    }
  ];

  // Easy to edit tabs
  const tabs = ['Details', 'Appointments', 'Completed'];

  // Navigation handlers
  const handleBellClick = () => {
    alert('Navigating to notifications...');
    // Add your navigation logic here
    // Example: window.location.href = '/notifications';
  };

  const handleCalendarClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleRateClick = (appointment) => {
    alert(`Rating system for ${appointment.name}'s appointment...`);
    // Add your rating logic here
  };

  const handleDateSelect = (event) => {
    const newDate = new Date(event.target.value);
    setSelectedDate(newDate);
    setShowCalendar(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="w-full mx-auto" style={{ maxWidth: '430px' }}>

        {/* Header */}
        <header className="flex items-center justify-center pt-6 pb-4 relative">
          <h1 className="text-xl font-bold text-gray-800">Birth Certificate Admin</h1>
          <button
            onClick={handleBellClick}
            className="absolute right-4 cursor-pointer transition-transform duration-300 transform hover:scale-110 hover:text-orange-500 p-2 hover:bg-orange-50 rounded-full"
          >
            <Bell className="text-gray-700" size={24} />
          </button>
        </header>

        {/* Date Display */}
        <div className="flex items-center justify-center my-6 relative">
          <button
            onClick={handleCalendarClick}
            className="flex items-center bg-orange-200 rounded-lg px-6 py-3 shadow-sm cursor-pointer hover:bg-orange-300 transition-colors duration-200"
          >
            <span className="text-lg font-medium text-gray-800 mr-3">
              {selectedDate.toLocaleDateString('en-GB').replace(/\//g, '/')}
            </span>
            <Calendar className="text-gray-700" size={20} />
          </button>
          
          {/* Calendar Dropdown */}
          {showCalendar && (
            <div className="absolute top-full mt-2 bg-white rounded-lg shadow-lg p-4 z-10 border">
              <input
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={handleDateSelect}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          )}
        </div>

        {/* Navigation Pills */}
        <div className="flex justify-around space-x-2 my-6 px-4">
          {tabs.map((tab) => (
            <Pill
              key={tab}
              label={tab}
              isActive={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </div>

        {/* Appointments List */}
        <div className="px-4 pb-6">
          {appointments.map((appointment, index) => (
            <AppointmentCard 
              key={appointment.id} 
              appointment={appointment}
              onRateClick={handleRateClick}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdminRates;