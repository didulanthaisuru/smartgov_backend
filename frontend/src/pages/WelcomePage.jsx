import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FileText, Users, Clock, Shield } from 'lucide-react';
import Button from '../components/shared/Button';
import logo from '../assets/images/logo.png';

const WelcomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FileText,
      title: 'Digital Applications',
      description: 'Submit and track government applications online'
    },
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'Get instant notifications on application status'
    },
    {
      icon: Users,
      title: 'Citizen Services',
      description: 'Access all government services in one place'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Your data is protected with enterprise security'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center py-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img src={logo} alt="Smart Gov" className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Smart Gov</h1>
          <p className="text-gray-600">Your Government Services Portal</p>
        </motion.div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-4 shadow-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button 
            className="w-full" 
            size="lg"
            onClick={() => navigate('/login')}
          >
            Login to Your Account
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full" 
            size="lg"
            onClick={() => navigate('/signup')}
          >
            Create New Account
          </Button>
          
          <div className="text-center pt-4">
            <button 
              className="text-sm text-gray-600 hover:text-orange-600 transition-colors"
              onClick={() => navigate('/admin')}
            >
              Government Employee? Access Admin Portal
            </button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="text-center mt-8 pt-8 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-xs text-gray-500">
            © 2025 Smart Gov. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomePage;
