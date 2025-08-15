# Smart Gov Frontend

A modern, responsive React application for government services management built with Vite, Tailwind CSS, and React Router. This frontend interfaces with the Smart Gov backend API to provide citizens and government employees with a streamlined digital government services experience.

## 🚀 Features

### Citizen Portal
- **Authentication**: Secure login/signup with NIC validation
- **Dashboard**: Personal profile and activity overview
- **Activity Tracking**: Real-time progress tracking for government processes
- **Document Management**: Upload and track required documents
- **Mobile Responsive**: Optimized for all device sizes

### Admin Portal
- **Analytics Dashboard**: Comprehensive data visualization
- **Application Management**: Review and process citizen applications
- **User Management**: Citizen account oversight
- **Reporting**: Generate and export reports

### Technical Features
- **Modern UI**: Clean, accessible interface built with Tailwind CSS
- **Animations**: Smooth transitions using Framer Motion
- **State Management**: Context API for global state
- **Form Validation**: Robust form handling with React Hook Form
- **Charts**: Interactive data visualization with Recharts
- **API Integration**: Axios-based API client with interceptors

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Framer Motion** - Animation library
- **React Hook Form** - Form management
- **Recharts** - Chart library
- **Lucide React** - Icon library
- **Axios** - HTTP client

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smartgov_backend/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   VITE_APP_NAME=Smart Gov
   VITE_APP_VERSION=1.0.0
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 🗂️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── auth/            # Authentication components
│   ├── dashboard/       # Dashboard components
│   ├── activities/      # Activity management components
│   ├── admin/           # Admin panel components
│   └── shared/          # Shared/common components
├── pages/               # Page-level components
├── context/             # React Context providers
├── hooks/               # Custom React hooks
├── utils/               # Utility functions and constants
├── assets/              # Static assets (images, icons)
│   └── images/          # Image files
├── App.jsx              # Main App component
└── main.jsx             # Application entry point
```

## 🎨 Design System

The application follows the design specifications from the provided Figma mockup:

### Colors
- **Primary**: Orange (`#F2622E`)
- **Secondary**: Cyan (`#2ED1F2`)
- **Success**: Green (`#04C404`)
- **Warning**: Yellow (`#FFB800`)
- **Error**: Red (`#EF4444`)

### Typography
- **Headings**: Inter font family
- **Body**: Inter font family
- **Mobile-first responsive design**

### Components
- **Cards**: Rounded corners with shadows
- **Buttons**: Multiple variants (primary, secondary, outline)
- **Forms**: Consistent styling with validation states
- **Navigation**: Mobile-responsive header with progress indicators

## 🔗 API Integration

The frontend communicates with the backend API using Axios. API configuration is centralized in `utils/helpers.js`:

### Authentication
- JWT token-based authentication
- Automatic token refresh
- Protected route handling

### Endpoints
- `/auth/*` - Authentication endpoints
- `/user/*` - User profile and activities
- `/activities/*` - Activity management
- `/admin/*` - Administrative functions

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- **Mobile phones**: 320px - 768px
- **Tablets**: 768px - 1024px
- **Desktop**: 1024px+

Key mobile features:
- Touch-friendly interface
- Optimized navigation
- Responsive charts and tables
- Mobile-specific layouts

## 🔒 Security Features

- **Authentication**: Secure login with NIC validation
- **Authorization**: Role-based access control
- **Data Validation**: Client-side and server-side validation
- **Error Handling**: Graceful error handling and user feedback
- **HTTPS**: Enforced secure connections in production

## 🧪 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
```

## 🚀 Deployment

### Production Build
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Environment Variables
Set the following environment variables for production:
- `VITE_API_BASE_URL` - Backend API URL
- `VITE_NODE_ENV=production`

## 🔄 State Management

The application uses React Context for global state management:

### AuthContext
- User authentication state
- Token management
- User profile data
- Authentication actions (login, logout, signup)

### Usage Example
```jsx
import { useAuth } from '../context/AuthContext';

const Component = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  // Component logic
};
```

## 📊 Data Visualization

Charts and analytics are implemented using Recharts:

- **Bar Charts**: Application trends
- **Pie Charts**: Department distribution
- **Line Charts**: Processing metrics
- **Responsive design**: Adapts to different screen sizes

## 🎭 Animation System

Framer Motion provides smooth animations:

- **Page transitions**: Smooth navigation between pages
- **Component animations**: Cards, buttons, form elements
- **Loading states**: Animated loading indicators
- **Hover effects**: Interactive feedback

## 🛡️ Error Handling

Comprehensive error handling throughout the application:

- **API errors**: Centralized error handling with user-friendly messages
- **Form validation**: Real-time validation with helpful error messages
- **Network errors**: Offline detection and retry mechanisms
- **404 handling**: Custom error pages

## 🔧 Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use TypeScript for type safety (optional)
- Implement proper error boundaries

### Component Structure
```jsx
import React from 'react';
import { motion } from 'framer-motion';

const Component = ({ prop1, prop2 }) => {
  // Hooks
  // Event handlers
  // Render logic
  
  return (
    <motion.div>
      {/* Component JSX */}
    </motion.div>
  );
};

export default Component;
```

## 📝 Contributing

1. Follow the existing code style
2. Write meaningful commit messages
3. Test your changes thoroughly
4. Update documentation as needed

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Issues**
   - Check if backend server is running
   - Verify API_BASE_URL in environment variables
   - Check network connectivity

2. **Authentication Problems**
   - Clear localStorage and try again
   - Check token expiration
   - Verify API endpoints

3. **Build Issues**
   - Clear node_modules and reinstall
   - Check for dependency conflicts
   - Verify environment variables

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Check the documentation
- Review existing issues
- Contact the development team

---

Built with ❤️ for efficient government services
