import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Bell, Camera } from 'lucide-react';
import axios from 'axios';

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
const AppointmentCard = ({ appointment, onCameraClick, onDetailsClick }) => { // Add onDetailsClick prop
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">
              {appointment.time}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {appointment.date}
            </div>
          </div>
          <div>
            <div className="font-medium text-gray-900">{appointment.name}</div>
            <div className="text-sm text-gray-500">Duration: {appointment.duration}</div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          {appointment.status === 'approved' && (
            <button
              onClick={() => onCameraClick(appointment)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <Camera className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
          <button
            onClick={() => onDetailsClick(appointment.id)} // Use the handler here
            className="text-blue-500 text-sm font-medium hover:text-blue-600 transition-colors mt-auto">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};


const AdminTasks = () => {
  const [appointments, setAppointments] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState('Appointments');
  const navigate = useNavigate(); // Initialize navigate

  const subServiceId = '689cd830ef2618d4dfe5a594';

  React.useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/api/admin/dashboard-full/appointments_by_subservice/${subServiceId}`
        );
        const formattedAppointments = response.data.appointments.map(apiAppt => ({
          id: apiAppt._id, // This is the ID we will pass
          name: apiAppt.user_name,
          time: apiAppt.appoinment_time
            ? new Date(apiAppt.appoinment_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
            : 'N/A',
          date: apiAppt.appointment_date
            ? new Date(apiAppt.appointment_date).toLocaleDateString('en-GB')
            : 'N/A',
          duration: 'N/A',
          status: apiAppt.is_fully_completed ? 'approved' : 'pending'
        }));
        setAppointments(formattedAppointments);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
        setError("Could not load appointment data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAppointments();
  }, [subServiceId]);

  const tabs = ['Details', 'Appointments', 'Completed'];

  const handleBellClick = () => alert('Navigating to notifications...');
  const handleCameraClick = (appointment) => alert(`Opening camera for ${appointment.name}'s documents...`);

  // Handler to navigate to the details page
  const handleDetailsClick = (appointmentId) => {
    navigate(`/admin/task-details/${appointmentId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      <div className="w-full mx-auto" style={{ maxWidth: '430px' }}>
        <header className="flex items-center justify-between pt-4 pb-2">
          <h1 className="text-xl font-bold text-gray-800">Birth Certificate Admin</h1>
          <button
            onClick={handleBellClick}
            className="cursor-pointer transition-transform duration-300 transform hover:scale-110 hover:text-orange-500 p-2 hover:bg-orange-50 rounded-full"
          >
            <Bell className="text-gray-700" size={24} />
          </button>
        </header>
        <div className="flex justify-around space-x-2 my-6">
          {tabs.map((tab) => (
            <Pill
              key={tab}
              label={tab}
              isActive={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </div>
        <div className="mt-6">
          {isLoading && <p className="text-center text-gray-500">Loading appointments...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!isLoading && !error && appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onCameraClick={handleCameraClick}
              onDetailsClick={handleDetailsClick} // Pass the handler to the card
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTasks;