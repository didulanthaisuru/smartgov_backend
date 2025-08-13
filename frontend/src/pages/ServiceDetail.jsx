import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import birthCertificateIcon from '../assets/images/figma/birth_certificate_icon.png';
import governmentJobsIcon from '../assets/images/figma/government_jobs_icon.png';
import businessIcon from '../assets/images/figma/business_icon.png';

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock service data - in real app, this would come from API
  const services = {
    1: {
      id: 1,
      name: 'Birth Certificate',
      description: 'Apply for birth certificate for newborns and reissue existing certificates',
      category: 'certificates',
      icon: birthCertificateIcon,
      processingTime: '3-5 working days',
      fee: 'Rs. 500',
      status: 'Available',
      requirements: [
        'Original hospital birth record',
        'Parents\' ID copies',
        'Marriage certificate of parents',
        'Proof of residence',
        'Two passport-size photographs'
      ],
      process: [
        'Fill out the birth certificate application form',
        'Gather all required documents',
        'Submit application online or at nearest office',
        'Pay application fee',
        'Wait for processing and verification',
        'Collect certificate or receive by mail'
      ],
      eligibility: [
        'Applicant must be a citizen of Sri Lanka',
        'Birth must have occurred within Sri Lanka',
        'Application must be made within one year of birth for first-time registration',
        'For reissue, previous certificate number may be required'
      ],
      offices: [
        {
          name: 'Colombo District Office',
          address: '123 Main Street, Colombo 01',
          phone: '+94 11 234 5678',
          hours: 'Mon-Fri: 8:00 AM - 4:00 PM'
        },
        {
          name: 'Kandy District Office',
          address: '456 Kandy Road, Kandy',
          phone: '+94 81 234 5678',
          hours: 'Mon-Fri: 8:00 AM - 4:00 PM'
        }
      ]
    },
    2: {
      id: 2,
      name: 'Government Job Applications',
      description: 'Browse and apply for government job opportunities across all departments',
      category: 'registrations',
      icon: governmentJobsIcon,
      processingTime: 'Varies by position',
      fee: 'Free',
      status: 'Available',
      requirements: [
        'Educational certificates (certified copies)',
        'National Identity Card copy',
        'CV/Resume',
        'Character certificates',
        'Medical fitness certificate'
      ],
      process: [
        'Browse available job positions',
        'Check eligibility criteria',
        'Create online profile',
        'Submit application with documents',
        'Take required examinations',
        'Attend interviews if selected'
      ],
      eligibility: [
        'Must be a citizen of Sri Lanka',
        'Age between 18-55 years (varies by position)',
        'Required educational qualifications',
        'Clean criminal record',
        'Medical fitness'
      ],
      offices: [
        {
          name: 'Public Service Commission',
          address: '789 Independence Avenue, Colombo 07',
          phone: '+94 11 269 5678',
          hours: 'Mon-Fri: 8:30 AM - 4:15 PM'
        }
      ]
    }
  };

  useEffect(() => {
    const serviceData = services[serviceId];
    if (serviceData) {
      setService(serviceData);
    }
  }, [serviceId]);

  const handleApply = () => {
    // Navigate to application form
    navigate(`/services/${serviceId}/apply`);
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service not found</h2>
          <button
            onClick={() => navigate('/services')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'requirements', name: 'Requirements' },
    { id: 'process', name: 'Process' },
    { id: 'offices', name: 'Offices' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/services')}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Services
          </button>
          
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <img
                src={service.icon}
                alt={service.name}
                className="w-16 h-16 object-contain mr-6"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{service.name}</h1>
                <p className="text-lg text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Processing Time:</span>
                    <span className="font-medium text-gray-900">{service.processingTime}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Fee:</span>
                    <span className="font-medium text-gray-900">{service.fee}</span>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    {service.status}
                  </span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleApply}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Service Overview</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {service.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Information</h3>
                    <dl className="space-y-3">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Service Category</dt>
                        <dd className="text-base text-gray-900 capitalize">{service.category}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Processing Time</dt>
                        <dd className="text-base text-gray-900">{service.processingTime}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Service Fee</dt>
                        <dd className="text-base text-gray-900">{service.fee}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Availability</dt>
                        <dd className="text-base text-gray-900">{service.status}</dd>
                      </div>
                    </dl>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                    <div className="space-y-3">
                      <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="font-medium text-gray-900">Download Application Form</div>
                        <div className="text-sm text-gray-500">PDF format, 2 pages</div>
                      </button>
                      <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="font-medium text-gray-900">Track Application Status</div>
                        <div className="text-sm text-gray-500">Check your application progress</div>
                      </button>
                      <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="font-medium text-gray-900">Contact Support</div>
                        <div className="text-sm text-gray-500">Get help with your application</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'requirements' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Required Documents</h2>
              <div className="space-y-4">
                {service.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start p-4 border border-gray-200 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{requirement}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Notes</h3>
                <ul className="text-yellow-700 space-y-2">
                  <li>• All documents must be original or certified copies</li>
                  <li>• Documents in languages other than Sinhala/Tamil must be translated</li>
                  <li>• Photocopies will not be accepted without proper certification</li>
                  <li>• Incomplete applications will be rejected</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'process' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Application Process</h2>
              <div className="space-y-6">
                {service.process.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mr-6">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-medium text-gray-900 mb-2">{step}</p>
                      {index < service.process.length - 1 && (
                        <div className="w-px h-8 bg-gray-300 ml-5"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Processing Timeline</h3>
                <p className="text-blue-700">
                  Applications are typically processed within {service.processingTime}. 
                  You will receive SMS and email updates about your application status.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'offices' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Service Offices</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.offices.map((office, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{office.name}</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-gray-600">{office.address}</p>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <p className="text-gray-600">{office.phone}</p>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-gray-600">{office.hours}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-medium transition-colors">
                        Get Directions
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Eligibility Section */}
        {activeTab === 'overview' && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Eligibility Criteria</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.eligibility.map((criteria, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-600">{criteria}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Help & Support Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-6">Get assistance with your application or ask questions about this service.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Chatbot Link */}
            <button 
              onClick={() => navigate('/chatbot')}
              className="bg-white border border-blue-300 rounded-lg p-4 hover:bg-blue-50 transition-colors flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">Chat with AI</h3>
                <p className="text-sm text-gray-600">Get instant answers to common questions</p>
              </div>
            </button>

            {/* Contact Us Link */}
            <button 
              onClick={() => navigate('/contact-us')}
              className="bg-white border border-green-300 rounded-lg p-4 hover:bg-green-50 transition-colors flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26c.31.17.69.17 1-.01L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">Contact Support</h3>
                <p className="text-sm text-gray-600">Reach out to our support team</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
