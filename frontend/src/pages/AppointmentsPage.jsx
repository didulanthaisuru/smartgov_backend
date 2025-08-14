import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/shared/Header';
import BottomNavigation from '../components/shared/BottomNavigation';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';

const AppointmentsPage = () => {
  const appointments = [
    {
      id: 1,
      title: 'NIC Collection',
      date: '2025-01-28',
      time: '10:00 AM',
      location: 'Divisional Secretariat Office, Colombo 03',
      status: 'confirmed',
      officer: 'Mr. K. Perera'
    },
    {
      id: 2,
      title: 'Document Verification',
      date: '2025-02-05',
      time: '2:30 PM',
      location: 'District Secretariat, Kandy',
      status: 'pending',
      officer: 'Ms. S. Fernando'
    }
  ];

  const availableSlots = [
    { date: '2025-01-30', time: '9:00 AM', available: true },
    { date: '2025-01-30', time: '11:00 AM', available: true },
    { date: '2025-01-30', time: '2:00 PM', available: false },
    { date: '2025-01-31', time: '10:00 AM', available: true },
    { date: '2025-01-31', time: '3:00 PM', available: true }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header 
        title="Appointments"
        showProgress={false}
      />
      
      <div className="p-4 space-y-6">
        {/* Current Appointments */}
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Your Appointments</h2>
          <div className="space-y-3">
            {appointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-800">{appointment.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{appointment.date}</span>
                      <Clock className="w-4 h-4 ml-2" />
                      <span>{appointment.time}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{appointment.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Officer: {appointment.officer}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4 pt-3 border-t border-gray-100">
                    <Button size="sm" variant="outline" className="flex-1">
                      Reschedule
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 text-red-600 border-red-300">
                      Cancel
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Book New Appointment */}
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Book New Appointment</h2>
          
          <Card className="p-4">
            <h3 className="font-medium text-gray-800 mb-3">Available Time Slots</h3>
            <div className="space-y-2">
              {availableSlots.map((slot, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex justify-between items-center p-3 rounded-lg border-2 transition-colors ${
                    slot.available 
                      ? 'border-gray-200 hover:border-orange-300 cursor-pointer' 
                      : 'border-gray-100 bg-gray-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-sm">
                      <div className="font-medium text-gray-800">{slot.date}</div>
                      <div className="text-gray-600">{slot.time}</div>
                    </div>
                  </div>
                  
                  {slot.available ? (
                    <Button size="sm">Book</Button>
                  ) : (
                    <span className="text-xs text-gray-500">Unavailable</span>
                  )}
                </motion.div>
              ))}
            </div>
          </Card>
        </section>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default AppointmentsPage;
