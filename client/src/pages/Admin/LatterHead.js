import React, { useState, useRef } from 'react';

const CertificateGenerator = () => {
  const [mitWpuLogo, setMitWpuLogo] = useState('');
  const [socsaLogo, setSocsaLogo] = useState('');
  const [message, setMessage] = useState('');
  const certificateRef = useRef();

  // PDF generation function using print window (same as meeting report system)
  const handleDownloadPDF = async () => {
    if (!message.trim()) {
      alert('Please enter a message first');
      return;
    }

    try {
      const printWindow = window.open('', '_blank');
      
      const certificateHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Certificate - ${message.substring(0, 30)}...</title>
          <meta charset="UTF-8">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            @page {
              size: A4;
              margin: 0;
            }
            
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background: white;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            
            .certificate-container {
              width: 210mm;
              height: 297mm;
              margin: 0 auto;
              background: white;
              position: relative;
              overflow: hidden;
              page-break-inside: avoid;
            }
            
            .blue-accent {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 20px;
              background: #2196F3;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin: 40px;
              margin-top: 60px;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 3px solid #1e40af;
            }
            
            .logo-left {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            
            .logo-left img {
              width: 120px;
              height: auto;
              margin-bottom: 10px;
              max-height: 100px;
              object-fit: contain;
            }
            
            .logo-right {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            
            .logo-right img {
              height: 100px;
              width: auto;
              max-width: 150px;
              object-fit: contain;
            }
            
            .socsa-logo {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            
            .socsa-text {
              font-size: 48px;
              font-weight: 900;
              letter-spacing: -2px;
              display: flex;
            }
            
            .socsa-s1 { color: #87CEEB; }
            .socsa-o { color: #1e3a8a; }
            .socsa-c { color: #87CEEB; }
            .socsa-s2 { color: #87CEEB; }
            .socsa-a { color: #1e40af; }
            
            .book-icon {
              width: 40px;
              height: 32px;
              background: #87CEEB;
              position: relative;
              margin-bottom: 8px;
              border-radius: 4px;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            
            .book-icon::before {
              content: '';
              position: absolute;
              top: 6px;
              left: 6px;
              right: 6px;
              bottom: 6px;
              border: 2px solid white;
              border-radius: 2px;
            }
            
            .book-icon::after {
              content: '';
              position: absolute;
              top: 14px;
              left: 12px;
              width: 16px;
              height: 2px;
              background: white;
            }
            
            .laptop-icon {
              width: 48px;
              height: 32px;
              background: #87CEEB;
              border-radius: 4px 4px 0 0;
              position: relative;
              margin-top: 8px;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            
            .laptop-icon::before {
              content: '';
              position: absolute;
              bottom: -8px;
              left: -4px;
              width: 56px;
              height: 8px;
              background: #87CEEB;
              border-radius: 0 0 8px 8px;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            
            .laptop-icon::after {
              content: '';
              position: absolute;
              top: 4px;
              left: 4px;
              right: 4px;
              bottom: 4px;
              background: white;
              border-radius: 2px;
            }
            
            .content {
              margin: 0 40px;
              min-height: 420px;
              padding: 40px;
              background: white;
              border-radius: 10px;
            }
            
            .message-content {
              font-size: 16px;
              line-height: 1.8;
              color: #333;
              white-space: pre-wrap;
              text-align: justify;
            }
            
            .footer {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 60px;
              background: #E5E5E5;
              display: flex;
              align-items: center;
              overflow: hidden;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            
            .footer-text {
              font-size: 14px;
              font-weight: bold;
              color: #333;
              padding-left: 20px;
              z-index: 2;
              position: relative;
            }
            
            .footer-diagonal {
              position: absolute;
              right: 0;
              top: 0;
              width: 0;
              height: 0;
              border-style: solid;
              border-width: 60px 200px 0 0;
              border-color: #2196F3 transparent transparent transparent;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            
            @media print {
              body { 
                margin: 0;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              .certificate-container { 
                margin: 0; 
                box-shadow: none;
                page-break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <div class="blue-accent"></div>
          <div class="certificate-container">
            <div class="header">
              <div class="logo-left">
                ${mitWpuLogo ? `<img src="${mitWpuLogo}" alt="MIT-WPU Logo" />` : '<div style="width: 120px; height: 80px; border: 2px dashed #ccc; display: flex; align-items: center; justify-content: center; color: #999; border-radius: 8px; font-size: 12px; background: #f9fafb;">MIT-WPU Logo</div>'}
              </div>
              <div class="logo-right">
                ${socsaLogo ? `<img src="${socsaLogo}" alt="SOCSA Logo" />` : `
                <div class="socsa-logo">
                  <div class="book-icon"></div>
                  <div class="socsa-text">
                    <span class="socsa-s1">S</span>
                    <span class="socsa-o">O</span>
                    <span class="socsa-c">C</span>
                    <span class="socsa-s2">S</span>
                    <span class="socsa-a">A</span>
                  </div>
                  <div class="laptop-icon"></div>
                </div>`}
              </div>
            </div>
            
            <div class="content">
              <div class="message-content">${message.replace(/\n/g, '<br>')}</div>
            </div>
            
            <div class="footer">
              <div class="footer-text">Student Organisation of Computer Science and Applications</div>
              <div class="footer-diagonal"></div>
            </div>
          </div>
        </body>
        </html>
      `;

      printWindow.document.write(certificateHTML);
      printWindow.document.close();
      
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 500);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '2rem 0',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  };

  const mainContainerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem'
  };

  const titleStyle = {
    fontSize: '3.5rem',
    fontWeight: '800',
    textAlign: 'center',
    background: 'linear-gradient(45deg, #ffffff, #e3f2fd)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '3rem',
    textShadow: '0 4px 8px rgba(0,0,0,0.3)',
    letterSpacing: '-1px'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    padding: '2rem',
    marginBottom: '2rem',
    border: '1px solid rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)'
  };

  const sectionTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    color: '#2c3e50',
    position: 'relative',
    paddingLeft: '20px'
  };

  const sectionTitleBeforeStyle = {
    content: '""',
    position: 'absolute',
    left: '0',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '4px',
    height: '100%',
    background: 'linear-gradient(45deg, #667eea, #764ba2)',
    borderRadius: '2px'
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    border: '2px solid #e0e6ed',
    borderRadius: '12px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    backgroundColor: '#ffffff',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)'
  };

  const textareaStyle = {
    ...inputStyle,
    height: '200px',
    fontFamily: "'Fira Code', 'Monaco', 'Menlo', monospace",
    resize: 'none',
    lineHeight: '1.6'
  };

  const buttonStyle = {
    padding: '1rem 2rem',
    borderRadius: '12px',
    fontWeight: '600',
    fontSize: '1.1rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const buttonDisabledStyle = {
    ...buttonStyle,
    background: '#bdc3c7',
    cursor: 'not-allowed',
    boxShadow: 'none'
  };

  const previewContainerStyle = {
    ...cardStyle,
    padding: '1.5rem',
    background: 'rgba(255, 255, 255, 0.98)'
  };

  return (
    <div style={containerStyle}>
      <div style={mainContainerStyle}>
        <h1 style={titleStyle}>
          AI Certificate Generator
        </h1>

        {/* Logo Upload Section */}
        <div style={cardStyle}>
          <div style={{position: 'relative'}}>
            <div style={sectionTitleBeforeStyle}></div>
            <h2 style={sectionTitleStyle}>
              🖼️ Upload Logos
            </h2>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '2rem' 
          }}>
            <div style={{ 
              padding: '1.5rem', 
              border: '2px dashed #667eea', 
              borderRadius: '12px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              background: 'linear-gradient(135deg, #f8f9ff 0%, #e3f2fd 100%)'
            }}>
              <label style={{ 
                display: 'block', 
                fontSize: '1rem', 
                fontWeight: '600', 
                color: '#2c3e50', 
                marginBottom: '1rem',
                cursor: 'pointer'
              }}>
                🏛️ MIT-WPU Logo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => setMitWpuLogo(e.target.result);
                    reader.readAsDataURL(file);
                  }
                }}
                style={{ 
                  ...inputStyle,
                  cursor: 'pointer'
                }}
              />
              {mitWpuLogo && (
                <div style={{ 
                  marginTop: '1rem',
                  padding: '1rem',
                  background: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}>
                  <img 
                    src={mitWpuLogo} 
                    alt="MIT-WPU Preview" 
                    style={{ 
                      height: '80px', 
                      objectFit: 'contain',
                      borderRadius: '4px'
                    }} 
                  />
                </div>
              )}
            </div>
            
            <div style={{ 
              padding: '1.5rem', 
              border: '2px dashed #764ba2', 
              borderRadius: '12px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              background: 'linear-gradient(135deg, #fff8f0 0%, #f3e5f5 100%)'
            }}>
              <label style={{ 
                display: 'block', 
                fontSize: '1rem', 
                fontWeight: '600', 
                color: '#2c3e50', 
                marginBottom: '1rem',
                cursor: 'pointer'
              }}>
                💻 SOCSA Logo (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => setSocsaLogo(e.target.result);
                    reader.readAsDataURL(file);
                  }
                }}
                style={{ 
                  ...inputStyle,
                  cursor: 'pointer'
                }}
              />
              <p style={{fontSize: '0.875rem', color: '#7f8c8d', marginTop: '0.5rem'}}>
                Built-in SOCSA logo available if not uploaded
              </p>
              {socsaLogo && (
                <div style={{ 
                  marginTop: '1rem',
                  padding: '1rem',
                  background: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}>
                  <img 
                    src={socsaLogo} 
                    alt="SOCSA Preview" 
                    style={{ 
                      height: '80px', 
                      objectFit: 'contain',
                      borderRadius: '4px'
                    }} 
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Message Input Section */}
        <div style={cardStyle}>
          <div style={{position: 'relative'}}>
            <div style={sectionTitleBeforeStyle}></div>
            <h2 style={sectionTitleStyle}>
              ✍️ Craft Your Message
            </h2>
          </div>
          
          <div style={{marginBottom: '1.5rem'}}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="✨ Write your certificate message here...\n\nTip: Use line breaks for better formatting!\n\nThis is where your creative content will shine."
              style={textareaStyle}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e6ed';
                e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.06)';
              }}
            />
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginTop: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <span style={{ 
                fontSize: '0.95rem', 
                color: '#7f8c8d',
                fontWeight: '500'
              }}>
                📊 Characters: {message.length}
              </span>
              {message.length > 0 && (
                <span style={{ 
                  fontSize: '0.85rem', 
                  color: message.length > 500 ? '#e74c3c' : '#27ae60',
                  fontWeight: '600'
                }}>
                  {message.length <= 500 ? '✓ Good length' : '⚠ Consider shortening'}
                </span>
              )} 
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={handleDownloadPDF}
                disabled={!message.trim()}
                style={message.trim() ? buttonStyle : buttonDisabledStyle}
                onMouseOver={(e) => {
                  if (message.trim()) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 12px 24px rgba(102, 126, 234, 0.4)';
                  }
                }}
                onMouseOut={(e) => {
                  if (message.trim()) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 16px rgba(102, 126, 234, 0.3)';
                  }
                }}
              >
                📄 Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        {message && (
          <div style={previewContainerStyle}>
            <div style={{position: 'relative'}}>
              <div style={sectionTitleBeforeStyle}></div>
              <h2 style={sectionTitleStyle}>
                👀 Live Preview
              </h2>
            </div>
            
            <div 
              ref={certificateRef}
              style={{ 
                width: '210mm', 
                minHeight: '297mm',
                margin: '0 auto',
                transform: 'scale(0.45)',
                transformOrigin: 'top center',
                marginBottom: '-350px',
                border: '2px solid #e0e6ed',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
              }}
            >
              {/* Blue accent bar */}
              <div style={{ height: '20px', background: '#2196F3' }}></div>
              
              <div style={{ background: 'white', position: 'relative', minHeight: 'calc(297mm - 80px)' }}>
                {/* Header */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  margin: '40px',
                  marginBottom: '30px',
                  paddingBottom: '20px',
                  borderBottom: '3px solid #1e40af'
                }}>
                  {/* Left Logo */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {mitWpuLogo ? (
                      <img src={mitWpuLogo} alt="MIT-WPU Logo" style={{ width: '120px', height: 'auto' }} />
                    ) : (
                      <div style={{ 
                        width: '120px', 
                        height: '80px', 
                        border: '2px dashed #d1d5db', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        color: '#9ca3af', 
                        fontSize: '12px',
                        borderRadius: '8px',
                        background: '#f9fafb'
                      }}>
                        MIT-WPU Logo
                      </div>
                    )}
                  </div>
                  
                  {/* Right Logo */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {socsaLogo ? (
                      <img src={socsaLogo} alt="SOCSA Logo" style={{ height: '100px', width: 'auto' }} />
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {/* Book Icon */}
                        <div style={{ 
                          width: '40px', 
                          height: '32px', 
                          background: '#87CEEB', 
                          position: 'relative',
                          marginBottom: '8px',
                          borderRadius: '4px'
                        }}>
                          <div style={{
                            position: 'absolute',
                            top: '6px',
                            left: '6px',
                            right: '6px',
                            bottom: '6px',
                            border: '2px solid white',
                            borderRadius: '2px'
                          }}></div>
                          <div style={{
                            position: 'absolute',
                            top: '14px',
                            left: '12px',
                            width: '16px',
                            height: '2px',
                            background: 'white'
                          }}></div>
                        </div>
                        
                        {/* SOCSA Text */}
                        <div style={{ display: 'flex', fontSize: '48px', fontWeight: '900', letterSpacing: '-2px' }}>
                          <span style={{ color: '#87CEEB' }}>S</span>
                          <span style={{ color: '#1e3a8a' }}>O</span>
                          <span style={{ color: '#87CEEB' }}>C</span>
                          <span style={{ color: '#87CEEB' }}>S</span>
                          <span style={{ color: '#1e40af' }}>A</span>
                        </div>
                        
                        {/* Laptop Icon */}
                        <div style={{ position: 'relative', marginTop: '8px' }}>
                          <div style={{ 
                            width: '48px', 
                            height: '32px', 
                            background: '#87CEEB', 
                            borderRadius: '4px 4px 0 0',
                            position: 'relative'
                          }}>
                            <div style={{
                              position: 'absolute',
                              top: '4px',
                              left: '4px',
                              right: '4px',
                              bottom: '4px',
                              background: 'white',
                              borderRadius: '2px'
                            }}></div>
                          </div>
                          <div style={{ 
                            width: '56px', 
                            height: '8px', 
                            background: '#87CEEB', 
                            borderRadius: '0 0 8px 8px',
                            marginLeft: '-4px'
                          }}></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div style={{ 
                  margin: '0 40px',
                  minHeight: '420px', 
                  padding: '40px', 
                  background: 'white', 
                  borderRadius: '10px' 
                }}>
                  <div style={{ 
                    fontSize: '16px', 
                    lineHeight: '1.8', 
                    color: '#374151', 
                    whiteSpace: 'pre-wrap', 
                    textAlign: 'justify' 
                  }}>
                    {message}
                  </div>
                </div>

                {/* Footer with diagonal design */}
                <div style={{ 
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  height: '60px',
                  background: '#E5E5E5',
                  display: 'flex',
                  alignItems: 'center',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#333',
                    paddingLeft: '20px',
                    zIndex: '2',
                    position: 'relative'
                  }}>
                    Student Organisation of Computer Science and Applications
                  </div>
                  <div style={{
                    position: 'absolute',
                    right: '0',
                    top: '0',
                    width: '0',
                    height: '0',
                    borderStyle: 'solid',
                    borderWidth: '60px 200px 0 0',
                    borderColor: '#2196F3 transparent transparent transparent'
                  }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateGenerator;
