import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import searchIcon from '../assets/images/figma/search_icon_services.png';
import supplyChainIcon from '../assets/images/figma/supply_chain_icon.png';
import contactIcon from '../assets/images/figma/contact_icon.png';
import businessIcon from '../assets/images/figma/business_building_icon.png';
import museumIcon from '../assets/images/figma/museum_icon.png';
import notesIcon from '../assets/images/figma/notes_icon.png';
import servicesHeroImage from '../assets/images/figma/services_hero_image.png';
import logoIcon from '../assets/images/figma/logo.png';

const Services = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);

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
    <div 
      onClick={() => handleServiceClick(service)}
      className="bg-[#F8CA92] rounded-xl p-3 cursor-pointer hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center"
      style={{
        width: size === 'small' ? '68px' : '68px',
        height: size === 'small' ? '65px' : '65px'
      }}
    >
      <img
        src={service.icon}
        alt={service.name}
        className="w-8 h-8 object-contain mb-1"
      />
      <span className="text-[10px] font-normal text-black leading-tight">
        {service.name}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-white relative">
      {/* Sidebar */}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      
      {/* Header */}
      <Header 
        title="Government Services" 
        setShowSidebar={setShowSidebar} 
        showLanguageSelector={true}
        language="EN"
      />

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

      {/* Categories */}
      <div className="px-8 mb-6">
        <h3 className="text-sm font-normal text-black mb-4">Categories</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-sm font-normal ${
              selectedCategory === 'all' 
                ? 'bg-[#F2622E] text-black' 
                : 'bg-[#D0E9F2] text-black'
            }`}
          >
            ALL
          </button>
          <button 
            onClick={() => setSelectedCategory('popular')}
            className={`px-4 py-2 rounded-xl text-sm font-normal ${
              selectedCategory === 'popular' 
                ? 'bg-[#F2622E] text-black' 
                : 'bg-[#D0E9F2] text-black'
            }`}
          >
            Popular Services
          </button>
          <button 
            onClick={() => setSelectedCategory('other')}
            className={`px-4 py-2 rounded-xl text-sm font-normal ${
              selectedCategory === 'other' 
                ? 'bg-[#F2622E] text-black' 
                : 'bg-[#D0E9F2] text-black'
            }`}
          >
            Other Services
          </button>
          <button 
            onClick={() => setSelectedCategory('dep1')}
            className="bg-[#F8CA92] px-4 py-2 rounded-xl text-sm font-normal text-black"
          >
            Dep 1
          </button>
        </div>
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

      {/* Chat with AI Button */}
      <div className="px-8 mb-4">
        <button 
          onClick={() => navigate('/chatbot')}
          className="w-full bg-[#F8CA92] border border-black rounded-xl p-4 shadow-inner flex items-center justify-between hover:bg-[#F7C485] transition-colors"
        >
          <span className="text-sm font-normal text-black">Chat with AI</span>
          <img src={logoIcon} alt="AI" className="w-7 h-7" />
        </button>
      </div>

      {/* Contact Us Button */}
      <div className="px-8 mb-8">
        <button 
          onClick={() => navigate('/contact-us')}
          className="w-full bg-[#E8F5E8] border border-[#4CAF50] rounded-xl p-4 shadow-inner flex items-center justify-between hover:bg-[#E0F0E0] transition-colors"
        >
          <span className="text-sm font-normal text-[#4CAF50]">Contact Us</span>
          <svg className="w-6 h-6 text-[#4CAF50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26c.31.17.69.17 1-.01L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Services;
