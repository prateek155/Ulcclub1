import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const [registrationType, setRegistrationType] = useState('individual');
  const [formData, setFormData] = useState({
    name: '',
    email: ''.
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
              leaderphone:formData.leaderphone,
              members: formData.members,
              registrationDate: new Date().toISOString()
            };

      const res = await axios.post('https://ulcclub1.onrender.com/api/v1/registration/register', registrationData);

      if (res.data.success) {
        setMessage('Registration successful! You will receive a confirmation email shortly.');
        setFormData({
          name: '',
          department: '',
          phone: '',
          groupName: '',
          leadername: '',
          leaderphone:'',
          members: [{ name: '', department: '', phone: '' }]
        });
      } else {
        setMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Event Registration</h1>
        <p style={styles.subtitle}>Join our amazing events and connect with like-minded individuals</p>
      </div>

      <div style={styles.registrationCard}>
        <div style={styles.typeSelector}>
          <button
            style={{
              ...styles.typeButton,
              ...(registrationType === 'individual' ? styles.activeButton : {})
            }}
            onClick={() => setRegistrationType('individual')}
          >
            Individual Registration
          </button>
          <button
            style={{
              ...styles.typeButton,
              ...(registrationType === 'group' ? styles.activeButton : {})
            }}
            onClick={() => setRegistrationType('group')}
          >
            Group Registration
          </button>
        </div>

        <div style={styles.form}>
          {registrationType === 'individual' ? (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Personal Information</h3>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                  <label style={styles.label}>Email *</label>
                  <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                   style={styles.input}
                    required
                    />
               </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>
          ) : (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Group Information</h3>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Group Name *</label>
                <input
                  type="text"
                  name="groupName"
                  value={formData.groupName}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Leader Name *</label>
                <input
                  type="text"
                  name="leadername"
                  value={formData.leadername}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
              </div>
               <div style={styles.inputGroup}>
                        <label style={styles.label}>Leader Email *</label>
                       <input
                        type="email"
                        name="leaderemail"
                        value={formData.leaderemail}
                         onChange={handleInputChange}
                        style={styles.input}
                          required
                           />
                    </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Leader Phone Number *</label>
                <input
                  type="tel"
                  name="leaderphone"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  value={formData.leaderphone}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
              </div>

              <h4 style={styles.subSectionTitle}>Group Members</h4>
              {formData.members.map((member, index) => (
                <div key={index} style={styles.memberCard}>
                  <div style={styles.memberHeader}>
                    <span style={styles.memberNumber}>Member {index + 1}</span>
                    {formData.members.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMember(index)}
                        style={styles.removeButton}
                      >
                        ×
                      </button>
                    )}
                  </div>
                  <div style={styles.memberInputs}>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={member.name}
                      onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                      style={styles.memberInput}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Department"
                      value={member.department}
                      onChange={(e) => handleMemberChange(index, 'department', e.target.value)}
                      style={styles.memberInput}
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      pattern="[0-9]{10}"
                      maxLength="10"
                      value={member.phone}
                      onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                      style={styles.memberInput}
                      required
                    />
                  </div>
                </div>
              ))}

              {formData.members.length < 5 && (
                <button
                  type="button"
                  onClick={addMember}
                  style={styles.addMemberButton}
                >
                  + Add Member
                </button>
              )}
            </div>
          )}

          {message && (
            <div style={{
              ...styles.message,
              ...(message.includes('successful') ? styles.successMessage : styles.errorMessage)
            }}>
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
            {loading ? 'Processing...' : 'Complete Registration'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    color: 'white'
  },
  title: {
    fontSize: '3rem',
    fontWeight: '700',
    margin: '0 0 16px 0',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
  },
  subtitle: {
    fontSize: '1.2rem',
    fontWeight: '300',
    opacity: '0.9',
    margin: '0'
  },
  registrationCard: {
    maxWidth: '800px',
    margin: '0 auto',
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    overflow: 'hidden'
  },
  typeSelector: {
    display: 'flex',
    background: '#f8f9fa'
  },
  typeButton: {
    flex: 1,
    padding: '20px',
    border: 'none',
    background: 'transparent',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: '#6c757d'
  },
  activeButton: {
    background: 'white',
    color: '#667eea',
    borderBottom: '3px solid #667eea'
  },
  form: {
    padding: '40px'
  },
  section: {
    marginBottom: '32px'
  },
  sectionTitle: {
    fontSize: '1.4rem',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '24px',
    borderBottom: '2px solid #e9ecef',
    paddingBottom: '8px'
  },
  subSectionTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#495057',
    marginBottom: '16px',
    marginTop: '24px'
  },
  inputGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#495057',
    marginBottom: '8px'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '1rem',
    border: '2px solid #e9ecef',
    borderRadius: '8px',
    transition: 'border-color 0.3s ease',
    outline: 'none',
    boxSizing: 'border-box'
  },
  memberCard: {
    background: '#f8f9fa',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '16px',
    border: '1px solid #e9ecef'
  },
  memberHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  memberNumber: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#667eea'
  },
  removeButton: {
    background: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '28px',
    height: '28px',
    cursor: 'pointer',
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease'
  },
  memberInputs: {
    display: 'grid',
    gap: '12px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
  },
  memberInput: {
    padding: '10px 12px',
    fontSize: '0.9rem',
    border: '1px solid #dee2e6',
    borderRadius: '6px',
    transition: 'border-color 0.3s ease',
    outline: 'none'
  },
  addMemberButton: {
    background: 'linear-gradient(45deg, #28a745, #20c997)',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'block',
    margin: '16px auto 0'
  },
  submitButton: {
    width: '100%',
    padding: '16px',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'white',
    background: 'linear-gradient(45deg, #667eea, #764ba2)',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
  },
  submitButtonDisabled: {
    opacity: '0.6',
    cursor: 'not-allowed'
  },
  message: {
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: '500'
  },
  successMessage: {
    background: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb'
  },
  errorMessage: {
    background: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb'
  }
};

export default Registration;
