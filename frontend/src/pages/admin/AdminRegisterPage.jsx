import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminRegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    service: '',
    nicNumber: '',
    mobileNumber: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const services = [
    'Birth Certificate Service',
    'NIC Service',
    'Business Registration',
    'Government Employment',
    'Education Services',
    'Health Services',
    'Transportation Services',
    'Other Government Services'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          admin_name: `${formData.firstName} ${formData.lastName}`,
          service_id: formData.service,
          email: formData.email,
          passcode: formData.password,
          nic: formData.nicNumber,
          mobile: formData.mobileNumber
        })
      });

      if (response.ok) {
        navigate('/admin/login', { 
          state: { message: 'Registration successful! Please login.' }
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with Logo */}
      <div className="flex items-center justify-center pt-10 pb-6">
        <div className="flex items-center space-x-3">
          <div className="w-15 h-20 bg-orange-500 rounded shadow-lg"></div>
          <h1 className="text-2xl font-medium text-black">Smart Gov</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-8 pb-8">
        <div className="w-full max-w-md">
          {/* Title Section */}
          <div className="text-left mb-8">
            <h1 className="text-6xl font-normal text-black mb-2" style={{ fontFamily: 'Crimson Text' }}>
              New Admin
            </h1>
            <p className="text-2xl text-black" style={{ fontFamily: 'Crimson Text' }}>
              Create New Admin
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-blue-50 bg-opacity-20 backdrop-blur-md rounded-xl shadow-2xl p-8">
            <h2 className="text-4xl font-normal text-black mb-8">Admin info</h2>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Selection */}
              <div>
                <label className="block text-base text-black mb-2 font-medium">
                  Service
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full h-12 bg-orange-200 bg-opacity-50 rounded-2xl px-6 text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                  required
                >
                  <option value="">| Select Your Service</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              {/* Admin Name Fields */}
              <div>
                <label className="block text-base text-black mb-2 font-medium">
                  Admin Name
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="h-12 bg-orange-200 bg-opacity-50 rounded-2xl px-4 text-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="h-12 bg-orange-200 bg-opacity-50 rounded-2xl px-4 text-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                    required
                  />
                </div>
              </div>

              {/* NIC Number */}
              <div>
                <label className="block text-base text-black mb-2 font-medium">
                  NIC Number
                </label>
                <input
                  type="text"
                  name="nicNumber"
                  value={formData.nicNumber}
                  onChange={handleInputChange}
                  placeholder="| Your NIC Number"
                  className="w-full h-12 bg-orange-200 bg-opacity-50 rounded-2xl px-6 text-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                  required
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-base text-black mb-2 font-medium">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  placeholder="| Your Mobile Number"
                  className="w-full h-12 bg-orange-200 bg-opacity-50 rounded-2xl px-6 text-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-base text-black mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="| Your Email"
                  className="w-full h-12 bg-orange-200 bg-opacity-50 rounded-2xl px-6 text-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-base text-black mb-2 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="*********************"
                  className="w-full h-12 bg-orange-200 bg-opacity-50 rounded-2xl px-6 text-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-base text-black mb-2 font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="*********************"
                  className="w-full h-12 bg-orange-200 bg-opacity-50 rounded-2xl px-6 text-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-800 hover:bg-red-900 text-white text-2xl font-medium py-3 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-8"
              >
                {isLoading ? 'Creating Account...' : 'Save & Continue'}
              </button>

              {/* Back to Login */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate('/admin/login')}
                  className="text-sm text-black hover:text-gray-600 transition-colors"
                >
                  Back to Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegisterPage;
