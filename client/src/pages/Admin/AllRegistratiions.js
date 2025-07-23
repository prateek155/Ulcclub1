import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Users, User, Phone, Building, UserCheck, Download, ChevronDown } from 'lucide-react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

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
  };

  const downloadAsCSV = () => {
    if (registrations.length === 0) {
      toast.warning("No data to download");
      return;
    }

    let csvContent = "Type,Name/Group Name,Department,Phone,Leader Name,Leader phone,Members Count,Member Details\n";
    
    registrations.forEach(reg => {
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
    if (registrations.length === 0) {
      toast.warning("No data to download");
      return;
    }

    const jsonContent = JSON.stringify(registrations, null, 2);
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
    if (registrations.length === 0) {
      toast.warning("No data to download");
      return;
    }

    let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n<registrations>\n';
    
    registrations.forEach(reg => {
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
    if (registrations.length === 0) {
      toast.warning("No data to download");
      return;
    }

    let txtContent = "EVENT REGISTRATIONS REPORT\n";
    txtContent += "=".repeat(40) + "\n\n";
    txtContent += `Generated on: ${new Date().toLocaleDateString()}\n`;
    txtContent += `Total Registrations: ${registrations.length}\n`;
    txtContent += `Individual Registrations: ${registrations.filter(r => r.type === 'individual').length}\n`;
    txtContent += `Group Registrations: ${registrations.filter(r => r.type === 'group').length}\n\n`;
    
    registrations.forEach((reg, index) => {
      txtContent += `${index + 1}. ${reg.type.toUpperCase()} REGISTRATION\n`;
      txtContent += "-".repeat(30) + "\n";
      
      if (reg.type === 'individual') {
        txtContent += `Name: ${reg.name}\n`;
        txtContent += `Department: ${reg.department}\n`;
        txtContent += `Phone: ${reg.phone}\n`;
      } else {
        txtContent += `Group Name: ${reg.groupName}\n`;
        txtContent += `Leader: ${reg.leadername}\n`;
        txtContent += `Leader: ${reg.leaderphone}\n`;
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

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    },
    content: {
      maxWidth: '1000px',
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
      justifyContent: 'center',
      marginBottom: '30px'
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
      left: '0',
      right: '0',
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.3)',
      borderRadius: '16px',
      marginTop: '8px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
      zIndex: 1000,
      overflow: 'hidden'
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
      display: 'flex',
      justifyContent: 'center',
      gap: '30px',
      marginBottom: '40px',
      flexWrap: 'wrap'
    },
    statItem: {
      background: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(10px)',
      padding: '16px 24px',
      borderRadius: '16px',
      border: '1px solid rgba(255,255,255,0.2)',
      textAlign: 'center',
      minWidth: '120px'
    },
    statNumber: {
      fontSize: '1.8rem',
      fontWeight: '700',
      color: '#ffffff',
      display: 'block'
    },
    statLabel: {
      fontSize: '0.9rem',
      color: 'rgba(255,255,255,0.8)',
      marginTop: '4px'
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
    typeIcon: {
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
    individualIcon: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    groupIcon: {
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
    }
  };

  const keyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  const individualRegs = registrations.filter(reg => reg.type === 'individual');
  const groupRegs = registrations.filter(reg => reg.type === 'group');

  const downloadOptions = [
    { label: 'Download as CSV', action: downloadAsCSV, icon: '📊' },
    { label: 'Download as JSON', action: downloadAsJSON, icon: '🔧' },
    { label: 'Download as XML', action: downloadAsXML, icon: '📋' },
    { label: 'Download as TXT', action: downloadAsTXT, icon: '📄' }
  ];

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
              <div style={styles.actionBar}>
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
                    <ChevronDown size={16} style={{ 
                      transform: showDownloadMenu ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease'
                    }} />
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

              <div style={styles.statsBar}>
                <div style={styles.statItem}>
                  <span style={styles.statNumber}>{registrations.length}</span>
                  <span style={styles.statLabel}>Total</span>
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

          {loading ? (
            <div style={styles.loadingContainer}>
              <div style={styles.spinner}></div>
            </div>
          ) : registrations.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyText}>No registrations found</p>
              <p style={styles.emptySubtext}>New registrations will appear here</p>
            </div>
          ) : (
            registrations.map((reg) => (
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
                    ...styles.typeIcon,
                    ...(reg.type === 'individual' ? styles.individualIcon : styles.groupIcon)
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
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default AllRegistrations;
