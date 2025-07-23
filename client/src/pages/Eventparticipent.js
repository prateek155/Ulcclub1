import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Eventparticipent = () => {
  const [groups, setGroups] = useState([]);
  const [memberName, setMemberName] = useState('');
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(null);
  const [expandedGroups, setExpandedGroups] = useState({});

  // Fetch all groups
  const fetchGroups = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/participent/groups');
      setGroups(data.groups);
    } catch (error) {
      console.error('Failed to fetch groups:', error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const toggleGroupExpansion = (groupId) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const getPositionColor = (position) => {
    const colors = {
      1: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', // Gold
      2: 'linear-gradient(135deg, #C0C0C0 0%, #A8A8A8 100%)', // Silver
      3: 'linear-gradient(135deg, #CD7F32 0%, #B8860B 100%)', // Bronze
    };
    return colors[position] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  };

  const getPositionIcon = (position) => {
    const icons = {
      1: '🥇',
      2: '🥈',
      3: '🥉'
    };
    return icons[position] || '🏆';
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern}></div>
      <div style={styles.floatingElements}>
        <div style={styles.floatingElement1}></div>
        <div style={styles.floatingElement2}></div>
        <div style={styles.floatingElement3}></div>
      </div>
      
      <div style={styles.header}>
        <h1 style={styles.title}>
          <span style={styles.titleIcon}>🎯</span>
          Event Participants
        </h1>
        <p style={styles.subtitle}>Track all participants and their positions in the event</p>
      </div>

      {/* Groups Display */}
      <div style={styles.groupsSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.sectionIcon}>📊</span>
            Teams & Participants ({groups.length})
          </h2>
          <div style={styles.statsContainer}>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>{groups.reduce((acc, group) => acc + group.members.length, 0)}</span>
              <span style={styles.statLabel}>Total Members</span>
            </div>
          </div>
        </div>
        
        {groups.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🎯</div>
            <p style={styles.emptyText}>No participants yet</p>
            <p style={styles.emptySubtext}>When admin adds details, they will appear here.</p>
          </div>
        ) : (
          <div style={styles.groupsGrid}>
            {groups.map((group, groupIndex) => (
              <div key={group._id} style={styles.groupCard}>
                <div style={styles.groupHeader}>
                  <div style={styles.groupTitleSection}>
                    <h3 style={styles.groupName}>{group.name}</h3>
                    <span 
                      style={{
                        ...styles.positionBadge,
                        background: getPositionColor(group.position)
                      }}
                    >
                      {getPositionIcon(group.position)} Position {group.position}
                    </span>
                  </div>
                </div>
                
                <div style={styles.membersSection}>
                  <div style={styles.membersHeader}>
                    <h4 style={styles.membersTitle}>
                      Team Members
                    </h4>
                    <span style={styles.memberCount}>
                      {group.members.length}
                    </span>
                  </div>

                  {/* Members List */}
                  <div style={styles.membersList}>
                    {group.members.slice(0, 2).map((member) => (
                      <div key={member._id} style={styles.memberItem}>
                        <div style={styles.memberInfo}>
                          <span style={styles.memberAvatar}>👤</span>
                          <span style={styles.memberName}>{member.name}</span>
                        </div>
                      </div>
                    ))}
                    
                    {group.members.length > 2 && (
                      <div style={styles.dropdownContainer}>
                        <button 
                          style={styles.expandButton}
                          onClick={() => toggleGroupExpansion(group._id)}
                        >
                          <span style={styles.expandButtonText}>
                            {expandedGroups[group._id] ? 'Show less' : `+${group.members.length - 2} more members`}
                          </span>
                          <span style={styles.expandIcon}>
                            {expandedGroups[group._id] ? '▲' : '▼'}
                          </span>
                        </button>
                        
                        {expandedGroups[group._id] && (
                          <div style={styles.expandedMembers}>
                            {group.members.slice(2).map((member) => (
                              <div key={member._id} style={styles.memberItem}>
                                <div style={styles.memberInfo}>
                                  <span style={styles.memberAvatar}>👤</span>
                                  <span style={styles.memberName}>{member.name}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {group.members.length === 6 && (
                    <div style={styles.maxMembersAlert}>
                      <span style={styles.maxMembersIcon}>✅</span>
                      <span style={styles.maxMembersText}>Team is complete (6/6 members)</span>
                    </div>
                  )}
                  
                  {group.members.length < 6 && (
                    <div style={styles.capacityIndicator}>
                      <div style={styles.capacityBar}>
                        <div 
                          style={{
                            ...styles.capacityFill,
                            width: `${(group.members.length / 6) * 100}%`
                          }}
                        ></div>
                      </div>
                      <span style={styles.capacityText}>
                        {6 - group.members.length} spots remaining
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    backgroundColor: '#0f0f23',
    minHeight: '100vh',
    lineHeight: '1.6',
    color: '#ffffff'
  },
  backgroundPattern: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
    zIndex: -2,
    pointerEvents: 'none'
  },
  floatingElements: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    pointerEvents: 'none'
  },
  floatingElement1: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    width: '100px',
    height: '100px',
    background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
    borderRadius: '50%',
    animation: 'float 6s ease-in-out infinite'
  },
  floatingElement2: {
    position: 'absolute',
    top: '60%',
    right: '15%',
    width: '80px',
    height: '80px',
    background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(219, 39, 119, 0.1) 100%)',
    borderRadius: '50%',
    animation: 'float 8s ease-in-out infinite reverse'
  },
  floatingElement3: {
    position: 'absolute',
    bottom: '20%',
    left: '20%',
    width: '120px',
    height: '120px',
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(29, 78, 216, 0.1) 100%)',
    borderRadius: '50%',
    animation: 'float 10s ease-in-out infinite'
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px',
    padding: '30px 0'
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: '900',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: '0 0 15px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    textShadow: '0 4px 8px rgba(0,0,0,0.3)'
  },
  titleIcon: {
    fontSize: '3rem',
    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
  },
  subtitle: {
    fontSize: '1.3rem',
    color: '#94a3b8',
    margin: 0,
    fontWeight: '400',
    opacity: 0.9
  },
  groupsSection: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    padding: '40px',
    borderRadius: '24px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    position: 'relative'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '20px'
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#ffffff',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  sectionIcon: {
    fontSize: '1.8rem',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
  },
  statsContainer: {
    display: 'flex',
    gap: '20px'
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px 25px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)'
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: '1'
  },
  statLabel: {
    fontSize: '0.9rem',
    color: '#94a3b8',
    marginTop: '5px'
  },
  emptyState: {
    textAlign: 'center',
    padding: '80px 20px',
    color: '#94a3b8'
  },
  emptyIcon: {
    fontSize: '5rem',
    marginBottom: '25px',
    opacity: 0.6
  },
  emptyText: {
    fontSize: '1.5rem',
    fontWeight: '600',
    margin: '0 0 10px 0',
    color: '#ffffff'
  },
  emptySubtext: {
    fontSize: '1.1rem',
    margin: '0',
    opacity: 0.7
  },
  groupsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '30px'
  },
  groupCard: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '30px',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: 'blur(20px)',
    cursor: 'pointer'
  },
  groupHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px'
  },
  groupTitleSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    flex: 1,
    flexWrap: 'wrap'
  },
  groupName: {
    fontSize: '1.6rem',
    fontWeight: '700',
    color: '#ffffff',
    margin: '0'
  },
  positionBadge: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '25px',
    fontSize: '14px',
    fontWeight: '600',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  membersSection: {
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    paddingTop: '25px'
  },
  membersHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  membersTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#ffffff',
    margin: '0'
  },
  memberCount: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    padding: '6px 14px',
    borderRadius: '15px',
    fontSize: '13px',
    fontWeight: '600',
    boxShadow: '0 3px 10px rgba(16, 185, 129, 0.3)'
  },
  membersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  memberItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 18px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)'
  },
  memberInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  memberAvatar: {
    fontSize: '1.3rem',
    opacity: 0.8
  },
  memberName: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#ffffff'
  },
  dropdownContainer: {
    marginTop: '10px'
  },
  expandButton: {
    width: '100%',
    padding: '12px 18px',
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    borderRadius: '12px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)'
  },
  expandButtonText: {
    flex: 1,
    textAlign: 'left'
  },
  expandIcon: {
    fontSize: '12px',
    transition: 'transform 0.3s ease'
  },
  expandedMembers: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    animation: 'slideDown 0.3s ease-out'
  },
  maxMembersAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '15px 18px',
    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(21, 128, 61, 0.2) 100%)',
    border: '1px solid rgba(34, 197, 94, 0.3)',
    borderRadius: '12px',
    marginTop: '15px'
  },
  maxMembersIcon: {
    fontSize: '1.2rem'
  },
  maxMembersText: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#ffffff',
    margin: '0'
  },
  capacityIndicator: {
    marginTop: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  capacityBar: {
    flex: 1,
    height: '8px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  capacityFill: {
    height: '100%',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  },
  capacityText: {
    fontSize: '12px',
    color: '#94a3b8',
    fontWeight: '500',
    minWidth: '120px'
  }
};

// Add CSS animations to the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(styleSheet);
}

export default Eventparticipent;