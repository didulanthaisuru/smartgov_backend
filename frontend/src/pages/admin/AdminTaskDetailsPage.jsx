import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, QrCode, MessageCircle } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';

const AdminTaskDetailsPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(false);

  // Mock data for the task details
  const taskDetails = {
    id: taskId,
    name: 'Nimal Perera',
    nic: '200159346734',
    mobile: '+945678543',
    service: 'Birth certificate issue/new',
    location: 'Kandy branch',
    duration: '44 min',
    date: '08/08/2025',
    time: '08:30 a.m',
    paymentStatus: 'Paid'
  };

  const documents = [
    { id: 1, name: 'Doc 1', accuracy: '86.36%', uploaded: true },
    { id: 2, name: 'Doc 2', accuracy: '63.36%', uploaded: true },
    { id: 3, name: 'Doc 3', accuracy: '83.36%', uploaded: true },
    { id: 4, name: 'Doc 4', accuracy: '-', uploaded: false },
    { id: 5, name: 'Doc 5', accuracy: '80.36%', uploaded: true }
  ];

  const handleApprove = () => {
    // Handle approval logic
    console.log('Task approved');
    navigate('/admin/tasks');
  };

  const handleDecline = () => {
    // Handle decline logic
    console.log('Task declined');
    navigate('/admin/tasks');
  };

  const handleViewDocument = (docId) => {
    // Handle document view
    console.log('View document:', docId);
  };

  const handleChat = () => {
    // Handle chat functionality
    console.log('Open chat');
  };

  return (
    <div className="flex min-h-screen bg-white">
      <AdminSidebar />
      
      <div className="flex-1 ml-64">
        <AdminHeader />
        
        <div className="p-6">
          <div className="max-w-md mx-auto bg-white">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-normal text-black mb-4">
                Birth Certificate Admin
              </h1>
              
              <h2 className="text-4xl font-normal text-black mb-6">
                {taskDetails.name}
              </h2>
            </div>

            {/* Profile and QR */}
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <button
                  onClick={() => setShowQR(!showQR)}
                  className="p-2"
                >
                  <QrCode className="w-7 h-7 text-black" />
                </button>
              </div>
            </div>

            {/* User Details */}
            <div className="bg-blue-100 bg-opacity-50 rounded-xl p-4 mb-6">
              <h3 className="text-2xl font-normal text-black mb-2">User details</h3>
              <div className="space-y-2">
                <p className="text-2xl font-normal text-black">
                  NIC                 {taskDetails.nic}
                </p>
                <p className="text-2xl font-normal text-black">
                  Mobile            {taskDetails.mobile}
                </p>
              </div>
            </div>

            {/* Service Details */}
            <div className="bg-blue-100 bg-opacity-46 rounded-xl p-4 mb-6">
              <div className="bg-blue-200 bg-opacity-20 rounded-xl p-4">
                <div className="text-sm text-black leading-relaxed">
                  <p>Service                                   -       {taskDetails.service}</p>
                  <p>Location                                 -       {taskDetails.location}</p>
                  <p>Expected Duration                -       {taskDetails.duration}</p>
                </div>
              </div>
            </div>

            {/* Date and Time */}
            <div className="flex space-x-4 mb-6">
              <div className="flex-1">
                <div className="bg-orange-200 bg-opacity-50 rounded-xl p-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-normal text-black">Date:-</span>
                    <Calendar className="w-4 h-4 text-black" />
                  </div>
                </div>
                <p className="text-sm text-red-500 mt-1">{taskDetails.date}</p>
              </div>
              
              <div className="flex-1">
                <div className="bg-orange-200 bg-opacity-50 rounded-xl p-3">
                  <span className="text-sm font-normal text-black">Time:-</span>
                </div>
                <p className="text-sm text-red-500 mt-1">{taskDetails.time}</p>
              </div>
            </div>

            {/* Document Checklist */}
            <div className="mb-6">
              <h3 className="text-2xl font-normal text-black mb-4">Document checklist</h3>
              
              {/* Table Header */}
              <div className="bg-orange-200 h-9 rounded-none mb-2"></div>
              
              {/* Table Content */}
              <div className="border border-black">
                {/* Header Row */}
                <div className="grid grid-cols-4 border-b border-black text-sm">
                  <div className="p-2 border-r border-black">
                    <div className="text-xs text-black">Document</div>
                    <div className="text-xs text-black">name</div>
                  </div>
                  <div className="p-2 border-r border-black">
                    <div className="text-xs text-black">Uploaded</div>
                    <div className="text-xs text-black">Status</div>
                  </div>
                  <div className="p-2 border-r border-black">
                    <div className="text-xs text-black">Accuracy</div>
                  </div>
                  <div className="p-2">
                    <div className="text-xs text-black">Document</div>
                    <div className="text-xs text-black">status</div>
                  </div>
                </div>

                {/* Data Rows */}
                {documents.map((doc, index) => (
                  <div key={doc.id} className={`grid grid-cols-4 ${index < documents.length - 1 ? 'border-b border-gray-300' : ''}`}>
                    <div className="p-2 border-r border-black text-sm text-black">
                      {doc.name}
                    </div>
                    <div className="p-2 border-r border-black">
                      <button
                        onClick={() => handleViewDocument(doc.id)}
                        className="bg-orange-200 px-2 py-1 rounded text-xs text-black hover:bg-orange-300 transition-colors"
                      >
                        View
                      </button>
                    </div>
                    <div className="p-2 border-r border-black text-xs text-black">
                      {doc.accuracy}
                    </div>
                    <div className="p-2 flex justify-center">
                      <div className="w-5 h-5 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Status */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-normal text-black">Payment Status</h3>
                <div className="bg-green-500 px-6 py-2 rounded">
                  <span className="text-sm font-normal text-white">{taskDetails.paymentStatus}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={handleDecline}
                className="bg-red-500 text-white px-6 py-3 rounded-xl text-2xl font-normal hover:bg-red-600 transition-colors"
              >
                Decline
              </button>
              
              <button
                onClick={handleChat}
                className="bg-orange-200 border border-black p-3 rounded-xl shadow-inner hover:bg-orange-300 transition-colors"
              >
                <div className="flex flex-col items-center">
                  <MessageCircle className="w-7 h-7 text-black mb-1" />
                  <span className="text-sm text-black">Chat</span>
                </div>
              </button>
              
              <button
                onClick={handleApprove}
                className="bg-blue-400 text-white px-6 py-3 rounded-xl text-2xl font-normal hover:bg-blue-500 transition-colors"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTaskDetailsPage;
