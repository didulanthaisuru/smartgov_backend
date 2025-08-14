import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  X, 
  User, 
  Building2, 
  MessageSquare, 
  BarChart3, 
  Calendar, 
  Mail, 
  LogOut,
  Home,
  FileText,
  Settings,
  HelpCircle
} from 'lucide-react';
import logoImage from '../assets/images/logo3.png';

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    setShowSidebar(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    setShowSidebar(false);
  };

  const menuItems = [
    {
      id: 'home',
      title: 'Dashboard',
      icon: Home,
      path: '/dashboard'
    },
    {
      id: 'profile',
      title: 'My Profile',
      icon: User,
      path: '/profile'
    },
    {
      id: 'services',
      title: 'Services',
      icon: Building2,
      path: '/services'
    },
    {
      id: 'chatbot',
      title: 'AI Assistant',
      icon: MessageSquare,
      path: '/chatbot'
    },
    {
      id: 'analytics',
      title: 'Analytics',
      icon: BarChart3,
      path: '/analytics'
    },
    {
      id: 'appointments',
      title: 'Appointments',
      icon: Calendar,
      path: '/appointments'
    },
    {
      id: 'documents',
      title: 'Documents',
      icon: FileText,
      path: '/documents'
    },
    {
      id: 'contact',
      title: 'Contact Us',
      icon: Mail,
      path: '/contact-us'
    }
  ];

  const bottomMenuItems = [
    {
      id: 'settings',
      title: 'Settings',
      icon: Settings,
      path: '/settings'
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: HelpCircle,
      path: '/help'
    }
  ];

  if (!showSidebar) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Sidebar Content */}
      <div className="w-72 bg-white h-full shadow-lg border-r border-gray-200">
        <div className="flex flex-col h-full">
          {/* Header Section */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    src={logoImage} 
                    alt="Smart Gov Logo" 
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-gray-900">
                    Smart Gov
                  </span>
                  <span className="text-xs text-gray-600">
                    Digital Services
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowSidebar(false)}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* User Info Section */}
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 font-medium text-sm">Welcome</h3>
                  <p className="text-gray-600 text-xs">Access your services</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="flex-1 px-3 py-4 overflow-y-auto">
            <div className="space-y-1">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3">
                Main Menu
              </h4>
              
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors text-left ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${
                      isActive ? 'text-blue-600' : 'text-gray-500'
                    }`} />
                    <span className={`font-medium text-sm ${
                      isActive ? 'text-blue-700' : 'text-gray-700'
                    }`}>
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Menu */}
            <div className="mt-6 space-y-1">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3">
                Support
              </h4>
              
              {bottomMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors text-left ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${
                      isActive ? 'text-blue-600' : 'text-gray-500'
                    }`} />
                    <span className={`font-medium text-sm ${
                      isActive ? 'text-blue-700' : 'text-gray-700'
                    }`}>
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Section */}
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-md bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-5 h-5 text-red-600" />
              <span className="font-medium text-sm">Log Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div 
        className="flex-1 bg-black bg-opacity-25" 
        onClick={() => setShowSidebar(false)}
      />
    </div>
  );
};

export default Sidebar;
