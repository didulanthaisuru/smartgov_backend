import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 1,
      title: 'Ongoing Activities',
      description: '63%',
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      onClick: () => navigate('/ongoing-activities')
    },
    {
      id: 2,
      title: 'Incomplete Activities',
      description: '2 Documents are required for completion',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeDasharray="5,5" strokeWidth="2"/>
          <circle cx="12" cy="12" r="3" fill="currentColor"/>
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
      onClick: () => navigate('/activities')
    },
    {
      id: 5,
      title: 'Update Information',
      description: '',
      icon: (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      ),
      onClick: () => navigate('/profile/edit')
    }
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-blue-100 opacity-30"></div>
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-blue-100 opacity-30"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-6 py-6">
        <button 
          onClick={() => navigate('/services')}
          className="w-9 h-9 flex items-center justify-center"
        >
          <div className="w-9 h-9 bg-gray-300 rounded"></div>
        </button>

        <div className="flex items-center">
          <div className="w-15 h-20 bg-gray-300 rounded mr-4"></div>
          <h1 className="text-2xl font-medium text-black">Smart Gov</h1>
        </div>

        <div className="flex items-center bg-white bg-opacity-20 border border-black rounded-xl px-4 py-2">
          <span className="text-sm font-normal text-black mr-2">English</span>
          <div className="w-6 h-6 bg-gray-300 rounded"></div>
        </div>
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
        <p className="text-sm text-black mb-6">2002******68</p>
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-black">Overall Progress</span>
            <span className="text-xs text-black">63%</span>
          </div>
          <div className="w-full bg-white border border-black rounded-full h-3">
            <div className="bg-[#8C322A] h-3 rounded-full relative" style={{ width: '63%' }}>
              <div className="absolute top-0 left-0 h-3 bg-[#F8CB93] rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
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
