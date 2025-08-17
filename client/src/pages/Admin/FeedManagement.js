import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button, Modal, Select, Input, message } from 'antd';
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;

const FeedbackManagement = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState('');
  const [terminalText, setTerminalText] = useState('');

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("https://ulcclub1.onrender.com/api/v1/feedback/all");
      if (data.success) {
        setFeedback(data.feedback);
      }
    } catch (error) {
      console.error(error);
      message.error('Neural Network Connection Failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
    
    // Terminal typing effect
    const messages = [
      'INITIALIZING NEURAL NETWORK...',
      'SCANNING FEEDBACK DATABASE...',
      'ESTABLISHING SECURE CONNECTION...',
      'QUANTUM ENCRYPTION ENABLED...',
      'AI SYSTEM ONLINE...'
    ];
    
    let messageIndex = 0;
    let charIndex = 0;
    
    const typeWriter = () => {
      if (messageIndex < messages.length) {
        if (charIndex < messages[messageIndex].length) {
          setTerminalText(prev => prev + messages[messageIndex].charAt(charIndex));
          charIndex++;
          setTimeout(typeWriter, 50);
        } else {
          setTerminalText(prev => prev + '\n');
          messageIndex++;
          charIndex = 0;
          setTimeout(typeWriter, 500);
        }
      }
    };
    
    typeWriter();
  }, []);

  const handleUpdateStatus = async () => {
    try {
      const { data } = await axios.put(`https://ulcclub1.onrender.com/api/v1/feedback/update-status/${selectedFeedback._id}`, {
        status,
        response
      });
      
      if (data.success) {
        message.success('Neural Network Updated Successfully');
        setIsModalVisible(false);
        fetchFeedback();
        setResponse('');
        setStatus('');
      }
    } catch (error) {
      console.error(error);
      message.error('System Update Failed');
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#ff0040';
      case 'medium': return '#ffa500';
      case 'low': return '#00ff88';
      default: return '#00ffff';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#ffa500';
      case 'in-progress': return '#00bfff';
      case 'resolved': return '#00ff88';
      default: return '#00ffff';
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedFeedback(null);
    setResponse('');
    setStatus('');
  };

  // Custom components to replace Antd with cyber styling
  const CyberTable = ({ children }) => (
    <div style={styles.tableContainer}>
      {children}
    </div>
  );

  const CyberTag = ({ color, children }) => (
    <span style={{
      ...styles.tag,
      backgroundColor: color,
      boxShadow: `0 0 10px ${color}40`
    }}>
      {children}
    </span>
  );

  const CyberButton = ({ onClick, children, type = 'primary' }) => (
    <button
      style={type === 'primary' ? styles.actionButton : styles.secondaryButton}
      onClick={onClick}
    >
      {children}
    </button>
  );

  const CyberSelect = ({ value, onChange, children, style }) => (
    <select
      style={{ ...styles.select, ...style }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {children}
    </select>
  );

  const CyberOption = ({ value, children }) => (
    <option value={value}>{children}</option>
  );

  const CyberTextArea = ({ rows, value, onChange, placeholder, style }) => (
    <textarea
      style={{ ...styles.textarea, ...style }}
      rows={rows}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );

  const CyberModal = ({ visible, onOk, onCancel, title, children }) => {
    if (!visible) return null;
    
    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <div style={styles.modalHeader}>
            <h3 style={styles.modalTitle}>{title}</h3>
            <button style={styles.closeButton} onClick={onCancel}>✕</button>
          </div>
          <div style={styles.modalBody}>
            {children}
          </div>
          <div style={styles.modalFooter}>
            <button style={styles.cancelButton} onClick={onCancel}>
              ABORT MISSION
            </button>
            <button style={styles.submitButton} onClick={onOk}>
              EXECUTE UPDATE
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {/* Inject CSS Keyframes */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
          
          @keyframes slideIn {
            from { 
              opacity: 0; 
              transform: translateX(-20px); 
            }
            to { 
              opacity: 1; 
              transform: translateX(0); 
            }
          }
          
          @keyframes modalSlideIn {
            from { 
              opacity: 0; 
              transform: scale(0.8) translateY(-50px); 
            }
            to { 
              opacity: 1; 
              transform: scale(1) translateY(0); 
            }
          }

          @keyframes scanLine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100vw); }
          }
          
          .table-row:hover {
            background-color: rgba(0, 255, 255, 0.05) !important;
            transform: translateX(5px);
            border-left: 3px solid #00ffff;
          }
          
          .action-button:hover {
            background-color: #00ffff !important;
            color: #000 !important;
            box-shadow: 0 0 20px #00ffff !important;
            transform: scale(1.05);
          }
          
          .submit-button:hover {
            box-shadow: 0 0 25px rgba(0, 255, 136, 0.5) !important;
            transform: scale(1.05);
          }
          
          .cancel-button:hover {
            background-color: #ff0040 !important;
            color: #fff !important;
            box-shadow: 0 0 20px rgba(255, 0, 64, 0.5) !important;
          }

          .loading-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999;
          }
          
          .loading-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(0, 255, 255, 0.3);
            border-top: 3px solid #00ffff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div>
            <div className="loading-spinner"></div>
            <div style={{ color: '#00ffff', marginTop: '20px', textAlign: 'center' }}>
              ACCESSING NEURAL DATABASE...
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.logo}>⚡ NEURAL-AI</div>
          <div style={styles.subtitle}>FEEDBACK MANAGEMENT SYSTEM v3.7.1</div>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.statusIndicator}>
            <div style={styles.statusDot}></div>
            SECURE CONNECTION
          </div>
        </div>
      </div>

      {/* Scan Line Effect */}
      <div style={styles.scanLine}></div>

      {/* Terminal Section */}
      <div style={styles.terminal}>
        <div style={styles.terminalHeader}>
          <div style={styles.terminalButtons}>
            <span style={{...styles.terminalButton, backgroundColor: '#ff5f57'}}></span>
            <span style={{...styles.terminalButton, backgroundColor: '#ffbd2e'}}></span>
            <span style={{...styles.terminalButton, backgroundColor: '#28ca42'}}></span>
          </div>
          <span style={styles.terminalTitle}>NEURAL_TERMINAL.exe</span>
        </div>
        <div style={styles.terminalBody}>
          <pre style={styles.terminalText}>{terminalText}</pre>
          <span style={styles.cursor}>█</span>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <h1 style={styles.title}>
          <span style={styles.titleIcon}>🧠</span>
          FEEDBACK NEURAL NETWORK
        </h1>
        
        {/* Stats Bar */}
        <div style={styles.statsBar}>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{feedback.length}</span>
            <span style={styles.statLabel}>TOTAL SIGNALS</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{feedback.filter(f => f.status === 'pending').length}</span>
            <span style={styles.statLabel}>PENDING</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{feedback.filter(f => f.status === 'resolved').length}</span>
            <span style={styles.statLabel}>RESOLVED</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{feedback.filter(f => f.priority === 'high').length}</span>
            <span style={styles.statLabel}>HIGH PRIORITY</span>
          </div>
        </div>

        {/* Feedback Table */}
        <CyberTable>
          <div style={styles.tableHeader}>
            <div style={styles.tableHeaderCell}>SUBJECT</div>
            <div style={styles.tableHeaderCell}>AGENT</div>
            <div style={styles.tableHeaderCell}>PRIORITY</div>
            <div style={styles.tableHeaderCell}>STATUS</div>
            <div style={styles.tableHeaderCell}>ACTIONS</div>
          </div>
          
          {feedback.map((item, index) => (
            <div 
              key={item._id} 
              className="table-row"
              style={{
                ...styles.tableRow, 
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div style={styles.tableCell}>
                <div style={styles.subjectCell}>
                  <div style={styles.subjectText}>{item.subject}</div>
                  <div style={styles.subjectId}>ID: {item._id.slice(-6)}</div>
                </div>
              </div>
              <div style={styles.tableCell}>
                <span style={styles.agentName}>{item.userName}</span>
              </div>
              <div style={styles.tableCell}>
                <CyberTag color={getPriorityColor(item.priority)}>
                  {item.priority?.toUpperCase()}
                </CyberTag>
              </div>
              <div style={styles.tableCell}>
                <CyberTag color={getStatusColor(item.status)}>
                  {item.status?.toUpperCase()}
                </CyberTag>
              </div>
              <div style={styles.tableCell}>
                <button
                  className="action-button"
                  style={styles.actionButton}
                  onClick={() => {
                    setSelectedFeedback(item);
                    setStatus(item.status);
                    setResponse(item.response || '');
                    setIsModalVisible(true);
                  }}
                >
                  ANALYZE
                </button>
              </div>
            </div>
          ))}
        </CyberTable>
      </div>

      {/* Modal */}
      <CyberModal
        visible={isModalVisible}
        onOk={handleUpdateStatus}
        onCancel={handleModalClose}
        title="🔬 NEURAL FEEDBACK ANALYZER"
      >
        <div style={styles.feedbackInfo}>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>SUBJECT:</span>
            <span style={styles.infoValue}>{selectedFeedback?.subject}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>AGENT:</span>
            <span style={styles.infoValue}>{selectedFeedback?.userName}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>PRIORITY:</span>
            <CyberTag color={getPriorityColor(selectedFeedback?.priority)}>
              {selectedFeedback?.priority?.toUpperCase()}
            </CyberTag>
          </div>
          <div style={styles.messageBox}>
            <div style={styles.messageHeader}>INCOMING TRANSMISSION:</div>
            <div style={styles.messageContent}>{selectedFeedback?.message}</div>
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>STATUS PROTOCOL:</label>
          <CyberSelect
            value={status}
            onChange={setStatus}
            style={{width: '100%'}}
          >
            <CyberOption value="pending">PENDING</CyberOption>
            <CyberOption value="in-progress">IN PROGRESS</CyberOption>
            <CyberOption value="resolved">RESOLVED</CyberOption>
          </CyberSelect>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>NEURAL RESPONSE:</label>
          <CyberTextArea
            rows={6}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="ENTER AI RESPONSE PROTOCOL..."
          />
        </div>
      </CyberModal>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0a0a0f',
    color: '#00ffff',
    fontFamily: "'Courier New', 'Monaco', monospace",
    background: `
      linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 2px,
        rgba(0, 255, 255, 0.02) 2px,
        rgba(0, 255, 255, 0.02) 4px
      )
    `,
    padding: '20px',
    position: 'relative',
    overflow: 'hidden'
  },

  scanLine: {
    position: 'absolute',
    top: '0',
    left: '-100%',
    width: '2px',
    height: '100%',
    background: 'linear-gradient(to bottom, transparent, #00ffff, transparent)',
    animation: 'scanLine 8s linear infinite',
    zIndex: 1
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '15px 20px',
    background: 'rgba(0, 255, 255, 0.05)',
    border: '1px solid rgba(0, 255, 255, 0.3)',
    borderRadius: '8px',
    backdropFilter: 'blur(10px)',
    position: 'relative',
    zIndex: 2
  },

  headerLeft: {
    display: 'flex',
    flexDirection: 'column'
  },

  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#00ff88',
    textShadow: '0 0 20px #00ff88'
  },

  subtitle: {
    fontSize: '12px',
    color: '#666',
    letterSpacing: '2px'
  },

  headerRight: {
    display: 'flex',
    alignItems: 'center'
  },

  statusIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: '#00ff88'
  },

  statusDot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#00ff88',
    borderRadius: '50%',
    animation: 'pulse 2s infinite'
  },

  terminal: {
    marginBottom: '30px',
    border: '1px solid rgba(0, 255, 255, 0.3)',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'relative',
    zIndex: 2
  },

  terminalHeader: {
    backgroundColor: '#333',
    padding: '10px 15px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },

  terminalButtons: {
    display: 'flex',
    gap: '5px'
  },

  terminalButton: {
    width: '12px',
    height: '12px',
    borderRadius: '50%'
  },

  terminalTitle: {
    fontSize: '12px',
    color: '#ccc'
  },

  terminalBody: {
    padding: '15px',
    minHeight: '100px',
    backgroundColor: '#000'
  },

  terminalText: {
    color: '#00ff88',
    fontSize: '12px',
    lineHeight: '1.4',
    whiteSpace: 'pre-wrap',
    margin: 0
  },

  cursor: {
    color: '#00ff88',
    animation: 'blink 1s infinite'
  },

  mainContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2
  },

  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '30px',
    color: '#00ffff',
    textShadow: '0 0 30px #00ffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px'
  },

  titleIcon: {
    fontSize: '40px',
    filter: 'hue-rotate(180deg)'
  },

  statsBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    marginBottom: '30px',
    padding: '20px',
    background: 'rgba(0, 255, 255, 0.05)',
    border: '1px solid rgba(0, 255, 255, 0.2)',
    borderRadius: '8px',
    flexWrap: 'wrap'
  },

  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px'
  },

  statNumber: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#00ff88',
    textShadow: '0 0 15px #00ff88'
  },

  statLabel: {
    fontSize: '12px',
    color: '#666',
    letterSpacing: '1px'
  },

  tableContainer: {
    border: '1px solid rgba(0, 255, 255, 0.3)',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },

  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr',
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    borderBottom: '1px solid rgba(0, 255, 255, 0.3)'
  },

  tableHeaderCell: {
    padding: '15px 20px',
    fontSize: '12px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    color: '#00ffff',
    borderRight: '1px solid rgba(0, 255, 255, 0.2)'
  },

  tableRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr',
    borderBottom: '1px solid rgba(0, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
    animation: 'slideIn 0.5s ease-out'
  },

  tableCell: {
    padding: '15px 20px',
    borderRight: '1px solid rgba(0, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center'
  },

  subjectCell: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },

  subjectText: {
    color: '#fff',
    fontWeight: 'bold'
  },

  subjectId: {
    fontSize: '10px',
    color: '#666'
  },

  agentName: {
    color: '#00ff88',
    fontWeight: 'bold'
  },

  tag: {
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: '1px',
    border: '1px solid currentColor'
  },

  actionButton: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    color: '#00ffff',
    border: '1px solid #00ffff',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '11px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    transition: 'all 0.3s ease'
  },

  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(5px)'
  },

  modal: {
    width: '90%',
    maxWidth: '600px',
    backgroundColor: '#0f0f1a',
    border: '1px solid rgba(0, 255, 255, 0.5)',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0, 255, 255, 0.2)',
    animation: 'modalSlideIn 0.3s ease-out'
  },

  modalHeader: {
    padding: '20px',
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    borderBottom: '1px solid rgba(0, 255, 255, 0.3)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  modalTitle: {
    color: '#00ffff',
    fontSize: '18px',
    margin: 0,
    textShadow: '0 0 15px #00ffff'
  },

  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ff0040',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '5px',
    transition: 'all 0.3s ease'
  },

  modalBody: {
    padding: '25px'
  },

  feedbackInfo: {
    marginBottom: '25px'
  },

  infoRow: {
    display: 'flex',
    marginBottom: '10px',
    gap: '10px',
    alignItems: 'center'
  },

  infoLabel: {
    color: '#00ff88',
    fontWeight: 'bold',
    minWidth: '80px'
  },

  infoValue: {
    color: '#fff'
  },

  messageBox: {
    marginTop: '15px',
    border: '1px solid rgba(0, 255, 255, 0.3)',
    borderRadius: '6px',
    overflow: 'hidden'
  },

  messageHeader: {
    padding: '10px 15px',
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#00ffff'
  },

  messageContent: {
    padding: '15px',
    color: '#ccc',
    lineHeight: '1.5',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    maxHeight: '150px',
    overflowY: 'auto'
  },

  formGroup: {
    marginBottom: '20px'
  },

  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#00ff88',
    fontSize: '12px',
    fontWeight: 'bold',
    letterSpacing: '1px'
  },

  select: {
    width: '100%',
    padding: '12px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#00ffff',
    border: '1px solid rgba(0, 255, 255, 0.3)',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'inherit'
  },

  textarea: {
    width: '100%',
    padding: '12px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#00ffff',
    border: '1px solid rgba(0, 255, 255, 0.3)',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'vertical',
    boxSizing: 'border-box'
  },

  modalFooter: {
    padding: '20px',
    borderTop: '1px solid rgba(0, 255, 255, 0.3)',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },

  cancelButton: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
    color: '#ff0040',
    border: '1px solid #ff0040',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    transition: 'all 0.3s ease'
  },

  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#00ff88',
    color: '#000',
    border: '1px solid #00ff88',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    transition: 'all 0.3s ease',
    boxShadow: '0 0 15px rgba(0, 255, 136, 0.3)'
  }
};

export default FeedbackManagement;
