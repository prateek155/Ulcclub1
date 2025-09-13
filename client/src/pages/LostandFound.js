import React, { useState, useRef } from "react";
import { Camera, Upload, X, Users, MapPin, FileImage, Eye,  } from 'lucide-react';
import { toast , ToastContainer} from "react-toastify";
import axios from "axios";

const LostandFound = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    venue: "",
    photo: null
  });
  const [preview, setPreview] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setShowCamera(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      
      canvas.toBlob((blob) => {
        const file = new File([blob], `captured-${Date.now()}.jpg`, { type: 'image/jpeg' });
        setFormData({ ...formData, photo: file });
        setPreview(canvas.toDataURL());
        stopCamera();
      }, 'image/jpeg', 0.8);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const handleCreate = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.description || !formData.photo || !formData.venue) {
    toast.error("All fields are required");
    return;
  }

  try {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("venue", formData.venue);
    data.append("photo", formData.photo);

    const res = await axios.post("https://ulcclub1.onrender.com/api/v1/lost/create-item", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      toast.success("Item added successfully!");
      setFormData({ name: "", description: "", venue: "", photo: null });
      setPreview(null);
    } else {
      toast.error(res.data.message || "Something went wrong");
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to add item. Please try again.");
  }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div style={styles.container}>
      <ToastContainer />
      <div style={styles.mainContent}>
        <div style={styles.formCard}>
          {/* Header */}
          <div style={styles.formHeader}>
            <h1 style={styles.headerTitle}>Lost & Found</h1>
            <p style={styles.headerSubtitle}>
              Found something? Add it here so it's easy for the owner to find
            </p>
          </div>

          <div style={styles.formBody}>
            {/* Photo Upload Section */}
            <div style={styles.formSection}>
              <h3 style={styles.sectionTitle}>
                <Camera size={24} color="#667eea" />
                Item Photo
              </h3>
              <div style={styles.photoUploadArea}>
                {preview ? (
                  <div style={styles.photoPreview}>
                    <img src={preview} alt="Item Preview" style={styles.previewImg} />
                    <div style={styles.photoControls}>
                      <button
                        type="button"
                        style={styles.changePhotoBtn}
                        onClick={() => {
                          setPreview(null);
                          setFormData({ ...formData, photo: null });
                        }}
                      >
                        <X size={16} /> Remove
                      </button>
                      <button
                        type="button"
                        style={styles.previewBtn}
                        onClick={togglePreview}
                      >
                        <Eye size={16} /> Preview
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={styles.uploadPlaceholder}>
                    <FileImage size={64} color="#9ca3af" />
                    <div style={styles.uploadButtons}>
                      <label style={styles.uploadBtn}>
                        <Upload size={20} />
                        Upload Photo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          style={{ display: 'none' }}
                        />
                      </label>
                      <button 
                        type="button" 
                        style={styles.cameraBtn}
                        onClick={startCamera}
                      >
                        <Camera size={20} />
                        Take Photo
                      </button>
                    </div>
                    <span style={styles.uploadHint}>PNG, JPG, GIF up to 10MB</span>
                  </div>
                )}
              </div>
            </div>

            {/* Basic Information */}
            <div style={styles.formSection}>
              <h3 style={styles.sectionTitle}>
                <Users size={24} color="#667eea" />
                Item Details
              </h3>
              <div style={styles.formGroup}>
                <label style={styles.label}>Item Name *</label>
                <input
                  style={styles.input}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Black iPhone, Blue Backpack, Keys with red keychain"
                  required
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Description *</label>
                <textarea
                  style={styles.textarea}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Provide detailed description including color, brand, distinctive features, etc."
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div style={styles.formSection}>
              <h3 style={styles.sectionTitle}>
                <MapPin size={24} color="#667eea" />
                Location Found
              </h3>
              <div style={styles.formGroup}>
                <label style={styles.label}>Where did you find it? *</label>
                <input
                  style={styles.input}
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  placeholder="e.g., Library 2nd floor, Cafeteria near entrance, Parking lot A"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div style={styles.formActions}>
              <button type="button" style={styles.submitBtn} onClick={handleCreate}>
                Add Found Item
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <div style={styles.modal}>
          <div style={styles.cameraContainer}>
            <h3 style={styles.cameraTitle}>Take a Photo</h3>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={styles.cameraVideo}
            />
            <div style={styles.cameraControls}>
              <button style={styles.captureBtn} onClick={capturePhoto}>
                <Camera size={20} />
                Capture
              </button>
              <button style={styles.closeCameraBtn} onClick={stopCamera}>
                <X size={20} />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && preview && (
        <div style={styles.modal} onClick={togglePreview}>
          <div style={styles.previewContainer} onClick={(e) => e.stopPropagation()}>
            <div style={styles.previewHeader}>
              <h3 style={styles.previewTitle}>Photo Preview</h3>
              <button style={styles.closePreviewBtn} onClick={togglePreview}>
                <X size={20} />
              </button>
            </div>
            <img src={preview} alt="Full Preview" style={styles.fullPreviewImg} />
            <div style={styles.previewInfo}>
              <p><strong>Item:</strong> {formData.name || 'Not specified'}</p>
              <p><strong>Location:</strong> {formData.venue || 'Not specified'}</p>
              <p><strong>Description:</strong> {formData.description || 'Not specified'}</p>
            </div>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '20px',
  },
  mainContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  formCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
    animation: 'slideUp 0.6s ease-out',
  },
  formHeader: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '3rem 2rem',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  headerTitle: {
    fontSize: '2.8rem',
    fontWeight: '800',
    marginBottom: '0.5rem',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    zIndex: 1,
  },
  headerSubtitle: {
    fontSize: '1.2rem',
    opacity: 0.9,
    fontWeight: '300',
    position: 'relative',
    zIndex: 1,
    lineHeight: '1.5',
    margin: 0,
  },
  formBody: {
    padding: '2.5rem',
  },
  formSection: {
    marginBottom: '2.5rem',
    padding: '2rem',
    background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.8), rgba(248, 250, 252, 0.8))',
    borderRadius: '20px',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: '1.5rem',
    paddingBottom: '0.75rem',
    borderBottom: '2px solid rgba(102, 126, 234, 0.1)',
  },
  photoUploadArea: {
    border: '3px dashed #cbd5e0',
    borderRadius: '20px',
    padding: '3rem 2rem',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.5), rgba(248, 250, 252, 0.5))',
    position: 'relative',
    overflow: 'hidden',
  },
  uploadPlaceholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
  },
  uploadButtons: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  uploadBtn: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '1rem 2rem',
    border: 'none',
    borderRadius: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1rem',
    textDecoration: 'none',
  },
  cameraBtn: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    padding: '1rem 2rem',
    border: 'none',
    borderRadius: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 6px 20px rgba(16, 185, 129, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1rem',
  },
  uploadHint: {
    fontSize: '0.9rem',
    color: '#6b7280',
    fontStyle: 'italic',
  },
  photoPreview: {
    position: 'relative',
    display: 'inline-block',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  },
  previewImg: {
    maxHeight: '300px',
    maxWidth: '100%',
    display: 'block',
    borderRadius: '15px',
  },
  photoControls: {
    position: 'absolute',
    bottom: '15px',
    left: '15px',
    right: '15px',
    display: 'flex',
    gap: '10px',
    justifyContent: 'space-between',
  },
  changePhotoBtn: {
    background: 'rgba(239, 68, 68, 0.9)',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.25rem',
    borderRadius: '12px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  previewBtn: {
    background: 'rgba(59, 130, 246, 0.9)',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.25rem',
    borderRadius: '12px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.75rem',
  },
  input: {
    width: '100%',
    padding: '1rem 1.25rem',
    border: '2px solid #e5e7eb',
    borderRadius: '15px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '1rem 1.25rem',
    border: '2px solid #e5e7eb',
    borderRadius: '15px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    resize: 'vertical',
    minHeight: '120px',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  formActions: {
    textAlign: 'center',
    paddingTop: '2rem',
    borderTop: '2px solid rgba(102, 126, 234, 0.1)',
  },
  submitBtn: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    padding: '1.25rem 3rem',
    border: 'none',
    borderRadius: '20px',
    fontSize: '1.2rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '2rem',
  },
  cameraContainer: {
    background: 'white',
    borderRadius: '20px',
    padding: '2rem',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center',
    position: 'relative',
  },
  cameraTitle: {
    marginBottom: '1rem',
    color: '#2d3748',
  },
  cameraVideo: {
    width: '100%',
    maxWidth: '500px',
    borderRadius: '15px',
    marginBottom: '2rem',
  },
  cameraControls: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  captureBtn: {
    background: '#10b981',
    color: 'white',
    padding: '1rem 2rem',
    border: 'none',
    borderRadius: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  closeCameraBtn: {
    background: '#ef4444',
    color: 'white',
    padding: '1rem 2rem',
    border: 'none',
    borderRadius: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  previewContainer: {
    background: 'white',
    borderRadius: '20px',
    padding: '2rem',
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'auto',
    position: 'relative',
  },
  previewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '2px solid #e5e7eb',
  },
  previewTitle: {
    color: '#2d3748',
    margin: 0,
  },
  closePreviewBtn: {
    background: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '0.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullPreviewImg: {
    maxWidth: '100%',
    maxHeight: '60vh',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    marginBottom: '2rem',
    display: 'block',
    margin: '0 auto 2rem auto',
  },
  previewInfo: {
    background: '#f8fafc',
    padding: '1.5rem',
    borderRadius: '15px',
    textAlign: 'left',
  },
};

export default LostandFound;
