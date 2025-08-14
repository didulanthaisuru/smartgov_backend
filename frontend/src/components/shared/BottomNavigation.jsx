import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Activity, BarChart3, User, Settings } from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      icon: Home,
      label: 'Home',
      path: '/dashboard',
      active: location.pathname === '/dashboard'
    },
    {
      icon: Activity,
      label: 'Activities',
      path: '/activities/ongoing',
      active: location.pathname.startsWith('/activities')
    },
    {
      icon: BarChart3,
      label: 'Admin',
      path: '/admin',
      active: location.pathname === '/admin'
    },
    {
      icon: User,
      label: 'Profile',
      path: '/dashboard',
      active: false
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all ${
                item.active 
                  ? 'text-orange-500 bg-orange-50' 
                  : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
