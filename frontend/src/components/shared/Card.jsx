import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  padding = 'p-6', 
  shadow = 'shadow-lg',
  rounded = 'rounded-xl',
  bg = 'bg-white',
  animate = true 
}) => {
  const cardContent = (
    <div className={`${bg} ${shadow} ${rounded} ${padding} ${className}`}>
      {children}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

export default Card;
