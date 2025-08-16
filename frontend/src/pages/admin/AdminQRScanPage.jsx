import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import { QrCode, Camera } from 'lucide-react';

const AdminQRScanPage = () => {
  const { user } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState('');

  const handleStartScan = () => {
    setIsScanning(true);
    // Simulate QR code scanning
    setTimeout(() => {
      setScanResult('QR Code Successfully Scanned!');
      setIsScanning(false);
    }, 3000);
  };

  const handleStopScan = () => {
    setIsScanning(false);
    setScanResult('');
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Admin Sidebar */}
      <AdminSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      
      {/* Header */}
      <AdminHeader 
        title={`${user?.service_id || 'Birth Certificate'} QR Scanner`}
        setShowSidebar={setShowSidebar}
      />

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md mx-auto">
          {/* QR Scanner Section */}
          <div className="bg-orange-200 rounded-xl p-8 text-center">
            <p className="text-sm font-normal text-black mb-6">
              Scan the user's QR code
            </p>
            
            {/* QR Scanner Display */}
            <div className="relative mx-auto w-48 h-48 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              {isScanning ? (
                <div className="text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">Scanning...</p>
                </div>
              ) : scanResult ? (
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white text-lg">✓</span>
                  </div>
                  <p className="text-sm text-green-600 font-medium">{scanResult}</p>
                </div>
              ) : (
                <QrCode size={80} className="text-red-900" />
              )}
            </div>
            
            {/* Scanner Controls */}
            <div className="mt-6 space-y-3">
              {!isScanning && !scanResult && (
                <button
                  onClick={handleStartScan}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Camera size={20} />
                  Start Scanning
                </button>
              )}
              
              {isScanning && (
                <button
                  onClick={handleStopScan}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Stop Scanning
                </button>
              )}
              
              {scanResult && (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setScanResult('');
                      setIsScanning(false);
                    }}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                  >
                    Scan Another Code
                  </button>
                  <button
                    onClick={() => console.log('Process completed')}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                  >
                    Process Complete
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Instructions */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 leading-relaxed">
              Position the QR code within the scanning area. The scanner will automatically detect and process the code.
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-blue-700 font-medium">
              QR Scanner Ready
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminQRScanPage;
