import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { 
  FiSearch, 
  FiFileText, 
  FiUser, 
  FiBuilding, 
  FiAward, 
  FiClipboard,
  FiShield,
  FiDollarSign,
  FiTruck,
  FiHome,
  FiMessageCircle,
  FiPhone,
  FiArrowRight,
  FiGrid,
  FiStar,
  FiTrendingUp,
  FiFilter,
  FiClock
} from 'react-icons/fi';
import { 
  MdAccountBalance, 
  MdBusinessCenter, 
  MdSchool, 
  MdLocalHospital,
  MdNature,
  MdGavel
} from 'react-icons/md';
import { BsRobot } from 'react-icons/bs';
import servicesHeroImage from '../assets/images/figma/services_hero_image.png';
import logoIcon from '../assets/images/figma/logo.png';

const Services = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const recentServices = [
    {
      id: 1,
      name: 'Birth Certificate',
      description: 'Apply for new or duplicate birth certificate',
      icon: FiFileText,
      category: 'certificates',
      priority: 'high',
      estimatedTime: '3-5 days',
      featured: true
    },
    {
      id: 2,
      name: 'National ID Card',
      description: 'Apply for new NIC or replacement',
      icon: FiUser,
      category: 'certificates',
      priority: 'high',
      estimatedTime: '7-10 days',
      featured: true
    },
    {
      id: 3,
      name: 'Business Registration',
      description: 'Register your new business',
      icon: MdBusinessCenter,
      category: 'registrations',
      priority: 'medium',
      estimatedTime: '10-15 days'
    },
    {
      id: 4,
      name: 'Government Employment',
      description: 'Apply for government positions',
      icon: FiBuilding,
      category: 'employment',
      priority: 'medium',
      estimatedTime: '30-45 days'
    },
    {
      id: 5,
      name: 'Public Applications',
      description: 'Submit various public applications',
      icon: FiClipboard,
      category: 'applications',
      priority: 'low',
      estimatedTime: '5-7 days'
    }
  ];

  const popularServices = [
    {
      id: 6,
      name: 'Tree Felling Permit',
      description: 'Apply for permit to fell trees',
      icon: MdNature,
      category: 'permits',
      priority: 'medium',
      estimatedTime: '15-20 days',
      featured: true
    },
    {
      id: 7,
      name: 'Liquor License',
      description: 'New or renewal liquor sale license',
      icon: FiShield,
      category: 'licenses',
      priority: 'high',
      estimatedTime: '20-30 days'
    }
  ];

  const otherServices = [
    {
      id: 8,
      name: 'Agrahara Insurance',
      description: 'Agricultural insurance services',
      icon: FiShield,
      category: 'insurance',
      priority: 'medium',
      estimatedTime: '7-14 days'
    },
    {
      id: 9,
      name: 'Disaster Relief Loan',
      description: 'Emergency financial assistance',
      icon: FiDollarSign,
      category: 'loans',
      priority: 'high',
      estimatedTime: '5-10 days'
    },
    {
      id: 10,
      name: 'Grama Niladhari Report',
      description: 'Official local authority reports',
      icon: FiFileText,
      category: 'reports',
      priority: 'medium',
      estimatedTime: '2-3 days'
    },
    {
      id: 11,
      name: 'Presidential Fund',
      description: 'Apply for presidential fund assistance',
      icon: MdAccountBalance,
      category: 'funds',
      priority: 'high',
      estimatedTime: '30-60 days'
    },
    {
      id: 12,
      name: 'Long Term Lease',
      description: 'Apply for long-term property lease',
      icon: FiHome,
      category: 'licenses',
      priority: 'medium',
      estimatedTime: '45-60 days'
    },
    {
      id: 13,
      name: 'Soil Transport Permit',
      description: 'Permit for soil transportation',
      icon: FiTruck,
      category: 'permits',
      priority: 'low',
      estimatedTime: '3-5 days'
    }
  ];

  const serviceCategories = [
    { id: 'all', name: 'All Services', icon: FiGrid, count: 13 },
    { id: 'certificates', name: 'Certificates', icon: FiAward, count: 2 },
    { id: 'licenses', name: 'Licenses', icon: FiShield, count: 2 },
    { id: 'permits', name: 'Permits', icon: FiClipboard, count: 2 },
    { id: 'financial', name: 'Financial', icon: FiDollarSign, count: 2 },
    { id: 'healthcare', name: 'Healthcare', icon: MdLocalHospital, count: 0 },
    { id: 'education', name: 'Education', icon: MdSchool, count: 0 },
    { id: 'legal', name: 'Legal', icon: MdGavel, count: 0 }
  ];
  const handleServiceClick = (service) => {
    navigate(`/services/${service.id}/detail`);
  };

  const filteredServices = () => {
    let services = [];
    
    if (selectedCategory === 'all') {
      services = [...recentServices, ...popularServices, ...otherServices];
    } else if (selectedCategory === 'recent') {
      services = recentServices;
    } else if (selectedCategory === 'popular') {
      services = popularServices;
    } else if (selectedCategory === 'other') {
      services = otherServices;
    } else {
      services = [...recentServices, ...popularServices, ...otherServices]
        .filter(service => service.category === selectedCategory);
    }

    if (searchTerm) {
      services = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return services;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const ServiceCard = ({ service, variant = 'default' }) => {
    const IconComponent = service.icon;
    
    if (variant === 'featured') {
      return (
        <div 
          onClick={() => handleServiceClick(service)}
          className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full opacity-50 transform translate-x-6 -translate-y-6"></div>
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-600 rounded-xl group-hover:bg-blue-700 transition-colors shadow-lg">
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(service.priority)}`}>
                {service.priority}
              </span>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {service.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {service.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 flex items-center bg-gray-100 px-3 py-1 rounded-full">
                <FiClock className="w-4 h-4 mr-2" />
                {service.estimatedTime}
              </span>
              <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                <span className="text-sm font-medium mr-2">Apply Now</span>
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div 
        onClick={() => handleServiceClick(service)}
        className="bg-white border border-gray-200 rounded-xl p-5 cursor-pointer hover:shadow-lg transition-all duration-300 group hover:border-orange-300"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="p-3 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors">
            <IconComponent className="w-6 h-6 text-orange-600" />
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(service.priority)}`}>
            {service.priority}
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
          {service.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {service.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
            {service.estimatedTime}
          </span>
          <FiArrowRight className="w-4 h-4 text-orange-500 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    );
  };

  const CategoryChip = ({ category, isSelected, onClick }) => {
    const IconComponent = category.icon;
    
    return (
      <button
        onClick={onClick}
        className={`flex items-center px-4 py-2 rounded-full border-2 transition-all duration-300 whitespace-nowrap ${
          isSelected
            ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
            : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:shadow-md'
        }`}
      >
        <IconComponent className={`w-4 h-4 mr-2 ${isSelected ? 'text-white' : 'text-blue-600'}`} />
        <span className="text-sm font-medium">{category.name}</span>
        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
          isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
        }`}>
          {category.count}
        </span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      
      {/* Header */}
      <Header 
        title="Government Services" 
        setShowSidebar={setShowSidebar} 
        showLanguageSelector={true}
        language="EN"
      />

      {/* Main Content */}
      <div className="lg:pl-4 lg:pr-4">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative z-10 px-6 py-8 lg:py-12">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h1 className="text-3xl lg:text-5xl font-bold mb-4">
                    Government Services
                  </h1>
                  <p className="text-lg lg:text-xl text-blue-100 mb-6">
                    Access all Sri Lankan government services digitally. Simple, secure, and efficient.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center bg-white bg-opacity-10 px-4 py-2 rounded-full">
                      <FiStar className="w-4 h-4 mr-2" />
                      <span className="text-sm">13+ Services</span>
                    </div>
                    <div className="flex items-center bg-white bg-opacity-10 px-4 py-2 rounded-full">
                      <FiClock className="w-4 h-4 mr-2" />
                      <span className="text-sm">24/7 Available</span>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <img
                    src={servicesHeroImage}
                    alt="Government Services"
                    className="w-full h-64 object-cover rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search Bar */}
              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for government services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>
              
              {/* Filter Button */}
              <button className="flex items-center px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors lg:w-auto">
                <FiFilter className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Categories</h2>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {serviceCategories.map((category) => (
                <CategoryChip
                  key={category.id}
                  category={category}
                  isSelected={selectedCategory === category.id}
                  onClick={() => setSelectedCategory(category.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Services Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Featured Services */}
          {selectedCategory === 'all' && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Featured Services</h2>
                <div className="flex items-center text-blue-600">
                  <FiTrendingUp className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Most Popular</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...recentServices, ...popularServices]
                  .filter(service => service.featured)
                  .map((service) => (
                    <ServiceCard key={service.id} service={service} variant="featured" />
                  ))}
              </div>
            </div>
          )}

          {/* All Services Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedCategory === 'all' ? 'All Services' : 
                 serviceCategories.find(cat => cat.id === selectedCategory)?.name || 'Services'}
              </h2>
              <span className="text-sm text-gray-500">
                {filteredServices().length} services found
              </span>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices().map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
            
            {filteredServices().length === 0 && (
              <div className="text-center py-12">
                <FiGrid className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
                <p className="text-gray-500">Try adjusting your search or category filter.</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Chat with AI */}
              <button 
                onClick={() => navigate('/chatbot')}
                className="group bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-6 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                    <p className="text-blue-100 text-sm">Chat with our AI assistant for instant support</p>
                  </div>
                  <div className="bg-white bg-opacity-20 p-3 rounded-xl group-hover:bg-opacity-30 transition-all">
                    <BsRobot className="w-8 h-8 text-white" />
                  </div>
                </div>
              </button>

              {/* Contact Us */}
              <button 
                onClick={() => navigate('/contact-us')}
                className="group bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-6 hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                    <p className="text-green-100 text-sm">Get in touch with our support team</p>
                  </div>
                  <div className="bg-white bg-opacity-20 p-3 rounded-xl group-hover:bg-opacity-30 transition-all">
                    <FiPhone className="w-8 h-8 text-white" />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
