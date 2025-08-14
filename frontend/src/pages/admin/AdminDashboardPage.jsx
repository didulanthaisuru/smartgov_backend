import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import BarChart from '../../components/BarChart';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  
  // Dashboard metrics
  const [metrics, setMetrics] = useState({
    predictedVisitors: 34,
    totalAppointments: 4,
    completedServices: 0,
    pendingRequests: 0
  });

  // Chart data for visitor traffic by day
  const visitorTrafficData = [
    { value: 126, color: '#F8CA92', label: 'Mon' },
    { value: 89, color: '#F2622E', label: 'Tue' },
    { value: 49, color: '#F8CA92', label: 'Wed' },
    { value: 55, color: '#F8CA92', label: 'Thu' },
    { value: 147, color: '#F8CA92', label: 'Fri' }
  ];

  // Time slots data
  const timeSlots = [
    { time: '8.30-10.30', visitors: 15 },
    { time: '10.30-12.30', visitors: 12 },
    { time: '12.30-2.30', visitors: 8 },
    { time: '2.30-4.30', visitors: 6 }
  ];

  useEffect(() => {
    // Set current date
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    setCurrentDate(formattedDate);

    // Load dashboard data
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // API call to get dashboard metrics
      const response = await fetch('/api/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setMetrics(data.metrics || metrics);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Admin Sidebar */}
      <AdminSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      
      {/* Header */}
      <AdminHeader 
        title={`${user?.service_id || 'Birth Certificate'} Admin`}
        setShowSidebar={setShowSidebar}
      >
        {/* Profile Icon */}
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
      </AdminHeader>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Date Header */}
        <div className="bg-orange-200 bg-opacity-50 rounded-xl p-4 flex items-center justify-between">
          <span className="text-2xl font-medium text-black">{currentDate}</span>
          <div className="w-8 h-8">
            <svg className="w-full h-full text-black" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={() => handleNavigation('/admin/appointments')}
            className="flex-1 bg-orange-200 bg-opacity-50 rounded-xl p-4 text-center text-black font-medium hover:bg-orange-200 transition-colors"
          >
            <span className="text-sm">Appointments</span>
          </button>
          <button
            onClick={() => handleNavigation('/admin/services')}
            className="bg-orange-300 bg-opacity-70 rounded-xl px-6 py-4 text-center text-black font-medium hover:bg-orange-300 transition-colors"
          >
            <span className="text-sm">Details</span>
          </button>
          <button
            onClick={() => handleNavigation('/admin/completed')}
            className="flex-1 bg-orange-200 bg-opacity-50 rounded-xl p-4 text-center text-black font-medium hover:bg-orange-200 transition-colors"
          >
            <span className="text-sm">Completed</span>
          </button>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-2 gap-6">
          {/* Predicted Visitors */}
          <div className="bg-blue-100 rounded-xl p-6 text-center">
            <h3 className="text-sm text-black mb-3">
              Predicted<br />Visitors
            </h3>
            <p className="text-4xl font-normal text-black">{metrics.predictedVisitors}</p>
          </div>

          {/* Total Appointments */}
          <div className="bg-blue-100 rounded-xl p-6 text-center">
            <h3 className="text-sm text-black mb-3">
              Total<br />Appointments
            </h3>
            <p className="text-4xl font-normal text-black">{metrics.totalAppointments}</p>
          </div>
        </div>

        {/* Visitor Traffic by Day */}
        <div className="space-y-4">
          <h3 className="text-2xl font-normal text-black">Visitor traffic By Day</h3>
          <div className="bg-gray-50 rounded-xl p-6">
            <BarChart 
              data={visitorTrafficData}
              selectedIndex={1}
              maxHeight={155}
            />
          </div>
        </div>

        {/* Visitor Traffic by Time */}
        <div className="space-y-4">
          <h3 className="text-2xl font-normal text-black">Visitor traffic By Time</h3>
          <div className="space-y-3">
            {timeSlots.map((slot, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div 
                  className="bg-orange-200 bg-opacity-50 rounded h-6 flex items-center justify-end pr-3"
                  style={{ 
                    width: `${Math.max((slot.visitors / 20) * 100, 20)}%`,
                    minWidth: '120px'
                  }}
                >
                  <span className="text-xs text-black font-medium">{slot.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 pt-6">
          <button
            onClick={() => handleNavigation('/admin/users')}
            className="bg-blue-600 text-white rounded-xl p-4 hover:bg-blue-700 transition-colors"
          >
            <span className="font-medium">Manage Users</span>
          </button>
          <button
            onClick={() => handleNavigation('/admin/reports')}
            className="bg-green-600 text-white rounded-xl p-4 hover:bg-green-700 transition-colors"
          >
            <span className="font-medium">View Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
