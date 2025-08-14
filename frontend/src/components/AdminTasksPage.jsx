import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminTasksPage = () => {
  const navigate = useNavigate();
  const [selectedDate] = useState('08/07/2025');

  const tasks = [
    {
      id: 1,
      time: '8.30',
      name: 'Nimal Perera',
      duration: '44min',
      status: 'Pending',
      statusColor: 'bg-cyan-400'
    },
    {
      id: 2,
      time: '10.30',
      name: 'Kavindu Sampath',
      duration: '30min',
      status: 'Approved',
      statusColor: 'bg-green-500'
    },
    {
      id: 3,
      time: '12.30',
      name: 'Tharshini Raj',
      duration: '50min',
      status: 'Declined',
      statusColor: 'bg-red-500'
    },
    {
      id: 4,
      time: '14.30',
      name: 'Suresh Kumar',
      duration: '20min',
      status: 'Approved',
      statusColor: 'bg-green-500'
    }
  ];

  const handleTaskDetails = (taskId) => {
    navigate(`/admin/task-details/${taskId}`);
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'text-white';
      case 'Declined':
        return 'text-white';
      case 'Pending':
        return 'text-white';
      default:
        return 'text-white';
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <AdminSidebar />
      
      <div className="flex-1 ml-64">
        <AdminHeader />
        
        <div className="p-6">
          <div className="max-w-md mx-auto bg-white">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-normal text-black mb-4">
                Birth Certificate Admin
              </h1>
              
              {/* Date Header */}
              <div className="flex items-center justify-center mb-6">
                <div className="bg-orange-200 bg-opacity-50 px-8 py-2 rounded-xl">
                  <span className="text-2xl font-normal text-black">{selectedDate}</span>
                </div>
                <Calendar className="w-8 h-8 text-black ml-3" />
              </div>
            </div>

            {/* Profile Image */}
            <div className="flex justify-end mb-8">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            </div>

            {/* Task List */}
            <div className="space-y-6">
              {tasks.map((task) => (
                <div key={task.id} className="relative">
                  <div className="bg-blue-100 rounded-xl p-4 shadow-sm">
                    <div className="flex items-start">
                      {/* Time */}
                      <div className="text-2xl font-normal text-black mr-4 mt-1">
                        {task.time}
                      </div>
                      
                      {/* Vertical Line */}
                      <div className="w-px h-16 bg-black mr-4 mt-2"></div>
                      
                      {/* Task Details */}
                      <div className="flex-1">
                        <h3 className="text-xl font-normal text-black mb-1">
                          {task.name}
                        </h3>
                        <p className="text-sm text-black">
                          Duration - {task.duration}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Status and Details */}
                  <div className="flex justify-between items-center mt-2">
                    <button
                      onClick={() => handleTaskDetails(task.id)}
                      className="text-sm text-black hover:text-blue-600 transition-colors"
                    >
                      Details
                    </button>
                    
                    <div className={`${task.statusColor} px-3 py-1 rounded-xl`}>
                      <span className={`text-sm font-normal ${getStatusTextColor(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTasksPage;
