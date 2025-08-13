import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import logoIcon from '../assets/images/figma/logo.png';

const ServiceDetailBooking = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Doc 1', status: 'uploaded', accuracy: '86.36%', documentStatus: 'pending' },
    { id: 2, name: 'Doc 2', status: 'pending', accuracy: '63.36%', documentStatus: 'pending' },
    { id: 3, name: 'Doc 3', status: 'uploaded', accuracy: '83.36%', documentStatus: 'pending' },
    { id: 4, name: 'Doc 4', status: 'pending', accuracy: '-', documentStatus: 'pending' },
    { id: 5, name: 'Doc 5', status: 'pending', accuracy: '80.36%', documentStatus: 'pending' }
  ]);

  const handleUploadClick = (docId) => {
    navigate(`/services/${serviceId}/upload/${docId}`);
  };

  const handleBookAppointment = () => {
    navigate(`/services/${serviceId}/booking`);
  };

  const getAccuracyColor = (accuracy) => {
    if (accuracy === '-') return 'text-black';
    const value = parseFloat(accuracy);
    if (value < 70) return 'text-red-500';
    if (value < 80) return 'text-orange-500';
    return 'text-black';
  };

  const getStatusMessage = (accuracy) => {
    if (accuracy === '-') return '';
    const value = parseFloat(accuracy);
    if (value < 70) return 'accuracy is too low, please resubmit';
    if (value < 85) return 'Officer needs to be approved.';
    return '';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <button 
          onClick={() => navigate('/services')}
          className="w-9 h-9 flex items-center justify-center"
        >
          <img src={logoIcon} alt="Back" className="w-full h-full object-contain" />
        </button>

        <div className="flex items-center">
          <img src={logoIcon} alt="Logo" className="w-15 h-20 mr-4" />
          <h1 className="text-2xl font-medium text-black">Smart Gov</h1>
        </div>

        <div className="flex items-center bg-white bg-opacity-20 border border-black rounded-xl px-4 py-2">
          <span className="text-sm font-normal text-black mr-2">English</span>
          <img src={logoIcon} alt="Language" className="w-6 h-6" />
        </div>
      </div>

      {/* Service Title */}
      <div className="px-5 py-4">
        <h2 className="text-2xl font-normal text-black">Birth Certificate new/issue</h2>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-black mx-0"></div>

      {/* Document Checklist Section */}
      <div className="px-7 py-4">
        <h3 className="text-2xl font-normal text-black mb-4">Document checklist</h3>
        
        {/* Orange header bar */}
        <div className="bg-[#F8CA92] bg-opacity-50 rounded-xl px-4 py-2 mb-4">
          <div className="text-center text-black opacity-60">Document verification in progress</div>
        </div>

        {/* Document Table */}
        <div className="bg-white border border-black">
          {/* Table Header */}
          <div className="grid grid-cols-4 border-b border-black">
            <div className="p-3 border-r border-black">
              <span className="text-sm font-normal text-black">Document name</span>
            </div>
            <div className="p-3 border-r border-black">
              <span className="text-sm font-normal text-black">Uploaded Status</span>
            </div>
            <div className="p-3 border-r border-black">
              <span className="text-sm font-normal text-black">Accuracy</span>
            </div>
            <div className="p-3">
              <span className="text-sm font-normal text-black">Document status</span>
            </div>
          </div>

          {/* Table Rows */}
          {documents.map((doc, index) => (
            <div key={doc.id}>
              <div className="grid grid-cols-4 border-b border-gray-200">
                <div className="p-3 border-r border-gray-200">
                  <span className="text-sm font-normal text-black">{doc.name}</span>
                </div>
                <div className="p-3 border-r border-gray-200">
                  {doc.status === 'uploaded' ? (
                    <span className="text-xs font-normal text-black">Uploaded</span>
                  ) : (
                    <button
                      onClick={() => handleUploadClick(doc.id)}
                      className="bg-[#F8CA92] rounded-xl px-4 py-1 text-xs text-black border border-gray-300"
                    >
                      Upload digital copy
                      <span className="block text-xs">📄</span>
                    </button>
                  )}
                </div>
                <div className="p-3 border-r border-gray-200">
                  <span className={`text-xs font-normal ${getAccuracyColor(doc.accuracy)}`}>
                    {doc.accuracy}
                  </span>
                  {getStatusMessage(doc.accuracy) && (
                    <div className="text-[8px] text-red-500 mt-1">
                      !{getStatusMessage(doc.accuracy)}
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <span className="text-xs font-normal text-black capitalize">{doc.documentStatus}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Section */}
        <div className="mt-6 text-center">
          <p className="text-2xl font-normal text-black mb-6">
            Total Payment - Rs. 1800
          </p>
        </div>

        {/* QR Code */}
        <div className="flex justify-end mb-6">
          <div className="w-6 h-6 border border-black flex items-center justify-center">
            <div className="w-4 h-4 bg-black opacity-30"></div>
          </div>
        </div>

        {/* Book Appointment Button */}
        <div className="flex justify-center">
          <button
            onClick={handleBookAppointment}
            className="bg-[#8B3C2B] text-white px-16 py-4 rounded-xl text-2xl font-normal hover:bg-[#7A3024] transition-colors"
          >
            Book An Appointment
          </button>
        </div>

        {/* Chat Button */}
        <div className="fixed bottom-6 right-6">
          <button className="bg-[#F8CA92] border border-black rounded-xl px-4 py-3 shadow-inner flex items-center">
            <span className="text-sm font-normal text-black mr-2">Chat</span>
            <div className="w-7 h-7 bg-gray-300 rounded"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailBooking;
