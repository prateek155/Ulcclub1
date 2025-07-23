import React, {useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useNavigate } from "react-router-dom";
import { Users, Brain, Code, BookOpen, Calendar, Trophy, Zap, ArrowRight,Laptop, Database, Github, ChevronRight, Star, TrendingUp, UserPlus, Coffee, Lightbulb, Code2 } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const [currentProject, setCurrentProject] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [projectCount, setProjectCount] = useState(0);
  const [workshopCount, setWorkshopCount] = useState(0);
  const [memberCount, setMemberCount] = useState(0);


  // Animation counter effect
  useEffect(() => {
    setIsVisible(true);
    
    // Animate counters
    const animateCounter = (setter, target, duration = 2000) => {
      let start = 0;
      const increment = target / (duration / 50);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, 50);
    };

    setTimeout(() => {
      animateCounter(setMemberCount, 250);
      animateCounter(setProjectCount, 42);
      animateCounter(setWorkshopCount, 18);
    }, 500);
  }, []);

  // Auto-rotate featured projects
  const featuredProjects = [
    { title: "Neural Style Transfer", tech: "TensorFlow", difficulty: "Advanced" },
    { title: "Chatbot with NLP", tech: "Python", difficulty: "Intermediate" },
    { title: "Computer Vision OCR", tech: "OpenCV", difficulty: "Advanced" },
    { title: "Sentiment Analysis", tech: "Scikit-learn", difficulty: "Beginner" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % featuredProjects.length);
    }, 3000);
    return () => clearInterval(interval);
  },);

  const upcomingEvents = [
    { date: "Jun 15", title: "Deep Learning Workshop", type: "Workshop", attendees: 45 },
    { date: "Jun 20", title: "AI Ethics Seminar", type: "Seminar", attendees: 32 },
    { date: "Jul 02", title: "Guest Lecture: MLOps", type: "Lecture", attendees: 67 }
  ];

  const achievements = [
    { icon: Trophy, title: "Best AI Project", desc: "Participated at TechFest 2025" },
    { icon: TrendingUp, title: "Industry Partnerships", desc: "Collaborating with 3+ companies" }
  ];

  const styles = {
    // Main container
    mainContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #dbeafe 50%, #e0e7ff 100%)'
    },

    // Hero Section
    heroSection: {
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(90deg, #2563eb 0%, #9333ea 50%, #4338ca 100%)'
    },
    heroOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    heroContainer: {
      position: 'relative',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '4rem 1rem',
      '@media (min-width: 768px)': {
        padding: '6rem 1rem'
      }
    },
    heroContent: {
      textAlign: 'center',
      transform: isVisible ? 'translateY(0)' : 'translateY(2.5rem)',
      opacity: isVisible ? 1 : 0,
      transition: 'all 1s ease-out'
    },
    heroBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(8px)',
      padding: '0.5rem 1rem',
      borderRadius: '9999px',
      color: 'white',
      marginBottom: '1.5rem',
      fontWeight: '500'
    },
    heroTitle: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '1.5rem',
      lineHeight: '1.1',
      '@media (min-width: 768px)': {
        fontSize: '4.5rem'
      }
    },
    heroTitleSpan: {
      display: 'block',
      background: 'linear-gradient(90deg, #fbbf24, #f97316)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent'
    },
    heroDescription: {
      fontSize: '1.25rem',
      color: '#dbeafe',
      marginBottom: '2rem',
      maxWidth: '48rem',
      margin: '0 auto 2rem auto',
      lineHeight: '1.6',
      '@media (min-width: 768px)': {
        fontSize: '1.5rem'
      }
    },
    heroButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      justifyContent: 'center',
      alignItems: 'center',
      '@media (min-width: 640px)': {
        flexDirection: 'row'
      }
    },
    primaryButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      backgroundColor: 'white',
      color: '#2563eb',
      padding: '1rem 2rem',
      borderRadius: '9999px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      transform: 'scale(1)',
      ':hover': {
        backgroundColor: '#eff6ff',
        transform: 'scale(1.05)'
      }
    },
    secondaryButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      border: '2px solid white',
      color: 'white',
      backgroundColor: 'transparent',
      padding: '1rem 2rem',
      borderRadius: '9999px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: 'white',
        color: '#2563eb'
      }
    },
    floatingElement1: {
      position: 'absolute',
      top: '5rem',
      left: '2.5rem',
      width: '5rem',
      height: '5rem',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '50%',
      filter: 'blur(1rem)',
      animation: 'pulse 2s infinite'
    },
    floatingElement2: {
      position: 'absolute',
      bottom: '5rem',
      right: '2.5rem',
      width: '8rem',
      height: '8rem',
      backgroundColor: 'rgba(168, 85, 247, 0.2)',
      borderRadius: '50%',
      filter: 'blur(2rem)',
      animation: 'pulse 2s infinite',
      animationDelay: '1s'
    },

    // Stats Section
    statsSection: {
      padding: '4rem 0',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(8px)'
    },
    statsContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem'
    },
    statItem: {
      textAlign: 'center',
      transition: 'transform 0.3s ease',
      ':hover': {
        transform: 'scale(1.05)'
      }
    },
    statIcon: {
      width: '4rem',
      height: '4rem',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1rem auto',
      transition: 'transform 0.3s ease'
    },
    statIconBlue: {
      background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)'
    },
    statIconGreen: {
      background: 'linear-gradient(90deg, #10b981, #14b8a6)'
    },
    statIconOrange: {
      background: 'linear-gradient(90deg, #f59e0b, #ef4444)'
    },
    statNumber: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    statLabel: {
      color: '#6b7280',
      fontWeight: '500'
    },

    // Featured Projects Section
    featuredSection: {
      padding: '4rem 0',
      background: 'linear-gradient(90deg, #0f172a, #1e3a8a)'
    },
    featuredContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    sectionTitle: {
      textAlign: 'center',
      marginBottom: '3rem'
    },
    sectionTitleText: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '1rem'
    },
    sectionSubtitle: {
      color: '#93c5fd',
      fontSize: '1.125rem'
    },
    projectShowcase: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(8px)',
      borderRadius: '1rem',
      padding: '2rem',
      maxWidth: '32rem',
      margin: '0 auto',
      textAlign: 'center'
    },
    projectBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      padding: '0.5rem 1rem',
      borderRadius: '9999px',
      color: 'white',
      marginBottom: '1.5rem',
      fontWeight: '500'
    },
    projectTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '1rem'
    },
    projectDifficulty: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
      color: '#93c5fd',
      marginBottom: '1.5rem'
    },
    difficultyBadge: {
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px'
    },
    difficultyBeginner: {
      backgroundColor: 'rgba(34, 197, 94, 0.2)',
      color: '#86efac'
    },
    difficultyIntermediate: {
      backgroundColor: 'rgba(234, 179, 8, 0.2)',
      color: '#fde047'
    },
    difficultyAdvanced: {
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
      color: '#fca5a5'
    },
    projectButton: {
      backgroundColor: 'white',
      color: '#2563eb',
      padding: '0.75rem 1.5rem',
      borderRadius: '9999px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      margin: '0 auto',
      transition: 'background-color 0.3s ease',
      ':hover': {
        backgroundColor: '#eff6ff'
      }
    },
    projectDots: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '1.5rem',
      gap: '0.5rem'
    },
    projectDot: {
      width: '0.5rem',
      height: '0.5rem',
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    projectDotActive: {
      backgroundColor: 'white',
      width: '2rem'
    },
    projectDotInactive: {
      backgroundColor: 'rgba(255, 255, 255, 0.5)'
    },

    // Learning Tracks Section
    learningSection: {
      padding: '4rem 0',
      backgroundColor: 'white'
    },
    learningContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    learningGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem'
    },
    learningCard: {
      padding: '2rem',
      borderRadius: '1rem',
      transition: 'all 0.3s ease',
      transform: 'translateY(0)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      ':hover': {
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
        transform: 'translateY(-0.5rem)'
      }
    },
    learningCardBlue: {
      background: 'linear-gradient(135deg, #eff6ff, #e0e7ff)'
    },
    learningCardPurple: {
      background: 'linear-gradient(135deg, #faf5ff, #fce7f3)'
    },
    learningCardGreen: {
      background: 'linear-gradient(135deg, #f0fdf4, #d1fae5)'
    },
    learningIcon: {
      width: '3rem',
      height: '3rem',
      borderRadius: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '1.5rem',
      transition: 'transform 0.3s ease'
    },
    learningIconBlue: {
      backgroundColor: '#3b82f6'
    },
    learningIconPurple: {
      backgroundColor: '#8b5cf6'
    },
    learningIconGreen: {
      backgroundColor: '#10b981'
    },
    learningTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '1rem'
    },
    learningDescription: {
      color: '#6b7280',
      marginBottom: '1.5rem'
    },
    learningTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      marginBottom: '1.5rem'
    },
    learningTag: {
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.875rem'
    },
    learningTagBlue: {
      backgroundColor: '#dbeafe',
      color: '#1e40af'
    },
    learningTagPurple: {
      backgroundColor: '#e9d5ff',
      color: '#7c3aed'
    },
    learningTagGreen: {
      backgroundColor: '#d1fae5',
      color: '#065f46'
    },
    learningButton: {
      color: '#3b82f6',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      transition: 'gap 0.3s ease'
    },
    learningButtonPurple: {
      color: '#8b5cf6'
    },
    learningButtonGreen: {
      color: '#10b981'
    },

    // Events Section
    eventsSection: {
      padding: '4rem 0',
      background: 'linear-gradient(135deg, #f9fafb, #dbeafe)'
    },
    eventsContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    eventsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem'
    },
    eventCard: {
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
      transition: 'box-shadow 0.3s ease',
      ':hover': {
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
      }
    },
    eventHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1rem'
    },
    eventDate: {
      backgroundColor: '#dbeafe',
      color: '#2563eb',
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      fontWeight: '500'
    },
    eventTitle: {
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    eventType: {
      color: '#6b7280',
      fontSize: '0.875rem',
      marginBottom: '1rem'
    },
    eventAttendees: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
      color: '#9ca3af'
    },

    // Achievements Section
    achievementsSection: {
      padding: '4rem 0',
      backgroundColor: 'white'
    },
    achievementsContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    achievementsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem'
    },
    achievementItem: {
      textAlign: 'center',
      transition: 'transform 0.3s ease'
    },
    achievementIcon: {
      background: 'linear-gradient(90deg, #fbbf24, #f97316)',
      width: '4rem',
      height: '4rem',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1.5rem auto',
      transition: 'transform 0.3s ease'
    },
    achievementTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '0.5rem'
    },
    achievementDesc: {
      color: '#6b7280'
    },

    // Community Join Section
    communitySection: {
      padding: '4rem 0',
      background: 'linear-gradient(90deg, #2563eb, #8b5cf6)',
      position: 'relative',
      overflow: 'hidden'
    },
    communityOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    communityContainer: {
      position: 'relative',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
      textAlign: 'center'
    },
    communityBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(8px)',
      padding: '0.5rem 1rem',
      borderRadius: '9999px',
      color: 'white',
      marginBottom: '1.5rem',
      fontWeight: '500'
    },
    communityTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '1.5rem',
      '@media (min-width: 768px)': {
        fontSize: '3rem'
      }
    },
    communityDescription: {
      fontSize: '1.25rem',
      color: '#dbeafe',
      marginBottom: '2rem',
      maxWidth: '32rem',
      margin: '0 auto 2rem auto'
    },
    communityButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      justifyContent: 'center',
      '@media (min-width: 640px)': {
        flexDirection: 'row'
      }
    },
    communityPrimaryButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      justifyContent: 'center',
      backgroundColor: 'white',
      color: '#2563eb',
      padding: '1rem 2rem',
      borderRadius: '9999px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      transform: 'scale(1)',
      ':hover': {
        backgroundColor: '#eff6ff',
        transform: 'scale(1.05)'
      }
    },
    communitySecondaryButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      justifyContent: 'center',
      border: '2px solid white',
      color: 'white',
      backgroundColor: 'transparent',
      padding: '1rem 2rem',
      borderRadius: '9999px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: 'white',
        color: '#2563eb'
      }
    },
    floatingBrain: {
      position: 'absolute',
      top: '2.5rem',
      left: '2.5rem',
      width: '4rem',
      height: '4rem',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'bounce 1s infinite'
    },
    floatingCode: {
      position: 'absolute',
      bottom: '2.5rem',
      right: '2.5rem',
      width: '3rem',
      height: '3rem',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'pulse 2s infinite'
    }
  };

  return (
    <Layout title={"All Clubs Info-"}>
      <div style={styles.mainContainer}>
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContainer}>
          <div style={styles.heroContent}>
            <div style={styles.heroBadge}>
              <Brain style={{ width: '1.25rem', height: '1.25rem' }} />
              <span>Artificial Intelligence & Machine Learning</span>
            </div>
            <h1 style={styles.heroTitle}>
              Unsupervised
              <span style={styles.heroTitleSpan}>
                Learners Club
              </span>
            </h1>
            <p style={styles.heroDescription}>
              Where curiosity meets innovation. Join our community of AI enthusiasts, researchers, and developers shaping the future of technology.
            </p>
            <div style={styles.heroButtons}>
              <button style={styles.primaryButton}
              onClick={() => navigate("/dashboard/user/join-community")}>
                <UserPlus style={{ width: '1.25rem', height: '1.25rem' }} />
                Join Our Club
                <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div style={styles.floatingElement1}></div>
        <div style={styles.floatingElement2}></div>
      </div>

      {/* Stats Section */}
      <div style={styles.statsSection}>
        <div style={styles.statsContainer}>
          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <div style={{...styles.statIcon, ...styles.statIconBlue}}>
                <Users style={{ width: '2rem', height: '2rem', color: 'white' }} />
              </div>
              <div style={styles.statNumber}>{memberCount}+</div>
              <div style={styles.statLabel}>Active Members</div>
            </div>
            <div style={styles.statItem}>
              <div style={{...styles.statIcon, ...styles.statIconGreen}}>
                <Code style={{ width: '2rem', height: '2rem', color: 'white' }} />
              </div>
              <div style={styles.statNumber}>{projectCount}+</div>
              <div style={styles.statLabel}>AI Projects</div>
            </div>
            <div style={styles.statItem}>
              <div style={{...styles.statIcon, ...styles.statIconOrange}}>
                <BookOpen style={{ width: '2rem', height: '2rem', color: 'white' }} />
              </div>
              <div style={styles.statNumber}>{workshopCount}+</div>
              <div style={styles.statLabel}>Workshops</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Project Showcase */}
      <div style={styles.featuredSection}>
        <div style={styles.featuredContainer}>
          <div style={styles.sectionTitle}>
            <h2 style={styles.sectionTitleText}>Featured Projects</h2>
            <p style={styles.sectionSubtitle}>Explore our latest AI/ML innovations</p>
          </div>
          <div style={styles.projectShowcase}>
            <div>
              <div style={styles.projectBadge}>
                <Laptop style={{ width: '1.25rem', height: '1.25rem' }} />
                <span>{featuredProjects[currentProject].tech}</span>
              </div>
              <h3 style={styles.projectTitle}>
                {featuredProjects[currentProject].title}
              </h3>
              <div style={styles.projectDifficulty}>
                <span style={{
                  ...styles.difficultyBadge,
                  ...(featuredProjects[currentProject].difficulty === 'Beginner' ? styles.difficultyBeginner :
                      featuredProjects[currentProject].difficulty === 'Intermediate' ? styles.difficultyIntermediate :
                      styles.difficultyAdvanced)
                }}>
                  {featuredProjects[currentProject].difficulty}
                </span>
              </div>
              <button style={styles.projectButton}>
                <Github style={{ width: '1.25rem', height: '1.25rem' }} />
                View Project
              </button>
            </div>
            <div style={styles.projectDots}>
              {featuredProjects.map((_, i) => (
                <button
                  key={i}
                  style={{
                    ...styles.projectDot,
                    ...(i === currentProject ? styles.projectDotActive : styles.projectDotInactive)
                  }}
                  onClick={() => setCurrentProject(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Learning Tracks */}
      <div style={styles.learningSection}>
        <div style={styles.learningContainer}>
          <div style={styles.sectionTitle}>
            <h2 style={{...styles.sectionTitleText, color: '#1f2937'}}>Learning Tracks</h2>
            <p style={{...styles.sectionSubtitle, color: '#6b7280'}}>Choose your path in AI/ML mastery</p>
          </div>
          <div style={styles.learningGrid}>
            <div style={{...styles.learningCard, ...styles.learningCardBlue}}>
              <div style={{...styles.learningIcon, ...styles.learningIconBlue}}>
                <Brain style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
              </div>
              <h3 style={styles.learningTitle}>Machine Learning</h3>
              <p style={styles.learningDescription}>Master algorithms, statistics, and model building from scratch to deployment.</p>
              <div style={styles.learningTags}>
                <span style={{...styles.learningTag, ...styles.learningTagBlue}}>Python</span>
                <span style={{...styles.learningTag, ...styles.learningTagBlue}}>Scikit-learn</span>
                <span style={{...styles.learningTag, ...styles.learningTagBlue}}>Pandas</span>
                </div>
                <button style={styles.learningButton}>
                <ChevronRight style={{ width: '1.25rem', height: '1.25rem' }} />
                start learning with us!
              </button>
              </div>

              {/* Deep Learning Card */}
               <div style={{ ...styles.learningCard, ...styles.learningCardPurple }}>
                  <div style={{ ...styles.learningIcon, ...styles.learningIconPurple }}>
                    <Zap style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                  </div>
                    <h3 style={styles.learningTitle}>Deep Learning</h3>
                    <p style={styles.learningDescription}>
                     Dive into neural networks, CNNs, RNNs, and cutting-edge architectures.
                    </p>
                 <div style={styles.learningTags}>
                    <span style={{ ...styles.learningTag, ...styles.learningTagPurple }}>TensorFlow</span>
                    <span style={{ ...styles.learningTag, ...styles.learningTagPurple }}>PyTorch</span>
                    <span style={{ ...styles.learningTag, ...styles.learningTagPurple }}>Keras</span>
                </div>
                 <button style={{ ...styles.learningButton, ...styles.learningButtonPurple }}>
                     <ChevronRight style={{ width: '1.25rem', height: '1.25rem' }} />
                      Start learning with us!
                          </button>
                        </div>

{/* Data Science Card */}
<div style={{ ...styles.learningCard, ...styles.learningCardGreen }}>
  <div style={{ ...styles.learningIcon, ...styles.learningIconGreen }}>
    <Database style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
  </div>
  <h3 style={styles.learningTitle}>Data Science</h3>
  <p style={styles.learningDescription}>
    Extract insights from data with statistics, visualization, and analysis.
  </p>
  <div style={styles.learningTags}>
    <span style={{ ...styles.learningTag, ...styles.learningTagGreen }}>R</span>
    <span style={{ ...styles.learningTag, ...styles.learningTagGreen }}>Tableau</span>
    <span style={{ ...styles.learningTag, ...styles.learningTagGreen }}>SQL</span>
  </div>
  <button style={{ ...styles.learningButton, ...styles.learningButtonGreen }}>
    <ChevronRight style={{ width: '1.25rem', height: '1.25rem' }} />
    Start learning with us!
  </button>
</div>
</div>
</div>

{/* Upcoming Events */}
<div style={styles.eventsSection}>
  <div style={styles.eventsContainer}>
    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
      <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
        Organized Events
      </h2>
    </div>
    <div style={styles.eventsGrid}>
      {upcomingEvents.map((event, index) => (
        <div key={index} style={styles.eventCard}>
          <div style={styles.eventHeader}>
            <div style={styles.eventDate}>{event.date}</div>
            <Calendar style={{ width: '1.25rem', height: '1.25rem', color: '#9ca3af' }} />
          </div>
          <h3 style={styles.eventTitle}>{event.title}</h3>
          <p style={styles.eventType}>{event.type}</p>
          <div style={styles.eventAttendees}>
            <Users style={{ width: '1rem', height: '1rem' }} />
            <span>{event.attendees} attending</span>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

{/* Achievements */}
<div style={styles.achievementsSection}>
  <div style={styles.achievementsContainer}>
    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
      <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
        Our Achievements
      </h2>
      <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
        Proud moments that define our journey
      </p>
    </div>

    <div style={styles.achievementsGrid}>
      {achievements.map((achievement, index) => {
        const Icon = achievement.icon;
        return (
          <div key={index} style={styles.achievementItem}>
            <div style={styles.achievementIcon}>
              <Icon style={{ width: '2rem', height: '2rem', color: 'white' }} />
            </div>
            <h3 style={styles.achievementTitle}>{achievement.title}</h3>
            <p style={styles.achievementDesc}>{achievement.desc}</p>
          </div>
        );
      })}
    </div>
  </div>
</div>

{/* Community Join Section */}
<div style={styles.communitySection}>
  <div style={styles.communityOverlay}></div>

  <div style={styles.communityContainer}>
    <div style={styles.communityBadge}>
      <Lightbulb style={{ width: '1.25rem', height: '1.25rem' }} />
      <span>Ready to innovate?</span>
    </div>

    <h2 style={styles.communityTitle}>Join Our AI/ML Community</h2>

    <p style={styles.communityDescription}>
      Connect with passionate learners, work on cutting-edge projects, and shape the future of artificial intelligence together.
    </p>

    <div style={styles.communityButtons}>
      <button style={styles.communityPrimaryButton}
      onClick={() => navigate("/dashboard/user/join-community")}>
        <Users style={{ width: '1.25rem', height: '1.25rem' }} />
        Join Club
        <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
      </button>

      <button style={styles.communitySecondaryButton}
            onClick={() => window.open(
      "https://docs.google.com/forms/d/1G4yV44kJY6u5zgq_i-6jW5vx4H-R1j5tk6UC9LL8GK8",
      "_blank"
    )}
      >
        <Code2 style={{ width: '1.25rem', height: '1.25rem' }} />
        Share Your Skill's
      </button>

      <button style={styles.communitySecondaryButton}
            onClick={() => window.open(
      "https://docs.google.com/forms/d/1p7RQMm45MaFNKAjVGhfCp4KckbM39fgTow7uLbsj3eY",
      "_blank"
    )}
      >
        <Coffee style={{ width: '1.25rem', height: '1.25rem' }} />
        Contact for Sponsering
      </button>
    </div>
  </div>

  {/* Floating Icons */}
  <div style={styles.floatingBrain}>
    <Brain style={{ width: '2rem', height: '2rem', color: 'white' }} />
  </div>

  <div style={styles.floatingCode}>
    <Code style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
  </div>
</div>
</div>
</div>
    </Layout>
  );
};
export default HomePage;
