import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { Camera, Calendar, Users, User, Mail, MapPin, Award, Plus, Save, Brain, Cpu, Search, X, Edit, Phone, Building, Clock, ChevronRight, ArrowLeft } from 'lucide-react';
import "react-toastify/dist/ReactToastify.css";

const CreateFaculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [filteredFaculty, setFilteredFaculty] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'form', 'table', 'details'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    phone: "",
    Date: "",
    cabin: "",
    email: "",
    photo: null
  });
  const [preview, setPreview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getAllFaculty = async () => {
    try {
      const { data } = await axios.get("https://ulcclub1.onrender.com/api/v1/faculty/all-faculty");
      if (data?.success) {
        setFaculty(data.faculty);
        setFilteredFaculty(data.faculty);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch faculty");
    }
  };

  useEffect(() => {
    getAllFaculty();
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = faculty;
    
    if (searchTerm) {
      filtered = filtered.filter(f => 
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterCategory) {
      filtered = filtered.filter(f => f.category === filterCategory);
    }
    
    setFilteredFaculty(filtered);
  }, [searchTerm, filterCategory, faculty]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAiAnalyzing(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setTimeout(() => {
          setFormData({ ...formData, photo: file });
          setPreview(e.target.result);
          setAiAnalyzing(false);
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.photo || !formData.cabin || !formData.category || !formData.phone) {
      return toast.error("All required fields must be filled");
    }
    
    setAiAnalyzing(true);
    try {
      const facultyData = new FormData();
      facultyData.append("name", formData.name);
      facultyData.append("description", formData.description);
      facultyData.append("photo", formData.photo);
      facultyData.append("cabin", formData.cabin);
      facultyData.append("Date", formData.Date);
      facultyData.append("category", formData.category);
      facultyData.append("phone", formData.phone);
      facultyData.append("email", formData.email);

      const { data } = await axios.post(
        "https://ulcclub1.onrender.com/api/v1/faculty/create-faculty",
        facultyData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      );
      
      setTimeout(() => {
        if (data?.success) {
          toast.success("Faculty Created Successfully");
          getAllFaculty();
          setFormData({
            name: "",
            description: "",
            category: "",
            phone: "",
            Date: "",
            cabin: "",
            email: "",
            photo: null
          });
          setPreview(null);
          setShowForm(false);
          setViewMode('table');
        } else {
          toast.error(data?.message);
        }
        setAiAnalyzing(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setAiAnalyzing(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === 'description' && value.length > 10) {
      setAiAnalyzing(true);
      setTimeout(() => setAiAnalyzing(false), 2000);
    }
  };

  const handleFacultyClick = (facultyMember) => {
    setSelectedFaculty(facultyMember);
    setViewMode('details');
  };

  const categories = [
    'Dean',
    'HOD', 
    'Program Director',
    'Associate Profesor'
  ];

  const generateParticles = () => {
    return Array.from({ length: 50 }, (_, i) => (
      <div
        key={i}
        className="particle"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${3 + Math.random() * 4}s`
        }}
      />
    ));
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'radial-gradient(circle at 20% 50%, #120458 0%, #000000 50%, #1a0b3d 100%)',
      padding: '20px',
      fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
      position: 'relative',
      overflow: 'hidden'
    },
    backgroundLayer: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 0
    },
    neuralNetwork: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: `
        radial-gradient(2px 2px at 20% 30%, #00f5ff, transparent),
        radial-gradient(2px 2px at 40% 70%, #ff00ff, transparent),
        radial-gradient(1px 1px at 90% 40%, #00ff88, transparent),
        radial-gradient(1px 1px at 60% 10%, #ffaa00, transparent)
      `,
      animation: 'networkPulse 4s ease-in-out infinite alternate'
    },
    holographicOverlay: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(45deg, transparent 40%, rgba(0, 245, 255, 0.03) 50%, transparent 60%)',
      animation: 'holographicSweep 8s linear infinite'
    },
    cursorGlow: {
      position: 'fixed',
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(0, 245, 255, 0.1) 0%, transparent 70%)',
      pointerEvents: 'none',
      zIndex: 1,
      transition: 'all 0.1s ease'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.1) 0%, rgba(255, 0, 255, 0.05) 100%)',
      backdropFilter: 'blur(30px)',
      padding: '25px 35px',
      borderRadius: '25px',
      border: '1px solid rgba(0, 245, 255, 0.2)',
      position: 'relative',
      zIndex: 2,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    },
    headerIcon: {
      padding: '15px',
      background: 'linear-gradient(135deg, #00f5ff, #ff00ff)',
      borderRadius: '15px',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      boxShadow: '0 0 30px rgba(0, 245, 255, 0.5)'
    },
    title: {
      margin: '0',
      fontSize: '32px',
      fontWeight: '900',
      background: 'linear-gradient(135deg, #00f5ff, #ff00ff, #00ff88)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
      position: 'relative',
      textShadow: '0 0 30px rgba(0, 245, 255, 0.5)'
    },
    subtitle: {
      margin: '8px 0 0 0',
      fontSize: '14px',
      color: '#00f5ff',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      opacity: 0.8
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    },
    actionButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '15px 25px',
      background: 'linear-gradient(135deg, #00f5ff, #ff00ff)',
      color: 'white',
      border: 'none',
      borderRadius: '15px',
      fontSize: '16px',
      fontWeight: '700',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    viewButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '12px 20px',
      background: 'rgba(0, 245, 255, 0.1)',
      color: '#00f5ff',
      border: '2px solid rgba(0, 245, 255, 0.3)',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    // Table Styles
    tableContainer: {
      background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.05), rgba(255, 0, 255, 0.03))',
      backdropFilter: 'blur(30px)',
      borderRadius: '25px',
      padding: '35px',
      marginBottom: '35px',
      border: '1px solid rgba(0, 245, 255, 0.2)',
      position: 'relative',
      zIndex: 2,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
    },
    tableHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '25px',
      flexWrap: 'wrap',
      gap: '15px'
    },
    tableTitle: {
      fontSize: '24px',
      fontWeight: '900',
      background: 'linear-gradient(135deg, #00f5ff, #ff00ff)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent'
    },
    tableControls: {
      display: 'flex',
      gap: '15px',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    searchInput: {
      padding: '12px 20px',
      border: '2px solid rgba(0, 245, 255, 0.3)',
      borderRadius: '12px',
      fontSize: '14px',
      background: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(20px)',
      color: 'white',
      outline: 'none',
      minWidth: '250px',
      transition: 'all 0.3s ease'
    },
    filterSelect: {
      padding: '12px 20px',
      border: '2px solid rgba(0, 245, 255, 0.3)',
      borderRadius: '12px',
      fontSize: '14px',
      background: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(20px)',
      color: 'white',
      outline: 'none',
      cursor: 'pointer',
      minWidth: '150px'
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0 10px'
    },
    tableHeaderRow: {
      background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(255, 0, 255, 0.05))',
      backdropFilter: 'blur(20px)'
    },
    th: {
      padding: '20px 25px',
      fontSize: '14px',
      fontWeight: '700',
      color: '#00f5ff',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      textAlign: 'left',
      borderBottom: '2px solid rgba(0, 245, 255, 0.3)',
      position: 'sticky',
      top: 0,
      zIndex: 10
    },
    tableRow: {
      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.2), rgba(0, 245, 255, 0.02))',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(0, 245, 255, 0.1)',
      borderRadius: '15px',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    td: {
      padding: '20px 25px',
      fontSize: '14px',
      color: 'white',
      fontWeight: '500',
      verticalAlign: 'middle'
    },
    facultyPhoto: {
      width: '50px',
      height: '50px',
      borderRadius: '12px',
      objectFit: 'cover',
      border: '2px solid rgba(0, 245, 255, 0.3)'
    },
    categoryBadge: {
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      textTransform: 'uppercase',
      display: 'inline-block'
    },
    actionButtons: {
      display: 'flex',
      gap: '10px'
    },
    iconButton: {
      padding: '8px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    editButton: {
      background: 'linear-gradient(135deg, #00f5ff, #0088ff)',
      color: 'white'
    },
    deleteButton: {
      background: 'linear-gradient(135deg, #ff4444, #ff0066)',
      color: 'white'
    },
    viewDetailsButton: {
      background: 'linear-gradient(135deg, #00ff88, #44ff88)',
      color: 'white'
    },
    // Details View Styles
    detailsContainer: {
      background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.05), rgba(255, 0, 255, 0.03))',
      backdropFilter: 'blur(30px)',
      borderRadius: '25px',
      padding: '35px',
      marginBottom: '35px',
      border: '1px solid rgba(0, 245, 255, 0.2)',
      position: 'relative',
      zIndex: 2,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
    },
    detailsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px'
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '12px 20px',
      background: 'rgba(0, 245, 255, 0.1)',
      color: '#00f5ff',
      border: '2px solid rgba(0, 245, 255, 0.3)',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    detailsContent: {
      display: 'grid',
      gridTemplateColumns: '300px 1fr',
      gap: '40px'
    },
    detailsPhotoSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px'
    },
    detailsPhoto: {
      width: '250px',
      height: '250px',
      borderRadius: '20px',
      objectFit: 'cover',
      border: '3px solid rgba(0, 245, 255, 0.3)',
      boxShadow: '0 0 30px rgba(0, 245, 255, 0.2)'
    },
    detailsInfo: {
      display: 'grid',
      gap: '25px'
    },
    infoSection: {
      background: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(20px)',
      padding: '25px',
      borderRadius: '15px',
      border: '1px solid rgba(0, 245, 255, 0.1)'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#00f5ff',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '15px'
    },
    infoItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    infoLabel: {
      fontSize: '14px',
      color: '#00f5ff',
      fontWeight: '600',
      minWidth: '80px'
    },
    infoValue: {
      fontSize: '14px',
      color: 'white',
      fontWeight: '500'
    },
    description: {
      fontSize: '16px',
      color: 'white',
      lineHeight: '1.6',
      padding: '20px',
      background: 'rgba(0, 0, 0, 0.2)',
      borderRadius: '12px',
      border: '1px solid rgba(0, 245, 255, 0.1)'
    },
    // Form Styles (existing)
    formContainer: {
      background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.05), rgba(255, 0, 255, 0.03))',
      backdropFilter: 'blur(30px)',
      borderRadius: '25px',
      padding: '35px',
      marginBottom: '35px',
      border: '1px solid rgba(0, 245, 255, 0.2)',
      position: 'relative',
      zIndex: 2,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
    },
    formHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px'
    },
    formTitle: {
      margin: '0',
      fontSize: '28px',
      fontWeight: '900',
      background: 'linear-gradient(135deg, #00f5ff, #ff00ff)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent'
    },
    form: {
      width: '100%'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: '220px 1fr',
      gap: '40px',
      marginBottom: '40px'
    },
    photoSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px'
    },
    photoUpload: {
      position: 'relative',
      width: '180px',
      height: '180px',
      border: '2px solid rgba(0, 245, 255, 0.3)',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.05), rgba(255, 0, 255, 0.03))',
      backdropFilter: 'blur(20px)'
    },
    photoContainer: {
      width: '100%',
      height: '100%',
      position: 'relative'
    },
    photoPlaceholder: {
      textAlign: 'center',
      color: '#00f5ff',
      fontSize: '14px',
      fontWeight: '600'
    },
    photoPreview: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '18px'
    },
    fileInput: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0,
      cursor: 'pointer'
    },
    fieldsSection: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '25px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      position: 'relative'
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '14px',
      fontWeight: '700',
      color: '#00f5ff',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    input: {
      padding: '15px 20px',
      border: '2px solid rgba(0, 245, 255, 0.3)',
      borderRadius: '15px',
      fontSize: '16px',
      background: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(20px)',
      color: 'white',
      outline: 'none',
      transition: 'all 0.3s ease',
      position: 'relative'
    },
    select: {
      padding: '15px 20px',
      border: '2px solid rgba(0, 245, 255, 0.3)',
      borderRadius: '15px',
      fontSize: '16px',
      background: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(20px)',
      color: 'white',
      outline: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    textarea: {
      padding: '15px 20px',
      border: '2px solid rgba(0, 245, 255, 0.3)',
      borderRadius: '15px',
      fontSize: '16px',
      background: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(20px)',
      color: 'white',
      outline: 'none',
      resize: 'vertical',
      minHeight: '100px',
      fontFamily: 'inherit',
      transition: 'all 0.3s ease'
    },
    formActions: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'flex-end'
    },
    cancelButton: {
      padding: '15px 25px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '15px',
      fontSize: '16px',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      color: 'white',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    submitButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '15px 30px',
      background: 'linear-gradient(135deg, #00f5ff, #ff00ff)',
      color: 'white',
      border: 'none',
      borderRadius: '15px',
      fontSize: '16px',
      fontWeight: '700',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    aiOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(10px)'
    },
    aiProcessor: {
      background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(255, 0, 255, 0.1))',
      padding: '40px',
      borderRadius: '25px',
      border: '2px solid rgba(0, 245, 255, 0.3)',
      textAlign: 'center',
      color: 'white',
      position: 'relative',
      backdropFilter: 'blur(20px)'
    },
    progressBar: {
      width: '200px',
      height: '4px',
      background: 'rgba(0, 245, 255, 0.2)',
      borderRadius: '2px',
      marginTop: '15px',
      overflow: 'hidden'
    }
  };

  const getCategoryBadgeStyle = (category) => {
    const baseStyle = styles.categoryBadge;
    switch (category) {
      case 'Dean':
        return { ...baseStyle, background: 'linear-gradient(135deg, #ff4444, #ff0066)' };
      case 'HOD':
        return { ...baseStyle, background: 'linear-gradient(135deg, #00f5ff, #0088ff)' };
      case 'Program Director':
        return { ...baseStyle, background: 'linear-gradient(135deg, #ff00ff, #aa00ff)' };
      case 'Associate Profesor':
        return { ...baseStyle, background: 'linear-gradient(135deg, #00ff88, #44ff88)' };
      default:
        return { ...baseStyle, background: 'linear-gradient(135deg, #666, #888)' };
    }
  };

  const renderFacultyTable = () => (
    <div style={styles.tableContainer}>
      <div style={styles.tableHeader}>
        <h2 style={styles.tableTitle}>Neural Faculty Database</h2>
        <div style={styles.tableControls}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#00f5ff' }} />
            <input
              type="text"
              placeholder="Search faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ ...styles.searchInput, paddingLeft: '45px' }}
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="">All Categories</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterCategory('');
            }}
            style={{...styles.viewButton, background: 'rgba(255, 68, 68, 0.1)', borderColor: 'rgba(255, 68, 68, 0.3)', color: '#ff4444'}}
          >
            <X size={16} />
            Clear
          </button>
        </div>
      </div>

      <div style={{ overflowX: 'auto', maxHeight: '70vh', overflowY: 'auto' }}>
        <table style={styles.table}>
          <thead style={styles.tableHeaderRow}>
            <tr>
              <th style={styles.th}>Photo</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Cabin</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFaculty.map((facultyMember, index) => (
              <tr
                key={index}
                style={styles.tableRow}
                onClick={() => handleFacultyClick(facultyMember)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 245, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <td style={styles.td}>
                  {facultyMember.photo ? (
                    <img
                      src={facultyMember.photo.url || facultyMember.photo}
                      alt={facultyMember.name}
                      style={styles.facultyPhoto}
                    />
                  ) : (
                    <div style={{
                      ...styles.facultyPhoto,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(255, 0, 255, 0.1))'
                    }}>
                      <User size={20} color="#00f5ff" />
                    </div>
                  )}
                </td>
                <td style={styles.td}>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '16px', color: '#00f5ff' }}>
                      {facultyMember.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#ccc', marginTop: '2px' }}>
                      ID: {facultyMember._id?.slice(-6) || 'N/A'}
                    </div>
                  </div>
                </td>
                <td style={styles.td}>
                  <span style={getCategoryBadgeStyle(facultyMember.category)}>
                    {facultyMember.category}
                  </span>
                </td>
                <td style={styles.td}>{facultyMember.email}</td>
                <td style={styles.td}>{facultyMember.phone}</td>
                <td style={styles.td}>{facultyMember.cabin}</td>
                <td style={styles.td}>
                  <div style={styles.actionButtons}>
                    <button
                      style={{...styles.iconButton, ...styles.viewDetailsButton}}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFacultyClick(facultyMember);
                      }}
                      title="View Details"
                    >
                      <ChevronRight size={16} />
                    </button>
                    <button
                      style={{...styles.iconButton, ...styles.editButton}}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add edit functionality here
                        toast.info('Edit functionality coming soon!');
                      }}
                      title="Edit Faculty"
                    >
                      <Edit size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredFaculty.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '50px',
          color: '#00f5ff',
          fontSize: '18px',
          fontWeight: '600'
        }}>
          <Brain size={48} style={{ marginBottom: '20px', opacity: 0.5 }} />
          <p>No faculty members found</p>
          <p style={{ fontSize: '14px', opacity: 0.7, marginTop: '10px' }}>
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );

  const renderFacultyDetails = () => (
    <div style={styles.detailsContainer}>
      <div style={styles.detailsHeader}>
        <button
          style={styles.backButton}
          onClick={() => setViewMode('table')}
        >
          <ArrowLeft size={18} />
          Back to Database
        </button>
        <h2 style={styles.tableTitle}>Faculty Profile Analysis</h2>
      </div>

      <div style={styles.detailsContent}>
        <div style={styles.detailsPhotoSection}>
          {selectedFaculty?.photo ? (
            <img
               src={`https://ulcclub1.onrender.com/api/v1/faculty/faculty-photo/${selectedFaculty._id}`}
               alt={selectedFaculty.name}
               style={{ width: "150px", height: "150px", objectFit: "cover" }}  />
          ) : (
            <div style={{
              ...styles.detailsPhoto,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(255, 0, 255, 0.1))',
              flexDirection: 'column',
              gap: '15px'
            }}>
              <User size={80} color="#00f5ff" />
              <span style={{ color: '#00f5ff', fontSize: '14px', fontWeight: '600' }}>No Photo</span>
            </div>
          )}
          <div style={getCategoryBadgeStyle(selectedFaculty?.category)}>
            {selectedFaculty?.category}
          </div>
        </div>

        <div style={styles.detailsInfo}>
          {/* Personal Information */}
          <div style={styles.infoSection}>
            <h3 style={styles.sectionTitle}>
              <User size={20} />
              Personal Information
            </h3>
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Name:</span>
                <span style={styles.infoValue}>{selectedFaculty?.name}</span>
              </div>
              <div style={styles.infoItem}>
                <Mail size={16} color="#00f5ff" />
                <span style={styles.infoLabel}>Email:</span>
                <span style={styles.infoValue}>{selectedFaculty?.email}</span>
              </div>
              <div style={styles.infoItem}>
                <Phone size={16} color="#00f5ff" />
                <span style={styles.infoLabel}>Phone:</span>
                <span style={styles.infoValue}>{selectedFaculty?.phone}</span>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div style={styles.infoSection}>
            <h3 style={styles.sectionTitle}>
              <Award size={20} />
              Professional Details
            </h3>
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <Building size={16} color="#00f5ff" />
                <span style={styles.infoLabel}>Category:</span>
                <span style={styles.infoValue}>{selectedFaculty?.category}</span>
              </div>
              <div style={styles.infoItem}>
                <MapPin size={16} color="#00f5ff" />
                <span style={styles.infoLabel}>Cabin:</span>
                <span style={styles.infoValue}>{selectedFaculty?.cabin}</span>
              </div>
              <div style={styles.infoItem}>
                <Calendar size={16} color="#00f5ff" />
                <span style={styles.infoLabel}>Join Date:</span>
                <span style={styles.infoValue}>
                  {selectedFaculty?.Date ? new Date(selectedFaculty.Date).toLocaleDateString() : 'Not specified'}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          {selectedFaculty?.description && (
            <div style={styles.infoSection}>
              <h3 style={styles.sectionTitle}>
                <Cpu size={20} />
                Description & Specialization
              </h3>
              <div style={styles.description}>
                {selectedFaculty.description}
              </div>
            </div>
          )}

          {/* System Information */}
          <div style={styles.infoSection}>
            <h3 style={styles.sectionTitle}>
              <Brain size={20} />
              System Information
            </h3>
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>ID:</span>
                <span style={styles.infoValue}>{selectedFaculty?._id}</span>
              </div>
              <div style={styles.infoItem}>
                <Clock size={16} color="#00f5ff" />
                <span style={styles.infoLabel}>Created:</span>
                <span style={styles.infoValue}>
                  {selectedFaculty?.createdAt ? new Date(selectedFaculty.createdAt).toLocaleString() : 'Not available'}
                </span>
              </div>
              <div style={styles.infoItem}>
                <Clock size={16} color="#00f5ff" />
                <span style={styles.infoLabel}>Updated:</span>
                <span style={styles.infoValue}>
                  {selectedFaculty?.updatedAt ? new Date(selectedFaculty.updatedAt).toLocaleString() : 'Not available'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCreateForm = () => (
    <div style={styles.formContainer}>
      <div style={styles.formHeader}>
        <div>
          <h2 style={styles.formTitle}>Neural Faculty Registration</h2>
        </div>
      </div>

      <form style={styles.form}>
        <div style={styles.formGrid}>
          <div style={styles.photoSection}>
            <div style={styles.photoUpload}>
              {preview ? (
                <div style={styles.photoContainer}>
                  <img src={preview} alt="Preview" style={styles.photoPreview} />
                </div>
              ) : (
                <div style={styles.photoPlaceholder}>
                  <Camera size={32} />
                  <p>Neural Scan Upload</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={styles.fileInput}
              />
            </div>
          </div>

          <div style={styles.fieldsSection}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <User size={18} />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Enter faculty name"
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <Mail size={18} />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="neural@institution.ai"
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <Phone size={18} />
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Enter phone number"
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <MapPin size={18} />
                Cabin
              </label>
              <input
                type="text"
                name="cabin"
                value={formData.cabin}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Enter cabin/office number"
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <Calendar size={18} />
                Joining Date
              </label>
              <input
                type="date"
                name="Date"
                value={formData.Date}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <Award size={18} />
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                style={styles.select}
              >
                <option value="">Select Category</option>
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <Cpu size={18} />
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                style={styles.textarea}
                placeholder="Enter description of faculty specialization..."
              />
            </div>
          </div>
        </div>

        <div style={styles.formActions}>
          <button
            type="button"
            style={styles.cancelButton}
            onClick={() => {
              setShowForm(false);
              setViewMode('table');
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleCreate}
            style={styles.submitButton}
          >
            <Save size={20} />
            Create Faculty
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <Layout title={"Faculty Management"}>
      <div style={styles.container}>
        {/* Animated Background */}
        <div style={styles.backgroundLayer}>
          {generateParticles()}
          <div style={styles.neuralNetwork} />
          <div style={styles.holographicOverlay} />
        </div>

        {/* AI Cursor Follow Effect */}
        <div 
          style={{
            ...styles.cursorGlow,
            left: mousePosition.x - 100,
            top: mousePosition.y - 100
          }}
        />

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.headerIcon}>
              <Brain size={32} />
            </div>
            <div>
              <h1 style={styles.title}>
                AI Faculty Management
              </h1>
              <p style={styles.subtitle}>
                <Cpu size={16} />
                Powered by Neural Processing Engine
              </p>
            </div>
          </div>
          
          <div style={styles.headerRight}>
            <button 
              style={{
                ...styles.viewButton,
                background: viewMode === 'table' ? 'linear-gradient(135deg, #00f5ff, #ff00ff)' : 'rgba(0, 245, 255, 0.1)'
              }}
              onClick={() => setViewMode('table')}
            >
              <Users size={18} />
              Database
            </button>
            <button 
              style={{
                ...styles.actionButton,
                background: showForm ? 'rgba(255, 68, 68, 0.8)' : 'linear-gradient(135deg, #00f5ff, #ff00ff)'
              }}
              onClick={() => {
                setShowForm(!showForm);
                if (!showForm) setViewMode('form');
              }}
            >
              {showForm ? <X size={20} /> : <Plus size={20} />}
              <span>{showForm ? 'Cancel' : 'Add Faculty'}</span>
            </button>
          </div>
        </div>

        {/* AI Processing Overlay */}
        {aiAnalyzing && (
          <div style={styles.aiOverlay}>
            <div style={styles.aiProcessor}>
              <Brain size={48} className="processing-brain" />
              <p>AI Processing...</p>
              <div style={styles.progressBar}>
                <div className="progress-fill" />
              </div>
            </div>
          </div>
        )}

        {/* Content based on view mode */}
        {showForm && renderCreateForm()}
        {viewMode === 'table' && !showForm && renderFacultyTable()}
        {viewMode === 'details' && selectedFaculty && renderFacultyDetails()}
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes networkPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes holographicSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        @keyframes statusPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #00f5ff;
          border-radius: 50%;
          animation: particleFloat 6s linear infinite;
        }
        
        @keyframes particleFloat {
          0% { 
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #00f5ff, #ff00ff);
          width: 0%;
          animation: progressFill 2s ease-in-out infinite;
        }
        
        @keyframes progressFill {
          0%, 100% { width: 0%; }
          50% { width: 100%; }
        }
        
        .processing-brain {
          animation: brainPulse 1s ease-in-out infinite alternate;
        }
        
        @keyframes brainPulse {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
      `}</style>
    </Layout>
  );
};

export default CreateFaculty;
