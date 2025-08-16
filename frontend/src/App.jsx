import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProtectedRoute, AdminRoute, UserRoute } from './components/ProtectedRoute';
import './App.css';

// User Pages
import WelcomePage from './pages/WelcomePage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import ActivitiesPage from './pages/ActivitiesPage';
import AdminPage from './pages/AdminPage';
import NewApplicationPage from './pages/NewApplicationPage';
import AppointmentsPage from './pages/AppointmentsPage';
import MessagesPage from './pages/MessagesPage';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import ServiceDetailBooking from './pages/ServiceDetailBooking';
import UploadPage from './pages/UploadPage';
import PaymentPage from './pages/PaymentPage';
import AppointmentBookingPage from './pages/AppointmentBookingPage';
import AppointmentConfirmationPage from './pages/AppointmentConfirmationPage';
import QRCodePage from './pages/QRCodePage';
import ChatbotPage from './pages/ChatbotPage';
import ContactUsPage from './pages/ContactUsPage';
import ContactUsSuccessPage from './pages/ContactUsSuccessPage';
import DocumentUploadPage from './pages/DocumentUploadPage';
import ProfilePage from './pages/ProfilePage';
import OngoingActivitiesPage from './pages/OngoingActivitiesPage';
import IncompleteActivitiesPage from './pages/IncompleteActivitiesPage';
import PreviousActivitiesPage from './pages/PreviousActivitiesPage';
import AppointmentDetailsPage from './pages/AppointmentDetailsPage';
import UpdateInformationPage from './pages/UpdateInformationPage';
import AnalyticsDashboardPage from './pages/AnalyticsDashboardPage';
import SmartGovWelcome1 from './pages/Instructions1';
import AdminTasks from './pages/AdminTasks';
import AdminNotifications from './pages/AdminNotifications';
import AdminRates from './pages/AdminRates';
import SubServicesPage from './pages/SubServicePage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminRegisterPage from './pages/admin/AdminRegisterPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminTasksPage from './pages/admin/AdminTasksPage';
import AdminTaskDetailsPage from './pages/admin/AdminTaskDetailsPage';
import AdminNotificationsPage from './pages/admin/AdminNotificationsPage';
import AdminCompletedTasksPage from './pages/admin/AdminCompletedTasksPage';
import AdminChatPage from './pages/admin/AdminChatPage';
import AdminQRScanPage from './pages/admin/AdminQRScanPage';

