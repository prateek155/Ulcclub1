import React, { useState } from 'react';
import { Search, Grid, List, Plus, ExternalLink, Eye } from 'lucide-react';

const ProjectDashboard = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop',
      name: 'AI Chat Assistant',
      field: 'AI',
      createdBy: 'John Doe',
      link: 'https://github.com/johndoe/ai-chat'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300&h=200&fit=crop',
      name: 'Crypto Wallet',
      field: 'Blockchain',
      createdBy: 'Jane Smith',
      link: 'https://cryptowallet-demo.netlify.app'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=300&h=200&fit=crop',
      name: 'E-commerce Platform',
      field: 'Web Development',
      createdBy: 'Mike Johnson',
      link: 'https://github.com/mikej/ecommerce'
    }
  ]);

  const [newProject, setNewProject] = useState({
    image: '',
    name: '',
    field: '',
    createdBy: '',
    link: ''
  });

  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState('cards');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState('All');

  const fields = ['All', 'AI', 'Blockchain', 'Web Development', 'Mobile Development', 'Data Science', 'Machine Learning', 'Cloud Computing', 'Cybersecurity', 'IoT', 'AR/VR'];

  const handleAddProject = () => {
    if (newProject.name && newProject.field && newProject.createdBy && newProject.link) {
      setProjects([...projects, { ...newProject, id: Date.now() }]);
      setNewProject({ image: '', name: '', field: '', createdBy: '', link: '' });
      setShowForm(false);
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesField = selectedField === 'All' || project.field === selectedField;
    return matchesSearch && matchesField;
  });

  const handleProjectClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '30px',
        marginBottom: '30px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h1 style={{
            margin: 0,
            fontSize: '2.5rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em'
          }}>
            Project Portfolio
          </h1>
          
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.6)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
            }}
          >
            <Plus size={20} />
            Add Project
          </button>
        </div>

        {/* Controls */}
        <div style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          {/* Search */}
          <div style={{ position: 'relative', flexGrow: 1, minWidth: '300px' }}>
            <Search size={20} style={{
              position: 'absolute',
              left: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#666'
            }} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 15px 12px 45px',
                border: '2px solid #e0e0e0',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Field Filter */}
          <select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            style={{
              padding: '12px 15px',
              border: '2px solid #e0e0e0',
              borderRadius: '12px',
              fontSize: '16px',
              outline: 'none',
              cursor: 'pointer',
              background: 'white',
              minWidth: '150px'
            }}
          >
            {fields.map(field => (
              <option key={field} value={field}>{field}</option>
            ))}
          </select>

          {/* View Toggle */}
          <div style={{
            display: 'flex',
            background: '#f5f5f5',
            borderRadius: '12px',
            padding: '4px'
          }}>
            <button
              onClick={() => setViewMode('cards')}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '8px',
                background: viewMode === 'cards' ? '#667eea' : 'transparent',
                color: viewMode === 'cards' ? 'white' : '#666',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.3s ease'
              }}
            >
              <Grid size={16} />
              Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '8px',
                background: viewMode === 'table' ? '#667eea' : 'transparent',
                color: viewMode === 'table' ? 'white' : '#666',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.3s ease'
              }}
            >
              <List size={16} />
              Table
            </button>
          </div>
        </div>
      </div>

      {/* Add Project Form */}
      {showForm && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          animation: 'slideIn 0.3s ease-out'
        }}>
          <h2 style={{
            margin: '0 0 20px 0',
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#333'
          }}>
            Add New Project
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            <input
              type="url"
              placeholder="Image URL"
              value={newProject.image}
              onChange={(e) => setNewProject({...newProject, image: e.target.value})}
              style={{
                padding: '12px 15px',
                border: '2px solid #e0e0e0',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
            />
            
            <input
              type="text"
              placeholder="Project Name"
              value={newProject.name}
              onChange={(e) => setNewProject({...newProject, name: e.target.value})}
              style={{
                padding: '12px 15px',
                border: '2px solid #e0e0e0',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
            />
            
            <select
              value={newProject.field}
              onChange={(e) => setNewProject({...newProject, field: e.target.value})}
              style={{
                padding: '12px 15px',
                border: '2px solid #e0e0e0',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                cursor: 'pointer',
                background: 'white'
              }}
            >
              <option value="">Select Field</option>
              {fields.slice(1).map(field => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>
            
            <input
              type="text"
              placeholder="Created By"
              value={newProject.createdBy}
              onChange={(e) => setNewProject({...newProject, createdBy: e.target.value})}
              style={{
                padding: '12px 15px',
                border: '2px solid #e0e0e0',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
            />
            
            <input
              type="url"
              placeholder="Project Link (GitHub/Live Site)"
              value={newProject.link}
              onChange={(e) => setNewProject({...newProject, link: e.target.value})}
              style={{
                padding: '12px 15px',
                border: '2px solid #e0e0e0',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
            />
          </div>
          
          <div style={{
            display: 'flex',
            gap: '10px',
            marginTop: '20px'
          }}>
            <button
              onClick={handleAddProject}
              style={{
                background: 'linear-gradient(135deg, #4CAF50, #45a049)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Add Project
            </button>
            
            <button
              onClick={() => setShowForm(false)}
              style={{
                background: '#f5f5f5',
                color: '#666',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Projects Display */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#333'
          }}>
            Projects ({filteredProjects.length})
          </h2>
        </div>

        {viewMode === 'cards' ? (
          /* Card View */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '25px'
          }}>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project.link)}
                style={{
                  background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  position: 'relative'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                }}
              >
                {/* Project Image */}
                <div style={{
                  height: '200px',
                  background: project.image ? `url(${project.image})` : 'linear-gradient(135deg, #667eea, #764ba2)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: 'rgba(255,255,255,0.9)',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#667eea',
                    backdropFilter: 'blur(10px)'
                  }}>
                    {project.field}
                  </div>
                  
                  <div style={{
                    position: 'absolute',
                    bottom: '15px',
                    right: '15px',
                    background: 'rgba(0,0,0,0.7)',
                    borderRadius: '50%',
                    padding: '8px',
                    color: 'white'
                  }}>
                    <ExternalLink size={16} />
                  </div>
                </div>

                {/* Project Info */}
                <div style={{ padding: '20px' }}>
                  <h3 style={{
                    margin: '0 0 8px 0',
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#333',
                    lineHeight: '1.3'
                  }}>
                    {project.name}
                  </h3>
                  
                  <p style={{
                    margin: '0 0 15px 0',
                    color: '#666',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Eye size={14} />
                    Created by {project.createdBy}
                  </p>
                  
                  <div style={{
                    background: 'linear-gradient(90deg, #667eea, #764ba2)',
                    height: '3px',
                    borderRadius: '2px',
                    width: '60px'
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Table View */
          <div style={{
            background: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
                  <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: '600' }}>Image</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: '600' }}>Project Name</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: '600' }}>Field</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: '600' }}>Created By</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: 'white', fontWeight: '600' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project, index) => (
                  <tr
                    key={project.id}
                    style={{
                      borderBottom: '1px solid #f0f0f0',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#f8f9ff';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                    onClick={() => handleProjectClick(project.link)}
                  >
                    <td style={{ padding: '15px' }}>
                      <img
                        src={project.image || 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=60&h=60&fit=crop'}
                        alt={project.name}
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '8px',
                          objectFit: 'cover'
                        }}
                      />
                    </td>
                    <td style={{ padding: '15px', fontWeight: '600', color: '#333' }}>
                      {project.name}
                    </td>
                    <td style={{ padding: '15px' }}>
                      <span style={{
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {project.field}
                      </span>
                    </td>
                    <td style={{ padding: '15px', color: '#666' }}>
                      {project.createdBy}
                    </td>
                    <td style={{ padding: '15px' }}>
                      <div style={{
                        background: '#667eea',
                        color: 'white',
                        borderRadius: '8px',
                        padding: '6px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        transition: 'all 0.3s ease'
                      }}>
                        <ExternalLink size={16} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#666'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '20px',
              opacity: 0.5
            }}>
              🔍
            </div>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.25rem', fontWeight: '600' }}>
              No projects found
            </h3>
            <p style={{ margin: 0, fontSize: '16px' }}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        input:focus, select:focus {
          border-color: #667eea !important;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
        }
        
        button:active {
          transform: scale(0.98);
        }
        
        @media (max-width: 768px) {
          .controls {
            flex-direction: column;
            align-items: stretch;
          }
          
          .view-toggle {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectDashboard;
