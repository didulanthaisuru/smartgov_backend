import React, { useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';
import { QrCode, Upload } from 'lucide-react';
import jsQR from 'jsqr';
import axios from 'axios';

const AdminQRScanPage = () => {
  const { user } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);
  const [scanResult, setScanResult] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null); // store actual file
  const [apiResponse, setApiResponse] = useState(null);

  const canvasRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploadedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const image = new Image();
      image.onload = () => {
        setPreviewImage(e.target.result);

        // Draw image on canvas for jsQR
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        if (code) {
          setScanResult(code.data);
        } else {
          setScanResult('No QR code found in image.');
        }
      };
      image.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleProcessComplete = async () => {
    if (!uploadedFile) return;

    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);

      const response = await axios.post(
        'http://localhost:8000/api/v1/qr/scan', // your API
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      const resData = response.data;

      if (resData.success && resData.results && resData.results.length > 0) {
        setApiResponse(resData.results[0].data);
      } else {
        setApiResponse('No valid QR data found.');
      }
    } catch (error) {
      console.error('Error processing QR:', error);
      setApiResponse('Error processing QR code.');
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Sidebar */}
      <AdminSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      {/* Header */}
      <AdminHeader
        title={`${user?.service_id || 'Birth Certificate'} QR Scanner`}
        setShowSidebar={setShowSidebar}
      />

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md mx-auto">
          <div className="bg-orange-200 rounded-xl p-8 text-center">
            <p className="text-sm font-normal text-black mb-6">
              Scan or Upload a QR Code
            </p>

            {/* QR Display Box */}
            <div className="relative mx-auto w-48 h-48 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Uploaded QR"
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={() => {
                    if (scanResult) {
                      alert(scanResult);
                    }
                  }}
                />
              ) : (
                <QrCode size={80} className="text-red-900" />
              )}
            </div>

            {/* Controls */}
            <div className="mt-6 space-y-3">
              {/* Upload Button */}
              <label className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors cursor-pointer">
                <Upload size={20} />
                Upload QR Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              {/* Process Complete */}
              {scanResult && (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setScanResult('');
                      setPreviewImage(null);
                      setUploadedFile(null);
                      setApiResponse(null);
                    }}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                  >
                    Scan Another Code
                  </button>

                  <button
                    onClick={handleProcessComplete}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                  >
                    Process Complete
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* API Response Display */}
          {apiResponse && (
            <div className="mt-4 p-4 bg-green-100 rounded-lg text-center">
              <h3 className="text-sm font-bold text-gray-700">Scanned QR Data:</h3>
              <p className="text-lg font-semibold text-green-700">{apiResponse}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminQRScanPage;
