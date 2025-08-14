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
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section - Menu Button and Title */}
          <div className="flex items-center space-x-4">
            {/* Modern Hamburger Menu */}
            <button
              onClick={() => setShowSidebar(true)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all duration-200 shadow-md border border-slate-600 hover:border-slate-500 group"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
            </button>
            
            {/* Page Title */}
            {title && (
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-slate-100 tracking-wide">
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
                className="h-10 w-auto object-contain drop-shadow-lg"
              />
            </div>
            
            {/* Brand Name */}
            <div className="hidden sm:block">
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Smart Gov
                </span>
                <span className="text-xs text-slate-400 font-medium tracking-wide">
                  Digital Government Services
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
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all duration-200 border border-slate-600 hover:border-slate-500 group"
                >
                  <span className="text-sm font-medium text-slate-200">{currentLanguage.code}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-all duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isLanguageDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-50">
                    <div className="py-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageSelect(lang.code)}
                          className={`w-full text-left px-4 py-3 text-sm transition-colors duration-200 flex items-center justify-between ${
                            lang.code === currentLanguage.code
                              ? 'bg-slate-700 text-white'
                              : 'text-slate-200 hover:bg-slate-700 hover:text-white'
                          }`}
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{lang.name}</span>
                            <span className="text-xs text-slate-400">{lang.nativeName}</span>
                          </div>
                          {lang.code === currentLanguage.code && (
                            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
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
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all duration-200 shadow-md border border-slate-600 hover:border-slate-500 relative group"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
              {/* Notification Badge */}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
            </button>

            {/* User Profile */}
            <button 
              onClick={handleProfileClick}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all duration-200 shadow-md border border-slate-600 hover:border-slate-500 group"
              aria-label="View profile"
            >
              <User className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Title (shown only on small screens) */}
      {title && (
        <div className="sm:hidden bg-slate-800 border-t border-slate-700 px-4 py-2">
          <h1 className="text-sm font-medium text-slate-200 truncate">
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
