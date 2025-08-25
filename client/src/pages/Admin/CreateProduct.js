import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import { toast , ToastContainer} from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Camera, Calendar, Users, Clock  } from 'lucide-react';
import "react-toastify/dist/ReactToastify.css";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    createdBy:"",
    startDate:"",
    endDate: "",
    venue:"",
    eventType:"",
    photo: null
  });
  const [preview, setPreview] = useState(null);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("https://ulcclub1.onrender.com/api/v1/users"); 
      if (data?.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch users");
    }
  };
  useEffect(() => {
    getAllUsers();
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
    if (!formData.name || !formData.description || !formData.photo || !formData.createdBy ) {
      return toast.error("All fields are required");
    }
    try {
      const productData = new FormData();
      productData.append("name", formData.name);
      productData.append("description", formData.description);
      productData.append("photo", formData.photo);
      productData.append("createdBy", formData.createdBy);
      productData.append("startDate", formData.startDate);
      productData.append("endDate", formData.endDate);
      productData.append("venue", formData.venue);
      productData.append("eventType", formData.eventType);
      productData.append("category", formData.category);

      const { data } = await axios.post(
        "https://ulcclub1.onrender.com/api/v1/product/create-product",
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      );
      if (data?.success) {
        toast.success("Club Created Successfully");
        navigate("/dashboard/admin/product");
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

  const styles = {
    product: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      minHeight: "100vh",
      padding: "20px",
    },
    container: {
      padding: '2rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    row: {
      display: 'flex',
      gap: '2rem',
      maxWidth: '1400px',
      margin: '0 auto',
      flexWrap: 'wrap'
    },
    sidebarCol: {
      flex: '0 0 250px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '1rem',
      height: 'fit-content',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    mainContentCol: {
      flex: '1',
      minWidth: '600px'
    },
    eventFormCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '24px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      animation: 'slideUp 0.6s ease-out'
    },
    formHeader: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '2.5rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    headerTitle: {
      fontSize: '2.5rem',
      fontWeight: '700',
      margin: '0 0 0.5rem 0',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      zIndex: 1
    },
    headerSubtitle: {
      fontSize: '1.1rem',
      opacity: 0.9,
      margin: 0,
      position: 'relative',
      zIndex: 1
    },
    eventForm: {
      padding: '2.5rem'
    },
    formSection: {
      marginBottom: '3rem',
      padding: '2rem',
      background: 'rgba(255, 255, 255, 0.7)',
      borderRadius: '16px',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease'
    },
    sectionTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      fontSize: '1.4rem',
      fontWeight: '600',
      color: '#2d3748',
      marginBottom: '1.5rem',
      paddingBottom: '0.75rem',
      borderBottom: '2px solid #e2e8f0'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      fontSize: '0.95rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '0.5rem'
    },
    input: {
      width: '100%',
      padding: '0.875rem 1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      boxSizing: 'border-box'
    },
    textarea: {
      width: '100%',
      padding: '0.875rem 1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      resize: 'vertical',
      minHeight: '100px',
      boxSizing: 'border-box'
    },
    photoUploadArea: {
      border: '2px dashed #cbd5e0',
      borderRadius: '16px',
      padding: '2rem',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      background: 'rgba(255, 255, 255, 0.5)'
    },
    uploadPlaceholder: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem'
    },
    uploadContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem'
    },
    uploadBtn: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.2)'
    },
    uploadHint: {
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    photoPreview: {
      position: 'relative',
      display: 'inline-block'
    },
    previewImg: {
      maxHeight: '250px',
      maxWidth: '100%',
      borderRadius: '12px',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
    },
    changePhotoBtn: {
      position: 'absolute',
      bottom: '10px',
      right: '10px',
      background: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      fontSize: '0.875rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    formActions: {
      textAlign: 'center',
      paddingTop: '2rem',
      borderTop: '1px solid #e5e7eb'
    },
    createEventBtn: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '1rem 3rem',
      border: 'none',
      borderRadius: '16px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
      position: 'relative',
      overflow: 'hidden'
    },
    adminMenuPlaceholder: {
      color: 'white',
      textAlign: 'center',
      padding: '1rem'
    }
  };

  return (
    <Layout title={"Create Event"}>
      <div style={styles.product}>
       <ToastContainer />
        <div style={styles.container}>
        <div className="row">
       <div style={styles.row}>
        <div style={styles.mainContentCol}>
          <div style={styles.eventFormCard}>
            <div style={styles.formHeader}>
              <h2 style={styles.headerTitle}>Organize New Event</h2>
              <p style={styles.headerSubtitle}>Create and manage your organization's events</p>
            </div>
            
            <div style={styles.eventForm}>
              {/* Event Photo Upload */}
              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>
                  <Camera size={20} color="#667eea" />
                  Event Media
                </h3>
                <div style={styles.photoUploadArea}>
                  {preview ? (
                    <div style={styles.photoPreview}>
                      <img src={preview} alt="Event Preview" style={styles.previewImg} />
                      <button
                        type="button"
                        style={styles.changePhotoBtn}
                        onClick={() => {
                          setPreview(null);
                          setFormData({ ...formData, photo: null });
                        }}
                      >
                        Change Photo
                      </button>
                    </div>
                  ) : (
                    <div style={styles.uploadPlaceholder}>
                      <Camera size={48} color="#9ca3af" />
                      <div style={styles.uploadContent}>
                        <label style={styles.uploadBtn}>
                          Upload Event Photo
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            style={{ display: 'none' }}
                          />
                        </label>
                        <span style={styles.uploadHint}>PNG, JPG, GIF up to 10MB</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Basic Information */}
              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>
                  <Users size={20} color="#667eea" />
                  Basic Information
                </h3>
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Event Name *</label>
                    <input
                      style={styles.input}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter event name"
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Event Category</label>
                    <select
                      style={styles.input}
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option value="">Select category</option>
                      <option value="workshop">Workshop</option>
                      <option value="seminar">Seminar</option>
                      <option value="conference">Conference</option>
                      <option value="networking">Networking</option>
                      <option value="social">Social</option>
                      <option value="sports">Sports</option>
                      <option value="cultural">Cultural</option>
                      <option value="educational">Educational</option>
                    </select>
                  </div>
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Description *</label>
                  <textarea
                    style={styles.textarea}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your event in detail"
                    rows="4"
                    required
                  />
                </div>
              </div>
              {/* Date and Time */}
              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>
                  <Calendar size={20} color="#667eea" />
                  Schedule
                </h3>
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Start Date *</label>
                    <input
                      style={styles.input}
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>End Date</label>
                    <input
                      style={styles.input}
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Venue *</label>
                    <input
                      style={styles.input}
                      type="text"
                      name="venue"
                      value={formData.venue}
                      onChange={handleInputChange}
                      placeholder="Event venue or location"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Registration Details */}
              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>
                  <Clock size={20} color="#667eea" />
                  Event type & Orgnizer
                </h3>
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Event Type</label>
                    <select
                      style={styles.input}
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="members-only">Members Only</option>
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Organizer Email *</label>
                    <select
                      style={styles.input}
                      name="createdBy"
                      value={formData.createdBy}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select organizer email</option>
                      {users?.map((user) => (
                        <option key={user._id} value={user.email}>
                          {user.email}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {/* Submit Button */}
              <div style={styles.formActions}>
                <button type="button" style={styles.createEventBtn} onClick={handleCreate}>
                  Create Event
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
