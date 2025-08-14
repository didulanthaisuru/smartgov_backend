import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, ChevronDown, Check, X } from 'lucide-react'; // Added Check and X icons

// --- Helper component for the Mastercard Icon ---
const MastercardIcon = () => (
    <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="12" r="9" fill="#EB001B"/>
        <circle cx="23" cy="12" r="9" fill="#F79E1B" fillOpacity="0.8"/>
    </svg>
);


const PaymentPage = () => {
    const navigate = useNavigate();
    
    const [paymentForm, setPaymentForm] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardHolder: ''
    });
    const [isProcessing, setIsProcessing] = useState(false);
    
    // --- State for the new popup modal ---
    const [showPopup, setShowPopup] = useState({
        visible: false,
        status: '', // 'success' or 'failed'
        message: ''
    });

    // --- Form handling and formatting logic ---
    const handleInputChange = (field, value) => {
        setPaymentForm(prev => ({ ...prev, [field]: value }));
    };

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const parts = [];
        for (let i = 0, len = v.length; i < 16; i += 4) {
            parts.push(v.substring(i, i + 4));
        }
        return parts.filter(Boolean).join(' ');
    };

    const formatExpiryDate = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
        }
        return v;
    };

    const handleCardNumberChange = (e) => {
        const formatted = formatCardNumber(e.target.value);
        handleInputChange('cardNumber', formatted);
    };

    const handleExpiryChange = (e) => {
        const formatted = formatExpiryDate(e.target.value);
        handleInputChange('expiryDate', formatted);
    };
    
    // --- Updated payment handler to show the popup ---
    const handlePayment = async () => {
        if (!paymentForm.cardNumber || !paymentForm.expiryDate || !paymentForm.cvv || !paymentForm.cardHolder) {
            alert('Please fill in all payment details');
            return;
        }
        setIsProcessing(true);
        
        // Simulate payment processing with random success/failure
        setTimeout(() => {
            setIsProcessing(false);
            const isSuccess = Math.random() > 0.2; // 80% success rate for simulation
            
            if (isSuccess) {
                setShowPopup({ visible: true, status: 'success', message: 'Payment Successful!' });
            } else {
                setShowPopup({ visible: true, status: 'failed', message: 'Payment Failed' });
            }
        }, 2000);
    };

    // --- Handler for closing the popup and navigating ---
    const handlePopupClose = () => {
        const status = showPopup.status;
        setShowPopup({ visible: false, status: '', message: '' }); // Hide popup
        if (status === 'success') {
            navigate(`/confirmation`); // Navigate on success
        }
        // On failure, do nothing, just close the modal so the user can try again.
    };

    return (
        <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white shadow-2xl rounded-2xl flex flex-col relative overflow-hidden">
                {/* Header */}
                <header className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-100">
                    <button><Menu className="w-7 h-7 text-black" /></button>
                    <span className="font-bold text-lg">Smart Gov</span>
                    <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm">
                        English <ChevronDown className="w-5 h-5" />
                    </button>
                </header>

                {/* Main Content */}
                <main className="flex-grow p-6">
                    <h1 className="text-3xl font-bold text-black mb-6">Payment</h1>
                    {/* ... (rest of the form JSX is unchanged) ... */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-700">Card details</h2>
                        <div className="relative">
                            <input type="text" placeholder="Card number" value={paymentForm.cardNumber} onChange={handleCardNumberChange} maxLength="19" className="w-full bg-gray-100 border-gray-200 border rounded-lg p-4 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"/>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2"><MastercardIcon /></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Exp date" value={paymentForm.expiryDate} onChange={handleExpiryChange} maxLength="5" className="w-full bg-gray-100 border-gray-200 border rounded-lg p-4 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"/>
                            <input type="text" placeholder="CVV" value={paymentForm.cvv} onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').substring(0, 4))} maxLength="4" className="w-full bg-gray-100 border-gray-200 border rounded-lg p-4 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"/>
                        </div>
                        <input type="text" placeholder="Card holder" value={paymentForm.cardHolder} onChange={(e) => handleInputChange('cardHolder', e.target.value)} className="w-full bg-gray-100 border-gray-200 border rounded-lg p-4 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"/>
                    </div>
                    <div className="flex justify-between items-center mt-8 py-4 border-t border-b border-gray-100">
                        <span className="text-base font-medium text-gray-600">Amount</span>
                        <span className="text-lg font-bold text-black">1800.00</span>
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-4">All payment are secured</p>
                </main>

                {/* Footer with Pay Button */}
                <footer className="p-6">
                    <button onClick={handlePayment} disabled={isProcessing} className={`w-full py-4 rounded-xl text-lg font-semibold transition-colors ${isProcessing ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#8B3C2B] text-white hover:bg-[#7A3024]'}`}>
                        {isProcessing ? 'Processing...' : 'Pay'}
                    </button>
                </footer>

                {/* --- Conditional Popup Modal --- */}
                {showPopup.visible && (
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-xs p-6 flex flex-col items-center text-center">
                            
                            {/* Dynamic Icon */}
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-5 ${showPopup.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                                {showPopup.status === 'success' ? (
                                    <Check className="w-12 h-12 text-white" strokeWidth={3} />
                                ) : (
                                    <X className="w-12 h-12 text-white" strokeWidth={3} />
                                )}
                            </div>
                            
                            {/* Dynamic Message */}
                            <h2 className={`text-2xl font-bold mb-6 ${showPopup.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                {showPopup.message}
                            </h2>

                            {/* Dynamic Button */}
                            <button 
                                onClick={handlePopupClose}
                                className={`w-full py-3 rounded-lg text-white font-semibold ${showPopup.status === 'success' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                            >
                                {showPopup.status === 'success' ? 'Ok' : 'Try Again'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentPage;