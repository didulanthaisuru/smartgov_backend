import React from 'react';
import { useNavigate } from 'react-router-dom';

const HelpSection = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-12 pt-6 border-t border-gray-200">
      <div className="flex items-center justify-center space-x-4">
        <button 
          onClick={() => navigate('/chatbot')}
          className="bg-blue-100 rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-blue-200 transition-colors"
        >
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-sm text-blue-600">Need Help?</span>
        </button>
        
        <button 
          onClick={() => navigate('/contact-us')}
          className="bg-green-100 rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-green-200 transition-colors"
        >
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26c.31.17.69.17 1-.01L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-sm text-green-600">Contact Us</span>
        </button>
      </div>
    </div>
  );
};

export default HelpSection;
