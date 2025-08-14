import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    adminNic: '',
    password: ''
  });
  const [rememberPassword, setRememberPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // API call for admin login
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        
        // Use auth context to login with admin role
        login(data.admin, 'admin', data.token);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
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
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-7xl font-normal text-black mb-4" style={{ fontFamily: 'Crimson Text' }}>
              Admin
            </h1>
            <p className="text-2xl text-black" style={{ fontFamily: 'Crimson Text' }}>
              Login
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-blue-50 bg-opacity-20 backdrop-blur-md rounded-xl shadow-2xl p-8">
            <h2 className="text-4xl font-normal text-black mb-2">Login Account</h2>
            <p className="text-sm text-black mb-8 leading-relaxed">
              Access your government services securely.<br />
              Login to manage your appointments and records.
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Admin NIC Field */}
              <div>
                <label className="block text-base text-black mb-2 font-medium">
                  Admin NIC
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="adminNic"
                    value={formData.adminNic}
                    onChange={handleInputChange}
                    placeholder="| Your ID Number"
                    className="w-full h-12 bg-orange-200 bg-opacity-50 rounded-2xl px-6 text-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-base text-black mb-2 font-medium">
                  Password
                </label>
                <div className="relative">
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
              </div>

              {/* Remember Password */}
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setRememberPassword(!rememberPassword)}
                  className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center"
                >
                  {rememberPassword && (
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                <span className="text-sm text-black">Save Password</span>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => navigate('/admin/forgot-password')}
                  className="text-sm text-black hover:text-gray-600 transition-colors"
                >
                  Forgotten Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-800 hover:bg-red-900 text-white text-2xl font-medium py-3 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Logging in...' : 'Login Account'}
              </button>

              {/* Create Account Link */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate('/admin/register')}
                  className="text-sm text-black hover:text-gray-600 transition-colors"
                >
                  Create New Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
