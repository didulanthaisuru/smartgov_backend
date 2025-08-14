import React from 'react';
import { useNavigate } from 'react-router-dom';

// Helper Icon Components
const ConfirmationIcon = () => (
    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
    </div>
);

const MenuIcon = () => (
    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
);

const DropdownIcon = () => (
    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
    </svg>
);

const AppointmentConfirmationPage = () => {
    const navigate = useNavigate();
    // Hardcoded appointment data matching your original code
    const appointmentData = {
        service: 'Birth certificate issue/new',
        location: 'Kandy branch',
        date: '2025/08/06',
        time: '8.30',
        duration: '2 hrs'
    };

    // Handle OK button click with animation
    const handleOkClick = (e) => {
        console.log("Navigating to QR code page.");
        
        // Add click animation
        const button = e.target;
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);

        // Simulate navigation - replace with your actual navigation logic
        setTimeout(() => {
             
         navigate('/services/:serviceId/qr-code');
        }, 300);
    };

    return (
        <div 
            className="mx-auto bg-gray-100 min-h-screen flex items-center justify-center p-4"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
        >
            {/* iPhone 14 Pro Max Container */}
            <div 
                className="bg-white relative overflow-hidden shadow-2xl rounded-3xl"
                style={{ width: '430px', height: '932px' }}
            >
                {/* Blurred Background Content */}
                <div 
                    className="absolute inset-0"
                    style={{ filter: 'blur(2px)', WebkitFilter: 'blur(2px)' }}
                >
                    {/* Header */}
                    <header className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
                        <button className="p-2">
                            <MenuIcon />
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-orange-400 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">S</span>
                            </div>
                            <h1 className="text-xl font-semibold text-gray-800">Smart Gov</h1>
                        </div>
                        <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2">
                            <span className="text-sm text-gray-700">English</span>
                            <DropdownIcon />
                        </div>
                    </header>

                    {/* Page Title */}
                    <div className="px-4 py-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Birth Certificate <span className="text-gray-500 font-normal">new/issue</span>
                        </h2>
                    </div>

                    {/* Blurred Content Area */}
                    <div className="p-4 space-y-4">
                        <div className="h-20 bg-gray-100 rounded-xl"></div>
                        <div className="h-40 bg-gray-100 rounded-xl"></div>
                        <div className="h-24 bg-gray-100 rounded-xl"></div>
                        <div className="h-16 bg-red-200 rounded-xl"></div>
                        <div className="h-32 bg-gray-50 rounded-xl"></div>
                        <div className="h-20 bg-gray-100 rounded-xl"></div>
                    </div>
                </div>

                {/* Modal Overlay */}
                <div 
                    className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center px-6"
                    style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
                >
                    {/* Modal Container */}
                    <div 
                        className="bg-orange-100 rounded-3xl p-8 w-full max-w-sm shadow-2xl"
                        style={{ transform: 'translateY(-20px)' }}
                    >
                        {/* Modal Title */}
                        <h2 className="text-xl font-semibold text-gray-800 mb-8 text-center">
                            Appointment Details
                        </h2>

                        {/* Appointment Details Box */}
                        <div className="bg-white bg-opacity-60 rounded-xl p-6 mb-8">
                            <div 
                                className="text-base"
                                style={{ 
                                    display: 'grid', 
                                    gridTemplateColumns: 'auto 1fr', 
                                    gap: '8px 12px',
                                    alignItems: 'start'
                                }}
                            >
                                <span className="font-medium text-gray-700">Service</span>
                                <span className="text-gray-900">: {appointmentData.service}</span>
                                
                                <span className="font-medium text-gray-700">Location</span>
                                <span className="text-gray-900">: {appointmentData.location}</span>
                                
                                <span className="font-medium text-gray-700">Date & Time</span>
                                <span className="text-gray-900">: {appointmentData.date} {appointmentData.time}</span>
                                
                                <span className="font-medium text-gray-700 leading-tight">Expected Duration</span>
                                <span className="text-gray-900">: {appointmentData.duration}</span>
                            </div>
                        </div>
                        
                        {/* Confirmation Status */}
                        <div className="flex items-center justify-center gap-3 mb-8">
                            <ConfirmationIcon />
                            <p className="text-lg font-semibold text-gray-900">
                                Appointment confirmed
                            </p>
                        </div>

                        {/* OK Button */}
                        <div className="flex justify-center">
                            <button
                                onClick={handleOkClick}
                                className="bg-red-800 text-white font-medium px-12 py-3 rounded-xl hover:bg-red-900 transition-all duration-200 shadow-lg text-lg active:scale-95"
                                onTouchStart={(e) => e.target.style.opacity = '0.8'}
                                onTouchEnd={(e) => setTimeout(() => e.target.style.opacity = '1', 100)}
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

export default AppointmentConfirmationPage;