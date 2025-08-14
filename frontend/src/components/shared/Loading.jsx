import React from 'react';
import { motion } from 'framer-motion';

const Loading = ({ 
  size = 'md', 
  text = 'Loading...', 
  showText = true,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <motion.div 
      className={`flex flex-col items-center justify-center space-y-3 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin`} />
      {showText && (
        <p className={`text-gray-600 font-medium ${textSizeClasses[size]}`}>
          {text}
        </p>
      )}
    </motion.div>
  );
};

export default Loading;
