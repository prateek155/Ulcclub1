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

  return (
    <Layout title={"Create Event"}>
      <div className="create-event-container">
        <ToastContainer />
        <div className="content-wrapper">
          <div className="event-form-card">
            <div className="form-header">
              <h2 className="header-title">Organize New Event</h2>
              <p className="header-subtitle">Create and manage your organization's events</p>
            </div>
            
            <div className="event-form">
              {/* Event Photo Upload */}
              <div className="form-section">
                <h3 className="section-title">
                  <Camera size={20} className="section-icon" />
                  Event Media
                </h3>
                <div className="photo-upload-area">
                  {preview ? (
                    <div className="photo-preview">
                      <img src={preview} alt="Event Preview" className="preview-img" />
                      <button
                        type="button"
                        className="change-photo-btn"
                        onClick={() => {
                          setPreview(null);
                          setFormData({ ...formData, photo: null });
                        }}
                      >
                        Change Photo
                      </button>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <Camera size={48} className="upload-icon" />
                      <div className="upload-content">
                        <label className="upload-btn">
                          Upload Event Photo
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            style={{ display: 'none' }}
                          />
                        </label>
                        <span className="upload-hint">PNG, JPG, GIF up to 10MB</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Basic Information */}
              <div className="form-section">
                <h3 className="section-title">
                  <Users size={20} className="section-icon" />
                  Basic Information
                </h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Event Name *</label>
                    <input
                      className="form-input"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter event name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Event Category</label>
                    <select
                      className="form-input"
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
                
                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <textarea
                    className="form-textarea"
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
              <div className="form-section">
                <h3 className="section-title">
                  <Calendar size={20} className="section-icon" />
                  Schedule
                </h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Start Date *</label>
                    <input
                      className="form-input"
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">End Date</label>
                    <input
                      className="form-input"
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Venue *</label>
                    <input
                      className="form-input"
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
              <div className="form-section">
                <h3 className="section-title">
                  <Clock size={20} className="section-icon" />
                  Event type & Organizer
                </h3>
                <div className="form-group">
                  <label className="form-label">Organizer Email *</label>
                  <select
                    className="form-input"
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

              {/* Submit Button */}
              <div className="form-actions">
                <button type="button" className="create-event-btn" onClick={handleCreate}>
                  Create Event
                </button>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .create-event-container {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }

          .content-wrapper {
            max-width: 900px;
            margin: 0 auto;
          }

          .event-form-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 24px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            animation: slideUp 0.6s ease-out;
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .form-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2.5rem;
            text-align: center;
            position: relative;
            overflow: hidden;
          }

          .form-header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: float 6s ease-in-out infinite;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(180deg); }
          }

          .header-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin: 0 0 0.5rem 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            position: relative;
            z-index: 1;
          }

          .header-subtitle {
            font-size: 1.1rem;
            opacity: 0.9;
            margin: 0;
            position: relative;
            z-index: 1;
          }

          .event-form {
            padding: 2.5rem;
          }

          .form-section {
            margin-bottom: 3rem;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 16px;
            border: 1px solid rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
          }

          .form-section:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          }

          .section-title {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 1.4rem;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 1.5rem;
            padding-bottom: 0.75rem;
            border-bottom: 2px solid #e2e8f0;
          }

          .section-icon {
            color: #667eea;
          }

          .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
          }

          .form-group {
            margin-bottom: 1.5rem;
          }

          .form-label {
            display: block;
            font-size: 0.95rem;
            font-weight: 600;
            color: #374151;
            margin-bottom: 0.5rem;
          }

          .form-input, .form-textarea {
            width: 100%;
            padding: 0.875rem 1rem;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            font-size: 1rem;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            box-sizing: border-box;
          }

          .form-input:focus, .form-textarea:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
            transform: translateY(-1px);
          }

          .form-textarea {
            resize: vertical;
            min-height: 100px;
          }

          .photo-upload-area {
            border: 2px dashed #cbd5e0;
            border-radius: 16px;
            padding: 2rem;
            text-align: center;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.5);
          }

          .photo-upload-area:hover {
            border-color: #667eea;
            background: rgba(102, 126, 234, 0.05);
          }

          .upload-placeholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }

          .upload-icon {
            color: #9ca3af;
          }

          .upload-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
          }

          .upload-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
            display: inline-block;
          }

          .upload-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
          }

          .upload-hint {
            font-size: 0.875rem;
            color: #6b7280;
          }

          .photo-preview {
            position: relative;
            display: inline-block;
          }

          .preview-img {
            max-height: 250px;
            max-width: 100%;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          }

          .change-photo-btn {
            position: absolute;
            bottom: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: 0.875rem;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .change-photo-btn:hover {
            background: rgba(0, 0, 0, 0.9);
          }

          .form-actions {
            text-align: center;
            padding-top: 2rem;
            border-top: 1px solid #e5e7eb;
          }

          .create-event-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1rem 3rem;
            border: none;
            border-radius: 16px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
            position: relative;
            overflow: hidden;
          }

          .create-event-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
          }

          .create-event-btn:active {
            transform: translateY(0);
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .create-event-container {
              padding: 15px;
            }

            .content-wrapper {
              max-width: 100%;
            }

            .event-form-card {
              border-radius: 16px;
            }

            .form-header {
              padding: 2rem 1.5rem;
            }

            .header-title {
              font-size: 2rem;
            }

            .header-subtitle {
              font-size: 1rem;
            }

            .event-form {
              padding: 1.5rem;
            }

            .form-section {
              padding: 1.5rem;
              margin-bottom: 2rem;
            }

            .section-title {
              font-size: 1.2rem;
              margin-bottom: 1rem;
            }

            .form-grid {
              grid-template-columns: 1fr;
              gap: 1rem;
            }

            .form-input, .form-textarea {
              padding: 0.75rem;
              font-size: 0.95rem;
            }

            .photo-upload-area {
              padding: 1.5rem;
            }

            .upload-btn {
              padding: 0.65rem 1.25rem;
              font-size: 0.95rem;
            }

            .create-event-btn {
              padding: 0.875rem 2rem;
              font-size: 1rem;
              width: 100%;
              max-width: 300px;
            }
          }

          @media (max-width: 480px) {
            .create-event-container {
              padding: 10px;
            }

            .form-header {
              padding: 1.5rem 1rem;
            }

            .header-title {
              font-size: 1.7rem;
            }

            .event-form {
              padding: 1rem;
            }

            .form-section {
              padding: 1rem;
              margin-bottom: 1.5rem;
              border-radius: 12px;
            }

            .section-title {
              font-size: 1.1rem;
              gap: 0.5rem;
            }

            .form-group {
              margin-bottom: 1rem;
            }

            .form-input, .form-textarea {
              padding: 0.625rem;
              border-radius: 8px;
            }

            .photo-upload-area {
              padding: 1rem;
              border-radius: 12px;
            }

            .upload-placeholder {
              gap: 0.75rem;
            }

            .upload-btn {
              padding: 0.5rem 1rem;
              font-size: 0.9rem;
              border-radius: 8px;
            }

            .upload-hint {
              font-size: 0.8rem;
            }

            .preview-img {
              max-height: 200px;
            }

            .form-actions {
              padding-top: 1.5rem;
            }

            .create-event-btn {
              padding: 0.75rem 1.5rem;
              font-size: 0.95rem;
              border-radius: 12px;
            }
          }

          @media (max-width: 360px) {
            .header-title {
              font-size: 1.5rem;
            }

            .section-title {
              font-size: 1rem;
            }

            .form-input, .form-textarea {
              font-size: 0.9rem;
            }

            .create-event-btn {
              font-size: 0.9rem;
            }
          }

          /* Touch device optimizations */
          @media (hover: none) and (pointer: coarse) {
            .form-input, .form-textarea {
              font-size: 16px; /* Prevents zoom on iOS */
            }

            .upload-btn, .create-event-btn {
              min-height: 44px; /* Apple's recommended touch target size */
            }
          }
        `}</style>
      </div>
    </Layout>
  );
};
export default CreateProduct;
export default CreateProduct;
