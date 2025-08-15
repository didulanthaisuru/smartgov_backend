import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const menuItems = [
    {
      id: 1,
      title: 'Ongoing Activities',
      description: '63%',
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
          <path d="M12,14L10.5,12.5L9.91,13.09L12,15.18L16.59,10.59L16,10L12,14M8,17H16V16H8V17Z"/>
          <circle cx="17" cy="17" r="3"/>
          <path d="M17,14A3,3 0 0,0 14,17A3,3 0 0,0 17,20A3,3 0 0,0 20,17A3,3 0 0,0 17,14M17,15.5A1.5,1.5 0 0,1 18.5,17A1.5,1.5 0 0,1 17,18.5A1.5,1.5 0 0,1 15.5,17A1.5,1.5 0 0,1 17,15.5Z"/>
          <path d="M16.2,15.8L15.8,15.2L16.2,14.8L16.8,15.2L17.2,14.8L17.8,15.2L18.2,15.8L17.8,16.2L18.2,16.8L17.8,17.2L17.2,16.8L16.8,17.2L16.2,16.8L16.6,16.2Z"/>
        </svg>
      ),
      showProgress: true,
      progressValue: 63,
      onClick: () => navigate('/ongoing-activities')
    },
    {
      id: 2,
      title: 'Incomplete Activities',
      description: '2 Documents are required for completion',
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 2 A 10 10 0 0 1 19.319 7 L 12 12 Z" fill="currentColor"/>
          <path d="M12 2 A 10 10 0 0 1 21.071 14.5 L 12 12 Z" fill="currentColor"/>
          <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
        </svg>
      ),
      onClick: () => navigate('/incomplete-activities')
    },
    {
      id: 3,
      title: 'Messages',
      description: 'You have 3 Unread Messages',
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      onClick: () => navigate('/messages')
    },
    {
      id: 4,
      title: 'Previous Activities',
      description: '',
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
        </svg>
      ),
      onClick: () => navigate('/previous-activities')
    },
    {
      id: 6,
      title: 'Update Information',
      description: '',
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      ),
      onClick: () => navigate('/update-information')
    }
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Sidebar */}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-blue-100 opacity-30"></div>
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-blue-100 opacity-30"></div>
      </div>

      {/* Header */}
      <div className="relative z-10">
        <Header 
          title="My Profile" 
          setShowSidebar={setShowSidebar} 
        />
      </div>

      {/* Profile Section */}
      <div className="relative z-10 px-10 py-6">
        <div className="flex items-center space-x-3 mb-2">
          <p className="text-sm text-black">Good Morning,</p>
          <button 
            onClick={() => navigate('/profile/edit')}
            className="w-4 h-4 flex items-center justify-center"
          >
            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
          </button>
        </div>
        <h2 className="text-4xl font-normal text-black mb-2">Imasha Jayarathne</h2>
        <div className="flex items-center space-x-3 mb-6">
          <p className="text-sm text-black">2002******68</p>
          <button 
            onClick={() => {/* Add functionality to show/hide full ID */}}
            className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full p-1"
          >
            <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="relative z-10 px-10 space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            className="w-full bg-[#8C3C2A] rounded-xl p-6 shadow-md hover:bg-[#7A3424] transition-colors flex items-center space-x-4"
          >
            <div className="w-11 h-11 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              {item.icon}
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-2xl font-normal text-white mb-1 drop-shadow-md">{item.title}</h3>
              {item.description && (
                <p className="text-sm text-white drop-shadow-md">{item.description}</p>
              )}
              {item.showProgress && (
                <div className="mt-3">
                  <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                    <div 
                      className="bg-[#F8CA92] h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${item.progressValue}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Bottom Padding */}
      <div className="h-20"></div>
    </div>
  );
};

export default ProfilePage;
