import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [nicNumber, setNicNumber] = useState('');
  const [password, setPassword] = useState('');
  const [savePassword, setSavePassword] = useState(false);
  const [language, setLanguage] = useState('English');

  const handleLogin = () => {
    // Set authentication token and user data
    const userData = {
      id: 1,
      name: 'Imasha Jayarathne',
      email: 'imasha@example.com',
      nicNumber: nicNumber,
      role: 'user'
    };
    
    // Use auth context to login with user role
    const userRole = login(userData, 'user', 'dummy-auth-token');
    
    // Navigate based on role
    if (userRole === 'user') {
      navigate('/services');
    }
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

        {/* Main Login Card */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          {/* Welcome Text */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Hello</h1>
            <p className="text-lg text-gray-600">Welcome back!</p>
          </div>

          {/* Tab Headers */}
          <div className="flex mb-6 border-b">
            <div className="flex-1 text-center py-2 border-b-2 border-orange-500">
              <span className="text-orange-500 font-medium text-sm">Login Account</span>
            </div>
            <Link to="/signup" className="flex-1 text-center py-2">
              <span className="text-gray-500 text-sm">Create New Account</span>
            </Link>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 text-center mb-6 leading-relaxed">
            Access your government services securely.<br />
            Login to manage your appointments and records.
          </p>

          {/* Form */}
          <div className="space-y-4">
            {/* NIC Number Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                NIC Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={nicNumber}
                  onChange={(e) => setNicNumber(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm placeholder-gray-400 focus:outline-none focus:border-orange-500"
                  placeholder="| Your NIC Number"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm placeholder-gray-400 focus:outline-none focus:border-orange-500"
                  placeholder="*********************"
                />
              </div>
            </div>

            {/* Save Password Checkbox */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setSavePassword(!savePassword)}
                className="flex items-center space-x-2"
              >
                <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center bg-white">
                  {savePassword && (
                    <div className="w-2 h-2 bg-orange-500 rounded-sm"></div>
                  )}
                </div>
                <span className="text-sm text-gray-600">Save Password</span>
              </button>
            </div>

            {/* Forgotten Password */}
            <div className="text-center">
              <Link to="/forgot-password" className="text-sm text-gray-600 hover:text-orange-500">
                Forgotten Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="w-full bg-orange-500 text-white py-3 rounded-full font-medium text-sm hover:bg-orange-600 transition-colors"
            >
              Login Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
