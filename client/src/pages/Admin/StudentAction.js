import React, { useState, useRef, useEffect } from 'react';

const StudentManagementApp = () => {
  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState({
    _id: null,
    name: '',
    class: '',
    photo: null,
    complaints: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [newComplaint, setNewComplaint] = useState('');
  const [editingComplaintIndex, setEditingComplaintIndex] = useState(-1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Fetch all students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  // API calls
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://ulcclub1.onrender.com/api/v1/student/all`);
      const data = await response.json();
      
      if (data.success) {
        setStudents(data.data);
      } else {
        setError(data.message || 'Failed to fetch students');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const createStudent = async (studentData) => {
    try {
      setLoading(true);
      const response = await fetch(`https://ulcclub1.onrender.com/api/v1/student/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStudents(prev => [...prev, data.data]);
        setSuccess('🎉 Student created successfully!');
        resetForm();
      } else {
        setError(data.message || 'Failed to create student');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateStudent = async (id, studentData) => {
    try {
      setLoading(true);
      const response = await fetch(`https://ulcclub1.onrender.com/api/v1/student/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStudents(prev => 
          prev.map(student => 
            student._id === id ? data.data : student
          )
        );
        setSuccess('✨ Student updated successfully!');
        resetForm();
      } else {
        setError(data.message || 'Failed to update student');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deleteStudentAPI = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`https://ulcclub1.onrender.com/api/v1/student/${id}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStudents(prev => prev.filter(student => student._id !== id));
        setSuccess('🗑️ Student deleted successfully!');
      } else {
        setError(data.message || 'Failed to delete student');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setStudentToDelete(null);
    }
  };

  const addComplaintAPI = async (studentId, complaintText) => {
    try {
      setLoading(true);
      const response = await fetch(`https://ulcclub1.onrender.com/api/v1/student/${studentId}/complaints`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: complaintText })
      });
      
      const data = await response.json();
      
      if (data.success) {
        if (currentStudent._id === studentId) {
          setCurrentStudent(data.data);
        }
        setStudents(prev => 
          prev.map(student => 
            student._id === studentId ? data.data : student
          )
        );
        setSuccess('📝 Complaint added successfully!');
        setNewComplaint('');
        return true;
      } else {
        setError(data.message || 'Failed to add complaint');
        return false;
      }
    } catch (err) {
      setError('Network error. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Clear messages after 4 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const resetForm = () => {
    setCurrentStudent({
      _id: null,
      name: '',
      class: '',
      photo: null,
      complaints: []
    });
    setNewComplaint('');
    setIsEditing(false);
    setEditingComplaintIndex(-1);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setShowCamera(true);
    } catch (error) {
      setError('📷 Camera access denied or not available');
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const photoDataUrl = canvas.toDataURL('image/jpeg');
    setCurrentStudent(prev => ({ ...prev, photo: photoDataUrl }));
    setSuccess('📸 Photo captured successfully!');
    stopCamera();
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCurrentStudent(prev => ({ ...prev, photo: e.target.result }));
        setSuccess('📁 Photo uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const addComplaint = async () => {
    if (newComplaint.trim()) {
      if (currentStudent._id && isEditing) {
        await addComplaintAPI(currentStudent._id, newComplaint.trim());
      } else {
        setCurrentStudent(prev => ({
          ...prev,
          complaints: [...prev.complaints, { text: newComplaint.trim() }]
        }));
        setNewComplaint('');
        setSuccess('📝 Complaint added to form!');
      }
    }
  };

  const updateComplaint = (index, newText) => {
    setCurrentStudent(prev => ({
      ...prev,
      complaints: prev.complaints.map((complaint, i) => 
        i === index ? { text: newText.trim() } : complaint
      )
    }));
  };

  const removeComplaint = (index) => {
    setCurrentStudent(prev => ({
      ...prev,
      complaints: prev.complaints.filter((_, i) => i !== index)
    }));
    setSuccess('🗑️ Complaint removed from form!');
  };

  const saveStudent = async () => {
    if (!currentStudent.name.trim() || !currentStudent.class.trim()) {
      setError('⚠️ Please fill in name and class');
      return;
    }

    const studentData = {
      name: currentStudent.name,
      class: currentStudent.class,
      photo: currentStudent.photo,
      complaints: currentStudent.complaints.map(c => typeof c === 'string' ? c : c.text)
    };

    if (isEditing) {
      await updateStudent(currentStudent._id, studentData);
    } else {
      await createStudent(studentData);
    }
  };

  const editStudent = (student) => {
    setCurrentStudent({
      ...student,
      complaints: student.complaints.map(c => typeof c === 'string' ? { text: c } : c) || []
    });
    setIsEditing(true);
    setSuccess('✏️ Student loaded for editing!');
  };

  const confirmDelete = (student) => {
    setStudentToDelete(student);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (studentToDelete) {
      await deleteStudentAPI(studentToDelete._id);
    }
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.6;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
        }

        .app-container {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          padding: 2rem;
          position: relative;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .header {
          text-align: center;
          color: white;
          margin-bottom: 3rem;
          position: relative;
        }

        .header::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          border-radius: 50%;
          z-index: 0;
        }

        .header h1 {
          font-size: 3rem;
          margin-bottom: 0.5rem;
          text-shadow: 2px 4px 8px rgba(0, 0, 0, 0.3);
          font-weight: 700;
          position: relative;
          z-index: 1;
          background: linear-gradient(45deg, #fff, #f0f0f0);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .header p {
          font-size: 1.2rem;
          opacity: 0.9;
          font-weight: 300;
          position: relative;
          z-index: 1;
        }

        .notification {
          position: fixed;
          top: 2rem;
          right: 2rem;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          font-weight: 500;
          animation: slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          z-index: 1000;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          max-width: 400px;
        }

        .notification-error {
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.9) 0%, rgba(220, 38, 38, 0.9) 100%);
          color: white;
        }

        .notification-success {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.9) 0%, rgba(22, 163, 74, 0.9) 100%);
          color: white;
        }

        .notification-icon {
          margin-right: 0.75rem;
          font-size: 1.2rem;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          backdrop-filter: blur(5px);
        }

        .loading-content {
          background: white;
          padding: 3rem;
          border-radius: 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        .small-spinner {
          width: 20px;
          height: 20px;
          border-width: 2px;
          margin-right: 0.5rem;
          margin-bottom: 0;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        @media (max-width: 1024px) {
          .main-grid {
            grid-template-columns: 1fr;
          }
          
          .header h1 {
            font-size: 2.5rem;
          }
          
          .app-container {
            padding: 1rem;
          }
        }

        .card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.15);
        }

        .card-header {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d3748;
          position: relative;
        }

        .card-header::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 2px;
        }

        .card-icon {
          margin-right: 0.75rem;
          font-size: 1.5rem;
        }

        .photo-section {
          text-align: center;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
          border-radius: 16px;
          border: 1px solid rgba(102, 126, 234, 0.1);
        }

        .photo-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .photo-preview {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #667eea;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease;
        }

        .photo-preview:hover {
          transform: scale(1.05);
        }

        .photo-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-family: inherit;
          position: relative;
          overflow: hidden;
        }

        .btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .btn:hover::before {
          left: 100%;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .btn:active {
          transform: translateY(0);
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-success {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
          color: white;
        }

        .btn-warning {
          background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
          color: white;
        }

        .btn-danger {
          background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
          color: white;
        }

        .btn-secondary {
          background: linear-gradient(135deg, #a0aec0 0%, #718096 100%);
          color: white;
        }

        .btn-small {
          padding: 0.5rem 1rem;
          font-size: 0.8rem;
        }

        .btn-full {
          width: 100%;
        }

        .btn-icon {
          margin-right: 0.5rem;
        }

        .form-section {
          margin-bottom: 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .form-input {
          width: 100%;
          padding: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          font-family: inherit;
          background: rgba(255, 255, 255, 0.8);
        }

        .form-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          background: white;
        }

        .form-input:disabled {
          background-color: #f7fafc;
          opacity: 0.6;
        }

        .complaints-section {
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: rgba(247, 250, 252, 0.8);
          border-radius: 16px;
          border: 1px solid #e2e8f0;
        }

        .complaints-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .complaint-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
          background: white;
          border-radius: 12px;
          border: 2px solid #e2e8f0;
          transition: all 0.3s ease;
        }

        .complaint-item:hover {
          border-color: #667eea;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .complaint-number {
          font-weight: 700;
          color: #667eea;
          background: rgba(102, 126, 234, 0.1);
          padding: 0.25rem 0.5rem;
          border-radius: 8px;
          min-width: 40px;
          text-align: center;
        }

        .complaint-content {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
        }

        .complaint-edit {
          flex: 1;
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .complaint-text {
          color: #2d3748;
          flex: 1;
          line-height: 1.5;
        }

        .complaint-actions {
          display: flex;
          gap: 0.5rem;
        }

        .add-complaint {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .add-complaint input {
          flex: 1;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .students-list {
          max-height: 600px;
          overflow-y: auto;
          padding-right: 0.5rem;
        }

        .students-list::-webkit-scrollbar {
          width: 8px;
        }

        .students-list::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }

        .students-list::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 4px;
        }

        .students-list::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #5a6fd8, #6b46a3);
        }

        .student-card {
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 1rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
        }

        .student-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          border-color: #667eea;
          background: white;
        }

        .student-info {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .student-photo {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #667eea;
          flex-shrink: 0;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .student-details {
          flex: 1;
        }

        .student-name {
          font-size: 1.3rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 0.25rem;
        }

        .student-class {
          color: #667eea;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .student-complaints-count {
          font-size: 0.9rem;
          color: #718096;
          margin-bottom: 1rem;
        }

        .student-complaints-list {
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .student-complaint {
          font-size: 0.85rem;
          color: #4a5568;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          border-left: 3px solid #667eea;
        }

        .student-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: flex-end;
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          animation: fadeIn 0.3s ease-out;
          backdrop-filter: blur(5px);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          max-width: 500px;
          width: 90%;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .camera-video {
          width: 100%;
          max-width: 400px;
          height: auto;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          background: #000;
        }

        .camera-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .delete-modal-content {
          padding: 2.5rem;
        }

        .delete-modal-icon {
          font-size: 4rem;
          color: #f56565;
          margin-bottom: 1rem;
        }

        .delete-modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 0.5rem;
        }

        .delete-modal-text {
          color: #718096;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .delete-modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .loading-students {
          text-align: center;
          padding: 3rem 1rem;
          color: #718096;
        }

        .no-students {
          text-align: center;
          padding: 3rem 1rem;
          color: #718096;
          font-style: italic;
        }

        .no-students-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        @media (max-width: 768px) {
          .photo-buttons,
          .action-buttons {
            flex-direction: column;
          }
          
          .add-complaint {
            flex-direction: column;
          }
          
          .complaint-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          
          .student-info {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          
          .student-actions {
            flex-direction: row;
            justify-content: center;
            margin-top: 1rem;
          }
          
          .camera-video {
            width: 90vw;
            max-width: 300px;
          }
          
          .modal-content {
            margin: 1rem;
            padding: 1.5rem;
          }
          
          .card {
            padding: 1.5rem;
          }
          
          .notification {
            top: 1rem;
            right: 1rem;
            left: 1rem;
            max-width: none;
          }
        }

        @media (max-width: 480px) {
          .header h1 {
            font-size: 2rem;
          }
          
          .card-header {
            font-size: 1.2rem;
          }
          
          .photo-preview {
            width: 120px;
            height: 120px;
          }
          
          .student-photo {
            width: 60px;
            height: 60px;
          }
          
          .main-grid {
            gap: 1rem;
          }
        }

        .btn:focus,
        .form-input:focus {
          outline: 2px solid #667eea;
          outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          
          .spinner {
            animation: none;
            border-top-color: transparent;
          }
        }

        .pulse-animation {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        .fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }

        .slide-in-left {
          animation: slideInLeft 0.5s ease-out;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .floating {
          animation: floating 3s ease-in-out infinite;
        }

        @keyframes floating {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>

      <div className="app-container">
        <div className="container">
          <div className="header">
            <h1 className="floating">🎓 Student Management System</h1>
            <p>Manage your students with style and efficiency</p>
          </div>

          {/* Notification Messages */}
          {error && (
            <div className="notification notification-error">
              <span className="notification-icon">❌</span>
              {error}
            </div>
          )}
          
          {success && (
            <div className="notification notification-success">
              <span className="notification-icon">✅</span>
              {success}
            </div>
          )}

          {/* Loading Overlay */}
          {loading && (
            <div className="loading-overlay">
              <div className="loading-content">
                <div className="spinner"></div>
                <p style={{ color: '#667eea', fontWeight: '600' }}>Processing...</p>
              </div>
            </div>
          )}

          <div className="main-grid">
            {/* Student Form */}
            <div className="card slide-in-left">
              <div className="card-header">
                <span className="card-icon">👤</span>
                {isEditing ? 'Edit Student' : 'Add New Student'}
              </div>

              {/* Photo Section */}
              <div className="photo-section">
                <label className="form-label">Student Photo</label>
                <div className="photo-container">
                  {currentStudent.photo && (
                    <img 
                      src={currentStudent.photo} 
                      alt="Student" 
                      className="photo-preview pulse-animation"
                    />
                  )}
                  <div className="photo-buttons">
                    <button
                      onClick={startCamera}
                      disabled={loading}
                      className="btn btn-primary"
                    >
                      <span className="btn-icon">📷</span>
                      Take Photo
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={loading}
                      className="btn btn-success"
                    >
                      <span className="btn-icon">📁</span>
                      Upload Photo
                    </button>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                </div>
              </div>

              {/* Camera Modal */}
              {showCamera && (
                <div className="modal">
                  <div className="modal-content">
                    <h3 style={{ marginBottom: '1rem', color: '#2d3748' }}>📸 Capture Photo</h3>
                    <video ref={videoRef} autoPlay className="camera-video" />
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                    <div className="camera-actions">
                      <button onClick={capturePhoto} className="btn btn-primary">
                        <span className="btn-icon">📸</span>
                        Capture
                      </button>
                      <button onClick={stopCamera} className="btn btn-secondary">
                        <span className="btn-icon">❌</span>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Student Details */}
              <div className="form-section">
                <div className="form-group">
                  <label className="form-label">👤 Student Name</label>
                  <input
                    type="text"
                    value={currentStudent.name}
                    onChange={(e) => setCurrentStudent(prev => ({ ...prev, name: e.target.value }))}
                    disabled={loading}
                    className="form-input"
                    placeholder="Enter student's full name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">🏫 Class</label>
                  <input
                    type="text"
                    value={currentStudent.class}
                    onChange={(e) => setCurrentStudent(prev => ({ ...prev, class: e.target.value }))}
                    disabled={loading}
                    className="form-input"
                    placeholder="e.g., 10th Grade A, Class 5B"
                  />
                </div>
              </div>

              {/* Complaints Section */}
              <div className="complaints-section">
                <label className="form-label">
                  <span className="card-icon">💬</span>
                  Student Complaints
                </label>
                <div className="complaints-list">
                  {currentStudent.complaints.map((complaint, index) => (
                    <div key={index} className="complaint-item fade-in">
                      <span className="complaint-number">#{index + 1}</span>
                      {editingComplaintIndex === index ? (
                        <div className="complaint-edit">
                          <input
                            type="text"
                            value={complaint.text || complaint}
                            onChange={(e) => updateComplaint(index, e.target.value)}
                            className="form-input"
                            placeholder="Edit complaint..."
                          />
                          <button
                            onClick={() => setEditingComplaintIndex(-1)}
                            className="btn btn-success btn-small"
                          >
                            ✅
                          </button>
                        </div>
                      ) : (
                        <div className="complaint-content">
                          <span className="complaint-text">{complaint.text || complaint}</span>
                          <div className="complaint-actions">
                            <button
                              onClick={() => setEditingComplaintIndex(index)}
                              className="btn btn-warning btn-small"
                              title="Edit complaint"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => removeComplaint(index)}
                              className="btn btn-danger btn-small"
                              title="Remove complaint"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="add-complaint">
                    <input
                      type="text"
                      value={newComplaint}
                      onChange={(e) => setNewComplaint(e.target.value)}
                      placeholder="Add a new complaint..."
                      disabled={loading}
                      className="form-input"
                      onKeyPress={(e) => e.key === 'Enter' && addComplaint()}
                    />
                    <button
                      onClick={addComplaint}
                      disabled={loading || !newComplaint.trim()}
                      className="btn btn-warning"
                    >
                      <span className="btn-icon">➕</span>
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button
                  onClick={saveStudent}
                  disabled={loading}
                  className="btn btn-primary btn-full"
                >
                  {loading ? (
                    <>
                      <div className="spinner small-spinner"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">{isEditing ? '✨' : '➕'}</span>
                      {isEditing ? 'Update Student' : 'Add Student'}
                    </>
                  )}
                </button>
                {isEditing && (
                  <button
                    onClick={resetForm}
                    disabled={loading}
                    className="btn btn-secondary"
                  >
                    <span className="btn-icon">❌</span>
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Students List */}
            <div className="card slide-in-left">
              <div className="card-header">
                <span className="card-icon">📚</span>
                Student Records ({students.length})
              </div>
              <div className="students-list">
                {loading && students.length === 0 ? (
                  <div className="loading-students">
                    <div className="spinner"></div>
                    <p>Loading students...</p>
                  </div>
                ) : students.length === 0 ? (
                  <div className="no-students">
                    <div className="no-students-icon">👥</div>
                    <p>No students added yet</p>
                    <small>Start by adding your first student above!</small>
                  </div>
                ) : (
                  students.map((student, index) => (
                    <div 
                      key={student._id} 
                      className="student-card fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="student-info">
                        {student.photo && (
                          <img 
                            src={student.photo} 
                            alt={student.name}
                            className="student-photo"
                          />
                        )}
                        <div className="student-details">
                          <div className="student-name">{student.name}</div>
                          <div className="student-class">📚 {student.class}</div>
                          <div className="student-complaints-count">
                            💬 {student.complaints?.length || 0} complaint{(student.complaints?.length || 0) !== 1 ? 's' : ''}
                          </div>
                          {student.complaints && student.complaints.length > 0 && (
                            <div className="student-complaints-list">
                              {student.complaints.slice(0, 2).map((complaint, index) => (
                                <div key={index} className="student-complaint">
                                  #{index + 1}: {complaint.text || complaint}
                                </div>
                              ))}
                              {student.complaints.length > 2 && (
                                <div className="student-complaint" style={{ fontStyle: 'italic', opacity: 0.7 }}>
                                  ... and {student.complaints.length - 2} more
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="student-actions">
                          <button
                            onClick={() => editStudent(student)}
                            disabled={loading}
                            className="btn btn-primary btn-small"
                            title="Edit student"
                          >
                            <span className="btn-icon">✏️</span>
                            Edit
                          </button>
                          <button
                            onClick={() => confirmDelete(student)}
                            disabled={loading}
                            className="btn btn-danger btn-small"
                            title="Delete student"
                          >
                            <span className="btn-icon">🗑️</span>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Delete Confirmation Modal */}
          {showDeleteModal && studentToDelete && (
            <div className="modal">
              <div className="modal-content delete-modal-content">
                <div className="delete-modal-icon">🗑️</div>
                <h3 className="delete-modal-title">Delete Student</h3>
                <p className="delete-modal-text">
                  Are you sure you want to delete <strong>{studentToDelete.name}</strong>? 
                  This action cannot be undone and will remove all their data including complaints.
                </p>
                <div className="delete-modal-actions">
                  <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="btn btn-danger"
                  >
                    {loading ? (
                      <>
                        <div className="spinner small-spinner"></div>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <span className="btn-icon">🗑️</span>
                        Yes, Delete
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setStudentToDelete(null);
                    }}
                    disabled={loading}
                    className="btn btn-secondary"
                  >
                    <span className="btn-icon">❌</span>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentManagementApp;
