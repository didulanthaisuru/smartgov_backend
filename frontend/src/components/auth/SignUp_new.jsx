import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nicNumber: '',
    mobileNumber: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });
  const [language, setLanguage] = useState('English');

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSignUp = () => {
    // Set authentication token and user data
    const userData = {
      id: 1,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      nicNumber: formData.nicNumber,
      role: 'user'
    };
    
    localStorage.setItem('token', 'dummy-auth-token');
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header with Logo and Language Selector */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded"></div>
            <span className="text-xl font-bold text-gray-800">Smart Gov</span>
          </div>
          
          {/* Language Selector */}
          <div className="flex items-center space-x-1 bg-white border border-gray-300 rounded-xl px-3 py-1">
            <span className="text-sm text-gray-700">{language}</span>
            <div className="w-4 h-3 bg-gray-400 rounded-sm"></div>
          </div>
        </div>

        {/* Main SignUp Card */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          {/* Welcome Text */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Sign Up</h1>
            <p className="text-lg text-gray-600">Create Free Account</p>
          </div>

          {/* Tab Headers */}
          <div className="flex mb-6 border-b">
            <Link to="/login" className="flex-1 text-center py-2">
              <span className="text-gray-500 text-sm">Back to Login</span>
            </Link>
            <div className="flex-1 text-center py-2 border-b-2 border-orange-500">
              <span className="text-orange-500 font-medium text-sm">Personal info</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 text-center mb-6 leading-relaxed">
            Sign up to manage appointments,<br />
            documents, and more.
          </p>

          {/* Form */}
          <div className="space-y-4">
            {/* NIC Number Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                NIC Number
              </label>
              <input
                type="text"
                value={formData.nicNumber}
                onChange={(e) => handleChange('nicNumber', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm placeholder-gray-400 focus:outline-none focus:border-orange-500"
                placeholder="| Your NIC Number"
              />
            </div>

            {/* Mobile Number Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                value={formData.mobileNumber}
                onChange={(e) => handleChange('mobileNumber', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm placeholder-gray-400 focus:outline-none focus:border-orange-500"
                placeholder="| Your Mobile Number"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm placeholder-gray-400 focus:outline-none focus:border-orange-500"
                placeholder="| Your Email"
              />
            </div>

            {/* Name Fields - Side by side */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm placeholder-gray-400 focus:outline-none focus:border-orange-500"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm placeholder-gray-400 focus:outline-none focus:border-orange-500"
                  placeholder="Last Name"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm placeholder-gray-400 focus:outline-none focus:border-orange-500"
                placeholder="*********************"
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm placeholder-gray-400 focus:outline-none focus:border-orange-500"
                placeholder="*********************"
              />
            </div>

            {/* Sign Up Button */}
            <button
              onClick={handleSignUp}
              className="w-full bg-orange-500 text-white py-3 rounded-full font-medium text-sm hover:bg-orange-600 transition-colors mt-6"
            >
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
