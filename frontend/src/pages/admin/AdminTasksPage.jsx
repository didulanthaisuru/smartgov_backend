import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AdminTasksPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const tasks = [
    { id: 1, time: '8.30', name: 'Nimal Perera', duration: '44min', status: 'Pending', statusColor: 'bg-cyan-400' },
    { id: 2, time: '10.30', name: 'Kavindu Sampath', duration: '30min', status: 'Approved', statusColor: 'bg-green-500' },
    { id: 3, time: '12.30', name: 'Tharshini Raj', duration: '50min', status: 'Declined', statusColor: 'bg-red-500' },
    { id: 4, time: '14.30', name: 'Suresh Kumar', duration: '20min', status: 'Approved', statusColor: 'bg-green-500' }
  ];

  const handleTaskDetails = (taskId) => {
    navigate(`/admin/task-details/${taskId}`);
  };

  const getStatusTextColor = () => 'text-white';

  return (
    <div className="min-h-screen bg-white relative">
      {/* Sidebar stays if needed */}
      <AdminSidebar showSidebar={false} setShowSidebar={() => {}} />

      {/* Clean header without hamburger */}
      <AdminHeader title={`${user?.service_id || 'Birth Certificate'} Tasks`} />

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Date Header */}
        <div className="bg-orange-200 bg-opacity-50 rounded-xl p-4 flex items-center justify-between">
          <span className="text-2xl font-medium text-black">
            {selectedDate.toLocaleDateString()}
          </span>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            customInput={
              <Calendar className="w-8 h-8 text-black cursor-pointer" />
            }
          />
        </div>

        {/* Task List */}
        <div className="max-w-2xl mx-auto space-y-6">
          {tasks.map((task) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTasksPage;
