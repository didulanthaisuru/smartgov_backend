import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logoIcon from "../assets/images/figma/logo.png";

const UploadPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(100); // Screenshot shows instantly 100%

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleSubmit = () => {
    // Here you can handle the real upload
    console.log("File submitted:", selectedFile);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <button onClick={() => navigate(-1)} className="w-6 h-6">
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path
              d="M15 18l-6-6 6-6"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="flex items-center space-x-2">
          <img src={logoIcon} alt="Logo" className="w-8 h-8" />
          <span className="text-lg font-medium text-black">Smart Gov</span>
        </div>

        <select className="border rounded px-2 py-1 text-sm">
          <option>English</option>
        </select>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center px-6 mt-6">
        <h2 className="text-xl font-medium mb-2">Upload Files</h2>
        <p className="text-sm text-gray-500 mb-6">
          Select the files you want to upload
        </p>

        {/* Choose File Button */}
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileSelect}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />
        <label
          htmlFor="fileInput"
          className="border-2 border-orange-500 text-orange-500 rounded-lg px-12 py-3 text-lg cursor-pointer hover:bg-orange-50 mb-6"
        >
          Choose file
        </label>

        {/* File Info */}
        {selectedFile && (
          <div className="flex items-center justify-between w-full max-w-xs mb-6">
            <span className="text-sm">{selectedFile.name}</span>
            <span className="text-sm">{uploadProgress}%</span>
            <button
              onClick={() => setSelectedFile(null)}
              className="text-sm text-red-500"
            >
              ✕
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedFile}
          className={`w-full max-w-xs py-3 rounded-lg text-white text-lg ${
            selectedFile
              ? "bg-[#8B3C2B] hover:bg-[#7A3024]"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UploadPage;
