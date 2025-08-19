import React, { useState, useEffect, useCallback } from 'react';
import { PlusCircle, Trash2, Edit, Save, XCircle, FileText, Calendar, User, Hash, CheckCircle, Grid, List, Image, CloudOff, X } from 'lucide-react';
import Papa from "papaparse";
// import Papa from 'papaparse'; // Removed: Assuming Papa is globally available

// --- Utility Functions for CSV Parsing and Image Handling ---

const getFieldIcon = (fieldName) => {
    const name = fieldName.toLowerCase();
    if (name.includes('timestamp') || name.includes('date') || name.includes('time')) return <Calendar className="field-icon" />;
    if (name.includes('name') || name.includes('volunteer') || name.includes('person')) return <User className="field-icon" />;
    if (name.includes('id') || name.includes('number') || name.includes('index')) return <Hash className="field-icon" />;
    if (name.includes('status') || name.includes('approved')) return <CheckCircle className="field-icon" />;
    if (name.includes('photo') || name.includes('image') || name.includes('picture') || name.includes('url')) return <Image className="field-icon" />;
    return <FileText className="field-icon" />;
};

const isImageField = (fieldName) => {
    const name = fieldName.toLowerCase();
    return name.includes('photo') || name.includes('image') || name.includes('picture') || name.includes('url');
};

const convertToDirectImageUrl = (url) => {
    if (!url || typeof url !== 'string') return url;

    // Google Drive URL conversion
    if (url.includes('drive.google.com')) {
        let fileId = null;
        if (url.includes('open?id=')) {
            fileId = url.match(/open\?id=([a-zA-Z0-9_-]+)/)?.[1];
        } else if (url.includes('/file/d/')) {
            fileId = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)?.[1];
        } else if (url.includes('uc?id=')) {
            fileId = url.match(/uc\?id=([a-zA-Z0-9_-]+)/)?.[1];
        }
        if (fileId) {
            return `https://drive.google.com/uc?export=view&id=${fileId}`;
        }
    }

    // Google Photos or Googleusercontent (often direct image already)
    if (url.includes('photos.google.com') || url.includes('googleusercontent.com')) {
        return url;
    }

    // Dropbox URL conversion
    if (url.includes('dropbox.com') && !url.includes('raw=1')) {
        return url.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('?dl=0', '?raw=1');
    }

    return url;
};

const isImageUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
    const convertedUrl = convertToDirectImageUrl(url);

    if (/\.(jpg|jpeg|png|gif|bmp|webp|svg)(\?.*)?$/i.test(convertedUrl)) {
        return true;
    }

    if (convertedUrl.includes('drive.google.com/uc?export=view') ||
        convertedUrl.includes('googleusercontent.com') ||
        convertedUrl.includes('imgur.com') ||
        convertedUrl.includes('cloudinary.com') ||
        convertedUrl.includes('aws.amazon.com') ||
        convertedUrl.includes('googleapis.com')) {
        return true;
    }
    return false;
};

