import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import logoIcon from '../assets/images/figma/logo.png';

const QRCodePage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  
  const [showModal, setShowModal] = useState(true);

  const qrCodeData = {
    code: '225V589A',
    service: 'Birth certificate issue/new',
    location: 'Kandy branch',
    date: '2025/08/06',
    time: '8.30',
    duration: '2 hrs'
  };

  const handleOkClick = () => {
    setShowModal(false);
    navigate('/services');
  };

  const handleBackToServices = () => {
    navigate('/services');
  };

  const handleSaveQR = () => {
    // In a real app, this would save the QR code to device
    alert('QR Code saved to your device');
  };

  const handleShareQR = () => {
    // In a real app, this would share the QR code
    if (navigator.share) {
      navigator.share({
        title: 'Smart Gov Appointment QR Code',
        text: `Appointment QR Code: ${qrCodeData.code}`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`Appointment QR Code: ${qrCodeData.code}`)
        .then(() => alert('QR code details copied to clipboard'))
        .catch(() => alert('Unable to share QR code'));
    }
  };

  if (!showModal) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B3C2B] mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Returning to services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-white filter blur-sm">
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

        {/* Service Title */}
        <div className="px-4 py-4">
          <h2 className="text-2xl font-normal text-black">Birth Certificate new/issue</h2>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-black mx-0"></div>

        {/* Background Content (blurred) */}
        <div className="px-6 py-6">
          <div className="mb-6 text-center">
            <p className="text-sm text-[#8B3C2B]">Recommended date and time - 2025/08/07 10.30 time slot</p>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4">
            {['8.30', '10.30', '12.30', '2.30'].map((time, index) => (
              <div
                key={time}
                className={`py-3 px-4 rounded-xl text-sm text-center ${
                  index === 0 ? 'bg-[#F2622E] text-white' : 'bg-[#F8CA92] text-black'
                }`}
              >
                {time}
              </div>
            ))}
          </div>

          <div className="bg-[#D1E9F3] bg-opacity-50 rounded-xl p-4 mb-8">
            <div className="text-sm text-black leading-relaxed">
              <p><span className="font-medium">Service</span> - Birth certificate issue/new</p>
              <p><span className="font-medium">Location</span> - Kandy branch</p>
              <p><span className="font-medium">Date & Time</span> - 2025/08/06 8.30</p>
              <p><span className="font-medium">Expected Duration</span> - 2 hrs</p>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4 z-50">
        <div className="bg-[#F8CA92] bg-opacity-90 rounded-xl p-8 max-w-md w-full shadow-2xl border-2 border-orange-200">
          
          {/* QR Code Display */}
          <div className="flex justify-center mb-6">
            <div className="w-56 h-56 bg-white rounded-lg p-4 shadow-inner border border-gray-200">
              {/* QR Code Pattern - Simplified representation */}
              <div className="w-full h-full bg-gradient-to-br from-black via-gray-800 to-black rounded opacity-80 flex items-center justify-center relative overflow-hidden">
                {/* QR Code pattern simulation */}
                <div className="absolute inset-2 grid grid-cols-8 gap-px">
                  {Array.from({ length: 64 }, (_, i) => (
                    <div
                      key={i}
                      className={`${Math.random() > 0.5 ? 'bg-black' : 'bg-white'} rounded-sm`}
                    ></div>
                  ))}
                </div>
                {/* Center logo area */}
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center z-10 shadow-sm">
                  <img src={logoIcon} alt="Logo" className="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Reference */}
          <div className="text-center mb-6">
            <p className="text-sm font-medium text-black mb-2">QR Code: {qrCodeData.code}</p>
          </div>

          {/* Instructions */}
          <div className="text-center mb-6">
            <p className="text-sm text-black leading-relaxed">
              Use The QR Code when you meet the officer
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleSaveQR}
              className="w-full bg-blue-600 text-white py-3 rounded-xl text-sm font-normal hover:bg-blue-700 transition-colors"
            >
              Save QR Code
            </button>
            
            <button
              onClick={handleShareQR}
              className="w-full bg-green-600 text-white py-3 rounded-xl text-sm font-normal hover:bg-green-700 transition-colors"
            >
              Share QR Code
            </button>
          </div>

          {/* Appointment Summary */}
          <div className="bg-[#D1E9F3] bg-opacity-30 rounded-lg p-3 mb-6">
            <div className="text-xs text-black leading-relaxed space-y-1">
              <div className="flex justify-between">
                <span>Service:</span>
                <span>{qrCodeData.service}</span>
              </div>
              <div className="flex justify-between">
                <span>Date & Time:</span>
                <span>{qrCodeData.date} {qrCodeData.time}</span>
              </div>
              <div className="flex justify-between">
                <span>Location:</span>
                <span>{qrCodeData.location}</span>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-6 rounded">
            <p className="text-xs text-yellow-800">
              <span className="font-medium">Important:</span> Present this QR code to the officer during your appointment. 
              Keep it saved on your device or take a screenshot.
            </p>
          </div>

          {/* OK Button */}
          <div className="flex justify-center">
            <button
              onClick={handleOkClick}
              className="bg-[#8B3C2B] text-white px-8 py-3 rounded-xl text-sm font-normal hover:bg-[#7A3024] transition-colors shadow-lg"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodePage;
