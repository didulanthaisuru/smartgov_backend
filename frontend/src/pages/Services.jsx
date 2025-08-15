import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Component & Icon Imports (assuming these paths are correct, but we will override for debugging)
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import searchIcon from '../assets/images/figma/search_icon_services.png';
// import supplyChainIcon from '../assets/images/figma/supply_chain_icon.png'; // Temporarily disabled for debugging
// import contactIcon from '../assets/images/figma/contact_icon.png';
// import businessIcon from '../assets/images/figma/business_building_icon.png';
// import museumIcon from '../assets/images/figma/museum_icon.png';
// import notesIcon from '../assets/images/figma/notes_icon.png';
import servicesHeroImage from '../assets/images/figma/services_hero_image.png';
import { MessageCircle } from "lucide-react";

// **MODIFIED FOR DEBUGGING**: Using placeholder URLs instead of local imports.
// This helps confirm if the problem is with the file paths.
const iconMap = {
    child_friendly: "https://placehold.co/40x40/000000/FFF?text=BC", // Placeholder for Birth Certificate
    business_center: "https://placehold.co/40x40/000000/FFF?text=BR", // Placeholder for Business Registration
    contact_mail: "https://placehold.co/40x40/000000/FFF?text=C",
    account_balance: "https://placehold.co/40x40/000000/FFF?text=A",
    description: "https://placehold.co/40x40/000000/FFF?text=D",
    default: "https://placehold.co/40x40/000000/FFF?text=?" // Fallback placeholder
};


const Services = () => {

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [showSidebar, setShowSidebar] = useState(false);
    const [showButtons, setShowButtons] = useState(false);

    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
                const response = await axios.get(`${apiBase}/api/v1/dashboard_services/`);
                console.log("Using API base:", apiBase);
                console.log("Backend Response Data:", response.data);

                if (Array.isArray(response.data)) {
                    const formattedServices = response.data.map(service => ({
                        id: service._id,
                        name: service.service_name,
                        // This will now use the placeholder URLs from the modified iconMap
                        icon: iconMap[service.icon_name] || iconMap.default
                    }));
                    setServices(formattedServices);
                } else {
                    throw new Error("Data format from API is incorrect. Expected an array.");
                }
                
                setError(null);
            } catch (err) {
                console.error("Failed to fetch or process services:", err);
                setError("Could not load services. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchServices();
    }, []);

    const handleServiceClick = (service) => {
        navigate(`/services/${service.id}/detail`);
    };

    const ServiceCard = ({ service }) => (
        <div className="flex flex-col items-center justify-center text-center cursor-pointer">
            <div 
                onClick={() => handleServiceClick(service)}
                className="bg-[#F8CA92] rounded-xl p-3 hover:shadow-md transition-shadow flex items-center justify-center w-[68px] h-[65px]"
            >
                {/* This img tag will now use the placeholder URL */}
                <img src={service.icon} alt={service.name} className="w-8 h-8 object-contain" />
            </div>
            <span className="text-[10px] font-normal text-black leading-tight mt-1 max-w-[80px] break-words">
                {service.name}
            </span>

        </div>
    );

    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white relative">
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            
            <div className="flex items-center justify-between px-6 py-4">
                <Header setShowSidebar={setShowSidebar} showLanguageSelector={true} language="EN" />
            </div>

            <div className="w-full h-px bg-black"></div>
            <div className="px-6 py-6"><h2 className="text-4xl font-normal text-black">Services</h2></div>

            <div className="px-8 mb-6">
                <div className="relative bg-[#F2963F] bg-opacity-60 rounded-xl p-3">
                    <div className="flex items-center">
                        <img src={searchIcon} alt="Search" className="w-8 h-8 mr-4" />
                        <input
                            type="text" placeholder="Search" value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent text-2xl text-black text-opacity-60 placeholder-black placeholder-opacity-60 outline-none flex-1"
                        />
                    </div>
                </div>
            </div>

            <div className="px-0 mb-6"><img src={servicesHeroImage} alt="Services" className="w-full h-40 object-cover" /></div>

            <div className="px-8 mb-6">
                <h3 className="text-sm font-normal text-black mb-4">All Services</h3>
                
                {isLoading && <p className="text-center text-gray-500">Loading services...</p>}
                
                {error && <p className="text-center text-red-500">{error}</p>}

                {!isLoading && !error && (
                    <div className="grid grid-cols-4 gap-4">
                        {filteredServices.length > 0 ? (
                            filteredServices.map((service) => (
                                <ServiceCard key={service.id} service={service} />
                            ))
                        ) : (
                            <p className="col-span-4 text-center text-gray-500">No services found.</p>
                        )}
                    </div>
                )}
            </div>

            <button 
                onClick={() => setShowButtons(!showButtons)}
                className="fixed bottom-6 right-6 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-yellow-600 transition-colors z-50"
            >
                <MessageCircle className="w-6 h-6" />
            </button>
            {showButtons && (
                <>
                    <div className="fixed bottom-32 right-6 w-48 z-40">
                         <button onClick={() => navigate('/contact-us')} className="w-full bg-white border border-gray-300 rounded-lg p-3 flex items-center gap-3 hover:bg-gray-50 transition-colors shadow-lg">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26c.31.17.69.17 1-.01L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            <span className="text-sm font-medium text-gray-700">Contact Us</span>
                        </button>
                    </div>
                    <div className="fixed bottom-20 right-6 w-48 z-40">
                        <button onClick={() => navigate('/chatbot')} className="w-full bg-white border border-gray-300 rounded-lg p-3 flex items-center gap-3 hover:bg-gray-50 transition-colors shadow-lg">
                            <MessageCircle className="w-5 h-5 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">Chat with AI</span>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Services;
