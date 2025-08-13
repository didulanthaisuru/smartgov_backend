import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const ContactUsPage = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('English');
  const [showSidebar, setShowSidebar] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    nic: '',
    contactNumber: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSend = () => {
    // Handle form submission
    console.log('Form data:', formData);
    // Navigate to success page
    navigate('/contact-success');
  };

  const handleCancel = () => {
    // Clear form or navigate back
    setFormData({
      name: '',
      nic: '',
      contactNumber: '',
      message: ''
    });
    navigate('/services');
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Sidebar */}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      
      {/* Blurred Background Elements */}
      <div className="absolute inset-0 filter blur-lg pointer-events-none">
        <div className="absolute -left-64 top-56 w-240 h-240 bg-blue-100 bg-opacity-53 rounded-full"></div>
        <div className="absolute -left-64 top-56 w-240 h-240 bg-blue-100 bg-opacity-53 rounded-full"></div>
      </div>

      {/* Header */}
      <div className="relative z-10">
        <Header 
          title="Contact Us" 
          setShowSidebar={setShowSidebar} 
          showLanguageSelector={true}
          language={language}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-10">
        {/* Title Section */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-white rounded shadow-md flex items-center justify-center">
              <div className="w-5 h-5 bg-gray-600 rounded-sm"></div>
            </div>
            <h1 className="text-4xl font-normal text-black">Contact Us</h1>
          </div>
          <p className="text-sm text-black ml-11">Contact Us for More Information</p>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-96 mx-auto">
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm text-black mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter Your Name Here"
                className="w-full bg-orange-200 rounded-xl px-3 py-2 text-sm text-black placeholder-black placeholder-opacity-50 shadow-md outline-none"
              />
            </div>

            {/* NIC Field */}
            <div>
              <label className="block text-sm text-black mb-2">NIC</label>
              <input
                type="text"
                name="nic"
                value={formData.nic}
                onChange={handleInputChange}
                placeholder="Enter the NIC number"
                className="w-full bg-orange-200 rounded-xl px-3 py-2 text-sm text-black placeholder-black placeholder-opacity-50 shadow-md outline-none"
              />
            </div>

            {/* Contact Number Field */}
            <div>
              <label className="block text-sm text-black mb-2">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                placeholder="Enter the telephone number"
                className="w-full bg-orange-200 rounded-xl px-3 py-2 text-sm text-black placeholder-black placeholder-opacity-50 shadow-md outline-none"
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-sm text-black mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Enter your message here"
                rows={4}
                className="w-full bg-orange-200 rounded-xl px-3 py-2 text-sm text-black placeholder-black placeholder-opacity-50 shadow-md outline-none resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                onClick={handleSend}
                className="bg-red-800 text-white px-6 py-2 rounded-xl text-sm shadow-md hover:bg-red-700 transition-colors"
              >
                Send
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-800 text-white px-6 py-2 rounded-xl text-sm shadow-md hover:bg-red-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
