import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Save, X, FileText, Calendar, User, Hash, CheckCircle } from 'lucide-react';

const CrDetail = () => {
  const [crData, setCrData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vReqReFYhCPifufwhRbClckxDQpX7iyw5cfo23mxyoWocY82HqGI9yATLuBew66yHEp9g8_2WyseZ64/pub?output=csv';

  useEffect(() => {
    fetchCRData();
  }, []);

  const fetchCRData = async () => {
    try {
      setLoading(true);
      const response = await fetch(CSV_URL);
      const csvText = await response.text();
      const parsedData = parseCSV(csvText);
      setCrData(parsedData);
    } catch (error) {
      console.error('Error fetching CR data:', error);
    } finally {
      setLoading(false);
    }
  };

  const parseCSV = (csv) => {
    const lines = csv.split('\n');
    const headers = lines[0].split(',').map(header => header.replace(/"/g, '').trim());
    
    return lines.slice(1).map((line, index) => {
      if (line.trim() === '') return null;
      
      const values = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim());
      
      const record = { id: index + 1 };
      headers.forEach((header, i) => {
        record[header] = values[i] || '';
      });
      return record;
    }).filter(Boolean);
  };

  const handleEdit = (cr) => {
    setEditingId(cr.id);
    setEditForm({ ...cr });
  };

  const handleSave = () => {
    setCrData(crData.map(cr => 
      cr.id === editingId ? { ...editForm } : cr
    ));
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this CR?')) {
      setCrData(crData.filter(cr => cr.id !== id));
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const filteredData = crData.filter(cr => 
    Object.values(cr).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getFieldIcon = (fieldName) => {
    const name = fieldName.toLowerCase();
    if (name.includes('timestamp') || name.includes('date')) return <Calendar className="field-icon" />;
    if (name.includes('name') || name.includes('user')) return <User className="field-icon" />;
    if (name.includes('id') || name.includes('number')) return <Hash className="field-icon" />;
    if (name.includes('status')) return <CheckCircle className="field-icon" />;
    return <FileText className="field-icon" />;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="ai-loader">
          <div className="loader-core"></div>
          <div className="loader-ring"></div>
        </div>
        <p>Loading CR Data...</p>
      </div>
    );
  }

  return (
    <div className="cr-container">
      <div className="header-section">
        <div className="header-content">
          <div className="title-section">
            <FileText className="main-icon" />
            <div>
              <h1>CR Management System</h1>
              <p>AI-Powered Change Request Dashboard</p>
            </div>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-number">{crData.length}</span>
              <span className="stat-label">Total CRs</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{editingId ? '1' : '0'}</span>
              <span className="stat-label">Editing</span>
            </div>
          </div>
        </div>
      </div>

      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search CR records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="data-section">
        {filteredData.length === 0 ? (
          <div className="no-data">
            <FileText className="no-data-icon" />
            <p>No CR records found</p>
          </div>
        ) : (
          <div className="cr-grid">
            {filteredData.map((cr) => (
              <div key={cr.id} className="cr-card">
                <div className="card-header">
                  <span className="cr-id">CR #{cr.id}</span>
                  <div className="card-actions">
                    {editingId === cr.id ? (
                      <>
                        <button onClick={handleSave} className="save-btn">
                          <Save size={16} />
                        </button>
                        <button onClick={handleCancel} className="cancel-btn">
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(cr)} className="edit-btn">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(cr.id)} className="delete-btn">
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="card-content">
                  {Object.entries(cr).map(([key, value]) => {
                    if (key === 'id') return null;
                    
                    return (
                      <div key={key} className="field-row">
                        <div className="field-label">
                          {getFieldIcon(key)}
                          <span>{key}</span>
                        </div>
                        {editingId === cr.id ? (
                          <input
                            type="text"
                            value={editForm[key] || ''}
                            onChange={(e) => handleInputChange(key, e.target.value)}
                            className="field-input"
                          />
                        ) : (
                          <div className="field-value">{value || 'N/A'}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .cr-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          color: #e0e0e0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .header-section {
          background: linear-gradient(90deg, #1e3c72 0%, #2a5298 100%);
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .title-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .main-icon {
          width: 3rem;
          height: 3rem;
          color: #00d4ff;
        }

        .title-section h1 {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(45deg, #00d4ff, #90e0ef);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .title-section p {
          font-size: 1.1rem;
          color: #b0c4de;
          margin-top: 0.5rem;
        }

        .stats-grid {
          display: flex;
          gap: 1.5rem;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 1.5rem;
          border-radius: 12px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: #00d4ff;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #b0c4de;
        }

        .search-section {
          padding: 2rem;
          background: rgba(0, 0, 0, 0.2);
        }

        .search-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .search-input {
          width: 100%;
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(0, 212, 255, 0.3);
          border-radius: 12px;
          color: #e0e0e0;
          font-size: 1rem;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #00d4ff;
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
        }

        .search-input::placeholder {
          color: #888;
        }

        .data-section {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          gap: 2rem;
        }

        .ai-loader {
          position: relative;
          width: 80px;
          height: 80px;
        }

        .loader-core {
          width: 40px;
          height: 40px;
          background: linear-gradient(45deg, #00d4ff, #90e0ef);
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: pulse 2s infinite;
        }

        .loader-ring {
          width: 80px;
          height: 80px;
          border: 3px solid transparent;
          border-top: 3px solid #00d4ff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.2); }
        }

        .cr-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 2rem;
        }

        .cr-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(0, 212, 255, 0.2);
          border-radius: 16px;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .cr-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #00d4ff, #90e0ef);
        }

        .cr-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 212, 255, 0.2);
          border-color: #00d4ff;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .cr-id {
          font-weight: 700;
          color: #00d4ff;
          font-size: 1.1rem;
        }

        .card-actions {
          display: flex;
          gap: 0.5rem;
        }

        .card-actions button {
          padding: 0.5rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .edit-btn {
          background: rgba(0, 212, 255, 0.2);
          color: #00d4ff;
        }

        .edit-btn:hover {
          background: #00d4ff;
          color: #0f0f23;
        }

        .delete-btn {
          background: rgba(255, 69, 58, 0.2);
          color: #ff453a;
        }

        .delete-btn:hover {
          background: #ff453a;
          color: white;
        }

        .save-btn {
          background: rgba(52, 199, 89, 0.2);
          color: #34c759;
        }

        .save-btn:hover {
          background: #34c759;
          color: white;
        }

        .cancel-btn {
          background: rgba(255, 149, 0, 0.2);
          color: #ff9500;
        }

        .cancel-btn:hover {
          background: #ff9500;
          color: white;
        }

        .card-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .field-row {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .field-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: #b0c4de;
          font-size: 0.9rem;
          text-transform: capitalize;
        }

        .field-icon {
          width: 16px;
          height: 16px;
          color: #00d4ff;
        }

        .field-value {
          background: rgba(255, 255, 255, 0.1);
          padding: 0.75rem;
          border-radius: 8px;
          color: #e0e0e0;
          min-height: 3rem;
          display: flex;
          align-items: center;
          word-break: break-word;
        }

        .field-input {
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(0, 212, 255, 0.3);
          border-radius: 8px;
          padding: 0.75rem;
          color: #e0e0e0;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .field-input:focus {
          outline: none;
          border-color: #00d4ff;
          box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
        }

        .no-data {
          text-align: center;
          padding: 4rem;
          color: #888;
        }

        .no-data-icon {
          width: 4rem;
          height: 4rem;
          margin-bottom: 1rem;
          color: #555;
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            text-align: center;
          }

          .stats-grid {
            justify-content: center;
          }

          .cr-grid {
            grid-template-columns: 1fr;
          }

          .title-section h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CrDetail;
