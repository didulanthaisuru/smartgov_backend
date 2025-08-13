import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import logoIcon from '../assets/images/figma/logo.png';

const PaymentPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (field, value) => {
    setPaymentForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
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

  const handlePayment = async () => {
    if (!paymentForm.cardNumber || !paymentForm.expiryDate || !paymentForm.cvv || !paymentForm.cardHolder) {
      alert('Please fill in all payment details');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert('Payment successful! Your application has been submitted.');
      navigate('/services');
    }, 3000);
  };

  const handleBack = () => {
    navigate(`/services/${serviceId}/detail`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <button 
          onClick={handleBack}
          className="w-9 h-9 flex items-center justify-center"
        >
          <img src={logoIcon} alt="Back" className="w-full h-full object-contain" />
        </button>

        <div className="flex items-center">
          <img src={logoIcon} alt="Logo" className="w-15 h-20 mr-4" />
          <h1 className="text-2xl font-medium text-black">Smart Gov</h1>
        </div>

        <div className="flex items-center bg-white bg-opacity-20 border border-black/50 rounded-xl px-4 py-2">
          <span className="text-sm font-normal text-black/50 mr-2">English</span>
          <img src={logoIcon} alt="Language" className="w-6 h-6 opacity-50" />
        </div>
      </div>

      {/* Content */}
      <div className="px-9 py-6">
        {/* Page Title */}
        <h2 className="text-4xl font-normal text-black mb-8">Payment</h2>

        {/* Card Details Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-normal text-black mb-6">Card details</h3>
          
          {/* Card Number */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Card number"
                value={paymentForm.cardNumber}
                onChange={handleCardNumberChange}
                maxLength="19"
                className="w-full bg-[#D9D9D9] rounded-xl px-5 py-4 text-2xl text-black/60 placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {/* Card Type Icon */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Expiry Date and CVV */}
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <input
                type="text"
                placeholder="Exp date"
                value={paymentForm.expiryDate}
                onChange={handleExpiryChange}
                maxLength="5"
                className="w-full bg-[#D9D9D9] rounded-xl px-5 py-4 text-2xl text-black/60 placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="CVV"
                value={paymentForm.cvv}
                onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').substring(0, 4))}
                maxLength="4"
                className="w-full bg-[#D9D9D9] rounded-xl px-5 py-4 text-2xl text-black/60 placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Card Holder */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Card holder"
              value={paymentForm.cardHolder}
              onChange={(e) => handleInputChange('cardHolder', e.target.value)}
              className="w-full bg-[#D9D9D9] rounded-xl px-5 py-4 text-2xl text-black/60 placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Amount Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-normal text-black">Amount</span>
            <span className="text-2xl font-normal text-black">1800.00</span>
          </div>
        </div>

        {/* Security Message */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500">All payment are secured</p>
        </div>

        {/* Pay Button */}
        <div className="flex justify-center">
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className={`px-20 py-4 rounded-xl text-2xl font-normal transition-colors ${
              isProcessing
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-[#8B3C2B] text-white hover:bg-[#7A3024]'
            }`}
          >
            {isProcessing ? 'Processing...' : 'Pay'}
          </button>
        </div>

        {/* Processing Overlay */}
        {isProcessing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B3C2B] mx-auto mb-4"></div>
              <p className="text-lg text-gray-700">Processing payment...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
