import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaUser } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const SubServicesPage = () => {
  // Get the 'serviceId' from the URL (e.g., /services/:serviceId/detail)
  const { serviceId } = useParams();
  
  // Get the state passed from the previous page
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the main service name, with a fallback
  const mainServiceName = location.state?.mainServiceName || "Service Details";

  // State for sub-services, loading, and error handling
  const [subServices, setSubServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch if serviceId is available
    if (!serviceId) return;

    const fetchSubServices = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/services/${serviceId}/subservices`
        );

        // Format the data to be used by the component
        const formattedSubServices = response.data.map(sub => ({
          id: sub._id,
          name: sub.service_name,
        }));

        setSubServices(formattedSubServices);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch sub-services:", err);
        setError("Could not load sub-services. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubServices();
  }, [serviceId]); // Re-run this effect if the serviceId changes

  return (
    <div className="w-[430px] h-[932px] bg-white shadow-lg mx-auto border border-gray-200 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300 bg-white">
        <FaBars className="text-2xl text-gray-800" />
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-gray-800">Smart Gov</h1>
        </div>
        <select className="border border-gray-300 rounded-md px-2 py-1 text-sm">
          <option>English</option>
          <option>සිංහල</option>
          <option>தமிழ்</option>
        </select>
      </div>

      {/* Title - Now dynamic */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-300 bg-gray-50">
        <FaUser className="text-xl text-gray-700" />
        <p className="text-gray-800 font-medium text-sm">
          {mainServiceName}
        </p>
      </div>

      {/* Sub-services List - Now dynamic */}
      <div className="flex flex-col gap-3 px-4 py-5">
        {isLoading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        
        {!isLoading && !error && subServices.map((sub) => (
          <button
            key={sub.id}
            onClick={() => {
              /* Add navigation for the next step here */
              console.log("Clicked sub-service:", sub.name)
            }}
            className="flex justify-between items-center bg-orange-300 hover:bg-orange-400 transition rounded-xl px-4 py-3 shadow-md text-left"
          >
            <span className="font-semibold text-gray-900">{sub.name}</span>
            <IoIosArrowForward className="text-lg text-gray-800 flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubServicesPage;
