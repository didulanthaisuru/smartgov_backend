import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoIcon from '../assets/images/figma/logo.png';
import searchIcon from '../assets/images/figma/search_icon.png';
import heroImage from '../assets/images/figma/hero_image.png';

const LandingPage = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('English');
  const [contactForm, setContactForm] = useState({
    name: '',
    nic: '',
    contactNo: '',
    message: ''
  });

  const handleContactChange = (field, value) => {
    setContactForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactSubmit = () => {
    console.log('Contact form submitted:', contactForm);
    alert('Thank you for your message! We will get back to you soon.');
    setContactForm({ name: '', nic: '', contactNo: '', message: '' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* Header */}
      <header className="flex flex-row justify-between items-center px-4 py-4 iphone14pro:px-6 iphone14pro:py-5">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 iphone14pro:w-14 iphone14pro:h-14">
            <img
              src={logoIcon}
              alt="Smart Gov Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-lg sm:text-2xl iphone14pro:text-3xl font-medium text-black">
            Smart Gov
          </span>
        </div>

        {/* Language Selector */}
        <div className="flex items-center bg-white bg-opacity-20 border border-black rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 iphone14pro:px-5 iphone14pro:py-3">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent border-none text-xs sm:text-sm iphone14pro:text-base text-black focus:outline-none cursor-pointer"
          >
            <option value="English">English</option>
            <option value="Sinhala">සිංහල</option>
            <option value="Tamil">தமிழ்</option>
          </select>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 py-6 sm:py-8 iphone14pro:px-8 iphone14pro:py-10">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="bg-orange-200 rounded-xl px-4 py-3 flex items-center space-x-3 max-w-full sm:max-w-sm iphone14pro:px-5 iphone14pro:py-4">
              <img
                src={searchIcon}
                alt="Search"
                className="w-4 h-4 iphone14pro:w-5 iphone14pro:h-5"
              />
              <input
                type="text"
                placeholder="Get started with services..."
                className="bg-transparent outline-none text-black text-opacity-70 text-sm sm:text-base iphone14pro:text-lg w-full"
              />
            </div>
          </div>

          {/* Hero Image */}
          <div className="mb-8">
            <img
              src={heroImage}
              alt="E-Governance"
              className="w-full max-w-full sm:max-w-md mx-auto rounded-lg iphone14pro:max-w-[400px]"
            />
          </div>

          {/* Hero Text */}
          <div className="text-center mb-8 px-2">
            <h1 className="text-2xl sm:text-4xl iphone14pro:text-[2.5rem] font-normal text-black mb-4 leading-tight">
              Powering the future of<br />
              e-governance.
            </h1>
            <p className="text-xs sm:text-sm iphone14pro:text-base font-light text-black mb-6">
              From service requests to status tracking,<br />
              everything in one place.
            </p>

            <button
              onClick={() => navigate('/login')}
              className="bg-red-800 text-white px-5 py-2 rounded-xl text-xs sm:text-sm iphone14pro:text-base iphone14pro:px-7 iphone14pro:py-3 font-normal hover:bg-red-900 transition-colors"
            >
              Get started
            </button>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-4 sm:px-6 py-6 sm:py-8 iphone14pro:px-8 iphone14pro:py-10">
          <h2 className="text-2xl sm:text-4xl iphone14pro:text-[2.5rem] font-normal text-black text-center mb-6 sm:mb-8">
            How this works
          </h2>
          <div className="bg-orange-100 rounded-xl p-4 sm:p-6 max-w-full sm:max-w-sm mx-auto iphone14pro:p-8">
            <div className="space-y-3 sm:space-y-4 iphone14pro:space-y-5 text-xs sm:text-sm iphone14pro:text-base font-normal text-black">
              <div>Step 1: Select Service</div>
              <div>Step 2: Check Required Documents</div>
              <div>Step 3: Book an Appointment</div>
              <div>Step 4: Visit & Get Served Efficiently</div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="px-4 sm:px-6 py-6 sm:py-8 iphone14pro:px-8 iphone14pro:py-10">
          <h2 className="text-2xl sm:text-4xl iphone14pro:text-[2.5rem] font-normal text-black text-center mb-6 sm:mb-8">
            Contact us
          </h2>
          <div className="bg-orange-100 rounded-xl p-4 sm:p-6 max-w-full sm:max-w-sm mx-auto iphone14pro:p-8">
            <div className="space-y-5 sm:space-y-6 iphone14pro:space-y-7">
              {/* Name Field */}
              <div>
                <label className="block text-xs sm:text-sm iphone14pro:text-base font-normal text-black mb-2">Name</label>
                <div className="border-b-4 border-red-800 border-opacity-20 pb-1">
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => handleContactChange('name', e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm iphone14pro:text-base font-normal text-black placeholder-black placeholder-opacity-50 focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
              </div>

              {/* NIC Field */}
              <div>
                <label className="block text-xs sm:text-sm iphone14pro:text-base font-normal text-black mb-2">NIC</label>
                <div className="border-b-4 border-red-800 border-opacity-20 pb-1">
                  <input
                    type="text"
                    value={contactForm.nic}
                    onChange={(e) => handleContactChange('nic', e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm iphone14pro:text-base font-normal text-black placeholder-black placeholder-opacity-50 focus:outline-none"
                    placeholder="Your NIC number"
                  />
                </div>
              </div>

              {/* Contact No Field */}
              <div>
                <label className="block text-xs sm:text-sm iphone14pro:text-base font-normal text-black mb-2">Contact No</label>
                <div className="border-b-4 border-red-800 border-opacity-20 pb-1">
                  <input
                    type="tel"
                    value={contactForm.contactNo}
                    onChange={(e) => handleContactChange('contactNo', e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm iphone14pro:text-base font-normal text-black placeholder-black placeholder-opacity-50 focus:outline-none"
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <div className="bg-red-800 bg-opacity-20 rounded-xl p-3 sm:p-4 iphone14pro:p-5 mb-4">
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => handleContactChange('message', e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm iphone14pro:text-base font-normal text-black placeholder-black placeholder-opacity-50 focus:outline-none resize-none"
                    placeholder="Your message..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Send Button */}
              <button
                onClick={handleContactSubmit}
                className="bg-red-800 text-white px-6 py-2 rounded-xl text-xs sm:text-sm iphone14pro:text-base iphone14pro:px-8 iphone14pro:py-3 font-normal hover:bg-red-900 transition-colors mx-auto block"
              >
                Send
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-100 bg-opacity-50 border-t border-blue-300 px-4 sm:px-6 py-8 iphone14pro:px-8 iphone14pro:py-10 mt-10">
        <div className="max-w-6xl mx-auto">

          {/* Top Section: Quick Access + Contact Info */}
          <div className="flex flex-col sm:flex-row justify-between gap-8 iphone14pro:gap-10 mb-8">
            
            {/* Contact Information */}
            <div className="flex-1">
              <h3 className="text-base sm:text-lg iphone14pro:text-xl font-bold text-blue-800 mb-4 border-b border-blue-300 pb-2">
                Contact Information
              </h3>
              <div className="space-y-2 text-sm sm:text-base iphone14pro:text-lg text-black">
                <p>📧 <span className="font-semibold">Email:</span> support@smartgov.gov.lk</p>
                <p>📞 <span className="font-semibold">Phone:</span> +94 11 234 5678</p>
                <p>📍 <span className="font-semibold">Address:</span> Smart Gov Office, Colombo 07, Sri Lanka</p>
              </div>
            </div>
          </div>

          {/* Bottom Section: Copyright */}
          <div className="text-center sm:text-left text-sm sm:text-base iphone14pro:text-lg text-black">
            <p className="font-semibold text-blue-800">© 2025 Smart Gov.</p>
            <p>All rights reserved.</p>
            <p className="mt-2 text-black text-opacity-80">
              A digital initiative to bring government services closer to citizens.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
