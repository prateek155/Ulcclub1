import React, { useEffect, useState } from 'react';
import { Users, Code, BookOpen, Calendar, Trophy, Music, ArrowRight, Laptop, Brush, Github, ChevronRight, TrendingUp, Lightbulb, Code2, ChevronDown, Award, Target, Mail, Phone, MapPin, ExternalLink, FileCode } from 'lucide-react';
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
    { title: "Flashy", tech: "TensorFlow", difficulty: "Advanced", github: "https://github.com/arpitingle/flashy" },
    { title: "Lovecraft-gpt", tech: "Python", difficulty: "Intermediate", github: "https://github.com/arpitingle/lovecraft-gpt" },
    { title: "Mnist-web", tech: "OpenCV", difficulty: "Advanced", github: "https://github.com/arpitingle/mnist-web" },
    { title: "Emsum", tech: "Scikit-learn", difficulty: "Beginner", github: "https://github.com/arpitingle/emsum" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % featuredProjects.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const upcomingEvents = [
    { date: "Sept 5", title: "Teachers Day", type: "Celebration", attendees: 74 },
    { date: "Sept 16", title: "Codearena", type: "Coding Competition", attendees: 89 },
    { date: "Sept 25", title: "AI Workshop", type: "Learning Session", attendees: 45 },
    { date: "Oct 3", title: "Hackathon", type: "Competition", attendees: 120 }
  ];

  const achievements = [
    { icon: Trophy, title: "Best AI Project", desc: "Winner at TechFest 2025" },
    { icon: TrendingUp, title: "Industry Partnerships", desc: "Collaborating with 5+ companies" },
    { icon: Award, title: "Excellence Award", desc: "Recognized by IEEE for innovation" },
    { icon: Target, title: "100% Success Rate", desc: "All members placed in top companies" }
  ];

  const faqData = [
    {
      question: "What is Socsa?",
      answer: "SOCSA it is the official student body of our department. We organize cultural, technical, and fun events. SOCSA is the bridge between students and teachers, built to ensure maximum involvement and growth."
    },
    {
      question: "what does socsa do? ",
      answer: "We conduct workshops, hackathons, seminars, cultural fests, networking events, skill sessions, and social initiatives that enhance both technical and personal development. We help students connect with faculty to resolve issues, and provide an open forum for ideas, discussions, and participation."
    },
    {
      question: "Why should i join in SOCSA actuvities?",
      answer: `1) It is a platform to showcase your skills,
               2) Opportunities to network with friends, seniors, and industry experts,
               3) Hands-on experience beyond the classroom,
               4) A chance to take leadership roles and boost your resume.`
    },
    {
      question: "Does socsa help with placements and internships?",
      answer: "Yes, indirectly we do! Our skill sessions, networking events, and industry talks give you exposure and help you build the confidence and expertise needed for placements and internships."
    },
    {
      question: "Can I pitch my own ideas to SOCSA:",
      answer: "Absoluty! SOCSA is built for students and by students. If you have an idea for a workshop, project, or event — bring it to us, our team will connect you with experts and bring your projects to real time."
    },
    {
      question: "how do i stay updates on socsa events?",
      answer: "We organize events weekly, including technical workshops, guest lectures, hackathons, and networking sessions. Check our events calendar for upcoming activities."
    }
  ];

  const testimonials = [
    {
      name: "Arpit Ingle",
      role: "AI Research Intern",
      company: "Tech Corp",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      text: "SOCSA transformed my understanding of AI. The hands-on projects and mentorship helped me land my dream internship!"
    },
    {
      name: "Sarah Chen",
      role: "ML Engineer",
      company: "DataFlow Inc",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "The community here is incredible. I've learned more in 6 months than I did in 2 years of self-study."
    },
    {
      name: "Raj Patel",
      role: "Data Scientist",
      company: "AI Solutions",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "From zero coding experience to building neural networks - SOCSA made it possible with their structured learning approach."
    }
  ];

  const handleFAQToggle = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <>
      <Layout title={"All Clubs Info-"}>
        <style jsx>{`
          /* CRITICAL: Remove all margins and padding globally */
          * {
            margin: 0 !important;
            padding: 0 !important;
            box-sizing: border-box !important;
          }
          
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            overflow-x: hidden !important;
            width: 100% !important;
          }

          .main-container {
            background-color: #0a0a0a;
            color: #ffffff;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            margin: 0 !important;
            padding: 0 !important;
            width: 100vw !important;
            overflow-x: hidden;
            box-sizing: border-box !important;
          }

          /* Hero Section */
          .hero-section {
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            margin: 0 !important;
            padding: 0 !important;
            width: 100%;
          }

          .hero-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), 
                        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%);
          }

          .hero-container {
            position: relative;
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1rem;
            text-align: center;
            z-index: 10;
            width: 100%;
            box-sizing: border-box;
          }

          .hero-content {
            transform: ${isVisible ? 'translateY(0)' : 'translateY(3rem)'};
            opacity: ${isVisible ? 1 : 0};
            transition: all 1.2s ease-out;
          }

          .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15));
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0.75rem 1.5rem;
            border-radius: 50px;
            color: #e0e7ff;
            margin-bottom: 2rem;
            font-weight: 500;
            font-size: 0.95rem;
          }

          .hero-title {
            font-size: clamp(2.5rem, 8vw, 6rem);
            font-weight: 800;
            margin-bottom: 1.5rem;
            line-height: 1.1;
            background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 50%, #c7d2fe 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent;
          }

          .hero-title-span {
            display: block;
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent;
          }

          .hero-description {
            font-size: clamp(1.1rem, 2vw, 1.4rem);
            color: #94a3b8;
            margin: 0 auto 3rem auto;
            max-width: 600px;
            line-height: 1.7;
          }

          .hero-buttons {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            justify-content: center;
            align-items: center;
          }

          .primary-button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            color: white;
            padding: 1rem 2.5rem;
            border-radius: 50px;
            font-weight: 600;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 1.05rem;
            box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
            text-decoration: none;
          }

          .secondary-button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            border: 2px solid rgba(255, 255, 255, 0.2);
            color: #e0e7ff;
            background-color: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            padding: 1rem 2.5rem;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 1.05rem;
            text-decoration: none;
          }

          /* Floating particles */
          .floating-particle {
            position: absolute;
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.6), rgba(147, 51, 234, 0.6));
            filter: blur(1px);
            animation: float 6s ease-in-out infinite;
          }

          .particle-1 {
            top: 20%;
            left: 10%;
            width: 4px;
            height: 4px;
            animation-delay: 0s;
          }

          .particle-2 {
            top: 40%;
            right: 15%;
            width: 6px;
            height: 6px;
            animation-delay: 2s;
          }

          .particle-3 {
            bottom: 30%;
            left: 20%;
            width: 3px;
            height: 3px;
            animation-delay: 4s;
          }

          /* Stats Section */
          .stats-section {
            padding: 3rem 0;
            background: linear-gradient(180deg, #111827 0%, #1f2937 100%);
            margin: 0;
            width: 100%;
          }

          .stats-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
            width: 100%;
            box-sizing: border-box;
          }

          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
          }

          .stat-item {
            text-align: center;
            padding: 1.5rem;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            transition: all 0.3s ease;
            cursor: pointer;
          }

          .stat-item:hover {
            transform: translateY(-5px);
          }

          .stat-icon {
            width: 3.5rem;
            height: 3.5rem;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem auto;
            transition: transform 0.3s ease;
          }

          .stat-icon-blue {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          }

          .stat-icon-green {
            background: linear-gradient(135deg, #10b981, #047857);
          }

          .stat-icon-orange {
            background: linear-gradient(135deg, #f59e0b, #d97706);
          }

          .stat-number {
            font-size: 2.5rem;
            font-weight: 800;
            background: linear-gradient(135deg, #ffffff, #e0e7ff);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent;
            margin-bottom: 0.5rem;
          }

          .stat-label {
            color: #94a3b8;
            font-weight: 500;
            font-size: 1rem;
          }

          /* Featured Projects Section */
          .featured-section {
            padding: 3rem 0;
            background: radial-gradient(ellipse at center, #1e293b 0%, #0f172a 100%);
            margin: 0;
            width: 100%;
          }

          .featured-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
            width: 100%;
            box-sizing: border-box;
          }

          .section-title {
            text-align: center;
            margin-bottom: 3rem;
          }

          .section-title-text {
            font-size: clamp(2rem, 5vw, 3.5rem);
            font-weight: 800;
            background: linear-gradient(135deg, #ffffff, #94a3b8);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent;
            margin-bottom: 1rem;
          }

          .section-subtitle {
            color: #64748b;
            font-size: 1.1rem;
            font-weight: 500;
          }

          .project-showcase {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            max-width: 500px;
            margin: 0 auto;
            text-align: center;
            position: relative;
            overflow: hidden;
          }

          .project-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2));
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0.75rem 1.5rem;
            border-radius: 50px;
            color: #e0e7ff;
            margin-bottom: 1.5rem;
            font-weight: 500;
          }

          .project-title {
            font-size: 1.8rem;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 1rem;
          }

          .project-difficulty {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            font-size: 0.9rem;
            color: #94a3b8;
            margin-bottom: 1.5rem;
          }

          .difficulty-badge {
            padding: 0.4rem 1rem;
            border-radius: 20px;
            font-weight: 600;
            font-size: 0.85rem;
          }

          .difficulty-beginner {
            background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(22, 163, 74, 0.2));
            color: #4ade80;
            border: 1px solid rgba(34, 197, 94, 0.3);
          }

          .difficulty-intermediate {
            background: linear-gradient(135deg, rgba(234, 179, 8, 0.2), rgba(202, 138, 4, 0.2));
            color: #facc15;
            border: 1px solid rgba(234, 179, 8, 0.3);
          }

          .difficulty-advanced {
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2));
            color: #f87171;
            border: 1px solid rgba(239, 68, 68, 0.3);
          }

          .project-button {
            background: linear-gradient(135deg, #ffffff, #f1f5f9);
            color: #1e293b;
            padding: 1rem 2rem;
            border-radius: 50px;
            font-weight: 600;
            border: none;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            transition: all 0.3s ease;
            font-size: 1rem;
            text-decoration: none;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          }

          .project-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
          }

          .project-dots {
            display: flex;
            justify-content: center;
            margin-top: 1.5rem;
            gap: 0.75rem;
          }

          .project-dot {
            width: 8px;
            height: 8px;
            border-radius: 50px;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            background-color: rgba(255, 255, 255, 0.3);
          }

          .project-dot-active {
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            width: 32px;
          }

          /* Common Section Styles */
          .common-section {
            padding: 3rem 0;
            margin: 0;
            width: 100%;
          }

          .common-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
            width: 100%;
            box-sizing: border-box;
          }

          .common-grid {
            display: grid;
            gap: 1.5rem;
          }

          /* Learning Tracks Section */
          .learning-section {
            background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
          }

          .learning-grid {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          }

          .learning-card {
            padding: 2rem;
            border-radius: 20px;
            transition: all 0.3s ease;
            transform: translateY(0);
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }

          .learning-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 25px 50px rgba(59, 130, 246, 0.15);
          }

          .learning-card-blue {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(29, 78, 216, 0.05));
          }

          .learning-card-purple {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(109, 40, 217, 0.05));
          }

          .learning-card-green {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(4, 120, 87, 0.05));
          }

          .learning-icon {
            width: 3.5rem;
            height: 3.5rem;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
            transition: transform 0.3s ease;
          }

          .learning-icon-blue {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          }

          .learning-icon-purple {
            background: linear-gradient(135deg, #8b5cf6, #6d28d9);
          }

          .learning-icon-green {
            background: linear-gradient(135deg, #10b981, #047857);
          }

          .learning-title {
            font-size: 1.4rem;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 1rem;
          }

          .learning-description {
            color: #94a3b8;
            margin-bottom: 1.5rem;
            line-height: 1.6;
            font-size: 0.95rem;
          }

          .learning-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
          }

          .learning-tag {
            padding: 0.4rem 1rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 500;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .learning-tag-blue {
            background: rgba(59, 130, 246, 0.1);
            color: #93c5fd;
          }

          .learning-tag-purple {
            background: rgba(139, 92, 246, 0.1);
            color: #c4b5fd;
          }

          .learning-tag-green {
            background: rgba(16, 185, 129, 0.1);
            color: #86efac;
          }

          .learning-button {
            color: #3b82f6;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            border: none;
            background-color: transparent;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 1rem;
            text-decoration: none;
          }

          .learning-button:hover {
            gap: 1rem;
          }

          .learning-button-purple {
            color: #8b5cf6;
          }

          .learning-button-green {
            color: #10b981;
          }

          /* Events Section */
          .events-section {
            background: radial-gradient(ellipse at center, #1e293b 0%, #111827 100%);
          }

          .events-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          }

          .event-card {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 1.5rem;
            border-radius: 20px;
            transition: all 0.3s ease;
            cursor: pointer;
          }

          .event-card:hover {
            transform: translateY(-5px);
          }

          .event-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;
          }

          .event-date {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 600;
          }

          .event-title {
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 0.5rem;
            font-size: 1.2rem;
          }

          .event-type {
            color: #94a3b8;
            font-size: 0.95rem;
            margin-bottom: 1rem;
          }

          .event-attendees {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
            color: #64748b;
            font-weight: 500;
          }

          /* Testimonials Section */
          .testimonials-section {
            background: linear-gradient(180deg, #111827 0%, #0f172a 100%);
          }

          .testimonials-grid {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          }

          .testimonial-card {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 2rem;
            border-radius: 20px;
            transition: all 0.3s ease;
          }

          .testimonial-card:hover {
            transform: translateY(-5px);
          }

          .testimonial-text {
            color: #e2e8f0;
            font-size: 1rem;
            line-height: 1.6;
            margin-bottom: 1.5rem;
            font-style: italic;
          }

          .testimonial-author {
            display: flex;
            align-items: center;
            gap: 1rem;
          }

          .testimonial-image {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid rgba(255, 255, 255, 0.2);
          }

          .testimonial-info {
            flex: 1;
          }

          .testimonial-name {
            color: #ffffff;
            font-weight: 600;
            font-size: 1rem;
            margin-bottom: 0.25rem;
          }

          .testimonial-role {
            color: #94a3b8;
            font-size: 0.9rem;
          }

          /* FAQ Section */
          .faq-section {
            background: radial-gradient(ellipse at center, #1e293b 0%, #0f172a 100%);
          }

          .faq-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 0 1rem;
            width: 100%;
            box-sizing: border-box;
          }

          .faq-item {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            margin-bottom: 1rem;
            overflow: hidden;
            transition: all 0.3s ease;
          }

          .faq-item:hover {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.04));
          }

          .faq-question {
            padding: 1.5rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #ffffff;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.3s ease;
          }

          .faq-question:hover {
            color: #e0e7ff;
          }

          .faq-answer {
            padding: 0 1.5rem 1.5rem;
            color: #94a3b8;
            line-height: 1.6;
            font-size: 0.95rem;
          }

          .faq-icon {
            transition: transform 0.3s ease;
          }

          /* Achievements Section */
          .achievements-section {
            background: linear-gradient(180deg, #0f172a 0%, #111827 100%);
          }

          .achievements-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }

          .achievement-item {
            text-align: center;
            padding: 1.5rem;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            transition: all 0.3s ease;
            cursor: pointer;
          }

          .achievement-item:hover {
            transform: translateY(-5px);
          }

          .achievement-item:hover .achievement-icon {
            transform: scale(1.1);
          }

          .achievement-icon {
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            width: 3.5rem;
            height: 3.5rem;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem auto;
            transition: transform 0.3s ease;
          }

          .achievement-title {
            font-size: 1.2rem;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 0.75rem;
          }

          .achievement-desc {
            color: #94a3b8;
            font-size: 0.95rem;
            line-height: 1.5;
          }

          /* Community Join Section */
          .community-section {
            padding: 4rem 0;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            position: relative;
            overflow: hidden;
            margin: 0;
            width: 100%;
          }

          .community-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), 
                        radial-gradient(circle at 70% 60%, rgba(139, 92, 246, 0.15) 0%, transparent 50%);
          }

          .community-container {
            position: relative;
            max-width: 1000px;
            margin: 0 auto;
            padding: 0 1rem;
            text-align: center;
            z-index: 10;
            width: 100%;
            box-sizing: border-box;
          }

          .community-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 0.75rem 1.5rem;
            border-radius: 50px;
            color: #e0e7ff;
            margin-bottom: 2rem;
            font-weight: 500;
          }

          .community-title {
            font-size: clamp(2rem, 5vw, 3.5rem);
            font-weight: 800;
            background: linear-gradient(135deg, #ffffff, #e0e7ff);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent;
            margin-bottom: 2rem;
            line-height: 1.2;
          }

          .community-description {
            font-size: 1.2rem;
            color: #cbd5e1;
            margin: 0 auto 3rem auto;
            max-width: 600px;
            line-height: 1.6;
          }

          .community-buttons {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            justify-content: center;
            align-items: center;
          }

          .community-primary-button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            background: linear-gradient(135deg, #ffffff, #f1f5f9);
            color: #1e293b;
            padding: 1.2rem 2.5rem;
            border-radius: 50px;
            font-weight: 600;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 1.05rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            text-decoration: none;
          }

          .community-primary-button:hover {
            transform: scale(1.05);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
          }

          .community-secondary-button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            border: 2px solid rgba(255, 255, 255, 0.3);
            color: #e0e7ff;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
            backdrop-filter: blur(10px);
            padding: 1.2rem 2.5rem;
            border-radius: 50px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 1.05rem;
            text-decoration: none;
          }

          .community-secondary-button:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.5);
          }

          /* Contact Section */
          .contact-section {
            background: linear-gradient(180deg, #111827 0%, #0f172a 100%);
          }

          .contact-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }

          .contact-card {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 1.5rem;
            border-radius: 20px;
            text-align: center;
            transition: all 0.3s ease;
          }

          .contact-card:hover {
            transform: translateY(-5px);
          }

          .contact-icon {
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            width: 3rem;
            height: 3rem;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem auto;
          }

          .contact-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: #ffffff;
            margin-bottom: 0.75rem;
          }

          .contact-info {
            color: #94a3b8;
            font-size: 0.95rem;
          }

          /* Global Animations */
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }

          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          /* MOBILE RESPONSIVENESS */
          @media (max-width: 768px) {
            .hero-container {
              padding: 1.5rem 0.5rem;
            }

            .hero-buttons {
              flex-direction: column;
              width: 100%;
            }

            .primary-button,
            .secondary-button {
              width: 100%;
              max-width: 280px;
            }

            .stats-grid,
            .learning-grid,
            .events-grid,
            .testimonials-grid,
            .achievements-grid,
            .contact-grid {
              grid-template-columns: 1fr;
              gap: 1rem;
            }

            .common-section {
              padding: 2rem 0;
            }

            .common-container {
              padding: 0 0.5rem;
            }

            .section-title {
              margin-bottom: 2rem;
            }

            .project-showcase {
              padding: 1.5rem;
            }

            .community-section {
              padding: 3rem 0;
            }

            .community-buttons {
              width: 100%;
            }

            .community-primary-button,
            .community-secondary-button {
              width: 100%;
              max-width: 280px;
            }

            .faq-container {
              padding: 0 0.5rem;
            }
          }

          @media (max-width: 480px) {
            .hero-container {
              padding: 1rem 0.25rem;
            }

            .hero-badge {
              padding: 0.5rem 1rem;
              font-size: 0.85rem;
            }

            .hero-description {
              font-size: 1rem;
            }

            .stats-container,
            .featured-container,
            .common-container,
            .community-container,
            .faq-container {
              padding: 0 0.25rem;
            }

            .stat-item,
            .learning-card,
            .event-card,
            .testimonial-card,
            .achievement-item,
            .contact-card {
              padding: 1rem;
            }

            .project-showcase {
              padding: 1rem;
            }

            .learning-title {
              font-size: 1.2rem;
            }

            .learning-description {
              font-size: 0.9rem;
            }

            .testimonial-text {
              font-size: 0.9rem;
            }

            .faq-question {
              padding: 1rem;
              font-size: 0.95rem;
            }

            .faq-answer {
              padding: 0 1rem 1rem;
              font-size: 0.9rem;
            }

            .community-description {
              font-size: 1rem;
            }
          }

          @media (max-width: 360px) {
            .hero-title {
              font-size: 2rem;
            }

            .section-title-text {
              font-size: 1.8rem;
            }

            .community-title {
              font-size: 1.8rem;
            }

            .primary-button,
            .secondary-button,
            .community-primary-button,
            .community-secondary-button {
              padding: 0.875rem 1.5rem;
              font-size: 0.95rem;
            }
          }

          /* Hover effects for desktop */
          @media (min-width: 769px) {
            .hero-buttons {
              flex-direction: row;
            }

            .primary-button:hover {
              transform: scale(1.05);
              box-shadow: 0 15px 40px rgba(59, 130, 246, 0.4);
            }

            .secondary-button:hover {
              background: rgba(255, 255, 255, 0.15);
              border-color: rgba(255, 255, 255, 0.4);
            }

            .community-buttons {
              flex-direction: row;
            }
          }
        `}</style>
        <div className="main-container">
          {/* Hero Section */}
          <div className="hero-section">
            <div className="hero-overlay"></div>
            
            {/* Floating particles */}
            <div className="floating-particle particle-1"></div>
            <div className="floating-particle particle-2"></div>
            <div className="floating-particle particle-3"></div>
            
            <div className="hero-container">
              <div className="hero-content">
                <h1 className="hero-title">
                  SOCSA
                  <span className="hero-title-span">
                    Execution Committee
                  </span>
                </h1>
                <p className="hero-description">
                  Where curiosity meets innovation. Join our community of AI enthusiasts, researchers, and developers shaping the future of technology through cutting-edge projects and collaborative learning.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="stats-section common-section">
            <div className="stats-container common-container">
              <div className="stats-grid common-grid">
                <div className="stat-item">
                  <div className="stat-icon stat-icon-blue">
                    <Users style={{ width: '2rem', height: '2rem', color: 'white' }} />
                  </div>
                  <div className="stat-number">{memberCount}+</div>
                  <div className="stat-label">Active Members</div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon stat-icon-green">
                    <Code style={{ width: '2rem', height: '2rem', color: 'white' }} />
                  </div>
                  <div className="stat-number">{projectCount}+</div>
                  <div className="stat-label">AI Projects</div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon stat-icon-orange">
                    <BookOpen style={{ width: '2rem', height: '2rem', color: 'white' }} />
                  </div>
                  <div className="stat-number">{workshopCount}+</div>
                  <div className="stat-label">Workshops</div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Project Showcase */}
          <div className="featured-section common-section">
            <div className="featured-container common-container">
              <div className="section-title">
                <h2 className="section-title-text">Featured Projects</h2>
                <p className="section-subtitle">Explore our latest AI/ML innovations</p>
              </div>
              <div className="project-showcase">
                <div className="project-badge">
                  <Laptop style={{ width: '1.25rem', height: '1.25rem' }} />
                  <span>{featuredProjects[currentProject].tech}</span>
                </div>
                <h3 className="project-title">
                  {featuredProjects[currentProject].title}
                </h3>
                <div className="project-difficulty">
                  <span className={`difficulty-badge ${
                    featuredProjects[currentProject].difficulty === 'Beginner' ? 'difficulty-beginner' :
                    featuredProjects[currentProject].difficulty === 'Intermediate' ? 'difficulty-intermediate' :
                    'difficulty-advanced'
                  }`}>
                    {featuredProjects[currentProject].difficulty}
                  </span>
                </div>
                <a 
                  href={featuredProjects[currentProject].github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-button"
                >
                  <Github style={{ width: '1.25rem', height: '1.25rem' }} />
                  View Project
                </a>
                <div className="project-dots">
                  {featuredProjects.map((_, i) => (
                    <button
                      key={i}
                      className={`project-dot ${i === currentProject ? 'project-dot-active' : ''}`}
                      onClick={() => setCurrentProject(i)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Learning Tracks */}
          <div className="learning-section common-section">
            <div className="common-container">
              <div className="section-title">
                <h2 className="section-title-text">Skills Tracks</h2>
                <p className="section-subtitle">Choose your path in different fields</p>
              </div>
              <div className="learning-grid common-grid">
                <div className="learning-card learning-card-blue">
                  <div className="learning-icon learning-icon-blue">
                    <Trophy style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                  </div>
                  <h3 className="learning-title">Sports</h3>
                  <p className="learning-description">
                    Master athletic skills, team coordination, and competitive strategies from amateur to professional level.
                  </p>
                  <div className="learning-tags">
                    <span className="learning-tag learning-tag-blue">Swimming</span>
                    <span className="learning-tag learning-tag-blue">Basketball</span>
                    <span className="learning-tag learning-tag-blue">E-sports</span>
                  </div>
                  <button className="learning-button" onClick={() => navigate('/sport')}>
                    Start with us!
                    <ChevronRight style={{ width: '1.25rem', height: '1.25rem' }} />
                  </button>
                </div>

                <div className="learning-card learning-card-purple">
                  <div className="learning-icon learning-icon-purple">
                    <Music style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                  </div>
                  <h3 className="learning-title">Cultural</h3>
                  <p className="learning-description">
                    Dive into performing arts, cultural expressions, and creative showcases that celebrate diversity.
                  </p>
                  <div className="learning-tags">
                    <span className="learning-tag learning-tag-purple">Dancing</span>
                    <span className="learning-tag learning-tag-purple">Singing</span>
                    <span className="learning-tag learning-tag-purple">Drama</span>
                  </div>
                  <button className="learning-button learning-button-purple" onClick={() => navigate('/culturals')}>
                    Start with us!
                    <ChevronRight style={{ width: '1.25rem', height: '1.25rem' }} />
                  </button>
                </div>

                <div className="learning-card learning-card-green">
                  <div className="learning-icon learning-icon-green">
                    <Brush style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                  </div>
                  <h3 className="learning-title">Design</h3>
                  <p className="learning-description">
                    Extract insights from creativity with visual design, UX principles, and artistic innovation.
                  </p>
                  <div className="learning-tags">
                    <span className="learning-tag learning-tag-green">UI/UX</span>
                    <span className="learning-tag learning-tag-green">Graphics</span>
                    <span className="learning-tag learning-tag-green">Branding</span>
                  </div>
                  <button className="learning-button learning-button-green" onClick={() => navigate('/cultural')}>
                    Start with us!
                    <ChevronRight style={{ width: '1.25rem', height: '1.25rem' }} />
                  </button>
                </div>
                
                <div className="learning-card learning-card-green">
                  <div className="learning-icon learning-icon-green">
                    <FileCode style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                  </div>
                  <h3 className="learning-title">Mini Project</h3>
                  <p className="learning-description">
                    Extract insights from creativity with visual design, UX principles, and artistic innovation.
                  </p>
                  <a 
                    className="learning-button learning-button-green"
                    href="https://dept-csa.github.io/edge/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register Now!
                    <ChevronRight style={{ width: '1.25rem', height: '1.25rem' }} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="events-section common-section">
            <div className="common-container">
              <div className="section-title">
                <h2 className="section-title-text">Organized Events</h2>
                <p className="section-subtitle">Join our exciting upcoming activities</p>
              </div>
              <div className="events-grid common-grid">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="event-card">
                    <div className="event-header">
                      <div className="event-date">{event.date}</div>
                      <Calendar style={{ width: '1.25rem', height: '1.25rem', color: '#64748b' }} />
                    </div>
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-type">{event.type}</p>
                    <div className="event-attendees">
                      <Users style={{ width: '1rem', height: '1rem' }} />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="testimonials-section common-section">
            <div className="common-container">
              <div className="section-title">
                <h2 className="section-title-text">What Our Members Say</h2>
                <p className="section-subtitle">Success stories from our community</p>
              </div>
              <div className="testimonials-grid common-grid">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="testimonial-card">
                    <div className="testimonial-text">
                      "{testimonial.text}"
                    </div>
                    <div className="testimonial-author">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="testimonial-image"
                      />
                      <div className="testimonial-info">
                        <div className="testimonial-name">{testimonial.name}</div>
                        <div className="testimonial-role">
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
          <div className="achievements-section common-section">
            <div className="common-container">
              <div className="section-title">
                <h2 className="section-title-text">Our Achievements</h2>
                <p className="section-subtitle">Proud moments that define our journey</p>
              </div>
              <div className="achievements-grid common-grid">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className="achievement-item">
                      <div className="achievement-icon">
                        <Icon style={{ width: '2rem', height: '2rem', color: 'white' }} />
                      </div>
                      <h3 className="achievement-title">{achievement.title}</h3>
                      <p className="achievement-desc">{achievement.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="faq-section common-section">
            <div className="faq-container">
              <div className="section-title">
                <h2 className="section-title-text">Frequently Asked Questions</h2>
                <p className="section-subtitle">Everything you need to know about SOCSA</p>
              </div>
              <div>
                {faqData.map((faq, index) => (
                  <div key={index} className="faq-item">
                    <div 
                      className="faq-question"
                      onClick={() => handleFAQToggle(index)}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown 
                        className="faq-icon"
                        style={{
                          transform: openFAQ === index ? 'rotate(180deg)' : 'rotate(0deg)'
                        }} 
                      />
                    </div>
                    {openFAQ === index && (
                      <div className="faq-answer">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="contact-section common-section">
            <div className="common-container">
              <div className="section-title">
                <h2 className="section-title-text">Get In Touch</h2>
                <p className="section-subtitle">Ready to start your journey with us?</p>
              </div>
              <div className="contact-grid common-grid">
                <div className="contact-card">
                  <div className="contact-icon">
                    <Mail style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                  </div>
                  <h3 className="contact-title">Email Us</h3>
                  <p className="contact-info">socsa@university.edu</p>
                </div>
                <div className="contact-card">
                  <div className="contact-icon">
                    <Phone style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                  </div>
                  <h3 className="contact-title">Call Us</h3>
                  <p className="contact-info">+91 98765 43210</p>
                </div>
                <div className="contact-card">
                  <div className="contact-icon">
                    <MapPin style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                  </div>
                  <h3 className="contact-title">Visit Us</h3>
                  <p className="contact-info">Computer Science Department, Main Campus</p>
                </div>
              </div>
            </div>
          </div>

          {/* Community Join Section */}
          <div className="community-section">
            <div className="community-overlay"></div>
            <div className="community-container">
              <div className="community-badge">
                <Lightbulb style={{ width: '1.25rem', height: '1.25rem' }} />
                <span>Ready to innovate?</span>
              </div>
              <h2 className="community-title">Join Our AI/ML Community</h2>
              <p className="community-description">
                Connect with passionate learners, work on cutting-edge projects, and shape the future of artificial intelligence together.
              </p>
              <div className="community-buttons">
                <button 
                  className="community-primary-button"
                  onClick={() => navigate('Navigate to join community')}
                >
                  <Users style={{ width: '1.25rem', height: '1.25rem' }} />
                  Join Club
                  <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
                </button>
                <button 
                  className="community-primary-button"
                  onClick={() => navigate('/lostandfound')}
                >
                  <Users style={{ width: '1.25rem', height: '1.25rem' }} />
                  Found Something
                  <ArrowRight style={{ width: '2.5rem', height: '1.25rem' }} />
                </button>
                <a
                  className="community-secondary-button"
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
