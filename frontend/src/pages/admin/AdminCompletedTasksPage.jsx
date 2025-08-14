import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import { Calendar, Star } from 'lucide-react';

const AdminCompletedTasksPage = () => {
  const [selectedTab, setSelectedTab] = useState('Completed');

  const completedTasks = [
    {
      id: 1,
      time: '8.30',
      clientName: 'Nimal Perera',
      duration: '44min',
      rating: 5
    },
    {
      id: 2,
      time: '10.30',
      clientName: 'Kavindu Sampath',
      duration: '30min',
      rating: 5
    },
    {
      id: 3,
      time: '12.30',
      clientName: 'Tharshini Raj',
      duration: '50min',
      rating: 5
    },
    {
      id: 4,
      time: '14.30',
      clientName: 'Suresh Kumar',
      duration: '20min',
      rating: 5
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={12}
        className={index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        
        <div className="flex-1 p-6 overflow-auto">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-normal text-black">Birth Certificate Admin</h1>
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
          </div>

          {/* Date Section */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-orange-200 rounded-xl px-8 py-2 flex items-center gap-3">
              <span className="text-xl font-normal text-black">08/07/2025</span>
              <Calendar size={24} className="text-black" />
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-3 mb-8">
            <button 
              onClick={() => setSelectedTab('Details')}
              className={`px-4 py-2 rounded-xl text-sm font-normal ${
                selectedTab === 'Details' 
                  ? 'bg-orange-300 text-black' 
                  : 'bg-orange-200 text-black'
              }`}
            >
              Details
            </button>
            <button 
              onClick={() => setSelectedTab('Appointments')}
              className={`px-6 py-2 rounded-xl text-sm font-normal ${
                selectedTab === 'Appointments' 
                  ? 'bg-orange-300 text-black' 
                  : 'bg-orange-200 text-black'
              }`}
            >
              Appointments
            </button>
            <button 
              onClick={() => setSelectedTab('Completed')}
              className={`px-6 py-2 rounded-xl text-sm font-normal ${
                selectedTab === 'Completed' 
                  ? 'bg-orange-300 text-black' 
                  : 'bg-orange-200 text-black'
              }`}
            >
              Completed
            </button>
          </div>

          {/* Completed Tasks List */}
          <div className="space-y-4">
            {completedTasks.map((task) => (
              <div key={task.id} className="bg-blue-100 rounded-xl p-6 flex items-center">
                {/* Time */}
                <div className="w-16 text-xl font-normal text-black">
                  {task.time}
                </div>
                
                {/* Vertical Line */}
                <div className="w-px h-16 bg-black mx-4"></div>
                
                {/* Task Details */}
                <div className="flex-1">
                  <h3 className="text-xl font-normal text-black mb-1">{task.clientName}</h3>
                  <p className="text-sm font-normal text-black">Duration - {task.duration}</p>
                </div>
                
                {/* Rating */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm font-normal text-black">Rated</span>
                  <div className="flex gap-1">
                    {renderStars(task.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Image */}
          <div className="flex justify-end mt-8">
            <div className="w-20 h-7 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCompletedTasksPage;
