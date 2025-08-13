import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/shared/Header';
import BottomNavigation from '../components/shared/BottomNavigation';
import { MessageSquare, Bell, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import Card from '../components/shared/Card';

const MessagesPage = () => {
  const messages = [
    {
      id: 1,
      title: 'Application Approved',
      message: 'Your NIC application has been approved. Please visit the office for collection.',
      time: '2 hours ago',
      type: 'success',
      read: false
    },
    {
      id: 2,
      title: 'Document Required',
      message: 'Additional documents are required for your passport application. Please upload them via the portal.',
      time: '1 day ago',
      type: 'warning',
      read: false
    },
    {
      id: 3,
      title: 'Appointment Reminder',
      message: 'Your appointment is scheduled for tomorrow at 10:00 AM. Please bring required documents.',
      time: '2 days ago',
      type: 'info',
      read: true
    },
    {
      id: 4,
      title: 'System Maintenance',
      message: 'The portal will be under maintenance on Sunday from 2:00 AM to 6:00 AM.',
      time: '3 days ago',
      type: 'info',
      read: true
    },
    {
      id: 5,
      title: 'Payment Confirmation',
      message: 'Your payment of LKR 500 for NIC application has been confirmed.',
      time: '1 week ago',
      type: 'success',
      read: true
    }
  ];

  const getMessageIcon = (type) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertCircle;
      case 'info': return Bell;
      default: return MessageSquare;
    }
  };

  const getMessageColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-orange-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header 
        title="Messages"
        showProgress={false}
      />
      
      <div className="p-4">
        {/* Message Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="p-3 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {messages.filter(m => !m.read).length}
            </div>
            <div className="text-sm text-gray-600">Unread</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-2xl font-bold text-gray-800">
              {messages.length}
            </div>
            <div className="text-sm text-gray-600">Total</div>
          </Card>
        </div>

        {/* Messages List */}
        <div className="space-y-3">
          {messages.map((message, index) => {
            const IconComponent = getMessageIcon(message.type);
            const iconColor = getMessageColor(message.type);
            
            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${
                  !message.read ? 'border-l-4 border-l-orange-500 bg-orange-50' : ''
                }`}>
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center ${
                      !message.read ? 'ring-2 ring-orange-200' : ''
                    }`}>
                      <IconComponent className={`w-4 h-4 ${iconColor}`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className={`font-medium ${!message.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {message.title}
                        </h3>
                        {!message.read && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        )}
                      </div>
                      
                      <p className={`text-sm mb-2 ${!message.read ? 'text-gray-700' : 'text-gray-600'}`}>
                        {message.message}
                      </p>
                      
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{message.time}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Mark All as Read */}
        <div className="mt-6 text-center">
          <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
            Mark all as read
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default MessagesPage;
