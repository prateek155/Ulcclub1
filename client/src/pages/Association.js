import React, { useState } from 'react';

const Association = () => {
    // Member data for 14 members (fixed duplicate ID)
    const members = [
        {
            id: 1,
            name: "Hritik Shankhala",
            post: "President",
            date: "Joined: Aug 2025",
            image: "https://placehold.co/150x150/00E676/0A0A1F?text=HS",
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
            image: "https://placehold.co/150x150/00E676/0A0A1F?text=VT",
            details: "Focuses on autonomous systems and human-robot interaction with a flair for design. Vidushi integrates advanced AI perception into robotic platforms for seamless operation."
        },
        {
            id: 4,
            name: "Prateek Agrawal",
            post: "General Secretary",
            date: "Joined: Aug 2025",
            image: "/image/me.jpg",
            details: "Pioneering research in reinforcement learning and explainable AI paradigms. Prateek's work helps demystify complex AI decisions, making them transparent and auditable."
        },
        {
            id: 5,
            name: "Shruti Jamadar",
            post: "Joint Secretary",
            date: "Joined: Aug 2025",
            image: "https://placehold.co/150x150/00E676/0A0A1F?text=SJ",
            details: "Ensures all AI developments align with moral and societal well-being. Advocates for fairness, accountability, and transparency in artificial intelligence systems."
        },
        {
            id: 6,
            name: "Soham Borate",
            post: "Treasurer",
            date: "Joined: Aug 2025",
            image: "https://placehold.co/150x150/64FFDA/0A0A1F?text=SB",
            details: "Developing cutting-edge NLP models for multi-lingual comprehension and generation. Soham's projects include advanced conversational AI and semantic understanding."
        },
        {
            id: 7,
            name: "Yadnesh Kulkarni",
            post: "Head of Tech Operations",
            date: "Joined: Aug 2025",
            image: "https://placehold.co/150x150/00E676/0A0A1F?text=YK",
            details: "Innovates in real-time image recognition and 3D reconstruction for complex environments. Yadnesh's work is critical for autonomous navigation and augmented reality applications."
        },
        {
            id: 8,
            name: "Shashwat",
            post: "SRO",
            date: "Joined: Aug 2025",
            image: "/image/shashwat.jpg",
            details: "Designing efficient hardware architectures optimized for AI computation. Shashwat focuses on low-power, high-performance chips that drive next-generation AI devices."
        },
        {
            id: 9,
            name: "Aditya",
            post: "SRO",
            date: "Joined: Aug 2025",
            image: "https://placehold.co/150x150/00E676/0A0A1F?text=AD",
            details: "Builds robust and scalable software infrastructure for AI deployment. Aditya is instrumental in developing the platforms that host and serve our AI models."
        },
        {
            id: 10,
            name: "Akshat Kanoj",
            post: "Sponsors",
            date: "Joined: Aug 2025",
            image: "https://placehold.co/150x150/64FFDA/0A0A1F?text=AK",
            details: "Exploring the intersection of quantum computing and artificial intelligence. Akshat is developing new algorithms that leverage quantum principles for AI breakthroughs."
        },
        {
            id: 11,
            name: "Akshay Muley",
            post: "Alumni Relations",
            date: "Joined: Aug 2025",
            image: "https://placehold.co/150x150/00E676/0A0A1F?text=AM",
            details: "Streamlines machine learning workflows from development to production. Akshay ensures that AI models are deployed, monitored, and maintained efficiently in operational environments."
        },
        {
            id: 12,
            name: "Vinita Paryani",
            post: "Ladies Representative",
            date: "Joined: Aug 2025",
            image: "https://placehold.co/150x150/64FFDA/0A0A1F?text=VP",
            details: "Conducts theoretical and applied research in advanced AI algorithms and learning paradigms. Vinita's work often involves exploring novel approaches to deep learning and cognitive systems."
        },
        {
            id: 13,
            name: "Samarth",
            post: "Sports Head",
            date: "Joined: Aug 2025",
            image: "https://placehold.co/150x150/00E676/0A0A1F?text=SM",
            details: "Specializes in securing AI systems and using AI for threat detection. Samarth develops robust defenses against adversarial attacks and ensures data privacy in AI applications."
        },
        {
            id: 14,
            name: "Aditi",
            post: "Cultural Head",
            date: "Joined: Aug 2025",
            image: "https://placehold.co/150x150/00E676/0A0A1F?text=AD",
            details: "Focuses on the intersection of AI and creative arts. Aditi explores how artificial intelligence can enhance cultural expression and preserve traditional art forms through innovative technology."
        }
    ];

    const [viewMode, setViewMode] = useState('card');
    const [selectedMember, setSelectedMember] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const openMemberDetails = (member) => {
        setSelectedMember(member);
    };

    const closeMemberDetails = () => {
        setSelectedMember(null);
    };

    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.post.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-cyan-100 font-mono">
            {/* Header */}
            <header className="bg-slate-800 shadow-2xl shadow-cyan-500/20 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 lg:px-6 lg:py-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        {/* Header Left */}
                        <div className="flex items-center gap-3 lg:gap-4">
                            <div className="bg-green-400 p-2 rounded-lg shadow-lg shadow-green-400/50">
                                <svg className="w-6 h-6 lg:w-8 lg:h-8 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 7C10.34 7 9 8.34 9 10C9 11.66 10.34 13 12 13C13.66 13 15 11.66 15 10C15 8.34 13.66 7 12 7ZM12 15C9.33 15 4 16.34 4 19V20H20V19C20 16.34 14.67 15 12 15Z"/>
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-xl lg:text-3xl font-bold text-cyan-300 tracking-wider drop-shadow-lg">
                                    Association Of DSOCSA
                                </h1>
                                <p className="text-xs lg:text-sm text-cyan-200 mt-1">
                                    Innovative AI Research Community
                                </p>
                            </div>
                        </div>

                        {/* Header Right */}
                        <div className="flex gap-3 lg:gap-4 justify-center lg:justify-end">
                            <div className="bg-slate-700 rounded-lg p-3 lg:p-4 text-center shadow-lg shadow-cyan-500/20 min-w-[80px]">
                                <div className="text-lg lg:text-2xl font-bold text-cyan-300">{filteredMembers.length}</div>
                                <div className="text-xs lg:text-sm text-cyan-200">Total Members</div>
                            </div>
                            <div className="bg-slate-700 rounded-lg p-3 lg:p-4 text-center shadow-lg shadow-cyan-500/20 min-w-[80px]">
                                <div className="text-lg lg:text-2xl font-bold text-cyan-300">0</div>
                                <div className="text-xs lg:text-sm text-cyan-200">New Today</div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6 lg:px-6 lg:py-8">
                {/* About Section */}
                <section className="bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 lg:p-8 mb-8 shadow-xl shadow-cyan-500/10">
                    <h2 className="text-2xl lg:text-4xl font-bold text-cyan-300 text-center mb-6 lg:mb-8 tracking-wider">
                        About Us
                    </h2>
                    <div className="max-w-4xl mx-auto space-y-4 lg:space-y-6 text-sm lg:text-base text-cyan-100 leading-relaxed">
                        <p className="text-justify lg:text-center">
                            The DSOCSA Association is a group of visionary researchers, developers, and 
                            thinkers dedicated to advancing the field of Artificial Intelligence. Our mission is to 
                            explore groundbreaking concepts, develop ethical AI solutions, and foster a collaborative 
                            environment for sharing knowledge and pushing technological boundaries.
                        </p>
                        <p className="text-justify lg:text-center">
                            Since our inception in 2025, we have been at the forefront of AI research, contributing 
                            to advancements in machine learning, neural networks, natural language processing, and 
                            computer vision. Our diverse team brings together expertise from various domains.
                        </p>
                    </div>
                </section>

                {/* Members Section */}
                <section className="bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl shadow-cyan-500/10">
                    <h2 className="text-2xl lg:text-4xl font-bold text-cyan-300 text-center mb-6 lg:mb-8 tracking-wider">
                        Our Core Innovators
                    </h2>

                    {/* Controls */}
                    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-6 lg:mb-8">
                        {/* Search Bar */}
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search members..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-cyan-100 placeholder-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                            />
                        </div>

                        {/* View Toggle */}
                        <div className="flex bg-slate-700 rounded-lg p-1 self-start lg:self-center">
                            <button
                                onClick={() => setViewMode('card')}
                                className={`px-4 py-2 rounded-md transition-all duration-300 text-sm lg:text-base ${
                                    viewMode === 'card'
                                        ? 'bg-green-400 text-slate-900 shadow-lg shadow-green-400/50'
                                        : 'text-cyan-200 hover:text-cyan-100'
                                }`}
                            >
                                Cards
                            </button>
                            <button
                                onClick={() => setViewMode('table')}
                                className={`px-4 py-2 rounded-md transition-all duration-300 text-sm lg:text-base ${
                                    viewMode === 'table'
                                        ? 'bg-green-400 text-slate-900 shadow-lg shadow-green-400/50'
                                        : 'text-cyan-200 hover:text-cyan-100'
                                }`}
                            >
                                Table
                            </button>
                        </div>
                    </div>

                    {/* Members Display */}
                    {viewMode === 'card' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                            {filteredMembers.map(member => (
                                <div
                                    key={member.id}
                                    onClick={() => openMemberDetails(member)}
                                    className="bg-slate-700/80 backdrop-blur-sm border border-slate-600 rounded-xl p-4 lg:p-6 text-center cursor-pointer transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/30 transition-all duration-300 hover:border-cyan-400"
                                >
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-20 h-20 lg:w-24 lg:h-24 xl:w-32 xl:h-32 rounded-full mx-auto mb-3 lg:mb-4 border-2 lg:border-3 border-cyan-400 shadow-lg shadow-cyan-400/50 object-cover"
                                        onError={(e) => {
                                            e.target.src = `https://placehold.co/150x150/00E676/0A0A1F?text=${member.name.split(' ').map(n => n[0]).join('')}`;
                                        }}
                                    />
                                    <h3 className="font-bold text-green-400 text-base lg:text-lg xl:text-xl mb-1 lg:mb-2 tracking-wide">
                                        {member.name}
                                    </h3>
                                    <p className="text-cyan-300 text-xs lg:text-sm xl:text-base">
                                        {member.post}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="overflow-x-auto rounded-lg shadow-lg">
                            <table className="w-full bg-slate-700 rounded-lg overflow-hidden">
                                <thead className="bg-slate-600">
                                    <tr>
                                        <th className="px-3 py-3 lg:px-6 lg:py-4 text-left text-xs lg:text-sm font-bold text-cyan-300 uppercase tracking-wider">
                                            Image
                                        </th>
                                        <th className="px-3 py-3 lg:px-6 lg:py-4 text-left text-xs lg:text-sm font-bold text-cyan-300 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-3 py-3 lg:px-6 lg:py-4 text-left text-xs lg:text-sm font-bold text-cyan-300 uppercase tracking-wider">
                                            Post
                                        </th>
                                        <th className="px-3 py-3 lg:px-6 lg:py-4 text-left text-xs lg:text-sm font-bold text-cyan-300 uppercase tracking-wider hidden sm:table-cell">
                                            Joined
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMembers.map(member => (
                                        <tr
                                            key={member.id}
                                            onClick={() => openMemberDetails(member)}
                                            className="border-b border-slate-600 hover:bg-slate-600/50 cursor-pointer transition-colors duration-200"
                                        >
                                            <td className="px-3 py-3 lg:px-6 lg:py-4">
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-green-400 object-cover"
                                                    onError={(e) => {
                                                        e.target.src = `https://placehold.co/150x150/00E676/0A0A1F?text=${member.name.split(' ').map(n => n[0]).join('')}`;
                                                    }}
                                                />
                                            </td>
                                            <td className="px-3 py-3 lg:px-6 lg:py-4 text-xs lg:text-sm text-cyan-100 font-medium">
                                                {member.name}
                                            </td>
                                            <td className="px-3 py-3 lg:px-6 lg:py-4 text-xs lg:text-sm text-cyan-300">
                                                {member.post}
                                            </td>
                                            <td className="px-3 py-3 lg:px-6 lg:py-4 text-xs lg:text-sm text-cyan-200 hidden sm:table-cell">
                                                {member.date.replace('Joined: ', '')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {filteredMembers.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-cyan-300 text-lg">No members found matching your search.</p>
                        </div>
                    )}
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-slate-800 border-t-2 border-cyan-400 mt-12">
                <div className="container mx-auto px-4 py-6 lg:px-6 lg:py-8 text-center">
                    <p className="text-cyan-300 text-sm lg:text-base">
                        &copy; 2025 Association Of DSOCSA. All rights reserved.
                    </p>
                </div>
            </footer>

            {/* Member Detail Modal */}
            {selectedMember && (
                <div 
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={closeMemberDetails}
                >
                    <div
                        className="bg-slate-800 rounded-2xl p-6 lg:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-cyan-400/50 border border-cyan-400/30 transform animate-in zoom-in-95 duration-300"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={closeMemberDetails}
                            className="absolute top-4 right-4 text-2xl lg:text-3xl text-cyan-400 hover:text-cyan-300 transition-colors duration-200 w-8 h-8 flex items-center justify-center"
                        >
                            ×
                        </button>

                        <div className="text-center">
                            <img
                                src={selectedMember.image}
                                alt={selectedMember.name}
                                className="w-24 h-24 lg:w-32 lg:h-32 rounded-full mx-auto mb-4 lg:mb-6 border-3 lg:border-4 border-green-400 shadow-xl shadow-green-400/50 object-cover"
                                onError={(e) => {
                                    e.target.src = `https://placehold.co/150x150/00E676/0A0A1F?text=${selectedMember.name.split(' ').map(n => n[0]).join('')}`;
                                }}
                            />
                            <h3 className="text-xl lg:text-3xl font-bold text-cyan-300 mb-2 lg:mb-3 tracking-wide">
                                {selectedMember.name}
                            </h3>
                            <p className="text-base lg:text-xl text-green-400 mb-2 lg:mb-3 font-medium">
                                {selectedMember.post}
                            </p>
                            <p className="text-sm lg:text-base text-cyan-200 mb-4 lg:mb-6">
                                {selectedMember.date}
                            </p>
                            <p className="text-sm lg:text-base text-cyan-100 leading-relaxed text-justify">
                                {selectedMember.details}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Association;
