import React, { useState } from 'react';

const Association = () => {
    // Member data for 13 members
    const members = [
        {
            id: 1,
            name: "Hritik Shankhala",
            post: "President",
            date: "Joined: Aug 2025",
            image: "https://placehold.co/150x150/00E676/0A0A1F?text=AN",
            details: "Specializes in neural network optimization and quantum AI. Driving force behind Project 'Cognito', focusing on scalable and efficient neural architectures for real-world applications."
        },
        {
            id: 2,
            name: "Amey Patil",
            post: "Vice-President",
            date: "Joined: Aug 2025",
            image: "/image/Amey.jpg",
            details: "Expert in large-scale data analysis and predictive modeling for ethical AI applications. He designs robust data pipelines and ensures data integrity across all projects."
        },
        {
            id: 3,
            name: "Vidushi Tondon",
            post: "Pro Vice-President",
            date: "Joined: Aug 2025",
            image: "https://placehold.co/150x150/00E676/0A0A1F?text=CC",
            details: "Focuses on autonomous systems and human-robot interaction with a flair for design. Chloe integrates advanced AI perception into robotic platforms for seamless operation."
        },
        {
            id: 4,
            name: "Prateek Agrawal",
            post: "General Secretory",
            date: "Joined: Aug 2025",
            image: "/image/me.jpg",
            details: "Pioneering research in reinforcement learning and explainable AI paradigms. David's work helps demystify complex AI decisions, making them transparent and auditable."
        },
        {
            id: 5,
            name: "Shruti Jamadar",
            post: "Joint Secretory",
            date: "Joined: Aug 2025",
            image: "https://placehold.co/150x150/00E676/0A0A1F?text=EB",
            details: "Ensures all AI developments align with moral and societal well-being. Advocates for fairness, accountability, and transparency in artificial intelligence systems."
        },
        {
            id: 6,
            name: "Soham Borate",
            post: "Treasurer",
            date: "Joined: Aug 2025",
            image: "https://placehold.co/150x150/64FFDA/0A0A1F?text=FC",
            details: "Developing cutting-edge NLP models for multi-lingual comprehension and generation. Finn's projects include advanced conversational AI and semantic understanding."
        },
        {
            id: 7,
            name: "Yadnesh Kulkarni",
            post: "Head of Tech Oprations",
            date: "Joined:  Aug 2025",
            image: "https://placehold.co/150x150/00E676/0A0A1F?text=GO",
            details: "Innovates in real-time image recognition and 3D reconstruction for complex environments. Grace's work is critical for autonomous navigation and augmented reality applications."
        },
        {
            id: 8,
            name: "Shashwat ",
            post: "SRO",
            date: "Joined: Aug 2025",
            image: "/image/shashwat.jpg",
            details: "Designing efficient hardware architectures optimized for AI computation. Henry focuses on low-power, high-performance chips that drive next-generation AI devices."
        },
        {
            id: 9,
            name: "Aditya",
            post: "SRO",
            date: "Joined: Aug 2025",
            image: "https://placehold.co/150x150/00E676/0A0A1F?text=IL",
            details: "Builds robust and scalable software infrastructure for AI deployment. Ivy is instrumental in developing the platforms that host and serve our AI models."
        },
        {
            id: 10,
            name: "Akshat Kanoj",
            post: "Sponsor's",
            date: "Joined: Aug 2025",
            image: "https://placehold.co/150x150/64FFDA/0A0A1F?text=JQ",
            details: "Exploring the intersection of quantum computing and artificial intelligence. Jack is developing new algorithms that leverage quantum principles for AI breakthroughs."
        },
        {
            id: 11,
            name: "Akshay Muley",
            post: "Alumani Relation",
            date: "Joined: Aug 2025",
            image: "https://placehold.co/150x150/00E676/0A0A1F?text=KD",
            details: "Streamlines machine learning workflows from development to production. Karen ensures that AI models are deployed, monitored, and maintained efficiently in operational environments."
        },
        {
            id: 12,
            name: "Vinita Paryani",
            post: "Ladies Representative",
            date: "Joined: Aug 2025",
            image: "https://placehold.co/150x150/64FFDA/0A0A1F?text=LN",
            details: "Conducts theoretical and applied research in advanced AI algorithms and learning paradigms. Leo's work often involves exploring novel approaches to deep learning and cognitive systems."
        },
        {
            id: 13,
            name: "Samarth",
            post: "Sport's Head",
            date: "Joined: Aug 2025",
            image: "https://placehold.co/150x150/00E676/0A0A1F?text=MP",
            details: "Specializes in securing AI systems and using AI for threat detection. Mia develops robust defenses against adversarial attacks and ensures data privacy in AI applications."
        },
        {
            id: 13,
            name: "Aditi",
            post: "Cultural Head",
            date: "Joined: Aug 2025",
            image: "https://placehold.co/150x150/00E676/0A0A1F?text=MP",
            details: "Specializes in securing AI systems and using AI for threat detection. Mia develops robust defenses against adversarial attacks and ensures data privacy in AI applications."
        }
    ];

    const [viewMode, setViewMode] = useState('card'); // 'card' or 'table'
    const [selectedMember, setSelectedMember] = useState(null); // Stores the member whose details are shown in modal

    const openMemberDetails = (member) => {
        setSelectedMember(member);
    };

    const closeMemberDetails = () => {
        setSelectedMember(null);
    };

    return (
        <div className="ai-innovators-collective">
            <style jsx="true">{`
                /*
                 * General Styles
                 * Sets basic font, background, and text color for the entire page.
                 */
                body {
                    font-family: 'Roboto Mono', monospace; /* Futuristic monospaced font */
                    background-color: #0d0d1f; /* Deeper dark blue/purple for overall background */
                    color: #E0F7FA; /* Light cyan for general text */
                    margin: 0;
                    padding: 0;
                    line-height: 1.6;
                    scroll-behavior: smooth;
                    /* Subtle gradient for body to match image */
                    background-image: linear-gradient(to bottom, #0d0d1f, #1a1a3f);
                    min-height: 100vh; /* Ensure full viewport height */
                }

                /*
                 * Container for centering content
                 * Ensures all main content is centered and has a maximum width.
                 */
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                }

                /*
                 * Header Styles - Remodeled to match the image's top banner
                 */
                header {
                    background-color: #1a1a3f; /* Darker blue background */
                    padding: 20px 20px 20px 40px; /* Adjusted padding */
                    text-align: left; /* Align text left as in image */
                    border-radius: 0 0 15px 15px; /* Rounded bottom corners */
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4); /* Stronger shadow */
                    margin-bottom: 30px; /* Reduced margin */
                    display: flex;
                    align-items: center;
                    justify-content: space-between; /* Space out title and right elements */
                }

                .header-left {
                    display: flex;
                    align-items: center;
                    gap: 15px; /* Space between icon and text */
                }

                .header-left .icon-box {
                    background-color: #00E676; /* Bright green box for icon */
                    padding: 8px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .header-left .icon-box svg {
                    fill: #0A0A1F; /* Dark fill for icon */
                    width: 24px;
                    height: 24px;
                }

                .header-text h1 {
                    font-family: 'Orbitron', sans-serif; /* Bold, futuristic font for titles */
                    font-size: 2.2em; /* Smaller than previous version to fit image style */
                    color: #64FFDA; /* Neon green/blue */
                    text-shadow: 0 0 8px rgba(100, 255, 218, 0.6); /* Text glow */
                    margin: 0;
                }

                .header-text p {
                    font-size: 0.9em; /* Smaller subtitle */
                    color: #B2EBF2; /* Lighter cyan */
                    margin-top: 5px; /* Reduced margin */
                }

                .header-right {
                    display: flex;
                    gap: 15px; /* Space between info boxes */
                    margin-right: 20px; /* Push to the right */
                }

                .info-box {
                    background-color: #2a2a4f; /* Darker box background */
                    border-radius: 8px;
                    padding: 10px 20px;
                    text-align: center;
                    font-family: 'Roboto Mono', monospace;
                    color: #E0F7FA;
                    box-shadow: 0 0 10px rgba(0, 230, 118, 0.3);
                }

                .info-box .value {
                    font-size: 1.5em;
                    font-weight: bold;
                    color: #64FFDA; /* Neon green/blue for values */
                }

                .info-box .label {
                    font-size: 0.8em;
                    color: #80CBC4;
                }

                /*
                 * Section Styles
                 * Generic styling for content sections.
                 */
                section {
                    padding: 40px 0;
                    margin-bottom: 40px;
                    background-color: #15152F; /* Darker background for sections */
                    border-radius: 15px; /* Rounded corners */
                    box-shadow: 0 0 15px rgba(0, 230, 118, 0.2); /* Subtle section glow */
                }

                section h2 {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 2.5em;
                    color: #64FFDA; /* Neon green */
                    text-align: center;
                    margin-bottom: 30px;
                    text-shadow: 0 0 8px rgba(100, 255, 218, 0.6);
                }

                /*
                 * About Section Specific Styles
                 */
                .about-content {
                    font-size: 1.1em;
                    max-width: 800px;
                    margin: 0 auto;
                    text-align: center;
                    color: #B2EBF2; /* Lighter cyan */
                }

                /*
                 * Search Bar and View Mode Buttons Container
                 */
                .member-controls-top {
                    display: flex;
                    justify-content: space-between; /* Space out search and buttons */
                    align-items: center;
                    margin-bottom: 30px;
                    padding: 0 20px; /* Padding to match the image layout */
                }

                .search-bar {
                    flex-grow: 1; /* Allows search bar to take available space */
                    max-width: 400px; /* Limit width */
                    margin-right: 30px; /* Space between search and buttons */
                }

                .search-bar input {
                    width: 100%;
                    padding: 12px 20px;
                    border: 1px solid #2a2a4f; /* Darker border */
                    background-color: #1a1a3f; /* Dark background */
                    border-radius: 10px; /* Rounded corners like in image */
                    color: #E0F7FA;
                    font-family: 'Roboto Mono', monospace;
                    font-size: 1em;
                    outline: none;
                    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.5); /* Inner shadow */
                    transition: border-color 0.3s ease, box-shadow 0.3s ease;
                }

                .search-bar input::placeholder {
                    color: #80CBC4; /* Muted placeholder text */
                }

                .search-bar input:focus {
                    border-color: #64FFDA; /* Neon border on focus */
                    box-shadow: inset 0 0 8px rgba(0, 230, 118, 0.3), 0 0 10px rgba(100, 255, 218, 0.5); /* Outer glow on focus */
                }

                /*
                 * View Mode Buttons
                 */
                .view-controls {
                    display: flex; /* Arrange buttons side-by-side */
                    background-color: #2a2a4f; /* Background for the toggle group */
                    border-radius: 10px; /* Rounded container for buttons */
                    padding: 5px; /* Padding inside the container */
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                }

                .view-controls button {
                    background-color: transparent; /* Transparent by default */
                    color: #B2EBF2; /* Muted text color */
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px; /* Slightly more rounded than container */
                    font-family: 'Roboto Mono', monospace;
                    font-size: 1em;
                    cursor: pointer;
                    transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
                    outline: none; /* Remove default focus outline */
                }

                .view-controls button:hover {
                    background-color: #3A3A5F; /* Slight hover background */
                    color: #E0F7FA; /* Lighter text on hover */
                }

                .view-controls button.active {
                    background-color: #00E676; /* Bright green for active button */
                    color: #0A0A1F; /* Dark text for active button */
                    box-shadow: 0 0 15px rgba(0, 230, 118, 0.7); /* Strong glow for active */
                }

                /*
                 * Members Grid (Card View) Styles
                 * Uses Flexbox to create a responsive grid of member cards.
                 */
                .members-grid {
                    display: flex;
                    flex-wrap: wrap; /* Allows cards to wrap to the next line */
                    justify-content: center; /* Centers the cards horizontally */
                    gap: 30px; /* Space between cards */
                    padding: 20px 0;
                }

                /*
                 * Member Card Styles
                 * Styles individual member profile cards.
                 */
                .member-card {
                    background-color: #1a1a3f; /* Dark blue background for cards, slightly lighter than section */
                    border: 1px solid #2a2a4f; /* Subtle border */
                    border-radius: 12px; /* Rounded corners */
                    padding: 25px;
                    text-align: center;
                    width: 280px; /* Fixed width for cards */
                    box-shadow: 0 0 15px rgba(0, 0, 0, 0.4); /* Subtle card shadow */
                    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-color 0.3s ease; /* Smooth hover effects */
                    display: flex; /* Flex container for content */
                    flex-direction: column; /* Stack content vertically */
                    align-items: center; /* Center items horizontally within the card */
                    cursor: pointer; /* Indicates clickability */
                }

                .member-card:hover {
                    transform: translateY(-8px); /* Lift effect on hover */
                    box-shadow: 0 0 25px rgba(0, 230, 118, 0.5), 0 0 40px rgba(100, 255, 218, 0.3); /* Enhanced glow */
                    border-color: #64FFDA; /* Change border color on hover */
                }

                .member-card img {
                    width: 150px; /* Image width */
                    height: 150px; /* Image height */
                    border-radius: 50%; /* Circular images */
                    object-fit: cover; /* Ensures image covers the area without distortion */
                    margin-bottom: 15px;
                    border: 3px solid #64FFDA; /* Neon green/blue border for image */
                    box-shadow: 0 0 10px rgba(100, 255, 218, 0.7); /* Image glow */
                }

                .member-card h3 {
                    font-family: 'Orbitron', sans-serif;
                    color: #00E676; /* Bright green for name */
                    font-size: 1.6em;
                    margin-bottom: 5px;
                    text-shadow: 0 0 5px rgba(0, 230, 118, 0.5);
                }

                .member-card .post {
                    font-size: 1.1em;
                    color: #80CBC4; /* Muted cyan for post */
                    margin-bottom: 5px;
                }

                /* Initial details are hidden in card view for primary display */
                .member-card .date,
                .member-card .details-text {
                    display: none;
                }


                /*
                 * Member Table View Styles - Remodeled to match the image's table design
                 */
                .members-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                    background-color: #1a1a3f; /* Darker background for table */
                    border-radius: 12px;
                    overflow: hidden; /* Ensures rounded corners apply to children */
                    box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
                }

                .members-table th,
                .members-table td {
                    text-align: left;
                    padding: 15px;
                    border-bottom: 1px solid #2a2a4f; /* Darker border for table rows */
                    color: #E0F7FA;
                }

                .members-table th {
                    background-color: #2a2a4f; /* Header background like image */
                    color: #64FFDA; /* Header text color */
                    font-family: 'Orbitron', sans-serif;
                    font-size: 1em;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    position: sticky; /* Make header sticky */
                    top: 0;
                    z-index: 10;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Shadow for header */
                }

                .members-table tbody tr {
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                .members-table tbody tr:hover {
                    background-color: #252545; /* Darker on hover */
                }

                .members-table td img {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid #00E676; /* Green border for image in table */
                    box-shadow: 0 0 5px rgba(0, 230, 118, 0.5);
                }

                /*
                 * Member Detail Modal Styles
                 */
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.85); /* Darker semi-transparent background */
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    backdrop-filter: blur(8px); /* More pronounced blurred background */
                }

                .modal-content {
                    background-color: #1a1a3f; /* Darker background for modal */
                    padding: 40px;
                    border-radius: 15px;
                    box-shadow: 0 0 40px rgba(0, 230, 118, 0.9), 0 0 80px rgba(100, 255, 218, 0.7); /* More intense glow */
                    max-width: 600px;
                    width: 90%;
                    text-align: center;
                    position: relative;
                    animation: fadeInScale 0.3s ease-out; /* Entry animation */
                    border: 1px solid #64FFDA; /* Subtle border for modal */
                }

                @keyframes fadeInScale {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }

                .modal-content .close-button {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: none;
                    border: none;
                    font-size: 2em;
                    color: #64FFDA;
                    cursor: pointer;
                    line-height: 1;
                    padding: 5px;
                    transition: color 0.2s ease;
                }

                .modal-content .close-button:hover {
                    color: #00E676;
                }

                .modal-content img {
                    width: 180px;
                    height: 180px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 4px solid #00E676;
                    margin-bottom: 20px;
                    box-shadow: 0 0 15px rgba(0, 230, 118, 0.8);
                }

                .modal-content h3 {
                    font-family: 'Orbitron', sans-serif;
                    color: #64FFDA;
                    font-size: 2.2em;
                    margin-bottom: 10px;
                    text-shadow: 0 0 8px rgba(100, 255, 218, 0.7);
                }

                .modal-content .post {
                    font-size: 1.3em;
                    color: #80CBC4;
                    margin-bottom: 5px;
                }

                .modal-content .date {
                    font-size: 1.1em;
                    color: #B2EBF2;
                    margin-bottom: 20px;
                }

                .modal-content .details-text {
                    font-size: 1.1em;
                    color: #E0F7FA;
                    text-align: justify;
                }


                /*
                 * Footer Styles
                 */
                footer {
                    background-color: #1A1A3F;
                    padding: 20px;
                    text-align: center;
                    border-top: 2px solid #64FFDA;
                    box-shadow: 0 0 20px rgba(100, 255, 218, 0.5);
                    margin-top: 40px;
                    color: #80CBC4;
                    font-size: 0.9em;
                    border-radius: 15px 15px 0 0; /* Rounded top corners for footer */
                }


                /*
                 * Responsive Design
                 * Adjusts layout for smaller screens.
                 */
                @media (max-width: 768px) {
                    header {
                        flex-direction: column; /* Stack header elements */
                        padding: 20px;
                        align-items: flex-start;
                    }
                    .header-right {
                        margin-top: 20px;
                        margin-right: 0;
                        justify-content: center;
                        width: 100%;
                    }
                    header h1 {
                        font-size: 2em;
                    }

                    section h2 {
                        font-size: 2em;
                    }

                    .member-controls-top {
                        flex-direction: column;
                        gap: 20px;
                    }

                    .search-bar {
                        margin-right: 0;
                        width: 100%;
                        max-width: none;
                    }

                    .member-card {
                        width: 90%; /* Make cards take more width on small screens */
                        max-width: 320px; /* Max width for smaller screens */
                    }

                    .members-grid {
                        padding: 10px;
                    }

                    .members-table th,
                    .members-table td {
                        padding: 10px;
                        font-size: 0.9em;
                    }

                    .modal-content {
                        padding: 25px;
                    }

                    .modal-content h3 {
                        font-size: 1.8em;
                    }

                    .modal-content .post {
                        font-size: 1.1em;
                    }

                    .modal-content .date {
                        font-size: 1em;
                    }

                    .modal-content .details-text {
                        font-size: 1em;
                    }
                }

                @media (max-width: 480px) {
                    header h1 {
                        font-size: 1.8em;
                    }

                    header p {
                        font-size: 0.9em;
                    }

                    section h2 {
                        font-size: 1.6em;
                    }

                    .container {
                        padding: 10px;
                    }

                    .member-card {
                        padding: 15px;
                    }

                    .view-controls button {
                        padding: 8px 15px;
                        font-size: 0.9em;
                        margin: 0 5px;
                    }
                }
            `}</style>

            <header>
                <div className="header-left">
                    <div className="icon-box">
                        {/* Example SVG for an icon - you can replace this with any icon */}
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 7C10.34 7 9 8.34 9 10C9 11.66 10.34 13 12 13C13.66 13 15 11.66 15 10C15 8.34 13.66 7 12 7ZM12 15C9.33 15 4 16.34 4 19V20H20V19C20 16.34 14.67 15 12 15Z" fill="#0A0A1F"/>
                        </svg>
                    </div>
                    <div className="header-text">
                        <h1>Association Of DSOCSA</h1>
                    </div>
                </div>
                <div className="header-right">
                    <div className="info-box">
                        <div className="value">13</div>
                        <div className="label">Total Members</div>
                    </div>
                    <div className="info-box">
                        <div className="value">0</div>
                        <div className="label">New Today</div>
                    </div>
                </div>
            </header>

            <main className="container">
                <section id="about">
                    <h2>About Us</h2>
                    <div className="about-content">
                        <p>The AI Innovators Collective is a group of visionary researchers, developers, and thinkers dedicated to advancing the field of Artificial Intelligence. Our mission is to explore groundbreaking concepts, develop ethical AI solutions, and foster a collaborative environment for sharing knowledge and pushing technological boundaries. We believe in the transformative power of AI to solve complex global challenges and improve human lives.</p>
                        <p>Since our inception in 2019, we have been at the forefront of AI research, contributing to advancements in machine learning, neural networks, natural language processing, and computer vision. Our diverse team brings together expertise from various domains, ensuring a holistic and innovative approach to every project.</p>
                    </div>
                </section>

                <section id="members">
                    <h2>Our Core Innovators</h2>
                    <div className="member-controls-top">
                        <div className="search-bar">
                            <input type="text" placeholder="Search members..." />
                        </div>
                        <div className="view-controls">
                            <button
                                onClick={() => setViewMode('card')}
                                className={viewMode === 'card' ? 'active' : ''}
                            >
                                Cards
                            </button>
                            <button
                                onClick={() => setViewMode('table')}
                                className={viewMode === 'table' ? 'active' : ''}
                            >
                                Table
                            </button>
                        </div>
                    </div>

                    {viewMode === 'card' ? (
                        <div className="members-grid">
                            {members.map(member => (
                                <div className="member-card" key={member.id} onClick={() => openMemberDetails(member)}>
                                    <img src={member.image} alt={member.name} />
                                    <h3>{member.name}</h3>
                                    <p className="post">{member.post}</p>
                                    {/* Detailed content is hidden in the card, shown in modal */}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <table className="members-table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Post</th>
                                    <th>Joined Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map(member => (
                                    <tr key={member.id} onClick={() => openMemberDetails(member)}>
                                        <td><img src={member.image} alt={member.name} /></td>
                                        <td>{member.name}</td>
                                        <td>{member.post}</td>
                                        <td>{member.date.replace('Joined: ', '')}</td> {/* Display only date part */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </section>
            </main>

            <footer>
                <p>&copy; 2024 AI Innovators Collective. All rights reserved.</p>
            </footer>

            {/* Member Detail Modal */}
            {selectedMember && (
                <div className="modal-overlay" onClick={closeMemberDetails}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-button" onClick={closeMemberDetails}>&times;</button>
                        <img src={selectedMember.image} alt={selectedMember.name} />
                        <h3>{selectedMember.name}</h3>
                        <p className="post">{selectedMember.post}</p>
                        <p className="date">{selectedMember.date}</p>
                        <p className="details-text">{selectedMember.details}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Association;
