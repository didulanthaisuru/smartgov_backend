import React, { useState } from 'react';

const Calendar = ({ selectedDate, onDateSelect, className = '' }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showMonthSelector, setShowMonthSelector] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const daysInPrevMonth = getDaysInMonth(currentMonth - 1, currentYear);
    
    const days = [];

    // Previous month's days
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      days.push(
        <div key={`prev-${day}`} className="w-12 h-12 flex items-center justify-center">
          <div className="w-9 h-9 rounded-full flex items-center justify-center">
            <span className="text-sm text-gray-400">{day}</span>
          </div>
        </div>
      );
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate && 
        selectedDate.getDate() === day && 
        selectedDate.getMonth() === currentMonth && 
        selectedDate.getFullYear() === currentYear;
      
      const isToday = new Date().getDate() === day && 
        new Date().getMonth() === currentMonth && 
        new Date().getFullYear() === currentYear;

      days.push(
        <div key={day} className="w-12 h-12 flex items-center justify-center">
          <button
            onClick={() => onDateSelect(new Date(currentYear, currentMonth, day))}
            className={`w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors ${
              isSelected ? 'border border-orange-500 text-brown-800' : ''
            } ${isToday ? 'border border-orange-500' : ''}`}
          >
            <span className={`text-sm ${isSelected || isToday ? 'text-brown-800 font-medium' : 'text-gray-800'}`}>
              {day}
            </span>
          </button>
        </div>
      );
    }

    // Next month's days
    const totalCells = 42; // 6 rows × 7 days
    const remainingCells = totalCells - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div key={`next-${day}`} className="w-12 h-12 flex items-center justify-center">
          <div className="w-9 h-9 rounded-full flex items-center justify-center">
            <span className="text-sm text-gray-400">{day}</span>
          </div>
        </div>
      );
    }

    return days;
  };

  const handleMonthSelect = (monthIndex) => {
    setCurrentMonth(monthIndex);
    setShowMonthSelector(false);
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-lg p-4 ${className}`}>
      {/* Month Selector */}
      <div className="relative mb-4">
        <button
          onClick={() => setShowMonthSelector(!showMonthSelector)}
          className="w-full bg-white bg-opacity-20 border border-black rounded-xl px-4 py-2 flex items-center justify-between"
        >
          <span className="text-sm text-black">{months[currentMonth]}</span>
          <div className="w-6 h-6 bg-gray-300 rounded flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </div>
        </button>

        {showMonthSelector && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-black rounded-xl shadow-lg z-10 max-h-32 overflow-y-auto">
            {months.slice(0, 3).map((month, index) => (
              <button
                key={month}
                onClick={() => handleMonthSelect(index)}
                className="w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors"
              >
                {month}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Calendar Header */}
      <div className="grid grid-cols-7 gap-0 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="w-12 h-8 flex items-center justify-center border-r border-gray-200 last:border-r-0">
            <span className="text-xs text-gray-600">{day}</span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-0">
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar;
