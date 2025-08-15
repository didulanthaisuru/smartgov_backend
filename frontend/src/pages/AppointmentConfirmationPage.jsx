import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import LanguageSwitcher from '../components/languageSwitcher';

const ConfirmationIcon = () => ( <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center"><svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div> );
const MenuIcon = () => ( <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg> );

const AppointmentConfirmationPage = () => {
    const navigate = useNavigate();
    const { appointmentId } = useParams();
    const location = useLocation();

    const appointmentData = location.state?.appointmentDetails || {
        service: 'N/A',
        location: 'N/A',
        date: 'N/A',
        time: 'N/A',
        duration: 'N/A'
    };
    
    const displayDate = appointmentData.date.includes('-') 
        ? new Date(appointmentData.date + 'T00:00:00').toLocaleDateString('en-CA')
        : appointmentData.date;

    const handleOkClick = () => {
        navigate(`/qr-code/${appointmentId}`);
    };

    return (
        <div className="mx-auto bg-gray-100 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white relative overflow-hidden shadow-2xl rounded-3xl" style={{ width: '430px', height: '932px' }}>
                <div className="absolute inset-0" style={{ filter: 'blur(2px)' }}>
                    <header className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
                        <button className="p-2"><MenuIcon /></button>
                        <div className="flex items-center gap-2"><div className="w-10 h-10 bg-orange-400 rounded-lg"></div><h1 className="text-xl font-semibold text-gray-800">Smart Gov</h1></div>
                        <LanguageSwitcher />
                    </header>
                    <div className="px-4 py-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">{appointmentData.service}</h2>
                    </div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center px-6" style={{ backdropFilter: 'blur(8px)' }}>
                    <div className="bg-orange-100 rounded-3xl p-8 w-full max-w-sm shadow-2xl">
                        <h2 className="text-xl font-semibold text-gray-800 mb-8 text-center">Appointment Details</h2>
                        <div className="bg-white bg-opacity-60 rounded-xl p-6 mb-8">
                            <div className="text-base" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 12px', alignItems: 'start' }}>
                                <span className="font-medium text-gray-700">Service</span><span className="text-gray-900">: {appointmentData.service}</span>
                                <span className="font-medium text-gray-700">Location</span><span className="text-gray-900">: {appointmentData.location}</span>
                                <span className="font-medium text-gray-700">Date & Time</span><span className="text-gray-900">: {displayDate} {appointmentData.time}</span>
                                <span className="font-medium text-gray-700 leading-tight">Expected Duration</span><span className="text-gray-900">: {appointmentData.duration}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-3 mb-8"><ConfirmationIcon /><p className="text-lg font-semibold text-gray-900">Appointment confirmed</p></div>
                        <div className="flex justify-center">
                            <button onClick={handleOkClick} className="bg-red-800 text-white font-medium px-12 py-3 rounded-xl hover:bg-red-900 transition-all duration-200 shadow-lg text-lg active:scale-95">OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentConfirmationPage;