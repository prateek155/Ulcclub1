import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { Calendar, MapPin, User, Users} from 'lucide-react';
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useNavigate } from "react-router-dom";

const EventsDisplay = () => {
    const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://ulcclub1.onrender.com/api/v1/product/get-product"
      );
      setProducts(data.product);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something Went Wrong",
      });
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "TBD";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      workshop: '#10b981',
      seminar: '#3b82f6',
      conference: '#8b5cf6',
      networking: '#f59e0b',
      social: '#ef4444',
      sports: '#06b6d4',
      cultural: '#84cc16',
      educational: '#6366f1'
    };
    return colors[category] || '#6b7280';
  };

  const styles = {
    container: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      textAlign: 'center',
      marginBottom: '3rem',
      color: 'white'
    },
    title: {
      fontSize: '3rem',
      fontWeight: '700',
      marginBottom: '1rem',
      textShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    subtitle: {
      fontSize: '1.2rem',
      opacity: '0.9',
      maxWidth: '600px',
      margin: '0 auto'
    },
    eventsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '2rem',
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    eventCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      cursor: 'pointer'
    },
    eventCardHover: {
      transform: 'translateY(-8px)',
      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15)'
    },
    eventImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      background: 'linear-gradient(45deg, #f0f0f0, #e0e0e0)'
    },
    eventContent: {
      padding: '1.5rem'
    },
    eventHeader: {
      marginBottom: '1rem'
    },
    eventTitle: {
      fontSize: '1.4rem',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '0.5rem',
      lineHeight: '1.4'
    },
    categoryBadge: {
      display: 'inline-block',
      padding: '0.25rem 0.75rem',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '600',
      color: 'white',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    eventDescription: {
      color: '#6b7280',
      fontSize: '0.95rem',
      lineHeight: '1.6',
      marginBottom: '1.5rem',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    },
    eventDetails: {
      marginBottom: '1.5rem'
    },
    detailItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.75rem',
      fontSize: '0.9rem',
      color: '#4b5563'
    },
    detailIcon: {
      flexShrink: 0
    },
    eventFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '1rem',
      borderTop: '1px solid #e5e7eb'
    },
    organizer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.85rem',
      color: '#6b7280'
    },
    registerBtn: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '0.9rem',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
    },
    registerBtnHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)'
    },
    registeredBtn: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '12px',
      fontWeight: '600',
      cursor: 'default',
      fontSize: '0.9rem',
      opacity: '0.8'
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
      color: 'white'
    },
    loadingSpinner: {
      width: '40px',
      height: '40px',
      border: '4px solid rgba(255, 255, 255, 0.3)',
      borderTop: '4px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    noEvents: {
      textAlign: 'center',
      color: 'white',
      fontSize: '1.2rem',
      marginTop: '3rem'
    },
    eventType: {
      textTransform: 'capitalize',
      color: '#6366f1',
      fontWeight: '600'
    }
  };

  return (
    <div title="Events - Discover Amazing Events">
      <div style={styles.container}>
        <ToastContainer />
        
        {/* Header Section */}
        <div style={styles.header}>
          <h1 style={styles.title}>Discover Amazing Events</h1>
          <p style={styles.subtitle}>
            Join exciting events, workshops, and gatherings in your community. 
            Connect, learn, and have fun with like-minded people.
          </p>
        </div>

        {/* Events Grid */}
          <div style={styles.eventsGrid}>
            {products.map((p) => (
              <div
                key={p._id}
                style={styles.eventCard}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, styles.eventCardHover);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
                }}
              >
                {/* Event Image */}
                <img
                 src={`https://ulcclub1.onrender.com/api/v1/product/product-photo/${p._id}`}
                 alt={p.name}
                 style={styles.eventImage}
                 onError={(e) => {
                 e.target.onerror = null;
                 e.target.src = "/default-placeholder.png"; // place a default image in public folder
                    }}
                  />
                <div style={styles.eventContent}>
                  {/* Event Header */}
                  <div style={styles.eventHeader}>
                    <h3 style={styles.eventTitle}>{p.name}</h3>
                    {p.category && (
                      <span
                        style={{
                          ...styles.categoryBadge,
                          backgroundColor: getCategoryColor(p.category)
                        }}
                      >
                        {p.category}
                      </span>
                    )}
                  </div>

                  {/* Event Description */}
                  <p style={styles.eventDescription}>
                    {p.description}
                  </p>

                  {/* Event Details */}
                  <div style={styles.eventDetails}>
                    <div style={styles.detailItem}>
                      <Calendar size={16} style={styles.detailIcon} />
                      <span>
                        {formatDate(p.startDate)}
                        {p.endDate && p.endDate !== p.startDate && 
                          ` - ${formatDate(p.endDate)}`
                        }
                      </span>
                    </div>

                    {p.venue && (
                      <div style={styles.detailItem}>
                        <MapPin size={16} style={styles.detailIcon} />
                        <span>{p.venue}</span>
                      </div>
                    )}

                    {p.eventType && (
                      <div style={styles.detailItem}>
                        <Users size={16} style={styles.detailIcon} />
                        <span style={styles.eventType}>{p.eventType} Event</span>
                      </div>
                    )}
                  </div>

                  {/* Event Footer */}
                  <div style={styles.eventFooter}>
                    <div style={styles.organizer}>
                      <User size={14} style={styles.detailIcon} />
                      <span>{p.createdBy || 'ULC Club'}</span>
                    </div>

                      <button
                        style={styles.registerBtn}
                        onClick={() => navigate("/registration")}
                      >
                        Register Now
                      </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        {/* CSS Animation */}
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default EventsDisplay;
