import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import logoIcon from '../assets/images/figma/logo.png';

const AppointmentBookingPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(6);
  const [selectedTime, setSelectedTime] = useState('8.30');
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [paymentMethod, setPaymentMethod] = useState('');

  const timeSlots = [
    { time: '8.30', available: true, traffic: 'high' },
    { time: '10.30', available: true, traffic: 'medium' },
    { time: '12.30', available: true, traffic: 'low' },
    { time: '2.30', available: true, traffic: 'medium' }
  ];

  const visitorTrafficByTime = [
    { timeRange: '8.30-10.30', level: 85 },
    { timeRange: '10.30-12.30', level: 65 },
    { timeRange: '12.30-2.30', level: 40 },
    { timeRange: '2.30-4.30', level: 55 }
  ];

  const calendarDays = [
    [27, 28, 29, 30, 31, 1, 2],
    [3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30],
    [31, 1, 2, 3, 4, 5, 6]
  ];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleConfirmAppointment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    
    if (paymentMethod === 'now') {
      navigate(`/services/${serviceId}/payment`);
    } else {
      navigate(`/services/${serviceId}/confirmation`);
    }
  };

  const getTrafficColor = (level) => {
    if (level > 70) return 'bg-red-400';
    if (level > 50) return 'bg-orange-400';
    return 'bg-yellow-400';
  };

  const isCurrentMonth = (date) => {
    return date >= 1 && date <= 31;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <button 
          onClick={() => navigate(`/services/${serviceId}/detail`)}
          className="w-9 h-9 flex items-center justify-center"
        >
          <img src={logoIcon} alt="Back" className="w-full h-full object-contain" />
        </button>

        <div className="flex items-center">
          <img src={logoIcon} alt="Logo" className="w-15 h-20 mr-4" />
          <h1 className="text-2xl font-medium text-black">Smart Gov</h1>
        </div>

        <div className="flex items-center bg-white bg-opacity-20 border border-black/50 rounded-xl px-4 py-2">
          <span className="text-sm font-normal text-black/50 mr-2">English</span>
          <img src={logoIcon} alt="Language" className="w-6 h-6 opacity-50" />
        </div>
      </div>

      {/* Service Title */}
      <div className="px-4 py-4">
        <h2 className="text-2xl font-normal text-black">Birth Certificate new/issue</h2>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-black mx-0"></div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Visitor Traffic By Day Chart */}
        <div className="mb-8">
          <h3 className="text-2xl font-normal text-black mb-4">Visitor traffic By Day</h3>
          <div className="flex items-end justify-center gap-2 h-40 mb-4">
            {visitorTrafficByTime.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={`w-6 ${getTrafficColor(item.level)} opacity-50 rounded-sm`}
                  style={{ height: `${item.level}px` }}
                ></div>
                <span className="text-xs text-black mt-2 transform -rotate-90 origin-center w-16">
                  {item.timeRange}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Month Selector */}
        <div className="mb-6">
          <div className="bg-white bg-opacity-20 border border-black rounded-xl px-4 py-2 w-32">
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent text-black text-sm w-full focus:outline-none"
            >
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
            </select>
          </div>
        </div>

        {/* Calendar */}
        <div className="mb-8">
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            {/* Calendar Header */}
            <div className="grid grid-cols-7 bg-gray-50">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <div key={day} className="p-3 text-center text-sm text-gray-600 border-r border-gray-200 last:border-r-0">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Body */}
            {calendarDays.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7">
                {week.map((date, dateIndex) => (
                  <button
                    key={`${weekIndex}-${dateIndex}`}
                    onClick={() => handleDateSelect(date)}
                    className={`p-3 text-center text-sm border-r border-b border-gray-200 last:border-r-0 hover:bg-blue-50 transition-colors ${
                      selectedDate === date && isCurrentMonth(date)
                        ? 'bg-orange-500 text-white border-orange-500'
                        : isCurrentMonth(date)
                        ? 'text-black'
                        : 'text-gray-400'
                    }`}
                  >
                    <div className="w-9 h-9 flex items-center justify-center rounded-full mx-auto">
                      {date}
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Time */}
        <div className="mb-6 text-center">
          <p className="text-sm text-[#8B3C2B]">Recommended date and time - 2025/08/07 10.30 time slot</p>
        </div>

        {/* Time Slots */}
        <div className="mb-6">
          <h3 className="text-2xl font-normal text-black mb-4">Visitor traffic By Time</h3>
          <div className="grid grid-cols-4 gap-3 mb-4">
            {timeSlots.map((slot) => (
              <button
                key={slot.time}
                onClick={() => handleTimeSelect(slot.time)}
                className={`py-3 px-4 rounded-xl text-sm transition-colors ${
                  selectedTime === slot.time
                    ? 'bg-[#F2622E] text-white'
                    : 'bg-[#F8CA92] text-black'
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <div className="mb-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-red-500 font-medium">!important notice</p>
          <p className="text-sm text-red-500">Your selected Date and time may have expected higher visitor traffic</p>
        </div>

        {/* Appointment Summary */}
        <div className="mb-8 bg-[#D1E9F3] bg-opacity-50 rounded-xl p-4">
          <div className="text-sm text-black leading-relaxed">
            <p><span className="font-medium">Service</span> - Birth certificate issue/new</p>
            <p><span className="font-medium">Location</span> - Kandy branch</p>
            <p><span className="font-medium">Date & Time</span> - 2025/08/{selectedDate.toString().padStart(2, '0')} {selectedTime}</p>
            <p><span className="font-medium">Expected Duration</span> - 2 hrs</p>
          </div>
        </div>

        {/* Payment Total */}
        <div className="mb-6 text-center">
          <p className="text-2xl font-normal text-black">Total Payment - Rs. 1800</p>
        </div>

        {/* Payment Methods */}
        <div className="mb-8 flex justify-center gap-4">
          <button
            onClick={() => setPaymentMethod('now')}
            className={`px-6 py-3 rounded-xl text-sm transition-colors ${
              paymentMethod === 'now'
                ? 'bg-[#8B3C2B] text-white'
                : 'bg-[#F8CA92] text-black border border-gray-300'
            }`}
          >
            Pay Now
          </button>
          <button
            onClick={() => setPaymentMethod('later')}
            className={`px-6 py-3 rounded-xl text-sm transition-colors ${
              paymentMethod === 'later'
                ? 'bg-[#8B3C2B] text-white'
                : 'bg-[#F8CA92] text-black border border-gray-300'
            }`}
          >
            Pay Later
          </button>
        </div>

        {/* Confirm Appointment Button */}
        <div className="flex justify-center">
          <button
            onClick={handleConfirmAppointment}
            className="bg-[#8B3C2B] text-white px-16 py-4 rounded-xl text-2xl font-normal hover:bg-[#7A3024] transition-colors"
          >
            Confirm Appointment
          </button>
        </div>

        {/* Floating Help Button */}
        <div className="fixed bottom-6 right-6">
          <button 
            onClick={() => navigate('/chatbot')}
            className="bg-[#F8CA92] border border-black rounded-full w-14 h-14 shadow-lg flex items-center justify-center hover:bg-[#F7C485] transition-colors"
          >
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBookingPage;
