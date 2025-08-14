import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, Bell, User } from "lucide-react";
import logoImage from '../assets/images/logo3.png';

const Header = ({ title, setShowSidebar, showLanguageSelector = false, language = 'EN', onLanguageChange }) => {
  const navigate = useNavigate();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const languages = [
    { code: 'EN', name: 'English', nativeName: 'English' },
    { code: 'SI', name: 'Sinhala', nativeName: 'සිංහල' },
    { code: 'TA', name: 'Tamil', nativeName: 'தமிழ்' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  const handleLanguageSelect = (langCode) => {
    if (onLanguageChange) {
      onLanguageChange(langCode);
    }
    setIsLanguageDropdownOpen(false);
  };

  const handleNotificationClick = () => {
    navigate('/messages');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section - Menu Button and Title */}
          <div className="flex items-center space-x-4">
            {/* Hamburger Menu */}
            <button
              onClick={() => setShowSidebar(true)}
              className="p-2 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            
            {/* Page Title */}
            {title && (
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-gray-900">
                  {title}
                </h1>
              </div>
            )}
          </div>

          {/* Center Section - Logo */}
          <div className="flex items-center space-x-3">
            {/* Logo Image */}
            <div className="relative">
              <img 
                src={logoImage} 
                alt="Smart Gov Logo" 
                className="h-8 w-auto object-contain"
              />
            </div>
            
            {/* Brand Name */}
            <div className="hidden sm:block">
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-gray-900">
                  Smart Gov
                </span>
                <span className="text-xs text-gray-600">
                  Digital Services
                </span>
              </div>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            {showLanguageSelector && (
              <div className="relative">
                <button 
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <span className="text-sm font-medium text-gray-700">{currentLanguage.code}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isLanguageDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <div className="py-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageSelect(lang.code)}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 flex items-center justify-between ${
                            lang.code === currentLanguage.code
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{lang.name}</span>
                            <span className="text-xs text-gray-500">{lang.nativeName}</span>
                          </div>
                          {lang.code === currentLanguage.code && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Notification Bell */}
            <button 
              onClick={handleNotificationClick}
              className="p-2 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 relative"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {/* Notification Badge */}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* User Profile */}
            <button 
              onClick={handleProfileClick}
              className="p-2 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200"
              aria-label="View profile"
            >
              <User className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Title (shown only on small screens) */}
      {title && (
        <div className="sm:hidden bg-gray-50 border-t border-gray-200 px-4 py-2">
          <h1 className="text-sm font-medium text-gray-900 truncate">
            {title}
          </h1>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {isLanguageDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsLanguageDropdownOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
