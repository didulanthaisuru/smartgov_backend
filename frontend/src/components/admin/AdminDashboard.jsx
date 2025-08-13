import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { Calendar, Users, FileText, TrendingUp, Filter } from 'lucide-react';
import Header from '../shared/Header';
import Card from '../shared/Card';
import Button from '../shared/Button';
import BottomNavigation from '../shared/BottomNavigation';

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Sample data for charts
  const monthlyData = [
    { month: 'Jan', applications: 120, completed: 95, pending: 25 },
    { month: 'Feb', applications: 140, completed: 110, pending: 30 },
    { month: 'Mar', applications: 160, completed: 130, pending: 30 },
    { month: 'Apr', applications: 180, completed: 150, pending: 30 },
    { month: 'May', applications: 200, completed: 170, pending: 30 }
  ];

  const departmentData = [
    { name: 'Birth Certificates', value: 35, color: '#F2622E' },
    { name: 'NIC Applications', value: 25, color: '#2ED1F2' },
    { name: 'Business Registration', value: 20, color: '#04C404' },
    { name: 'Vehicle License', value: 15, color: '#8A38F5' },
    { name: 'Others', value: 5, color: '#FFB800' }
  ];

  const dailyStats = [
    { day: 'Mon', processed: 45 },
    { day: 'Tue', processed: 52 },
    { day: 'Wed', processed: 38 },
    { day: 'Thu', processed: 61 },
    { day: 'Fri', processed: 55 },
    { day: 'Sat', processed: 28 },
    { day: 'Sun', processed: 20 }
  ];

  const StatCard = ({ icon: Icon, title, value, change, color = 'bg-blue-500' }) => (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          {change && (
            <p className={`text-xs ${change > 0 ? 'text-green-600' : 'text-red-600'} flex items-center mt-1`}>
              <TrendingUp className="w-3 h-3 mr-1" />
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </Card>
  );

  const TimeFilter = ({ label, value, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        isActive 
          ? 'bg-orange-500 text-white' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <div className="max-w-6xl mx-auto">
        <Header title="Government Services Dashboard" />
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <StatCard 
              icon={FileText}
              title="Total Applications"
              value="1,247"
              change={12}
              color="bg-orange-500"
            />
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <StatCard 
              icon={Users}
              title="Active Users"
              value="8,392"
              change={8}
              color="bg-blue-500"
            />
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <StatCard 
              icon={Calendar}
              title="Pending Reviews"
              value="156"
              change={-5}
              color="bg-yellow-500"
            />
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <StatCard 
              icon={TrendingUp}
              title="Processing Time"
              value="4.2 days"
              change={-15}
              color="bg-green-500"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Applications Trend */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Applications Trend</h3>
                <div className="flex space-x-2">
                  <TimeFilter 
                    label="Daily" 
                    value="daily"
                    isActive={selectedPeriod === 'daily'}
                    onClick={() => setSelectedPeriod('daily')}
                  />
                  <TimeFilter 
                    label="Weekly" 
                    value="weekly"
                    isActive={selectedPeriod === 'weekly'}
                    onClick={() => setSelectedPeriod('weekly')}
                  />
                  <TimeFilter 
                    label="Monthly" 
                    value="monthly"
                    isActive={selectedPeriod === 'monthly'}
                    onClick={() => setSelectedPeriod('monthly')}
                  />
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="applications" fill="#F2622E" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="completed" fill="#04C404" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Department Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <h3 className="text-lg font-semibold text-gray-800 mb-6">By Department</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activities Table */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Recent Applications</h3>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Applicant</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Service</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'BC001', name: 'John Doe', service: 'Birth Certificate', status: 'In Progress', date: '2024-08-10' },
                    { id: 'NIC023', name: 'Jane Smith', service: 'NIC Application', status: 'Pending', date: '2024-08-09' },
                    { id: 'BR045', name: 'Mike Wilson', service: 'Business Registration', status: 'Completed', date: '2024-08-08' },
                    { id: 'VL012', name: 'Sarah Johnson', service: 'Vehicle License', status: 'Under Review', date: '2024-08-07' }
                  ].map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">{item.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{item.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{item.service}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          item.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{item.date}</td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Processing Time Chart */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Daily Processing Volume</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="processed" 
                  stroke="#F2622E" 
                  strokeWidth={3}
                  dot={{ fill: '#F2622E', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default AdminDashboard;
