import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
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
import UpdateInformationPage from './pages/UpdateInformationPage';
import AnalyticsDashboardPage from './pages/AnalyticsDashboardPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminRegisterPage from './pages/admin/AdminRegisterPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';

// Public Route Component (redirect if authenticated)
const PublicRoute = ({ children }) => {
  const userRole = localStorage.getItem('userRole');
  if (userRole) {
    return <Navigate to={userRole === 'admin' ? '/admin/dashboard' : '/services'} replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
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
                <AdminRoute>
                  <AdminDashboardPage />
                </AdminRoute>
              } 
            />

            {/* User Protected Routes - Services as main dashboard */}
            <Route 
              path="/services" 
              element={
                <UserRoute>
                  <Services />
                </UserRoute>
              } 
            />
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
                <ProtectedRoute>
                  <AppointmentBookingPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/services/:serviceId/confirmation" 
              element={
                <ProtectedRoute>
                  <AppointmentConfirmationPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/services/:serviceId/qr-code" 
              element={
                <ProtectedRoute>
                  <QRCodePage />
                </ProtectedRoute>
              } 
            />

            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                // <ProtectedRoute>
                  <DashboardPage />
                // </ProtectedRoute>
              } 
            />
            <Route 
              path="/activities/*" 
              element={
                // <ProtectedRoute>
                  <ActivitiesPage />
                // </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                // <ProtectedRoute>
                  <AdminPage />
                // </ProtectedRoute>
              } 
            />
            
            {/* Additional routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/messages" 
              element={
                // <ProtectedRoute>
                  <MessagesPage />
                // </ProtectedRoute>
              } 
            />
            <Route 
              path="/new-application" 
              element={
                <ProtectedRoute>
                  <NewApplicationPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/appointments" 
              element={
                <ProtectedRoute>
                  <AppointmentsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/chatbot" 
              element={
                <ProtectedRoute>
                  <ChatbotPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/contact-us" 
              element={
                <ProtectedRoute>
                  <ContactUsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/contact-success" 
              element={
                <ProtectedRoute>
                  <ContactUsSuccessPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/document-upload/:serviceId" 
              element={
                <ProtectedRoute>
                  <DocumentUploadPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/ongoing-activities" 
              element={
                <ProtectedRoute>
                  <OngoingActivitiesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/incomplete-activities" 
              element={
                <ProtectedRoute>
                  <IncompleteActivitiesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/previous-activities" 
              element={
                <ProtectedRoute>
                  <PreviousActivitiesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/update-information" 
              element={
                <ProtectedRoute>
                  <UpdateInformationPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/analytics" 
              element={
                <ProtectedRoute>
                  <AnalyticsDashboardPage />
                </ProtectedRoute>
              } 
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
