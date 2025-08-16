import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaUser } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Header from '../components/Header';
import ProfileService from '../services/profileService';

const SubServicesPage = () => {
  const { serviceId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const mainServiceName = location.state?.mainServiceName || "Service Details";

  const [userId, setUserId] = useState(null);
  const [subServices, setSubServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreating, setIsCreating] = useState(null);

  // Fetch user ID on component mount
  useEffect(() => {
    const fetchUserId = () => {
      try {
        const extractedUserId = ProfileService.getUserIdFromAuth();
        
        if (!extractedUserId) {
          throw new Error('User ID not found. Please login again.');
        }
        
        setUserId(extractedUserId);
        console.log('Using user ID:', extractedUserId);
        
      } catch (err) {
        console.error('Error fetching user ID:', err);
        setError(err.message || 'Failed to get user information. Please login again.');
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (!serviceId || !userId) return;

    const fetchSubServices = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/dashboard_services/${serviceId}/subservices`
        );
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
  }, [serviceId, userId]);

  const handleSubServiceClick = async (sub) => {
    if (!userId) {
      alert('User ID not found. Please login again.');
      return;
    }

    setIsCreating(sub.id);
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/appointment_creation/empty', {
        user_id: userId, // Use dynamic user ID instead of hardcoded one
        main_service_id: serviceId,
        sub_service_id: sub.id
      });

      const { appointment_id } = response.data;
      
      console.log('Created appointment with user ID:', userId);

      // Navigate to the next page, passing all necessary info
      navigate(`/services/${serviceId}/subservices/${sub.id}`, {
        state: {
          mainServiceName: mainServiceName,
          subServiceName: sub.name,
          appointmentId: appointment_id
        }
      });

    } catch (err) {
      console.error("Failed to create appointment:", err);
      alert("Error: Could not create an appointment.");
    } finally {
      setIsCreating(null);
    }
  };

  // Loading state for user ID
  if (!userId && !error) {
    return (
      <div className="w-[430px] h-[932px] bg-white shadow-lg mx-auto border border-gray-200 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8C3C2A] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading user information...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-[430px] h-[932px] bg-white shadow-lg mx-auto border border-gray-200 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Authentication Error</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => navigate('/login')}
              className="bg-[#8C3C2A] text-white px-4 py-2 rounded-lg hover:bg-[#7A3424] transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[430px] h-[932px] bg-white shadow-lg mx-auto border border-gray-200 flex flex-col">
      {/* Header */}
      <Header></Header>

      {/* Title */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-300 bg-gray-50">
        <FaUser className="text-xl text-gray-700" />
        <p className="text-gray-800 font-medium text-sm">{mainServiceName}</p>
      </div>

      {/* Sub-services List */}
      <div className="flex flex-col gap-3 px-4 py-5">
        {isLoading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        
        {!isLoading && !error && subServices.map((sub) => {
          return (
            <button
              key={sub.id}
              onClick={() => handleSubServiceClick(sub)}
              disabled={isCreating === sub.id}
              className="flex justify-between items-center bg-orange-300 hover:bg-orange-400 transition rounded-xl px-4 py-3 shadow-md text-left disabled:opacity-70 disabled:cursor-wait"
            >
              <span className="font-semibold text-gray-900">
                {isCreating === sub.id ? 'Creating...' : sub.name}
              </span>
              <IoIosArrowForward className="text-lg text-gray-800 flex-shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SubServicesPage;