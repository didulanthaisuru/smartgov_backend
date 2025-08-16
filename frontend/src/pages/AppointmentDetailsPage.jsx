import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Menu, QrCode, MessageSquare, ArrowLeft, Calendar, Clock, DollarSign, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import AuthService from '../services/authService';
import AppointmentService from '../services/appointmentService';

const AppointmentDetailsPage = () => {
    const { appointmentId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const appointmentData = location.state?.appointmentData;

    const [appointmentDetails, setAppointmentDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointmentDetails = async () => {
            setIsLoading(true);
            try {
                // Get user ID from auth service
                const authData = AuthService.getAuthData();
                if (!authData?.userData?.id) {
                    throw new Error('User ID not found. Please login again.');
                }

                const userId = authData.userData.id;

                        const result = await AppointmentService.getOngoingAppointmentDetails(appointmentId, userId);
        
        if (!result.success) {
            throw new Error(result.error || 'Failed to fetch appointment details');
        }

        setAppointmentDetails(result.data);
        setError(null);
            } catch (err) {
                console.error("Failed to fetch appointment details:", err);
                setError(err.message || "Could not load appointment details.");
            } finally {
                setIsLoading(false);
            }
        };

        if (appointmentId) {
            fetchAppointmentDetails();
        }
    }, [appointmentId]);

    const handleUploadClick = (doc) => {
        navigate(`/appointment/${appointmentId}/upload/${doc.required_doc_id}`, {
            state: { documentDetails: doc }
        });
    };

    const getAccuracyColor = (accuracy) => {
        if (!accuracy) return 'text-gray-500';
        const value = parseFloat(accuracy);
        if (value < 70) return 'text-red-500';
        return 'text-green-600';
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Approved':
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'Rejected':
                return <XCircle className="w-4 h-4 text-red-500" />;
            case 'Pending':
                return <AlertCircle className="w-4 h-4 text-yellow-500" />;
            default:
                return <AlertCircle className="w-4 h-4 text-gray-500" />;
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Not set';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        if (!dateString) return 'Not set';
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8C3C2A] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading appointment details...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="text-red-500 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Details</h3>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button 
                        onClick={() => navigate('/ongoing-activities')}
                        className="bg-[#8C3C2A] text-white px-4 py-2 rounded-lg hover:bg-[#7A3424] transition-colors"
                    >
                        Back to Activities
                    </button>
                </div>
            </div>
        );
    }

    if (!appointmentDetails) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">No appointment details found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white shadow-2xl rounded-2xl overflow-hidden relative">
                <div className="h-[calc(100vh-2rem)] max-h-[812px] overflow-y-auto pb-28">
                    <Header />
                    
                    {/* Back Button */}
                    <div className="px-4 py-2">
                        <button 
                            onClick={() => navigate('/ongoing-activities')}
                            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            <span className="text-sm">Back to Activities</span>
                        </button>
                    </div>

                    <h2 className="text-lg font-semibold text-gray-800 text-center px-4 mb-4">
                        {appointmentDetails.service_name}
                    </h2>

                    <main className="px-4">
                        {/* Appointment Info Cards */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="bg-blue-50 rounded-lg p-3 text-center">
                                <Calendar className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                                <p className="text-xs text-gray-600">Appointment Date</p>
                                <p className="text-sm font-semibold text-gray-800">
                                    {formatDate(appointmentDetails.appointment_date)}
                                </p>
                            </div>
                            <div className="bg-green-50 rounded-lg p-3 text-center">
                                <DollarSign className="w-5 h-5 text-green-600 mx-auto mb-1" />
                                <p className="text-xs text-gray-600">Payment Amount</p>
                                <p className="text-sm font-semibold text-gray-800">
                                    Rs. {appointmentDetails.payment_amount?.toFixed(2) || '0.00'}
                                </p>
                            </div>
                        </div>

                        {/* Document Checklist */}
                        <div>
                            <div className="flex justify-between items-center my-3">
                                <h3 className="text-lg font-semibold text-black">Document Checklist</h3>
                                <QrCode className="w-6 h-6 text-gray-600" />
                            </div>
                            
                            <div className="w-full text-xs border rounded-lg overflow-hidden shadow-sm">
                                <div className="grid grid-cols-4 text-gray-600 text-center font-semibold border-b bg-gray-50 py-2">
                                    <div>Document name</div>
                                    <div>Uploaded Status</div>
                                    <div>Accuracy</div>
                                    <div>Document status</div>
                                </div>
                                
                                {appointmentDetails.required_documents?.map((doc) => {
                                    // Find corresponding uploaded document
                                    const uploadedDoc = appointmentDetails.uploaded_documents?.find(
                                        ud => ud.required_doc_id === doc.required_doc_id
                                    );
                                    
                                    return (
                                        <div key={doc.required_doc_id} className="grid grid-cols-4 items-center text-center border-b last:border-b-0 py-2 min-h-[60px] bg-white">
                                            <div className="font-semibold text-gray-800 px-1">{doc.doc_name}</div>
                                            <div>
                                                {uploadedDoc ? (
                                                    <div className="flex items-center justify-center">
                                                        <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                                                        <span className="text-xs text-green-600">Uploaded</span>
                                                    </div>
                                                ) : (
                                                    <button 
                                                        onClick={() => handleUploadClick(doc)} 
                                                        className="bg-[#F8CA92] text-black text-xs font-medium px-2 py-1.5 rounded-md flex items-center justify-center gap-1.5 mx-auto"
                                                    >
                                                        <span>📄</span>
                                                        <span>Upload</span>
                                                    </button>
                                                )}
                                            </div>
                                            <div>
                                                <span className={`font-semibold ${getAccuracyColor(uploadedDoc?.accuracy)}`}>
                                                    {uploadedDoc?.accuracy ? `${uploadedDoc.accuracy}%` : '-'}
                                                </span>
                                            </div>
                                            <div className="font-medium text-gray-700 flex items-center justify-center">
                                                {getStatusIcon(uploadedDoc?.doc_status)}
                                                <span className="ml-1 text-xs">{uploadedDoc?.doc_status || 'Pending'}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Process Steps */}
                        {appointmentDetails.sub_service_steps && appointmentDetails.sub_service_steps.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-black mb-3">Process Steps</h3>
                                <div className="space-y-3">
                                    {appointmentDetails.sub_service_steps.map((step, index) => (
                                        <div key={index} className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                                step.status ? 'bg-green-500' : 
                                                step.is_currently_happening ? 'bg-yellow-500' : 'bg-gray-300'
                                            }`}>
                                                {step.status ? (
                                                    <CheckCircle className="w-4 h-4 text-white" />
                                                ) : step.is_currently_happening ? (
                                                    <Clock className="w-4 h-4 text-white" />
                                                ) : (
                                                    <span className="text-xs text-white">{index + 1}</span>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className={`text-sm font-medium ${
                                                    step.is_currently_happening ? 'text-yellow-700' :
                                                    step.status ? 'text-green-700' : 'text-gray-600'
                                                }`}>
                                                    {step.step_name}
                                                </p>
                                                {step.is_currently_happening && (
                                                    <p className="text-xs text-yellow-600">Currently in progress</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Chat Support */}
                        <div className="mt-6">
                            <div className="flex justify-end">
                                <button 
                                    onClick={() => navigate('/chatbot')} 
                                    className="bg-[#FEF3E6] border border-black rounded-lg px-3 py-1.5 flex items-center gap-2 shadow-sm"
                                >
                                    <span className="text-sm font-medium">Chat</span>
                                    <MessageSquare className="w-5 h-5 text-black" strokeWidth={1.5} />
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AppointmentDetailsPage;
