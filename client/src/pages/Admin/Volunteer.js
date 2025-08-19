import React, { useEffect, useState } from "react";
import Papa from "papaparse";

const VolunteerManager = () => {
  const [allEventData, setAllEventData] = useState({});
  const [currentEvent, setCurrentEvent] = useState("");
  const [responses, setResponses] = useState([]);
  const [filteredResponses, setFilteredResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [searchSkills, setSearchSkills] = useState("");
  const [eventDataSources, setEventDataSources] = useState([
    {
      id: "event1",
      name: "Tech Conference 2025",
      csvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSG6gr_t8SSigegcp6c7UDqGDPzxlL5j8c1oMbXSLqYEafnJJpKWlSFkCoF-kktP_-TeopAXjcwH6Ng/pub?output=csv",
      status: "active"
    },
    {
      id: "event2", 
      name: "Community Outreach",
      csvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSG6gr_t8SSigegcp6c7UDqGDPzxlL5j8c1oMbXSLqYEafnJJpKWlSFkCoF-kktP_-TeopAXjcwH6Ng/pub?output=csv",
      status: "active"
    },
    {
      id: "event3",
      name: "Annual Fundraiser",
      csvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSG6gr_t8SSigegcp6c7UDqGDPzxlL5j8c1oMbXSLqYEafnJJpKWlSFkCoF-kktP_-TeopAXjcwH6Ng/pub?output=csv",
      status: "upcoming"
    }
  ]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({ name: "", csvUrl: "" });

  // Load data for a specific event
  const loadEventData = async (eventId) => {
    const event = eventDataSources.find(e => e.id === eventId);
    if (!event) return;

    // Check if we already have this data cached
    if (allEventData[eventId]) {
      setResponses(allEventData[eventId]);
      setFilteredResponses(allEventData[eventId]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(event.csvUrl);
      const data = await response.text();
      const parsedData = Papa.parse(data, { 
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim()
      });
      
      // Cache the data
      setAllEventData(prev => ({
        ...prev,
        [eventId]: parsedData.data
      }));
      
      setResponses(parsedData.data);
      setFilteredResponses(parsedData.data);
    } catch (err) {
      console.error("Error fetching sheet:", err);
      setError(`Failed to load data for ${event.name}. Please check the CSV URL.`);
    } finally {
      setLoading(false);
    }
  };

  // Load first event on component mount
  useEffect(() => {
    if (eventDataSources.length > 0 && !currentEvent) {
      const firstEvent = eventDataSources[0];
      setCurrentEvent(firstEvent.id);
      loadEventData(firstEvent.id);
    }
  }, [eventDataSources]);

  // Handle event change
  const handleEventChange = (eventId) => {
    setCurrentEvent(eventId);
    setSearchName("");
    setSearchSkills("");
    loadEventData(eventId);
  };

  // Add new event
  const addNewEvent = () => {
    if (!newEvent.name.trim() || !newEvent.csvUrl.trim()) {
      alert("Please enter both event name and CSV URL");
      return;
    }

    const newId = `event${Date.now()}`;
    setEventDataSources(prev => [...prev, {
      id: newId,
      name: newEvent.name,
      csvUrl: newEvent.csvUrl,
      status: "active"
    }]);
    
    setNewEvent({ name: "", csvUrl: "" });
    setShowAddEvent(false);
    setCurrentEvent(newId);
    loadEventData(newId);
  };

  // Remove event
  const removeEvent = (eventId) => {
    if (eventDataSources.length <= 1) {
      alert("Cannot remove the last event");
      return;
    }
    
    setEventDataSources(prev => prev.filter(e => e.id !== eventId));
    setAllEventData(prev => {
      const newData = { ...prev };
      delete newData[eventId];
      return newData;
    });
    
    if (currentEvent === eventId) {
      const remainingEvents = eventDataSources.filter(e => e.id !== eventId);
      if (remainingEvents.length > 0) {
        handleEventChange(remainingEvents[0].id);
      }
    }
  };

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
      maxWidth: '1400px',
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
    eventSelector: {
      background: '#ffffff',
      borderRadius: '16px',
      padding: '1.5rem',
      marginBottom: '1rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e2e8f0',
    },
    eventSelectorTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#334155',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    eventTabs: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      marginBottom: '1rem',
    },
    eventTab: {
      padding: '0.75rem 1.5rem',
      borderRadius: '12px',
      border: '2px solid #e2e8f0',
      background: '#ffffff',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontSize: '0.9rem',
      fontWeight: '500',
      position: 'relative',
    },
    eventTabActive: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: '#ffffff',
      border: '2px solid transparent',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
    },
    eventTabHover: {
      borderColor: '#667eea',
      transform: 'translateY(-1px)',
    },
    statusBadge: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      background: '#10b981',
      color: '#ffffff',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      fontSize: '0.7rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '600',
    },
    statusBadgeUpcoming: {
      background: '#f59e0b',
    },
    addEventButton: {
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
    addEventForm: {
      background: '#f8fafc',
      borderRadius: '12px',
      padding: '1.5rem',
      marginTop: '1rem',
      border: '1px solid #e2e8f0',
    },
    addEventGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr auto',
      gap: '1rem',
      alignItems: 'end',
    },
    input: {
      padding: '0.75rem 1rem',
      fontSize: '0.9rem',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      outline: 'none',
      transition: 'all 0.2s ease',
    },
    inputFocus: {
      borderColor: '#667eea',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
    },
    button: {
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      border: 'none',
      fontSize: '0.9rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: '#ffffff',
    },
    secondaryButton: {
      background: '#f1f5f9',
      color: '#64748b',
      border: '1px solid #cbd5e1',
    },
    removeButton: {
      background: '#ef4444',
      color: '#ffffff',
      fontSize: '0.8rem',
      padding: '0.5rem',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      opacity: '0.7',
      transition: 'all 0.2s ease',
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
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '0.95rem',
      minWidth: '600px',
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
      whiteSpace: 'nowrap',
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
      maxWidth: '200px',
      wordBreak: 'break-word',
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
  useEffect(() => {
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
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const [hoveredRow, setHoveredRow] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [hoveredTab, setHoveredTab] = useState(null);

  const clearSearch = () => {
    setSearchName("");
    setSearchSkills("");
  };

  const currentEventData = eventDataSources.find(e => e.id === currentEvent);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Loading volunteer data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card} className="fade-in">
        <div style={styles.header}>
          <h1 style={styles.title}>Volunteer Management</h1>
          <p style={styles.subtitle}>Manage volunteers across multiple events</p>
          {currentEventData && (
            <span style={styles.badge}>
              {responses.length} Volunteer{responses.length !== 1 ? 's' : ''} • {currentEventData.name}
            </span>
          )}
        </div>

        {/* Event Selection */}
        <div style={styles.eventSelector}>
          <div style={styles.eventSelectorTitle}>
            🎯 Select Event
            <button
              style={styles.addEventButton}
              onClick={() => setShowAddEvent(!showAddEvent)}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              ➕ Add Event
            </button>
          </div>
          
          <div style={styles.eventTabs}>
            {eventDataSources.map((event) => (
              <div key={event.id} style={{ position: 'relative' }}>
                <div
                  style={{
                    ...styles.eventTab,
                    ...(currentEvent === event.id ? styles.eventTabActive : {}),
                    ...(hoveredTab === event.id && currentEvent !== event.id ? styles.eventTabHover : {}),
                  }}
                  onClick={() => handleEventChange(event.id)}
                  onMouseEnter={() => setHoveredTab(event.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                >
                  {event.name}
                  <div
                    style={{
                      ...styles.statusBadge,
                      ...(event.status === 'upcoming' ? styles.statusBadgeUpcoming : {}),
                    }}
                    title={event.status}
                  >
                    {event.status === 'active' ? '●' : '○'}
                  </div>
                  {eventDataSources.length > 1 && (
                    <button
                      style={styles.removeButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeEvent(event.id);
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.opacity = '1';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.opacity = '0.7';
                      }}
                      title="Remove event"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add New Event Form */}
          {showAddEvent && (
            <div style={styles.addEventForm}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#334155' }}>Add New Event</h4>
              <div style={styles.addEventGrid}>
                <input
                  type="text"
                  placeholder="Event Name"
                  value={newEvent.name}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, name: e.target.value }))}
                  style={{
                    ...styles.input,
                    ...(focusedInput === 'newName' ? styles.inputFocus : {}),
                  }}
                  onFocus={() => setFocusedInput('newName')}
                  onBlur={() => setFocusedInput(null)}
                />
                <input
                  type="url"
                  placeholder="Google Sheets CSV URL"
                  value={newEvent.csvUrl}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, csvUrl: e.target.value }))}
                  style={{
                    ...styles.input,
                    ...(focusedInput === 'newUrl' ? styles.inputFocus : {}),
                  }}
                  onFocus={() => setFocusedInput('newUrl')}
                  onBlur={() => setFocusedInput(null)}
                />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    style={{ ...styles.button, ...styles.primaryButton }}
                    onClick={addNewEvent}
                  >
                    Add
                  </button>
                  <button
                    style={{ ...styles.button, ...styles.secondaryButton }}
                    onClick={() => {
                      setShowAddEvent(false);
                      setNewEvent({ name: "", csvUrl: "" });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div style={styles.errorContainer}>
            <div style={styles.errorIcon}>⚠️</div>
            <p style={styles.errorText}>{error}</p>
          </div>
        )}

        {!error && responses.length > 0 && (
          <>
            {/* Search Section */}
            <div style={styles.searchContainer}>
              <div style={styles.searchTitle}>
                🔍 Search & Filter Volunteers
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
                📊 Showing {filteredResponses.length} of {responses.length} volunteers
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
                    <p>No volunteers match your search criteria for {currentEventData?.name}.</p>
                    <p>Try adjusting your search terms or clearing the filters.</p>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>👥</div>
                    <p>No volunteer data found for {currentEventData?.name}</p>
                  </>
                )}
              </div>
            )}
          </>
        )}

        {!error && responses.length === 0 && !loading && (
          <div style={styles.noResults}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📝</div>
            <p>No volunteer responses found.</p>
            <p>Make sure the CSV URL is correct and accessible.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerManager;
