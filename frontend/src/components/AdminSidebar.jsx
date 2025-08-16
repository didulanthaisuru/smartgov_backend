import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  X, 
  LayoutDashboard, 
  Calendar, 
  CheckCircle, 
  Users, 
  Settings, 
  LogOut,
  BarChart3
} from 'lucide-react';

const AdminSidebar = ({ showSidebar, setShowSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
    // Close sidebar on mobile after navigation
    if (setShowSidebar) {
      setShowSidebar(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Don't render if sidebar is not shown (for mobile)
  if (!showSidebar) return null;

  const navigationItems = [
    {
      path: '/admin/dashboard',
      name: 'Dashboard',
      icon: LayoutDashboard,
      color: 'bg-blue-600'
    },
    {
      path: '/admin/appointments',
      name: 'Appointments',
      icon: Calendar,
      color: 'bg-orange-600'
    },
    {
      path: '/admin/completed',
      name: 'Completed',
      icon: CheckCircle,
      color: 'bg-green-600'
    },
    {
      path: '/admin/users',
      name: 'Users',
      icon: Users,
      color: 'bg-purple-600'
    },
    {
      path: '/admin/reports',
      name: 'Reports',
      icon: BarChart3,
      color: 'bg-indigo-600'
    },
    {
      path: '/admin/settings',
      name: 'Settings',
      icon: Settings,
      color: 'bg-gray-600'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Sidebar Content */}
      <div className="w-64 h-full bg-white shadow-xl border-r border-gray-200">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SG</span>
                </div>
                <div>
                  <span className="text-lg font-semibold text-gray-900">Admin Panel</span>
                </div>
              </div>
              
              {/* Close Button for Mobile */}
              {setShowSidebar && (
                <button
                  onClick={() => setShowSidebar(false)}
                  className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Admin Info */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {user?.admin_name?.charAt(0) || 'A'}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{user?.admin_name || 'Administrator'}</p>
                <p className="text-xs text-gray-500">System Admin</p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 p-4">
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium">{item.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <LogOut className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop for Mobile */}
      {setShowSidebar && (
        <div 
          className="flex-1 bg-black bg-opacity-25 lg:hidden" 
          onClick={() => setShowSidebar(false)}
        />
      )}
    </div>
  );
};

export default AdminSidebar;
