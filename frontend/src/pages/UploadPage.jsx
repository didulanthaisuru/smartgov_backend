import React, { useState, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Menu, ChevronDown, X } from 'lucide-react';

const LogoIcon = () => (
  <div className="w-12 h-12 bg-orange-500 rounded-md flex items-center justify-center">
    <span className="text-white font-bold text-sm">SG</span>
  </div>
);

const UploadPage = () => {
  const { appointmentId, docId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const docName = location.state?.docName || 'document';

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadProgress(0);
    }
  }, []);
  
  const handleRemoveFile = useCallback(() => {
      setSelectedFile(null);
      setUploadProgress(0);
      document.getElementById('file-upload-input').value = '';
  }, []);

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }
    
    setIsUploading(true);

    const formData = new FormData();
    // **MODIFIED**: Appending the file and IDs with the exact keys your backend requires.
    formData.append('file', selectedFile);
    formData.append('booking_id', appointmentId); // Changed 'appointment_id' to 'booking_id'
    formData.append('required_doc_id', docId);           // Changed 'document_id' to 'doc_id'

    try {
      // **MODIFIED**: Using the exact endpoint URL you provided.
      const response = await axios.post('http://127.0.0.1:8000/api/v1/upload_document/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });

      console.log("File uploaded successfully:", response.data);
      setIsSuccess(true);
      setShowModal(true);

    } catch (error) {
      console.error("Error uploading file:", error);
      setIsSuccess(false);
      setShowModal(true);
    } finally {
      setIsUploading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (isSuccess) {
      // On success, navigate back to the document list page
      navigate(-1); 
    }
  };

  return (
    <div className="flex justify-center bg-black min-h-screen p-0">
      <div className="bg-white w-[430px] h-[932px] flex flex-col rounded-none shadow-lg overflow-hidden relative">
        <header className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <button className="p-1"><Menu className="w-6 h-6 text-gray-800" /></button>
          <div className="flex items-center gap-2">
            <LogoIcon />
            <h1 className="text-xl font-semibold text-gray-800">Smart Gov</h1>
          </div>
          <div className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-1.5">
            <span className="text-sm text-gray-700">English</span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </div>
        </header>

        <main className="flex-1 p-6 flex flex-col">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Upload File</h2>
            <p className="text-sm text-gray-500">
              You are uploading: <span className="font-semibold">{docName}</span>
            </p>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <label htmlFor="file-upload-input" className="flex justify-center items-center w-full h-16 border-2 border-orange-500 border-solid rounded-lg cursor-pointer hover:bg-orange-50 transition-colors mb-8">
              <span className="text-lg text-orange-500 font-medium">Choose file</span>
            </label>
            <input id="file-upload-input" type="file" className="hidden" onChange={handleFileChange} />
            
            {selectedFile && (
                <div className="mb-12">
                  <div className="text-sm text-blue-600 font-medium truncate mb-2">{selectedFile.name}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{isUploading ? 'Uploading...' : 'Ready to submit'}</span>
                    <span>{uploadProgress}%</span>
                  </div>
                </div>
            )}
          </div>
          
          <div className="mt-auto">
            <button
              onClick={handleSubmit}
              disabled={!selectedFile || isUploading}
              className="w-full py-4 rounded-xl text-lg font-semibold transition-all duration-200 bg-red-800 text-white hover:bg-red-900 shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isUploading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </main>

        {showModal && (
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 mx-6 max-w-sm w-full text-center shadow-2xl">
              {isSuccess ? (
                <div className="w-20 h-20 bg-red-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
              ) : (
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {isSuccess ? 'Upload Successful!' : 'Upload Failed!'}
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                {isSuccess ? 'Your file has been uploaded successfully.' : 'There was an error. Please try again.'}
              </p>
              <button onClick={handleModalClose} className="bg-red-800 text-white px-8 py-2 rounded-lg font-semibold hover:bg-red-900 transition-colors">Ok</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;