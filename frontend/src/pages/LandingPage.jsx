import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    // Handle contact form submission
    console.log('Contact form submitted:', contactForm);
    alert('Thank you for your message! We will get back to you soon.');
    setContactForm({ name: '', nic: '', contactNo: '', message: '' });
  };

  const services = [
    {
      id: 1,
      title: 'Birth certificates',
      description: 'Apply for a new official birth certificate quickly and securely online.',
      icon: '/src/assets/images/figma/logo.png',
      category: 'Personal Documents'
    },
    {
      id: 2,
      title: 'Business Registration',
      description: 'Easily register your business with just a few clicks.',
      icon: '/src/assets/images/figma/logo.png',
      category: 'Business Services'
    },
    {
      id: 3,
      title: 'Government Jobs',
      description: 'Apply for current government job openings and track your application status.',
      icon: '/src/assets/images/figma/logo.png',
      category: 'Employment'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12">
            <img 
              src="/src/assets/images/figma/logo.png" 
              alt="Smart Gov Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-2xl font-medium text-black">Smart Gov</span>
        </div>

        {/* Language Selector */}
        <div className="flex items-center space-x-2 bg-white bg-opacity-20 border border-black rounded-xl px-4 py-2">
          <span className="text-sm text-black">{language}</span>
          <div className="w-6 h-6">
            <img 
              src="/src/assets/images/figma/search_icon.png" 
              alt="Language"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="bg-orange-200 rounded-xl px-4 py-3 flex items-center space-x-3 max-w-sm">
            <img 
              src="/src/assets/images/figma/search_icon.png" 
              alt="Search"
              className="w-4 h-4"
            />
            <span className="text-black text-opacity-50">Search</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mb-8">
          <img 
            src="/src/assets/images/figma/hero_image.png" 
            alt="E-Governance"
            className="w-full max-w-md mx-auto rounded-lg"
          />
        </div>

        {/* Hero Text */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-normal text-black mb-4 leading-tight">
            Powering the future of<br />
            e-governance.
          </h1>
          <p className="text-sm font-light text-black mb-6">
            From service requests to status tracking,<br />
            everything in one place.
          </p>
          
          {/* Get Started Button */}
          <button 
            onClick={() => navigate('/login')}
            className="bg-red-800 text-white px-6 py-2 rounded-xl text-sm font-normal hover:bg-red-900 transition-colors"
          >
            Get started
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-6 py-8">
        <h2 className="text-4xl font-normal text-black text-center mb-8">Services</h2>
        
        {/* Services Slider */}
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-6 min-w-max">
            {services.map((service) => (
              <div key={service.id} className="bg-orange-100 rounded-3xl p-6 w-80 flex-shrink-0">
                {/* Service Icon */}
                <div className="w-20 h-20 bg-orange-100 rounded-xl mb-4 flex items-center justify-center">
                  <img 
                    src={service.icon} 
                    alt={service.title}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                
                {/* Service Content */}
                <h3 className="text-xl font-normal text-black mb-3">{service.title}</h3>
                <p className="text-sm font-normal text-black leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-8">
        <h2 className="text-4xl font-normal text-black text-center mb-8">How this works</h2>
        
        <div className="bg-orange-100 rounded-xl p-6 max-w-sm mx-auto">
          <div className="space-y-4 text-sm font-normal text-black">
            <div>Step 1: Select Service</div>
            <div>Step 2: Check Required Documents</div>
            <div>Step 3: Book an Appointment</div>
            <div>Step 4: Visit & Get Served Efficiently</div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 py-8">
        <h2 className="text-4xl font-normal text-black text-center mb-8">Contact us</h2>
        
        <div className="bg-orange-100 rounded-xl p-6 max-w-sm mx-auto">
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-normal text-black mb-2">Name</label>
              <div className="border-b-4 border-red-800 border-opacity-20 pb-1">
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => handleContactChange('name', e.target.value)}
                  className="w-full bg-transparent text-sm font-normal text-black placeholder-black placeholder-opacity-50 focus:outline-none"
                  placeholder="Your name"
                />
              </div>
            </div>

            {/* NIC Field */}
            <div>
              <label className="block text-sm font-normal text-black mb-2">NIC</label>
              <div className="border-b-4 border-red-800 border-opacity-20 pb-1">
                <input
                  type="text"
                  value={contactForm.nic}
                  onChange={(e) => handleContactChange('nic', e.target.value)}
                  className="w-full bg-transparent text-sm font-normal text-black placeholder-black placeholder-opacity-50 focus:outline-none"
                  placeholder="Your NIC number"
                />
              </div>
            </div>

            {/* Contact No Field */}
            <div>
              <label className="block text-sm font-normal text-black mb-2">Contact No</label>
              <div className="border-b-4 border-red-800 border-opacity-20 pb-1">
                <input
                  type="tel"
                  value={contactForm.contactNo}
                  onChange={(e) => handleContactChange('contactNo', e.target.value)}
                  className="w-full bg-transparent text-sm font-normal text-black placeholder-black placeholder-opacity-50 focus:outline-none"
                  placeholder="Your phone number"
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <div className="bg-red-800 bg-opacity-20 rounded-xl p-4 mb-4">
                <textarea
                  value={contactForm.message}
                  onChange={(e) => handleContactChange('message', e.target.value)}
                  className="w-full bg-transparent text-sm font-normal text-black placeholder-black placeholder-opacity-50 focus:outline-none resize-none"
                  placeholder="Your message..."
                  rows={4}
                />
              </div>
            </div>

            {/* Send Button */}
            <button
              onClick={handleContactSubmit}
              className="bg-red-800 text-white px-8 py-2 rounded-xl text-sm font-normal hover:bg-red-900 transition-colors mx-auto block"
            >
              Send
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-100 bg-opacity-50 px-6 py-8 mt-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Quick Access */}
            <div>
              <h3 className="text-sm font-normal text-black mb-4">Quick Access</h3>
              <ul className="space-y-2 text-sm font-normal text-black">
                <li>- Home</li>
                <li>- Services</li>
                <li>- How It Works</li>
                <li>- Contact</li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-normal text-black mb-4">Contact Information</h3>
              <div className="space-y-2 text-sm font-normal text-black">
                <p>Email: support@smartgov.gov.lk</p>
                <p>Phone: +94 11 234 5678</p>
                <p>Address: Smart Gov Office, Colombo 07, Sri Lanka</p>
              </div>
            </div>

            {/* Copyright */}
            <div>
              <div className="text-sm font-normal text-black text-center">
                <p>© 2025 Smart Gov.</p>
                <p>All rights reserved.</p>
                <p>A digital initiative to bring government</p>
                <p>services closer to citizens.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
