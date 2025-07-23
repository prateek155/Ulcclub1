import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Participent = () => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [positionNumber, setPositionNumber] = useState('');
  const [memberName, setMemberName] = useState('');
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(null);

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

  // Create new group
  const createGroup = async () => {
    if (groupName.trim() && positionNumber.trim()) {
      try {
        const { data } = await axios.post('http://localhost:8080/api/v1/participent/groups', {
          name: groupName,
          position: positionNumber,
        });
        setGroups([...groups, data.group]);
        setGroupName('');
        setPositionNumber('');
      } catch (error) {
        console.error('Failed to create group:', error);
      }
    }
  };

  // Add member to group
  const addMember = async (groupIndex) => {
    const group = groups[groupIndex];
    if (memberName.trim()) {
      try {
        const { data } = await axios.put(`http://localhost:8080/api/v1/participent/groups/${group._id}/members`, {
          name: memberName,
        });
        const updatedGroups = [...groups];
        updatedGroups[groupIndex] = data.group;
        setGroups(updatedGroups);
        setMemberName('');
      } catch (error) {
        console.error('Failed to add member:', error);
      }
    }
  };

  // Remove member
  const removeMember = async (groupIndex, memberId) => {
    const group = groups[groupIndex];
    try {
      const { data } = await axios.delete(`http://localhost:8080/api/v1/participent/groups/${group._id}/members/${memberId}`);
      const updatedGroups = [...groups];
      updatedGroups[groupIndex] = data.group;
      setGroups(updatedGroups);
    } catch (error) {
      console.error('Failed to remove member:', error);
    }
  };

  // Delete group
  const deleteGroup = async (groupIndex) => {
    const group = groups[groupIndex];
    try {
      await axios.delete(`http://localhost:8080/api/v1/participent/groups/${group._id}`);
      const updatedGroups = groups.filter((_, i) => i !== groupIndex);
      setGroups(updatedGroups);
      setSelectedGroupIndex(null);
    } catch (error) {
      console.error('Failed to delete group:', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern}></div>
      
      <div style={styles.header}>
        <h1 style={styles.title}>
          <span style={styles.titleIcon}>👥</span>
          Group Manager
        </h1>
        <p style={styles.subtitle}>Create and manage your teams with ease</p>
      </div>
      
      {/* Group Creation Form */}
      <div style={styles.createGroupSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.sectionIcon}>✨</span>
            Create New Group
          </h2>
        </div>
        <div style={styles.formGroup}>
          <div style={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              style={styles.input}
            />
            <span style={styles.inputIcon}>📝</span>
          </div>
          <div style={styles.inputWrapper}>
            <input
              type="number"
              placeholder="Position number"
              value={positionNumber}
              onChange={(e) => setPositionNumber(e.target.value)}
              style={styles.input}
            />
            <span style={styles.inputIcon}>🔢</span>
          </div>
          <button onClick={createGroup} style={styles.createButton}>
            <span style={styles.buttonIcon}>+</span>
            Create Group
          </button>
        </div>
      </div>

      {/* Groups Display */}
      <div style={styles.groupsSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            <span style={styles.sectionIcon}>📊</span>
            Active Groups ({groups.length})
          </h2>
        </div>
        
        {groups.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🎯</div>
            <p style={styles.emptyText}>No groups created yet</p>
            <p style={styles.emptySubtext}>Start by creating your first group above</p>
          </div>
        ) : (
          <div style={styles.groupsGrid}>
            {groups.map((group, groupIndex) => (
              <div key={group._id} style={styles.groupCard}>
                <div style={styles.groupHeader}>
                  <div style={styles.groupTitleSection}>
                    <h3 style={styles.groupName}>{group.name}</h3>
                    <span style={styles.positionBadge}>Position:{group.position}</span>
                  </div>
                  <button 
                    onClick={() => deleteGroup(groupIndex)}
                    style={styles.deleteButton}
                  >
                    ×
                  </button>
                </div>
                
                <div style={styles.membersSection}>
                  <div style={styles.membersHeader}>
                    <h4 style={styles.membersTitle}>
                      Team Members
                    </h4>
                    <span style={styles.memberCount}>
                      {group.members.length}/6
                    </span>
                  </div>

                  {/* Add Member Form */}
                  {group.members.length < 6 && (
                    <div style={styles.addMemberForm}>
                      <div style={styles.memberInputWrapper}>
                        <input
                          type="text"
                          placeholder="Add member name"
                          value={selectedGroupIndex === groupIndex ? memberName : ''}
                          onChange={(e) => {
                            setMemberName(e.target.value);
                            setSelectedGroupIndex(groupIndex);
                          }}
                          style={styles.memberInput}
                        />
                        <span style={styles.memberInputIcon}>👤</span>
                      </div>
                      <button
                        onClick={() => addMember(groupIndex)}
                        style={styles.addButton}
                      >
                        Add
                      </button>
                    </div>
                  )}

                  {/* Members List */}
                  <div style={styles.membersList}>
                    {group.members.map((member) => (
                      <div key={member._id} style={styles.memberItem}>
                        <div style={styles.memberInfo}>
                          <span style={styles.memberAvatar}>👤</span>
                          <span style={styles.memberName}>{member.name}</span>
                        </div>
                        <button
                          onClick={() => removeMember(groupIndex, member._id)}
                          style={styles.removeMemberButton}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>

                  {group.members.length === 6 && (
                    <div style={styles.maxMembersAlert}>
                      <span style={styles.maxMembersIcon}>⚠️</span>
                      <span style={styles.maxMembersText}>Team is full (6/6 members)</span>
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
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    lineHeight: '1.6'
  },
  backgroundPattern: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    opacity: 0.03,
    zIndex: -1,
    pointerEvents: 'none'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    padding: '20px 0'
  },
  title: {
    fontSize: '3rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: '0 0 10px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px'
  },
  titleIcon: {
    fontSize: '2.5rem',
    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#64748b',
    margin: 0,
    fontWeight: '400'
  },
  createGroupSection: {
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    padding: '32px',
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    marginBottom: '40px',
    border: '1px solid rgba(255,255,255,0.8)',
    backdropFilter: 'blur(10px)',
    position: 'relative',
    overflow: 'hidden'
  },
  sectionHeader: {
    marginBottom: '25px'
  },
  sectionTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  sectionIcon: {
    fontSize: '1.5rem',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
  },
  formGroup: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    alignItems: 'flex-end'
  },
  inputWrapper: {
    position: 'relative',
    flex: '1',
    minWidth: '250px'
  },
  input: {
    width: '100%',
    padding: '16px 50px 16px 16px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.3s ease',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    fontWeight: '500'
  },
  inputIcon: {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '1.2rem',
    opacity: 0.6
  },
  createButton: {
    padding: '16px 32px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    minWidth: '150px',
    justifyContent: 'center'
  },
  buttonIcon: {
    fontSize: '1.2rem',
    fontWeight: 'bold'
  },
  groupsSection: {
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    padding: '32px',
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    border: '1px solid rgba(255,255,255,0.8)',
    backdropFilter: 'blur(10px)'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#64748b'
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '20px',
    opacity: 0.7
  },
  emptyText: {
    fontSize: '1.3rem',
    fontWeight: '600',
    margin: '0 0 8px 0',
    color: '#475569'
  },
  emptySubtext: {
    fontSize: '1rem',
    margin: '0',
    opacity: 0.8
  },
  groupsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
    gap: '24px'
  },
  groupCard: {
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    padding: '24px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    position: 'relative',
    overflow: 'hidden'
  },
  groupHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  groupTitleSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1
  },
  groupName: {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0'
  },
  positionBadge: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    width: '36px',
    height: '36px',
    fontSize: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
    fontWeight: 'bold'
  },
  membersSection: {
    borderTop: '1px solid #e2e8f0',
    paddingTop: '20px'
  },
  membersHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  membersTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#374151',
    margin: '0'
  },
  memberCount: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '600'
  },
  addMemberForm: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px'
  },
  memberInputWrapper: {
    position: 'relative',
    flex: '1'
  },
  memberInput: {
    width: '100%',
    padding: '12px 40px 12px 12px',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.3s ease',
    backgroundColor: '#ffffff'
  },
  memberInputIcon: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '1rem',
    opacity: 0.6
  },
  addButton: {
    padding: '12px 20px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
    minWidth: '70px'
  },
  membersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  memberItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: '#f8fafc',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease'
  },
  memberInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  memberAvatar: {
    fontSize: '1.2rem',
    opacity: 0.7
  },
  memberName: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#374151'
  },
  removeMemberButton: {
    padding: '6px 12px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)'
  },
  maxMembersAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: '#fef3c7',
    border: '1px solid #fbbf24',
    borderRadius: '10px',
    marginTop: '12px'
  },
  maxMembersIcon: {
    fontSize: '1.1rem'
  },
  maxMembersText: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#92400e',
    margin: '0'
  }
};

// Add hover effects and focus states
const originalStyles = styles;

// Enhanced hover effects
styles.createButton = {
  ...originalStyles.createButton,
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.5)'
  }
};

styles.input = {
  ...originalStyles.input,
  ':focus': {
    borderColor: '#667eea',
    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
  }
};

styles.groupCard = {
  ...originalStyles.groupCard,
  ':hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.12)'
  }
};

export default Participent;