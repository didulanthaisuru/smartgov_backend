import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactUsSuccessPage = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('English');

  const handleOk = () => {
    navigate('/services');
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Blurred Background Elements */}
      <div className="absolute inset-0 filter blur-lg pointer-events-none">
        <div className="absolute -left-64 top-56 w-240 h-240 bg-blue-100 bg-opacity-53 rounded-full"></div>
        <div className="absolute -left-64 top-56 w-240 h-240 bg-blue-100 bg-opacity-53 rounded-full"></div>
      </div>

      {/* Header - Blurred */}
      <div className="relative z-10 filter blur-lg">
        <div className="flex justify-between items-center p-6">
          {/* Hamburger Menu */}
          <div className="w-9 h-9 bg-gray-200 rounded flex items-center justify-center">
            <div className="w-6 h-6 bg-gray-600 rounded-sm"></div>
          </div>

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-15 h-20 bg-orange-500 rounded"></div>
            <span className="text-2xl font-medium text-black">Smart Gov</span>
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-1 bg-white bg-opacity-20 border border-black rounded-xl px-3 py-2">
            <span className="text-sm text-black">{language}</span>
            <div className="w-6 h-6 bg-gray-400 rounded-sm"></div>
          </div>
        </div>

        {/* Blurred Content */}
        <div className="px-10">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center">
                <div className="w-5 h-5 bg-gray-600 rounded-sm"></div>
              </div>
              <h1 className="text-4xl font-normal text-black">Contact Us</h1>
            </div>
            <p className="text-sm text-black ml-11">Contact Us for More Information</p>
          </div>

          {/* Blurred Form */}
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-96 mx-auto">
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-black mb-2">Name</label>
                <div className="w-full bg-orange-200 rounded-xl px-3 py-2 h-8"></div>
              </div>
              <div>
                <label className="block text-sm text-black mb-2">NIC</label>
                <div className="w-full bg-orange-200 rounded-xl px-3 py-2 h-8"></div>
              </div>
              <div>
                <label className="block text-sm text-black mb-2">Contact Number</label>
                <div className="w-full bg-orange-200 rounded-xl px-3 py-2 h-8"></div>
              </div>
              <div>
                <label className="block text-sm text-black mb-2">Message</label>
                <div className="w-full bg-orange-200 rounded-xl px-3 py-2 h-24"></div>
              </div>
              <div className="flex space-x-4 pt-4">
                <div className="bg-red-800 px-6 py-2 rounded-xl h-9"></div>
                <div className="bg-red-800 px-6 py-2 rounded-xl h-9"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal - Not Blurred */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-75 mx-4">
          <div className="text-center space-y-6">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="w-28 h-28 bg-white rounded shadow-md flex items-center justify-center">
                <div className="w-28 h-28 bg-red-800 rounded-full flex items-center justify-center">
                  <svg 
                    className="w-16 h-16 text-white" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Success Text */}
            <div className="space-y-2">
              <h2 className="text-4xl font-normal text-black text-center">Sent</h2>
              <p className="text-sm text-black text-center max-w-48">
                your message will be sent to the relevant authrities
              </p>
            </div>

            {/* OK Button */}
            <button
              onClick={handleOk}
              className="bg-red-800 text-white px-8 py-2 rounded-xl text-sm shadow-md hover:bg-red-700 transition-colors"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsSuccessPage;
