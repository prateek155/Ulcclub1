import React, { useEffect, useState } from "react";
import Papa from "papaparse";

const AIFormResponses = () => {
  const [responses, setResponses] = useState([]);
  const [filteredResponses, setFilteredResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [searchSkills, setSearchSkills] = useState("");
  const [activeForm, setActiveForm] = useState(0);

  // Three different Google Form spreadsheet URLs
  const FORM_CONFIGS = [
    {
      id: 0,
      name: "AI Training Dataset",
      url: "",
      icon: "🤖",
      color: "#00d4ff"
    },
    {
      id: 1,
      name: "Machine Learning Survey",
      url: "",
      icon: "🧠",
      color: "#ff6b6b"
    },
    {
      id: 2,
      name: "Neural Network Feedback",
      url: "",
      icon: "⚡",
      color: "#4ecdc4"
    }
  ];

  const loadFormData = (formIndex) => {
    setLoading(true);
    setError(null);
    setActiveForm(formIndex);
    
    const formUrl = FORM_CONFIGS[formIndex].url;
    
    fetch(formUrl)
      .then((res) => res.text())
      .then((data) => {
        const parsedData = Papa.parse(data, { header: true });
        setResponses(parsedData.data);
        setFilteredResponses(parsedData.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching sheet:", err);
        setError("Neural network connection failed. Retrying data transmission...");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadFormData(0); // Load first form by default
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

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at center, #0f0f23 0%, #000000 70%)',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '"JetBrains Mono", "Courier New", monospace',
      color: '#ffffff',
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `
        radial-gradient(circle at 25% 25%, #00d4ff20 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, #ff6b6b20 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, #4ecdc420 0%, transparent 50%)
      `,
      animation: 'pulse 4s ease-in-out infinite alternate',
      zIndex: 1,
    },
    content: {
      position: 'relative',
      zIndex: 2,
      padding: '2rem',
      maxWidth: '1400px',
      margin: '0 auto',
    },
    header: {
      textAlign: 'center',
      marginBottom: '3rem',
      position: 'relative',
    },
    title: {
      fontSize: '3.5rem',
      fontWeight: '900',
      background: 'linear-gradient(45deg, #00d4ff, #ff6b6b, #4ecdc4)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundSize: '200% 200%',
      animation: 'gradientShift 3s ease infinite',
      marginBottom: '1rem',
      textShadow: '0 0 30px rgba(0, 212, 255, 0.3)',
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#8892b0',
      marginBottom: '2rem',
      opacity: 0.9,
    },
    formSelector: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      marginBottom: '3rem',
      flexWrap: 'wrap',
    },
    formButton: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: '2px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '15px',
      padding: '1rem 2rem',
      color: '#ffffff',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
      minWidth: '200px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
    },
    formButtonActive: {
      border: '2px solid #00d4ff',
      background: 'rgba(0, 212, 255, 0.1)',
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 30px rgba(0, 212, 255, 0.3)',
    },
    formButtonIcon: {
      fontSize: '2rem',
      marginBottom: '0.5rem',
    },
    formButtonText: {
      fontWeight: '600',
      fontSize: '1rem',
      textAlign: 'center',
    },
    formButtonSubtext: {
      fontSize: '0.8rem',
      opacity: 0.7,
    },
    card: {
      background: 'rgba(255, 255, 255, 0.02)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      padding: '2rem',
      marginBottom: '2rem',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
      position: 'relative',
      overflow: 'hidden',
    },
    cardGlow: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '2px',
      background: 'linear-gradient(90deg, #00d4ff, #ff6b6b, #4ecdc4)',
      backgroundSize: '200% 100%',
      animation: 'gradientSlide 2s ease infinite',
    },
    searchContainer: {
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '15px',
      padding: '2rem',
      marginBottom: '2rem',
    },
    searchTitle: {
      fontSize: '1.3rem',
      fontWeight: '700',
      color: '#00d4ff',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    searchGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
    },
    searchInputContainer: {
      position: 'relative',
    },
    searchInput: {
      width: '100%',
      padding: '1rem 1.5rem',
      fontSize: '1rem',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '2px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      color: '#ffffff',
      outline: 'none',
      transition: 'all 0.3s ease',
      fontFamily: 'inherit',
    },
    searchInputFocus: {
      borderColor: '#00d4ff',
      background: 'rgba(0, 212, 255, 0.05)',
      boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)',
    },
    searchLabel: {
      position: 'absolute',
      top: '-0.7rem',
      left: '1rem',
      background: 'rgba(15, 15, 35, 0.9)',
      padding: '0.3rem 0.8rem',
      fontSize: '0.85rem',
      fontWeight: '600',
      color: '#00d4ff',
      borderRadius: '6px',
      border: '1px solid rgba(0, 212, 255, 0.3)',
    },
    clearButton: {
      background: 'linear-gradient(135deg, #ff6b6b, #ff8e8e)',
      color: '#ffffff',
      border: 'none',
      padding: '1rem 2rem',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '1.5rem',
      position: 'relative',
      overflow: 'hidden',
    },
    resultsInfo: {
      background: 'rgba(0, 212, 255, 0.1)',
      border: '1px solid rgba(0, 212, 255, 0.3)',
      borderRadius: '12px',
      padding: '1rem 1.5rem',
      marginBottom: '2rem',
      color: '#00d4ff',
      fontSize: '1rem',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    tableContainer: {
      background: 'rgba(255, 255, 255, 0.02)',
      borderRadius: '15px',
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '0.95rem',
    },
    thead: {
      background: 'rgba(0, 212, 255, 0.1)',
      backdropFilter: 'blur(10px)',
    },
    th: {
      padding: '1.5rem 1rem',
      textAlign: 'left',
      fontWeight: '700',
      color: '#00d4ff',
      fontSize: '0.9rem',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      borderBottom: '2px solid rgba(0, 212, 255, 0.3)',
      position: 'relative',
    },
    tbody: {
      background: 'transparent',
    },
    tr: {
      transition: 'all 0.3s ease',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      position: 'relative',
    },
    trHover: {
      background: 'rgba(0, 212, 255, 0.05)',
      boxShadow: '0 5px 15px rgba(0, 212, 255, 0.1)',
    },
    td: {
      padding: '1.5rem 1rem',
      color: '#e6f1ff',
      lineHeight: '1.6',
      verticalAlign: 'top',
      position: 'relative',
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem',
    },
    spinner: {
      width: '60px',
      height: '60px',
      border: '3px solid rgba(255, 255, 255, 0.1)',
      borderTop: '3px solid #00d4ff',
      borderRight: '3px solid #ff6b6b',
      borderRadius: '50%',
      animation: 'neuralSpin 1.5s linear infinite',
      marginBottom: '2rem',
    },
    loadingText: {
      color: '#00d4ff',
      fontSize: '1.2rem',
      fontWeight: '600',
      animation: 'pulse 2s ease-in-out infinite',
    },
    errorContainer: {
      textAlign: 'center',
      padding: '3rem',
      color: '#ff6b6b',
      background: 'rgba(255, 107, 107, 0.1)',
      borderRadius: '15px',
      border: '1px solid rgba(255, 107, 107, 0.3)',
    },
    errorIcon: {
      fontSize: '4rem',
      marginBottom: '1rem',
      filter: 'drop-shadow(0 0 10px rgba(255, 107, 107, 0.5))',
    },
    errorText: {
      fontSize: '1.2rem',
      fontWeight: '600',
    },
    badge: {
      background: 'linear-gradient(135deg, #00d4ff, #4ecdc4)',
      color: '#000000',
      padding: '0.8rem 1.5rem',
      borderRadius: '25px',
      fontSize: '1rem',
      fontWeight: '700',
      display: 'inline-block',
      marginBottom: '2rem',
      boxShadow: '0 5px 15px rgba(0, 212, 255, 0.3)',
    },
    noResults: {
      textAlign: 'center',
      padding: '4rem',
      color: '#8892b0',
      fontSize: '1.2rem',
      background: 'rgba(255, 255, 255, 0.02)',
      borderRadius: '15px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
  };

  // Add CSS animations
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes neuralSpin {
      0% { transform: rotate(0deg) scale(1); }
      50% { transform: rotate(180deg) scale(1.1); }
      100% { transform: rotate(360deg) scale(1); }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes gradientSlide {
      0% { background-position: 0% 0%; }
      100% { background-position: 200% 0%; }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .fade-in {
      animation: fadeIn 0.8s ease-out;
    }
    
    input::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
  `;
  document.head.appendChild(styleSheet);

  const [hoveredRow, setHoveredRow] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const clearSearch = () => {
    setSearchName("");
    setSearchSkills("");
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.backgroundPattern}></div>
        <div style={styles.content}>
          <div style={styles.card}>
            <div style={styles.loadingContainer}>
              <div style={styles.spinner}></div>
              <p style={styles.loadingText}>Processing neural data streams...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.backgroundPattern}></div>
        <div style={styles.content}>
          <div style={styles.card}>
            <div style={styles.errorContainer}>
              <div style={styles.errorIcon}>⚠️</div>
              <p style={styles.errorText}>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern}></div>
      <div style={styles.content} className="fade-in">
        <div style={styles.header}>
          <h1 style={styles.title}>Volunteer Data </h1>
          <p style={styles.subtitle}>Advanced Neural Response Processing System</p>
        </div>

        {/* Form Selection Buttons */}
        <div style={styles.formSelector}>
          {FORM_CONFIGS.map((form, index) => (
            <button
              key={form.id}
              style={{
                ...styles.formButton,
                ...(activeForm === index ? styles.formButtonActive : {}),
              }}
              onClick={() => loadFormData(index)}
              onMouseEnter={(e) => {
                if (activeForm !== index) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = `0 5px 20px ${form.color}30`;
                }
              }}
              onMouseLeave={(e) => {
                if (activeForm !== index) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              <div style={styles.formButtonIcon}>{form.icon}</div>
              <div style={styles.formButtonText}>{form.name}</div>
              <div style={styles.formButtonSubtext}>
                {responses.length} records
              </div>
            </button>
          ))}
        </div>

        <div style={styles.card}>
          <div style={styles.cardGlow}></div>
          
          <span style={styles.badge}>
            {FORM_CONFIGS[activeForm].icon} {responses.length} Neural Patterns Detected
          </span>

          {/* Search Section */}
          <div style={styles.searchContainer}>
            <div style={styles.searchTitle}>
              🔍 Data Pattern Recognition
            </div>
            <div style={styles.searchGrid}>
              <div style={styles.searchInputContainer}>
                <label style={styles.searchLabel}>Identity Scan</label>
                <input
                  type="text"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="Enter neural signature..."
                  style={{
                    ...styles.searchInput,
                    ...(focusedInput === 'name' ? styles.searchInputFocus : {}),
                  }}
                  onFocus={() => setFocusedInput('name')}
                  onBlur={() => setFocusedInput(null)}
                />
              </div>
              <div style={styles.searchInputContainer}>
                <label style={styles.searchLabel}>Skill Matrix</label>
                <input
                  type="text"
                  value={searchSkills}
                  onChange={(e) => setSearchSkills(e.target.value)}
                  placeholder="Analyze capabilities..."
                  style={{
                    ...styles.searchInput,
                    ...(focusedInput === 'skills' ? styles.searchInputFocus : {}),
                  }}
                  onFocus={() => setFocusedInput('skills')}
                  onBlur={() => setFocusedInput(null)}
                />
              </div>
            </div>
            {(searchName || searchSkills) && (
              <button
                style={styles.clearButton}
                onClick={clearSearch}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Reset Neural Filters
              </button>
            )}
          </div>

          {/* Results Info */}
          {(searchName || searchSkills) && (
            <div style={styles.resultsInfo}>
              📊 Neural Match: {filteredResponses.length} / {responses.length} patterns
              {searchName && ` • ID: "${searchName}"`}
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
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                  <p>No neural patterns match the specified parameters.</p>
                  <p>Recalibrating search algorithms...</p>
                </>
              ) : (
                <p>No data streams detected</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIFormResponses;
