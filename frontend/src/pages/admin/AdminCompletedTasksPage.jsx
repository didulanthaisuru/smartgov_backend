import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import { Calendar, Star } from 'lucide-react';

const AdminCompletedTasksPage = () => {
  const { user } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Completed');
  const [completedTasks, setCompletedTasks] = useState([]);

  // Fetch completed tasks from API
  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/ratings/'); // replace with your endpoint
        setCompletedTasks(response.data);
      } catch (error) {
        console.error('Error fetching completed tasks:', error);
      }
    };

    fetchCompletedTasks();
  }, []);

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
          {['Details', 'Appointments', 'Completed'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-normal transition-colors ${
                selectedTab === tab
                  ? 'bg-orange-300 text-black'
                  : 'bg-orange-200 text-black hover:bg-orange-250'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Completed Tasks List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {completedTasks.length === 0 ? (
            <p className="text-black text-center">No completed tasks found.</p>
          ) : (
            completedTasks.map((task, index) => (
              <div key={task._id} className="bg-blue-100 rounded-xl p-6 flex items-center">
                {/* Time */}
                <div className="w-16 text-xl font-normal text-black">
                  {new Date(task.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                
                {/* Vertical Line */}
                <div className="w-px h-16 bg-black mx-4"></div>
                
                {/* Task Details */}
                <div className="flex-1">
                  <h3 className="text-xl font-normal text-black">Appointment ID: {task.appointment_id}</h3>
                  <p className="text-sm font-normal text-black">Feedback: {task.feedback}</p>
                </div>
                
                {/* Rating */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm font-normal text-black">Rated</span>
                  <div className="flex gap-1">
                    {renderStars(task.rating)}
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

export default AdminCompletedTasksPage;
