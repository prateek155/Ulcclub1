import React from 'react';
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Footer = () => {
  const [hoveredLink, setHoveredLink] = useState(null);

  const footerStyles = {
    footer: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '40px 20px 20px',
      marginTop: 'auto',
      boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      animation: 'fadeInUp 0.6s ease-out',
    },
    footerBefore: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
      pointerEvents: 'none',
    },
    footerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      textAlign: 'center',
      position: 'relative',
      zIndex: 1,
    },
    footerCopyright: {
      marginBottom: '20px',
    },
    copyrightText: {
      margin: 0,
      fontSize: '16px',
      fontWeight: '500',
      letterSpacing: '0.5px',
      opacity: 0.9,
    },
    footerLinks: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '10px',
    },
    footerLink: {
      color: 'white',
      textDecoration: 'none',
      padding: '8px 16px',
      borderRadius: '25px',
      fontWeight: '500',
      fontSize: '14px',
      transition: 'all 0.3s ease',
      position: 'relative',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      cursor: 'pointer',
    },
    footerLinkHover: {
      background: 'rgba(255, 255, 255, 0.2)',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)',
      color: '#f0f0f0',
    },
    separator: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontWeight: '300',
      margin: '0 5px',
    },
    // Mobile responsive styles
    '@media (max-width: 768px)': {
      footer: {
        padding: '30px 15px 15px',
      },
      footerLinks: {
        flexDirection: 'column',
        gap: '15px',
      },
      footerLink: {
        padding: '10px 20px',
        fontSize: '15px',
      },
      copyrightText: {
        fontSize: '14px',
      },
    },
  };

  // Handle responsive design with window width
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleLinkHover = (linkName) => {
    setHoveredLink(linkName);
  };

  const handleLinkLeave = () => {
    setHoveredLink(null);
  };

  const getLinkStyle = (linkName) => {
    return {
      ...footerStyles.footerLink,
      ...(hoveredLink === linkName ? footerStyles.footerLinkHover : {}),
    };
  };

  const responsiveFooterStyles = {
    ...footerStyles.footer,
    ...(isMobile ? { padding: '30px 15px 15px' } : {}),
  };

  const responsiveLinksStyles = {
    ...footerStyles.footerLinks,
    ...(isMobile ? { flexDirection: 'column', gap: '15px' } : {}),
  };

  const responsiveCopyrightStyles = {
    ...footerStyles.copyrightText,
    ...(isMobile ? { fontSize: '14px' } : {}),
  };

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      <footer style={responsiveFooterStyles}>
        {/* Background pattern overlay */}
        <div style={footerStyles.footerBefore}></div>
        
        <div style={footerStyles.footerContent}>
          <div style={footerStyles.footerCopyright}>
            <p style={responsiveCopyrightStyles}>
              &copy; 2025 Ulc@club. All Rights Reserved
            </p>
          </div>
          
          <div style={responsiveLinksStyles}>
            <a
              to="/about"
              style={getLinkStyle('about')}
              onMouseEnter={() => handleLinkHover('about')}
              onMouseLeave={handleLinkLeave}
            >
              About
            </a>
            
            {!isMobile && (
              <span style={footerStyles.separator}>|</span>
            )}
            
            <a
              to="/contact"
              style={getLinkStyle('contact')}
              onMouseEnter={() => handleLinkHover('contact')}
              onMouseLeave={handleLinkLeave}
            >
              Contact
            </a>
            
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
