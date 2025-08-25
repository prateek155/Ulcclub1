import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import { toast , ToastContainer} from "react-toastify";
import axios from "axios";
import { Camera, Calendar, Users, Clock } from 'lucide-react';
import "react-toastify/dist/ReactToastify.css";

const Sponsers = () => {
  const [sponsersList, setSponsersList] = useState([]);
  const [formData, setFormData] = useState({
    sponsername: "",
    description: "",
    startDate:"",
    endDate: "",
    photo: null
  });

  const loadSponsers = async () => {
    try {
      const { data } = await axios.get("https://ulcclub1.onrender.com/api/v1/sponsers/get-sponsers");
      setSponsersList(data?.sponser || []);
    } catch (error) {
      console.error("Error loading sponsers:", error);
    }
  };

  const [preview, setPreview] = useState(null);
  
  useEffect(() => {
     loadSponsers();
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.sponsername || !formData.description || !formData.photo ) {
      return toast.error("All fields are required");
    }
    try {
      const sponserData = new FormData();
      sponserData.append("sponsername", formData.sponsername);
      sponserData.append("description", formData.description);
      sponserData.append("photo", formData.photo);
      sponserData.append("startDate", formData.startDate);
      sponserData.append("endDate", formData.endDate);

      const { data } = await axios.post(
        "https://ulcclub1.onrender.com/api/v1/sponsers/create",
        sponserData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      );
      if (data?.success) {
        toast.success("Sponser Created Successfully");
        loadSponsers(); 
        // Reset form
        setFormData({
          sponsername: "",
          description: "",
          startDate:"",
          endDate: "",
          photo: null
        });
        setPreview(null);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const styles = {
    product: {
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0f0f23 100%)',
      minHeight: '100vh',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    },
    container: {
      padding: '2rem',
      background: 'transparent',
      minHeight: '100vh',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      position: 'relative',
      zIndex: 1
    },
    row: {
      display: 'flex',
      gap: '3rem',
      maxWidth: '1600px',
      margin: '0 auto',
      flexWrap: 'wrap'
    },
    sidebarCol: {
      flex: '0 0 280px',
      background: 'rgba(255, 255, 255, 0.02)',
      borderRadius: '24px',
      padding: '2rem',
      height: 'fit-content',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
      position: 'sticky',
      top: '20px'
    },
    mainContentCol: {
      flex: '1',
      minWidth: '700px'
    },
    eventFormCard: {
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(25px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '32px',
      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      overflow: 'hidden',
      animation: 'slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative'
    },
    formHeader: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      color: 'white',
      padding: '4rem 3rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    headerTitle: {
      fontSize: '3.5rem',
      fontWeight: '800',
      margin: '0 0 1rem 0',
      textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      position: 'relative',
      zIndex: 2,
      letterSpacing: '-0.02em',
      background: 'linear-gradient(135deg, #fff 0%, #f0f9ff 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    headerSubtitle: {
      fontSize: '1.3rem',
      opacity: 0.9,
      margin: 0,
      position: 'relative',
      zIndex: 2,
      fontWeight: '400',
      letterSpacing: '0.01em'
    },
    eventForm: {
      padding: '3rem',
      background: 'rgba(255, 255, 255, 0.01)'
    },
    formSection: {
      marginBottom: '3.5rem',
      padding: '2.5rem',
      background: 'rgba(255, 255, 255, 0.02)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden'
    },
    sectionTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      fontSize: '1.6rem',
      fontWeight: '700',
      color: '#e2e8f0',
      marginBottom: '2rem',
      paddingBottom: '1rem',
      borderBottom: '2px solid rgba(102, 126, 234, 0.3)',
      position: 'relative'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '2rem'
    },
    formGroup: {
      marginBottom: '2rem'
    },
    label: {
      display: 'block',
      fontSize: '1rem',
      fontWeight: '600',
      color: '#cbd5e1',
      marginBottom: '0.75rem',
      letterSpacing: '0.01em'
    },
    input: {
      width: '100%',
      padding: '1.25rem 1.5rem',
      border: '2px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      fontSize: '1.1rem',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      boxSizing: 'border-box',
      color: '#e2e8f0',
      fontFamily: 'inherit'
    },
    textarea: {
      width: '100%',
      padding: '1.25rem 1.5rem',
      border: '2px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      fontSize: '1.1rem',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      resize: 'vertical',
      minHeight: '120px',
      boxSizing: 'border-box',
      color: '#e2e8f0',
      fontFamily: 'inherit'
    },
    photoUploadArea: {
      border: '2px dashed rgba(102, 126, 234, 0.3)',
      borderRadius: '20px',
      padding: '3rem',
      textAlign: 'center',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      background: 'rgba(255, 255, 255, 0.02)',
      position: 'relative',
      overflow: 'hidden'
    },
    uploadPlaceholder: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem'
    },
    uploadContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem'
    },
    uploadBtn: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '1rem 2rem',
      border: 'none',
      borderRadius: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
      fontSize: '1.1rem',
      position: 'relative',
      overflow: 'hidden'
    },
    uploadHint: {
      fontSize: '0.95rem',
      color: '#94a3b8',
      fontWeight: '500'
    },
    photoPreview: {
      position: 'relative',
      display: 'inline-block'
    },
    previewImg: {
      maxHeight: '300px',
      maxWidth: '100%',
      borderRadius: '16px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
      border: '2px solid rgba(255, 255, 255, 0.1)'
    },
    changePhotoBtn: {
      position: 'absolute',
      bottom: '15px',
      right: '15px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '12px',
      fontSize: '0.9rem',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      fontWeight: '600',
      backdropFilter: 'blur(10px)'
    },
    formActions: {
      textAlign: 'center',
      paddingTop: '3rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    },
    createEventBtn: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      color: 'white',
      padding: '1.5rem 4rem',
      border: 'none',
      borderRadius: '20px',
      fontSize: '1.2rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 15px 35px rgba(102, 126, 234, 0.4)',
      position: 'relative',
      overflow: 'hidden',
      letterSpacing: '0.01em'
    },
    // Sponsors Cards styles
    sponsorsContainer: {
      marginTop: '4rem',
      maxWidth: '1400px',
      margin: '4rem auto',
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      borderRadius: '24px',
      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
      overflow: 'hidden',
      backdropFilter: 'blur(25px)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    sponsorsHeader: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      color: 'white',
      padding: '3rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    sponsorsTitle: {
      fontSize: '2.8rem',
      fontWeight: '800',
      margin: '0 0 1rem 0',
      letterSpacing: '-0.02em',
      textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
    },
    sponsorsSubtitle: {
      margin: '0',
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '1.2rem',
      fontWeight: '400'
    },
    cardsContainer: {
      padding: '3rem',
      background: 'rgba(255, 255, 255, 0.01)'
    },
    cardsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
      gap: '2.5rem',
      marginTop: '2rem'
    },
    sponsorCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '24px',
      overflow: 'hidden',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
      position: 'relative'
    },
    cardImage: {
      width: '100%',
      height: '280px',
      objectFit: 'cover',
      transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    cardContent: {
      padding: '2rem'
    },
    cardTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      color: '#e2e8f0',
      margin: '0 0 1rem 0',
      letterSpacing: '-0.01em'
    },
    cardDescription: {
      fontSize: '1rem',
      color: '#94a3b8',
      lineHeight: '1.6',
      margin: '0 0 1.5rem 0'
    },
    cardDetails: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    },
    cardDetailItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.9rem',
      color: '#cbd5e1'
    },
    cardIcon: {
      width: '16px',
      height: '16px',
      color: '#667eea'
    },
    noSponsors: {
      textAlign: 'center',
      padding: '60px',
      color: '#94a3b8',
      fontSize: '1.4rem',
      fontWeight: '500'
    }
  };

  // Add CSS animations
  const cssText = `
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(40px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    /* Hover effects */
    .form-section:hover {
      background: rgba(255, 255, 255, 0.04) !important;
      transform: translateY(-2px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }

    .upload-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 20px 40px rgba(102, 126, 234, 0.4);
    }

    .create-event-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 25px 50px rgba(102, 126, 234, 0.5);
    }

    .sponsor-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
      border-color: rgba(102, 126, 234, 0.3);
    }

    .sponsor-card:hover .card-image {
      transform: scale(1.05);
    }

    .input-field:focus {
      border-color: #667eea !important;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      outline: none;
    }

    .upload-area:hover {
      border-color: rgba(102, 126, 234, 0.5) !important;
      background: rgba(255, 255, 255, 0.03) !important;
    }

    /* Glassmorphism effect */
    .glass-effect {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    /* Animated background */
    .product::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(240, 147, 251, 0.1) 0%, transparent 50%);
      animation: float 6s ease-in-out infinite;
      z-index: 0;
    }
  `;

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = cssText;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, );

  const renderSponsorsCards = () => {
    if (!sponsersList || sponsersList.length === 0) {
      return (
        <div style={styles.sponsorsContainer}>
          <div style={styles.sponsorsHeader}>
            <h3 style={styles.sponsorsTitle}>Our Valued Sponsors</h3>
            <p style={styles.sponsorsSubtitle}>Supporting our mission with excellence</p>
          </div>
          <div style={styles.noSponsors}>No sponsors available</div>
        </div>
      );
    }

    return (
      <div style={styles.sponsorsContainer}>
        {/* Header */}
        <div style={styles.sponsorsHeader}>
          <h3 style={styles.sponsorsTitle}>Our Valued Sponsors</h3>
          <p style={styles.sponsorsSubtitle}>Supporting our mission with excellence</p>
        </div>

        {/* Cards Container */}
        <div style={styles.cardsContainer}>
          <div style={styles.cardsGrid}>
            {sponsersList.map((sponser) => (
              <div 
                key={sponser._id} 
                style={styles.sponsorCard}
                className="sponsor-card"
              >
                {/* Sponsor Image */}
                <img
                  src={`https://ulcclub1.onrender.com/api/v1/sponsers/photo/${sponser._id}`}
                  alt={sponser.sponsername}
                  style={styles.cardImage}
                  className="card-image"
                />
                
                {/* Card Content */}
                <div style={styles.cardContent}>
                  <h4 style={styles.cardTitle}>
                    {sponser.sponsername}
                  </h4>
                  
                  <p style={styles.cardDescription}>
                    {sponser.description}
                  </p>
                  
                  {/* Card Details */}
                  <div style={styles.cardDetails}>
                    {sponser.startDate && (
                      <div style={styles.cardDetailItem}>
                        <Calendar style={styles.cardIcon} />
                        <span>Start: {formatDate(sponser.startDate)}</span>
                      </div>
                    )}
                    
                    {sponser.endDate && (
                      <div style={styles.cardDetailItem}>
                        <Clock style={styles.cardIcon} />
                        <span>End: {formatDate(sponser.endDate)}</span>
                      </div>
                    )}
                    
                    <div style={styles.cardDetailItem}>
                      <Users style={styles.cardIcon} />
                      <span>Active Sponsor</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout title="Admin Dashboard - Sponsors">
      <div style={styles.product} className="product">
        <div style={styles.container}>
          <div style={styles.row}>

            {/* Main Content */}
            <div style={styles.mainContentCol}>
              {/* Create Sponsor Form */}
              <div style={styles.eventFormCard}>
                <div style={styles.formHeader}>
                  <h1 style={styles.headerTitle}>Create New Sponsor</h1>
                  <p style={styles.headerSubtitle}>
                    Add a new sponsor to showcase your partnerships
                  </p>
                </div>

                <form onSubmit={handleCreate} style={styles.eventForm}>
                  {/* Basic Information Section */}
                  <div style={styles.formSection} className="form-section">
                    <h3 style={styles.sectionTitle}>
                      <Users size={24} />
                      Basic Information
                    </h3>
                    
                    <div style={styles.formGrid}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Sponsor Name *</label>
                        <input
                          type="text"
                          name="sponsername"
                          value={formData.sponsername}
                          onChange={handleInputChange}
                          placeholder="Enter sponsor name"
                          style={styles.input}
                          className="input-field"
                          required
                        />
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.label}>Description *</label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Describe the sponsor..."
                          style={styles.textarea}
                          className="input-field"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Date Information Section */}
                  <div style={styles.formSection} className="form-section">
                    <h3 style={styles.sectionTitle}>
                      <Calendar size={24} />
                      Sponsorship Period
                    </h3>
                    
                    <div style={styles.formGrid}>
                      <div style={styles.formGroup}>
                        <label style={styles.label}>Start Date</label>
                        <input
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleInputChange}
                          style={styles.input}
                          className="input-field"
                        />
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.label}>End Date</label>
                        <input
                          type="date"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleInputChange}
                          style={styles.input}
                          className="input-field"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Photo Upload Section */}
                  <div style={styles.formSection} className="form-section">
                    <h3 style={styles.sectionTitle}>
                      <Camera size={24} />
                      Sponsor Logo/Photo
                    </h3>
                    
                    <div 
                      style={styles.photoUploadArea}
                      className="upload-area"
                    >
                      {preview ? (
                        <div style={styles.photoPreview}>
                          <img
                            src={preview}
                            alt="Preview"
                            style={styles.previewImg}
                          />
                          <button
                            type="button"
                            onClick={() => document.getElementById('photo-upload').click()}
                            style={styles.changePhotoBtn}
                          >
                            Change Photo
                          </button>
                        </div>
                      ) : (
                        <div style={styles.uploadPlaceholder}>
                          <div style={styles.uploadContent}>
                            <Camera size={48} color="#667eea" />
                            <button
                              type="button"
                              onClick={() => document.getElementById('photo-upload').click()}
                              style={styles.uploadBtn}
                              className="upload-btn"
                            >
                              Upload Photo
                            </button>
                            <p style={styles.uploadHint}>
                              Drag and drop or click to browse
                            </p>
                          </div>
                        </div>
                      )}
                      
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        style={{ display: 'none' }}
                      />
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div style={styles.formActions}>
                    <button
                      type="submit"
                      style={styles.createEventBtn}
                      className="create-event-btn"
                    >
                      Create Sponsor
                    </button>
                  </div>
                </form>
              </div>

              {/* Sponsors Cards Display */}
              {renderSponsorsCards()}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default Sponsers;
