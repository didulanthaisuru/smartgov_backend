import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";

const Pill = ({ label, value, icon, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    green: "bg-green-50 border-green-200 text-green-700",
    orange: "bg-orange-50 border-orange-200 text-orange-700",
    purple: "bg-purple-50 border-purple-200 text-purple-700",
    red: "bg-red-50 border-red-200 text-red-700"
  };

  return (
    <div className={`bg-white p-6 rounded-xl shadow-lg border-2 ${colorClasses[color]} transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {icon && <div className="text-2xl">{icon}</div>}
          <span className="text-sm font-semibold uppercase tracking-wide opacity-75">{label}</span>
        </div>
      </div>
      <div className="text-3xl font-bold">{value || 0}</div>
      <div className="text-xs opacity-60 mt-1">Updated today</div>
    </div>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [fullWeekDates, setFullWeekDates] = useState([]);
  const [weeklyServiceTraffic, setWeeklyServiceTraffic] = useState([]);
  const [weeklySubServiceTraffic, setWeeklySubServiceTraffic] = useState([]);
  const [TotalCount, setTotalCount] = useState(0);
  const [noShowCount, setNoShowCount] = useState(0);
  const [predicted_count, setPredictedCount] = useState(0);
  const [ProcessingTime, setProcessingTime] = useState(0);
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Hardcoded data for Weekly Sub Service Traffic
  const weeklySubServiceTrafficData = [
    { name: "Mon", traffic: 2850 },
    { name: "Tue", traffic: 1950 },
    { name: "Wed", traffic: 1150 },
    { name: "Thu", traffic: 3200 },
    { name: "Fri", traffic: 2890 },
    { name: "Sat", traffic: 1800 },
    { name: "Sun", traffic: 1200 }
  ];

  // Hardcoded data for Main Service Weekly Traffic
  const weeklyMainServiceTrafficData = [
    { name: "Mon", traffic: 3200 },
    { name: "Tue", traffic: 2400 },
    { name: "Wed", traffic: 1800 },
    { name: "Thu", traffic: 3800 },
    { name: "Fri", traffic: 3200 },
    { name: "Sat", traffic: 2200 },
    { name: "Sun", traffic: 1500 }
  ];

  const timeBasedServiceTraffic = [
    { name: "8:30-10:30", traffic: 1245 },
    { name: "10:30-12:30", traffic: 1850 },
    { name: "12:30-2:30", traffic: 2340 },
    { name: "2:30-4:30", traffic: 1680 }
  ];

  const timeBasedSubServiceTraffic = [
    { name: "8:30-10:30", traffic: 950 },
    { name: "10:30-12:30", traffic: 1650 },
    { name: "12:30-2:30", traffic: 2100 },
    { name: "2:30-4:30", traffic: 1420 }
  ];

  // Generate full week dates (Monday to Sunday) based on selected date
  const getFullWeekDates = (selectedDate) => {
    if (!selectedDate) return [];
    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(date);
    monday.setDate(date.getDate() + mondayOffset);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(monday);
      currentDay.setDate(monday.getDate() + i);
      weekDates.push({
        date: currentDay.toISOString().split("T")[0],
        dayName: currentDay.toLocaleDateString("en-US", { weekday: "short" }),
        fullDate: currentDay.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
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
  };

  // Fetch weekly service traffic whenever startDate changes
  useEffect(() => {
    if (!startDate) return;

    const fetchWeeklyData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/insights/weekly-appointment-counts",
          {
            sub_service_id: "689b93230d3364bd64eaa075",
            date: startDate
          }
        );

        const data = response.data;
        console.log("Fetched weekly data:", data);
        const chartData = data.day_counts.map((day) => ({
          name: day.day_of_week,
          traffic: day.appointment_count
        }));
        setWeeklyServiceTraffic(chartData);
      } catch (err) {
        console.error("Error fetching weekly data:", err);
        setWeeklyServiceTraffic([
          { name: "Mon", traffic: 850 },
          { name: "Tue", traffic: 1220 },
          { name: "Wed", traffic: 680 },
          { name: "Thu", traffic: 980 },
          { name: "Fri", traffic: 1450 },
          { name: "Sat", traffic: 720 },
          { name: "Sun", traffic: 450 }
        ]);
      }
    };

    const fetchWeeklySubData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/insights/weekly-appointment-counts-mainservice",
          {
            sub_service_id: "689b93230d3364bd64eaa075",
            main_service_id: "689cd830ef2618d4dfe5a596",
            date: startDate
          }
        );

        const data = response.data;
        const chartData = data.day_counts.map((day) => ({
          name: day.day_of_week,
          traffic: day.appointment_count
        }));
        setWeeklySubServiceTraffic(chartData);
      } catch (err) {
        console.error("Error fetching weekly sub-service data:", err);
        setWeeklySubServiceTraffic([
          { name: "Mon", traffic: 850 },
          { name: "Tue", traffic: 1220 },
          { name: "Wed", traffic: 680 },
          { name: "Thu", traffic: 980 },
          { name: "Fri", traffic: 1450 },
          { name: "Sat", traffic: 720 },
          { name: "Sun", traffic: 450 }
        ]);
      }
    };

    const fetchTotalCount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/insights-direct/sub-service/689b93230d3364bd64eaa075/date/${startDate}`
        );
        const data = response.data;
        setTotalCount(data.predicted_count);
      } catch (err) {
        console.error("Error fetching total count:", err);
      }
    };

    const fetchAvgProcessingTime = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/insights-direct/sub-service/689b93230d3364bd64eaa075/main-service/689b93230d3364bd64eaa075/date/${startDate}`);
        const data = response.data;
        setNoShowCount(data.no_show_count);
        setPredictedCount(data.predicted_count);
      } catch (err) {
        console.error("Error fetching no show count:", err);
      }
    };

    const fetchNoShowCount = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/insights-direct/main-service/689b93230d3364bd64eaa075/date/${startDate}`);
        const data = response.data;
        setProcessingTime(data.avg_processing_time);
      } catch (err) {
        console.error("Error fetching no show count:", err);
      }
    };

    // Call all async functions
    fetchWeeklyData();
    fetchWeeklySubData();
    fetchTotalCount();
    fetchNoShowCount();
  }, [startDate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Sidebar */}
      <AdminSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      
      {/* Header */}
      <AdminHeader setShowSidebar={setShowSidebar} />

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Date Header */}
        <div className="bg-orange-200 bg-opacity-50 rounded-xl p-4 flex items-center justify-between">
          <span className="text-2xl font-medium text-black">{currentDate}</span>
          <div className="w-8 h-8">
            <svg className="w-full h-full text-black" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={() => handleNavigation('/admin-tasks')}
            className="flex-1 bg-orange-200 bg-opacity-50 rounded-xl p-4 text-center text-black font-medium hover:bg-orange-200 transition-colors"
          >
            <span className="text-sm">Appointments</span>
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

        {/* Week Dates */}
        {fullWeekDates.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 shadow-sm">
            <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Selected Week: {fullWeekDates[0]?.date} to {fullWeekDates[6]?.date}
            </h4>
            <div className="grid grid-cols-7 gap-3">
              {fullWeekDates.map((day, index) => (
                <div key={index} className="text-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="font-semibold text-blue-700 text-sm">{day.dayName}</div>
                  <div className="text-blue-600 text-xs mt-1">{day.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Pills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Pill 
            label="Predicted Count" 
            value={predicted_count} 
            icon="📊"
            color="blue"
          />
          <Pill 
            label="Avg Processing Time" 
            value={`${ProcessingTime || 0} min`} 
            icon="⏱️"
            color="green"
          />
          <Pill 
            label="No Show Count" 
            value={noShowCount} 
            icon="❌"
            color="red"
          />
          <Pill 
            label="Appointment Count" 
            value={TotalCount} 
            icon="📅"
            color="orange"
          />
          <Pill 
            label="Service Count" 
            value="42" 
            icon="🔧"
            color="purple"
          />
        </div>

        {/* Analytics Charts Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="mr-3">📊</span>
              Analytics & Insights
            </h2>
            <div className="text-sm text-gray-500">
              Real-time data from your services
            </div>
          </div>

                     {/* Weekly Sub Service Traffic Chart */}
           <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
             <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
               <span className="mr-2">📈</span>
               Weekly Sub Service Traffic
             </h3>
             <div style={{ height: "250px" }}>
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={weeklySubServiceTrafficData}>
                   <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                   <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                   <YAxis tick={{ fontSize: 12 }} />
                   <Tooltip
                     contentStyle={{
                       backgroundColor: "#f8f9fa",
                       border: "1px solid #dee2e6",
                       borderRadius: "6px"
                     }}
                   />
                   <Bar dataKey="traffic" fill="#10b981" radius={[4, 4, 0, 0]} />
                 </BarChart>
               </ResponsiveContainer>
             </div>
           </div>

                     {/* Main Service Weekly Traffic Chart */}
           <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
             <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
               <span className="mr-2">📊</span>
               Main Service Weekly Traffic
             </h3>
             <div style={{ height: "250px" }}>
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={weeklyMainServiceTrafficData}>
                   <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                   <XAxis
                     dataKey="name"
                     tick={{ fontSize: 10 }}
                     angle={-45}
                     textAnchor="end"
                   />
                   <YAxis tick={{ fontSize: 12 }} />
                   <Tooltip
                     contentStyle={{
                       backgroundColor: "#f8f9fa",
                       border: "1px solid #dee2e6",
                       borderRadius: "6px"
                     }}
                   />
                   <Bar dataKey="traffic" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                 </BarChart>
               </ResponsiveContainer>
             </div>
           </div>

        {/* Horizontal Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Time-based Service Traffic
            </h3>
            <div style={{ height: "250px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeBasedServiceTraffic} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tick={{ fontSize: 10 }}
                    width={90}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #dee2e6",
                      borderRadius: "6px"
                    }}
                  />
                  <Bar dataKey="traffic" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Time-based Sub Service Traffic
            </h3>
            <div style={{ height: "250px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeBasedSubServiceTraffic} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tick={{ fontSize: 10 }}
                    width={90}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #dee2e6",
                      borderRadius: "6px"
                    }}
                  />
                  <Bar dataKey="traffic" fill="#ef4444" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}