import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Users, 
  Trophy, 
  Target, 
  Zap, 
  Heart,
  MessageCircle,
  UserPlus,
  ChevronRight
} from 'lucide-react';

const DPortSportsPage = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % sportsData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const sportsData = [
    {
      id: 1,
      name: "Football",
      icon: "⚽",
      description: "The beautiful game that unites millions worldwide. Experience the thrill of teamwork, strategy, and skill on the pitch.",
      participants: "22 players",
      difficulty: "Medium",
      gradient: "from-green-400 to-blue-500"
    },
    {
      id: 2,
      name: "Basketball",
      icon: "🏀",
      description: "Fast-paced action and incredible athleticism. Shoot for the stars and dominate the court with precision and teamwork.",
      participants: "10 players",
      difficulty: "Medium",
      gradient: "from-orange-400 to-red-500"
    },
    {
      id: 3,
      name: "Tennis",
      icon: "🎾",
      description: "Elegance meets power in this classic sport. Master your serve, perfect your backhand, and rule the court.",
      participants: "2-4 players",
      difficulty: "Hard",
      gradient: "from-yellow-400 to-green-500"
    },
    {
      id: 4,
      name: "Swimming",
      icon: "🏊",
      description: "Dive into excellence with every stroke. Build endurance, strength, and grace in the water.",
      participants: "Individual",
      difficulty: "Medium",
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      id: 5,
      name: "Cricket",
      icon: "🏏",
      description: "A gentleman's game of strategy and skill. Experience the excitement of batting, bowling, and fielding.",
      participants: "22 players",
      difficulty: "Hard",
      gradient: "from-red-400 to-pink-500"
    },
    {
      id: 6,
      name: "Athletics",
      icon: "🏃",
      description: "Push your limits and break barriers. Run faster, jump higher, and throw further than ever before.",
      participants: "Individual",
      difficulty: "Hard",
      gradient: "from-purple-400 to-indigo-500"
    }
  ];

  const handleWhatsAppJoin = () => {
    window.open('https://wa.me/1234567890?text=Hi! I want to join DPort sports community', '_blank');
  };

  const handleRegistration = () => {
    alert('Registration form would open here!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-ping"></div>
      </div>

      {/* Header */}
      <header className={`relative z-10 text-center pt-20 pb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 animate-spin-slow">
          <Trophy className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          DPort
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto px-4">
          Where Champions Are Born. Join the ultimate sports community and unleash your potential.
        </p>
      </header>

      {/* Sports Cards Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sportsData.map((sport, index) => (
            <div
              key={sport.id}
              className={`group relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 transform transition-all duration-700 hover:scale-105 hover:rotate-1 ${
                activeCard === index ? 'ring-4 ring-purple-500 shadow-2xl shadow-purple-500/50' : ''
              } ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                animationDelay: `${index * 200}ms`
              }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-r ${sport.gradient} opacity-10 rounded-2xl group-hover:opacity-20 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl animate-bounce">{sport.icon}</span>
                  <div className="flex space-x-2">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm">{sport.difficulty}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-300 transition-colors">
                  {sport.name}
                </h3>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {sport.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{sport.participants}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-bold text-purple-400 mb-2">10K+</h3>
            <p className="text-gray-400">Active Members</p>
          </div>
          <div className="group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-4 group-hover:scale-110 transition-transform">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-bold text-green-400 mb-2">500+</h3>
            <p className="text-gray-400">Tournaments</p>
          </div>
          <div className="group">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mb-4 group-hover:scale-110 transition-transform">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-bold text-pink-400 mb-2">99%</h3>
            <p className="text-gray-400">Satisfaction Rate</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Ready to Join the Action?
          </h2>
          <p className="text-xl text-gray-300">
            Connect with athletes, join tournaments, and be part of something amazing.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {/* WhatsApp Join Button */}
          <button
            onClick={handleWhatsAppJoin}
            className="group flex items-center space-x-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50"
          >
            <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
            <span>Join WhatsApp Community</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          {/* Registration Button */}
          <button
            onClick={handleRegistration}
            className="group flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
          >
            <UserPlus className="w-6 h-6 group-hover:animate-pulse" />
            <span>Register Now</span>
            <Zap className="w-5 h-5 group-hover:animate-spin transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-12 border-t border-white/10">
        <p className="text-gray-400">
          © 2024 DPort Sports Community. Empowering athletes worldwide.
        </p>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default DPortSportsPage;
