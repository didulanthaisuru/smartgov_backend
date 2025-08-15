import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { AuthService } from '../../services';
import logoImage from '../../assets/images/logo3.png';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [savePassword, setSavePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await AuthService.adminLogin({
        email: email,
        passcode: password
      });

      if (result.success) {
        const adminData = result.data.admin;
        const adminId = adminData?._id || adminData?.admin_id;

        if (!adminId) {
          throw new Error('Admin ID not found in response.');
        }

        // Store admin_id along with admin data in AuthContext
        login(
          { ...adminData, admin_id: adminId },
          'admin',
          result.data.access_token
        );

        if (savePassword) {
          localStorage.setItem('savedAdminPassword', password);
        }

        navigate('/admin/dashboard');
      } else {
        setError(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex justify-center items-center mb-8">
          <div className="flex items-center space-x-3">
            <img src={logoImage} alt="Smart Gov Logo" className="h-8 w-auto object-contain" />
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-900">Smart Gov</span>
              <span className="text-xs text-gray-600">Administrator Portal</span>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Administrator Login</h1>
            <p className="text-gray-600">Access the administration portal</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

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
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                minLength="6"
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="save-password"
                  name="save-password"
                  type="checkbox"
                  checked={savePassword}
                  onChange={(e) => setSavePassword(e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="save-password" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link to="/admin/forgot-password" className="font-medium text-green-600 hover:text-green-500">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4..." />
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign In as Administrator'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-800 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m..." />
            </svg>
            <div className="text-sm text-yellow-800">
              <p className="font-medium">Administrator Access Only</p>
              <p className="mt-1">This portal is restricted to authorized government administrators only.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
