import React from "react";
import {
  Theater,     // 🎭 Theatre & Drama
  Music,       // 🎵 Music
  Paintbrush,  // 🎨 Art & Painting
  Camera,      // 📸 Photography
  BookOpen,    // 📖 Literature
  Users        // 👯 Dance / People
} from "lucide-react";

const Cultural = () => {
  return (
    <>
      <style>{`
        .cultural-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 30px 20px;
          text-align: center;
          font-family: Arial, sans-serif;
        }
        .cultural-title {
          font-size: 2.5rem;
          margin-bottom: 10px;
          color: #222;
        }
        .cultural-subtitle {
          font-size: 1.2rem;
          color: #555;
          margin-bottom: 30px;
        }
        .cultural-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        .cultural-card {
          background: #f9f9f9;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .cultural-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.15);
        }
        .cultural-icon {
          width: 48px;
          height: 48px;
          color: #6c63ff;
          margin-bottom: 10px;
        }
        .cultural-card h3 {
          font-size: 1.2rem;
          color: #333;
        }
        .cultural-buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
        }
        .btn {
          padding: 12px 24px;
          font-size: 1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
          color: white;
          transition: background 0.3s ease;
        }
        .whatsapp-btn {
          background: #25d366;
        }
        .whatsapp-btn:hover {
          background: #1da851;
        }
        .google-btn {
          background: #4285f4;
        }
        .google-btn:hover {
          background: #3367d6;
        }
      `}</style>

      <div className="cultural-container">
        <h1 className="cultural-title">SOCSA Cultural Activities</h1>
        <p className="cultural-subtitle">
          Explore various cultural categories and be part of our vibrant community.
        </p>

        <div className="cultural-grid">
          <div className="cultural-card">
            <Theater className="cultural-icon" />
            <h3>Theatre & Drama</h3>
          </div>
          <div className="cultural-card">
            <Music className="cultural-icon" />
            <h3>Music</h3>
          </div>
          <div className="cultural-card">
            <Paintbrush className="cultural-icon" />
            <h3>Art & Painting</h3>
          </div>
          <div className="cultural-card">
            <Camera className="cultural-icon" />
            <h3>Photography</h3>
          </div>
          <div className="cultural-card">
            <BookOpen className="cultural-icon" />
            <h3>Literature</h3>
          </div>
          <div className="cultural-card">
            <Users className="cultural-icon" />
            <h3>Dance</h3>
          </div>
        </div>

        <div className="cultural-buttons">
          <a
            href="https://chat.whatsapp.com/your-group-link"
            target="_blank"
            rel="noopener noreferrer"
            className="btn whatsapp-btn"
          >
            Join WhatsApp Group
          </a>
          <a
            href="https://forms.gle/your-google-form-link"
            target="_blank"
            rel="noopener noreferrer"
            className="btn google-btn"
          >
            Fill Google Form
          </a>
        </div>
      </div>
    </>
  );
};

export default Cultural;
