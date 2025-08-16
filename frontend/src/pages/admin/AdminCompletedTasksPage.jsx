import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import { Calendar, Star } from 'lucide-react';

const AdminCompletedTasksPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);
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
    <div className="min-h-screen bg-white relative">
      {/* Admin Sidebar */}
      <AdminSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      
      {/* Header */}
      <AdminHeader 
        title={`${user?.service_id || 'Birth Certificate'} Completed Tasks`}
        setShowSidebar={setShowSidebar}
      />

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Date Section */}
        <div className="bg-orange-200 bg-opacity-50 rounded-xl p-4 flex items-center justify-between">
          <span className="text-2xl font-medium text-black">08/07/2025</span>
          <Calendar className="w-8 h-8 text-black" />
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-3">
          <button 
            onClick={() => setSelectedTab('Details')}
            className={`px-4 py-2 rounded-xl text-sm font-normal transition-colors ${
              selectedTab === 'Details' 
                ? 'bg-orange-300 text-black' 
                : 'bg-orange-200 text-black hover:bg-orange-250'
            }`}
          >
            Details
          </button>
          <button 
            onClick={() => navigate('/admin-tasks')}
            className={`px-6 py-2 rounded-xl text-sm font-normal transition-colors ${
              selectedTab === 'Appointments' 
                ? 'bg-orange-300 text-black' 
                : 'bg-orange-200 text-black hover:bg-orange-250'
            }`}
          >
            Appointments
          </button>
          <button 
            onClick={() => setSelectedTab('Completed')}
            className={`px-6 py-2 rounded-xl text-sm font-normal transition-colors ${
              selectedTab === 'Completed' 
                ? 'bg-orange-300 text-black' 
                : 'bg-orange-200 text-black hover:bg-orange-250'
            }`}
          >
            Completed
          </button>
        </div>

        {/* Completed Tasks List */}
        <div className="max-w-4xl mx-auto space-y-4">
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
      </div>
    </div>
  );
};

export default AdminCompletedTasksPage;
