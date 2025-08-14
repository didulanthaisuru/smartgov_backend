import React from 'react';
import { ChevronDown, Menu, Bell, User } from "lucide-react";
import logoImage from '../assets/images/logo3.png';

const Header = ({ title, setShowSidebar, showLanguageSelector = false, language = 'EN' }) => {
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
              <div className="relative group">
                <button className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all duration-200 border border-slate-600 hover:border-slate-500">
                  <span className="text-sm font-medium text-slate-200">{language}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-colors" />
                </button>
              </div>
            )}

            {/* Notification Bell */}
            <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all duration-200 shadow-md border border-slate-600 hover:border-slate-500 relative group">
              <Bell className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
              {/* Notification Badge */}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900"></span>
            </button>

            {/* User Profile */}
            <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all duration-200 shadow-md border border-slate-600 hover:border-slate-500 group">
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
    </header>
  );
};

export default Header;
