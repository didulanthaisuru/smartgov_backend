import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Menu, ChevronDown, QrCode, MessageSquare } from 'lucide-react';

// Assume logoIcon is correctly imported from your assets
import logoIcon from '../assets/images/logo2.png';

const ServiceDetailBooking = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();

    // State for the document list, matching the data in the image
    const [documents, setDocuments] = useState([
        { id: 1, name: 'Doc 1', status: 'uploaded', accuracy: '86.36%', documentStatus: 'Pending' },
        { id: 2, name: 'Doc 2', status: 'pending', accuracy: '63.36%', documentStatus: 'Pending', note: '1 accuracy is too low, please resubmit' },
        { id: 3, name: 'Doc 3', status: 'uploaded', accuracy: '83.36%', documentStatus: 'Pending', note: 'Officer needs to be approved' },
        { id: 4, name: 'Doc 4', status: 'pending', accuracy: '-', documentStatus: 'Pending' },
        { id: 5, name: 'Doc 5', status: 'pending', accuracy: '80.36%', documentStatus: 'Pending' },
    ]);

    const handleUploadClick = (docId) => {
        navigate(`/services/${serviceId}/upload/${docId}`);
    };

    const handleBookAppointment = () => {
        navigate(`/services/${serviceId}/booking`);
    };

    // Helper function to determine the color of the accuracy text
    const getAccuracyColor = (accuracy) => {
        if (accuracy === '-') return 'text-gray-500';
        const value = parseFloat(accuracy);
        if (value < 70) return 'text-red-500';
        if (value < 85) return 'text-orange-500';
        return 'text-green-600';
    };

    return (
        // This outer div creates the desktop-friendly container
        <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">

            {/* This is the main component window, styled to look like a phone screen on desktop */}
            <div className="w-full max-w-sm bg-white shadow-2xl rounded-2xl overflow-hidden relative">

                {/* Main scrollable content area */}
                <div className="h-[calc(100vh-2rem)] max-h-[812px] overflow-y-auto pb-28">
                    {/* Header */}
                    <header className="sticky top-0 bg-white bg-opacity-80 backdrop-blur-sm z-10 flex items-center justify-between p-4 border-b border-gray-200">
                        <button>
                            <Menu className="w-7 h-7 text-black" />
                        </button>
                        <button className="flex items-center gap-1 border border-gray-400 rounded-md px-3 py-1.5 text-sm">
                            English
                            <ChevronDown className="w-5 h-5" />
                        </button>
                    </header>

                    <main className="px-4">
                        {/* Page Title */}
                        <div className="text-center py-4">
                            <img src={logoIcon} alt="Service Logo" className="w-14 h-14 mx-auto" />
                            <h2 className="text-black text-2xl font-semibold mt-2">Birth Certificate new/issue</h2>
                        </div>

                        {/* Document Checklist Section */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-lg font-semibold text-black">Document checklist</h3>
                                <QrCode className="w-6 h-6 text-gray-600" />
                            </div>

                            {/* Document Table */}
                            <div className="w-full text-xs border rounded-lg overflow-hidden shadow-sm">
                                {/* Table Header */}
                                <div className="grid grid-cols-4 text-gray-600 text-center font-semibold border-b bg-gray-50 py-2">
                                    <div>Document name</div>
                                    <div>Uploaded Status</div>
                                    <div>Accuracy</div>
                                    <div>Document status</div>
                                </div>
                                {/* Table Rows */}
                                {documents.map((doc) => (
                                    <div key={doc.id} className="grid grid-cols-4 items-center text-center border-b last:border-b-0 py-2 min-h-[60px] bg-white">
                                        <div className="font-semibold text-gray-800">{doc.name}</div>
                                        <div>
                                            {doc.status === 'uploaded' ? (
                                                <span className="font-medium text-gray-700">Uploaded</span>
                                            ) : (
                                                <button onClick={() => handleUploadClick(doc.id)} className="bg-[#FFF5E9] text-black text-xs font-medium px-2 py-1.5 rounded-md flex items-center justify-center gap-1.5 mx-auto">
                                                    <span>📄</span>
                                                    <span>Upload digital copy</span>
                                                </button>
                                            )}
                                        </div>
                                        <div>
                                            <span className={`font-semibold ${getAccuracyColor(doc.accuracy)}`}>{doc.accuracy}</span>
                                            {doc.note && <div className="text-[10px] text-red-500 mt-0.5 px-1">! {doc.note}</div>}
                                        </div>
                                        <div className="font-medium text-gray-700">{doc.documentStatus}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Total Payment & Chat Button */}
                        <div className="mt-6">
                            <div className="text-center">
                                <p className="text-xl font-bold text-black">Total Payment - Rs . 1800</p>
                            </div>
                            <div className="flex justify-end my-4">
                                <button onClick={() => navigate('/chatbot')} className="bg-[#FEF3E6] border border-black rounded-lg px-3 py-1.5 flex items-center gap-2 shadow-sm">
                                    <span className="text-sm font-medium">Chat</span>
                                    <MessageSquare className="w-5 h-5 text-black" strokeWidth={1.5} />
                                </button>
                            </div>
                        </div>
                    </main>
                </div>

                {/* "Book An Appointment" Button now positioned correctly */}
                <footer className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
                    <button onClick={handleBookAppointment} className="w-full bg-[#8B3C2B] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#7a3424] transition-colors shadow-lg">
                        Book An Appointment
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default ServiceDetailBooking;