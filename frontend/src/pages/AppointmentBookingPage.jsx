import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Menu, ChevronDown, Circle } from "lucide-react";
import Header from '../components/Header';
import AuthService from '../services/authService';

// Chart Components
const VerticalBarChart = ({ data }) => ( <div className="flex justify-around items-end h-20 px-2">{data.map((item, index) => (<div key={index} className="w-8 rounded-t-sm" style={{ height: `${item.value}%`, backgroundColor: item.color }}></div>))}</div> );
const HorizontalBarChart = ({ data }) => ( <div className="space-y-1.5">{data.map((item, index) => (<div key={index} className="flex items-center gap-2"><div className="flex-grow bg-orange-200 rounded-sm h-2.5"><div className="bg-orange-400 h-2.5 rounded-sm" style={{ width: `${item.value}%` }}></div></div><span className="text-[9px] text-gray-500 w-12 text-right">{item.label}</span></div>))}</div> );

const AppointmentBookingPage = () => {
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  const location = useLocation();
  
  const subServiceName = location.state?.subServiceName || "Book Appointment";
  const subServiceId = location.state?.subServiceId;
  const paymentAmount = location.state?.paymentAmount || 0;
  const userData = AuthService.getAuthData().userData || {};
  const userId = userData._id || userData.nic || ""; 

  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1)); 
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 0, 7));
  const [selectedTime, setSelectedTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isUpdatingTime, setIsUpdatingTime] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  
  const timeSlots = ["8:30", "10:30", "12:30", "2:30"];
  const visitorTrafficByDay = [{ value: 60, color: "#F9B48C" }, { value: 90, color: "#F2622E" }, { value: 45, color: "#F9B48C" }, { value: 100, color: "#F9B48C" }, { value: 90, color: "#F9B48C" }];
  const visitorTrafficByTime = [{ label: "8:30-10:30", value: 80 }, { label: "10:30-12:30", value: 65 }, { label: "12:30-2:30", value: 40 }, { label: "2:30-4:30", value: 70 }];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const calendarHeader = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  
  // --- CORRECTED FUNCTION ---
  const handleMonthChange = (event) => {
    const newMonth = event.target.value;
    const newDate = new Date(currentDate.getFullYear(), newMonth, 1);
    setCurrentDate(newDate);
    setSelectedDate(newDate); // This ensures the selection follows the calendar view
  };

  const handleDateClick = (day) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  };

  const handleTimeSelection = async (time) => {
    setSelectedTime(time);
    setIsUpdatingTime(true);

    try {
      const timeMap = {
        "8:30": { hours: 8, minutes: 30 },
        "10:30": { hours: 10, minutes: 30 },
        "12:30": { hours: 12, minutes: 30 },
        "2:30": { hours: 14, minutes: 30 }
      };
      
      const timeData = timeMap[time];
      if (!timeData) throw new Error(`Invalid time slot: ${time}`);

      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const hours = String(timeData.hours).padStart(2, '0');
      const minutes = String(timeData.minutes).padStart(2, '0');

      const updatePayload = {
        appointment_date: `${year}-${month}-${day}T00:00:00.000Z`,
        appoinment_time: `${year}-${month}-${day}T${hours}:${minutes}:00.000Z`,
      };

      await axios.patch(
        `http://127.0.0.1:8000/api/v1/appointment_creation/${appointmentId}`, 
        updatePayload
      );
    } catch (error) {
      console.error("Failed to update time:", error);
      setSelectedTime("");
      alert(`There was an error selecting this time slot.`);
    } finally {
      setIsUpdatingTime(false);
    }
  };  

  const handleConfirmAppointment = async () => {
    if (!selectedDate || !selectedTime || !paymentMethod) {
      alert("Please select a date, time, and payment method.");
      return;
    }
    
    setIsConfirming(true);
    
    try {
      const { data: confirmationData } = await axios.put(
        `http://127.0.0.1:8000/api/v1/appointment_creation/${appointmentId}/confirm`
      );
      
      const appointmentDetailsForNextPage = {
        service: confirmationData.sub_service_name || subServiceName,
        location: 'Kandy branch',
        date: selectedDate.toLocaleDateString('en-CA'), // Format YYYY-MM-DD
        time: selectedTime,
        duration: '2 hrs',
        paymentAmount: paymentAmount,
        subServiceId: subServiceId
      };
      
      const nextRoute = paymentMethod === "now" 
        ? `/payment/${appointmentId}` 
        : `/confirmation/${appointmentId}`;
        
      navigate(nextRoute, { 
        state: { appointmentDetails: appointmentDetailsForNextPage } 
      });
    } catch (error) {
      console.error("Failed to confirm appointment:", error);
      alert(`There was an error confirming your appointment.`);
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen p-4">
      <div className="bg-white w-full max-w-[428px] flex flex-col rounded-2xl shadow-2xl overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">{subServiceName}</h2>
          
          <div className="space-y-4">
            <div className="bg-white border border-gray-100 rounded-lg p-3"><h3 className="font-semibold text-sm mb-2 text-gray-700">Visitor traffic By Day</h3><VerticalBarChart data={visitorTrafficByDay} /></div>
            <div className="bg-white border border-gray-100 rounded-lg p-3"><h3 className="font-semibold text-sm mb-2 text-gray-700">Visitor traffic By Time</h3><HorizontalBarChart data={visitorTrafficByTime} /></div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-center text-xs font-medium text-blue-800">
            Recommended date and time - 2025/01/07 10:30 AM time-slot
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <select value={currentDate.getMonth()} onChange={handleMonthChange} className="font-bold text-base text-gray-800 bg-transparent border-none focus:ring-0">
                {monthNames.map((month, index) => (<option key={month} value={index}>{month}</option>))}
              </select>
              <span className="font-bold text-base text-gray-800">{currentDate.getFullYear()}</span>
            </div>
            <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-3">{calendarHeader.map((day) => (<div key={day} className="py-1">{day}</div>))}</div>
            <div className="grid grid-cols-7 text-center text-sm gap-1">
              {Array(firstDayOfMonth).fill(null).map((_, i) => (<div key={`empty-${i}`}></div>))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
                <button 
                  key={day} 
                  onClick={() => handleDateClick(day)} 
                  className={`p-2 rounded-full relative text-gray-800 hover:bg-gray-100 ${ selectedDate.getDate() === day && selectedDate.getMonth() === currentDate.getMonth() ? "text-orange-500 bg-orange-50" : "" }`}
                >
                  {day}
                  {selectedDate.getDate() === day && selectedDate.getMonth() === currentDate.getMonth() && ( <Circle className="absolute inset-0 w-full h-full text-orange-500" strokeWidth={1.5} /> )}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((time) => (
              <button 
                key={time} 
                onClick={() => handleTimeSelection(time)} 
                disabled={isUpdatingTime} 
                className={`py-2.5 rounded-lg text-sm font-medium transition-all ${ selectedTime === time ? "bg-orange-500 text-white shadow-lg" : "bg-orange-100 text-orange-700 hover:bg-orange-200" } disabled:bg-gray-200 disabled:cursor-not-allowed`}
              >
                {isUpdatingTime && selectedTime === time ? "..." : time}
              </button>
            ))}
          </div>
          
          <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-r-lg">
            <p className="font-bold text-red-600 text-xs mb-1">! Important notice</p>
            <p className="text-red-600 text-xs">Your selected Date and time may have expected higher visitor traffic</p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center text-sm"><span className="text-gray-600">Service</span><span className="font-semibold text-gray-800">{subServiceName}</span></div>
            <div className="flex justify-between items-center text-sm"><span className="text-gray-600">Location</span><span className="font-semibold text-gray-800">Kandy branch</span></div>
            <div className="flex justify-between items-center text-sm"><span className="text-gray-600">Date & Time</span><span className="font-semibold text-gray-800">{selectedDate.getFullYear()}/{String(selectedDate.getMonth() + 1).padStart(2, "0")}/{String(selectedDate.getDate()).padStart(2, "0")} - {selectedTime || 'N/A'}</span></div>
            <div className="flex justify-between items-center text-sm"><span className="text-gray-600">Expected Duration</span><span className="font-semibold text-gray-800">2 hrs</span></div>
          </div>
          
          <div className="text-center space-y-4">
            <p className="text-xl font-bold text-gray-800">Total Payment - Rs. {paymentAmount.toFixed(2)}</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setPaymentMethod("now")} className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${ paymentMethod === "now" ? "bg-gray-800 text-white shadow-lg" : "bg-gray-200 text-gray-700 hover:bg-gray-300" }`}>Pay Now</button>
              <button onClick={() => setPaymentMethod("later")} className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${ paymentMethod === "later" ? "bg-gray-800 text-white shadow-lg" : "bg-gray-200 text-gray-700 hover:bg-gray-300" }`}>Pay Later</button>
            </div>
          </div>

          <button 
            onClick={handleConfirmAppointment} 
            disabled={isConfirming || isUpdatingTime || !selectedTime || !paymentMethod} 
            className="w-full bg-red-800 text-white py-4 rounded-xl text-lg font-semibold hover:bg-red-900 transition-colors shadow-lg mb-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isConfirming ? "Confirming..." : "Confirm Appointment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBookingPage;