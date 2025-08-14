import React from 'react';

const ActivityModal = ({ activity, isOpen, onClose }) => {
  if (!isOpen || !activity) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#F8CB93] rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl backdrop-blur-[15px]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-black border-opacity-20">
          <h2 className="text-xl font-semibold text-black">{activity.title}</h2>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Progress Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-black">Progress</span>
              <span className="text-sm font-bold text-black">{activity.progress}% Completed</span>
            </div>
            <div className="w-full bg-black bg-opacity-20 rounded-full h-3">
              <div 
                className="bg-[#8C322A] h-3 rounded-full transition-all duration-300" 
                style={{ width: `${activity.progress}%` }}
              ></div>
            </div>
          </div>

          {/* Current Status */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-black mb-2">Current Status</h3>
            <p className="text-sm font-bold text-black bg-black bg-opacity-10 px-3 py-2 rounded-lg">
              {activity.status}
            </p>
          </div>

          {/* Steps Timeline */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-black mb-4">Process Steps</h3>
            <div className="space-y-4">
              {activity.steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  {/* Step Indicator */}
                  <div className={`w-4 h-4 rounded-full mt-0.5 flex-shrink-0 ${
                    step.completed === true ? 'bg-green-500' :
                    step.completed === 'current' ? 'bg-yellow-500' :
                    'bg-gray-300'
                  }`}>
                    {step.completed === true && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-1">
                    <p className={`text-sm ${
                      step.completed === 'current' ? 'font-bold text-black' : 
                      step.completed === true ? 'text-black opacity-70' : 
                      'text-black opacity-50'
                    }`}>
                      {step.name}
                    </p>
                    {step.date && (
                      <p className="text-xs text-black opacity-60 mt-1">{step.date}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityModal;
