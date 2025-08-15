// Service layer exports
// This file provides a centralized way to import all services

import ApiService from './api.js';
import AuthService from './authService.js';
import UserService from './userService.js';

// Export the main services
export { default as ApiService } from './api.js';
export { default as AuthService } from './authService.js';
export { default as UserService } from './userService.js';

// Re-export commonly used methods for convenience
export const api = {
  get: ApiService.get,
  post: ApiService.post,
  put: ApiService.put,
  patch: ApiService.patch,
  delete: ApiService.delete
};

export const auth = {
  login: AuthService.login,
  register: AuthService.register,
  logout: AuthService.logout,
  verifyToken: AuthService.verifyToken,
  getCurrentUser: AuthService.getCurrentUser,
  isAuthenticated: AuthService.isAuthenticated,
  getAuthData: AuthService.getAuthData,
  saveAuthData: AuthService.saveAuthData,
  adminLogin: AuthService.adminLogin,
  adminRegister: AuthService.adminRegister,
  verifyAdminToken: AuthService.verifyAdminToken
};

export const user = {
  getProfile: UserService.getProfile,
  updateProfile: UserService.updateProfile,
  changePassword: UserService.changePassword,
  requestPasswordReset: UserService.requestPasswordReset,
  resetPassword: UserService.resetPassword,
  getActivities: UserService.getActivities,
  getAppointments: UserService.getAppointments,
  getDocuments: UserService.getDocuments,
  uploadDocument: UserService.uploadDocument,
  deleteDocument: UserService.deleteDocument
};
