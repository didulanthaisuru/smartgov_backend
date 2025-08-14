import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import logoIcon from '../assets/images/figma/logo.png';

const BookingConfirmationPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const appointmentDetails = {
    applicationId: "APP-2025-001234",
    service: "Birth Certificate new/issue",
    amount: "Rs. 1800.00",
    paymentMethod: "Credit Card",
    appointmentDate: "August 20, 2025",
    appointmentTime: "10:30 AM",
    location: "District Secretariat Office, Colombo",
    officer: "Mr. K.P. Silva",
    referenceNumber: "REF-BC-20250813-001"
  };

  const handleBackToServices = () => {
    navigate('/services');
  };

  const handleViewStatus = () => {
    navigate(`/application-status/${appointmentDetails.applicationId}`);
  };

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    alert('Receipt download functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <button 
          onClick={handleBackToServices}
          className="w-9 h-9 flex items-center justify-center"
        >
          <img src={logoIcon} alt="Back" className="w-full h-full object-contain" />
        </button>

        <div className="flex items-center">
          <img src={logoIcon} alt="Logo" className="w-15 h-20 mr-4" />
          <h1 className="text-2xl font-medium text-black">Smart Gov</h1>
        </div>

        <div className="flex items-center bg-white bg-opacity-20 border border-black/50 rounded-xl px-4 py-2">
          <span className="text-sm font-normal text-black/50 mr-2">English</span>
          <img src={logoIcon} alt="Language" className="w-6 h-6 opacity-50" />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-normal text-black mb-4">Payment Successful!</h2>
          <p className="text-lg text-gray-600">Your application has been submitted successfully</p>
        </div>

        {/* Application Details Card */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-medium text-black mb-6 text-center">Application Details</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Application ID:</span>
              <span className="text-black font-medium">{appointmentDetails.applicationId}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Service:</span>
              <span className="text-black">{appointmentDetails.service}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Amount Paid:</span>
              <span className="text-black font-medium">{appointmentDetails.amount}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="text-black">{appointmentDetails.paymentMethod}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Reference Number:</span>
              <span className="text-black font-medium">{appointmentDetails.referenceNumber}</span>
            </div>
          </div>
        </div>

        {/* Appointment Details Card */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-medium text-black mb-6 text-center">Appointment Details</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="text-black font-medium">{appointmentDetails.appointmentDate}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="text-black font-medium">{appointmentDetails.appointmentTime}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="text-black">{appointmentDetails.location}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Officer:</span>
              <span className="text-black">{appointmentDetails.officer}</span>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-8">
          <h4 className="text-lg font-medium text-orange-800 mb-2">Important Notes:</h4>
          <ul className="text-sm text-orange-700 space-y-1">
            <li>• Please arrive 15 minutes before your appointment time</li>
            <li>• Bring all original documents for verification</li>
            <li>• Keep your reference number for future inquiries</li>
            <li>• You will receive SMS/Email updates about your application status</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleDownloadReceipt}
            className="w-full bg-[#8B3C2B] text-white py-4 rounded-xl text-lg font-normal hover:bg-[#7A3024] transition-colors"
          >
            Download Receipt
          </button>
          
          <button
            onClick={handleViewStatus}
            className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-normal hover:bg-blue-700 transition-colors"
          >
            Track Application Status
          </button>
          
          <button
            onClick={handleBackToServices}
            className="w-full border border-gray-300 text-gray-700 py-4 rounded-xl text-lg font-normal hover:bg-gray-50 transition-colors"
          >
            Back to Services
          </button>
        </div>

        {/* QR Code for Quick Access */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">Scan QR code for quick access to application status</p>
          <div className="flex justify-center">
            <div className="w-24 h-24 border-2 border-gray-300 rounded-lg flex items-center justify-center">
              <div className="w-20 h-20 bg-black opacity-10 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
