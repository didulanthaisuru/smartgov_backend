import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, QrCode, MessageCircle } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';

const AdminTaskDetailsPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch appointment details from API
  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/api/v1/api/admin/dashboard-full/appointment_details/${taskId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setAppointmentData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching appointment details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (taskId) {
      fetchAppointmentDetails();
    }
  }, [taskId]);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Format time for display
  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Helper to get combined document status
  const getDocumentStatus = (requiredDoc, uploadedDocs) => {
    const uploadedDoc = uploadedDocs.find(doc => doc.required_doc_id === requiredDoc._id);
    if (uploadedDoc) {
      return {
        uploaded: true,
        accuracy: uploadedDoc.accuracy ? `${uploadedDoc.accuracy}%` : 'N/A',
        status: uploadedDoc.doc_status,
        fileName: uploadedDoc.file_name,
        filePath: uploadedDoc.file_path,
        uploadedDocId: uploadedDoc._id // Pass the uploaded doc ID
      };
    }
    return {
      uploaded: false,
      accuracy: '-',
      status: 'Not Uploaded',
      fileName: '',
      filePath: null,
      uploadedDocId: null // No ID if not uploaded
    };
  };
  
  // Handler for viewing a document
  const handleViewDocument = (filePath) => {
    if (!filePath) {
      console.error("File path is not available.");
      return;
    }
    const baseURL = 'http://127.0.0.1:8000';
    // Replace backslashes with forward slashes for a valid URL
    const correctedPath = filePath.replace(/\\/g, '/');
    const fullUrl = `${baseURL}/${correctedPath}`;
    
    console.log('Opening document:', fullUrl);
    window.open(fullUrl, '_blank', 'noopener,noreferrer');
  };

  // Handler for approving a document
  const handleApproveDocument = async (uploadedDocId) => {
    if (!uploadedDocId) {
      alert('Document ID is missing.');
      return;
    }
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/api/admin/dashboard-full/approve_document/${uploadedDocId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Failed to approve the document.');
      }

      setAppointmentData(currentData => {
        const updatedDocs = currentData.uploaded_documents.map(doc => {
          if (doc._id === uploadedDocId) {
            return { ...doc, doc_status: 'approved' };
          }
          return doc;
        });
        return { ...currentData, uploaded_documents: updatedDocs };
      });

      alert('Document approved successfully!');
    } catch (err) {
      console.error('Error approving document:', err);
      alert(err.message);
    }
  };

  // Other Handlers
  const handleApprove = () => {
    console.log('Task approved');
    navigate('/admin/tasks');
  };

  const handleDecline = () => {
    console.log('Task declined');
    navigate('/admin/tasks');
  };

  const handleChat = () => {
    console.log('Open chat');
  };

  // Loading, Error, and No Data States
  if (loading) {
    return (
      <div className="min-h-screen bg-white relative">
        <AdminHeader title="Loading..." setShowSidebar={setShowSidebar} />
        <div className="p-6 flex justify-center items-center h-screen">
          <div className="text-xl">Loading appointment details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white relative">
        <AdminHeader title="Error" setShowSidebar={setShowSidebar} />
        <div className="p-6 flex justify-center items-center h-screen">
          <div className="text-xl text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (!appointmentData) {
    return (
      <div className="min-h-screen bg-white relative">
        <AdminHeader title="No Data" setShowSidebar={setShowSidebar} />
        <div className="p-6 flex justify-center items-center h-screen">
          <div className="text-xl">No appointment data found.</div>
        </div>
      </div>
    );
  }

  const { appointment, required_documents, uploaded_documents } = appointmentData;

  // Main Component Render
  return (
    <div className="min-h-screen bg-white relative">
      <AdminSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <AdminHeader title="Birth Certificate Task Details" setShowSidebar={setShowSidebar} />

      <div className="p-6 space-y-6">
        <div className="max-w-2xl mx-auto bg-white">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-normal text-black mb-6">{appointment.user_name}</h2>
          </div>

          {/* User Details */}
          <div className="bg-blue-100 bg-opacity-50 rounded-xl p-4 mb-6">
            <h3 className="text-2xl font-normal text-black mb-2">User details</h3>
            <div className="space-y-2">
              <p className="text-lg font-normal text-black">User ID: {appointment.user_id}</p>
              <p className="text-lg font-normal text-black">Name: {appointment.user_name}</p>
            </div>
          </div>

          {/* Service Details */}
          <div className="bg-blue-100 bg-opacity-46 rounded-xl p-4 mb-6">
            <div className="bg-blue-200 bg-opacity-20 rounded-xl p-4 text-sm text-black leading-relaxed">
              <p><strong>Service:</strong> Birth Certificate Issue</p>
              <p><strong>Service ID:</strong> {appointment.sub_service_id}</p>
              <p><strong>Status:</strong> {appointment.is_fully_completed ? 'Completed' : 'In Progress'}</p>
              <p><strong>Confirmed:</strong> {appointment.appointment_confirmed ? 'Yes' : 'No'}</p>
            </div>
          </div>

          {/* Date and Time */}
          <div className="flex space-x-4 mb-6">
            <div className="flex-1">
              <div className="bg-orange-200 bg-opacity-50 rounded-xl p-3 flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-black" />
                <span className="text-sm font-normal text-black">Date</span>
              </div>
              <p className="text-sm text-red-500 mt-1">{formatDate(appointment.appointment_date)}</p>
            </div>
            <div className="flex-1">
              <div className="bg-orange-200 bg-opacity-50 rounded-xl p-3">
                <span className="text-sm font-normal text-black">Time</span>
              </div>
              <p className="text-sm text-red-500 mt-1">{formatTime(appointment.appoinment_time)}</p>
            </div>
          </div>

          {/* Service Steps */}
          <div className="mb-6">
             <h3 className="text-2xl font-normal text-black mb-4">Service Steps</h3>
             <div className="space-y-2">
               {appointment.sub_service_steps.map((step) => (
                 <div key={step.step_id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                   <span className="text-sm text-black">{step.step_name}</span>
                   <div className={`px-3 py-1 rounded text-xs ${
                     step.status ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-600'
                   }`}>
                     {step.status ? 'Completed' : 'Pending'}
                   </div>
                 </div>
               ))}
             </div>
           </div>

          {/* Document Checklist */}
          <div className="mb-6">
            <h3 className="text-2xl font-normal text-black mb-4">Document Checklist</h3>
            <div className="border border-black">
              <div className="grid grid-cols-4 border-b border-black text-xs font-semibold text-center bg-gray-50">
                <div className="p-2 border-r border-black">DOCUMENT NAME</div>
                <div className="p-2 border-r border-black">ACCURACY</div>
                <div className="p-2 border-r border-black">STATUS</div>
                <div className="p-2">ACTION</div>
              </div>
              {required_documents.map((doc) => {
                const docStatus = getDocumentStatus(doc, uploaded_documents);
                return (
                  <div key={doc._id} className="grid grid-cols-4 border-b border-gray-200 text-sm items-center">
                    <div className="p-2 border-r border-black">{doc.doc_name}</div>
                    <div className="p-2 border-r border-black text-center">{docStatus.accuracy}</div>
                    <div className="p-2 border-r border-black text-center">{docStatus.status}</div>
                    <div className="p-2 flex items-center justify-center space-x-2">
                      {docStatus.uploaded && (
                        <button onClick={() => handleViewDocument(docStatus.filePath)} className="bg-gray-200 px-2 py-1 rounded text-xs text-black hover:bg-gray-300">
                          View
                        </button>
                      )}
                      {docStatus.uploaded && docStatus.status.toLowerCase() === 'pending' && (
                        <button onClick={() => handleApproveDocument(docStatus.uploadedDocId)} className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600">
                          Approve
                        </button>
                      )}
                      {docStatus.uploaded && docStatus.status.toLowerCase() === 'approved' && (
                        <span className="text-xs font-semibold text-green-600">Approved</span>
                      )}
                      {!docStatus.uploaded && (
                        <span className="text-xs text-gray-400">N/A</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment Status */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-normal text-black">Payment Status</h3>
              <div className={`px-6 py-2 rounded ${appointment.payment_status ? 'bg-green-500' : 'bg-red-500'}`}>
                <span className="text-sm font-normal text-white">{appointment.payment_status ? 'Paid' : 'Unpaid'}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <button onClick={handleDecline} className="bg-red-500 text-white px-6 py-3 rounded-xl text-2xl font-normal hover:bg-red-600 transition-colors">
              Decline
            </button>
            <button onClick={handleChat} className="bg-orange-200 border border-black p-3 rounded-xl shadow-inner hover:bg-orange-300 transition-colors">
              <div className="flex flex-col items-center">
                <MessageCircle className="w-7 h-7 text-black mb-1" />
                <span className="text-sm text-black">Chat</span>
              </div>
            </button>
            <button onClick={handleApprove} className="bg-blue-400 text-white px-6 py-3 rounded-xl text-2xl font-normal hover:bg-blue-500 transition-colors">
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTaskDetailsPage;