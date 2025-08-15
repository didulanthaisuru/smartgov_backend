import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateInformationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: 'kavindu',
    email: 'kavindu@gmail.com',
    phone: '+94 77 123 4567',
    address: 'No. 123, Main Street, Colombo'
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = () => {
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[800px] h-[730px] rounded-full bg-blue-100 opacity-30"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-6 py-6">
        <button 
          onClick={() => navigate('/profile')}
          className="w-9 h-9 flex items-center justify-center"
        >
          <div className="w-9 h-9 bg-gray-300 rounded"></div>
        </button>

        <div className="flex items-center">
          <div className="w-15 h-20 bg-gray-300 rounded mr-4"></div>
          <h1 className="text-2xl font-medium text-black">Smart Gov</h1>
        </div>

        <div className="flex items-center bg-white bg-opacity-20 border border-black rounded-xl px-4 py-2">
          <span className="text-sm font-normal text-black mr-2">English</span>
          <div className="w-6 h-6 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Title */}
      <div className="relative z-10 px-10 py-6">
        <h2 className="text-4xl font-normal text-black mb-4">Update Information</h2>
      </div>

      {/* Form Content */}
      <div className="relative z-10 bg-white rounded-t-3xl shadow-[0_4px_250px_rgba(0,0,0,0.25)] mx-9 min-h-[500px] p-6">
        <div className="max-w-md mx-auto">
          {/* Profile Picture Section */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#8C322A] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-normal text-black mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full bg-[#F8CB93] rounded-xl px-4 py-3 text-sm text-black placeholder-black placeholder-opacity-50 border-none focus:outline-none focus:ring-2 focus:ring-[#8C322A]"
              />
            </div>

            <div>
              <label className="block text-sm font-normal text-black mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-[#F8CB93] rounded-xl px-4 py-3 text-sm text-black placeholder-black placeholder-opacity-50 border-none focus:outline-none focus:ring-2 focus:ring-[#8C322A]"
              />
            </div>

            <div>
              <label className="block text-sm font-normal text-black mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-[#F8CB93] rounded-xl px-4 py-3 text-sm text-black placeholder-black placeholder-opacity-50 border-none focus:outline-none focus:ring-2 focus:ring-[#8C322A]"
              />
            </div>

            <div>
              <label className="block text-sm font-normal text-black mb-2">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className="w-full bg-[#F8CB93] rounded-xl px-4 py-3 text-sm text-black placeholder-black placeholder-opacity-50 border-none focus:outline-none focus:ring-2 focus:ring-[#8C322A] resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-8">
            <button 
              onClick={() => navigate('/profile')}
              className="flex-1 bg-gray-200 text-black rounded-xl py-3 px-6 text-sm font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleUpdate}
              className="flex-1 bg-[#8C322A] text-white rounded-xl py-3 px-6 text-sm font-medium hover:bg-[#7A2A22] transition-colors"
            >
              Update
            </button>
          </div>
        </div>

        {/* Help Section */}
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
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 m-6 max-w-xs w-full text-center">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 className="text-xl font-medium text-black mb-2">Updated</h3>
            <p className="text-sm text-gray-600 mb-6">Your information has been updated successfully.</p>
            
            <button 
              onClick={() => {
                setShowSuccessModal(false);
                navigate('/profile');
              }}
              className="w-full bg-[#8C322A] text-white rounded-xl py-3 px-6 text-sm font-medium hover:bg-[#7A2A22] transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Bottom Padding */}
      <div className="h-8"></div>
    </div>
  );
};

export default UpdateInformationPage;
