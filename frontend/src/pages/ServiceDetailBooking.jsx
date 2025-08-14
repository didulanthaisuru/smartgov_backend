import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Menu, QrCode, MessageSquare } from 'lucide-react';

// Assume logoIcon is correctly imported from your assets
// import logoIcon from '../assets/images/logo2.png';

const ServiceDetailBooking = () => {
    // **MODIFIED**: Get both IDs from the URL parameters.
    const { mainServiceId, subServiceId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const subServiceName = location.state?.subServiceName || "Service Details";

    const [documents, setDocuments] = useState([]);
    const [paymentAmount, setPaymentAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!mainServiceId || !subServiceId) return;

        const fetchServiceDetails = async () => {
            setIsLoading(true);
            try {
                // **MODIFIED**: Use the correct URL with both IDs.
                const response = await axios.get(
                    `http://127.0.0.1:8000/services/${mainServiceId}/subservices/${subServiceId}`
                );
                
                setPaymentAmount(response.data.payment_amount || 0);

                const formattedDocs = response.data.required_docs.map(doc => ({
                    id: doc._id,
                    name: doc.doc_name,
                    description: doc.description,
                    status: 'pending', 
                    accuracy: '-',
                    documentStatus: 'Pending'
                }));
                setDocuments(formattedDocs);
                setError(null);

            } catch (err) {
                console.error("Failed to fetch service details:", err);
                setError("Could not load service details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchServiceDetails();
    }, [mainServiceId, subServiceId]); // Re-run effect if either ID changes

    const handleUploadClick = (docId) => navigate(`/upload/${docId}`);
    const handleBookAppointment = () => navigate(`/booking/${subServiceId}`);

    const getAccuracyColor = (accuracy) => {
        if (accuracy === '-') return 'text-gray-500';
        const value = parseFloat(accuracy);
        if (value < 70) return 'text-red-500';
        return 'text-green-600';
    };

    return (
        <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white shadow-2xl rounded-2xl overflow-hidden relative">
                <div className="h-[calc(100vh-2rem)] max-h-[812px] overflow-y-auto pb-28">
                    <header className="sticky top-0 bg-white bg-opacity-80 backdrop-blur-sm z-10 flex items-center justify-between p-4 border-b border-gray-200">
                        <button><Menu className="w-7 h-7 text-black" /></button>
                        <div className="text-center py-4">
                            <div className="w-14 h-14 mx-auto bg-gray-200 rounded-full"></div>
                            <h2 className="text-lg font-semibold text-gray-800">{subServiceName}</h2>
                        </div>
                    </header>

                    <main className="px-4">
                        <div>
                            <div className="flex justify-between items-center my-3">
                                <h3 className="text-lg font-semibold text-black">Document checklist</h3>
                                <QrCode className="w-6 h-6 text-gray-600" />
                            </div>

                            {isLoading && <p className="text-center text-gray-500 py-10">Loading details...</p>}
                            {error && <p className="text-center text-red-500 py-10">{error}</p>}

                            {!isLoading && !error && (
                                <div className="w-full text-xs border rounded-lg overflow-hidden shadow-sm">
                                    <div className="grid grid-cols-4 text-gray-600 text-center font-semibold border-b bg-gray-50 py-2">
                                        <div>Document name</div>
                                        <div>Uploaded Status</div>
                                        <div>Accuracy</div>
                                        <div>Document status</div>
                                    </div>
                                    {documents.map((doc) => (
                                        <div key={doc.id} className="grid grid-cols-4 items-center text-center border-b last:border-b-0 py-2 min-h-[60px] bg-white">
                                            <div className="font-semibold text-gray-800 px-1">{doc.name}</div>
                                            <div>
                                                <button onClick={() => handleUploadClick(doc.id)} className="bg-[#F8CA92] text-black text-xs font-medium px-2 py-1.5 rounded-md flex items-center justify-center gap-1.5 mx-auto">
                                                    <span>📄</span>
                                                    <span>Upload</span>
                                                </button>
                                            </div>
                                            <div>
                                                <span className={`font-semibold ${getAccuracyColor(doc.accuracy)}`}>{doc.accuracy}</span>
                                            </div>
                                            <div className="font-medium text-gray-700">{doc.documentStatus}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="mt-6">
                            <div className="text-center">
                                <p className="text-xl font-bold text-black">Total Payment - Rs. {paymentAmount.toFixed(2)}</p>
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