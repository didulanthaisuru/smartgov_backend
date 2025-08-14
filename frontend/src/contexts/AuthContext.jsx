// Role-based authentication context
import React, { createContext, useContext, useState, useEffect } from 'react';

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

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');
        const userData = localStorage.getItem('userData');

        if (token && userRole && userData) {
          // Verify token is still valid with backend
          const isValid = await verifyToken(token, userRole);
          
          if (isValid) {
            setRole(userRole);
            setUser(JSON.parse(userData));
          } else {
            // Token is invalid, clear everything
            logout();
          }
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

  // Function to verify token with backend
  const verifyToken = async (token, role) => {
    try {
      const endpoint = role === 'admin' ? '/api/v1/admin/verify' : '/api/v1/auth/verify';
      
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      return response.ok;
    } catch (error) {
      console.error('Token verification failed:', error);
      return false;
    }
  };

  const login = (userData, userRole, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('userData', JSON.stringify(userData));
    
    setUser(userData);
    setRole(userRole);
    
    // Return the role so the component can handle navigation
    return userRole;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    
    setUser(null);
    setRole(null);
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
