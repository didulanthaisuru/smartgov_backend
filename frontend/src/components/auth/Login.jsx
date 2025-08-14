import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { AuthService } from '../../services';
import logoImage from '../../assets/images/logo3.png';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [nicNumber, setNicNumber] = useState('');
  const [password, setPassword] = useState('');
  const [savePassword, setSavePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Use AuthService for login
      const result = await AuthService.login({
        nic: nicNumber,
        passcode: password
      });

      if (result.success) {
        // Login successful
        const userRole = login(result.data.user, 'user', result.data.access_token);
        
        // Save password if checkbox is checked
        if (savePassword) {
          localStorage.setItem('savedPassword', password);
        }
        
        // Navigate to services page
        navigate('/services');
      } else {
        // Login failed
        setError(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
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
<div className="my-6">
  {/* First line: Save Password */}
  <div className="flex items-center mb-3">
    <input
      id="save-password"
      name="save-password"
      type="checkbox"
      className="h-4 w-4 text-[#8B4513] focus:ring-[#A0522D] border-gray-300 rounded"
    />
    <label
      htmlFor="save-password"
      className="ml-2 block text-sm text-gray-800"
    >
      Save Password
    </label>
  </div>

  {/* Second line: Forgotten Password link */}
  <div>
    <a
      href="#"
      className="text-sm font-medium text-gray-600 hover:text-gray-800"
    >
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
                            <a href="/signup" className="font-medium text-gray-600 hover:text-gray-800">
                                Create New Account
                            </a>
                        </p>

                </div>
=======
  const handleAdminLogin = () => {
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header with Logo and Language Selector */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <img 
              src={logoImage} 
              alt="Smart Gov Logo" 
              className="h-8 w-auto object-contain"
            />
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-900">
                Smart Gov
              </span>
              <span className="text-xs text-gray-600">
                Digital Services
              </span>
>>>>>>> frontend_avishka
            </div>
          </div>
          
          {/* Language Selector */}
          <div className="flex items-center space-x-1 bg-white border border-gray-200 rounded-md px-3 py-1">
            <span className="text-sm text-gray-700">EN</span>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Main Login Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          {/* Welcome Text */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Welcome Back</h1>
            <p className="text-gray-600">Sign in to access your services</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* NIC Input */}
            <div className="mb-4">
              <label htmlFor="nic" className="block text-sm font-medium text-gray-700 mb-2">
                NIC Number
              </label>
              <input
                type="text"
                id="nic"
                value={nicNumber}
                onChange={(e) => setNicNumber(e.target.value)}
                placeholder="Enter your NIC number"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                minLength="10"
                maxLength="12"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                minLength="6"
              />
            </div>

            {/* Save Password & Forgotten Password */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="save-password"
                  name="save-password"
                  type="checkbox"
                  checked={savePassword}
                  onChange={(e) => setSavePassword(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="save-password" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Create New Account Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </p>

          {/* Divider */}
          <div className="mt-6 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-3 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Admin Login Button */}
          <div className="mt-6">
            <button
              onClick={handleAdminLogin}
              className="w-full flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Login as Administrator
            </button>
            <p className="mt-2 text-xs text-center text-gray-500">
              Access administration portal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;