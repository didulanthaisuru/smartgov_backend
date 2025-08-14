import React, { useState } from 'react';
import { Bell, Calendar, Camera } from 'lucide-react';

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

// Appointment Card Component
const AppointmentCard = ({ appointment, index, onCameraClick }) => {
  const getStatusButton = (status) => {
    if (status === 'pending') {
      return (
        <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors">
          Pending
        </button>
      );
    } else {
      return (
        <button className="bg-green-500 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-green-600 transition-colors">
          Approved
        </button>
      );
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Time */}
          <div className="text-lg font-semibold text-gray-900">
            {appointment.time}
          </div>
          
          {/* Name and Duration */}
          <div>
            <div className="font-medium text-gray-900">{appointment.name}</div>
            <div className="text-sm text-gray-500">Duration: {appointment.duration}</div>
          </div>
        </div>

        {/* Right Side - Status and Details */}
        <div className="flex flex-col items-end space-y-2">
          {/* Camera Icon Button for approved entries */}
          {appointment.status === 'approved' && (
            <button
              onClick={() => onCameraClick(appointment)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <Camera className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
          
          {/* Status Button */}
          {getStatusButton(appointment.status)}
          
          {/* Details Button */}
          <button className="text-blue-500 text-sm font-medium hover:text-blue-600 transition-colors">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminTasks = () => {
  // Easy to edit states and data
  const [activeTab, setActiveTab] = useState('Details');
  const [selectedDate, setSelectedDate] = useState(new Date('2025-07-08'));
  const [showCalendar, setShowCalendar] = useState(false);
  
  // Easy to edit appointments data
  const appointments = [
    {
      id: 1,
      time: '8.30',
      name: 'Nimal Perera',
      duration: '14min',
      status: 'pending'
    },
    {
      id: 2,
      time: '10.30',
      name: 'Kavindu Sampath',
      duration: '30min',
      status: 'pending'
    },
    {
      id: 3,
      time: '12.30',
      name: 'Tharshini Raj',
      duration: '50min',
      status: 'approved'
    },
    {
      id: 4,
      time: '14.30',
      name: 'Suresh Kumar',
      duration: '20min',
      status: 'approved'
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

  const handleCameraClick = (appointment) => {
    alert(`Opening camera for ${appointment.name}'s documents...`);
    // Add your camera/document navigation logic here
    // Example: window.location.href = `/camera/${appointment.id}`;
  };

  const handleDateSelect = (event) => {
    const newDate = new Date(event.target.value);
    setSelectedDate(newDate);
    setShowCalendar(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      <div className="w-full mx-auto" style={{ maxWidth: '430px' }}>

        {/* Header */}
        <header className="flex items-center justify-between pt-4 pb-2">
          <h1 className="text-xl font-bold text-gray-800">Birth Certificate Admin</h1>
          <button
            onClick={handleBellClick}
            className="cursor-pointer transition-transform duration-300 transform hover:scale-110 hover:text-orange-500 p-2 hover:bg-orange-50 rounded-full"
          >
            <Bell className="text-gray-700" size={24} />
          </button>
        </header>

        {/* Date Display */}
        <div className="flex items-center justify-center my-4 relative">
          <button
            onClick={handleCalendarClick}
            className="flex items-center bg-orange-100 rounded-full px-6 py-2 shadow-sm cursor-pointer hover:bg-orange-200 transition-colors duration-200"
          >
            <span className="text-lg font-medium text-gray-800 mr-2">
              {selectedDate.toLocaleDateString('en-US')}
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
        <div className="flex justify-around space-x-2 my-4">
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
        <div className="mt-6">
          {appointments.map((appointment, index) => (
            <AppointmentCard 
              key={appointment.id} 
              appointment={appointment} 
              index={index}
              onCameraClick={handleCameraClick}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdminTasks;