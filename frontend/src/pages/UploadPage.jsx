import React, { useState, useCallback } from 'react';
import { Menu, ChevronDown, X } from 'lucide-react';

// Logo placeholder component - replace with your actual logo in your project
const LogoIcon = () => (
  <div className="w-12 h-12 bg-orange-500 rounded-md flex items-center justify-center">
    <span className="text-white font-bold text-sm">SG</span>
  </div>
);

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  /**
   * Handles the file selection event.
   * It simulates an upload progress bar filling up once a file is chosen.
   */
  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setUploadProgress(0);

    // Simulate the upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20; // Faster simulation
      });
    }, 100);
  }, []);
  
  /**
   * Removes the selected file and resets the progress.
   */
  const handleRemoveFile = useCallback(() => {
      setSelectedFile(null);
      setUploadProgress(0);
      // Also reset the file input so the same file can be selected again
      document.getElementById('file-upload-input').value = '';
  }, []);

  /**
   * Handles the final submission logic.
   */
  const handleSubmit = () => {
    if (!selectedFile || uploadProgress < 100) {
      alert("Please wait for the file to finish uploading");
      return;
    }
    
    console.log("Submitting file:", selectedFile.name);
    
    // Simulate success/failure (you can change this logic based on your needs)
    const success = Math.random() > 0.3; // 70% success rate for demo
    
    setIsSuccess(success);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (isSuccess) {
      // Navigate to services page or handle successful submission
      setTimeout(() => {
        window.location.href = "/services";
      }, 300);
    }
  };

  return (
    <div className="flex justify-center bg-black min-h-screen p-0">
      <div className="bg-white w-[430px] h-[932px] flex flex-col rounded-none shadow-lg overflow-hidden relative">
        {/* Header Section */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <button className="p-1">
            <Menu className="w-6 h-6 text-gray-800" />
          </button>
          
          <div className="flex items-center gap-2">
            <LogoIcon />
            <h1 className="text-xl font-semibold text-gray-800">Smart Gov</h1>
          </div>
          
          <div className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-1.5">
            <span className="text-sm text-gray-700">English</span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </div>
        </header>

        {/* Main Content Section */}
        <main className="flex-1 p-6 flex flex-col">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Upload Files</h2>
            <p className="text-sm text-gray-500">
              Select the files you want to upload
            </p>
          </div>

          {/* File Upload Input Area */}
          <div className="flex-1 flex flex-col justify-center">
            <label 
              htmlFor="file-upload-input" 
              className="flex justify-center items-center w-full h-16 border-2 border-orange-500 border-solid rounded-lg cursor-pointer hover:bg-orange-50 transition-colors mb-8"
            >
              <span className="text-lg text-orange-500 font-medium">Choose file</span>
            </label>
            <input 
                id="file-upload-input" 
                type="file" 
                className="hidden" 
                onChange={handleFileChange} 
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            
            {/* Selected File Display Area */}
            {selectedFile && (
                <div className="mb-12">
                    <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-blue-600 underline font-medium flex-1 truncate mr-4">
                          {selectedFile.name}
                        </span>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-700 font-medium">{uploadProgress}%</span>
                            <button 
                              onClick={handleRemoveFile} 
                              className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-4 h-4 text-gray-600 hover:text-red-500" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Submit Button */}
            <div className="mt-auto">
              <button
                onClick={handleSubmit}
                disabled={!selectedFile || uploadProgress < 100}
                className={`w-full py-4 rounded-xl text-lg font-semibold transition-all duration-200 ${
                  selectedFile && uploadProgress === 100
                    ? 'bg-red-800 text-white hover:bg-red-900 shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Submit
              </button>
            </div>
          </div>
        </main>

        {/* Success/Failure Modal */}
        {showModal && (
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 mx-6 max-w-sm w-full text-center shadow-2xl">
              {/* Success Icon */}
              {isSuccess ? (
                <div className="w-20 h-20 bg-red-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              ) : (
                /* Failure Icon */
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
              )}
              
              {/* Modal Text */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {isSuccess ? 'Upload Successful!' : 'Upload Failed!'}
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                {isSuccess 
                  ? 'Your file has been uploaded successfully.' 
                  : 'There was an error uploading your file. Please try again.'
                }
              </p>
              
              {/* OK Button */}
              <button
                onClick={handleModalClose}
                className="bg-red-800 text-white px-8 py-2 rounded-lg font-semibold hover:bg-red-900 transition-colors"
              >
                Ok
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;