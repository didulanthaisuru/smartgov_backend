import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { AuthService } from '../../services';
import logoImage from '../../assets/images/logo3.png';

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    nic: '',
    phone_number: '',
    email: '',
    passcode: '',
    confirm_password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.first_name || !formData.last_name || !formData.nic || 
        !formData.phone_number || !formData.email || !formData.passcode) {
      setError('All fields are required');
      return false;
    }

    if (formData.passcode.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (formData.passcode !== formData.confirm_password) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.nic.length < 10 || formData.nic.length > 12) {
      setError('NIC number must be between 10 and 12 characters');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

<<<<<<< HEAD
                        {/* Back to Login Link */}
                        <p className="mt-6 text-center text-sm">
                            <a href="/login" className="font-medium text-gray-600 hover:text-gray-800">
                                Back to Login
                            </a>
                        </p>
                    </main>
                </div>
=======
    setLoading(true);

    try {
      // Use AuthService for registration
      const result = await AuthService.register({
        first_name: formData.first_name,
        last_name: formData.last_name,
        nic: formData.nic,
        phone_number: formData.phone_number,
        email: formData.email,
        passcode: formData.passcode
      });

      if (result.success) {
        setSuccess('Account created successfully! Redirecting to login...');
        
        // Auto-login after successful registration
        setTimeout(async () => {
          try {
            const loginResult = await AuthService.login({
              nic: formData.nic,
              passcode: formData.passcode
            });

            if (loginResult.success) {
              login(loginResult.data.user, 'user', loginResult.data.access_token);
              navigate('/services');
            } else {
              navigate('/login');
            }
          } catch (error) {
            navigate('/login');
          }
        }, 2000);
      } else {
        setError(result.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header with Logo */}
        <div className="flex justify-center items-center mb-8">
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
        </div>

        {/* Main SignUp Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          {/* Welcome Text */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Create Account</h1>
            <p className="text-gray-600">Sign up to access government services</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm">
                {success}
              </div>
            )}

            {/* First and Last Name */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  minLength="2"
                  maxLength="50"
                />
              </div>
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  minLength="2"
                  maxLength="50"
                />
              </div>
            </div>

            {/* NIC Number */}
            <div className="mb-4">
              <label htmlFor="nic" className="block text-sm font-medium text-gray-700 mb-2">
                NIC Number
              </label>
              <input
                type="text"
                id="nic"
                name="nic"
                value={formData.nic}
                onChange={handleInputChange}
                placeholder="Enter your NIC number"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                minLength="10"
                maxLength="12"
              />
            </div>

            {/* Mobile Number */}
            <div className="mb-4">
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                placeholder="Enter your mobile number"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                minLength="10"
                maxLength="15"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="passcode" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="passcode"
                name="passcode"
                value={formData.passcode}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                minLength="6"
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                minLength="6"
              />
            </div>

            {/* Submit Button */}
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
                  Creating account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Back to Login Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;