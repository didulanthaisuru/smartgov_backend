import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DocumentUploadPage = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Doc 1', uploaded: false, accuracy: 86.36, status: 'Approved' },
    { id: 2, name: 'Doc 2', uploaded: false, accuracy: 63.36, status: 'Pending' },
    { id: 3, name: 'Doc 3', uploaded: false, accuracy: 83.36, status: 'Pending' },
    { id: 4, name: 'Doc 4', uploaded: false, accuracy: null, status: '-' },
    { id: 5, name: 'Doc 5', uploaded: false, accuracy: 80.36, status: 'Rejected' }
  ]);

  const handleDocumentUpload = (docId) => {
    setDocuments(docs => 
      docs.map(doc => 
        doc.id === docId ? { ...doc, uploaded: true } : doc
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'text-green-600';
      case 'Pending': return 'text-yellow-600';
      case 'Rejected': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getAccuracyMessage = (accuracy, status) => {
    if (accuracy && accuracy < 70) {
      return 'accuracy is too low, please resubmit';
    }
    if (status === 'Rejected') {
      return 'please resubmit';
    }
    if (status === 'Approved') {
      return 'Officer needs to be approved.';
    }
    return '';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <button 
          onClick={() => navigate('/services')}
          className="w-9 h-9 flex items-center justify-center"
        >
          <div className="w-9 h-9 bg-gray-300 rounded"></div>
        </button>

        <div className="flex items-center">
          <div className="w-15 h-20 bg-gray-300 rounded mr-4"></div>
          <h1 className="text-2xl font-medium text-black">Smart Gov</h1>
        </div>

        <div className="flex items-center bg-white bg-opacity-20 border border-black rounded-xl px-4 py-2">
          <span className="text-sm font-normal text-black mr-2">English</span>
          <div className="w-6 h-6 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Service Title */}
      <div className="px-6 py-4">
        <h2 className="text-2xl font-normal text-black">Birth Certificate new/issue</h2>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-black mx-0"></div>

      {/* Document Checklist Section */}
      <div className="px-7 py-4">
        <h3 className="text-2xl font-normal text-black mb-4">Document checklist</h3>
        
        {/* Orange header bar */}
        <div className="bg-[#F8CA92] bg-opacity-50 rounded-xl px-4 py-2 mb-4">
          <div className="text-center text-black opacity-60">Document verification in progress</div>
        </div>

        {/* Document Table */}
        <div className="bg-white border border-black">
          {/* Table Header */}
          <div className="grid grid-cols-4 border-b border-black bg-gray-50">
            <div className="p-3 border-r border-black">
              <span className="text-sm font-normal text-black">Document name</span>
            </div>
            <div className="p-3 border-r border-black">
              <span className="text-sm font-normal text-black">Uploaded Status</span>
            </div>
            <div className="p-3 border-r border-black">
              <span className="text-sm font-normal text-black">Accuracy</span>
            </div>
            <div className="p-3">
              <span className="text-sm font-normal text-black">Document status</span>
            </div>
          </div>

          {/* Table Rows */}
          {documents.map((doc, index) => (
            <div key={doc.id} className={`grid grid-cols-4 ${index < documents.length - 1 ? 'border-b border-gray-200' : ''}`}>
              <div className="p-3 border-r border-gray-200 flex items-center">
                <span className="text-sm font-normal text-black">{doc.name}</span>
              </div>
              <div className="p-3 border-r border-gray-200 flex items-center">
                <button 
                  onClick={() => handleDocumentUpload(doc.id)}
                  className="bg-[#F8CA92] rounded-xl px-3 py-2 text-xs flex items-center space-x-2 hover:bg-[#F7C485] transition-colors"
                >
                  <div className="w-3 h-4 bg-gray-600 rounded"></div>
                  <span className="text-black">Upload digital copy</span>
                </button>
              </div>
              <div className="p-3 border-r border-gray-200 flex flex-col items-start justify-center">
                {doc.accuracy && (
                  <span className="text-xs font-normal text-black">{doc.accuracy}%</span>
                )}
                {getAccuracyMessage(doc.accuracy, doc.status) && (
                  <span className="text-xs text-red-600 mt-1">
                    !{getAccuracyMessage(doc.accuracy, doc.status)}
                  </span>
                )}
              </div>
              <div className="p-3 flex items-center">
                <span className={`text-xs font-normal ${getStatusColor(doc.status)}`}>
                  {doc.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Tracking Section */}
      <div className="px-7 py-6">
        <div className="bg-[#F8CA92] rounded-xl p-6 shadow-md">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-black">Getting Birth Certificate</h3>
            <p className="text-sm text-black">63% Completed</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#8C322A] rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-bold text-black">Form CR01 Received</p>
                <p className="text-xs text-black opacity-50">completed on 2025-08-05</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#8C322A] rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-black opacity-50">GN submitted Form B23</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-[#8C322A] rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-black opacity-50">Printing the new certificate</p>
                <p className="text-xs text-black opacity-50">Estimated to complete on 2025-08-09</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <div className="fixed bottom-6 right-6">
        <button 
          onClick={() => navigate('/chatbot')}
          className="bg-[#F8CA92] border border-black rounded-xl px-4 py-3 shadow-inner flex items-center hover:bg-[#F7C485] transition-colors"
        >
          <span className="text-sm font-normal text-black mr-2">Chat</span>
          <div className="w-7 h-7 bg-gray-300 rounded flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default DocumentUploadPage;
