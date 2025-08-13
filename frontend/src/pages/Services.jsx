import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../assets/images/figma/search_icon_services.png';
import supplyChainIcon from '../assets/images/figma/supply_chain_icon.png';
import contactIcon from '../assets/images/figma/contact_icon.png';
import businessIcon from '../assets/images/figma/business_building_icon.png';
import museumIcon from '../assets/images/figma/museum_icon.png';
import notesIcon from '../assets/images/figma/notes_icon.png';
import servicesHeroImage from '../assets/images/figma/services_hero_image.png';
import logoIcon from '../assets/images/logo.png';
import { ChevronDown, Menu, MessageCircle  } from "lucide-react";


const Services = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showButtons, setShowButtons] = useState(false);

  const recentServices = [
    {
      id: 1,
      name: 'Birth certificate new/issue',
      icon: supplyChainIcon,
      category: 'certificates'
    },
    {
      id: 2,
      name: 'NIC issue',
      icon: contactIcon,
      category: 'certificates'
    },
    {
      id: 3,
      name: 'Business registration',
      icon: businessIcon,
      category: 'registrations'
    },
    {
      id: 4,
      name: 'Government Employment',
      icon: museumIcon,
      category: 'employment'
    },
    {
      id: 5,
      name: 'Applications',
      icon: notesIcon,
      category: 'applications'
    }
  ];

  const popularServices = [
    {
      id: 6,
      name: 'Permit for felling trees',
      icon: supplyChainIcon,
      category: 'permits'
    },
    {
      id: 7,
      name: 'Liquor sale license (New/Renewal)',
      icon: contactIcon,
      category: 'licenses'
    }
  ];

  const otherServices = [
    {
      id: 8,
      name: 'Agrahara insurance',
      icon: businessIcon,
      category: 'insurance'
    },
    {
      id: 9,
      name: 'Disaster loan',
      icon: museumIcon,
      category: 'loans'
    },
    {
      id: 10,
      name: 'Grama Niladhari report',
      icon: notesIcon,
      category: 'reports'
    },
    {
      id: 11,
      name: 'Presidential Fund',
      icon: supplyChainIcon,
      category: 'funds'
    },
    {
      id: 12,
      name: 'Issue of Long Term lease',
      icon: contactIcon,
      category: 'licenses'
    },
    {
      id: 13,
      name: 'Issuing soil transport permits',
      icon: businessIcon,
      category: 'permits'
    }
  ];

  const handleServiceClick = (service) => {
    navigate(`/services/${service.id}/detail`);
  };

  const ServiceCard = ({ service, size = 'default' }) => (
  <div className="flex flex-col items-center justify-center text-center cursor-pointer">
    <div 
      onClick={() => handleServiceClick(service)}
      className="bg-[#F8CA92] rounded-xl p-3 hover:shadow-md transition-shadow flex items-center justify-center"
      style={{
        width: size === 'small' ? '68px' : '68px',
        height: size === 'small' ? '65px' : '65px'
      }}
    >
      <img
        src={service.icon}
        alt={service.name}
        className="w-8 h-8 object-contain"
      />
    </div>
    <span className="text-[10px] font-normal text-black leading-tight mt-1 max-w-[80px] break-words">
      {service.name}
    </span>
  </div>
);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Profile Button */}
        <button 
          onClick={() => navigate('/profile')}
          className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>

        {/* Smart Gov Title */}
               
        <h1 className="text-2xl font-medium text-black ">Smart Gov</h1>

        {/* Language Selector */}
        <div className="flex items-center bg-white bg-opacity-20 border border-black rounded-xl px-4 py-2">
          <span className="text-sm font-normal text-black mr-2">English</span>
      
          <ChevronDown className="w-4 h-4 text-black" />
        </div>
      </div>

      {/* Divider Line */}
      <div className="w-full h-px bg-black"></div>

      {/* Services Title */}
      <div className="px-6 py-6">
        <h2 className="text-4xl font-normal text-black">Services</h2>
      </div>

      {/* Search Bar */}
      <div className="px-8 mb-6">
        <div className="relative bg-[#F2963F] bg-opacity-60 rounded-xl p-3">
          <div className="flex items-center">
            <img src={searchIcon} alt="Search" className="w-8 h-8 mr-4" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-2xl text-black text-opacity-60 placeholder-black placeholder-opacity-60 outline-none flex-1"
            />
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="px-0 mb-6">
        <img
          src={servicesHeroImage}
          alt="Services"
          className="w-full h-40 object-cover"
        />
      </div>

      

      {/* Recent Services */}
      <div className="px-8 mb-6">
        <h3 className="text-sm font-normal text-black mb-4">Recent Services</h3>
        <div className="flex gap-3 flex-wrap">
          {recentServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>

      {/* Popular Services */}
      <div className="px-8 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-normal text-black">Popular Services</h3>
          <button className="text-sm font-normal text-black">See all</button>
        </div>
        <div className="flex gap-3 flex-wrap">
          {popularServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>

      {/* Other Services */}
      <div className="px-8 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-normal text-black">Other Services</h3>
          <button className="text-sm font-normal text-black">See all</button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {otherServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>

      <button 
        onClick={() => setShowButtons(!showButtons)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-yellow-600 transition-colors z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat with AI Button - Fixed popup button */}
      {showButtons && (
        <div className="fixed bottom-20 right-6 w-48 z-40">
          <button 
            onClick={() => navigate('/chatbot')}
            className="w-full bg-white border border-gray-300 rounded-lg p-3 flex items-center gap-3 hover:bg-gray-50 transition-colors shadow-lg"
          >
            <MessageCircle className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Chat with AI</span>
          </button>
        </div>
      )}

      {/* Contact Us Button - Fixed popup button */}
      {showButtons && (
        <div className="fixed bottom-32 right-6 w-48 z-40">
          <button 
            onClick={() => navigate('/contact-us')}
            className="w-full bg-white border border-gray-300 rounded-lg p-3 flex items-center gap-3 hover:bg-gray-50 transition-colors shadow-lg"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26c.31.17.69.17 1-.01L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Contact Us</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Services;
