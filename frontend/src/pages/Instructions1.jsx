import React, { useState } from 'react';
import { ChevronDown, Shield, Users, FileText, Smartphone, CheckCircle, ArrowRight } from 'lucide-react';

export default function SmartGovWelcome1() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const pages = [
    {
      icon: <Shield className="w-8 h-8 text-white" strokeWidth={2.5} />,
      title: "Welcome",
      subtitle: "SmartGov+",
      illustration: <Users className="w-10 h-10 text-orange-400" strokeWidth={1.5} />,
      description: "Our app connects you to the services you need—faster, simpler, and hassle-free.",
      buttonText: "Next →"
    },
    {
      icon: <FileText className="w-8 h-8 text-white" strokeWidth={2.5} />,
      title: "Digital",
      subtitle: "Services",
      illustration: <FileText className="w-10 h-10 text-orange-400" strokeWidth={1.5} />,
      description: "Access government documents, applications, and certificates digitally from anywhere, anytime.",
      buttonText: "Next →"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-white" strokeWidth={2.5} />,
      title: "Easy",
      subtitle: "Access",
      illustration: <Smartphone className="w-10 h-10 text-orange-400" strokeWidth={1.5} />,
      description: "Complete applications, track progress, and receive notifications—all from your mobile device.",
      buttonText: "Next →"
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-white" strokeWidth={2.5} />,
      title: "Get",
      subtitle: "Started",
      illustration: <CheckCircle className="w-10 h-10 text-orange-400" strokeWidth={1.5} />,
      description: "Join thousands of citizens already using SmartGov+ for seamless government services.",
      buttonText: "Get Started"
    }
  ];

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentPageData = pages[currentPage];

  return (
    <div className="w-full max-w-[430px] mx-auto h-[932px] bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-full transform translate-x-32 -translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-100/40 to-transparent rounded-full transform -translate-x-32 translate-y-32"></div>
      
      {/* Main content container */}
      <div className="relative z-10 flex flex-col h-full px-8 pt-20">
        
        {/* Logo and Welcome Text */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          {/* Icon */}
          <div className="mb-8">
            <div className="w-16 h-16 bg-orange-400 rounded-xl flex items-center justify-center shadow-lg">
              {currentPageData.icon}
            </div>
          </div>

          {/* Title Text */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{currentPageData.title}</h1>
            <h2 className="text-4xl font-bold text-gray-900">{currentPageData.subtitle}</h2>
          </div>

          {/* Illustration Icon */}
          <div className="mb-12">
            <div className="w-20 h-20 bg-orange-200 rounded-2xl flex items-center justify-center">
              {currentPageData.illustration}
            </div>
          </div>

          {/* Description Text */}
          <div className="mb-16 px-4">
            <p className="text-lg text-gray-700 leading-relaxed">
              {currentPageData.description}
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center pb-12 space-y-6">
          {/* Language Selector - Only show on first page */}
          {currentPage === 0 && (
            <div className="relative">
              <button className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-lg flex items-center space-x-2 min-w-[120px] justify-between transition-colors duration-200">
                <span className="font-medium">{selectedLanguage}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Page Indicators */}
          <div className="flex space-x-2 my-4">
            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentPage ? 'bg-gray-600' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex space-x-4 w-full max-w-xs">
            {currentPage > 0 && (
              <button 
                onClick={prevPage}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 shadow-lg"
              >
                ← Back
              </button>
            )}
            
            <button 
              onClick={nextPage}
              className={`font-semibold py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg flex-1 ${
                currentPage === pages.length - 1 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-red-700 hover:bg-red-800'
              } text-white`}
            >
              {currentPageData.buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}