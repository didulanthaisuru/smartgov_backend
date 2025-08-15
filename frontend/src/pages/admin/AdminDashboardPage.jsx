import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { Bell, Calendar } from "lucide-react";

const Pill = ({ label, value }) => (
  <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center transform transition-all duration-300 hover:scale-105">
    <span className="text-sm font-medium text-gray-500">{label}</span>
    <span className="text-xl font-bold">{value}</span>
  </div>
);

export default function Dashboard() {
  const [startDate, setStartDate] = useState("");
  const [fullWeekDates, setFullWeekDates] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  
  // Function to get full week dates (Monday to Sunday) for a given date
  const getFullWeekDates = (selectedDate) => {
    if (!selectedDate) return [];
    
    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    
    // Calculate Monday of the week (start of week)
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // If Sunday, go back 6 days
    const monday = new Date(date);
    monday.setDate(date.getDate() + mondayOffset);
    
    // Generate all 7 days of the week
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(monday);
      currentDay.setDate(monday.getDate() + i);
      weekDates.push({
        date: currentDay.toISOString().split('T')[0], // YYYY-MM-DD format
        dayName: currentDay.toLocaleDateString('en-US', { weekday: 'short' }),
        fullDate: currentDay.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      });
    }
    
    return weekDates;
  };
  
  // Handle date selection
  const handleDateChange = (selectedDate) => {
    setStartDate(selectedDate);
    const weekDates = getFullWeekDates(selectedDate);
    setFullWeekDates(weekDates);
    console.log('Selected Date:', selectedDate);
    console.log('Full Week Dates:', weekDates);
  };
  
  useEffect(() => {
    // Simulate API call with dummy data
    const mockServiceData = [
      { day: "Mon", traffic: 850 },
      { day: "Tue", traffic: 1220 },
      { day: "Wed", traffic: 680 },
      { day: "Thu", traffic: 980 },
      { day: "Fri", traffic: 1450 },
      { day: "Sat", traffic: 720 },
      { day: "Sun", traffic: 450 },
    ];
    setServiceData(mockServiceData);
  }, []);

  // Weekly Service Traffic (Left vertical chart)
  const weeklyServiceTraffic = [
    { name: "Mon", traffic: 850 },
    { name: "Tue", traffic: 1220 },
    { name: "Wed", traffic: 680 },
    { name: "Thu", traffic: 980 },
    { name: "Fri", traffic: 1450 },
  ];

  // Sub Service Weekly Traffic (Right vertical chart)
  const subServiceWeeklyTraffic = [
    { name: "Mon", traffic: 2850 },
    { name: "Tue", traffic: 1950 },
    { name: "Wed", traffic: 1150 },
    { name: "Thu", traffic: 3200 },
    { name: "Fri", traffic: 2890 },
  ];

  // Time-based Service Traffic (Left horizontal chart)
  const timeBasedServiceTraffic = [
    { name: "8:30-10:30", traffic: 1245 },
    { name: "10:30-12:30", traffic: 1850 },
    { name: "12:30-2:30", traffic: 2340 },
    { name: "2:30-4:30", traffic: 1680 },
  ];

  // Time-based Sub Service Traffic (Right horizontal chart)
  const timeBasedSubServiceTraffic = [
    { name: "8:30-10:30", traffic: 950 },
    { name: "10:30-12:30", traffic: 1650 },
    { name: "12:30-2:30", traffic: 2100 },
    { name: "2:30-4:30", traffic: 1420 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Service Traffic Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-600" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Debug Info - Shows selected week dates */}
      {fullWeekDates.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="text-sm font-semibold text-blue-800 mb-2">
            Selected Week: {fullWeekDates[0]?.date} to {fullWeekDates[6]?.date}
          </h4>
          <div className="grid grid-cols-7 gap-2 text-xs">
            {fullWeekDates.map((day, index) => (
              <div key={index} className="text-center">
                <div className="font-medium text-blue-700">{day.dayName}</div>
                <div className="text-blue-600">{day.date}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Pills */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Pill label="Predicted Count" value="187" />
        <Pill label="Avg Processing Time" value="12.5m" />
        <Pill label="No Show Count" value="23" />
        <Pill label="Appointment Count" value="4,250" />
        <Pill label="Service Count" value="42" />
      </div>

      {/* 2x2 Grid of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Service Traffic (Top Left - Vertical) */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Service Traffic</h3>
          <div style={{ height: "250px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyServiceTraffic}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#f8f9fa', 
                    border: '1px solid #dee2e6',
                    borderRadius: '6px'
                  }} 
                />
                <Bar dataKey="traffic" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sub Service Weekly Traffic (Top Right - Vertical) */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Sub Service Weekly Traffic</h3>
          <div style={{ height: "250px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subServiceWeeklyTraffic}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#f8f9fa', 
                    border: '1px solid #dee2e6',
                    borderRadius: '6px'
                  }} 
                />
                <Bar dataKey="traffic" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Time-based Service Traffic (Bottom Left - Horizontal) */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Time-based Service Traffic</h3>
          <div style={{ height: "250px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeBasedServiceTraffic} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={90} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#f8f9fa', 
                    border: '1px solid #dee2e6',
                    borderRadius: '6px'
                  }} 
                />
                <Bar dataKey="traffic" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Time-based Sub Service Traffic (Bottom Right - Horizontal) */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Time-based Sub Service Traffic</h3>
          <div style={{ height: "250px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeBasedSubServiceTraffic} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={90} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#f8f9fa', 
                    border: '1px solid #dee2e6',
                    borderRadius: '6px'
                  }} 
                />
                <Bar dataKey="traffic" fill="#ef4444" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}