import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
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
    
    localStorage.setItem('token', 'dummy-auth-token');
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Navigate to services page (main entry point)
    navigate('/services');
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

                        <form noValidate>
                            {/*  NIC Input */}
                            <div className="mb-5">
                                <label htmlFor="nic" className="block text-sm font-medium text-gray-700 mb-2">
                                    Your NIC
                                </label>
                                <input
                                    type="text"
                                    id="nic"
                                    placeholder="| Your ID Number"
                                    className="w-full px-4 py-3 bg-[#fde8c9] rounded-lg placeholder-gray-600 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d5a97a]"
                                />
                            </div>

                            {/* Password Input */}
                            <div className="mb-5">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    defaultValue="********************" // Use defaultValue to show placeholder-like asterisks
                                    className="w-full px-4 py-3 bg-[#fde8c9] rounded-lg placeholder-gray-600 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d5a97a]"
                                />
                            </div>

                            {/* Save Password & Forgotten Password */}
                            <div className="flex items-center justify-between my-6">
                                <div className="flex items-center">
                                    <input
                                        id="save-password"
                                        name="save-password"
                                        type="checkbox"
                                        className="h-4 w-4 text-[#8B4513] focus:ring-[#A0522D] border-gray-300 rounded"
                                    />
                                    <label htmlFor="save-password" className="ml-2 block text-sm text-gray-800">
                                        Save Password
                                    </label>
                                </div>
                                <div className="text-sm">
                                    <a href="#" className="font-medium text-gray-600 hover:text-gray-800">
                                        Forgotten Password?
                                    </a>
                                </div>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white bg-[#8B4513] hover:bg-[#A0522D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A0522D] transition-colors"
                            >
                                Login Account
                            </button>
                        </form>

                        {/* Create New Account Link */}
                        <p className="mt-8 text-center text-sm">
                            <a href="#" className="font-medium text-gray-600 hover:text-gray-800">
                                Create New Account
                            </a>
                        </p>
                    </main>

                </div>
            </div>
        </div>
    );
};

export default Login;