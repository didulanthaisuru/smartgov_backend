import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Helper Icon Components
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

const QRCodePage = () => {
    const [showModal, setShowModal] = useState(true);
    const navigate = useNavigate();

    const qrCodeData = {
        code: '225V589A',
        service: 'Birth certificate issue/new',
        location: 'Kandy branch',
        date: '2025/08/06',
        time: '8.30',
        duration: '2 hrs'
    };

    const handleOkClick = (e) => {
        // Add click animation
        const button = e.target;
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);

        setTimeout(() => {
            setShowModal(false);
            console.log("Navigating back to services...");
            navigate('/services'); // Add this when using with router
        }, 300);
    };

    const handleBackToServices = () => {
        console.log("Back to services clicked");
        // navigate('/services'); // Add this when using with router
    };

    const handleSaveQR = () => {
        alert('QR Code saved to your device');
    };

    const handleShareQR = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Smart Gov Appointment QR Code',
                text: `Appointment QR Code: ${qrCodeData.code}`,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(`Appointment QR Code: ${qrCodeData.code}`)
                .then(() => alert('QR code details copied to clipboard'))
                .catch(() => alert('Unable to share QR code'));
        }
    };

    if (!showModal) {
        return (
            <div 
                className="mx-auto bg-black min-h-screen flex items-center justify-center p-4"
                style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
                <div 
                    className="bg-white relative overflow-hidden shadow-2xl rounded-3xl flex items-center justify-center"
                    style={{ width: '430px', height: '932px' }}
                >
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-800 mx-auto mb-4"></div>
                        <p className="text-lg text-gray-700">Returning to services...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div 
            className="mx-auto  min-h-screen flex items-center justify-center p-4"
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
                        <button className="p-2" onClick={handleBackToServices}>
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

                {/* QR Code Modal */}
                <div 
                    className="absolute inset-0 flex items-center justify-center px-6"
                    style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
                >
                    {/* Modal Container */}
                    <div 
                        className="bg-orange-100 rounded-3xl p-6 w-full max-w-sm shadow-2xl"
                        style={{ transform: 'translateY(-20px)' }}
                    >
                        {/* QR Code Display */}
                        <div className="flex justify-center mb-6">
                            <div className="w-48 h-48 bg-white rounded-2xl p-4 shadow-lg border border-gray-200">
                                {/* QR Code Pattern */}
                                <div className="w-full h-full bg-white rounded-lg flex items-center justify-center relative overflow-hidden border-2 border-gray-100">
                                    {/* QR Code pattern simulation */}
                                    <div className="absolute inset-2 grid grid-cols-12 gap-px">
                                        {Array.from({ length: 144 }, (_, i) => {
                                            // Create a more realistic QR pattern
                                            const isCorner = (i < 36 && i % 12 < 6) || 
                                                           (i < 36 && i % 12 > 5) || 
                                                           (i > 107 && i % 12 < 6);
                                            const isRandom = Math.random() > 0.4;
                                            return (
                                                <div
                                                    key={i}
                                                    className={`${
                                                        isCorner ? 'bg-black' : 
                                                        isRandom ? 'bg-black' : 'bg-white'
                                                    } ${i % 12 === 0 || i % 12 === 5 || i % 12 === 6 || i % 12 === 11 ? 'bg-black' : ''}`}
                                                ></div>
                                            );
                                        })}
                                    </div>
                                    {/* Corner squares (typical QR code markers) */}
                                    <div className="absolute top-1 left-1 w-8 h-8 border-2 border-black">
                                        <div className="w-full h-full border border-black m-1">
                                            <div className="w-2 h-2 bg-black m-1"></div>
                                        </div>
                                    </div>
                                    <div className="absolute top-1 right-1 w-8 h-8 border-2 border-black">
                                        <div className="w-full h-full border border-black m-1">
                                            <div className="w-2 h-2 bg-black m-1"></div>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-1 left-1 w-8 h-8 border-2 border-black">
                                        <div className="w-full h-full border border-black m-1">
                                            <div className="w-2 h-2 bg-black m-1"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* QR Code Reference */}
                        <div className="text-center mb-4">
                            <p className="text-lg font-semibold text-black">{qrCodeData.code}</p>
                        </div>

                        {/* Instructions */}
                        <div className="text-center mb-6">
                            <p className="text-base text-black leading-relaxed">
                                Use The QR Code when you meet the officer
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

export default QRCodePage;