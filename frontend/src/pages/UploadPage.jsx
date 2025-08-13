import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import logoIcon from '../assets/images/figma/logo.png';

const UploadPage = () => {
  const { serviceId, docId } = useParams();
  const navigate = useNavigate();
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setShowSuccess(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleSuccessOk = () => {
    navigate(`/services/${serviceId}/detail`);
  };

  const handleBack = () => {
    navigate(`/services/${serviceId}/detail`);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-white relative">
        {/* Blurred Background */}
        <div className="absolute inset-0 backdrop-blur-sm bg-white/50">
          {/* Header (Blurred) */}
          <div className="flex items-center justify-between px-4 py-3 opacity-50">
            <button className="w-9 h-9">
              <img src={logoIcon} alt="Menu" className="w-full h-full object-contain" />
            </button>
            
            <div className="flex items-center">
              <img src={logoIcon} alt="Logo" className="w-15 h-20 mr-4" />
              <h1 className="text-2xl font-medium text-black">Smart Gov</h1>
            </div>

            <div className="flex items-center bg-white bg-opacity-20 border border-black/50 rounded-xl px-4 py-2">
              <span className="text-sm font-normal text-black/50 mr-2">English</span>
              <img src={logoIcon} alt="Language" className="w-6 h-6 opacity-50" />
            </div>
          </div>

          {/* Content (Blurred) */}
          <div className="px-5 py-4 opacity-50">
            <h2 className="text-2xl font-normal text-black mb-8">Upload Files</h2>
            <p className="text-sm text-gray-500 mb-8">Select the files you want to upload</p>
            
            <div className="border-2 border-orange-500 rounded-xl p-8 mb-8">
              <button className="text-2xl text-orange-500 font-normal">Choose file</button>
            </div>

            {selectedFile && (
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black">{selectedFile.name}</span>
                  <span className="text-sm text-black">{uploadProgress}%</span>
                  <button className="text-sm text-red-500">✕</button>
                </div>
              </div>
            )}

            <button className="w-full bg-[#8B3C2B] text-white py-4 rounded-xl text-2xl font-normal">
              Submit
            </button>
          </div>
        </div>

        {/* Success Modal */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-8 shadow-2xl max-w-sm w-full text-center">
            {/* Success Icon */}
            <div className="w-28 h-28 mx-auto mb-6 bg-[#8B3C2B] rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            
            {/* Success Text */}
            <h3 className="text-2xl font-normal text-[#8B3C2B] mb-8 text-center">
              Upload<br />Successful!
            </h3>
            
            {/* OK Button */}
            <button
              onClick={handleSuccessOk}
              className="bg-[#8B3C2B] text-white px-8 py-3 rounded-xl text-sm font-normal shadow-lg hover:bg-[#7A3024] transition-colors"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <button 
          onClick={handleBack}
          className="w-9 h-9 flex items-center justify-center"
        >
          <img src={logoIcon} alt="Back" className="w-full h-full object-contain" />
        </button>

        <div className="flex items-center">
          <img src={logoIcon} alt="Logo" className="w-15 h-20 mr-4" />
          <h1 className="text-2xl font-medium text-black">Smart Gov</h1>
        </div>

        <div className="flex items-center bg-white bg-opacity-20 border border-black rounded-xl px-4 py-2">
          <span className="text-sm font-normal text-black mr-2">English</span>
          <img src={logoIcon} alt="Language" className="w-6 h-6" />
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-4">
        <h2 className="text-2xl font-normal text-black mb-8">Upload Files</h2>
        <p className="text-sm text-gray-500 mb-8">Select the files you want to upload</p>
        
        {/* File Upload Area */}
        <div className="border-2 border-orange-500 rounded-xl p-8 mb-8 text-center">
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleFileSelect}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          <label 
            htmlFor="fileInput"
            className="cursor-pointer text-2xl text-orange-500 font-normal hover:text-orange-600 transition-colors"
          >
            Choose file
          </label>
        </div>

        {/* File Info */}
        {selectedFile && (
          <div className="mb-8">
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <span className="text-sm text-black">{selectedFile.name}</span>
              <div className="flex items-center space-x-4">
                {isUploading && (
                  <span className="text-sm text-black">{uploadProgress}%</span>
                )}
                <button 
                  onClick={() => setSelectedFile(null)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            </div>
            
            {/* Progress Bar */}
            {isUploading && (
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedFile || isUploading}
          className={`w-full py-4 rounded-xl text-2xl font-normal transition-colors ${
            selectedFile && !isUploading
              ? 'bg-[#8B3C2B] text-white hover:bg-[#7A3024]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isUploading ? `Uploading... ${uploadProgress}%` : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default UploadPage;
