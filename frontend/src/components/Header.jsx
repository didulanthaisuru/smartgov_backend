import React from 'react';
import { ChevronDown } from "lucide-react";

const Header = ({ title, setShowSidebar, showLanguageSelector = false, language = 'EN' }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-sm border-b border-gray-100">
      <div className="flex items-center">
        {/* Enhanced Hamburger Menu */}
        <button
          onClick={() => setShowSidebar(true)}
          className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors shadow-sm border border-gray-300"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {title && <h1 className="text-xl font-semibold text-gray-800 ml-4">{title}</h1>}
      </div>

      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="w-12 h-16 bg-orange-500 rounded"></div>
        <span className="text-2xl font-medium text-black">Smart Gov</span>
      </div>

      {/* Language Selector (optional) */}
      {showLanguageSelector && (
        <div className="flex items-center space-x-1 bg-white bg-opacity-20 border border-black rounded-xl px-3 py-2">
          <span className="text-sm text-black">{language}</span>
          {/* <div className="w-6 h-6 bg-gray-400 rounded-sm"></div> */}
          <ChevronDown className="w-4 h-4 text-black" />
        </div>
      )}
    </div>
  );
};

export default Header;
