import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Menu, ChevronDown, Check, X } from 'lucide-react';

const MastercardIcon = () => ( <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="12" r="9" fill="#EB001B"/><circle cx="23" cy="12" r="9" fill="#F79E1B" fillOpacity="0.8"/></svg> );

const PaymentPage = () => {
    const navigate = useNavigate();
    const { appointmentId } = useParams();
    const location = useLocation();

    const appointmentDetails = location.state?.appointmentDetails;
    const paymentAmount = appointmentDetails?.paymentAmount || 0;
    
    const [paymentForm, setPaymentForm] = useState({ cardNumber: '', expiryDate: '', cvv: '', cardHolder: '' });
    const [isProcessing, setIsProcessing] = useState(false);
    const [showPopup, setShowPopup] = useState({ visible: false, status: '', message: '' });

    const handleInputChange = (field, value) => setPaymentForm(prev => ({ ...prev, [field]: value }));
    const formatCardNumber = (value) => value.replace(/\s+/g, '').replace(/[^0-9]/gi, '').match(/.{1,4}/g)?.join(' ').substring(0, 19) || '';
    const formatExpiryDate = (value) => { const v = value.replace(/[^0-9]/gi, ''); return v.length >= 2 ? `${v.substring(0, 2)}/${v.substring(2, 4)}` : v; };
    const handleCardNumberChange = (e) => handleInputChange('cardNumber', formatCardNumber(e.target.value));
    const handleExpiryChange = (e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value));
    
    const handlePayment = async () => {
        if (!paymentForm.cardNumber || !paymentForm.expiryDate || !paymentForm.cvv || !paymentForm.cardHolder) {
            alert('Please fill in all payment details');
            return;
        }
        setIsProcessing(true);
        
        try {
            // await axios.post(`http://127.0.0.1:8000/api/v1/payment/process`, { ... });
            await new Promise(resolve => setTimeout(resolve, 2000));
            setShowPopup({ visible: true, status: 'success', message: 'Payment Successful!' });
        } catch (error) {
            console.error("Payment failed:", error);
            setShowPopup({ visible: true, status: 'failed', message: 'Payment Failed' });
        } finally {
            setIsProcessing(false);
        }
    };

    const handlePopupClose = () => {
        const status = showPopup.status;
        setShowPopup({ visible: false, status: '', message: '' });
        if (status === 'success') {
            navigate(`/confirmation/${appointmentId}`, { state: { appointmentDetails: appointmentDetails } });
        }
    };

    return (
        <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white shadow-2xl rounded-2xl flex flex-col relative overflow-hidden">
                <header className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-100"><button><Menu className="w-7 h-7 text-black" /></button><span className="font-bold text-lg">Smart Gov</span><button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm">English <ChevronDown className="w-5 h-5" /></button></header>
                <main className="flex-grow p-6">
                    <h1 className="text-3xl font-bold text-black mb-6">Payment</h1>
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-700">Card details</h2>
                        <div className="relative"><input type="text" placeholder="Card number" value={paymentForm.cardNumber} onChange={handleCardNumberChange} maxLength="19" className="w-full bg-gray-100 border-gray-200 border rounded-lg p-4 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"/><div className="absolute right-4 top-1/2 -translate-y-1/2"><MastercardIcon /></div></div>
                        <div className="grid grid-cols-2 gap-4"><input type="text" placeholder="Exp date" value={paymentForm.expiryDate} onChange={handleExpiryChange} maxLength="5" className="w-full bg-gray-100 border-gray-200 border rounded-lg p-4 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"/><input type="text" placeholder="CVV" value={paymentForm.cvv} onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').substring(0, 4))} maxLength="4" className="w-full bg-gray-100 border-gray-200 border rounded-lg p-4 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"/></div>
                        <input type="text" placeholder="Card holder" value={paymentForm.cardHolder} onChange={(e) => handleInputChange('cardHolder', e.target.value)} className="w-full bg-gray-100 border-gray-200 border rounded-lg p-4 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"/>
                    </div>
                    <div className="flex justify-between items-center mt-8 py-4 border-t border-b border-gray-100"><span className="text-base font-medium text-gray-600">Amount</span><span className="text-lg font-bold text-black">{paymentAmount.toFixed(2)}</span></div>
                </main>
                <footer className="p-6">
                    <button onClick={handlePayment} disabled={isProcessing} className={`w-full py-4 rounded-xl text-lg font-semibold transition-colors ${isProcessing ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#8B3C2B] text-white hover:bg-[#7A3024]'}`}>{isProcessing ? 'Processing...' : 'Pay'}</button>
                </footer>
                {showPopup.visible && ( <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"><div className="bg-white rounded-2xl shadow-xl w-full max-w-xs p-6 flex flex-col items-center text-center"><div className={`w-20 h-20 rounded-full flex items-center justify-center mb-5 ${showPopup.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>{showPopup.status === 'success' ? <Check className="w-12 h-12 text-white" strokeWidth={3} /> : <X className="w-12 h-12 text-white" strokeWidth={3} />}</div><h2 className={`text-2xl font-bold mb-6 ${showPopup.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>{showPopup.message}</h2><button onClick={handlePopupClose} className={`w-full py-3 rounded-lg text-white font-semibold ${showPopup.status === 'success' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>{showPopup.status === 'success' ? 'Ok' : 'Try Again'}</button></div></div> )}
            </div>
        </div>
    );
};
export default PaymentPage;