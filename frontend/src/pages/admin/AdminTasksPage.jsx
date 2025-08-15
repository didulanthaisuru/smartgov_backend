import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import axios from 'axios';

const AdminTasksPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  // Fetch appointments from FastAPI
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/api/admin/dashboard/appointments_by_subservice/689cd830ef2618d4dfe5a594', {
          params: {
            date: selectedDate.toISOString().split('T')[0] // Send YYYY-MM-DD
          }
        });

        // Transform API response to match your current frontend task format
        const transformedTasks = response.data.appointments.map((appt, index) => {
          let status = 'Pending';
          let statusColor = 'bg-cyan-400';

          if (appt.sub_service_steps.every(step => step.status)) {
            status = 'Approved';
            statusColor = 'bg-green-500';
          } else if (appt.sub_service_steps.some(step => step.status)) {
            status = 'Declined';
            statusColor = 'bg-red-500';
          }

          // Calculate duration in minutes if predicted_duration exists
          let duration = '30min';
          if (appt.predicted_duration) {
            const start = new Date(appt.appointment_date);
            const end = new Date(appt.predicted_duration);
            const diffMinutes = Math.round((end - start) / 60000);
            duration = `${diffMinutes}min`;
          }

          return {
            id: index + 1,
            time: new Date(appt.appoinment_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            name: appt.user_name,
            duration,
            status,
            statusColor
          };
        });

        setTasks(transformedTasks);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [selectedDate]);

  const handleTaskDetails = (taskId) => {
    navigate(`/admin/task-details/${taskId}`);
  };

  const getStatusTextColor = () => 'text-white';

  return (
    <div className="min-h-screen bg-white relative">
      <AdminSidebar showSidebar={false} setShowSidebar={() => {}} />
      <AdminHeader title={`${user?.service_id || 'Birth Certificate'} Tasks`} />

      <div className="p-6 space-y-6">
        {/* Date Header */}
        <div className="bg-orange-200 bg-opacity-50 rounded-xl p-4">
          <span className="text-2xl font-medium text-black">
            {selectedDate.toLocaleDateString()}
          </span>
        </div>

        {/* Task List */}
        <div className="max-w-2xl mx-auto space-y-6">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks for this date</p>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="relative">
                <div className="bg-blue-100 rounded-xl p-4 shadow-sm">
                  <div className="flex items-start">
                    <div className="text-2xl font-normal text-black mr-4 mt-1">{task.time}</div>
                    <div className="w-px h-16 bg-black mr-4 mt-2"></div>
                    <div className="flex-1">
                      <h3 className="text-xl font-normal text-black mb-1">{task.name}</h3>
                      <p className="text-sm text-black">Duration - {task.duration}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <button
                    onClick={() => handleTaskDetails(task.id)}
                    className="text-sm text-black hover:text-blue-600 transition-colors"
                  >
                    Details
                  </button>
                  <div className={`${task.statusColor} px-3 py-1 rounded-xl`}>
                    <span className={`text-sm font-normal ${getStatusTextColor()}`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTasksPage;
