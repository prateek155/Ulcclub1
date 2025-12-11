import React, { useEffect, useState } from 'react';
import { Users, Code, BookOpen, Calendar, Trophy, MonitorSmartphone, ArrowRight, Laptop, Puzzle, Github, TrendingUp,  Lightbulb, Code2, ChevronDown, Target, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [currentProject, setCurrentProject] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [projectCount, setProjectCount] = useState(0);
  const [workshopCount, setWorkshopCount] = useState(0);
  const [memberCount, setMemberCount] = useState(0);
  const [openFAQ, setOpenFAQ] = useState(null);

  // Animation counter effect
  useEffect(() => {
    setIsVisible(true);
    
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
    { title: "Flashy", tech: "TensorFlow", difficulty: "Advanced", github:"https://github.com/arpitingle/flashy" },
    { title: "Lovecraft-gpt", tech: "Python", difficulty: "Intermediate", github:"https://github.com/arpitingle/lovecraft-gpt" },
    { title: "Mnist-web", tech: "OpenCV", difficulty: "Advanced", github:"https://github.com/arpitingle/mnist-web" },
    { title: "Emsum", tech: "Scikit-learn", difficulty: "Beginner", github:"https://github.com/arpitingle/emsum" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % featuredProjects.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const upcomingEvents = [
    { date: "Sept 5", title: "ML Guest Lecture", type: "Workshop", attendees: 120 },
    { date: "Nov 7 & 8 ", title: "Hackathon", type: "Coding Competition", attendees: 450 },
    { date: "march 14", title: "IOT Devise Discusion", type: "Workshop", attendees: 80 }
  ];

  const achievements = [
    { icon: Trophy, title: "Best AI Project", desc: "Winner at TechFest 2025" },
    { icon: TrendingUp, title: "Industry Partnerships", desc: "Collaborating with 5+ companies" },
    { icon: Target, title: "100% Success Rate", desc: "All members placed in top companies" }
  ];

  const faqData = [
    {
      question: "Why We Join ULC ?",
      answer: " Join us to create new developments and start-up Ideas."
    },
    {
      question: "Who can use this portal ?",
      answer: "Club Member's and faculty advisor"
    },
    {
      question: "How can we join the club ?",
      answer: "Those who join the club they just submit hsi details and come for interview", 
    },
    {
      question: "If any member will create something then club will support him ?",
      answer: "Yes, we support our members and there ideas also to make come true."
    },
  ];

  const testimonials = [
    {
      name: "Sarthak Thakur",
      role: "President",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      text: "SOCSA transformed my understanding of AI. The hands-on projects and mentorship helped me land my dream internship!"
    },
    {
      name: "Prateek Agrawal",
      role: "General Secretary",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "The community here is incredible. I've learned more in 6 months than I did in 2 years of self-study."
    },
    {
      name: "Amit Mishra & Pradeep Tiwari",
      role: "Faculty Adviser / Guider",
      company: "AI Solutions",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "From zero coding experience to building neural networks - SOCSA made it possible with their structured learning approach."
    }
  ];

  const handleFAQToggle = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const styles = {
    // Main container with dark theme - REMOVED ALL MARGINS AND PADDING
    mainContainer: {
      backgroundColor: '#0a0a0a',
      color: '#ffffff',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      margin: 0,
      padding: 0,
      width: '100vw',
      boxSizing: 'border-box',
    },

    // Hero Section
    heroSection: {
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      margin: 0,
      padding: 0
    },
    heroOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
    },
    heroContainer: {
      position: 'relative',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '4rem 1rem',
      textAlign: 'center',
      zIndex: 10
    },
    heroContent: {
      transform: isVisible ? 'translateY(0)' : 'translateY(3rem)',
      opacity: isVisible ? 1 : 0,
      transition: 'all 1.2s ease-out'
    },
    heroBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15))',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '0.75rem 1.5rem',
      borderRadius: '50px',
      color: '#e0e7ff',
      marginBottom: '2rem',
      fontWeight: '500',
      fontSize: '0.95rem'
    },
    heroTitle: {
      fontSize: 'clamp(3rem, 8vw, 6rem)',
      fontWeight: '800',
      marginBottom: '1.5rem',
      lineHeight: '1.1',
      background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent'
    },
    heroTitleSpan: {
      display: 'block',
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent'
    },
    heroDescription: {
      fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
      color: '#94a3b8',
      marginBottom: '3rem',
      maxWidth: '600px',
      margin: '0 auto 3rem auto',
      lineHeight: '1.7'
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
      gap: '0.75rem',
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      color: 'white',
      padding: '1rem 2.5rem',
      borderRadius: '50px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '1.05rem',
      boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
      transform: 'scale(1)',
    },
    secondaryButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      color: '#e0e7ff',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      padding: '1rem 2.5rem',
      borderRadius: '50px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '1.05rem'
    },
    

    // Floating particles
    floatingParticle: {
      position: 'absolute',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.6), rgba(147, 51, 234, 0.6))',
      filter: 'blur(1px)',
      animation: 'float 6s ease-in-out infinite'
    },
    particle1: {
      top: '20%',
      left: '10%',
      width: '4px',
      height: '4px',
      animationDelay: '0s'
    },
    particle2: {
      top: '40%',
      right: '15%',
      width: '6px',
      height: '6px',
      animationDelay: '2s'
    },
    particle3: {
      bottom: '30%',
      left: '20%',
      width: '3px',
      height: '3px',
      animationDelay: '4s'
    },

    // Stats Section
    statsSection: {
      padding: '5rem 0',
      background: 'linear-gradient(180deg, #111827 0%, #1f2937 100%)',
      position: 'relative',
      margin: 0
    },
    statsContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '2rem'
    },
    statItem: {
      textAlign: 'center',
      padding: '2rem',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    statIcon: {
      width: '4rem',
      height: '4rem',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1.5rem auto',
      transition: 'transform 0.3s ease'
    },
    statIconBlue: {
      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
    },
    statIconGreen: {
      background: 'linear-gradient(135deg, #10b981, #047857)'
    },
    statIconOrange: {
      background: 'linear-gradient(135deg, #f59e0b, #d97706)'
    },
    statNumber: {
      fontSize: '3rem',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #ffffff, #e0e7ff)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
      marginBottom: '0.5rem'
    },
    statLabel: {
      color: '#94a3b8',
      fontWeight: '500',
      fontSize: '1.1rem'
    },

    // Featured Projects Section
    featuredSection: {
      padding: '5rem 0',
      background: 'radial-gradient(ellipse at center, #1e293b 0%, #0f172a 100%)',
      position: 'relative',
      margin: 0
    },
    featuredContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    sectionTitle: {
      textAlign: 'center',
      marginBottom: '4rem'
    },
    sectionTitleText: {
      fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #ffffff, #94a3b8)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
      marginBottom: '1rem'
    },
    sectionSubtitle: {
      color: '#64748b',
      fontSize: '1.2rem',
      fontWeight: '500'
    },
    projectShowcase: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '24px',
      padding: '3rem',
      maxWidth: '500px',
      margin: '0 auto',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    projectBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '0.75rem 1.5rem',
      borderRadius: '50px',
      color: '#e0e7ff',
      marginBottom: '2rem',
      fontWeight: '500'
    },
    projectTitle: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#ffffff',
      marginBottom: '1rem'
    },
    projectDifficulty: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      fontSize: '0.9rem',
      color: '#94a3b8',
      marginBottom: '2rem'
    },
    difficultyBadge: {
      padding: '0.4rem 1rem',
      borderRadius: '20px',
      fontWeight: '600',
      fontSize: '0.85rem'
    },
    difficultyBeginner: {
      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(22, 163, 74, 0.2))',
      color: '#4ade80',
      border: '1px solid rgba(34, 197, 94, 0.3)'
    },
    difficultyIntermediate: {
      background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.2), rgba(202, 138, 4, 0.2))',
      color: '#facc15',
      border: '1px solid rgba(234, 179, 8, 0.3)'
    },
    difficultyAdvanced: {
      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2))',
      color: '#f87171',
      border: '1px solid rgba(239, 68, 68, 0.3)'
    },
    projectButton: {
      background: 'linear-gradient(135deg, #ffffff, #f1f5f9)',
      color: '#1e293b',
      padding: '1rem 2rem',
      borderRadius: '50px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.75rem',
      transition: 'all 0.3s ease',
      fontSize: '1rem',
      textDecoration: 'none',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
    },
    projectDots: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '2rem',
      gap: '0.75rem'
    },
    projectDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    projectDotActive: {
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      width: '32px'
    },
    projectDotInactive: {
      backgroundColor: 'rgba(255, 255, 255, 0.3)'
    },

    // Learning Tracks Section
    learningSection: {
      padding: '5rem 0',
      background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
      margin: 0
    },
    learningContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    learningGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '2rem'
    },
    learningCard: {
      padding: '2.5rem',
      borderRadius: '24px',
      transition: 'all 0.3s ease',
      transform: 'translateY(0)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    },
    learningCardBlue: {
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(29, 78, 216, 0.05))'
    },
    learningCardPurple: {
      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(109, 40, 217, 0.05))'
    },
    learningCardGreen: {
      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(4, 120, 87, 0.05))'
    },
    learningIcon: {
      width: '4rem',
      height: '4rem',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '1.5rem',
      transition: 'transform 0.3s ease'
    },
    learningIconBlue: {
      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
    },
    learningIconPurple: {
      background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)'
    },
    learningIconGreen: {
      background: 'linear-gradient(135deg, #10b981, #047857)'
    },
    learningTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#ffffff',
      marginBottom: '1rem'
    },
    learningDescription: {
      color: '#94a3b8',
      marginBottom: '1.5rem',
      lineHeight: '1.6'
    },
    learningTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      marginBottom: '2rem'
    },
    learningTag: {
      padding: '0.4rem 1rem',
      borderRadius: '20px',
      fontSize: '0.85rem',
      fontWeight: '500',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    learningTagBlue: {
      background: 'rgba(59, 130, 246, 0.1)',
      color: '#93c5fd'
    },
    learningTagPurple: {
      background: 'rgba(139, 92, 246, 0.1)',
      color: '#c4b5fd'
    },
    learningTagGreen: {
      background: 'rgba(16, 185, 129, 0.1)',
      color: '#86efac'
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
      transition: 'all 0.3s ease',
      fontSize: '1rem'
    },
    learningButtonPurple: {
      color: '#8b5cf6'
    },
    learningButtonGreen: {
      color: '#10b981'
    },

    // Events Section
    eventsSection: {
      padding: '5rem 0',
      background: 'radial-gradient(ellipse at center, #1e293b 0%, #111827 100%)',
      margin: 0
    },
    eventsContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    eventsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem'
    },
    eventCard: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '2rem',
      borderRadius: '20px',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    eventHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1rem'
    },
    eventDate: {
      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      fontSize: '0.9rem',
      fontWeight: '600'
    },
    eventTitle: {
      fontWeight: '700',
      color: '#ffffff',
      marginBottom: '0.5rem',
      fontSize: '1.3rem'
    },
    eventType: {
      color: '#94a3b8',
      fontSize: '1rem',
      marginBottom: '1rem'
    },
    eventAttendees: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.9rem',
      color: '#64748b',
      fontWeight: '500'
    },

    // Testimonials Section
    testimonialsSection: {
      padding: '5rem 0',
      background: 'linear-gradient(180deg, #111827 0%, #0f172a 100%)',
      margin: 0
    },
    testimonialsContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    testimonialsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '2rem'
    },
    testimonialCard: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '2.5rem',
      borderRadius: '24px',
      transition: 'all 0.3s ease'
    },
    testimonialText: {
      color: '#e2e8f0',
      fontSize: '1.1rem',
      lineHeight: '1.6',
      marginBottom: '2rem',
      fontStyle: 'italic'
    },
    testimonialAuthor: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    testimonialImage: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '2px solid rgba(255, 255, 255, 0.2)'
    },
    testimonialInfo: {
      flex: 1
    },
    testimonialName: {
      color: '#ffffff',
      fontWeight: '600',
      fontSize: '1.1rem',
      marginBottom: '0.25rem'
    },
    testimonialRole: {
      color: '#94a3b8',
      fontSize: '0.9rem'
    },

    // FAQ Section
    faqSection: {
      padding: '5rem 0',
      background: 'radial-gradient(ellipse at center, #1e293b 0%, #0f172a 100%)',
      margin: 0
    },
    faqContainer: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    faqItem: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      marginBottom: '1rem',
      overflow: 'hidden',
      transition: 'all 0.3s ease'
    },
    faqQuestion: {
      padding: '1.5rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: '#ffffff',
      fontWeight: '600',
      fontSize: '1.1rem',
      transition: 'all 0.3s ease'
    },
    faqAnswer: {
      padding: '0 1.5rem 1.5rem',
      color: '#94a3b8',
      lineHeight: '1.6',
      fontSize: '1rem'
    },
    faqIcon: {
      transition: 'transform 0.3s ease'
    },

    // Achievements Section
    achievementsSection: {
      padding: '5rem 0',
      background: 'linear-gradient(180deg, #0f172a 0%, #111827 100%)',
      margin: 0
    },
    achievementsContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    achievementsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '2rem'
    },
    achievementItem: {
      textAlign: 'center',
      padding: '2rem',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    achievementIcon: {
      background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
      width: '4rem',
      height: '4rem',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1.5rem auto',
      transition: 'transform 0.3s ease'
    },
    achievementTitle: {
      fontSize: '1.3rem',
      fontWeight: '700',
      color: '#ffffff',
      marginBottom: '0.75rem'
    },
    achievementDesc: {
      color: '#94a3b8',
      fontSize: '1rem',
      lineHeight: '1.5'
    },

    // Community Join Section
    communitySection: {
      padding: '5rem 0',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      position: 'relative',
      overflow: 'hidden',
      margin: 0
    },
    communityOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)'
    },
    communityContainer: {
      position: 'relative',
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '0 1rem',
      textAlign: 'center',
      zIndex: 10
    },
    communityBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '0.75rem 1.5rem',
      borderRadius: '50px',
      color: '#e0e7ff',
      marginBottom: '2rem',
      fontWeight: '500'
    },
    communityTitle: {
      fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #ffffff, #e0e7ff)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
      marginBottom: '2rem',
      lineHeight: '1.2'
    },
    communityDescription: {
      fontSize: '1.3rem',
      color: '#cbd5e1',
      marginBottom: '3rem',
      maxWidth: '600px',
      margin: '0 auto 3rem auto',
      lineHeight: '1.6'
    },
    communityButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      justifyContent: 'center',
      alignItems: 'center',
      '@media (min-width: 640px)': {
        flexDirection: 'row'
      }
    },
    communityPrimaryButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #ffffff, #f1f5f9)',
      color: '#1e293b',
      padding: '1.2rem 2.5rem',
      borderRadius: '50px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '1.05rem',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      textDecoration: 'none'
    },
    communitySecondaryButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      justifyContent: 'center',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      color: '#e0e7ff',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
      backdropFilter: 'blur(10px)',
      padding: '1.2rem 2.5rem',
      borderRadius: '50px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '1.05rem',
      textDecoration: 'none'
    },

    // Contact Section
    contactSection: {
      padding: '5rem 0',
      background: 'linear-gradient(180deg, #111827 0%, #0f172a 100%)',
      margin: 0
    },
    contactContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    contactGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem'
    },
    contactCard: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '2rem',
      borderRadius: '20px',
      textAlign: 'center',
      transition: 'all 0.3s ease'
    },
    contactIcon: {
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      width: '3.5rem',
      height: '3.5rem',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1.5rem auto'
    },
    contactTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#ffffff',
      marginBottom: '0.75rem'
    },
    contactInfo: {
      color: '#94a3b8',
      fontSize: '1rem'
    },

    // Global styles for animations
    '@keyframes float': {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-20px)' }
    },
    '@keyframes pulse': {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0.5 }
    },
    '@keyframes bounce': {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-10px)' }
    }
  };

  const globalStyles = `
    /* Reset all margins and padding */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    /* Keep page scrollable but visually hide native scrollbars (modern browsers + Firefox) */
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      overflow-x: hidden;
      overflow-y: auto;           /* keep vertical scrolling */
      scrollbar-width: none;      /* Firefox */
      -ms-overflow-style: none;   /* IE 10+ */
    }

    /* WebKit scrollbar hide */
    html::-webkit-scrollbar,
    body::-webkit-scrollbar,
    .main-container::-webkit-scrollbar,
    .hero-section::-webkit-scrollbar,
    .stats-section::-webkit-scrollbar,
    .featured-section::-webkit-scrollbar,
    .learning-section::-webkit-scrollbar,
    .events-section::-webkit-scrollbar,
    .testimonials-section::-webkit-scrollbar,
    .achievements-section::-webkit-scrollbar,
    .faq-section::-webkit-scrollbar,
    .contact-section::-webkit-scrollbar,
    .community-section::-webkit-scrollbar {
      width: 0;
      height: 0;
      display: none;
    }

    /* Optional: hide sidebar scrollbar if you have one */
    .sidebar-section {
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .sidebar-section::-webkit-scrollbar { display: none; width: 0; height: 0; }

    /* Reduce global header height (target common header selectors used by Layout) */
    header,
    .site-header,
    .navbar,
    .main-header,
    .header,
    .topbar {
      height: 56px !important;
      min-height: 56px !important;
      padding: 0 16px !important;
      display: flex !important;
      align-items: center !important;
      background-clip: padding-box !important;
    }

    header > .container,
    .site-header .container,
    .navbar .container {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }

    header .logo,
    .site-header .logo,
    .navbar .brand,
    .header .brand {
      max-height: 40px;
      line-height: 40px;
      overflow: hidden;
    }

    header nav a,
    .navbar a,
    .site-header a,
    .main-header a {
      padding-top: 8px !important;
      padding-bottom: 8px !important;
      font-size: 14px !important;
    }

    /* Keep focus outlines accessible */
    button:focus,
    a:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }

    /* Existing keyframes and hover utilities */
    @keyframes float { 0%,100%{transform:translateY(0);}50%{transform:translateY(-20px);} }
    @keyframes pulse { 0%,100%{opacity:1;}50%{opacity:0.5;} }
    @keyframes bounce { 0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);} }

    .stat-item:hover { transform: translateY(-5px); }
    .learning-card:hover { transform: translateY(-10px); box-shadow: 0 25px 50px rgba(59,130,246,0.15); }
    .event-card:hover { transform: translateY(-5px); }
    .testimonial-card:hover { transform: translateY(-5px); }
    .achievement-item:hover { transform: translateY(-5px); }
    .achievement-item:hover .achievement-icon { transform: scale(1.1); }
    .primary-button:hover { transform: scale(1.05); box-shadow: 0 15px 40px rgba(59,130,246,0.4); }
    .secondary-button:hover { background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.4); }
    .learning-button:hover { gap: 1rem; }
    .project-button:hover { transform: translateY(-2px); box-shadow: 0 15px 40px rgba(0,0,0,0.3); }
    .community-primary-button:hover { transform: scale(1.05); box-shadow: 0 15px 40px rgba(0,0,0,0.3); }
    .community-secondary-button:hover { background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.5); }
    .contact-card:hover { transform: translateY(-5px); }
    .faq-item:hover { background: linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04)); }
    .faq-question:hover { color: #e0e7ff; }

    /* Print: show scrollbars normally for printing if necessary */
    @media print {
      html, body { overflow: visible !important; }
      html::-webkit-scrollbar, body::-webkit-scrollbar { display: block; }
    }
  `;

  return (
    <>
      <Layout title={"All Clubs Info-"}>
        <style>{globalStyles}</style>
        <div className="main-container" style={styles.mainContainer}>
          {/* Hero Section */}
          <div className="hero-section" style={styles.heroSection}>
            <div style={styles.heroOverlay}></div>
            
            {/* Floating particles */}
            <div style={{...styles.floatingParticle, ...styles.particle1}}></div>
            <div style={{...styles.floatingParticle, ...styles.particle2}}></div>
            <div style={{...styles.floatingParticle, ...styles.particle3}}></div>
            
            <div style={styles.heroContainer}>
              <div style={styles.heroContent}>
                <h1 style={styles.heroTitle}>
                  ULC
                  <span style={styles.heroTitleSpan}>
                    Unsupervised Learner's Club
                  </span>
                </h1>
                <p style={styles.heroDescription}>
                  Where curiosity meets innovation. Join our community of AI enthusiasts, researchers, and developers shaping the future of technology through cutting-edge projects and collaborative learning.
                </p>
                
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div style={styles.statsSection}>
            <div style={styles.statsContainer}>
              <div style={styles.statsGrid}>
                <div className="stat-item" style={styles.statItem}>
                  <div style={{...styles.statIcon, ...styles.statIconBlue}}>
                    <Users style={{ width: '2rem', height: '2rem', color: 'white' }} />
                  </div>
                  <div style={styles.statNumber}>{memberCount}+</div>
                  <div style={styles.statLabel}>Active Members</div>
                </div>
                <div className="stat-item" style={styles.statItem}>
                  <div style={{...styles.statIcon, ...styles.statIconGreen}}>
                    <Code style={{ width: '2rem', height: '2rem', color: 'white' }} />
                  </div>
                  <div style={styles.statNumber}>{projectCount}+</div>
                  <div style={styles.statLabel}>AI Projects</div>
                </div>
                <div className="stat-item" style={styles.statItem}>
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
                <a 
                  href={featuredProjects[currentProject].github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-button"
                  style={styles.projectButton}
                >
                  <Github style={{ width: '1.25rem', height: '1.25rem' }} />
                  View Project
                </a>
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
                <h2 style={styles.sectionTitleText}>Skill's</h2>
              </div>
              <div style={styles.learningGrid}>
                <div className="learning-card" style={{...styles.learningCard, ...styles.learningCardBlue}}>
                  <div style={{...styles.learningIcon, ...styles.learningIconBlue}}>
                    <TrendingUp style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                  </div>
                  <h3 style={styles.learningTitle}>Stsrt-up</h3>
                  <p style={styles.learningDescription}>
                    Master athletic skills, team coordination, and competitive strategies from amateur to professional level.
                  </p>
                  <div style={styles.learningTags}>
                    <span style={{...styles.learningTag, ...styles.learningTagBlue}}>Swimming</span>
                    <span style={{...styles.learningTag, ...styles.learningTagBlue}}>Basketball</span>
                    <span style={{...styles.learningTag, ...styles.learningTagBlue}}>E-sports</span>
                  </div>
                </div>

                <div className="learning-card" style={{...styles.learningCard, ...styles.learningCardPurple}}>
                  <div style={{...styles.learningIcon, ...styles.learningIconPurple}}>
                    <MonitorSmartphone style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                  </div>
                  <h3 style={styles.learningTitle}>Web-development</h3>
                  <p style={styles.learningDescription}>
                    Dive into performing arts, cultural expressions, and creative showcases that celebrate diversity.
                  </p>
                  <div style={styles.learningTags}>
                    <span style={{...styles.learningTag, ...styles.learningTagPurple}}>Dancing</span>
                    <span style={{...styles.learningTag, ...styles.learningTagPurple}}>Singing</span>
                    <span style={{...styles.learningTag, ...styles.learningTagPurple}}>Drama</span>
                  </div>
                </div>

                <div className="learning-card" style={{...styles.learningCard, ...styles.learningCardGreen}}>
                  <div style={{...styles.learningIcon, ...styles.learningIconGreen}}>
                    <Puzzle style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                  </div>
                  <h3 style={styles.learningTitle}>Mini-Project's</h3>
                  <p style={styles.learningDescription}>
                    Extract insights from creativity with visual design, UX principles, and artistic innovation.
                  </p>
                  <div style={styles.learningTags}>
                    <span style={{...styles.learningTag, ...styles.learningTagGreen}}>UI/UX</span>
                    <span style={{...styles.learningTag, ...styles.learningTagGreen}}>Graphics</span>
                    <span style={{...styles.learningTag, ...styles.learningTagGreen}}>Branding</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div style={styles.eventsSection}>
            <div style={styles.eventsContainer}>
              <div style={styles.sectionTitle}>
                <h2 style={styles.sectionTitleText}>Organized Events</h2>
                <p style={styles.sectionSubtitle}>Join us for more activities</p>
              </div>
              <div style={styles.eventsGrid}>
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="event-card" style={styles.eventCard}>
                    <div style={styles.eventHeader}>
                      <div style={styles.eventDate}>{event.date}</div>
                      <Calendar style={{ width: '1.25rem', height: '1.25rem', color: '#64748b' }} />
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

          {/* Testimonials Section */}
          <div style={styles.testimonialsSection}>
            <div style={styles.testimonialsContainer}>
              <div style={styles.sectionTitle}>
                <h2 style={styles.sectionTitleText}>What Our Members Say</h2>
                <p style={styles.sectionSubtitle}>Success stories from our community</p>
              </div>
              <div style={styles.testimonialsGrid}>
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="testimonial-card" style={styles.testimonialCard}>
                    <div style={styles.testimonialText}>
                      "{testimonial.text}"
                    </div>
                    <div style={styles.testimonialAuthor}>
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        style={styles.testimonialImage}
                      />
                      <div style={styles.testimonialInfo}>
                        <div style={styles.testimonialName}>{testimonial.name}</div>
                        <div style={styles.testimonialRole}>
                          {testimonial.role} at {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div style={styles.achievementsSection}>
            <div style={styles.achievementsContainer}>
              <div style={styles.sectionTitle}>
                <h2 style={styles.sectionTitleText}>Our Achievements</h2>
                <p style={styles.sectionSubtitle}>Proud moments that define our journey</p>
              </div>
              <div style={styles.achievementsGrid}>
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className="achievement-item" style={styles.achievementItem}>
                      <div className="achievement-icon" style={styles.achievementIcon}>
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

          {/* FAQ Section */}
          <div style={styles.faqSection}>
            <div style={styles.faqContainer}>
              <div style={styles.sectionTitle}>
                <h2 style={styles.sectionTitleText}>Frequently Asked Questions</h2>
                <p style={styles.sectionSubtitle}>Everything you need to know about SOCSA</p>
              </div>
              <div>
                {faqData.map((faq, index) => (
                  <div key={index} className="faq-item" style={styles.faqItem}>
                    <div 
                      className="faq-question"
                      style={styles.faqQuestion}
                      onClick={() => handleFAQToggle(index)}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown 
                        className="faq-icon"
                        style={{
                          ...styles.faqIcon,
                          transform: openFAQ === index ? 'rotate(180deg)' : 'rotate(0deg)'
                        }} 
                      />
                    </div>
                    {openFAQ === index && (
                      <div style={styles.faqAnswer}>
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div style={styles.contactSection}>
            <div style={styles.contactContainer}>
              <div style={styles.sectionTitle}>
                <h2 style={styles.sectionTitleText}>Get In Touch</h2>
                <p style={styles.sectionSubtitle}>Ready to start your journey with us?</p>
              </div>
              <div style={styles.contactGrid}>
                <div className="contact-card" style={styles.contactCard}>
                  <div style={styles.contactIcon}>
                    <Mail style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                  </div>
                  <h3 style={styles.contactTitle}>Email Us</h3>
                  <p style={styles.contactInfo}>unsupervisedLearnersclub@mitwpu.edu.in</p>
                </div>
                <div className="contact-card" style={styles.contactCard}>
                  <div style={styles.contactIcon}>
                    <Phone style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                  </div>
                  <h3 style={styles.contactTitle}>Call Us</h3>
                  <p style={styles.contactInfo}>7627073230 / 9175185122</p>
                </div>
                <div className="contact-card" style={styles.contactCard}>
                  <div style={styles.contactIcon}>
                    <MapPin style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                  </div>
                  <h3 style={styles.contactTitle}>Visit Us</h3>
                  <p style={styles.contactInfo}>vyas building MIT WPU Campus, pune</p>
                </div>
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
                <button 
                  className="community-primary-button"
                  style={styles.communityPrimaryButton}
                  onClick={() => navigate('Navigate to join community')}
                >
                  <Users style={{ width: '1.25rem', height: '1.25rem' }} />
                  Join Club
                  <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
                </button>
                <a
                  className="community-secondary-button"
                  style={styles.communitySecondaryButton}
                  href="https://docs.google.com/forms/d/1G4yV44kJY6u5zgq_i-6jW5vx4H-R1j5tk6UC9LL8GK8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Code2 style={{ width: '1.25rem', height: '1.25rem' }} />
                  Share Your Skills
                  <ExternalLink style={{ width: '1rem', height: '1rem' }} />
                </a> 
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