// --- Main Volunteer Component ---
function Volunteer() {
    // Events are now stored in local state, not persisted by Firebase
    const [events, setEvents] = useState([]);
    const [loadingApp, setLoadingApp] = useState(false); // Only for initial app load, not data fetching
    const [appError, setAppError] = useState(null); // General app error, not specific to data fetch
    const [isAddingEvent, setIsAddingEvent] = useState(false);
    const [newEventForm, setNewEventForm] = useState({ name: '', date: '', description: '', googleSheetCSVUrl: '' });
    const [eventCreationError, setEventCreationError] = useState(null);

    // Initial app loading state (no Firebase dependencies)
    useEffect(() => {
        setLoadingApp(false); // App is ready as soon as component mounts
    }, []);

    // --- CRUD Operations for Events (now local to the session) ---
    const handleAddEvent = (e) => {
        e.preventDefault();
        setEventCreationError(null);

        if (!newEventForm.name || !newEventForm.date || !newEventForm.description || !newEventForm.googleSheetCSVUrl) {
            setEventCreationError("All fields are required.");
            return;
        }

        try {
            const newEvent = {
                id: `event-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, // Unique ID
                ...newEventForm,
                timestamp: Date.now(),
            };
            setEvents(prevEvents => [newEvent, ...prevEvents]); // Add new event to top of list
            setNewEventForm({ name: '', date: '', description: '', googleSheetCSVUrl: '' });
            setIsAddingEvent(false);
        } catch (error) {
            console.error("Error adding event locally:", error);
            setEventCreationError("Failed to add event. Please check your input and try again.");
        }
    };

    const handleDeleteEvent = (eventId) => {
        // IMPORTANT: For a production app, replace window.confirm with a custom modal UI.
        if (window.confirm('Are you sure you want to delete this event? This action is local to the app and will not persist.')) {
            setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
            console.log("Event deleted locally!");
        }
    };

    // --- Loading and Error States for the overall App ---
    if (loadingApp) {
        return (
            <div className="loading-container">
                <div className="ai-loader">
                    <div className="loader-core"></div>
                    <div className="loader-ring"></div>
                </div>
                <p className="loading-text">Starting Volunteer Hub...</p>
            </div>
        );
    }

    if (appError) {
        return (
            <div className="error-container">
                <CloudOff size={64} className="error-icon" />
                <h2 className="error-title">Oops! Something went wrong.</h2>
                <p className="error-message">{appError}</p>
                <p className="error-tip">Please try refreshing the page.</p>
            </div>
        );
    }

    return (
        <div className="cr-container">
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                }
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .cr-container {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
                    color: #e0e0e0;
                    font-family: 'Inter', sans-serif;
                    padding-bottom: 3rem; /* Space for footer/bottom content */
                }

                .header-section {
                    background: linear-gradient(90deg, #1e3c72 0%, #2a5298 100%);
                    padding: 2rem;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                }

                .header-content {
                    max-width: 1400px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 2rem;
                }

                .title-section {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .main-icon {
                    width: 3rem;
                    height: 3rem;
                    color: #00d4ff;
                }

                .title-section h1 {
                    font-size: 2.5rem;
                    font-weight: 700;
                    background: linear-gradient(45deg, #00d4ff, #90e0ef);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .title-section p {
                    font-size: 1.1rem;
                    color: #b0c4de;
                    margin-top: 0.5rem;
                }

                .stats-grid {
                    display: flex;
                    gap: 1.5rem;
                }

                .stat-card {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    padding: 1.5rem;
                    border-radius: 12px;
                    text-align: center;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .stat-number {
                    display: block;
                    font-size: 2rem;
                    font-weight: 700;
                    color: #00d4ff;
                }

                .stat-label {
                    font-size: 0.9rem;
                    color: #b0c4de;
                }

                .controls-section {
                    padding: 2rem;
                    background: rgba(0, 0, 0, 0.2);
                    border-bottom: 1px solid rgba(0, 212, 255, 0.2);
                }

                .controls-container {
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .add-event-btn {
                    width: 100%;
                    padding: 1rem 1.5rem;
                    background: linear-gradient(45deg, #8a2be2, #4b0082); /* Darker purple */
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(138, 43, 226, 0.3);
                }

                .add-event-btn:hover {
                    background: linear-gradient(45deg, #9932cc, #6a5acd);
                    transform: translateY(-3px);
                    box-shadow: 0 8px 20px rgba(138, 43, 226, 0.4);
                }

                .add-event-form {
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(138, 43, 226, 0.4);
                    border-radius: 16px;
                    padding: 2rem;
                    margin-top: 2rem;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
                    backdrop-filter: blur(10px);
                }

                .add-event-form h2 {
                    font-size: 1.8rem;
                    font-weight: 700;
                    color: #00d4ff;
                    margin-bottom: 1.5rem;
                    text-align: center;
                }

                .form-group {
                    margin-bottom: 1.25rem;
                }

                .form-group label {
                    display: block;
                    font-size: 0.95rem;
                    font-weight: 500;
                    color: #b0c4de;
                    margin-bottom: 0.5rem;
                }

                .form-group input,
                .form-group textarea {
                    width: 100%;
                    padding: 0.9rem 1.25rem;
                    background: rgba(255, 255, 255, 0.15);
                    border: 1px solid rgba(0, 212, 255, 0.3);
                    border-radius: 10px;
                    color: #e0e0e0;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                }

                .form-group input:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: #00d4ff;
                    box-shadow: 0 0 15px rgba(0, 212, 255, 0.4);
                }

                .form-group input::placeholder,
                .form-group textarea::placeholder {
                    color: #888;
                }

                .form-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
                    margin-top: 1.5rem;
                }

                .form-actions button {
                    padding: 0.8rem 1.8rem;
                    border: none;
                    border-radius: 10px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                }

                .form-actions .submit-btn {
                    background: linear-gradient(45deg, #00d4ff, #90e0ef);
                    color: #1a1a2e;
                }

                .form-actions .submit-btn:hover {
                    opacity: 0.9;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 15px rgba(0, 212, 255, 0.3);
                }

                .form-actions .cancel-btn {
                    background: #555;
                    color: white;
                }

                .form-actions .cancel-btn:hover {
                    background: #777;
                    transform: translateY(-2px);
                }

                .error-message-inline {
                    color: #ff453a;
                    font-size: 0.9rem;
                    margin-top: 0.5rem;
                }

                .data-section {
                    padding: 2rem;
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .loading-container, .error-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    gap: 2rem;
                    background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
                    color: #e0e0e0;
                }

                .ai-loader {
                    position: relative;
                    width: 80px;
                    height: 80px;
                }

                .loader-core {
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(45deg, #00d4ff, #90e0ef);
                    border-radius: 50%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    animation: pulse 2s infinite;
                }

                .loader-ring {
                    width: 80px;
                    height: 80px;
                    border: 3px solid transparent;
                    border-top: 3px solid #00d4ff;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                @keyframes pulse {
                    0%, 100% { transform: translate(-50%, -50%) scale(1); }
                    50% { transform: translate(-50%, -50%) scale(1.2); }
                }

                .loading-text {
                    font-size: 1.2rem;
                    color: #b0c4de;
                }

                .error-icon {
                    color: #ff453a;
                    margin-bottom: 1rem;
                }

                .error-title {
                    font-size: 2rem;
                    color: #ff453a;
                    margin-bottom: 1rem;
                }

                .error-message {
                    font-size: 1.1rem;
                    color: #e0e0e0;
                    text-align: center;
                    max-width: 600px;
                }

                .error-tip {
                    font-size: 0.9rem;
                    color: #b0c4de;
                    margin-top: 1rem;
                }

                /* Event Card Styles */
                .event-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
                    gap: 3rem;
                }

                .event-card {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(0, 212, 255, 0.2);
                    border-radius: 16px;
                    padding: 2rem;
                    backdrop-filter: blur(10px);
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }

                .event-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 5px;
                    background: linear-gradient(90deg, #00d4ff, #90e0ef);
                }

                .event-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 15px 40px rgba(0, 212, 255, 0.25);
                    border-color: #00d4ff;
                }

                .event-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1.5rem;
                }

                .event-title-group h2 {
                    font-size: 2.2rem;
                    font-weight: 700;
                    color: #00d4ff;
                    margin-bottom: 0.5rem;
                }

                .event-date {
                    font-size: 1rem;
                    color: #b0c4de;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .event-description {
                    font-size: 1rem;
                    color: #b0c4de;
                    margin-bottom: 1.5rem;
                    line-height: 1.6;
                }

                .event-actions-top {
                    display: flex;
                    gap: 0.75rem;
                    align-items: center;
                }

                .event-actions-top button {
                    background: rgba(255, 255, 255, 0.15);
                    border: 1px solid rgba(0, 212, 255, 0.3);
                    color: #00d4ff;
                    padding: 0.75rem 1rem;
                    border-radius: 10px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.3s ease;
                }

                .event-actions-top button:hover {
                    background: #00d4ff;
                    color: #1a1a2e;
                    box-shadow: 0 5px 15px rgba(0, 212, 255, 0.3);
                }

                .event-actions-top .delete-btn-event {
                    background: rgba(255, 69, 58, 0.2);
                    color: #ff453a;
                    border-color: rgba(255, 69, 58, 0.4);
                }
                .event-actions-top .delete-btn-event:hover {
                    background: #ff453a;
                    color: white;
                }

                .view-toggle-event {
                    display: flex;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    padding: 0.5rem;
                    backdrop-filter: blur(10px);
                    margin-bottom: 1.5rem;
                    align-self: flex-start; /* Align to the start within flex column */
                }

                .toggle-btn-event {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.5rem;
                    border: none;
                    background: transparent;
                    color: #b0c4de;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-weight: 500;
                }

                .toggle-btn-event.active {
                    background: #00d4ff;
                    color: #0f0f23;
                }

                .toggle-btn-event:hover:not(.active) {
                    background: rgba(0, 212, 255, 0.2);
                    color: #00d4ff;
                }

                .no-data {
                    text-align: center;
                    padding: 3rem 0;
                    color: #888;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                    font-size: 1.1rem;
                }

                .no-data-icon {
                    width: 3rem;
                    height: 3rem;
                    color: #555;
                }

                /* Shared styles for Cards & Table */
                .cr-grid { /* For cards */
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1.5rem;
                    margin-top: 1.5rem;
                }

                .cr-card {
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(0, 212, 255, 0.25);
                    border-radius: 12px;
                    padding: 1.25rem;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    transition: all 0.2s ease;
                    display: flex;
                    flex-direction: column;
                }

                .cr-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0, 212, 255, 0.15);
                }

                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }

                .cr-id {
                    font-weight: 600;
                    color: #00d4ff;
                    font-size: 1rem;
                }

                .card-actions {
                    display: flex;
                    gap: 0.4rem;
                }

                .card-actions button, .table-actions button {
                    padding: 0.4rem;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(255, 255, 255, 0.1);
                    color: #00d4ff;
                }
                .card-actions button:hover, .table-actions button:hover {
                    background: #00d4ff;
                    color: #1a1a2e;
                }

                .card-content {
                    display: flex;
                    flex-direction: column;
                    gap: 0.8rem;
                }

                .field-row {
                    display: flex;
                    flex-direction: column;
                    gap: 0.4rem;
                }

                .field-label {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    font-weight: 500;
                    color: #b0c4de;
                    font-size: 0.85rem;
                    text-transform: capitalize;
                }

                .field-icon {
                    width: 14px;
                    height: 14px;
                    color: #90e0ef;
                }

                .field-value {
                    background: rgba(255, 255, 255, 0.1);
                    padding: 0.6rem 0.8rem;
                    border-radius: 8px;
                    color: #e0e0e0;
                    min-height: 2.5rem;
                    display: flex;
                    align-items: center;
                    word-break: break-word;
                    line-height: 1.4;
                    font-size: 0.9rem;
                }

                .field-input {
                    background: rgba(255, 255, 255, 0.15);
                    border: 1px solid rgba(0, 212, 255, 0.3);
                    border-radius: 8px;
                    padding: 0.6rem 0.8rem;
                    color: #e0e0e0;
                    font-size: 0.9rem;
                    transition: all 0.2s ease;
                    width: 100%;
                }

                .field-input:focus {
                    outline: none;
                    border-color: #00d4ff;
                    box-shadow: 0 0 8px rgba(0, 212, 255, 0.3);
                }

                .image-edit-container {
                    display: flex;
                    flex-direction: column;
                    gap: 0.4rem;
                }

                .card-image-preview {
                    margin-top: 0.5rem;
                    display: flex;
                    justify-content: center;
                }

                .card-image-preview img {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid #00d4ff;
                }

                .card-image-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 70px;
                    height: 70px;
                    margin: 0.5rem auto;
                }

                .card-image {
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 3px solid #00d4ff;
                    box-shadow: 0 0 12px rgba(0, 212, 255, 0.2);
                }

                /* Table View Styles */
                .table-container {
                    overflow-x: auto;
                    border-radius: 12px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(0, 212, 255, 0.2);
                    backdrop-filter: blur(10px);
                    margin-top: 1.5rem;
                }

                .cr-table {
                    width: 100%;
                    border-collapse: collapse;
                    min-width: 700px;
                }

                .cr-table th {
                    background: rgba(0, 212, 255, 0.1);
                    padding: 0.8rem;
                    text-align: left;
                    font-weight: 600;
                    color: #00d4ff;
                    border-bottom: 2px solid rgba(0, 212, 255, 0.3);
                    position: sticky;
                    top: 0;
                    z-index: 10;
                    font-size: 0.9rem;
                }

                .cr-table td {
                    padding: 0.8rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    color: #e0e0e0;
                    vertical-align: middle;
                    font-size: 0.9rem;
                }

                .cr-table tr:hover {
                    background: rgba(0, 212, 255, 0.05);
                }

                .cr-table tr.editing {
                    background: rgba(0, 212, 255, 0.1);
                }

                .table-actions {
                    display: flex;
                    gap: 0.4rem;
                    justify-content: center;
                }

                .field-content {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                }

                .field-text {
                    word-break: break-word;
                    max-width: 180px;
                }

                .table-image-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 50px;
                    height: 50px;
                }

                .table-image {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid #00d4ff;
                }

                .image-fallback {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 0.25rem;
                    color: #888;
                    font-size: 0.75rem;
                    padding: 0.5rem;
                    border: 1px dashed #555;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                }
                .image-fallback svg {
                    width: 20px;
                    height: 20px;
                }

                /* Responsive Adjustments */
                @media (max-width: 1024px) {
                    .header-content {
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                    }
                    .stats-grid {
                        justify-content: center;
                    }
                    .event-grid {
                        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                        gap: 2rem;
                    }
                    .cr-table {
                        min-width: 600px;
                    }
                }

                @media (max-width: 768px) {
                    .title-section h1 {
                        font-size: 2rem;
                    }
                    .title-section p {
                        font-size: 1rem;
                    }
                    .header-section, .controls-section, .data-section {
                        padding: 1.5rem;
                    }
                    .event-grid {
                        grid-template-columns: 1fr;
                        gap: 1.5rem;
                    }
                    .event-card {
                        padding: 1.5rem;
                    }
                    .event-title-group h2 {
                        font-size: 1.8rem;
                    }
                    .cr-card {
                        padding: 1rem;
                    }
                    .cr-id {
                        font-size: 0.9rem;
                    }
                    .field-label {
                        font-size: 0.8rem;
                    }
                    .field-value, .field-input {
                        font-size: 0.85rem;
                        padding: 0.5rem 0.7rem;
                    }
                    .cr-table th, .cr-table td {
                        font-size: 0.8rem;
                        padding: 0.6rem;
                    }
                    .table-image, .table-image-container, .image-fallback {
                        width: 40px;
                        height: 40px;
                    }
                    .card-image, .card-image-container, .card-image-preview img {
                        width: 60px;
                        height: 60px;
                    }
                }

                @media (max-width: 480px) {
                    .header-section, .controls-section, .data-section {
                        padding: 1rem;
                    }
                    .event-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 1rem;
                    }
                    .event-actions-top {
                        width: 100%;
                        justify-content: space-between;
                    }
                    .add-event-btn {
                        font-size: 1rem;
                        padding: 0.8rem;
                    }
                    .form-actions {
                        flex-direction: column;
                        gap: 0.75rem;
                    }
                    .form-actions button {
                        width: 100%;
                    }
                    .cr-table {
                        font-size: 0.7rem;
                        min-width: unset; /* Allow table to shrink more on very small screens */
                    }
                }
            `}</style>

            <div className="header-section">
                <div className="header-content">
                    <div className="title-section">
                        <FileText className="main-icon" />
                        <div>
                            <h1>Multi-Event Volunteer Hub</h1>
                            <p>Organize volunteers across various initiatives</p>
                        </div>
                    </div>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <span className="stat-number">{events.length}</span>
                            <span className="stat-label">Total Events</span>
                        </div>
                        <div className="stat-card">
                            {/* Calculate total volunteers from all events */}
                            <span className="stat-number">
                                {events.reduce((acc, event) => acc + (event.volunteers?.length || 0), 0)}
                            </span>
                            <span className="stat-label">Total Volunteers (fetched)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="controls-section">
                <div className="controls-container">
                    <button
                        onClick={() => setIsAddingEvent(!isAddingEvent)}
                        className="add-event-btn"
                    >
                        <PlusCircle size={24} /> {isAddingEvent ? 'Close Event Form' : 'Add New Event'}
                    </button>
                    {isAddingEvent && (
                        <div className="add-event-form">
                            <h2>Create New Volunteer Event</h2>
                            {eventCreationError && <p className="error-message-inline">{eventCreationError}</p>}
                            <form onSubmit={handleAddEvent}>
                                <div className="form-group">
                                    <label htmlFor="eventName">Event Name:</label>
                                    <input
                                        type="text"
                                        id="eventName"
                                        value={newEventForm.name}
                                        onChange={(e) => setNewEventForm({ ...newEventForm, name: e.target.value })}
                                        placeholder="e.g., Annual Beach Cleanup"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="eventDate">Event Date:</label>
                                    <input
                                        type="date"
                                        id="eventDate"
                                        value={newEventForm.date}
                                        onChange={(e) => setNewEventForm({ ...newEventForm, date: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="eventDescription">Description:</label>
                                    <textarea
                                        id="eventDescription"
                                        value={newEventForm.description}
                                        onChange={(e) => setNewEventForm({ ...newEventForm, description: e.target.value })}
                                        placeholder="Brief description of the event..."
                                        rows="3"
                                        required
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="googleSheetCSVUrl">Google Sheet CSV Public URL:</label>
                                    <input
                                        type="url"
                                        id="googleSheetCSVUrl"
                                        value={newEventForm.googleSheetCSVUrl}
                                        onChange={(e) => setNewEventForm({ ...newEventForm, googleSheetCSVUrl: e.target.value })}
                                        placeholder="e.g., https://docs.google.com/spreadsheets/d/.../pub?output=csv"
                                        required
                                    />
                                    <p className="text-sm text-gray-400 mt-1">
                                        (Go to Google Sheet &gt; File &gt; Share &gt; Publish to web &gt; Choose sheet &gt; Select CSV)
                                    </p>
                                </div>
                                <div className="form-actions">
                                    <button type="submit" className="submit-btn">
                                        <Save size={20} /> Create Event
                                    </button>
                                    <button type="button" onClick={() => { setIsAddingEvent(false); setEventCreationError(null); setNewEventForm({ name: '', date: '', description: '', googleSheetCSVUrl: '' }); }} className="cancel-btn">
                                        <XCircle size={20} /> Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>

            <div className="data-section">
                {events.length === 0 ? (
                    <div className="no-data">
                        <FileText className="no-data-icon" />
                        <p>No volunteer events created yet. Add one above to get started!</p>
                    </div>
                ) : (
                    <div className="event-grid">
                        {events.map(event => (
                            <EventCard
                                key={event.id}
                                event={event}
                                onDeleteEvent={handleDeleteEvent}
                                // userId prop is no longer necessary as Firebase Auth is removed
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// --- EventCard Component ---
const EventCard = ({ event, onDeleteEvent }) => {
    const [volunteers, setVolunteers] = useState([]);
    const [loadingVolunteers, setLoadingVolunteers] = useState(false);
    const [volunteerLoadError, setVolunteerLoadError] = useState(null);
    const [viewMode, setViewMode] = useState('card'); // 'card' or 'table'
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    const fetchVolunteers = useCallback((csvUrl) => {
        if (!csvUrl) {
            setVolunteers([]);
            setLoadingVolunteers(false);
            return;
        }
        setLoadingVolunteers(true);
        setVolunteerLoadError(null);

        // Assuming Papa is globally available
        if (typeof Papa === 'undefined') {
            setVolunteerLoadError('PapaParse library is not loaded. Cannot fetch CSV data.');
            setLoadingVolunteers(false);
            return;
        }

        Papa.parse(csvUrl, {
            download: true, // PapaParse will fetch the URL
            header: true,   // Parse the first row as headers
            complete: (results) => {
                if (results.data && results.data.length > 0) {
                    const parsedDataWithId = results.data.map((row, index) => {
                        // Ensure each row has a unique ID for React's key prop and local editing
                        // Use existing 'id' field if available, otherwise generate a unique one
                        const rowId = row.id || `csv-${index}-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
                        return { id: rowId, ...row };
                    }).filter(Boolean); // Filter out any empty rows that PapaParse might produce
                    setVolunteers(parsedDataWithId);
                    setLoadingVolunteers(false);
                } else {
                    setVolunteerLoadError('No data found in the CSV or parsing failed. Sheet might be empty or URL is incorrect.');
                    setVolunteers([]);
                    setLoadingVolunteers(false);
                }
            },
            error: (err) => {
                console.error(`Error fetching or parsing volunteers for event ${event.name}:`, err);
                setVolunteerLoadError(`Failed to load volunteers: ${err.message || 'Unknown error'}. Please check the CSV URL or sheet permissions.`);
                setVolunteers([]);
                setLoadingVolunteers(false);
            }
        });
    }, [event.name]); // Dependency on event.name for error logging context

    useEffect(() => {
        fetchVolunteers(event.googleSheetCSVUrl);
    }, [event.googleSheetCSVUrl, fetchVolunteers]);

    const handleEdit = (volunteer) => {
        setEditingId(volunteer.id);
        setEditForm({ ...volunteer });
    };

    const handleSave = () => {
        setVolunteers(prevVolunteers =>
            prevVolunteers.map(vol =>
                vol.id === editingId ? { ...editForm } : vol
            )
        );
        setEditingId(null);
        setEditForm({});
    };

    const handleDeleteLocal = (id) => {
        // IMPORTANT: For a production app, replace window.confirm with a custom modal UI.
        if (window.confirm('Are you sure you want to delete this volunteer? This action is local to the app and will not affect the Google Sheet.')) {
            setVolunteers(prevVolunteers => prevVolunteers.filter(vol => vol.id !== id));
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditForm({});
    };

    const handleInputChange = (field, value) => {
        setEditForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddLocalVolunteer = () => {
        // Create a new empty volunteer object based on existing headers
        const firstVolunteer = volunteers[0];
        const newVolunteer = { id: `local-${Date.now()}-${Math.random().toString(36).substring(2, 9)}` }; // Ensure truly unique ID for local adds
        if (firstVolunteer) {
            Object.keys(firstVolunteer).forEach(key => {
                if (key !== 'id') { // Exclude the 'id' field itself from being copied as a data field
                    newVolunteer[key] = '';
                }
            });
        } else {
             // Default fields if no existing volunteers to infer headers from
            newVolunteer['Timestamp'] = new Date().toLocaleString();
            newVolunteer['Volunteer Name'] = '';
            newVolunteer['Email Address'] = '';
            newVolunteer['Phone Number'] = '';
            newVolunteer['Skills'] = '';
            // Add a placeholder if the CSV is empty, so there's at least one row to edit
            setVolunteers([newVolunteer]);
        }
        // Only add if volunteers array was not empty, otherwise it was added above
        if (volunteers.length > 0) {
            setVolunteers(prev => [newVolunteer, ...prev]); // Add to top
        }
        setEditingId(newVolunteer.id); // Start editing the new entry
        setEditForm(newVolunteer);
    };


    const filteredVolunteers = volunteers.filter(volunteer =>
        Object.values(volunteer).some(value =>
            value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const renderTableView = () => {
        if (filteredVolunteers.length === 0) {
            return (
                <div className="no-data">
                    <FileText className="no-data-icon" />
                    <p>No volunteer records found for this event.</p>
                </div>
            );
        }

        // Dynamically get headers from the first filtered volunteer, if any
        const headers = filteredVolunteers.length > 0
            ? Object.keys(filteredVolunteers[0]).filter(key => key !== 'id')
            : [];

        if (headers.length === 0) {
            return (
                <div className="no-data">
                    <FileText className="no-data-icon" />
                    <p>No valid headers found in volunteer data.</p>
                </div>
            );
        }

        return (
            <div className="table-container">
                <table className="cr-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            {headers.map(header => (
                                <th key={header}>
                                    <div className="header-content">
                                        {getFieldIcon(header)}
                                        <span>{header}</span>
                                    </div>
                                </th>
                            ))}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVolunteers.map((vol) => (
                            <tr key={vol.id} className={editingId === vol.id ? 'editing' : ''}>
                                <td>
                                    {/* Display only the unique part of the ID for brevity */}
                                    <span className="cr-id">#{vol.id.startsWith('csv-') || vol.id.startsWith('local-') ? vol.id.split('-')[1] : vol.id}</span>
                                </td>
                                {headers.map(header => (
                                    <td key={header}>
                                        {editingId === vol.id ? (
                                            isImageField(header) ? (
                                                <div className="image-edit-container">
                                                    <input
                                                        type="text"
                                                        value={editForm[header] || ''}
                                                        onChange={(e) => handleInputChange(header, e.target.value)}
                                                        className="field-input"
                                                        placeholder="Image URL"
                                                    />
                                                    {editForm[header] && isImageUrl(editForm[header]) && (
                                                        <div className="image-preview-small">
                                                            <img
                                                                src={convertToDirectImageUrl(editForm[header])}
                                                                alt="Preview"
                                                                onError={(e) => {
                                                                    e.target.style.display = 'none';
                                                                    e.target.nextSibling.style.display = 'flex';
                                                                }}
                                                            />
                                                            <div className="image-fallback" style={{ display: 'none' }}>
                                                                <Image size={16} /><span>Invalid</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={editForm[header] || ''}
                                                    onChange={(e) => handleInputChange(header, e.target.value)}
                                                    className="field-input"
                                                />
                                            )
                                        ) : (
                                            <div className="field-content">
                                                {isImageField(header) && vol[header] && isImageUrl(vol[header]) ? (
                                                    <div className="table-image-container">
                                                        <img
                                                            src={convertToDirectImageUrl(vol[header])}
                                                            alt="Volunteer Image"
                                                            className="table-image"
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                                e.target.nextSibling.style.display = 'flex';
                                                            }}
                                                        />
                                                        <div className="image-fallback" style={{ display: 'none' }}>
                                                            <Image size={16} /><span>No Image</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="field-text">{vol[header] || 'N/A'}</span>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                ))}
                                <td>
                                    <div className="table-actions">
                                        {editingId === vol.id ? (
                                            <>
                                                <button onClick={handleSave} className="save-btn" title="Save">
                                                    <Save size={16} />
                                                </button>
                                                <button onClick={handleCancel} className="cancel-btn" title="Cancel">
                                                    <X size={16} />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => handleEdit(vol)} className="edit-btn" title="Edit">
                                                    <Edit size={16} />
                                                </button>
                                                <button onClick={() => handleDeleteLocal(vol.id)} className="delete-btn" title="Delete Locally">
                                                    <Trash2 size={16} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderCardView = () => {
        if (filteredVolunteers.length === 0) {
            return (
                <div className="no-data">
                    <FileText className="no-data-icon" />
                    <p>No volunteer records found for this event.</p>
                </div>
            );
        }

        return (
            <div className="cr-grid">
                {filteredVolunteers.map((vol) => (
                    <div key={vol.id} className="cr-card">
                        <div className="card-header">
                            {/* Display only the unique part of the ID for brevity */}
                            <span className="cr-id">Volunteer #{vol.id.startsWith('csv-') || vol.id.startsWith('local-') ? vol.id.split('-')[1] : vol.id}</span>
                            <div className="card-actions">
                                {editingId === vol.id ? (
                                    <>
                                        <button onClick={handleSave} className="save-btn" title="Save">
                                            <Save size={16} />
                                        </button>
                                        <button onClick={handleCancel} className="cancel-btn" title="Cancel">
                                            <X size={16} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEdit(vol)} className="edit-btn" title="Edit">
                                            <Edit size={16} />
                                        </button>
                                        <button onClick={() => handleDeleteLocal(vol.id)} className="delete-btn" title="Delete Locally">
                                            <Trash2 size={16} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="card-content">
                            {Object.entries(vol).map(([key, value]) => {
                                if (key === 'id') return null; // Don't render the internal 'id' field as a data point

                                return (
                                    <div key={key} className="field-row">
                                        <div className="field-label">
                                            {getFieldIcon(key)}
                                            <span>{key}</span>
                                        </div>
                                        {editingId === vol.id ? (
                                            isImageField(key) ? (
                                                <div className="image-edit-container">
                                                    <input
                                                        type="text"
                                                        value={editForm[key] || ''}
                                                        onChange={(e) => handleInputChange(key, e.target.value)}
                                                        className="field-input"
                                                        placeholder="Image URL"
                                                    />
                                                    {editForm[key] && isImageUrl(editForm[key]) && (
                                                        <div className="card-image-preview">
                                                            <img
                                                                src={convertToDirectImageUrl(editForm[key])}
                                                                alt="Preview"
                                                                onError={(e) => {
                                                                    e.target.style.display = 'none';
                                                                    e.target.nextSibling.style.display = 'flex';
                                                                }}
                                                            />
                                                            <div className="image-fallback" style={{ display: 'none' }}>
                                                                <Image size={24} /><span>Invalid</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={editForm[key] || ''}
                                                    onChange={(e) => handleInputChange(key, e.target.value)}
                                                    className="field-input"
                                                />
                                            )
                                        ) : (
                                            <div className="field-value">
                                                {isImageField(key) && value && isImageUrl(value) ? (
                                                    <div className="card-image-container">
                                                        <img
                                                            src={convertToDirectImageUrl(value)}
                                                            alt="Volunteer Image"
                                                            className="card-image"
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                                e.target.nextSibling.style.display = 'flex';
                                                            }}
                                                        />
                                                        <div className="image-fallback" style={{ display: 'none' }}>
                                                            <Image size={24} /><span>No Image</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    value || 'N/A'
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="event-card">
            <div className="event-header">
                <div className="event-title-group">
                    <h2>{event.name}</h2>
                    <p className="event-date">
                        <Calendar size={16} /> {event.date}
                    </p>
                </div>
                <div className="event-actions-top">
                    <button onClick={() => onDeleteEvent(event.id)} className="delete-btn-event" title="Delete Event">
                        <Trash2 size={20} /> Delete Event
                    </button>
                </div>
            </div>
            <p className="event-description">{event.description}</p>
            <p className="text-sm text-gray-400 mb-4 break-words">
                CSV Source: <a href={event.googleSheetCSVUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{event.googleSheetCSVUrl}</a>
            </p>

            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="view-toggle-event">
                    <button
                        className={`toggle-btn-event ${viewMode === 'card' ? 'active' : ''}`}
                        onClick={() => setViewMode('card')}
                    >
                        <Grid size={20} /> Cards
                    </button>
                    <button
                        className={`toggle-btn-event ${viewMode === 'table' ? 'active' : ''}`}
                        onClick={() => setViewMode('table')}
                    >
                        <List size={20} /> Table
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Search volunteers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="field-input max-w-[250px]"
                />
                <button
                    onClick={handleAddLocalVolunteer}
                    className="add-local-volunteer-btn add-event-btn" // Re-using styling from event add button
                    style={{ background: 'linear-gradient(45deg, #34d399, #10b981)', boxShadow: '0 5px 15px rgba(52, 211, 153, 0.3)' }}
                >
                    <PlusCircle size={20} /> Add Local Volunteer
                </button>
            </div>


            {loadingVolunteers ? (
                <div className="loading-container" style={{ minHeight: '150px', gap: '1rem', background: 'none' }}>
                    <div className="ai-loader" style={{ width: '40px', height: '40px' }}>
                        <div className="loader-core" style={{ width: '20px', height: '20px' }}></div>
                        <div className="loader-ring" style={{ width: '40px', height: '40px', borderWidth: '2px' }}></div>
                    </div>
                    <p className="loading-text" style={{ fontSize: '0.9rem' }}>Loading volunteers from Google Sheet...</p>
                </div>
            ) : volunteerLoadError ? (
                <div className="error-container" style={{ minHeight: '150px', gap: '0.5rem', background: 'none', padding: '1rem' }}>
                    <CloudOff size={32} className="error-icon" />
                    <p className="error-message" style={{ fontSize: '0.9rem' }}>{volunteerLoadError}</p>
                </div>
            ) : (
                viewMode === 'card' ? renderCardView() : renderTableView()
            )}
        </div>
    );
};

export default Volunteer;
