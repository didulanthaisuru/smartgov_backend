import React from 'react';
import { Menu, Eye, Globe, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Header = ({ title, showProgress = false, progressValue = 0, showMenuButton = true }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Smart Gov" className="w-8 h-8" />
          <h1 className="text-xl font-bold text-gray-800">Smart Gov</h1>
        </div>

        {/* Center Title */}
        {title && (
          <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        )}

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          {/* Progress indicator if enabled */}
          {showProgress && (
            <div className="flex items-center space-x-2">
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-500 transition-all duration-300"
                  style={{ width: `${progressValue}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-600">{progressValue}%</span>
            </div>
          )}

          {/* Language Selector */}
          <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-lg border">
            <Globe className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">English</span>
          </div>

          {/* Logout Button */}
          {localStorage.getItem('token') && (
            <button 
              onClick={handleLogout}
              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-red-600" />
            </button>
          )}

          {/* Menu Button */}
          {showMenuButton && (
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
