import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import BarChart from '../components/BarChart';

const AnalyticsDashboardPage = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedChart, setSelectedChart] = useState(0);

  const chartVariants = [
    { 
      data: [
        { value: 126, color: '#F8CA92' },
        { value: 89, color: '#F2622E' },
        { value: 49, color: '#F8CA92' },
        { value: 55, color: '#F8CA92' },
        { value: 147, color: '#F8CA92' }
      ],
      selectedIndex: 0,
      title: 'Monthly Service Requests'
    },
    { 
      data: [
        { value: 126, color: '#F2622E' },
        { value: 89, color: '#F8CA92' },
        { value: 49, color: '#F8CA92' },
        { value: 55, color: '#F8CA92' },
        { value: 147, color: '#F8CA92' }
      ],
      selectedIndex: 1,
      title: 'Weekly Activity Trends'
    },
    { 
      data: [
        { value: 126, color: '#F8CA92' },
        { value: 89, color: '#F8CA92' },
        { value: 49, color: '#F2622E' },
        { value: 55, color: '#F8CA92' },
        { value: 147, color: '#F8CA92' }
      ],
      selectedIndex: 2,
      title: 'Department Performance'
    },
    { 
      data: [
        { value: 126, color: '#F8CA92' },
        { value: 89, color: '#F8CA92' },
        { value: 49, color: '#F8CA92' },
        { value: 55, color: '#F2622E' },
        { value: 147, color: '#F8CA92' }
      ],
      selectedIndex: 3,
      title: 'User Satisfaction Ratings'
    },
    { 
      data: [
        { value: 126, color: '#F8CA92' },
        { value: 89, color: '#F8CA92' },
        { value: 49, color: '#F8CA92' },
        { value: 55, color: '#F8CA92' },
        { value: 147, color: '#F2622E' }
      ],
      selectedIndex: 4,
      title: 'Daily Traffic Analysis'
    }
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Sidebar */}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[800px] h-[730px] rounded-full bg-blue-100 opacity-30"></div>
      </div>

      {/* Header */}
      <div className="relative z-10">
        <Header 
          title="Analytics Dashboard" 
          setShowSidebar={setShowSidebar} 
        />
      </div>

      {/* Title */}
      <div className="relative z-10 px-10 py-6">
        <h2 className="text-4xl font-normal text-black mb-4">Analytics Dashboard</h2>
        <p className="text-sm text-black mb-6">Visualize your government service data</p>
      </div>

      {/* Main Content */}
      <div className="relative z-10 bg-white rounded-t-3xl shadow-[0_4px_250px_rgba(0,0,0,0.25)] mx-9 min-h-[500px] p-6">
        {/* Chart Selection Tabs */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {chartVariants.map((variant, index) => (
            <button
              key={index}
              onClick={() => setSelectedChart(index)}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                selectedChart === index 
                  ? 'bg-[#8C322A] text-white' 
                  : 'bg-[#F8CB93] text-black hover:bg-[#F2B366]'
              }`}
            >
              Chart {index + 1}
            </button>
          ))}
        </div>

        {/* Chart Display */}
        <div className="mb-6">
          <h3 className="text-xl font-medium text-black mb-4">
            {chartVariants[selectedChart].title}
          </h3>
          <div className="bg-gray-50 rounded-xl p-6">
            <BarChart 
              data={chartVariants[selectedChart].data}
              selectedIndex={chartVariants[selectedChart].selectedIndex}
              className="flex justify-center"
            />
          </div>
        </div>

        {/* Chart Information */}
        <div className="bg-[#F8CB93] rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-black mb-1">Selected Metric</h4>
              <p className="text-lg font-bold text-[#8C322A]">
                {chartVariants[selectedChart].data[chartVariants[selectedChart].selectedIndex].value}
              </p>
            </div>
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#8C322A]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.25c.69 0 1.25-.56 1.25-1.25V6c0-.69-.56-1.25-1.25-1.25H5.5C4.81 4.75 4.25 5.31 4.25 6v12c0 .69.56 1.25 1.25 1.25h14z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mb-6">
          <button className="flex-1 bg-[#8C322A] text-white rounded-xl py-3 px-6 text-sm font-medium hover:bg-[#7A2A22] transition-colors">
            Export Data
          </button>
          <button className="flex-1 bg-gray-200 text-black rounded-xl py-3 px-6 text-sm font-medium hover:bg-gray-300 transition-colors">
            Share Report
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-4">
            <button 
              onClick={() => navigate('/chatbot')}
              className="bg-blue-100 rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-blue-200 transition-colors"
            >
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-sm text-blue-600">Need Help?</span>
            </button>
            
            <button 
              onClick={() => navigate('/contact-us')}
              className="bg-green-100 rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-green-200 transition-colors"
            >
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26c.31.17.69.17 1-.01L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-green-600">Contact Us</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Padding */}
      <div className="h-8"></div>
    </div>
  );
};

export default AnalyticsDashboardPage;
