import React, { useState } from 'react';
import { Download, FileText, Calendar, Users, MapPin, Clock, Eye, EyeOff } from 'lucide-react';

const MeetingReportSystem = () => {
  const [formData, setFormData] = useState({
    meetingTitle: '',
    date: '',
    time: '',
    venue: '',
    attendees: '',
    agenda: '',
    discussions: '',
    decisions: '',
    nextMeeting: '',
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generatePDF = async () => {
    const printWindow = window.open('', '_blank');
    
    const pdfContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Meeting Report - ${formData.meetingTitle}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            padding: 40px;
            background: white;
          }
          .report-header {
            text-align: center;
            border-bottom: 3px solid #4f46e5;
            padding-bottom: 25px;
            margin-bottom: 35px;
          }
          .report-title {
            font-size: 32px;
            color: #4f46e5;
            margin-bottom: 12px;
            font-weight: 700;
            letter-spacing: 1px;
          }
          .org-name {
            font-size: 18px;
            color: #6b7280;
            margin-bottom: 20px;
            font-weight: 500;
          }
          .meeting-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 25px;
            margin-bottom: 35px;
            padding: 25px;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border-radius: 12px;
            border: 1px solid #e2e8f0;
          }
          .info-item {
            margin-bottom: 12px;
          }
          .info-label {
            font-weight: 600;
            color: #4f46e5;
            display: inline-block;
            width: 130px;
            font-size: 14px;
          }
          .info-value {
            color: #374151;
            font-weight: 500;
          }
          .section {
            margin-bottom: 30px;
            page-break-inside: avoid;
          }
          .section-title {
            font-size: 20px;
            color: #4f46e5;
            font-weight: 700;
            margin-bottom: 15px;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 8px;
            position: relative;
          }
          .section-title:before {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 50px;
            height: 2px;
            background: #4f46e5;
          }
          .section-content {
            padding: 15px 0;
            white-space: pre-wrap;
            min-height: 50px;
            line-height: 1.8;
            color: #374151;
            font-size: 15px;
          }
          .signatures {
            position: fixed;
            bottom: 40px;
            left: 40px;
            right: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 25px;
            border-top: 2px solid #4f46e5;
            font-weight: 600;
          }
          .signature-box {
            text-align: center;
            flex: 1;
            padding: 0 20px;
          }
          .signature-name {
            font-size: 16px;
            color: #111827;
            margin-bottom: 6px;
            font-weight: 700;
          }
          .signature-title {
            font-size: 14px;
            color: #6b7280;
            font-weight: 500;
          }
          @media print {
            body { padding: 20px; }
            .signatures { position: fixed; bottom: 20px; }
          }
        </style>
      </head>
      <body>
        <div class="report-header">
          <div class="report-title">MEETING REPORT</div>
          <div class="org-name">Student Organization of Computer Science and Applications (SOCSA)</div>
        </div>

        <div class="meeting-info">
          <div>
            <div class="info-item">
              <span class="info-label">Meeting Title:</span> 
              <span class="info-value">${formData.meetingTitle || 'N/A'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Date:</span> 
              <span class="info-value">${formData.date || 'N/A'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Time:</span> 
              <span class="info-value">${formData.time || 'N/A'}</span>
            </div>
          </div>
          <div>
            <div class="info-item">
              <span class="info-label">Venue:</span> 
              <span class="info-value">${formData.venue || 'N/A'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Attendees:</span> 
              <span class="info-value">${formData.attendees || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Meeting Agenda</div>
          <div class="section-content">${formData.agenda || 'No agenda specified'}</div>
        </div>

        <div class="section">
          <div class="section-title">Key Discussions</div>
          <div class="section-content">${formData.discussions || 'No discussions recorded'}</div>
        </div>

        <div class="section">
          <div class="section-title">Decisions Made</div>
          <div class="section-content">${formData.decisions || 'No decisions recorded'}</div>
        </div>

        <div class="section">
          <div class="section-title">Next Meeting</div>
          <div class="section-content">${formData.nextMeeting || 'To be determined'}</div>
        </div>

        <div class="signatures">
          <div class="signature-box">
            <div class="signature-name">Hritik Shankhala</div>
            <div class="signature-title">President (SOCSA)</div>
          </div>
          <div class="signature-box">
            <div class="signature-name">Prateek Agrawal</div>
            <div class="signature-title">General Secretary (SOCSA)</div>
          </div>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(pdfContent);
    printWindow.document.close();
    
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 500);
  };

  const resetForm = () => {
    setFormData({
      meetingTitle: '',
      date: '',
      time: '',
      venue: '',
      attendees: '',
      agenda: '',
      discussions: '',
      decisions: '',
      nextMeeting: '',
    });
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    mainCard: {
      maxWidth: '1400px',
      margin: '0 auto',
      background: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(10px)',
      borderRadius: '24px',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
      overflow: 'hidden'
    },
    header: {
      background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
      color: 'white',
      padding: '40px 30px',
      textAlign: 'center'
    },
    headerTitle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '15px',
      marginBottom: '20px'
    },
    headerTitleText: {
      fontSize: '42px',
      fontWeight: '700',
      margin: 0,
      letterSpacing: '1px'
    },
    headerSubtitle: {
      fontSize: '20px',
      opacity: 0.9,
      fontWeight: '400',
      margin: 0
    },
    mainContent: {
      padding: '40px'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))',
      gap: '30px',
      marginBottom: '30px'
    },
    formSection: {
      background: 'white',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e5e7eb'
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '25px'
    },
    sectionTitle: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#1f2937',
      margin: 0
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '14px 16px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      fontFamily: 'inherit'
    },
    textarea: {
      width: '100%',
      padding: '14px 16px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      resize: 'vertical',
      minHeight: '120px',
      fontFamily: 'inherit'
    },
    inputRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px'
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      alignItems: 'center',
      marginTop: '40px'
    },
    buttonRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '15px',
      justifyContent: 'center'
    },
    button: {
      padding: '16px 32px',
      borderRadius: '16px',
      border: 'none',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
      color: 'white'
    },
    secondaryButton: {
      background: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
      color: 'white'
    },
    resetButton: {
      background: '#6b7280',
      color: 'white'
    },
    previewContainer: {
      marginTop: '40px',
      background: 'white',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
      border: '2px solid #e5e7eb'
    },
    previewHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '25px'
    },
    previewTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '24px',
      fontWeight: '700',
      color: '#1f2937',
      margin: 0
    },
    previewNote: {
      fontSize: '14px',
      color: '#6b7280'
    },
    previewContent: {
      background: '#f9fafb',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)'
    },
    reportPreview: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      lineHeight: '1.6',
      color: '#333',
      padding: '40px',
      background: 'white',
      minHeight: '800px'
    },
    reportHeader: {
      textAlign: 'center',
      borderBottom: '3px solid #4f46e5',
      paddingBottom: '25px',
      marginBottom: '35px'
    },
    reportTitle: {
      fontSize: '32px',
      color: '#4f46e5',
      marginBottom: '12px',
      fontWeight: '700',
      letterSpacing: '1px'
    },
    orgName: {
      fontSize: '18px',
      color: '#6b7280',
      marginBottom: '20px',
      fontWeight: '500'
    },
    meetingInfo: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '25px',
      marginBottom: '35px',
      padding: '25px',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      borderRadius: '12px',
      border: '1px solid #e2e8f0'
    },
    infoItem: {
      marginBottom: '12px'
    },
    infoLabel: {
      fontWeight: '600',
      color: '#4f46e5',
      display: 'inline-block',
      width: '130px',
      fontSize: '14px'
    },
    infoValue: {
      color: '#374151',
      fontWeight: '500'
    },
    reportSection: {
      marginBottom: '30px'
    },
    reportSectionTitle: {
      fontSize: '20px',
      color: '#4f46e5',
      fontWeight: '700',
      marginBottom: '15px',
      borderBottom: '2px solid #e5e7eb',
      paddingBottom: '8px',
      position: 'relative'
    },
    reportSectionContent: {
      padding: '15px 0',
      whiteSpace: 'pre-wrap',
      minHeight: '50px',
      lineHeight: '1.8',
      color: '#374151',
      fontSize: '15px'
    },
    signatures: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '25px',
      borderTop: '2px solid #4f46e5',
      fontWeight: '600',
      marginTop: '40px'
    },
    signatureBox: {
      textAlign: 'center',
      flex: '1',
      padding: '0 20px'
    },
    signatureName: {
      fontSize: '16px',
      color: '#111827',
      marginBottom: '6px',
      fontWeight: '700'
    },
    signatureTitle: {
      fontSize: '14px',
      color: '#6b7280',
      fontWeight: '500'
    },
    footerPreview: {
      marginTop: '40px',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)',
      borderRadius: '20px',
      padding: '25px',
      border: '2px dashed #4f46e5'
    },
    footerPreviewTitle: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '20px',
      textAlign: 'center'
    },
    footerPreviewContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      textAlign: 'center',
      fontWeight: '600'
    },
    labelWithIcon: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '8px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainCard}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerTitle}>
            <FileText size={45} />
            <h1 style={styles.headerTitleText}>Meeting Report System</h1>
          </div>
          <p style={styles.headerSubtitle}>Student Organization of Computer Science and Applications (SOCSA)</p>
        </div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          <div style={styles.formGrid}>
            {/* Left Column - Meeting Information */}
            <div>
              <div style={styles.formSection}>
                <div style={styles.sectionHeader}>
                  <Calendar color="#4f46e5" size={28} />
                  <h2 style={styles.sectionTitle}>Meeting Information</h2>
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Meeting Title *</label>
                  <input
                    type="text"
                    name="meetingTitle"
                    value={formData.meetingTitle}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter meeting title..."
                    onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>

                <div style={styles.inputRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      style={styles.input}
                      onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Time *</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      style={styles.input}
                      onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.labelWithIcon}>
                    <MapPin size={16} style={{marginRight: '5px'}} />
                    Venue
                  </label>
                  <input
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Meeting venue..."
                    onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.labelWithIcon}>
                    <Users size={16} style={{marginRight: '5px'}} />
                    Attendees
                  </label>
                  <textarea
                    name="attendees"
                    value={formData.attendees}
                    onChange={handleInputChange}
                    style={styles.textarea}
                    placeholder="List of attendees..."
                    onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>

              <div style={{...styles.formSection, marginTop: '30px'}}>
                <div style={styles.sectionHeader}>
                  <FileText color="#4f46e5" size={28} />
                  <h2 style={styles.sectionTitle}>Meeting Agenda</h2>
                </div>
                <textarea
                  name="agenda"
                  value={formData.agenda}
                  onChange={handleInputChange}
                  style={{...styles.textarea, minHeight: '150px'}}
                  placeholder="Meeting agenda and topics to discuss..."
                  onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>

            {/* Right Column - Content Sections */}
            <div>
              <div style={styles.formSection}>
                <div style={styles.sectionHeader}>
                  <Users color="#7c3aed" size={28} />
                  <h2 style={styles.sectionTitle}>Key Discussions</h2>
                </div>
                <textarea
                  name="discussions"
                  value={formData.discussions}
                  onChange={handleInputChange}
                  style={{...styles.textarea, minHeight: '180px'}}
                  placeholder="Main points discussed during the meeting..."
                  onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div style={{...styles.formSection, marginTop: '30px'}}>
                <div style={styles.sectionHeader}>
                  <FileText color="#7c3aed" size={28} />
                  <h2 style={styles.sectionTitle}>Decisions Made</h2>
                </div>
                <textarea
                  name="decisions"
                  value={formData.decisions}
                  onChange={handleInputChange}
                  style={{...styles.textarea, minHeight: '150px'}}
                  placeholder="Key decisions and resolutions..."
                  onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>
          </div>

          {/* Next Meeting Section */}
          <div style={{...styles.formSection, marginBottom: '30px'}}>
            <div style={styles.sectionHeader}>
              <Clock color="#059669" size={28} />
              <h2 style={styles.sectionTitle}>Next Meeting</h2>
            </div>
            <textarea
              name="nextMeeting"
              value={formData.nextMeeting}
              onChange={handleInputChange}
              style={{...styles.textarea, minHeight: '100px'}}
              placeholder="Next meeting date, time, and agenda..."
              onFocus={(e) => e.target.style.borderColor = '#059669'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          {/* Action Buttons */}
          <div style={styles.buttonContainer}>
            <div style={styles.buttonRow}>
              <button
                onClick={togglePreview}
                style={{...styles.button, ...styles.secondaryButton}}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                }}
              >
                {showPreview ? <EyeOff size={24} /> : <Eye size={24} />}
                {showPreview ? 'Hide Preview' : 'Preview Report'}
              </button>
              
              <button
                onClick={generatePDF}
                style={{...styles.button, ...styles.primaryButton}}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                }}
              >
                <Download size={24} />
                Generate PDF Report
              </button>
              
              <button
                onClick={resetForm}
                style={{...styles.button, ...styles.resetButton}}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                }}
              >
                Reset Form
              </button>
            </div>
          </div>

          {/* Report Preview Section */}
          {showPreview && (
            <div style={styles.previewContainer}>
              <div style={styles.previewHeader}>
                <h2 style={styles.previewTitle}>
                  <Eye color="#4f46e5" size={28} />
                  Report Preview
                </h2>
                <div style={styles.previewNote}>This is how your PDF will look</div>
              </div>
              
              <div style={styles.previewContent}>
                <div style={styles.reportPreview}>
                  {/* Report Header */}
                  <div style={styles.reportHeader}>
                    <div style={styles.reportTitle}>MEETING REPORT</div>
                    <div style={styles.orgName}>
                      Student Organization of Computer Science and Applications (SOCSA)
                    </div>
                  </div>

                  {/* Meeting Info Grid */}
                  <div style={styles.meetingInfo}>
                    <div>
                      <div style={styles.infoItem}>
                        <span style={styles.infoLabel}>Meeting Title:</span>
                        <span style={styles.infoValue}>{formData.meetingTitle || 'N/A'}</span>
                      </div>
                      <div style={styles.infoItem}>
                        <span style={styles.infoLabel}>Date:</span>
                        <span style={styles.infoValue}>{formData.date || 'N/A'}</span>
                      </div>
                      <div style={styles.infoItem}>
                        <span style={styles.infoLabel}>Time:</span>
                        <span style={styles.infoValue}>{formData.time || 'N/A'}</span>
                      </div>
                    </div>
                    <div>
                      <div style={styles.infoItem}>
                        <span style={styles.infoLabel}>Venue:</span>
                        <span style={styles.infoValue}>{formData.venue || 'N/A'}</span>
                      </div>
                      <div style={styles.infoItem}>
                        <span style={styles.infoLabel}>Attendees:</span>
                        <span style={styles.infoValue}>{formData.attendees || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Report Sections */}
                  <div style={styles.reportSection}>
                    <div style={styles.reportSectionTitle}>Meeting Agenda</div>
                    <div style={styles.reportSectionContent}>
                      {formData.agenda || 'No agenda specified'}
                    </div>
                  </div>

                  <div style={styles.reportSection}>
                    <div style={styles.reportSectionTitle}>Key Discussions</div>
                    <div style={styles.reportSectionContent}>
                      {formData.discussions || 'No discussions recorded'}
                    </div>
                  </div>

                  <div style={styles.reportSection}>
                    <div style={styles.reportSectionTitle}>Decisions Made</div>
                    <div style={styles.reportSectionContent}>
                      {formData.decisions || 'No decisions recorded'}
                    </div>
                  </div>

                  <div style={styles.reportSection}>
                    <div style={styles.reportSectionTitle}>Next Meeting</div>
                    <div style={styles.reportSectionContent}>
                      {formData.nextMeeting || 'To be determined'}
                    </div>
                  </div>

                  {/* Signatures */}
                  <div style={styles.signatures}>
                    <div style={styles.signatureBox}>
                      <div style={styles.signatureName}>Hritik Shankhala</div>
                      <div style={styles.signatureTitle}>President (SOCSA)</div>
                    </div>
                    <div style={styles.signatureBox}>
                      <div style={styles.signatureName}>Prateek Agrawal</div>
                      <div style={styles.signatureTitle}>General Secretary (SOCSA)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Preview */}
          <div style={styles.footerPreview}>
            <h3 style={styles.footerPreviewTitle}>Report Footer Preview</h3>
            <div style={styles.footerPreviewContent}>
              <div>
                <div style={{color: '#1f2937', marginBottom: '4px', fontWeight: '700'}}>Hritik Shankhala</div>
                <div style={{fontSize: '14px', color: '#6b7280', fontWeight: '500'}}>President (SOCSA)</div>
              </div>
              <div>
                <div style={{color: '#1f2937', marginBottom: '4px', fontWeight: '700'}}>Prateek Agrawal</div>
                <div style={{fontSize: '14px', color: '#6b7280', fontWeight: '500'}}>General Secretary (SOCSA)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingReportSystem;
