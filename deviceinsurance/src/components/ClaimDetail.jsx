import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Calendar, DollarSign, FileText, AlertCircle, CheckCircle, XCircle, Clock, Loader2, Shield, User, Store, Download, ExternalLink, Upload, X } from 'lucide-react';
import { claimStatusColors } from '../constants/claimTypes';
import { formatCurrency } from '../constants/currency';
import { fetchClaimDetails, uploadClaimDocument } from '../utils/api';
import { getStoredAccessToken } from '../utils/storage';

const ClaimDetail = ({ claimId, onBack, onPolicyClick }) => {
  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [documentNames, setDocumentNames] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    const loadClaimDetails = async () => {
      if (!claimId) {
        setError('Claim ID is required');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');
      try {
        const accessToken = getStoredAccessToken();
        if (!accessToken) {
          throw new Error('Authentication required. Please log in.');
        }
        const data = await fetchClaimDetails(claimId, accessToken);
        setClaim(data);
      } catch (err) {
        console.error('Error loading claim details:', err);
        setError(err.message || 'Failed to load claim details');
      } finally {
        setLoading(false);
      }
    };

    loadClaimDetails();
  }, [claimId]);

  const reloadClaimDetails = async () => {
    if (!claimId) return;
    
    try {
      const accessToken = getStoredAccessToken();
      if (!accessToken) {
        throw new Error('Authentication required. Please log in.');
      }
      const data = await fetchClaimDetails(claimId, accessToken);
      setClaim(data);
    } catch (err) {
      console.error('Error reloading claim details:', err);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      file,
      id: Date.now() + Math.random(),
      name: file.name
    }));
    setSelectedFiles(prev => [...prev, ...newFiles]);
    
    // Initialize document names with file names
    const newNames = {};
    newFiles.forEach(f => {
      newNames[f.id] = f.name.replace(/\.[^/.]+$/, ''); // Remove extension for default name
    });
    setDocumentNames(prev => ({ ...prev, ...newNames }));
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (fileId) => {
    setSelectedFiles(prev => prev.filter(f => f.id !== fileId));
    setDocumentNames(prev => {
      const newNames = { ...prev };
      delete newNames[fileId];
      return newNames;
    });
  };

  const handleDocumentNameChange = (fileId, name) => {
    setDocumentNames(prev => ({
      ...prev,
      [fileId]: name
    }));
  };

  const handleUploadDocuments = async () => {
    if (selectedFiles.length === 0) {
      setUploadError('Please select at least one file to upload');
      return;
    }

    // Validate all files have names
    const missingNames = selectedFiles.filter(f => !documentNames[f.id]?.trim());
    if (missingNames.length > 0) {
      setUploadError('Please provide a name for all documents');
      return;
    }

    setUploading(true);
    setUploadError('');
    setUploadSuccess(false);

    try {
      const accessToken = getStoredAccessToken();
      if (!accessToken) {
        throw new Error('Authentication required. Please log in.');
      }

      // Upload all files
      const uploadPromises = selectedFiles.map(fileData => {
        const documentData = {
          document_name: documentNames[fileData.id].trim(),
          document_file: fileData.file,
          claim: claimId
        };
        return uploadClaimDocument(documentData, accessToken);
      });

      await Promise.all(uploadPromises);
      
      // Clear selected files
      setSelectedFiles([]);
      setDocumentNames({});
      setUploadSuccess(true);
      
      // Reload claim details to show new documents
      await reloadClaimDetails();
      
      // Clear success message after 3 seconds
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err) {
      console.error('Error uploading documents:', err);
      setUploadError(err.message || 'Failed to upload documents. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/5 rounded-2xl p-12 backdrop-blur-sm text-center">
          <Loader2 className="w-16 h-16 text-blue-400 mx-auto mb-4 animate-spin" />
          <p className="text-slate-400">Loading claim details...</p>
        </div>
      </div>
    );
  }

  if (error || !claim) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm text-center">
          <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <p className="text-slate-400 mb-4">{error || 'Claim not found'}</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full font-semibold transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const getStatusIcon = () => {
    const statusLower = claim.status?.toLowerCase();
    switch (statusLower) {
      case 'approved':
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case 'denied':
        return <XCircle className="w-6 h-6 text-red-400" />;
      case 'processing':
        return <Clock className="w-6 h-6 text-blue-400" />;
      default:
        return <Clock className="w-6 h-6 text-yellow-400" />;
    }
  };

  const handlePolicyClick = () => {
    if (claim.policy && onPolicyClick) {
      onPolicyClick(claim.policy);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </button>

      <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Claim #{claim.claim_number}</h1>
            <p className="text-slate-400 text-lg">
              {claim.claim_type} - {claim.policy_number}
            </p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${
            claimStatusColors[claim.status?.toLowerCase()] || claimStatusColors.pending
          }`}>
            {getStatusIcon()}
            <span className="capitalize">{claim.status}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold">Claim Information</h2>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-slate-400 text-sm">Claim Number:</span>
                <p className="font-semibold text-lg mt-1">{claim.claim_number}</p>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Policy Number:</span>
                <div className="flex items-center gap-2 mt-1">
                  <p className="font-semibold">{claim.policy_number}</p>
                  {claim.policy && onPolicyClick && (
                    <button
                      onClick={handlePolicyClick}
                      className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg text-blue-400 text-xs font-semibold transition-colors"
                    >
                      <Shield className="w-3 h-3" />
                      View Policy
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Claim Type:</span>
                <p className="font-semibold mt-1 capitalize">{claim.claim_type}</p>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Status:</span>
                <p className="font-semibold mt-1 capitalize">{claim.status}</p>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Verified:</span>
                <p className="font-semibold mt-1">
                  {claim.verified ? (
                    <span className="text-green-400 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Yes
                    </span>
                  ) : (
                    <span className="text-yellow-400 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      No
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-bold">Timeline</h2>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-slate-400 text-sm">Incident Date:</span>
                <p className="font-semibold mt-1">
                  {claim.incident_date ? new Date(claim.incident_date).toLocaleDateString() : '-'}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Submitted Date:</span>
                <p className="font-semibold mt-1">
                  {claim.created_at ? new Date(claim.created_at).toLocaleDateString() : '-'}
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Last Updated:</span>
                <p className="font-semibold mt-1">
                  {claim.updated_at ? new Date(claim.updated_at).toLocaleDateString() : '-'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Claim Owner and Device Outlet */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {claim.claim_owner && (
            <div className="bg-white/5 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-6 h-6 text-orange-400" />
                <h2 className="text-xl font-bold">Claim Owner</h2>
              </div>
              <p className="text-lg font-semibold">{claim.claim_owner}</p>
            </div>
          )}
          {claim.device_outlet_name && (
            <div className="bg-white/5 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Store className="w-6 h-6 text-green-400" />
                <h2 className="text-xl font-bold">Device Outlet</h2>
              </div>
              <p className="text-lg font-semibold">{claim.device_outlet_name}</p>
            </div>
          )}
        </div>

        <div className="bg-white/5 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-bold">Cost Information</h2>
          </div>
          <div>
            <span className="text-slate-400 text-sm">Estimated Cost:</span>
            <p className="font-semibold text-2xl text-green-400 mt-1">
              {formatCurrency(parseFloat(claim.estimated_cost || 0))}
            </p>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Description</h2>
          <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{claim.description}</p>
        </div>

        {/* Claim Documents */}
        <div className="bg-white/5 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold">Claim Documents</h2>
              {claim.claim_documents && claim.claim_documents.length > 0 && (
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold">
                  {claim.claim_documents.length}
                </span>
              )}
            </div>
          </div>

          {/* Upload Section */}
          <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-400" />
              Upload Documents
            </h3>
            
            {uploadSuccess && (
              <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-green-400 text-sm">Documents uploaded successfully!</p>
              </div>
            )}

            {uploadError && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{uploadError}</p>
              </div>
            )}

            <div className="mb-4">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
                accept="image/*,.pdf,.doc,.docx"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg text-blue-400 cursor-pointer transition-colors"
              >
                <Upload className="w-4 h-4" />
                Select Files
              </label>
              <p className="text-xs text-slate-400 mt-2">You can select multiple files (Images, PDF, Word documents)</p>
            </div>

            {/* Selected Files */}
            {selectedFiles.length > 0 && (
              <div className="space-y-3 mb-4">
                {selectedFiles.map((fileData) => (
                  <div
                    key={fileData.id}
                    className="bg-white/5 rounded-lg p-3 border border-white/10 flex items-start gap-3"
                  >
                    <FileText className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={documentNames[fileData.id] || ''}
                        onChange={(e) => handleDocumentNameChange(fileData.id, e.target.value)}
                        placeholder="Document name"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500 mb-2"
                      />
                      <p className="text-xs text-slate-400">{fileData.name} ({(fileData.file.size / 1024).toFixed(2)} KB)</p>
                    </div>
                    <button
                      onClick={() => removeFile(fileData.id)}
                      className="p-1 hover:bg-red-500/20 rounded transition-colors"
                    >
                      <X className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleUploadDocuments}
                  disabled={uploading || selectedFiles.length === 0}
                  className={`w-full px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    !uploading && selectedFiles.length > 0
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-105 shadow-xl'
                      : 'bg-white/20 text-white/50 cursor-not-allowed'
                  }`}
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Upload {selectedFiles.length} Document{selectedFiles.length !== 1 ? 's' : ''}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Existing Documents */}
          {claim.claim_documents && claim.claim_documents.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Uploaded Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {claim.claim_documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-blue-500/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1">{doc.document_name}</h3>
                        <p className="text-xs text-slate-400">
                          Uploaded: {doc.created_at ? new Date(doc.created_at).toLocaleDateString() : '-'}
                        </p>
                      </div>
                      <a
                        href={doc.document_file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg text-blue-400 text-xs font-semibold transition-colors"
                      >
                        <Download className="w-3 h-3" />
                        Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="bg-slate-700/30 rounded-lg p-4">
            <p className="text-sm text-slate-400">
              <strong className="text-slate-300">Note:</strong> Claim status updates will be reflected here. 
              If you have any questions about your claim, please contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimDetail;
