import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Calendar, QrCode, MessageCircle } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import axios from 'axios';

const AdminTaskDetailsPage = () => {
  const { taskId } = useParams(); // This is appointment_id
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [adminInfo, setAdminInfo] = useState(null);
  const [documents, setDocuments] = useState([]);

  // Fetch all required data with better error handling
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Starting data fetch for appointment ID:', taskId);
        console.log('User object:', user);
        
        // Check if user exists and has required fields
        if (!user) {
          setError('User not authenticated. Please log in.');
          return;
        }

        const adminId = user.admin_id || user.id || user._id;
        console.log('Using admin ID:', adminId);

        if (!adminId) {
          setError('Admin ID not found in user object');
          return;
        }
        
        // Step 1: Get admin info first
        try {
          console.log(`Making request to: /api/admin/dashboard/admin_service_info/${adminId}`);
          
          const adminResponse = await axios.get(`/api/admin/dashboard/admin_service_info/${adminId}`);
          console.log('Admin API Response:', adminResponse);
          console.log('Admin Info Data:', adminResponse.data);
          
          setAdminInfo(adminResponse.data);
          
          // Step 2: Get appointments for this sub-service
          if (adminResponse.data?.service_id) {
            console.log('Found service_id:', adminResponse.data.service_id);
            await fetchAppointmentData(adminResponse.data.service_id);
          } else {
            setError('Service ID not found in admin information');
          }
          
        } catch (adminError) {
          console.error('Admin API Error:', adminError);
          console.error('Admin Error Response:', adminError.response);
          
          if (adminError.response?.status === 404) {
            setError(`Admin not found with ID: ${adminId}. Please check if the admin ID is correct.`);
          } else if (adminError.response?.status === 401) {
            setError('Authentication failed. Please log in again.');
          } else if (adminError.response?.data) {
            // Server returned an error response
            setError(`Server error: ${adminError.response.data.detail || adminError.response.data.message || 'Unknown error'}`);
          } else if (adminError.message.includes('Unexpected token')) {
            setError('API endpoint returned HTML instead of JSON. Check if the API server is running and the endpoint exists.');
          } else {
            setError(`Network error: ${adminError.message}`);
          }
        }
        
      } catch (error) {
        console.error('Error in fetchAllData:', error);
        setError(`Unexpected error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (taskId) {
      fetchAllData();
    }
  }, [taskId, user]);

  const fetchAppointmentData = async (subServiceId) => {
    try {
      console.log(`Making request to: /api/admin/dashboard/appointments_by_subservice/${subServiceId}`);
      
      // Get all appointments for this sub-service
      const appointmentsResponse = await axios.get(`/api/admin/dashboard/appointments_by_subservice/${subServiceId}`);
      console.log('Appointments API Response:', appointmentsResponse);
      console.log('Appointments Data:', appointmentsResponse.data);
      
      const appointments = appointmentsResponse.data.appointments;
      
      if (!appointments || !Array.isArray(appointments)) {
        throw new Error('Invalid appointments data received from server');
      }
      
      console.log('All appointments:', appointments);
      console.log('Looking for appointment with ID:', taskId);
      
      // Find the specific appointment
      const targetAppointment = appointments.find(apt => {
        console.log('Checking appointment:', apt.appointment_id, apt._id);
        return apt.appointment_id === taskId || 
               apt._id === taskId ||
               String(apt.appointment_id) === String(taskId) ||
               String(apt._id) === String(taskId);
      });

      if (!targetAppointment) {
        const availableIds = appointments.map(apt => apt.appointment_id || apt._id).join(', ');
        throw new Error(`Appointment with ID ${taskId} not found. Available appointments: ${availableIds}`);
      }

      console.log('Found target appointment:', targetAppointment);

      // Set appointment data
      setAppointmentData({
        id: targetAppointment.appointment_id || targetAppointment._id,
        user_name: targetAppointment.user_name || 'Unknown User',
        user_nic: targetAppointment.appointment_user_nic || targetAppointment.nic || 'Unknown',
        user_mobile: targetAppointment.appointment_user_mobile_number || targetAppointment.mobile || 'Unknown',
        sub_service_name: adminInfo?.service_name || 'Unknown Service',
        appointment_date: targetAppointment.appointment_date,
        appointment_time: targetAppointment.appoinment_time || targetAppointment.appointment_time,
        predicted_duration: targetAppointment.predicted_duration,
        payment_status: targetAppointment.payment_status || false,
        appointment_confirmed: targetAppointment.appointment_confirmed || false,
        branch_name: targetAppointment.branch_name || 'Main Branch'
      });

      // Step 3: Get required documents for this sub-service
      await fetchDocumentsData(subServiceId, targetAppointment.appointment_id || targetAppointment._id);

    } catch (error) {
      console.error('Error in fetchAppointmentData:', error);
      console.error('Error response:', error.response);
      
      if (error.response?.status === 404) {
        throw new Error(`Sub-service not found with ID: ${subServiceId}`);
      } else if (error.message.includes('Unexpected token')) {
        throw new Error('Appointments API returned HTML instead of JSON. Check if the endpoint exists.');
      } else {
        throw error;
      }
    }
  };

  const fetchDocumentsData = async (subServiceId, appointmentId) => {
    try {
      // Get required documents for this sub-service
      const documentsResponse = await axios.get(`/api/admin/dashboard/required_documents/${subServiceId}`);
      const requiredDocs = documentsResponse.data.documents;
      console.log('Required documents:', requiredDocs);

      // For each required document, check if it's uploaded
      const documentPromises = requiredDocs.map(async (doc) => {
        try {
          console.log(`Checking uploaded document for doc_id: ${doc._id}, appointment_id: ${appointmentId}`);
          
          // Try to get uploaded document
          const uploadedResponse = await axios.get(
            `/api/admin/dashboard/uploaded_document/${doc._id}/${appointmentId}`
          );
          const uploadedDoc = uploadedResponse.data.uploaded_document;
          console.log(`Uploaded document found for ${doc.doc_name}:`, uploadedDoc);
          
          return {
            doc_id: doc._id,
            doc_name: doc.doc_name,
            description: doc.description || '',
            uploaded: true,
            accuracy: uploadedDoc.accuracy,
            status: uploadedDoc.doc_status || 'Unknown',
            uploaded_doc_id: uploadedDoc._id,
            file_path: uploadedDoc.file_path
          };
          
        } catch (uploadError) {
          // Document not uploaded or error fetching
          console.log(`No uploaded document found for ${doc.doc_name}`);
          return {
            doc_id: doc._id,
            doc_name: doc.doc_name,
            description: doc.description || '',
            uploaded: false,
            accuracy: null,
            status: 'Not Uploaded',
            uploaded_doc_id: null,
            file_path: null
          };
        }
      });

      const processedDocuments = await Promise.all(documentPromises);
      console.log('Processed documents:', processedDocuments);
      setDocuments(processedDocuments);

    } catch (error) {
      console.error('Error fetching documents data:', error);
      throw error;
    }
  };

  // Helper functions for formatting
  const formatDuration = (duration) => {
    if (!duration) return 'N/A';
    
    if (typeof duration === 'number') {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    }
    
    if (typeof duration === 'object' && duration.hour !== undefined) {
      return `${duration.hour}h ${duration.minute}m`;
    }
    
    return duration.toString();
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    
    try {
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString('en-GB');
    } catch {
      return date.toString();
    }
  };

  const formatTime = (time) => {
    if (!time) return 'N/A';
    
    try {
      if (typeof time === 'string') {
        return time;
      }
      
      if (typeof time === 'object' && time.hour !== undefined) {
        const period = time.hour >= 12 ? 'PM' : 'AM';
        const hour12 = time.hour % 12 || 12;
        return `${hour12}:${time.minute.toString().padStart(2, '0')} ${period}`;
      }
      
      const timeObj = new Date(time);
      return timeObj.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } catch {
      return time.toString();
    }
  };

  const handleApprove = async () => {
    try {
      setLoading(true);
      
      console.log('Approving appointment:', taskId);
      
      // Approve all uploaded documents individually
      const uploadedDocs = documents.filter(doc => doc.uploaded && doc.uploaded_doc_id);
      
      if (uploadedDocs.length > 0) {
        const approvalPromises = uploadedDocs.map(doc => 
          axios.put(`/api/admin/dashboard/approve_document/${doc.uploaded_doc_id}`)
        );
        
        await Promise.all(approvalPromises);
        console.log('All documents approved');
      }
      
      alert('Appointment and all documents approved successfully!');
      navigate('/admin/tasks');
      
    } catch (error) {
      console.error('Error approving appointment:', error);
      setError('Failed to approve appointment');
      setLoading(false);
    }
  };

  const handleDecline = async () => {
    try {
      const reason = prompt('Please provide a reason for declining:');
      if (!reason) {
        return;
      }
      
      setLoading(true);
      
      console.log('Declining appointment:', taskId, 'with reason:', reason);
      
      // For now, just log the decline action
      // You can implement a decline endpoint later if needed
      console.log('Appointment declined:', { appointmentId: taskId, reason });
      
      alert('Appointment declined successfully!');
      navigate('/admin/tasks');
      
    } catch (error) {
      console.error('Error declining appointment:', error);
      setError('Failed to decline appointment');
      setLoading(false);
    }
  };

  const handleViewDocument = (doc) => {
    if (doc.file_path) {
      window.open(doc.file_path, '_blank');
    } else {
      console.log('View document:', doc.doc_id);
      alert('Document file path not available');
    }
  };

  const handleChat = () => {
    console.log('Open chat for appointment:', taskId);
    alert('Chat functionality to be implemented');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white relative">
        <AdminSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <AdminHeader 
          title="Loading..."
          setShowSidebar={setShowSidebar}
        />
        <div className="p-6 flex items-center justify-center">
          <div className="text-lg">Loading appointment details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white relative">
        <AdminSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <AdminHeader 
          title="Error"
          setShowSidebar={setShowSidebar}
        />
        <div className="p-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {error}
          </div>
          <button 
            onClick={() => navigate('/admin/tasks')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Tasks
          </button>
        </div>
      </div>
    );
  }

  if (!appointmentData) {
    return (
      <div className="min-h-screen bg-white relative">
        <AdminSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <AdminHeader 
          title="Not Found"
          setShowSidebar={setShowSidebar}
        />
        <div className="p-6">
          <div className="text-red-500 mb-4">No appointment data found</div>
          <button 
            onClick={() => navigate('/admin/tasks')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Tasks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Admin Sidebar */}
      <AdminSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      
      {/* Header */}
      <AdminHeader 
        title={`${appointmentData.sub_service_name} Details`}
        setShowSidebar={setShowSidebar}
      />

      {/* Main Content */}
      <div className="p-6 space-y-6">
        <div className="max-w-2xl mx-auto bg-white">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-4xl font-normal text-black mb-6">
              {appointmentData.user_name}
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
                NIC                 {appointmentData.user_nic}
              </p>
              <p className="text-2xl font-normal text-black">
                Mobile            {appointmentData.user_mobile}
              </p>
            </div>
          </div>

          {/* Service Details */}
          <div className="bg-blue-100 bg-opacity-46 rounded-xl p-4 mb-6">
            <div className="bg-blue-200 bg-opacity-20 rounded-xl p-4">
              <div className="text-sm text-black leading-relaxed">
                <p>Service                                   -       {appointmentData.sub_service_name}</p>
                <p>Location                                 -       {appointmentData.branch_name}</p>
                <p>Expected Duration                -       {formatDuration(appointmentData.predicted_duration)}</p>
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
              <p className="text-sm text-red-500 mt-1">
                {formatDate(appointmentData.appointment_date)}
              </p>
            </div>
            
            <div className="flex-1">
              <div className="bg-orange-200 bg-opacity-50 rounded-xl p-3">
                <span className="text-sm font-normal text-black">Time:-</span>
              </div>
              <p className="text-sm text-red-500 mt-1">
                {formatTime(appointmentData.appointment_time)}
              </p>
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
              {documents.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  Loading documents...
                </div>
              ) : (
                documents.map((doc, index) => (
                  <div key={doc.doc_id} className={`grid grid-cols-4 ${index < documents.length - 1 ? 'border-b border-gray-300' : ''}`}>
                    <div className="p-2 border-r border-black text-sm text-black">
                      {doc.doc_name}
                    </div>
                    <div className="p-2 border-r border-black">
                      {doc.uploaded ? (
                        <button
                          onClick={() => handleViewDocument(doc)}
                          className="bg-orange-200 px-2 py-1 rounded text-xs text-black hover:bg-orange-300 transition-colors"
                        >
                          View
                        </button>
                      ) : (
                        <span className="text-xs text-red-500">Not uploaded</span>
                      )}
                    </div>
                    <div className="p-2 border-r border-black text-xs text-black">
                      {doc.accuracy ? `${Math.round(doc.accuracy)}%` : '-'}
                    </div>
                    <div className="p-2 flex justify-center">
                      <div className={`w-5 h-5 rounded ${
                        doc.uploaded ? 
                          (doc.status === 'approved' ? 'bg-green-500' : 'bg-yellow-500') : 
                          'bg-gray-300'
                      }`}></div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Payment Status */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-normal text-black">Payment Status</h3>
              <div className={`px-6 py-2 rounded ${
                appointmentData.payment_status ? 'bg-green-500' : 'bg-red-500'
              }`}>
                <span className="text-sm font-normal text-white">
                  {appointmentData.payment_status ? 'Paid' : 'Not Paid'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleDecline}
              disabled={loading}
              className="bg-red-500 text-white px-6 py-3 rounded-xl text-2xl font-normal hover:bg-red-600 transition-colors disabled:opacity-50"
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
              disabled={loading}
              className="bg-blue-400 text-white px-6 py-3 rounded-xl text-2xl font-normal hover:bg-blue-500 transition-colors disabled:opacity-50"
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTaskDetailsPage;