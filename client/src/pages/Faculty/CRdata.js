import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Save, X, FileText, Calendar, User, Hash, CheckCircle, Grid, List, Image } from 'lucide-react';

const CrDetail = () => {
  const [crData, setCrData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'table'

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
    if (name.includes('photo') || name.includes('image') || name.includes('picture')) return <Image className="field-icon" />;
    return <FileText className="field-icon" />;
  };

  const isImageField = (fieldName) => {
    const name = fieldName.toLowerCase();
    return name.includes('photo') || name.includes('image') || name.includes('picture') || name.includes('url');
  };

  const convertToDirectImageUrl = (url) => {
    if (!url || typeof url !== 'string') return url;
    
    // Google Drive URL conversion
    if (url.includes('drive.google.com')) {
      // Extract file ID from various Google Drive URL formats
      let fileId = null;
      
      // Format: https://drive.google.com/open?id=FILE_ID
      if (url.includes('open?id=')) {
        fileId = url.match(/open\?id=([a-zA-Z0-9_-]+)/)?.[1];
      }
      // Format: https://drive.google.com/file/d/FILE_ID/view
      else if (url.includes('/file/d/')) {
        fileId = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)?.[1];
      }
      // Format: https://drive.google.com/uc?id=FILE_ID
      else if (url.includes('uc?id=')) {
        fileId = url.match(/uc\?id=([a-zA-Z0-9_-]+)/)?.[1];
      }
      
      if (fileId) {
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
      }
    }
    
    // Google Photos URL conversion
    if (url.includes('photos.google.com') || url.includes('googleusercontent.com')) {
      return url;
    }
    
    // Dropbox URL conversion
    if (url.includes('dropbox.com') && !url.includes('raw=1')) {
      return url.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('?dl=0', '');
    }
    
    return url;
  };

  const isImageUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
    
    // Convert URL first
    const convertedUrl = convertToDirectImageUrl(url);
    
    // Check for image file extensions
    if (/\.(jpg|jpeg|png|gif|bmp|webp|svg)(\?.*)?$/i.test(convertedUrl)) {
      return true;
    }
    
    // Check for common image hosting services
    if (convertedUrl.includes('drive.google.com/uc?export=view') ||
        convertedUrl.includes('googleusercontent.com') ||
        convertedUrl.includes('imgur.com') ||
        convertedUrl.includes('cloudinary.com') ||
        convertedUrl.includes('aws.amazon.com') ||
        convertedUrl.includes('googleapis.com') ||
        convertedUrl.includes('image') || 
        convertedUrl.includes('photo') ||
        convertedUrl.includes('picture')) {
      return true;
    }
    
    return false;
  };

  const renderTableView = () => {
    if (filteredData.length === 0) {
      return (
        <div className="no-data">
          <FileText className="no-data-icon" />
          <p>No CR records found</p>
        </div>
      );
    }

    const headers = Object.keys(filteredData[0]).filter(key => key !== 'id');

    return (
      <div className="table-container">
        <table className="cr-table">
          <thead>
            <tr>
              <th>CR ID</th>
              {headers.map(header => (
                <th key={header}>
                  <div className="header-content">
                    {getFieldIcon(header)}
                    <span>{header}</span>
                  </div>
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((cr) => (
              <tr key={cr.id} className={editingId === cr.id ? 'editing' : ''}>
                <td>
                  <span className="cr-id">CR #{cr.id}</span>
                </td>
                {headers.map(header => (
                  <td key={header}>
                    {editingId === cr.id ? (
                      isImageField(header) ? (
                        <div className="image-edit-container">
                          <input
                            type="text"
                            value={editForm[header] || ''}
                            onChange={(e) => handleInputChange(header, e.target.value)}
                            className="field-input"
                            placeholder="Image URL"
                          />
                          {editForm[header] && isImageUrl(editForm[header]) && (
                            <div className="image-preview-small">
                              <img 
                                src={convertToDirectImageUrl(editForm[header])} 
                                alt="Preview"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={editForm[header] || ''}
                          onChange={(e) => handleInputChange(header, e.target.value)}
                          className="field-input"
                        />
                      )
                    ) : (
                      <div className="field-content">
                        {isImageField(header) && cr[header] && isImageUrl(cr[header]) ? (
                          <div className="table-image-container">
                            <img 
                              src={convertToDirectImageUrl(cr[header])} 
                              alt="CR Image"
                              className="table-image"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div className="image-fallback" style={{display: 'none'}}>
                              <Image size={20} />
                              <span>No Image</span>
                            </div>
                          </div>
                        ) : (
                          <span className="field-text">{cr[header] || 'N/A'}</span>
                        )}
                      </div>
                    )}
                  </td>
                ))}
                <td>
                  <div className="table-actions">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderCardView = () => {
    if (filteredData.length === 0) {
      return (
        <div className="no-data">
          <FileText className="no-data-icon" />
          <p>No CR records found</p>
        </div>
      );
    }

    return (
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
                      isImageField(key) ? (
                        <div className="image-edit-container">
                          <input
                            type="text"
                            value={editForm[key] || ''}
                            onChange={(e) => handleInputChange(key, e.target.value)}
                            className="field-input"
                            placeholder="Image URL"
                          />
                          {editForm[key] && isImageUrl(editForm[key]) && (
                            <div className="card-image-preview">
                              <img 
                                src={convertToDirectImageUrl(editForm[key])} 
                                alt="Preview"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                              <div className="image-fallback" style={{display: 'none'}}>
                                <Image size={24} />
                                <span>Invalid Image</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={editForm[key] || ''}
                          onChange={(e) => handleInputChange(key, e.target.value)}
                          className="field-input"
                        />
                      )
                    ) : (
                      <div className="field-value">
                        {isImageField(key) && value && isImageUrl(value) ? (
                          <div className="card-image-container">
                            <img 
                              src={convertToDirectImageUrl(value)} 
                              alt="CR Image"
                              className="card-image"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div className="image-fallback" style={{display: 'none'}}>
                              <Image size={24} />
                              <span>No Image</span>
                            </div>
                          </div>
                        ) : (
                          value || 'N/A'
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
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

      <div className="controls-section">
        <div className="controls-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search CR records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
              onClick={() => setViewMode('card')}
            >
              <Grid size={20} />
              Cards
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
            >
              <List size={20} />
              Table
            </button>
          </div>
        </div>
      </div>

      <div className="data-section">
        {viewMode === 'card' ? renderCardView() : renderTableView()}
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
          max-width: 1400px;
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

        .controls-section {
          padding: 2rem;
          background: rgba(0, 0, 0, 0.2);
        }

        .controls-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .search-container {
          flex: 1;
          min-width: 300px;
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

        .view-toggle {
          display: flex;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 0.5rem;
          backdrop-filter: blur(10px);
        }

        .toggle-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: none;
          background: transparent;
          color: #b0c4de;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .toggle-btn.active {
          background: #00d4ff;
          color: #0f0f23;
        }

        .toggle-btn:hover:not(.active) {
          background: rgba(0, 212, 255, 0.2);
          color: #00d4ff;
        }

        .data-section {
          padding: 2rem;
          max-width: 1400px;
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

        /* Card View Styles */
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
          width: 100%;
        }

        .field-input:focus {
          outline: none;
          border-color: #00d4ff;
          box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
        }

        /* Image Styles for Card View */
        .card-image-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          margin: 0 auto;
        }

        .card-image {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #00d4ff;
          box-shadow: 0 0 15px rgba(0, 212, 255, 0.3);
        }

        .card-image-preview {
          margin-top: 0.5rem;
          display: flex;
          justify-content: center;
        }

        .card-image-preview img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #00d4ff;
        }

        .image-edit-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        /* Table View Styles */
        .table-container {
          overflow-x: auto;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(0, 212, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .cr-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 800px;
        }

        .cr-table th {
          background: rgba(0, 212, 255, 0.1);
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: #00d4ff;
          border-bottom: 2px solid rgba(0, 212, 255, 0.3);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .cr-table td {
          padding: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          color: #e0e0e0;
          vertical-align: middle;
        }

        .cr-table tr:hover {
          background: rgba(0, 212, 255, 0.05);
        }

        .cr-table tr.editing {
          background: rgba(0, 212, 255, 0.1);
        }

        .table-actions {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
        }

        .table-actions button {
          padding: 0.5rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Image Styles for Table View */
        .table-image-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
        }

        .table-image {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #00d4ff;
          box-shadow: 0 0 10px rgba(0, 212, 255, 0.2);
        }

        .image-preview-small {
          margin-top: 0.5rem;
          display: flex;
          justify-content: center;
        }

        .image-preview-small img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #00d4ff;
        }

        .field-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .field-text {
          word-break: break-word;
          max-width: 200px;
        }

        .image-fallback {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          color: #888;
          font-size: 0.8rem;
          padding: 0.5rem;
          border: 1px dashed #555;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          justify-content: center;
        }

        /* Button Styles */
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

        @media (max-width: 1024px) {
          .controls-container {
            flex-direction: column;
            align-items: stretch;
          }

          .search-container {
            min-width: auto;
          }

          .view-toggle {
            align-self: center;
          }

          .cr-table {
            font-size: 0.9rem;
          }

          .cr-table th,
          .cr-table td {
            padding: 0.75rem 0.5rem;
          }

          .table-image,
          .table-image-container {
            width: 50px;
            height: 50px;
          }

          .table-image {
            width: 50px;
            height: 50px;
          }
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

          .controls-section {
            padding: 1rem;
          }

          .data-section {
            padding: 1rem;
          }

          .table-container {
            border-radius: 8px;
          }

          .cr-table {
            font-size: 0.8rem;
          }

          .cr-table th,
          .cr-table td {
            padding: 0.5rem 0.25rem;
          }

          .field-text {
            max-width: 150px;
          }

          .table-image,
          .table-image-container {
            width: 40px;
            height: 40px;
          }

          .table-image {
            width: 40px;
            height: 40px;
          }

          .card-image,
          .card-image-container {
            width: 60px;
            height: 60px;
          }

          .card-image {
            width: 60px;
            height: 60px;
          }
        }

        @media (max-width: 480px) {
          .table-container {
            margin: -1rem;
            border-radius: 0;
            border-left: none;
            border-right: none;
          }

          .toggle-btn {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }

          .toggle-btn svg {
            width: 16px;
            height: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default CrDetail;
