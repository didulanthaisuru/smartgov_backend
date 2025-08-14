// Role-based authentication context
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // 'user' | 'admin'
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');
        const userData = localStorage.getItem('userData');

        if (token && userRole && userData) {
          setRole(userRole);
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (userData, userRole, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('userData', JSON.stringify(userData));
    
    setUser(userData);
    setRole(userRole);

    // Redirect based on role
    if (userRole === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/services');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    
    setUser(null);
    setRole(null);
    navigate('/login');
  };

  const isAdmin = () => role === 'admin';
  const isUser = () => role === 'user';
  const isAuthenticated = () => !!user && !!role;

  const value = {
    user,
    role,
    loading,
    login,
    logout,
    isAdmin,
    isUser,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
