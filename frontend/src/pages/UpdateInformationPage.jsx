import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const UpdateInformationPage = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
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
      {/* Header Component */}
      <Header 
        title="Update Information" 
        setShowSidebar={setShowSidebar}
        showLanguageSelector={true}
      />

      {/* Sidebar Component */}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[800px] h-[730px] rounded-full bg-blue-100 opacity-30"></div>
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
