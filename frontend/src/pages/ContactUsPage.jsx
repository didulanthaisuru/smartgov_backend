import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

// User icon for the title
const UserIcon = () => (
    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

// Large checkmark for the success popup
const SuccessTickIcon = () => (
    <div className="w-24 h-24 bg-[#8B0000] rounded-full flex items-center justify-center shadow-lg">
        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
    </div>
);


// Main Contact Us Page Component
const ContactUsPage = () => {
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);
    const [language, setLanguage] = useState('English');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '', // Changed from NIC to Email as per the image
        contactNumber: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSend = (e) => {
        e.preventDefault(); // Prevent form from reloading the page
        console.log('Form data submitted:', formData);
        setShowSuccessPopup(true);
    };

    const handleCancel = () => {
        setFormData({ name: '', email: '', contactNumber: '', message: '' });
        console.log('Form cancelled and cleared.');
        navigate('/services'); // Navigate back to services
    };

    const handleClosePopup = () => {
        setShowSuccessPopup(false);
        // Reset form after successful submission
        setFormData({ name: '', email: '', contactNumber: '', message: '' });
        console.log('Popup closed and form reset.');
        navigate('/services'); // Navigate to services page after success
    };

    return (
        <div className="min-h-screen bg-[#F0F4F8] font-sans relative overflow-hidden">
            {/* Header Component */}
            <Header 
                title="Contact Us" 
                setShowSidebar={setShowSidebar}
                showLanguageSelector={true}
                language={language}
                onLanguageChange={setLanguage}
            />

            {/* Sidebar Component */}
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            
            {/* --- Decorative Background Circles --- */}
            <div className={`absolute -left-40 top-1/4 w-96 h-96 bg-blue-200/40 rounded-full transition-all duration-500 ${showSuccessPopup ? 'filter blur-xl' : 'filter blur-lg'}`}></div>
            <div className={`absolute -right-40 bottom-1/4 w-96 h-96 bg-orange-200/30 rounded-full transition-all duration-500 ${showSuccessPopup ? 'filter blur-xl' : 'filter blur-lg'}`}></div>

            <div className={`relative z-10 transition-filter duration-500 ${showSuccessPopup ? 'filter blur-md' : ''}`}>
                {/* --- Main Content --- */}
                <main className="px-6 py-8">
                    {/* Title Section */}
                    <div className="mb-8">
                        <div className="flex items-center space-x-3 mb-1">
                            <div className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center">
                                <UserIcon />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800">Contact Us</h1>
                        </div>
                        <p className="text-sm text-gray-500 ml-14">Contact Us for More Information</p>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 max-w-md mx-auto">
                        <form onSubmit={handleSend} className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text" name="name" value={formData.name} onChange={handleInputChange}
                                    placeholder="Enter Your Name Here" required
                                    className="w-full bg-[#FADEC9] rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-500 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#8B0000]/50 shadow-sm"
                                />
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email" name="email" value={formData.email} onChange={handleInputChange}
                                    placeholder="Enter the NIC number" required
                                    className="w-full bg-[#FADEC9] rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-500 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#8B0000]/50 shadow-sm"
                                />
                            </div>

                            {/* Contact Number Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                                <input
                                    type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange}
                                    placeholder="Enter the telephone number" required
                                    className="w-full bg-[#FADEC9] rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-500 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#8B0000]/50 shadow-sm"
                                />
                            </div>

                            {/* Message Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    name="message" value={formData.message} onChange={handleInputChange}
                                    placeholder="Enter your message here" rows={4} required
                                    className="w-full bg-[#FADEC9] rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-500 border border-transparent focus:outline-none focus:ring-2 focus:ring-[#8B0000]/50 shadow-sm resize-none"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-start space-x-4 pt-4">
                                <button
                                    type="submit"
                                    className="bg-[#8B0000] text-white font-semibold px-8 py-3 rounded-xl text-sm shadow-md hover:bg-opacity-90 active:scale-95 transition-all"
                                >
                                    Send
                                </button>
                                <button
                                    type="button" onClick={handleCancel}
                                    className="bg-gray-200 text-gray-700 font-semibold px-8 py-3 rounded-xl text-sm shadow-md hover:bg-gray-300 active:scale-95 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>

            {/* --- Success Popup Modal --- */}
            {showSuccessPopup && (
                <div className="absolute inset-0 z-20 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-sm text-center shadow-2xl flex flex-col items-center">
                        <SuccessTickIcon />
                        <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-2">
                            Sent
                        </h2>
                        <p className="text-sm text-gray-600 mb-8">
                            your message will be sent to the relevant authorities
                        </p>
                        <button
                            onClick={handleClosePopup}
                            className="bg-[#8B0000] text-white font-semibold px-12 py-3 rounded-xl hover:bg-opacity-90 active:scale-95 transition-all shadow-md"
                        >
                            Ok
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactUsPage;
