// Role-based authentication context
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthService } from '../services';

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
        const authData = AuthService.getAuthData();

        if (authData.token && authData.userRole && authData.userData) {
          // Set the state immediately for better UX
          setRole(authData.userRole);
          setUser(authData.userData);
          
          // Verify token is still valid with backend (in background)
          const isValid = await verifyToken(authData.token, authData.userRole);
          
          if (!isValid) {
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
      if (role === 'admin') {
        const result = await AuthService.verifyAdminToken();
        return result.success;
      } else {
        const result = await AuthService.verifyToken();
        return result.success;
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      return false;
    }
  };

  const login = (userData, userRole, token) => {
    // Store authentication data using service
    AuthService.saveAuthData({ token, userRole, userData });
    
    // Update state immediately
    setUser(userData);
    setRole(userRole);
    
    // Return the role so the component can handle navigation
    return userRole;
  };

  const logout = () => {
    // Clear all authentication data using service
    AuthService.logout();
    
    // Update state
    setUser(null);
    setRole(null);
  };

  const isAdmin = () => role === 'admin';
  const isUser = () => role === 'user';
  const isAuthenticated = () => {
    // Check both state and localStorage for reliability
    const authData = AuthService.getAuthData();
    return !!(user && role && authData.token);
  };

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
