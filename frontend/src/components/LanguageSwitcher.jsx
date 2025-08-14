// LanguageSwitcher.jsx
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react'; // Assuming you have lucide-react installed

const LanguageSwitcher = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

  const languageOptions = {
    en: 'English',
    si: 'සිංහල',
    ta: 'தமிழ்',
  };

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
    setIsOpen(false); // Close the dropdown after selection
    console.log(`Language switched to: ${lang}`);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <span>{languageOptions[currentLanguage]}</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <ul className="py-1">
            {Object.entries(languageOptions).map(([key, value]) => (
              <li
                key={key}
                onClick={() => handleLanguageChange(key)}
                className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;