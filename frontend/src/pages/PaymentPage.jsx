import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom"; // UPDATED: Added hooks
import { loadStripe } from "@stripe/stripe-js";
import { 
    Elements, 
    CardNumberElement, 
    CardExpiryElement, 
    CardCvcElement, 
    useStripe, 
    useElements 
} from "@stripe/react-stripe-js";
import axios from "axios";
import { Menu, ChevronDown, Check, X } from "lucide-react";




const stripePromise = loadStripe("pk_test_51RwId9Agvx5HIouQWVYHeLSJO5e5wCdnlrINloASxF0JgfaMBBF4Jc4mV1XP1S7SK5kbf6Aude9N3aao2kRDJLC100ysekAN53");

// --- Reusable UI Components & Styling ---
const MastercardIcon = () => ( <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="12" r="9" fill="#EB001B"/><circle cx="23" cy="12" r="9" fill="#F79E1B" fillOpacity="0.8"/></svg> );
const CARD_ELEMENT_OPTIONS = { style: { base: { color: '#1f2937', fontFamily: 'sans-serif', fontSize: '16px', '::placeholder': { color: '#9ca3af' } }, invalid: { color: '#ef4444', iconColor: '#ef4444' } } };
const StripeInput = ({ component: Component }) => ( <div className="w-full bg-gray-100 border-gray-200 border rounded-lg p-4 focus-within:ring-2 focus-within:ring-orange-500 transition-shadow"><Component options={CARD_ELEMENT_OPTIONS} /></div> );

// --- The Main Checkout Form Component ---
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  
  // NEW: Get routing information
  const navigate = useNavigate();
  const location = useLocation();
  const { appointmentId } = useParams();

  // NEW: Get appointment details and payment amount dynamically
  const appointmentDetails = location.state?.appointmentDetails || {};
  const paymentAmount = appointmentDetails.paymentAmount || 0;

  const [cardHolder, setCardHolder] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPopup, setShowPopup] = useState({ visible: false, status: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !cardHolder) {
      setShowPopup({ visible: true, status: 'failed', message: 'Please fill in all fields.' });
      return;
    }
    setIsProcessing(true);

    try {
      const { data } = await axios.post("http://localhost:8000/create-payment-intent", {
        amount: Math.round(paymentAmount * 100) // UPDATED: Use dynamic amount
      });
      const clientSecret = data.clientSecret;
      const cardNumberElement = elements.getElement(CardNumberElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: { name: cardHolder },
        },
      });

      if (error) {
        setShowPopup({ visible: true, status: 'failed', message: error.message });
      } else if (paymentIntent.status === "succeeded") {
        setShowPopup({ visible: true, status: 'success', message: 'Payment successful!' });
      }
    } catch (err) {
      setShowPopup({ visible: true, status: 'failed', message: 'An unexpected error occurred.' });
    }
    setIsProcessing(false);
  };

  // UPDATED: Handle navigation after closing the popup
  const handlePopupClose = () => {
    const status = showPopup.status;
    setShowPopup({ visible: false, status: '', message: '' });

    if (status === 'success') {
      // On success, go to the confirmation page with all details
      navigate(`/confirmation/${appointmentId}`, { 
        state: { appointmentDetails } 
      });
    } else {
      // On failure, go back to the booking page with the necessary details
      navigate(`/appointment/${appointmentId}`, {
        state: {
          subServiceName: appointmentDetails.service,
          subServiceId: appointmentDetails.subServiceId,
          paymentAmount: appointmentDetails.paymentAmount
        }
      });
    }
  };

  return (
    <div className="w-full max-w-sm bg-white shadow-2xl rounded-2xl flex flex-col relative overflow-hidden">
        <header className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-100"><button aria-label="Menu"><Menu className="w-7 h-7 text-black" /></button><span className="font-bold text-lg">Smart Gov</span><button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm">English <ChevronDown className="w-5 h-5" /></button></header>
        <form onSubmit={handleSubmit}>
            <main className="flex-grow p-6">
                <h1 className="text-3xl font-bold text-black mb-6">Payment</h1>
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-700">Card details</h2>
                    <div className="relative"><StripeInput component={CardNumberElement} /><div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"><MastercardIcon /></div></div>
                    <div className="grid grid-cols-2 gap-4"><StripeInput component={CardExpiryElement} /><StripeInput component={CardCvcElement} /></div>
                    <input type="text" placeholder="Card holder" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} required className="w-full bg-gray-100 border-gray-200 border rounded-lg p-4 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"/>
                </div>
                {/* UPDATED: Display dynamic amount */}
                <div className="flex justify-between items-center mt-8 py-4 border-t border-b border-gray-100"><span className="text-base font-medium text-gray-600">Amount</span><span className="text-lg font-bold text-black">Rs. {paymentAmount.toFixed(2)}</span></div>
            </main>
            <footer className="p-6"><button type="submit" disabled={!stripe || isProcessing} className={`w-full py-4 rounded-xl text-lg font-semibold transition-colors ${isProcessing ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#8B3C2B] text-white hover:bg-[#7A3024]'}`}>{isProcessing ? 'Processing...' : 'Pay'}</button></footer>
        </form>
        {showPopup.visible && (<div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"><div className="bg-white rounded-2xl shadow-xl w-full max-w-xs p-6 flex flex-col items-center text-center"><div className={`w-20 h-20 rounded-full flex items-center justify-center mb-5 ${showPopup.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>{showPopup.status === 'success' ? <Check className="w-12 h-12 text-white" strokeWidth={3} /> : <X className="w-12 h-12 text-white" strokeWidth={3} />}</div><h2 className={`text-2xl font-bold mb-6 ${showPopup.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>{showPopup.message}</h2><button onClick={handlePopupClose} className={`w-full py-3 rounded-lg text-white font-semibold ${showPopup.status === 'success' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>{showPopup.status === 'success' ? 'Ok' : 'Try Again'}</button></div></div>)}
    </div>
  );
};

// --- The Page Wrapper Component ---
export default function PaymentPage() {
  return (<div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4"><Elements stripe={stripePromise}><CheckoutForm /></Elements></div>);
}