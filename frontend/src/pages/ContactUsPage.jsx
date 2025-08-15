import React, { useState } from "react";
import emailjs from "@emailjs/browser";

// --- Icon Components ---
const UserIcon = () => (
  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const SuccessTickIcon = () => (
  <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  </div>
);

const ErrorIcon = () => (
  <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </div>
);

const ContactUsPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", contactNumber: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // Replace these with your EmailJS values
  const SERVICE_ID = "your_service_id";
  const TEMPLATE_ID = "your_template_id";
  const PUBLIC_KEY = "your_public_key";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSend = async () => {
    setIsLoading(true);
    try {
      // Initialize EmailJS
      emailjs.init(PUBLIC_KEY);

      const templateParams = {
        name: formData.name,
        email: formData.email,
        contact_number: formData.contactNumber,
        message: formData.message,
      };

      const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);

      console.log("Email sent:", result);
      setSuccess(true);
      setFormData({ name: "", email: "", contactNumber: "", message: "" });
    } catch (err) {
      console.error("Email error:", err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const closePopup = () => {
    setSuccess(false);
    setError(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <UserIcon /> Contact Us
        </h1>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="tel"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="message"
            placeholder="Message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>

          <button
            onClick={handleSend}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>

        {/* Success Popup */}
        {success && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="bg-white rounded-xl p-8 w-80 text-center shadow-2xl flex flex-col items-center gap-4">
              <SuccessTickIcon />
              <h2 className="text-xl font-bold">Sent Successfully!</h2>
              <button
                onClick={closePopup}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
              >
                OK
              </button>
            </div>
          </div>
        )}

        {/* Error Popup */}
        {error && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="bg-white rounded-xl p-8 w-80 text-center shadow-2xl flex flex-col items-center gap-4">
              <ErrorIcon />
              <h2 className="text-xl font-bold">Error Sending!</h2>
              <button
                onClick={closePopup}
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUsPage;
