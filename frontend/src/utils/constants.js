// API configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/update',
    ACTIVITIES: '/user/activities',
  },
  ACTIVITIES: {
    LIST: '/activities',
    DETAIL: '/activities',
    CREATE: '/activities',
    UPDATE: '/activities',
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    ACTIVITIES: '/admin/activities',
    ANALYTICS: '/admin/analytics',
  }
};

// Application constants
export const APP_NAME = 'Smart Gov';
export const APP_VERSION = '1.0.0';

// Status constants
export const STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  REJECTED: 'rejected',
  UNDER_REVIEW: 'under_review'
};

// User roles
export const USER_ROLES = {
  CITIZEN: 'citizen',
  ADMIN: 'admin',
  OFFICER: 'officer'
};

// Activity types
export const ACTIVITY_TYPES = {
  BIRTH_CERTIFICATE: 'birth_certificate',
  NIC_APPLICATION: 'nic_application',
  BUSINESS_REGISTRATION: 'business_registration',
  VEHICLE_LICENSE: 'vehicle_license',
  OTHER: 'other'
};

// Progress colors
export const PROGRESS_COLORS = {
  LOW: '#EF4444', // red-500
  MEDIUM: '#F59E0B', // yellow-500
  HIGH: '#10B981', // green-500
  COMPLETE: '#059669' // green-600
};

// Animation variants for framer-motion
export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slideInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  }
};

// Form validation patterns
export const VALIDATION_PATTERNS = {
  NIC: /^[0-9]{9}[vVxX]$|^[0-9]{12}$/,
  MOBILE: /^[0-9]{10}$/,
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
};

// Default pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50]
};

// Chart colors
export const CHART_COLORS = [
  '#F2622E', // orange
  '#2ED1F2', // cyan
  '#04C404', // green
  '#8A38F5', // purple
  '#FFB800', // yellow
  '#FF0080', // pink
  '#00C9FF', // light blue
  '#92FE9D'  // light green
];
