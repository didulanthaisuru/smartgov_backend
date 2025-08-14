import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Bell, Calendar, Menu } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the stylesheet

// Your other components (Pill, SummaryBox) remain the same.
const Pill = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-1 px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${isActive
        ? 'bg-orange-200 text-gray-800'
        : 'bg-orange-100 text-gray-500 hover:bg-orange-200'
      }`}
  >
    {label}
  </button>
);

const SummaryBox = ({ title, value }) => (
  <div className="flex-1 p-4 bg-blue-100 rounded-lg text-center mx-2 my-2">
    <p className="text-sm text-gray-700">{title}</p>
    <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
  </div>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [selectedDate, setSelectedDate] = useState(new Date('2025-07-08'));

  // Sample data (unchanged)
  const visitorByDayData = [
    { day: 'Mon', visitors: 15 },
    { day: 'Tue', visitors: 20 },
    { day: 'Wed', visitors: 12 },
    { day: 'Thu', visitors: 10 },
    { day: 'Fri', visitors: 22 },
  ];

  const visitorByTimeData = [
    { time: '8:30-10:30', visitors: 10 },
    { time: '10:30-12:30', visitors: 15 },
    { time: '12:30-2:30', visitors: 8 },
    { time: '2:30-4:30', visitors: 18 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      <div className="w-full mx-auto" style={{ maxWidth: '430px' }}>

        {/* Header */}
        <header className="flex items-center justify-between pt-4 pb-2">
          <h1 className="text-xl font-bold text-gray-800">Birth Certificate Admin</h1>
          <a
            href="/notifications"
            className="cursor-pointer transition-transform duration-300 transform hover:scale-110 hover:text-orange-500"
          >
            <Bell className="text-gray-700" size={24} />
          </a>
        </header>

        {/* Date Display */}
        <div className="flex items-center justify-center my-4 relative">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            customInput={
              <div className="flex items-center bg-orange-100 rounded-full px-6 py-2 shadow-sm cursor-pointer">
                <span className="text-lg font-medium text-gray-800 mr-2">
                  {selectedDate.toLocaleDateString('en-US')}
                </span>
                <Calendar className="text-gray-700" size={20} />
              </div>
            }
          />
        </div>

        {/* Navigation Pills */}
        <div className="flex justify-around space-x-2 my-4">
          <Pill
            label="Details"
            isActive={activeTab === 'details'}
            onClick={() => setActiveTab('details')}
          />
          <Pill
            label="Appointments"
            isActive={activeTab === 'appointments'}
            onClick={() => setActiveTab('appointments')}
          />
          <Pill
            label="Completed"
            isActive={activeTab === 'completed'}
            onClick={() => setActiveTab('completed')}
          />
        </div>

        {/* Summary Boxes */}
        <div className="flex justify-between my-4">
          <SummaryBox title="Predicted Visitors" value="34" />
          <SummaryBox title="Total Appointments" value="4" />
        </div>

        {/* Visitor Traffic By Day Chart */}
        <div className="mt-8 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Visitor traffic By Day</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={visitorByDayData}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip />
              <Bar
                dataKey="visitors"
                fill="#fdbb74"
                radius={[5, 5, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Visitor Traffic By Time Chart */}
        <div className="mt-8 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Visitor traffic By Time</h2>
          <div className="flex">
            <ResponsiveContainer width="60%" height={200}>
              <BarChart layout="vertical" data={visitorByTimeData}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="time" hide />
                <Tooltip />
                <Bar
                  dataKey="visitors"
                  fill="#fdbb74"
                  radius={[0, 5, 5, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
            <div className="w-40 flex flex-col justify-around text-xs text-gray-600">
              <span>8:30-10:30</span>
              <span>10:30-12:30</span>
              <span>12:30-2:30</span>
              <span>2:30-4:30</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;