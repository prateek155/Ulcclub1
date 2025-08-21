import React, { useState } from 'react';

const Registration = () => {
  const [registrationType, setRegistrationType] = useState('individual');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    phone: '',
    groupName: '',
    leadername: '',
    leaderemail:'',
    leaderphone:'',
    members: [{ name: '', department: '', phone: '' }]
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...formData.members];
    updatedMembers[index][field] = value;
    setFormData(prev => ({
      ...prev,
      members: updatedMembers
    }));
  };

  const addMember = () => {
    if (formData.members.length < 10) {
      setFormData(prev => ({
        ...prev,
        members: [...prev.members, { name: '', department: '', phone: '' }]
      }));
    }
  };

  const removeMember = (index) => {
    if (formData.members.length > 1) {
      const updatedMembers = formData.members.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        members: updatedMembers
      }));
    }
  };

  const submitRegistration = async () => {
    setLoading(true);
    setMessage('');

    try {
      const registrationData =
        registrationType === "individual"
          ? {
              type: "individual",
              name: formData.name,
              email: formData.email, 
              department: formData.department,
              phone: formData.phone,
              registrationDate: new Date().toISOString()
            }
          : {
              type: "group",
              groupName: formData.groupName,
              leadername: formData.leadername,
              leaderemail: formData.leaderemail,
              leaderphone: formData.leaderphone,
              members: formData.members,
              registrationDate: new Date().toISOString()
            };

      const response = await fetch('https://ulcclub1.onrender.com/api/v1/registration/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage('Registration successful! Neural network processing complete. Confirmation email dispatched.');
        setFormData({
          name: '',
          email:'',
          department: '',
          phone: '',
          groupName: '',
          leadername: '',
          leaderemail:'',
          leaderphone:'',
          members: [{ name: '', department: '', phone: '' }]
        });
      } else {
        setMessage('Neural network registration failed. Please recalibrate and try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage('Connection to AI mainframe lost. Please check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Animated background elements */}
      <div style={styles.backgroundPattern}></div>
      <div style={styles.floatingOrbs}>
        <div style={{...styles.orb, ...styles.orb1}}></div>
        <div style={{...styles.orb, ...styles.orb2}}></div>
        <div style={{...styles.orb, ...styles.orb3}}></div>
      </div>

      <div style={styles.header}>
        <div style={styles.aiIcon}>🤖</div>
        <h1 style={styles.title}>
          AI Event Registration
          <span style={styles.glitch}>AI Event Registration</span>
        </h1>
        <p style={styles.subtitle}>
          Neural network powered event management system
        </p>
        <div style={styles.scanLine}></div>
      </div>

      <div style={styles.registrationCard}>
        <div style={styles.cardGlow}></div>
        
        <div style={styles.typeSelector}>
          <button
            style={{
              ...styles.typeButton,
              ...(registrationType === 'individual' ? styles.activeButton : {})
            }}
            onClick={() => setRegistrationType('individual')}
          >
            <span style={styles.buttonIcon}>👤</span>
            Individual Registration
          </button>
          <button
            style={{
              ...styles.typeButton,
              ...(registrationType === 'group' ? styles.activeButton : {})
            }}
            onClick={() => setRegistrationType('group')}
          >
            <span style={styles.buttonIcon}>👥</span>
            Group Registration
          </button>
        </div>

        <div style={styles.form}>
          {registrationType === 'individual' ? (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <span style={styles.sectionIcon}>📊</span>
                Personal Data Matrix
              </h3>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>🔹</span>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={styles.input}
                  className="ai-input"
                  placeholder="Enter your neural identifier..."
                  required
                />
                <div style={styles.inputGlow} className="input-glow"></div>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>📧</span>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={styles.input}
                  className="ai-input"
                  placeholder="your.email@domain.ai"
                  required
                />
                <div style={styles.inputGlow} className="input-glow"></div>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>🏢</span>
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  style={styles.input}
                  className="ai-input"
                  placeholder="AI Division/Department"
                  required
                />
                <div style={styles.inputGlow} className="input-glow"></div>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>📱</span>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={styles.input}
                  className="ai-input"
                  placeholder="10-digit neural link"
                  required
                />
                <div style={styles.inputGlow} className="input-glow"></div>
              </div>
            </div>
          ) : (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <span style={styles.sectionIcon}>🔗</span>
                Group Neural Network
              </h3>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>🏷️</span>
                  Group Name *
                </label>
                <input
                  type="text"
                  name="groupName"
                  value={formData.groupName}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="AI Collective Name"
                  required
                />
                <div style={styles.inputGlow}></div>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>👑</span>
                  Leader Name *
                </label>
                <input
                  type="text"
                  name="leadername"
                  value={formData.leadername}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Primary Node Identifier"
                  required
                />
                <div style={styles.inputGlow}></div>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>📧</span>
                  Leader Email *
                </label>
                <input
                  type="email"
                  name="leaderemail"
                  value={formData.leaderemail}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="leader@neural.net"
                  required
                />
                <div style={styles.inputGlow}></div>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>📱</span>
                  Leader Phone Number *
                </label>
                <input
                  type="tel"
                  name="leaderphone"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  value={formData.leaderphone}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Primary contact link"
                  required
                />
                <div style={styles.inputGlow}></div>
              </div>

              <h4 style={styles.subSectionTitle}>
                <span style={styles.sectionIcon}>🔗</span>
                Network Nodes
              </h4>
              {formData.members.map((member, index) => (
                <div key={index} style={styles.memberCard}>
                  <div style={styles.memberHeader}>
                    <span style={styles.memberNumber}>
                      <span style={styles.nodeIcon}>⚡</span>
                      Node {index + 1}
                    </span>
                    {formData.members.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMember(index)}
                        style={styles.removeButton}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <div style={styles.memberInputs}>
                    <div style={styles.memberInputGroup}>
                      <input
                        type="text"
                        placeholder="Neural Name"
                        value={member.name}
                        onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                        style={styles.memberInput}
                        required
                      />
                      <div style={styles.memberInputGlow}></div>
                    </div>
                    <div style={styles.memberInputGroup}>
                      <input
                        type="text"
                        placeholder="Department/Division"
                        value={member.department}
                        onChange={(e) => handleMemberChange(index, 'department', e.target.value)}
                        style={styles.memberInput}
                        required
                      />
                      <div style={styles.memberInputGlow}></div>
                    </div>
                    <div style={styles.memberInputGroup}>
                      <input
                        type="tel"
                        placeholder="Contact Link"
                        pattern="[0-9]{10}"
                        maxLength="10"
                        value={member.phone}
                        onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                        style={styles.memberInput}
                        required
                      />
                      <div style={styles.memberInputGlow}></div>
                    </div>
                  </div>
                </div>
              ))}

              {formData.members.length < 5 && (
                <button
                  type="button"
                  onClick={addMember}
                  style={styles.addMemberButton}
                >
                  <span style={styles.addIcon}>+</span>
                  Add Neural Node
                </button>
              )}
            </div>
          )}

          {message && (
            <div style={{
              ...styles.message,
              ...(message.includes('successful') ? styles.successMessage : styles.errorMessage)
            }}>
              <div style={styles.messageIcon}>
                {message.includes('successful') ? '✓' : '⚠'}
              </div>
              {message}
            </div>
          )}

          <button
            type="button"
            onClick={submitRegistration}
            disabled={loading}
            style={{
              ...styles.submitButton,
              ...(loading ? styles.submitButtonDisabled : {})
            }}
          >
            <div style={styles.submitIcon}>
              {loading ? '🔄' : '🚀'}
            </div>
            {loading ? 'Processing Neural Data...' : 'Initialize Registration Protocol'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0c0c1e 0%, #1a1a2e 25%, #16213e 50%, #0f3460 100%)',
    padding: '20px',
    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
    position: 'relative',
    overflow: 'hidden'
  },
  backgroundPattern: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      radial-gradient(circle at 25% 25%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
      linear-gradient(45deg, transparent 40%, rgba(0, 255, 255, 0.02) 50%, transparent 60%)
    `,
    animation: 'float 10s ease-in-out infinite',
    zIndex: -2
  },
  floatingOrbs: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1
  },
  orb: {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(1px)',
    animation: 'float 8s ease-in-out infinite'
  },
  orb1: {
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(0, 255, 255, 0.2) 0%, transparent 70%)',
    top: '10%',
    left: '80%',
    animationDelay: '0s'
  },
  orb2: {
    width: '150px',
    height: '150px',
    background: 'radial-gradient(circle, rgba(255, 0, 255, 0.2) 0%, transparent 70%)',
    bottom: '20%',
    left: '10%',
    animationDelay: '2s'
  },
  orb3: {
    width: '100px',
    height: '100px',
    background: 'radial-gradient(circle, rgba(0, 255, 128, 0.2) 0%, transparent 70%)',
    top: '60%',
    right: '20%',
    animationDelay: '4s'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    color: 'white',
    position: 'relative'
  },
  aiIcon: {
    fontSize: '4rem',
    marginBottom: '20px',
    filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.7))',
    animation: 'pulse 2s ease-in-out infinite'
  },
  title: {
    fontSize: '3rem',
    fontWeight: '700',
    margin: '0 0 16px 0',
    background: 'linear-gradient(45deg, #00ffff, #ff00ff, #00ff80)',
    backgroundSize: '200% 200%',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'gradientShift 3s ease infinite, glow 2s ease-in-out infinite',
    position: 'relative'
  },
  glitch: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    opacity: 0,
    animation: 'glitch 4s infinite'
  },
  subtitle: {
    fontSize: '1.2rem',
    fontWeight: '300',
    color: 'rgba(0, 255, 255, 0.8)',
    margin: '0',
    letterSpacing: '2px'
  },
  scanLine: {
    width: '100%',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
    margin: '20px 0',
    animation: 'scan 2s linear infinite'
  },
  registrationCard: {
    maxWidth: '800px',
    margin: '0 auto',
    background: 'rgba(26, 26, 46, 0.7)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(0, 255, 255, 0.3)',
    borderRadius: '20px',
    boxShadow: `
      0 20px 40px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.1),
      0 0 60px rgba(0, 255, 255, 0.2)
    `,
    position: 'relative',
    overflow: 'hidden'
  },
  cardGlow: {
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    right: '-2px',
    bottom: '-2px',
    background: 'linear-gradient(45deg, #00ffff, #ff00ff, #00ff80, #00ffff)',
    backgroundSize: '400% 400%',
    borderRadius: '22px',
    zIndex: -1,
    animation: 'gradientShift 4s ease infinite'
  },
  typeSelector: {
    display: 'flex',
    background: 'rgba(15, 15, 30, 0.8)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(0, 255, 255, 0.2)'
  },
  typeButton: {
    flex: 1,
    padding: '20px',
    border: 'none',
    background: 'transparent',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: 'rgba(0, 255, 255, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontFamily: 'inherit',
    position: 'relative'
  },
  buttonIcon: {
    fontSize: '1.2rem',
    filter: 'drop-shadow(0 0 10px currentColor)'
  },
  activeButton: {
    background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 255, 0.1))',
    color: '#00ffff',
    boxShadow: 'inset 0 0 20px rgba(0, 255, 255, 0.2)',
    borderBottom: '3px solid #00ffff'
  },
  form: {
    padding: '40px'
  },
  section: {
    marginBottom: '40px'
  },
  sectionTitle: {
    fontSize: '1.4rem',
    fontWeight: '600',
    color: '#00ffff',
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    borderBottom: '1px solid rgba(0, 255, 255, 0.3)',
    paddingBottom: '10px'
  },
  sectionIcon: {
    fontSize: '1.5rem',
    filter: 'drop-shadow(0 0 10px currentColor)'
  },
  subSectionTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'rgba(0, 255, 255, 0.9)',
    marginBottom: '20px',
    marginTop: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  inputGroup: {
    marginBottom: '25px',
    position: 'relative'
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: 'rgba(0, 255, 255, 0.9)',
    marginBottom: '10px'
  },
  labelIcon: {
    fontSize: '1rem',
    filter: 'drop-shadow(0 0 5px currentColor)'
  },
  input: {
    width: '100%',
    padding: '15px 20px',
    fontSize: '1rem',
    background: 'rgba(15, 15, 30, 0.8)',
    border: '1px solid rgba(0, 255, 255, 0.3)',
    borderRadius: '10px',
    color: '#ffffff',
    transition: 'all 0.3s ease',
    outline: 'none',
    boxSizing: 'border-box',
    backdropFilter: 'blur(5px)',
    position: 'relative',
    zIndex: 1
  },
  inputGlow: {
    position: 'absolute',
    top: '32px',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent)',
    borderRadius: '10px',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none'
  },
  memberCard: {
    background: 'rgba(15, 15, 30, 0.6)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    padding: '25px',
    marginBottom: '20px',
    border: '1px solid rgba(0, 255, 255, 0.2)',
    position: 'relative',
    overflow: 'hidden'
  },
  memberHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  memberNumber: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#00ffff',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  nodeIcon: {
    animation: 'pulse 1.5s ease-in-out infinite'
  },
  removeButton: {
    background: 'linear-gradient(45deg, #ff0040, #ff4080)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    cursor: 'pointer',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(255, 0, 64, 0.4)'
  },
  memberInputs: {
    display: 'grid',
    gap: '15px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
  },
  memberInputGroup: {
    position: 'relative'
  },
  memberInput: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '0.9rem',
    background: 'rgba(10, 10, 25, 0.8)',
    border: '1px solid rgba(0, 255, 255, 0.2)',
    borderRadius: '8px',
    color: '#ffffff',
    transition: 'all 0.3s ease',
    outline: 'none',
    boxSizing: 'border-box'
  },
  memberInputGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.1), transparent)',
    borderRadius: '8px',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none'
  },
  addMemberButton: {
    background: 'linear-gradient(45deg, rgba(0, 255, 128, 0.8), rgba(0, 255, 255, 0.6))',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: '20px auto 0',
    boxShadow: '0 6px 20px rgba(0, 255, 128, 0.3)',
    backdropFilter: 'blur(5px)'
  },
  addIcon: {
    fontSize: '1.2rem',
    fontWeight: 'bold'
  },
  submitButton: {
    width: '100%',
    padding: '20px',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'white',
    background: 'linear-gradient(45deg, #00ffff, #ff00ff, #00ff80)',
    backgroundSize: '200% 200%',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 25px rgba(0, 255, 255, 0.4)',
    animation: 'gradientShift 3s ease infinite',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    fontFamily: 'inherit',
    position: 'relative',
    overflow: 'hidden'
  },
  submitButtonDisabled: {
    opacity: '0.6',
    cursor: 'not-allowed',
    animation: 'pulse 1s ease-in-out infinite'
  },
  submitIcon: {
    fontSize: '1.3rem',
    animation: 'spin 2s linear infinite'
  },
  message: {
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '25px',
    textAlign: 'center',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    backdropFilter: 'blur(10px)'
  },
  messageIcon: {
    fontSize: '1.2rem'
  },
  successMessage: {
    background: 'rgba(0, 255, 128, 0.2)',
    color: '#00ff80',
    border: '1px solid rgba(0, 255, 128, 0.5)',
    boxShadow: '0 0 20px rgba(0, 255, 128, 0.3)'
  },
  errorMessage: {
    background: 'rgba(255, 0, 64, 0.2)',
    color: '#ff4080',
    border: '1px solid rgba(255, 0, 64, 0.5)',
    boxShadow: '0 0 20px rgba(255, 0, 64, 0.3)'
  },

  // CSS Animations
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-20px)' }
  },
  '@keyframes pulse': {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.7 }
  },
  '@keyframes gradientShift': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' }
  },
  '@keyframes glow': {
    '0%, 100%': { textShadow: '0 0 20px rgba(0, 255, 255, 0.5)' },
    '50%': { textShadow: '0 0 30px rgba(0, 255, 255, 0.8)' }
  },
  '@keyframes glitch': {
    '0%': { opacity: 0 },
    '98%': { opacity: 0 },
    '99%': { opacity: 1, transform: 'translateX(-50%) skew(2deg)' },
    '100%': { opacity: 0 }
  },
  '@keyframes scan': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' }
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  }
};

// Add hover effects using CSS-in-JS
const hoverStyles = `
  <style>
    .ai-input:focus + .input-glow {
      opacity: 1 !important;
    }
    
    .ai-member-input:focus + .member-input-glow {
      opacity: 1 !important;
    }
    
    .ai-input:focus {
      border-color: #00ffff !important;
      box-shadow: 0 0 20px rgba(0, 255, 255, 0.4) !important;
    }
    
    .ai-member-input:focus {
      border-color: #00ffff !important;
      box-shadow: 0 0 15px rgba(0, 255, 255, 0.3) !important;
    }
    
    .type-button:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 10px 25px rgba(0, 255, 255, 0.2) !important;
    }
    
    .add-member-button:hover {
      transform: translateY(-3px) !important;
      box-shadow: 0 10px 30px rgba(0, 255, 128, 0.5) !important;
    }
    
    .submit-button:hover:not(:disabled) {
      transform: translateY(-2px) !important;
      box-shadow: 0 12px 35px rgba(0, 255, 255, 0.6) !important;
    }
    
    .remove-button:hover {
      transform: scale(1.1) !important;
      box-shadow: 0 6px 15px rgba(255, 0, 64, 0.6) !important;
    }
    
    .member-card:hover {
      border-color: rgba(0, 255, 255, 0.4) !important;
      box-shadow: 0 10px 30px rgba(0, 255, 255, 0.1) !important;
    }
  </style>
`;

// Inject hover styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = hoverStyles.replace('<style>', '').replace('</style>', '');
  document.head.appendChild(styleElement);
}

export default Registration;
