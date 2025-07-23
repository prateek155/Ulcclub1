import React, { useState } from 'react';
import { Play, X, Clock, Calendar } from 'lucide-react';

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videos = [
    {
      id: 1,
      title: "Beautiful Nature Scenery",
      description: "Experience breathtaking landscapes and wildlife in this stunning nature documentary.",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      videoUrl: "/image/video 1.mp4",
      duration: "3:45",
      uploadDate: "Jan 15, 2024",
      category: "Nature",
      views: "12.5K"
    },
    {
      id: 2,
      title: "City Life Time-lapse",
      description: "Watch the hustle and bustle of city life captured in an amazing time-lapse sequence.",
      thumbnail: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=300&fit=crop",
      videoUrl: "#",
      duration: "2:30",
      uploadDate: "Jan 10, 2024",
      category: "Urban",
      views: "8.2K"
    },
    {
      id: 3,
      title: "Ocean Waves Relaxation",
      description: "Relax and unwind with the soothing sounds of ocean waves crashing on the shore.",
      thumbnail: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=300&fit=crop",
      videoUrl: "#",
      duration: "5:20",
      uploadDate: "Jan 8, 2024",
      category: "Relaxation",
      views: "25.1K"
    },
    {
      id: 4,
      title: "Mountain Adventure",
      description: "Join us on an epic mountain climbing adventure with spectacular views.",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      videoUrl: "#",
      duration: "7:15",
      uploadDate: "Jan 5, 2024",
      category: "Adventure",
      views: "18.7K"
    },
    {
      id: 5,
      title: "Cooking Masterclass",
      description: "Learn professional cooking techniques from world-class chefs in this masterclass.",
      thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      videoUrl: "#",
      duration: "12:30",
      uploadDate: "Jan 3, 2024",
      category: "Education",
      views: "45.3K"
    },
  ];

  const openModal = (video) => {
    setSelectedVideo(video);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'auto';
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e293b 0%, #581c87 50%, #1e293b 100%)',
      padding: '24px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    },
    backgroundElements: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 0
    },
    blob1: {
      position: 'absolute',
      top: '-160px',
      right: '-160px',
      width: '320px',
      height: '320px',
      background: '#a855f7',
      borderRadius: '50%',
      mixBlendMode: 'multiply',
      filter: 'blur(40px)',
      opacity: 0.7,
      animation: 'pulse 4s ease-in-out infinite'
    },
    blob2: {
      position: 'absolute',
      bottom: '-160px',
      left: '-160px',
      width: '320px',
      height: '320px',
      background: '#ec4899',
      borderRadius: '50%',
      mixBlendMode: 'multiply',
      filter: 'blur(40px)',
      opacity: 0.7,
      animation: 'pulse 4s ease-in-out infinite 2s'
    },
    blob3: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '320px',
      height: '320px',
      background: '#3b82f6',
      borderRadius: '50%',
      mixBlendMode: 'multiply',
      filter: 'blur(40px)',
      opacity: 0.7,
      animation: 'pulse 4s ease-in-out infinite 1s'
    },
    content: {
      position: 'relative',
      zIndex: 10,
      maxWidth: '1400px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '64px'
    },
    title: {
      fontSize: '3.75rem',
      fontWeight: '700',
      background: 'linear-gradient(to right, #ffffff, #e879f9, #f9a8d4)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '16px',
      letterSpacing: '-0.05em',
      lineHeight: '1.1'
    },
    subtitle: {
      fontSize: '1.25rem',
      color: 'rgba(209, 213, 219, 1)',
      maxWidth: '512px',
      margin: '0 auto',
      lineHeight: '1.6'
    },
    videoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '32px'
    },
    videoCard: {
      position: 'relative',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(16px)',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      overflow: 'hidden',
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      transform: 'translateY(0) scale(1)',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
    },
    videoCardHover: {
      transform: 'translateY(-8px) scale(1.02)',
      borderColor: 'rgba(255, 255, 255, 0.4)',
      boxShadow: '0 25px 50px rgba(168, 85, 247, 0.25)'
    },
    thumbnailContainer: {
      position: 'relative',
      overflow: 'hidden',
      height: '192px'
    },
    thumbnail: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.7s ease'
    },
    thumbnailHover: {
      transform: 'scale(1.1)'
    },
    gradientOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent)',
      opacity: 0,
      transition: 'opacity 0.3s ease'
    },
    gradientOverlayVisible: {
      opacity: 1
    },
    playButtonContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0,
      transition: 'all 0.3s ease',
      transform: 'scale(0.8)'
    },
    playButtonVisible: {
      opacity: 1,
      transform: 'scale(1.1)'
    },
    playButton: {
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(8px)',
      borderRadius: '50%',
      padding: '16px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    },
    categoryBadge: {
      position: 'absolute',
      top: '16px',
      left: '16px',
      background: 'linear-gradient(to right, #a855f7, #ec4899)',
      color: 'white',
      fontSize: '0.75rem',
      fontWeight: '600',
      padding: '6px 12px',
      borderRadius: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    },
    durationBadge: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(8px)',
      color: 'white',
      fontSize: '0.75rem',
      fontWeight: '500',
      padding: '4px 8px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    videoInfo: {
      padding: '24px'
    },
    videoTitle: {
      color: 'white',
      fontWeight: '600',
      fontSize: '1.125rem',
      marginBottom: '8px',
      lineHeight: '1.4',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      transition: 'color 0.3s ease'
    },
    videoTitleHover: {
      color: '#e879f9'
    },
    videoDescription: {
      color: 'rgba(209, 213, 219, 1)',
      fontSize: '0.875rem',
      marginBottom: '16px',
      lineHeight: '1.5',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    },
    videoMeta: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '0.75rem',
      color: 'rgba(156, 163, 175, 1)'
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    viewsText: {
      color: '#e879f9',
      fontWeight: '500'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '16px'
    },
    modalContent: {
      position: 'relative',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(16px)',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      overflow: 'hidden',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
      maxWidth: '896px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'auto'
    },
    closeButton: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      zIndex: 10,
      background: 'rgba(0, 0, 0, 0.5)',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      padding: '8px',
      cursor: 'pointer',
      transition: 'background 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    closeButtonHover: {
      background: 'rgba(0, 0, 0, 0.7)'
    },
    modalVideo: {
      width: '100%',
      height: 'auto',
      maxHeight: '70vh',
      objectFit: 'cover'
    },
    modalInfo: {
      padding: '24px',
      color: 'white'
    },
    modalHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: '16px'
    },
    modalTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      marginBottom: '8px'
    },
    modalDescription: {
      color: 'rgba(209, 213, 219, 1)',
      lineHeight: '1.6'
    },
    modalCategoryBadge: {
      background: 'linear-gradient(to right, #a855f7, #ec4899)',
      color: 'white',
      fontSize: '0.875rem',
      fontWeight: '600',
      padding: '6px 12px',
      borderRadius: '20px',
      marginLeft: '16px',
      flexShrink: 0
    },
    modalMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      fontSize: '0.875rem',
      color: 'rgba(156, 163, 175, 1)'
    },
    modalMetaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    modalViews: {
      color: '#e879f9',
      fontWeight: '500'
    }
  };

  const keyframes = `
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 0.7; }
      50% { transform: scale(1.05); opacity: 0.9; }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={styles.container}>
        {/* Background Elements */}
        <div style={styles.backgroundElements}>
          <div style={styles.blob1}></div>
          <div style={styles.blob2}></div>
          <div style={styles.blob3}></div>
        </div>

        <div style={styles.content}>
          {/* Header */}
          <div style={styles.header}>
            <h1 style={styles.title}>Video Gallery</h1>
            <p style={styles.subtitle}>
              Discover amazing content from around the world. Click on any video to watch it in full screen.
            </p>
          </div>

          {/* Video Grid */}
          <div style={styles.videoGrid}>
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onVideoClick={openModal}
                styles={styles}
              />
            ))}
          </div>
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <VideoModal
            video={selectedVideo}
            onClose={closeModal}
            styles={styles}
          />
        )}
      </div>
    </>
  );
};

const VideoCard = ({ video, onVideoClick, styles }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.videoCard,
        ...(isHovered ? styles.videoCardHover : {})
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onVideoClick(video)}
    >
      {/* Video Thumbnail */}
      <div style={styles.thumbnailContainer}>
        <img
          src={video.thumbnail}
          alt={video.title}
          style={{
            ...styles.thumbnail,
            ...(isHovered ? styles.thumbnailHover : {})
          }}
        />
        
        {/* Gradient Overlay */}
        <div style={{
          ...styles.gradientOverlay,
          ...(isHovered ? styles.gradientOverlayVisible : {})
        }}></div>
        
        {/* Play Button */}
        <div style={{
          ...styles.playButtonContainer,
          ...(isHovered ? styles.playButtonVisible : {})
        }}>
          <div style={styles.playButton}>
            <Play size={32} color="white" fill="white" />
          </div>
        </div>

        {/* Category Badge */}
        <div style={styles.categoryBadge}>
          {video.category}
        </div>

        {/* Duration Badge */}
        <div style={styles.durationBadge}>
          <Clock size={12} />
          {video.duration}
        </div>
      </div>

      {/* Video Info */}
      <div style={styles.videoInfo}>
        <h3 style={{
          ...styles.videoTitle,
          ...(isHovered ? styles.videoTitleHover : {})
        }}>
          {video.title}
        </h3>
        <p style={styles.videoDescription}>
          {video.description}
        </p>
        
        {/* Meta Info */}
        <div style={styles.videoMeta}>
          <div style={styles.metaItem}>
            <Calendar size={12} />
            {video.uploadDate}
          </div>
          <div style={styles.viewsText}>
            {video.views} views
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoModal = ({ video, onClose, styles }) => {
  const [isCloseHovered, setIsCloseHovered] = useState(false);

  return (
    <div style={styles.modal} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            ...styles.closeButton,
            ...(isCloseHovered ? styles.closeButtonHover : {})
          }}
          onMouseEnter={() => setIsCloseHovered(true)}
          onMouseLeave={() => setIsCloseHovered(false)}
        >
          <X size={24} />
        </button>

        {/* Video Player */}
        <video
          src={video.videoUrl}
          controls
          autoPlay
          style={styles.modalVideo}
        />

        {/* Video Info */}
        <div style={styles.modalInfo}>
          <div style={styles.modalHeader}>
            <div>
              <h2 style={styles.modalTitle}>{video.title}</h2>
              <p style={styles.modalDescription}>{video.description}</p>
            </div>
            <span style={styles.modalCategoryBadge}>
              {video.category}
            </span>
          </div>
          
          <div style={styles.modalMeta}>
            <div style={styles.modalMetaItem}>
              <Calendar size={16} />
              {video.uploadDate}
            </div>
            <div style={styles.modalMetaItem}>
              <Clock size={16} />
              {video.duration}
            </div>
            <div style={styles.modalViews}>
              {video.views} views
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;