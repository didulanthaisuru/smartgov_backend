import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  History, 
  MessageCircle, 
  CheckCircle, 
  Settings,
  AlertCircle
} from 'lucide-react';
import Header from '../shared/Header';
import Card from '../shared/Card';
import Button from '../shared/Button';
import BottomNavigation from '../shared/BottomNavigation';
import { useNavigate } from 'react-router-dom';

const ProfileDashboard = () => {
  const navigate = useNavigate();
  
  const menuItems = [
    {
      title: 'Update Information',
      description: '2 Documents are required for completion',
      icon: User,
      color: 'bg-blue-500',
      action: () => navigate('/profile/update')
    },
    {
      title: 'Incomplete Activities',
      description: '2 Documents are required for completion',
      icon: AlertCircle,
      color: 'bg-orange-500',
      action: () => navigate('/activities/incomplete')
    },
    {
      title: 'Ongoing Activities',
      description: '63% progress',
      icon: Settings,
      color: 'bg-green-500',
      action: () => navigate('/activities/ongoing')
    },
    {
      title: 'Previous Activities',
      description: 'View completed tasks',
      icon: History,
      color: 'bg-purple-500',
      action: () => navigate('/activities/previous')
    },
    {
      title: 'Messages',
      description: 'You have 3 Unread Messages',
      icon: MessageCircle,
      color: 'bg-red-500',
      action: () => navigate('/messages')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-md mx-auto">
        <Header showProgress={true} progressValue={63} />
        
        {/* User Profile Section */}
        <Card className="mb-6">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Profile Avatar */}
            <div className="relative mx-auto w-20 h-20 mb-4">
              <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Good Morning,</p>
              <h2 className="text-xl font-bold text-gray-800">Imasha Jayarathne</h2>
              <p className="text-sm text-gray-500">2002******68</p>
            </div>
          </motion.div>
        </Card>

        {/* Progress Card */}
        <Card className="mb-6 bg-gradient-to-r from-orange-500 to-orange-600">
          <motion.div 
            className="text-white text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-12 h-2 bg-white bg-opacity-30 rounded-full overflow-hidden">
                <div className="h-full bg-white w-8/12 rounded-full" />
              </div>
              <span className="text-lg font-bold">63%</span>
            </div>
            <p className="text-sm opacity-90">Overall Progress</p>
          </motion.div>
        </Card>

        {/* Menu Items */}
        <div className="space-y-4">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card 
                className="cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={item.action}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  
                  <div className="text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate('/new-application')}>
              New Application
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/appointments')}>
              Book Appointment
            </Button>
          </div>
        </Card>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default ProfileDashboard;
