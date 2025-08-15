import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';

// Helper Icon Components
const MenuIcon = () => ( <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg> );
const DropdownIcon = () => ( <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg> );

const QRCodePage = () => {
    const navigate = useNavigate();
    const { appointmentId } = useParams();
    const location = useLocation();
    
    const appointmentData = location.state?.appointmentDetails || { service: 'N/A' };

    // **NEW**: Encode the appointmentId to Base64
    const base64AppointmentId = btoa(appointmentId);

    const handleOkClick = () => {
        navigate('/services');
    };

    return (
        <div className="mx-auto min-h-screen flex items-center justify-center p-4">
            <div className="bg-white relative overflow-hidden shadow-2xl rounded-3xl" style={{ width: '430px', height: '932px' }}>
                {/* Blurred Background */}
                <div className="absolute inset-0" style={{ filter: 'blur(2px)' }}>
                    <header className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
                        <button className="p-2"><MenuIcon /></button>
                        <div className="flex items-center gap-2"><div className="w-10 h-10 bg-orange-400 rounded-lg"></div><h1 className="text-xl font-semibold text-gray-800">Smart Gov</h1></div>
                        <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2"><span className="text-sm text-gray-700">English</span><DropdownIcon /></div>
                    </header>
                    <div className="px-4 py-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">{appointmentData.service}</h2>
                    </div>
                </div>

                {/* QR Code Modal */}
                <div className="absolute inset-0 flex items-center justify-center px-6" style={{ backdropFilter: 'blur(8px)' }}>
                    <div className="bg-orange-100 rounded-3xl p-6 w-full max-w-sm shadow-2xl">
                        <div className="flex justify-center mb-6">
                            <div className="w-48 h-48 bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
                                <QRCodeCanvas
                                    // **UPDATED**: Use the Base64 encoded ID for the QR code value
                                    value={base64AppointmentId} 
                                    size={176}
                                    bgColor={"#ffffff"}
                                    fgColor={"#000000"}
                                    level={"H"}
                                    includeMargin={false}
                                />
                            </div>
                        </div>
                        
                        <div className="text-center mb-6">
                            <p className="text-base text-black leading-relaxed">
                                Use The QR Code when you meet the officer
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={handleOkClick}
                                className="bg-red-800 text-white font-medium px-12 py-3 rounded-xl hover:bg-red-900 transition-all duration-200 shadow-lg text-lg active:scale-95"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRCodePage;