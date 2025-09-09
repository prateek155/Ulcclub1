import React, { useEffect, useState } from "react";
import Papa from "papaparse";

const GoogleFormResponses = () => {
  const [responses, setResponses] = useState([]);
  const [filteredResponses, setFilteredResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [searchSkills, setSearchSkills] = useState("");

  const SHEET_CSV_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSG6gr_t8SSigegcp6c7UDqGDPzxlL5j8c1oMbXSLqYEafnJJpKWlSFkCoF-kktP_-TeopAXjcwH6Ng/pub?output=csv"
  
  useEffect(() => {
    fetch(SHEET_CSV_URL) 
      .then((res) => res.text()) 
      .then((data) => {
        const parsedData = Papa.parse(data, { header: true });
        setResponses(parsedData.data);
        setFilteredResponses(parsedData.data);   
        setLoading(false);
      })          
      .catch((err) => {
        console.error("Error fetching sheet:", err);
        setError("Failed to load responses. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Filter responses based on search criteria
  useEffect(() => {
    if (!searchName && !searchSkills) {
      setFilteredResponses(responses);
      return;
    }

    const filtered = responses.filter((response) => {
      const nameMatch = searchName ? 
        Object.values(response).some(value => 
          value && value.toString().toLowerCase().includes(searchName.toLowerCase())
        ) : true;
      
      const skillsMatch = searchSkills ?
        Object.values(response).some(value => 
          value && value.toString().toLowerCase().includes(searchSkills.toLowerCase())
        ) : true;

      return nameMatch && skillsMatch;
    });

    setFilteredResponses(filtered);
  }, [searchName, searchSkills, responses]);

  // Function to download PDF
  const downloadPDF = () => {
    const printWindow = window.open('', '_blank');
    const currentDate = new Date().toLocaleDateString();
    
    let tableHTML = '';
    if (filteredResponses.length > 0) {
      const headers = Object.keys(filteredResponses[0]);
      
      tableHTML = `
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 12px;">
          <thead>
            <tr style="background-color: #667eea;">
              ${headers.map(header => `<th style="padding: 10px; border: 1px solid #ddd; color: white; text-align: left;">${header}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${filteredResponses.map(row => `
              <tr>
                ${Object.values(row).map(val => `<td style="padding: 8px; border: 1px solid #ddd;">${val || '—'}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Form Responses - ${currentDate}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              background: white;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 2px solid #667eea;
            }
            .logo {
              width: 200px;
              height: auto;
              margin-bottom: 15px;
            }
            .title {
              color: #333;
              margin: 10px 0;
              font-size: 24px;
              font-weight: bold;
            }
            .subtitle {
              color: #666;
              font-size: 14px;
            }
            .summary {
              background: #f8f9ff;
              padding: 15px;
              border-radius: 8px;
              margin: 20px 0;
              border-left: 4px solid #667eea;
            }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <svg width="200" height="120" viewBox="0 0 400 240" class="logo">
              <!-- SOCSA Logo -->
              <defs>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
                  <stop offset="50%" style="stop-color:#4682B4;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#1E3A8A;stop-opacity:1" />
                </linearGradient>
              </defs>
              
              <!-- Book icon -->
              <path d="M200 30 L230 30 C235 30 240 35 240 40 L240 80 C240 85 235 90 230 90 L170 90 C165 90 160 85 160 80 L160 40 C160 35 165 30 170 30 L200 30 Z" 
                    fill="#87CEEB" opacity="0.8"/>
              <path d="M200 30 L200 90 M180 45 L220 45 M180 60 L220 60 M180 75 L220 75" 
                    stroke="white" stroke-width="2" fill="none"/>
              
              <!-- Letters -->
              <!-- S -->
              <path d="M40 120 C25 120 20 130 20 140 C20 150 25 155 35 155 L65 155 C75 155 80 160 80 170 C80 180 75 185 65 185 L25 185 C15 185 10 190 10 200 C10 210 15 215 25 215 L65 215 C85 215 100 200 100 180 C100 165 90 150 75 150 L45 150 C35 150 30 145 30 135 C30 125 35 120 45 120 L85 120 C95 120 100 115 100 105 C100 95 95 90 85 90 L45 90 C25 90 10 105 10 125" 
                    fill="url(#blueGradient)"/>
              
              <!-- O -->
              <circle cx="150" cy="152" r="45" fill="#4682B4" opacity="0.9"/>
              <circle cx="150" cy="152" r="25" fill="white"/>
              
              <!-- C -->
              <path d="M230 107 C210 107 195 122 195 152 C195 182 210 197 230 197 L250 197 C260 197 265 192 265 182 C265 172 260 167 250 167 L230 167 C225 167 220 162 220 152 C220 142 225 137 230 137 L250 137 C260 137 265 132 265 122 C265 112 260 107 250 107 L230 107" 
                    fill="#87CEEB" opacity="0.8"/>
              
              <!-- S -->
              <path d="M290 120 C275 120 270 130 270 140 C270 150 275 155 285 155 L315 155 C325 155 330 160 330 170 C330 180 325 185 315 185 L275 185 C265 185 260 190 260 200 C260 210 265 215 275 215 L315 215 C335 215 350 200 350 180 C350 165 340 150 325 150 L295 150 C285 150 280 145 280 135 C280 125 285 120 295 120 L335 120 C345 120 350 115 350 105 C350 95 345 90 335 90 L295 90 C275 90 260 105 260 125" 
                    fill="url(#blueGradient)"/>
              
              <!-- A -->
              <path d="M380 215 L390 215 C400 215 405 210 405 200 L405 195 L365 105 C360 95 350 90 340 90 C330 90 320 95 315 105 L275 195 L275 200 C275 210 280 215 290 215 L300 215 C310 215 315 210 315 200 L320 185 L360 185 L365 200 C365 210 370 215 380 215 M330 155 L350 155 L340 130 L330 155" 
                    fill="#1E3A8A"/>
              
              <!-- Laptop icon -->
              <rect x="170" y="205" width="60" height="35" rx="3" fill="#87CEEB" opacity="0.6"/>
              <rect x="175" y="210" width="50" height="25" fill="white"/>
              <rect x="165" y="235" width="70" height="8" rx="4" fill="#4682B4" opacity="0.8"/>
            </svg>
            
            <h1 class="title">SOCSA - Skill Form Responses Report</h1>
            <p class="subtitle">Generated on ${currentDate}</p>
          </div>
          
          <div class="summary">
            <strong>Summary:</strong><br>
            Total Responses: ${responses.length}<br>
            Filtered Results: ${filteredResponses.length}<br>
            ${searchName ? `Name Filter: "${searchName}"<br>` : ''}
            ${searchSkills ? `Skills Filter: "${searchSkills}"<br>` : ''}
          </div>
          
          ${tableHTML}
          
          <div style="margin-top: 40px; text-align: center; color: #666; font-size: 12px; border-top: 1px solid #ddd; padding-top: 20px;">
            <p>This report was generated by SOCSA Form Response System</p>
            <p>© ${new Date().getFullYear()} SOCSA. All rights reserved.</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Wait a moment for content to load, then print
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
    },
    logoContainer: {
      textAlign: 'center',
      marginBottom: '2rem',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '1.5rem',
      maxWidth: '1200px',
      margin: '0 auto 2rem auto',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '0.5rem',
    },
    subtitle: {
      color: '#64748b',
      fontSize: '1.1rem',
      fontWeight: '400',
    },
    searchContainer: {
      background: '#ffffff',
      borderRadius: '16px',
      padding: '1.5rem',
      marginBottom: '2rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e2e8f0',
    },
    searchTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#334155',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    searchGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1rem',
    },
    searchInputContainer: {
      position: 'relative',
    },
    searchInput: {
      width: '100%',
      padding: '0.75rem 1rem',
      fontSize: '1rem',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      outline: 'none',
      transition: 'all 0.2s ease',
      background: '#f8fafc',
    },
    searchInputFocus: {
      borderColor: '#667eea',
      background: '#ffffff',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
    },
    searchLabel: {
      position: 'absolute',
      top: '-0.5rem',
      left: '1rem',
      background: '#ffffff',
      padding: '0 0.5rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#667eea',
    },
    buttonContainer: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1rem',
      flexWrap: 'wrap',
    },
    clearButton: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: '#ffffff',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '12px',
      fontSize: '0.9rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    downloadButton: {
      background: 'linear-gradient(135deg, #10b981, #059669)',
      color: '#ffffff',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '12px',
      fontSize: '0.9rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    clearButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
    },
    downloadButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
    },
    resultsInfo: {
      background: '#f0f9ff',
      border: '1px solid #0ea5e9',
      borderRadius: '12px',
      padding: '1rem',
      marginBottom: '1rem',
      color: '#0369a1',
      fontSize: '0.95rem',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    tableContainer: {
      background: '#ffffff',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e2e8f0',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '0.95rem',
    },
    thead: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
    },
    th: {
      padding: '1rem',
      textAlign: 'left',
      fontWeight: '600',
      color: '#ffffff',
      fontSize: '0.9rem',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      borderBottom: 'none',
    },
    tbody: {
      background: '#ffffff',
    },
    tr: {
      transition: 'all 0.2s ease',
      borderBottom: '1px solid #f1f5f9',
    },
    trHover: {
      background: '#f8fafc',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    },
    td: {
      padding: '1rem',
      color: '#334155',
      lineHeight: '1.5',
      verticalAlign: 'top',
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem',
    },
    spinner: {
      width: '50px',
      height: '50px',
      border: '3px solid #f3f4f6',
      borderTop: '3px solid #667eea',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '1rem',
    },
    loadingText: {
      color: '#64748b',
      fontSize: '1.1rem',
      fontWeight: '500',
    },
    errorContainer: {
      textAlign: 'center',
      padding: '2rem',
      color: '#dc2626',
      background: '#fef2f2',
      borderRadius: '12px',
      border: '1px solid #fecaca',
    },
    errorIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
    },
    errorText: {
      fontSize: '1.1rem',
      fontWeight: '500',
    },
    badge: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: '#ffffff',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      fontSize: '0.9rem',
      fontWeight: '500',
      display: 'inline-block',
      marginBottom: '1rem',
    },
    noResults: {
      textAlign: 'center',
      padding: '3rem',
      color: '#64748b',
      fontSize: '1.1rem',
      background: '#f8fafc',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
    },
  };

  // Add CSS animation keyframes
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .fade-in {
      animation: fadeIn 0.6s ease-out;
    }
  `;
  document.head.appendChild(styleSheet);

  const [hoveredRow, setHoveredRow] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  const clearSearch = () => {
    setSearchName("");
    setSearchSkills("");
  };

  // SOCSA Logo SVG Component
  const SOCSALogo = () => (
    <svg width="300" height="180" viewBox="0 0 400 240" style={{margin: '0 auto', display: 'block'}}>
      <defs>
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{stopColor:"#87CEEB", stopOpacity:1}} />
          <stop offset="50%" style={{stopColor:"#4682B4", stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:"#1E3A8A", stopOpacity:1}} />
        </linearGradient>
      </defs>
      
      {/* Book icon */}
      <path d="M200 30 L230 30 C235 30 240 35 240 40 L240 80 C240 85 235 90 230 90 L170 90 C165 90 160 85 160 80 L160 40 C160 35 165 30 170 30 L200 30 Z" 
            fill="#87CEEB" opacity="0.8"/>
      <path d="M200 30 L200 90 M180 45 L220 45 M180 60 L220 60 M180 75 L220 75" 
            stroke="white" strokeWidth="2" fill="none"/>
      
      {/* Letters */}
      {/* S */}
      <path d="M40 120 C25 120 20 130 20 140 C20 150 25 155 35 155 L65 155 C75 155 80 160 80 170 C80 180 75 185 65 185 L25 185 C15 185 10 190 10 200 C10 210 15 215 25 215 L65 215 C85 215 100 200 100 180 C100 165 90 150 75 150 L45 150 C35 150 30 145 30 135 C30 125 35 120 45 120 L85 120 C95 120 100 115 100 105 C100 95 95 90 85 90 L45 90 C25 90 10 105 10 125" 
            fill="url(#blueGradient)"/>
      
      {/* O */}
      <circle cx="150" cy="152" r="45" fill="#4682B4" opacity="0.9"/>
      <circle cx="150" cy="152" r="25" fill="white"/>
      
      {/* C */}
      <path d="M230 107 C210 107 195 122 195 152 C195 182 210 197 230 197 L250 197 C260 197 265 192 265 182 C265 172 260 167 250 167 L230 167 C225 167 220 162 220 152 C220 142 225 137 230 137 L250 137 C260 137 265 132 265 122 C265 112 260 107 250 107 L230 107" 
            fill="#87CEEB" opacity="0.8"/>
      
      {/* S */}
      <path d="M290 120 C275 120 270 130 270 140 C270 150 275 155 285 155 L315 155 C325 155 330 160 330 170 C330 180 325 185 315 185 L275 185 C265 185 260 190 260 200 C260 210 265 215 275 215 L315 215 C335 215 350 200 350 180 C350 165 340 150 325 150 L295 150 C285 150 280 145 280 135 C280 125 285 120 295 120 L335 120 C345 120 350 115 350 105 C350 95 345 90 335 90 L295 90 C275 90 260 105 260 125" 
            fill="url(#blueGradient)"/>
      
      {/* A */}
      <path d="M380 215 L390 215 C400 215 405 210 405 200 L405 195 L365 105 C360 95 350 90 340 90 C330 90 320 95 315 105 L275 195 L275 200 C275 210 280 215 290 215 L300 215 C310 215 315 210 315 200 L320 185 L360 185 L365 200 C365 210 370 215 380 215 M330 155 L350 155 L340 130 L330 155" 
            fill="#1E3A8A"/>
      
      {/* Laptop icon */}
      <rect x="170" y="205" width="60" height="35" rx="3" fill="#87CEEB" opacity="0.6"/>
      <rect x="175" y="210" width="50" height="25" fill="white"/>
      <rect x="165" y="235" width="70" height="8" rx="4" fill="#4682B4" opacity="0.8"/>
    </svg>
  );

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.logoContainer}>
          <SOCSALogo />
        </div>
        <div style={styles.card}>
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Loading responses...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.logoContainer}>
          <SOCSALogo />
        </div>
        <div style={styles.card}>
          <div style={styles.errorContainer}>
            <div style={styles.errorIcon}>⚠️</div>
            <p style={styles.errorText}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* SOCSA Logo Header */}
      <div style={styles.logoContainer}>
        <SOCSALogo />
      </div>

      <div style={styles.card} className="fade-in">
        <div style={styles.header}>
          <h1 style={styles.title}>Skill Form Responses</h1>
          <span style={styles.badge}>
            {responses.length} Total Response{responses.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Search Section */}
        <div style={styles.searchContainer}>
          <div style={styles.searchTitle}>
            🔍 Search & Filter Responses
          </div>
          <div style={styles.searchGrid}>
            <div style={styles.searchInputContainer}>
              <label style={styles.searchLabel}>Search by Name</label>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Enter name to search..."
                style={{
                  ...styles.searchInput,
                  ...(focusedInput === 'name' ? styles.searchInputFocus : {}),
                }}
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput(null)}
              />
            </div>
            <div style={styles.searchInputContainer}>
              <label style={styles.searchLabel}>Search by Skills</label>
              <input
                type="text"
                value={searchSkills}
                onChange={(e) => setSearchSkills(e.target.value)}
                placeholder="Enter skills to search..."
                style={{
                  ...styles.searchInput,
                  ...(focusedInput === 'skills' ? styles.searchInputFocus : {}),
                }}
                onFocus={() => setFocusedInput('skills')}
                onBlur={() => setFocusedInput(null)}
              />
            </div>
          </div>
          
          <div style={styles.buttonContainer}>
            {(searchName || searchSkills) && (
              <button
                style={{
                  ...styles.clearButton,
                  ...(hoveredButton === 'clear' ? styles.clearButtonHover : {}),
                }}
                onClick={clearSearch}
                onMouseEnter={() => setHoveredButton('clear')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Clear Search
              </button>
            )}
            
            <button
              style={{
                ...styles.downloadButton,
                ...(hoveredButton === 'download' ? styles.downloadButtonHover : {}),
              }}
              onClick={downloadPDF}
              onMouseEnter={() => setHoveredButton('download')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              📄 Download PDF
            </button>
          </div>
        </div>

        {/* Results Info */}
        {(searchName || searchSkills) && (
          <div style={styles.resultsInfo}>
            📊 Showing {filteredResponses.length} of {responses.length} responses
            {searchName && ` • Name: "${searchName}"`}
            {searchSkills && ` • Skills: "${searchSkills}"`}
          </div>
        )}

        {/* Results Table */}
        {filteredResponses.length > 0 ? (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead style={styles.thead}>
                <tr>
                  {Object.keys(filteredResponses[0]).map((key, idx) => (
                    <th key={idx} style={styles.th}>
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody style={styles.tbody}>
                {filteredResponses.map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      ...styles.tr,
                      ...(hoveredRow === i ? styles.trHover : {}),
                    }}
                    onMouseEnter={() => setHoveredRow(i)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    {Object.values(row).map((val, j) => (
                      <td key={j} style={styles.td}>
                        {val || '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={styles.noResults}>
            {searchName || searchSkills ? (
              <>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔍</div>
                <p>No responses match your search criteria.</p>
                <p>Try adjusting your search terms or clearing the filters.</p>
              </>
            ) : (
              <p>No responses found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleFormResponses;
