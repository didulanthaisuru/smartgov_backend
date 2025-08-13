import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import birthCertificateIcon from '../assets/images/figma/birth_certificate_icon.png';
import governmentJobsIcon from '../assets/images/figma/government_jobs_icon.png';
import businessIcon from '../assets/images/figma/business_icon.png';

const Services = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const serviceCategories = [
    { id: 'all', name: 'All Services', count: 24 },
    { id: 'certificates', name: 'Certificates', count: 8 },
    { id: 'licenses', name: 'Licenses', count: 6 },
    { id: 'permits', name: 'Permits', count: 5 },
    { id: 'registrations', name: 'Registrations', count: 5 }
  ];

  const services = [
    {
      id: 1,
      name: 'Birth Certificate',
      description: 'Apply for birth certificate for newborns and reissue existing certificates',
      category: 'certificates',
      icon: birthCertificateIcon,
      processingTime: '3-5 working days',
      fee: 'Rs. 500',
      status: 'Available',
      requirements: ['Original hospital birth record', 'Parents\' ID copies', 'Marriage certificate']
    },
    {
      id: 2,
      name: 'Government Job Applications',
      description: 'Browse and apply for government job opportunities across all departments',
      category: 'registrations',
      icon: governmentJobsIcon,
      processingTime: 'Varies by position',
      fee: 'Free',
      status: 'Available',
      requirements: ['Educational certificates', 'NIC copy', 'CV/Resume']
    },
    {
      id: 3,
      name: 'Business Registration',
      description: 'Register your business with the government and obtain necessary permits',
      category: 'registrations',
      icon: businessIcon,
      processingTime: '7-10 working days',
      fee: 'Rs. 2,500',
      status: 'Available',
      requirements: ['Business plan', 'Owner ID', 'Location documents']
    },
    {
      id: 4,
      name: 'Marriage Certificate',
      description: 'Register your marriage and obtain official marriage certificate',
      category: 'certificates',
      icon: birthCertificateIcon,
      processingTime: '2-3 working days',
      fee: 'Rs. 750',
      status: 'Available',
      requirements: ['Both parties\' IDs', 'Witnesses', 'Marriage registration form']
    },
    {
      id: 5,
      name: 'Driving License',
      description: 'Apply for new driving license or renew existing license',
      category: 'licenses',
      icon: governmentJobsIcon,
      processingTime: '5-7 working days',
      fee: 'Rs. 1,200',
      status: 'Available',
      requirements: ['Medical certificate', 'Vision test', 'Written test pass']
    },
    {
      id: 6,
      name: 'Building Permit',
      description: 'Obtain permits for construction and building modifications',
      category: 'permits',
      icon: businessIcon,
      processingTime: '14-21 working days',
      fee: 'Rs. 5,000',
      status: 'Available',
      requirements: ['Architectural plans', 'Land ownership', 'Engineer approval']
    }
  ];

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleServiceClick = (service) => {
    // Navigate to service details or application form
    navigate(`/services/${service.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Government Services</h1>
          <p className="text-xl text-center text-blue-100 mb-8">
            Access all government services in one convenient platform
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service Categories</h2>
          <div className="flex flex-wrap gap-3">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service)}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
            >
              <div className="p-6">
                {/* Service Icon and Status */}
                <div className="flex items-start justify-between mb-4">
                  <img
                    src={service.icon}
                    alt={service.name}
                    className="w-12 h-12 object-contain"
                  />
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    {service.status}
                  </span>
                </div>

                {/* Service Details */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Service Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Processing Time:</span>
                    <span className="text-sm font-medium text-gray-900">{service.processingTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Fee:</span>
                    <span className="text-sm font-medium text-gray-900">{service.fee}</span>
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Requirements:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {service.requirements.slice(0, 2).map((requirement, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                        {requirement}
                      </li>
                    ))}
                    {service.requirements.length > 2 && (
                      <li className="text-blue-600">+{service.requirements.length - 2} more</li>
                    )}
                  </ul>
                </div>

                {/* Apply Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.137 0-4.146-.832-5.636-2.364M6.343 7.343A7.962 7.962 0 0112 5c4.418 0 8 3.582 8 8v.172a7.838 7.838 0 01-.343 2.235m-19.5 0A7.838 7.838 0 010 13.172V13c0-4.418 3.582-8 8-8 2.137 0 4.146.832 5.636 2.364" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse all categories.</p>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Need Help?</h3>
            <p className="text-gray-600 mb-6">
              Can't find the service you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Contact Support
              </button>
              <button className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-medium transition-colors">
                Browse FAQ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