// Initial Route Component (handles app startup routing)
const InitialRoute = () => {
  const { isAuthenticated, role, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Check if user is authenticated and redirect accordingly
  if (isAuthenticated()) {
    // Redirect based on user role
    if (role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/services" replace />;
    }
  }
  
  // Not authenticated, show landing page
  return <LandingPage />;
};

// Public Route Component (redirect if authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, role, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  // If authenticated, redirect to appropriate dashboard
  if (isAuthenticated()) {
    return <Navigate to={role === 'admin' ? '/admin/dashboard' : '/services'} replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            {/* Initial Route - handles app startup */}
            <Route path="/" element={<InitialRoute />} />
            
            {/* Public Routes */}
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route 
              path="/login" 
              element={
                // <PublicRoute>
                  <LoginPage />
                // </PublicRoute>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <PublicRoute>
                  <SignUpPage />
                </PublicRoute>
              } 
            />
            <Route 
              path="/welcome-screen-1"
              element={<SmartGovWelcome1 />}
            />

            <Route 
              path="/admin-notifications"
              element={
                // <ProtectedRoute>
                  <AdminNotifications />
                // </ProtectedRoute> 
              }
            />

            {/* Admin Public Routes */}
            <Route 
              path="/admin/login" 
              element={
                <PublicRoute>
                  <AdminLoginPage />
                </PublicRoute>
              } 
            />
            <Route 
              path="/admin/register" 
              element={
                <PublicRoute>
                  <AdminRegisterPage />
                </PublicRoute>
              } 
            />

            {/* Admin Protected Routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                // <AdminRoute>
                  <AdminDashboardPage />
                // </AdminRoute>
              } 
            />
            <Route 
              path="/admin/tasks" 
              element={
                // <AdminRoute>
                  <AdminTasksPage />
                // </AdminRoute>
              } 
            />
            <Route 
              path="/admin/task-details/:taskId" 
              element={
                <AdminRoute>
                  <AdminTaskDetailsPage />
                </AdminRoute>
              } 
            />
            <Route 
              path="/admin/notifications" 
              element={
                <AdminRoute>
                  <AdminNotificationsPage />
                </AdminRoute>
              } 
            />
            <Route 
              path="/admin/completed-tasks" 
              element={
                // <AdminRoute>
                  <AdminCompletedTasksPage />
                // </AdminRoute>
              } 
            />
            <Route 
              path="/admin/chat" 
              element={
                // <AdminRoute>
                  <AdminChatPage />
                // </AdminRoute>
              } 
            />
            <Route 
              path="/admin/qr-scan" 
              element={
                // <AdminRoute>
                  <AdminQRScanPage />
                 //</AdminRoute>
              } 
            />

            {/* User Protected Routes - Services as main dashboard */}
            <Route 
              path="/services" 
              element={
                //<UserRoute>
                  <Services />
                //</UserRoute>
              } 
            />
            <Route 
              path="/services/:serviceId/detail" 
              element={
                //<UserRoute>
                  <SubServicesPage />
                //</UserRoute>
              } 
            />

            <Route 
              path="/payment/:appointmentId" 
              element={<PaymentPage />} 
            />

            {/* **NEW**: Route for the final confirmation page */}
            <Route 
              path="/confirmation/:appointmentId" 
              element={<AppointmentConfirmationPage />} 
            />

            <Route 
              path="/qr-code/:appointmentId" 
              element={<QRCodePage />} 
            />

            <Route
              path="admin-rates"
              element={
                // <ProtectedRoute>
                  <AdminRates />
                // </ProtectedRoute>
              }/>
            <Route 
              path="/services/:serviceId" 
              element={
                <UserRoute>
                  <ServiceDetail />
                </UserRoute>
              } 
            />
           
            <Route 
              path="/services/:serviceId/detail" 
              element={
                <UserRoute>
                  <ServiceDetailBooking />
                </UserRoute>
              } 
            />
            <Route 
              path="/services/:serviceId/upload/:docId" 
              element={
                <UserRoute>
                  <UploadPage />
                </UserRoute>
              } 
            />
            <Route
              path="/appointment/:appointmentId/upload/:docId" 
              element={
                <UserRoute>
                  <UploadPage />
                </UserRoute>
              } 
            />
            <Route 
              path="/booking/:appointmentId" 
              element={
                <UserRoute>
                  <AppointmentBookingPage />
                </UserRoute>
              } 
            />
            <Route 
              path="/services/:serviceId/payment" 
              element={
                <UserRoute>
                  <PaymentPage />
                </UserRoute>
              } 
            />
            <Route 
              path="/services/:serviceId/booking" 
              element={
                <UserRoute>
                  <AppointmentBookingPage />
                </UserRoute>
              } 
            />
            <Route 
              path="/services/:serviceId/confirmation" 
              element={
                <UserRoute>
                  <AppointmentConfirmationPage />
                </UserRoute>
              } 
            />
            <Route 
              path="/services/:serviceId/qr-code" 
              element={
                <UserRoute>
                  <QRCodePage />
                </UserRoute>
              } 
            />

            {/* User Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <UserRoute>
                  <DashboardPage />
                </UserRoute>
              } 
            />
            <Route 
              path="/activities/*" 
              element={
                <UserRoute>
                  <ActivitiesPage />
                </UserRoute>
              } 
            />

            <Route 
              path="/sub-services"
              element={
                <SubServicesPage/>
              }
            />

            <Route 
              path="/admin" 
              element={
                <AdminRoute>
                  <AdminPage />
                </AdminRoute>
              } 
            />
            
            {/* Additional User Routes */}
            <Route 
              path="/messages" 
              element={
                <UserRoute>
                  <MessagesPage />
                </UserRoute>
              } 
            />
            <Route 
              path="/new-application" 
              element={
                <UserRoute>
                  <NewApplicationPage />
                </UserRoute>
              } 
            />
            <Route 
              path="/appointments" 
              element={
                <UserRoute>
                  <AppointmentsPage />
                </UserRoute>
              } 
            />
            <Route 
              path="/chatbot" 
              element={
                //<ProtectedRoute>
                  <ChatbotPage />
                //</ProtectedRoute>
              } 
            />
            <Route 
              path="/contact-us" 
              element={
                // <ProtectedRoute>
                  <ContactUsPage />
                // </ProtectedRoute>
              } 
            />
            <Route 
              path="/contact-success" 
              element={
                <UserRoute>
                  <ContactUsSuccessPage />
                </UserRoute>
              } 
            />
            <Route 
              path="/document-upload/:serviceId" 
              element={
                <UserRoute>
                  <DocumentUploadPage />
                </UserRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                //<ProtectedRoute>
                  <ProfilePage />
                //</ProtectedRoute>
              } 
            />
            <Route 
              path="/ongoing-activities" 
              element={
                // <ProtectedRoute>
                  <OngoingActivitiesPage />
                // </ProtectedRoute>
              } 
            />
            <Route 
              path="/appointment-details/:appointmentId" 
              element={
                // <ProtectedRoute>
                  <AppointmentDetailsPage />
                // </ProtectedRoute>
              } 
            />
            <Route 
              path="/incomplete-activities" 
              element={
                // <ProtectedRoute>
                  <IncompleteActivitiesPage />
                // </ProtectedRoute>
              } 
            />
            <Route 
              path="/previous-activities" 
              element={
                // <UserRoute>
                  <PreviousActivitiesPage />
                // </UserRoute>
              } 
            />
            <Route 
              path="/update-information" 
              element={
                // <UserRoute>
                  <UpdateInformationPage />
               // </UserRoute>
              } 
            />
            <Route 
              path="/analytics" 
              element={
                <UserRoute>
                  <AnalyticsDashboardPage />
                </UserRoute>
              } 
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/landing" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;