import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Users, User, Phone, Building, UserCheck, Download, ChevronDown, Filter, Eye } from 'lucide-react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('https://ulcclub1.onrender.com/api/v1/registration/all');
      if (data.success) {
        setRegistrations(data.registrations);
      } else {
        toast.error("Failed to fetch registrations");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error while fetching registrations");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this registration?')) {
      try {
        const { data } = await axios.delete(`https://ulcclub1.onrender.com/api/v1/registration/delete/${id}`);
        if (data.success) {
          toast.success("Registration deleted successfully");
          fetchRegistrations();
        } else {
          toast.error("Failed to delete registration");
        }
      } catch (error) {
        console.error(error);
        toast.error("Server error while deleting");
      }
    }
  };

  const downloadAsCSV = () => {
    if (filteredRegistrations.length === 0) {
      toast.warning("No data to download");
      return;
    }

    let csvContent = "Type,Name/Group Name,Department,Phone,Leader Name,Leader phone,Members Count,Member Details\n";
    
    filteredRegistrations.forEach(reg => {
      if (reg.type === 'individual') {
        csvContent += `Individual,"${reg.name}","${reg.department}","${reg.phone}",,1,\n`;
      } else {
        const memberDetails = reg.members.map(m => `${m.name} (${m.department} - ${m.phone})`).join('; ');
        csvContent += `Group,"${reg.groupName}",,"${reg.phone || 'N/A'}","${reg.leadername}","${reg.leaderphone}",${reg.members.length},"${memberDetails}"\n`;
      }
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `registrations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV file downloaded successfully");
  };

  const downloadAsJSON = () => {
    if (filteredRegistrations.length === 0) {
      toast.warning("No data to download");
      return;
    }

    const jsonContent = JSON.stringify(filteredRegistrations, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `registrations_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("JSON file downloaded successfully");
  };

  const downloadAsXML = () => {
    if (filteredRegistrations.length === 0) {
      toast.warning("No data to download");
      return;
    }

    let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n<registrations>\n';
    
    filteredRegistrations.forEach(reg => {
      xmlContent += '  <registration>\n';
      xmlContent += `    <type>${reg.type}</type>\n`;
      xmlContent += `    <id>${reg._id}</id>\n`;
      
      if (reg.type === 'individual') {
        xmlContent += `    <name>${reg.name}</name>\n`;
        xmlContent += `    <department>${reg.department}</department>\n`;
        xmlContent += `    <phone>${reg.phone}</phone>\n`;
      } else {
        xmlContent += `    <groupName>${reg.groupName}</groupName>\n`;
        xmlContent += `    <leaderName>${reg.leadername}</leaderName>\n`;
        xmlContent += `    <leaderPhone>${reg.leaderphone}</leaderPhone>\n`;
        xmlContent += `    <members>\n`;
        reg.members.forEach(member => {
          xmlContent += `      <member>\n`;
          xmlContent += `        <name>${member.name}</name>\n`;
          xmlContent += `        <department>${member.department}</department>\n`;
          xmlContent += `        <phone>${member.phone}</phone>\n`;
          xmlContent += `      </member>\n`;
        });
        xmlContent += `    </members>\n`;
      }
      
      xmlContent += '  </registration>\n';
    });
    
    xmlContent += '</registrations>';

    const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `registrations_${new Date().toISOString().split('T')[0]}.xml`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("XML file downloaded successfully");
  };

  const downloadAsTXT = () => {
    if (filteredRegistrations.length === 0) {
      toast.warning("No data to download");
      return;
    }

    let txtContent = "EVENT REGISTRATIONS REPORT\n";
    txtContent += "=".repeat(40) + "\n\n";
    txtContent += `Generated on: ${new Date().toLocaleDateString()}\n`;
    txtContent += `Total Registrations: ${filteredRegistrations.length}\n`;
    txtContent += `Individual Registrations: ${filteredRegistrations.filter(r => r.type === 'individual').length}\n`;
    txtContent += `Group Registrations: ${filteredRegistrations.filter(r => r.type === 'group').length}\n\n`;
    
    filteredRegistrations.forEach((reg, index) => {
      txtContent += `${index + 1}. ${reg.type.toUpperCase()} REGISTRATION\n`;
      txtContent += "-".repeat(30) + "\n";
      
      if (reg.type === 'individual') {
        txtContent += `Name: ${reg.name}\n`;
        txtContent += `Department: ${reg.department}\n`;
        txtContent += `Phone: ${reg.phone}\n`;
      } else {
        txtContent += `Group Name: ${reg.groupName}\n`;
        txtContent += `Leader: ${reg.leadername}\n`;
        txtContent += `Leader Phone: ${reg.leaderphone}\n`;
        txtContent += `Members (${reg.members.length}):\n`;
        reg.members.forEach((member, i) => {
          txtContent += `  ${i + 1}. ${member.name} - ${member.department} (${member.phone})\n`;
        });
      }
      
      txtContent += "\n";
    });

    const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `registrations_${new Date().toISOString().split('T')[0]}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("TXT file downloaded successfully");
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  // Filter registrations based on selected type
  const filteredRegistrations = registrations.filter(reg => {
    if (filterType === 'all') return true;
    return reg.type === filterType;
  });

  const individualRegs = registrations.filter(reg => reg.type === 'individual');
  const groupRegs = registrations.filter(reg => reg.type === 'group');

  const filterOptions = [
    { value: 'all', label: 'All Registrations', count: registrations.length },
    { value: 'individual', label: 'Individual Only', count: individualRegs.length },
    { value: 'group', label: 'Group Only', count: groupRegs.length }
  ];

  const downloadOptions = [
    { label: 'Download as CSV', action: downloadAsCSV, icon: '📊' },
    { label: 'Download as JSON', action: downloadAsJSON, icon: '🔧' },
    { label: 'Download as XML', action: downloadAsXML, icon: '📋' },
    { label: 'Download as TXT', action: downloadAsTXT, icon: '📄' }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    },
    content: {
      maxWidth: '1400px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px'
    },
    heading: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#ffffff',
      marginBottom: '8px',
      textShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    subtitle: {
      fontSize: '1.1rem',
      color: 'rgba(255,255,255,0.9)',
      fontWeight: '400'
    },
    actionBar: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '30px',
      gap: '16px'
    },
    filterContainer: {
      position: 'relative',
      display: 'inline-block'
    },
    filterButton: {
      background: 'rgba(255,255,255,0.2)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.3)',
      color: '#ffffff',
      padding: '14px 24px',
      fontSize: '1rem',
      fontWeight: '600',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
      minWidth: '200px',
      justifyContent: 'space-between'
    },
    filterButtonHover: {
      background: 'rgba(255,255,255,0.3)',
      transform: 'translateY(-2px)',
      boxShadow: '0 12px 25px rgba(0,0,0,0.15)'
    },
    filterMenu: {
      position: 'absolute',
      top: '100%',
      left: '0',
      right: '0',
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.3)',
      borderRadius: '16px',
      marginTop: '8px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
      zIndex: 1000,
      overflow: 'hidden',
      minWidth: '220px'
    },
    filterMenuItem: {
      padding: '14px 20px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      color: '#2d3748',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid rgba(0,0,0,0.05)'
    },
    filterMenuItemHover: {
      background: 'rgba(102,126,234,0.1)',
      color: '#667eea'
    },
    rightControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    viewToggle: {
      background: 'rgba(255,255,255,0.2)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.3)',
      borderRadius: '16px',
      padding: '4px',
      display: 'flex'
    },
    viewToggleButton: {
      padding: '10px 16px',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'all 0.2s ease'
    },
    viewToggleActive: {
      background: '#ffffff',
      color: '#667eea',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    viewToggleInactive: {
      background: 'transparent',
      color: '#ffffff'
    },
    downloadContainer: {
      position: 'relative',
      display: 'inline-block'
    },
    downloadButton: {
      background: 'rgba(255,255,255,0.2)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.3)',
      color: '#ffffff',
      padding: '14px 24px',
      fontSize: '1rem',
      fontWeight: '600',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
      minWidth: '180px',
      justifyContent: 'space-between'
    },
    downloadButtonHover: {
      background: 'rgba(255,255,255,0.3)',
      transform: 'translateY(-2px)',
      boxShadow: '0 12px 25px rgba(0,0,0,0.15)'
    },
    downloadMenu: {
      position: 'absolute',
      top: '100%',
      right: '0',
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.3)',
      borderRadius: '16px',
      marginTop: '8px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
      zIndex: 1000,
      overflow: 'hidden',
      minWidth: '180px'
    },
    downloadMenuItem: {
      padding: '14px 20px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      color: '#2d3748',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid rgba(0,0,0,0.05)'
    },
    downloadMenuItemHover: {
      background: 'rgba(102,126,234,0.1)',
      color: '#667eea'
    },
    statsBar: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '20px',
      marginBottom: '40px'
    },
    statItem: {
      background: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(10px)',
      padding: '20px',
      borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.2)',
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#ffffff',
      display: 'block',
      marginBottom: '8px'
    },
    statLabel: {
      fontSize: '0.9rem',
      color: 'rgba(255,255,255,0.8)'
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px'
    },
    spinner: {
      width: '40px',
      height: '40px',
      border: '4px solid rgba(255,255,255,0.3)',
      borderTop: '4px solid #ffffff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      background: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      border: '1px solid rgba(255,255,255,0.2)'
    },
    emptyText: {
      fontSize: '1.2rem',
      color: 'rgba(255,255,255,0.9)',
      marginBottom: '10px'
    },
    emptySubtext: {
      fontSize: '1rem',
      color: 'rgba(255,255,255,0.7)'
    },
    // Table Styles
    tableContainer: {
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      border: '1px solid rgba(255,255,255,0.3)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    },
    tableWrapper: {
      overflowX: 'auto'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    tableHeader: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#ffffff'
    },
    tableHeaderCell: {
      padding: '16px 20px',
      textAlign: 'left',
      fontWeight: '600',
      fontSize: '0.95rem',
      borderBottom: '1px solid rgba(255,255,255,0.2)'
    },
    tableHeaderCellCenter: {
      padding: '16px 20px',
      textAlign: 'center',
      fontWeight: '600',
      fontSize: '0.95rem',
      borderBottom: '1px solid rgba(255,255,255,0.2)'
    },
    tableBody: {
      background: '#ffffff'
    },
    tableRow: {
      transition: 'all 0.2s ease',
      borderBottom: '1px solid #e2e8f0'
    },
    tableRowEven: {
      background: 'rgba(248, 250, 252, 0.5)'
    },
    tableRowHover: {
      background: 'rgba(102, 126, 234, 0.05)',
      transform: 'scale(1.01)'
    },
    tableCell: {
      padding: '16px 20px',
      color: '#2d3748',
      fontSize: '0.9rem',
      verticalAlign: 'middle'
    },
    tableCellCenter: {
      padding: '16px 20px',
      textAlign: 'center',
      verticalAlign: 'middle'
    },
    typeIcon: {
      width: '32px',
      height: '32px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '12px',
      color: '#ffffff'
    },
    individualTypeIcon: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    groupTypeIcon: {
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    typeContainer: {
      display: 'flex',
      alignItems: 'center'
    },
    typeName: {
      fontWeight: '600',
      color: '#2d3748',
      textTransform: 'capitalize'
    },
    nameCell: {
      fontWeight: '600',
      color: '#1a202c'
    },
    memberCount: {
      fontWeight: '600',
      color: '#1a202c'
    },
    memberPreview: {
      fontSize: '0.8rem',
      color: '#718096',
      marginTop: '2px'
    },
    actionButtons: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    actionButton: {
      padding: '8px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    viewButton: {
      color: '#667eea',
      background: 'rgba(102, 126, 234, 0.1)'
    },
    viewButtonHover: {
      background: 'rgba(102, 126, 234, 0.2)'
    },
    deleteButtonTable: {
      color: '#e53e3e',
      background: 'rgba(229, 62, 62, 0.1)'
    },
    deleteButtonTableHover: {
      background: 'rgba(229, 62, 62, 0.2)'
    },
    // Card Styles (Original)
    card: {
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(20px)',
      padding: '28px',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      marginBottom: '24px',
      border: '1px solid rgba(255,255,255,0.3)',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    },
    cardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
      paddingBottom: '16px',
      borderBottom: '2px solid #f0f0f0'
    },
    cardTypeIcon: {
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '16px',
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#ffffff',
      textShadow: '0 1px 2px rgba(0,0,0,0.1)'
    },
    cardIndividualIcon: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    cardGroupIcon: {
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    cardTitle: {
      fontSize: '1.3rem',
      fontWeight: '600',
      color: '#2d3748',
      margin: 0
    },
    cardSubtitle: {
      fontSize: '0.9rem',
      color: '#718096',
      marginTop: '4px'
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '16px',
      marginBottom: '20px'
    },
    infoItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      background: '#f8fafc',
      borderRadius: '12px',
      border: '1px solid #e2e8f0'
    },
    infoIcon: {
      marginRight: '12px',
      color: '#667eea'
    },
    infoLabel: {
      fontSize: '0.85rem',
      color: '#718096',
      fontWeight: '500',
      marginBottom: '2px'
    },
    infoValue: {
      fontSize: '0.95rem',
      color: '#2d3748',
      fontWeight: '600'
    },
    memberSection: {
      marginTop: '20px',
      padding: '20px',
      background: '#f8fafc',
      borderRadius: '16px',
      border: '1px solid #e2e8f0'
    },
    memberHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '16px',
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#2d3748'
    },
    memberList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    memberItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      background: '#ffffff',
      borderRadius: '10px',
      marginBottom: '8px',
      border: '1px solid #e2e8f0',
      transition: 'all 0.2s ease'
    },
    memberItemHover: {
      transform: 'translateX(5px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    },
    memberInfo: {
      marginLeft: '12px'
    },
    memberName: {
      fontSize: '0.95rem',
      fontWeight: '600',
      color: '#2d3748',
      marginBottom: '2px'
    },
    memberDetails: {
      fontSize: '0.8rem',
      color: '#718096'
    },
    deleteButton: {
      position: 'absolute',
      top: '24px',
      right: '24px',
      background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
      color: 'white',
      border: 'none',
      padding: '12px 16px',
      fontSize: '0.9rem',
      fontWeight: '600',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 12px rgba(255,107,107,0.3)'
    },
    deleteButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(255,107,107,0.4)'
    },
    toastContainer: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999
    },
    chevronIcon: {
      transition: 'transform 0.2s ease'
    },
    chevronRotated: {
      transform: 'rotate(180deg)'
    },
    filterCount: {
      background: 'rgba(102,126,234,0.1)',
      color: '#667eea',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '0.8rem',
      fontWeight: '600'
    }
  };

  const keyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={styles.container}>
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          style={styles.toastContainer}
        />
        
        <div style={styles.content}>
          <div style={styles.header}>
            <h1 style={styles.heading}>Registration Management</h1>
            <p style={styles.subtitle}>Manage and view all event registrations</p>
          </div>

          {!loading && registrations.length > 0 && (
            <>
              {/* Action Bar */}
              <div style={styles.actionBar}>
                {/* Filter Dropdown */}
                <div style={styles.filterContainer}>
                  <button
                    style={styles.filterButton}
                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                    onMouseEnter={(e) => {
                      Object.assign(e.currentTarget.style, styles.filterButtonHover);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Filter size={20} style={{ marginRight: '8px' }} />
                      {filterOptions.find(opt => opt.value === filterType)?.label}
                    </div>
                    <ChevronDown 
                      size={16} 
                      style={{
                        ...styles.chevronIcon,
                        ...(showFilterMenu ? styles.chevronRotated : {})
                      }}
                    />
                  </button>
                  
                  {showFilterMenu && (
                    <div style={styles.filterMenu}>
                      {filterOptions.map((option) => (
                        <div
                          key={option.value}
                          style={styles.filterMenuItem}
                          onClick={() => {
                            setFilterType(option.value);
                            setShowFilterMenu(false);
                          }}
                          onMouseEnter={(e) => {
                            Object.assign(e.currentTarget.style, styles.filterMenuItemHover);
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = '#2d3748';
                          }}
                        >
                          <span>{option.label}</span>
                          <span style={styles.filterCount}>{option.count}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Controls */}
                <div style={styles.rightControls}>
                  {/* View Toggle */}
                  <div style={styles.viewToggle}>
                    <button
                      style={{
                        ...styles.viewToggleButton,
                        ...(viewMode === 'table' ? styles.viewToggleActive : styles.viewToggleInactive)
                      }}
                      onClick={() => setViewMode('table')}
                    >
                      Table
                    </button>
                    <button
                      style={{
                        ...styles.viewToggleButton,
                        ...(viewMode === 'card' ? styles.viewToggleActive : styles.viewToggleInactive)
                      }}
                      onClick={() => setViewMode('card')}
                    >
                      Cards
                    </button>
                  </div>

                  {/* Download Dropdown */}
                  <div style={styles.downloadContainer}>
                    <button
                      style={styles.downloadButton}
                      onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                      onMouseEnter={(e) => {
                        Object.assign(e.currentTarget.style, styles.downloadButtonHover);
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Download size={20} style={{ marginRight: '8px' }} />
                        Download Data
                      </div>
                      <ChevronDown 
                        size={16} 
                        style={{
                          ...styles.chevronIcon,
                          ...(showDownloadMenu ? styles.chevronRotated : {})
                        }}
                      />
                    </button>
                    
                    {showDownloadMenu && (
                      <div style={styles.downloadMenu}>
                        {downloadOptions.map((option, index) => (
                          <div
                            key={index}
                            style={styles.downloadMenuItem}
                            onClick={() => {
                              option.action();
                              setShowDownloadMenu(false);
                            }}
                            onMouseEnter={(e) => {
                              Object.assign(e.currentTarget.style, styles.downloadMenuItemHover);
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = '#2d3748';
                            }}
                          >
                            <span style={{ marginRight: '12px', fontSize: '1.1rem' }}>
                              {option.icon}
                            </span>
                            {option.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div style={styles.statsBar}>
                <div style={styles.statItem}>
                  <span style={styles.statNumber}>{filteredRegistrations.length}</span>
                  <span style={styles.statLabel}>
                    {filterType === 'all' ? 'Total Registrations' : 
                     filterType === 'individual' ? 'Individual Registrations' : 
                     'Group Registrations'}
                  </span>
                </div>
                <div style={styles.statItem}>
                  <span style={styles.statNumber}>{individualRegs.length}</span>
                  <span style={styles.statLabel}>Individual</span>
                </div>
                <div style={styles.statItem}>
                  <span style={styles.statNumber}>{groupRegs.length}</span>
                  <span style={styles.statLabel}>Groups</span>
                </div>
              </div>
            </>
          )}

          {/* Content */}
          {loading ? (
            <div style={styles.loadingContainer}>
              <div style={styles.spinner}></div>
            </div>
          ) : filteredRegistrations.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyText}>No registrations found</p>
              <p style={styles.emptySubtext}>
                {filterType !== 'all' 
                  ? `No ${filterType} registrations available` 
                  : 'New registrations will appear here'
                }
              </p>
            </div>
          ) : viewMode === 'table' ? (
            /* Table View */
            <div style={styles.tableContainer}>
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead style={styles.tableHeader}>
                    <tr>
                      <th style={styles.tableHeaderCell}>Type</th>
                      <th style={styles.tableHeaderCell}>Name/Group</th>
                      <th style={styles.tableHeaderCell}>Department/Leader</th>
                      <th style={styles.tableHeaderCell}>Phone</th>
                      <th style={styles.tableHeaderCell}>Members</th>
                      <th style={styles.tableHeaderCellCenter}>Actions</th>
                    </tr>
                  </thead>
                  <tbody style={styles.tableBody}>
                    {filteredRegistrations.map((reg, index) => (
                      <tr 
                        key={reg._id}
                        style={{
                          ...styles.tableRow,
                          ...(index % 2 === 0 ? {} : styles.tableRowEven)
                        }}
                        onMouseEnter={(e) => {
                          Object.assign(e.currentTarget.style, styles.tableRowHover);
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = index % 2 === 0 ? '#ffffff' : 'rgba(248, 250, 252, 0.5)';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        <td style={styles.tableCell}>
                          <div style={styles.typeContainer}>
                            <div style={{
                              ...styles.typeIcon,
                              ...(reg.type === 'individual' ? styles.individualTypeIcon : styles.groupTypeIcon)
                            }}>
                              {reg.type === 'individual' ? <User size={16} /> : <Users size={16} />}
                            </div>
                            <span style={styles.typeName}>{reg.type}</span>
                          </div>
                        </td>
                        <td style={styles.tableCell}>
                          <div style={styles.nameCell}>
                            {reg.type === 'individual' ? reg.name : reg.groupName}
                          </div>
                        </td>
                        <td style={styles.tableCell}>
                          {reg.type === 'individual' ? reg.department : reg.leadername}
                        </td>
                        <td style={styles.tableCell}>
                          {reg.type === 'individual' ? reg.phone : reg.leaderphone}
                        </td>
                        <td style={styles.tableCell}>
                          {reg.type === 'individual' ? (
                            <span style={{ color: '#718096' }}>-</span>
                          ) : (
                            <div>
                              <div style={styles.memberCount}>
                                {reg.members.length} members
                              </div>
                              <div style={styles.memberPreview}>
                                {reg.members.slice(0, 2).map(m => m.name).join(', ')}
                                {reg.members.length > 2 && ` +${reg.members.length - 2} more`}
                              </div>
                            </div>
                          )}
                        </td>
                        <td style={styles.tableCellCenter}>
                          <div style={styles.actionButtons}>
                            {reg.type === 'group' && (
                              <button 
                                style={{
                                  ...styles.actionButton,
                                  ...styles.viewButton
                                }}
                                title="View Details"
                                onClick={() => {
                                  const memberDetails = reg.members.map((m, i) => 
                                    `${i+1}. ${m.name} - ${m.department} (${m.phone})`
                                  ).join('\n');
                                  alert(`Group Details:\n\n${memberDetails}`);
                                }}
                                onMouseEnter={(e) => {
                                  Object.assign(e.currentTarget.style, styles.viewButtonHover);
                                }}
                                onMouseLeave={(e) => {
                                  Object.assign(e.currentTarget.style, styles.viewButton);
                                }}
                              >
                                <Eye size={16} />
                              </button>
                            )}
                            <button 
                              style={{
                                ...styles.actionButton,
                                ...styles.deleteButtonTable
                              }}
                              title="Delete Registration"
                              onClick={() => handleDelete(reg._id)}
                              onMouseEnter={(e) => {
                                Object.assign(e.currentTarget.style, styles.deleteButtonTableHover);
                              }}
                              onMouseLeave={(e) => {
                                Object.assign(e.currentTarget.style, styles.deleteButtonTable);
                              }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Card View (Original Layout) */
            <div>
              {filteredRegistrations.map((reg) => (
                <div
                  key={reg._id}
                  style={styles.card}
                  onMouseEnter={(e) => {
                    Object.assign(e.currentTarget.style, styles.cardHover);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                  }}
                >
                  <div style={styles.cardHeader}>
                    <div style={{
                      ...styles.cardTypeIcon,
                      ...(reg.type === 'individual' ? styles.cardIndividualIcon : styles.cardGroupIcon)
                    }}>
                      {reg.type === 'individual' ? <User size={20} /> : <Users size={20} />}
                    </div>
                    <div>
                      <h3 style={styles.cardTitle}>
                        {reg.type === 'individual' ? reg.name : reg.groupName}
                      </h3>
                      <p style={styles.cardSubtitle}>
                        {reg.type === 'individual' ? 'Individual Registration' : 'Group Registration'}
                      </p>
                    </div>
                  </div>

                  {reg.type === 'individual' ? (
                    <div style={styles.infoGrid}>
                      <div style={styles.infoItem}>
                        <Building size={16} style={styles.infoIcon} />
                        <div>
                          <div style={styles.infoLabel}>Department</div>
                          <div style={styles.infoValue}>{reg.department}</div>
                        </div>
                      </div>
                      <div style={styles.infoItem}>
                        <Phone size={16} style={styles.infoIcon} />
                        <div>
                          <div style={styles.infoLabel}>Phone</div>
                          <div style={styles.infoValue}>{reg.phone}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={styles.infoGrid}>
                        <div style={styles.infoItem}>
                          <UserCheck size={16} style={styles.infoIcon} />
                          <div>
                            <div style={styles.infoLabel}>Group Leader</div>
                            <div style={styles.infoValue}>{reg.leadername}</div>
                            <div style={styles.infoValue}>{reg.leaderphone}</div>
                          </div>
                        </div>
                        <div style={styles.infoItem}>
                          <Users size={16} style={styles.infoIcon} />
                          <div>
                            <div style={styles.infoLabel}>Members</div>
                            <div style={styles.infoValue}>{reg.members.length} people</div>
                          </div>
                        </div>
                      </div>
                      <div style={styles.memberSection}>
                        <div style={styles.memberHeader}>
                          <Users size={20} style={{ marginRight: '8px' }} />
                          Team Members
                        </div>
                        <ul style={styles.memberList}>
                          {reg.members.map((member, index) => (
                            <li
                              key={index}
                              style={styles.memberItem}
                              onMouseEnter={(e) => {
                                Object.assign(e.currentTarget.style, styles.memberItemHover);
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateX(0)';
                                e.currentTarget.style.boxShadow = 'none';
                              }}
                            >
                              <User size={16} style={{ color: '#667eea' }} />
                              <div style={styles.memberInfo}>
                                <div style={styles.memberName}>{member.name}</div>
                                <div style={styles.memberDetails}>
                                  {member.department} • {member.phone}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}

                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDelete(reg._id)}
                    onMouseEnter={(e) => {
                      Object.assign(e.currentTarget.style, styles.deleteButtonHover);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,107,107,0.3)';
                    }}
                  >
                    <Trash2 size={16} style={{ marginRight: '6px' }} />
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllRegistrations;
