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

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
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
      marginTop: '1rem',
    },
    clearButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
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

  const clearSearch = () => {
    setSearchName("");
    setSearchSkills("");
  };

  if (loading) {
    return (
      <div style={styles.container}>
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
      <div style={styles.card} className="fade-in">
        <div style={styles.header}>
          <h1 style={styles.title}>Form Responses</h1>
          <p style={styles.subtitle}>Real-time data from your Google Form</p>
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
          {(searchName || searchSkills) && (
            <button
              style={styles.clearButton}
              onClick={clearSearch}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Clear Search
            </button>
          )}
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
