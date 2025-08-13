import React, { useState } from "react";
// lucide-react is used for icons
import { Menu, ChevronDown, Circle } from "lucide-react";
// Make sure to import useNavigate from react-router-dom
import { useNavigate } from "react-router-dom";

// --- Vertical Bar Chart Component ---
const VerticalBarChart = ({ data }) => (
  <div className="flex justify-around items-end h-20 px-2">
    {data.map((item, index) => (
      <div
        key={index}
        className="w-8 rounded-t-sm"
        style={{
          height: `${item.value}%`,
          backgroundColor: item.color,
        }}
      ></div>
    ))}
  </div>
);

// --- Horizontal Bar Chart Component ---
const HorizontalBarChart = ({ data }) => (
  <div className="space-y-1.5">
    {data.map((item, index) => (
      <div key={index} className="flex items-center gap-2">
        <div className="flex-grow bg-orange-200 rounded-sm h-2.5">
          <div
            className="bg-orange-400 h-2.5 rounded-sm"
            style={{ width: `${item.value}%` }}
          ></div>
        </div>
        <span className="text-[9px] text-gray-500 w-12 text-right">{item.label}</span>
      </div>
    ))}
  </div>
);


const AppointmentBookingPage = () => {
  // Call the hook here to get the navigation function
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(6);
  const [selectedTime, setSelectedTime] = useState("8:30");
  const [paymentMethod, setPaymentMethod] = useState("");

  const timeSlots = ["8:30", "10:30", "12:30", "2:30"];
  const visitorTrafficByDay = [
    { value: 60, color: "#F9B48C" },
    { value: 90, color: "#F2622E" },
    { value: 45, color: "#F9B48C" },
    { value: 100, color: "#F9B48C" },
    { value: 90, color: "#F9B48C" }
  ];
  const visitorTrafficByTime = [
    { label: "8:30-10:30", value: 80 },
    { label: "10:30-12:30", value: 65 },
    { label: "12:30-2:30", value: 40 },
    { label: "2:30-4:30", value: 70 },
  ];
  const calendarDays = [
    [27, 28, 29, 30, 31, 1, 2],
    [3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30],
    [31, 1, 2, 3, 4, 5, 6],
  ];
  const calendarHeader = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const handleConfirmAppointment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }
    // This will now work correctly because navigate is defined
    navigate(paymentMethod === "now" ? `/payment` : `/confirmation`);
  };

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen p-4">
      <div className="bg-white w-full max-w-[428px] flex flex-col rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 bg-white z-10 flex items-center justify-between p-4 border-b border-gray-100">
          <button>
            <Menu className="w-6 h-6 text-black" />
          </button>
          <button className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-1.5 text-xs">
            English <ChevronDown className="w-4 h-4" />
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Birth Certificate new/issue
          </h2>

          {/* Charts */}
          <div className="space-y-4">
            <div className="bg-white border border-gray-100 rounded-lg p-3">
              <h3 className="font-semibold text-sm mb-2 text-gray-700">
                Visitor traffic By Day
              </h3>
              <VerticalBarChart data={visitorTrafficByDay} />
            </div>
            <div className="bg-white border border-gray-100 rounded-lg p-3">
              <h3 className="font-semibold text-sm mb-2 text-gray-700">
                Visitor traffic By Time
              </h3>
              <HorizontalBarChart data={visitorTrafficByTime} />
            </div>
          </div>

          {/* Recommended */}
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-center text-xs font-medium text-blue-800">
            Recommended date and time - 2025/01/07 10:30 time-slot
          </div>

          {/* Calendar */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <button className="font-bold text-base flex items-center text-gray-800">
                January <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <span className="font-bold text-base text-gray-800">2025</span>
            </div>
            <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-3">
              {calendarHeader.map((day) => (
                <div key={day} className="py-1">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 text-center text-sm gap-1">
              {calendarDays.flat().map((day, index) => (
                <button
                  key={index}
                  onClick={() => day > 0 && setSelectedDate(day)}
                  className={`p-2 rounded-full relative ${
                    index < 5 || index > 30
                      ? "text-gray-300"
                      : "text-gray-800 hover:bg-gray-100"
                  } ${
                    selectedDate === day ? "text-orange-500 bg-orange-50" : ""
                  }`}
                >
                  {day > 0 ? day : ""}
                  {selectedDate === day && (
                    <Circle
                      className="absolute inset-0 w-full h-full text-orange-500"
                      strokeWidth={1.5}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-2.5 rounded-lg text-sm font-medium transition-all ${
                  selectedTime === time
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                }`}
              >
                {time}
              </button>
            ))}
          </div>

          {/* Notice */}
          <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-r-lg">
            <p className="font-bold text-red-600 text-xs mb-1">! Important notice</p>
            <p className="text-red-600 text-xs">
              Your selected Date and time may have expected higher visitor traffic
            </p>
          </div>

          {/* Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Service</span>
              <span className="font-semibold text-gray-800">Birth certificate</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Location</span>
              <span className="font-semibold text-gray-800">Kandy branch</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Date & Time</span>
              <span className="font-semibold text-gray-800">
                2025/01/{String(selectedDate).padStart(2, "0")} - {selectedTime}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Expected Duration</span>
              <span className="font-semibold text-gray-800">2 hrs</span>
            </div>
          </div>

          {/* Payment */}
          <div className="text-center space-y-4">
            <p className="text-xl font-bold text-gray-800">Total Payment - Rs. 1800</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setPaymentMethod("now")}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  paymentMethod === "now"
                    ? "bg-gray-800 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Pay Now
              </button>
              <button
                onClick={() => setPaymentMethod("later")}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  paymentMethod === "later"
                    ? "bg-gray-800 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Pay Later
              </button>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirmAppointment}
            className="w-full bg-red-800 text-white py-4 rounded-xl text-lg font-semibold hover:bg-red-900 transition-colors shadow-lg mb-4"
          >
            Confirm Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBookingPage;