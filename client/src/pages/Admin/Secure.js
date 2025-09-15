import React, { useState, useEffect } from 'react';
import { Upload, File, Play, Mail, Shield, X, Check, Lock, Unlock, Zap, FileImage, FileText, Download } from 'lucide-react';

const FileUploadApp = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [fileContent, setFileContent] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/secure/files');
      const data = await response.json();
      setFiles(data.files || data.data || []);
    } catch (error) {
      showMessage('error', 'Failed to fetch files');
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/v1/secure/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        showMessage('success', 'File uploaded successfully!');
        fetchFiles();
      } else {
        showMessage('error', data.message || 'Upload failed');
      }
    } catch (error) {
      showMessage('error', 'Failed to upload file');
    } finally {
      setIsLoading(false);
      event.target.value = '';
    }
  };

  const closeFileViewer = () => {
    setFileContent(null);
    setSelectedFile(null);
  };


  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const getFileIcon = (file = {}) => {
    const mimeType = file.mimetype || file.mimeType || '';
    if (mimeType.startsWith('image/')) return <FileImage className="w-5 h-5" style={{ color: '#00ff88' }} />;
    if (mimeType.startsWith('video/')) return <Play className="w-5 h-5" style={{ color: '#00d4ff' }} />;
    if (mimeType.startsWith('audio/')) return <Play className="w-5 h-5" style={{ color: '#ff0080' }} />;
    if (mimeType === 'application/pdf') return <FileText className="w-5 h-5" style={{ color: '#00d4ff' }} />;
    return <File className="w-5 h-5" style={{ color: '#ffffff' }} />;
  };

  const handleDownload = async () => {
    if (!fileContent || !selectedFile) {
      console.log('No file content or selected file for download');
      return;
    }
    
    try {
      console.log('Attempting to download:', fileContent);
      
      // Method 1: Try direct download link
      const link = document.createElement('a');
      link.href = fileContent;
      link.download = selectedFile.originalname || selectedFile.originalName || 'download';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // Add to DOM, click, then remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('✅ Download initiated');
      showMessage('success', 'Download started!');
      
    } catch (error) {
      console.error('❌ Download error:', error);
      
      // Method 2: Fallback - open in new tab
      try {
        window.open(fileContent, '_blank');
        showMessage('success', 'File opened in new tab');
      } catch (fallbackError) {
        console.error('❌ Fallback download failed:', fallbackError);
        showMessage('error', 'Download failed. Please check the file URL.');
      }
    }
  };

  const renderFileContent = () => {
    if (!fileContent || !selectedFile) {
      console.log('No file content or selected file'); // Debug log
      return (
        <div style={{ 
          padding: '40px 20px', 
          background: 'rgba(255, 255, 255, 0.05)', 
          borderRadius: '12px', 
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <FileText size={60} style={{ color: '#666', marginBottom: '20px' }} />
          <p style={{ opacity: 0.7 }}>No content available</p>
        </div>
      );
    }

    console.log('Rendering file content:', { fileContent, selectedFile }); // Debug log

    const mimetype = selectedFile.mimetype || selectedFile.mimeType || '';
    const originalName = selectedFile.originalname || selectedFile.originalName || 'file';

    // For images
    if (mimetype.startsWith('image/')) {
      return (
        <div style={{ textAlign: 'center', width: '100%' }}>
          <img 
            src={fileContent} 
            alt={originalName} 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '400px', 
              objectFit: 'contain', 
              borderRadius: '12px',
              marginBottom: '20px'
            }} 
            onError={(e) => {
              console.error('Image load error:', e);
              e.target.style.display = 'none';
            }}
          />
          <button
            onClick={handleDownload}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #00d4ff, #0080ff)',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            <Download size={20} />
            Download {originalName}
          </button>
        </div>
      );
    }

    // For videos
    if (mimetype.startsWith('video/')) {
      return (
        <div style={{ textAlign: 'center', width: '100%' }}>
          <video 
            controls 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '400px', 
              borderRadius: '12px',
              marginBottom: '20px'
            }} 
            src={fileContent}
            onError={(e) => {
              console.error('Video load error:', e);
            }}
          >
            Your browser does not support the video tag.
          </video>
          <button
            onClick={handleDownload}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #00d4ff, #0080ff)',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            <Download size={20} />
            Download {originalName}
          </button>
        </div>
      );
    }

    // For audio files
    if (mimetype.startsWith('audio/')) {
      return (
        <div style={{ 
          width: '100%', 
          padding: '20px', 
          background: 'rgba(255, 255, 255, 0.05)', 
          borderRadius: '12px', 
          textAlign: 'center' 
        }}>
          <div style={{ marginBottom: '15px', fontSize: '1.2rem', color: '#00d4ff' }}>🎵 Audio File</div>
          <audio 
            controls 
            style={{ 
              width: '100%', 
              marginBottom: '20px' 
            }} 
            src={fileContent}
            onError={(e) => {
              console.error('Audio load error:', e);
            }}
          >
            Your browser does not support the audio tag.
          </audio>
          <button
            onClick={handleDownload}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #00d4ff, #0080ff)',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            <Download size={20} />
            Download {originalName}
          </button>
        </div>
      );
    }

    // For PDFs and other documents
    return (
      <div style={{ 
        padding: '40px 20px', 
        background: 'rgba(255, 255, 255, 0.05)', 
        borderRadius: '12px', 
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        width: '100%'
      }}>
        <FileText size={60} style={{ color: '#00d4ff', marginBottom: '20px' }} />
        <h3 style={{ color: '#ffffff', marginBottom: '15px', fontSize: '1.5rem' }}>Document Ready</h3>
        <p style={{ opacity: 0.7, marginBottom: '20px', fontSize: '1.1rem' }}>Neural scan complete. Document is ready for viewing.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
          {/* View/Open button for PDFs */}
          {mimetype === 'application/pdf' && (
            <button
              onClick={() => window.open(fileContent, '_blank')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #00ff88, #00d4ff)',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              <FileText size={20} />
              View PDF
            </button>
          )}
          
          {/* Download button */}
          <button
            onClick={handleDownload}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #00d4ff, #0080ff)',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            <Download size={20} />
            Download {originalName}
          </button>
        </div>
      </div>
    );
  };

  const handleDrag = (e, isDragEnter) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(isDragEnter);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const event = { target: { files: [droppedFile] } };
      handleFileUpload(event);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: '#ffffff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%)',
        animation: 'pulse 4s ease-in-out infinite alternate'
      }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '40px 20px' }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '50px',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          padding: '30px',
          maxWidth: '800px',
          margin: '0 auto 50px auto'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px',
            marginBottom: '20px'
          }}>
            <Shield size={40} style={{ color: '#00d4ff' }} />
            <h1 style={{
              fontSize: '2.5rem',
              background: 'linear-gradient(135deg, #00d4ff, #ff0080)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
              fontWeight: '700'
            }}>
              AI Secure Vault
            </h1>
          </div>
          <p style={{
            fontSize: '1.1rem',
            opacity: 0.8,
            margin: 0,
            lineHeight: 1.6
          }}>
            Advanced neural-encrypted file storage with quantum-level security protocols
          </p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: message.type === 'success' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 1000,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            animation: 'slideIn 0.3s ease-out'
          }}>
            {message.type === 'success' ? <Check size={20} /> : <X size={20} />}
            {message.text}
          </div>
        )}

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: fileContent ? '1fr 1fr' : '1fr',
          gap: '30px'
        }}>
          {/* Upload Section */}
          <div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              backdropFilter: 'blur(20px)',
              border: `2px dashed ${dragActive ? '#00d4ff' : 'rgba(255, 255, 255, 0.2)'}`,
              borderRadius: '20px',
              padding: '50px 30px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              transform: dragActive ? 'scale(1.02)' : 'scale(1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '30px'
            }}
            onDragEnter={(e) => handleDrag(e, true)}
            onDragLeave={(e) => handleDrag(e, false)}
            onDragOver={(e) => handleDrag(e, true)}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload').click()}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: dragActive ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
                transition: 'all 0.3s ease'
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <Upload size={60} style={{
                  color: dragActive ? '#00d4ff' : '#888',
                  marginBottom: '20px',
                  animation: dragActive ? 'bounce 1s infinite' : 'none'
                }} />
                <h3 style={{
                  fontSize: '1.4rem',
                  marginBottom: '15px',
                  color: dragActive ? '#00d4ff' : '#ffffff'
                }}>
                  {dragActive ? 'Release to Encrypt' : 'Drop Files to Secure'}
                </h3>
                <p style={{
                  opacity: 0.7,
                  fontSize: '1rem',
                  marginBottom: '20px'
                }}>
                  {isLoading ? 'Neural encryption in progress...' : 'Drag & drop your files here, or click to browse'}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '10px',
                  fontSize: '0.9rem',
                  opacity: 0.6
                }}>
                  <span>📄 Documents</span>
                  <span>🖼️ Images</span>
                  <span>🎵 Audio</span>
                  <span>🎬 Video</span>
                </div>
              </div>

              <input
                type="file"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="file-upload"
                accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
              />
            </div>

            {/* Files Grid */}
            {files.length > 0 && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                padding: '30px'
              }}>
                <h2 style={{
                  marginBottom: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '1.5rem'
                }}>
                  <Zap size={28} style={{ color: '#ff0080' }} />
                  Encrypted Files ({files.length})
                </h2>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '20px'
                }}>
                  {files.map((file) => {
                    const originalName = file.originalname || file.originalName || 'file';
                    const uploadedAt = file.createdAt || file.uploadedAt;
                    const fileSize = file.size ? (file.size / 1024).toFixed(1) + ' KB' : 'Unknown size';
                    
                    return (
                      <div key={file._id} style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        padding: '20px',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}>
                        
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '4px',
                          background: 'linear-gradient(90deg, #ff0080, #00d4ff, #00ff88)',
                          animation: 'gradientShift 3s ease-in-out infinite'
                        }} />

                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          marginBottom: '15px'
                        }}>
                          {getFileIcon(file)}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <h3 style={{
                              margin: 0,
                              fontSize: '1.1rem',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {originalName}
                            </h3>
                          </div>
                          <Lock size={20} style={{ color: '#ff0080' }} />
                        </div>

                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '15px',
                          fontSize: '0.9rem',
                          opacity: 0.7
                        }}>
                          <span>{fileSize}</span>
                          <span>{uploadedAt ? new Date(uploadedAt).toLocaleDateString() : 'N/A'}</span>
                        </div>

                       
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {files.length === 0 && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                padding: '40px',
                textAlign: 'center'
              }}>
                <File size={60} style={{ color: '#666', marginBottom: '20px' }} />
                <h3 style={{ marginBottom: '10px', color: '#888' }}>No Files Uploaded</h3>
                <p style={{ opacity: 0.6 }}>Upload your first file to get started with neural encryption</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default FileUploadApp;
