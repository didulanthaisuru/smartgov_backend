import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/shared/Header';
import BottomNavigation from '../components/shared/BottomNavigation';
import { Bell, FileText, Calendar, MessageSquare } from 'lucide-react';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';

const NewApplicationPage = () => {
  const applicationTypes = [
    {
      id: 1,
      title: 'NIC Application',
      description: 'Apply for new National Identity Card',
      icon: FileText,
      duration: '5-7 business days',
      fee: 'LKR 500'
    },
    {
      id: 2,
      title: 'Passport Application',
      description: 'Apply for new passport',
      icon: FileText,
      duration: '10-14 business days',
      fee: 'LKR 5,000'
    },
    {
      id: 3,
      title: 'Birth Certificate',
      description: 'Request certified birth certificate',
      icon: FileText,
      duration: '3-5 business days',
      fee: 'LKR 250'
    },
    {
      id: 4,
      title: 'Marriage Certificate',
      description: 'Request certified marriage certificate',
      icon: FileText,
      duration: '3-5 business days',
      fee: 'LKR 250'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header 
        title="New Application"
        showProgress={false}
      />
      
      <div className="p-4 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-2">Choose Application Type</h2>
          <p className="text-gray-600 text-sm">Select the service you want to apply for</p>
        </motion.div>

        <div className="space-y-3">
          {applicationTypes.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <app.icon className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{app.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{app.description}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Duration: {app.duration}</span>
                      <span className="font-medium text-orange-600">{app.fee}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <Button size="sm" className="w-full">
                    Start Application
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-blue-600" />
            <div>
              <h4 className="font-medium text-blue-800">Need Help?</h4>
              <p className="text-sm text-blue-600">Contact our support team for assistance</p>
            </div>
          </div>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default NewApplicationPage;
