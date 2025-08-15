import React from 'react';

const BarChart = ({ data = [], selectedIndex = 0, className = '' }) => {
  const defaultData = [
    { value: 126, color: '#F8CA92' },
    { value: 89, color: '#F2622E' },
    { value: 49, color: '#F8CA92' },
    { value: 55, color: '#F8CA92' },
    { value: 147, color: '#F8CA92' }
  ];

  const chartData = data.length > 0 ? data : defaultData;
  const maxValue = Math.max(...chartData.map(item => item.value));

  return (
    <div className={`bg-white p-4 ${className}`}>
      <div className="flex items-end space-x-1.5 h-40">
        {chartData.map((item, index) => {
          const height = (item.value / maxValue) * 100;
          const isSelected = index === selectedIndex;
          
          return (
            <div
              key={index}
              className="flex flex-col items-center"
            >
              <div
                className={`w-6 rounded-sm transition-all duration-300 ${
                  isSelected ? 'bg-orange-600' : 'bg-orange-200'
                }`}
                style={{ 
                  height: `${height}%`,
                  backgroundColor: isSelected ? '#F2622E' : item.color
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BarChart;
