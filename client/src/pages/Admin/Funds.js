import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout"; // Assuming this handles the main app layout
import AdminMenu from "./../../components/Layout/AdminMenu"; // Assuming this is your sidebar menu
import { toast } from "react-toastify"; // No ToastContainer here, assumes global ToastContainer in App.js
import axios from "axios";
import { DollarSign, BarChart2, PlusCircle, Trash2, ChevronDown, Download, Calendar, Clock, UserCheck, Tag, Info } from 'lucide-react';

// Separate component for the Add Fund Form for better organization
const AddFundForm = ({ onFundAdded, onCancel }) => {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        approvedBy: '',
        amount: '',
        category: 'Equipment', // Default category
        description: '',
        type: 'Income' // Default type
    });

    const categories = ['Equipment', 'Software', 'Training', 'Research', 'Travel', 'Office Supplies', 'Other'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Frontend validation
        if (!formData.date || !formData.time || !formData.approvedBy || !formData.amount || !formData.category || !formData.type) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            // Send as JSON, not FormData, as there are no file uploads
            const response = await axios.post(
                'https://ulcclub1.onrender.com/api/v1/fund/create',
                formData // Sending plain JSON object
            );

            if (response.data?.success) {
                toast.success("Fund Entry Created Successfully");
                onFundAdded(); // Call parent callback to refresh data and switch view
                setFormData({ // Reset form after successful submission
                    date: '',
                    time: '',
                    approvedBy: '',
                    amount: '',
                    category: 'Equipment',
                    description: '',
                    type: 'Income'
                });
            } else {
                toast.error(response.data?.message || "Failed to create fund entry.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while creating fund entry.");
        }
    };

    const styles = {
        formContainer: {
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            padding: '28px',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            marginBottom: '24px',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#2d3748'
        },
        form: {
            display: 'grid',
            gap: '20px'
        },
        formRow: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column'
        },
        label: {
            display: 'block',
            fontSize: '0.95rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center'
        },
        input: {
            width: '100%',
            padding: '0.875rem 1rem',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            boxSizing: 'border-box'
        },
        select: {
            width: '100%',
            padding: '0.875rem 1rem',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            boxSizing: 'border-box'
        },
        textarea: {
            width: '100%',
            padding: '0.875rem 1rem',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            resize: 'vertical',
            minHeight: '100px',
            boxSizing: 'border-box'
        },
        buttonGroup: {
            display: 'flex',
            gap: '15px',
            justifyContent: 'flex-end',
            marginTop: '20px'
        },
        submitButton: {
            padding: '12px 25px',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
        },
        cancelButton: {
            padding: '12px 25px',
            border: '1px solid #cbd5e0',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            background: '#e2e8f0',
            color: '#4a5568',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        },
        sectionTitle: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '1.4rem',
            fontWeight: '600',
            color: '#2d3748',
            marginBottom: '1.5rem',
            paddingBottom: '0.75rem',
            borderBottom: '2px solid #e2e8f0'
        },
        formHeader: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '1.5rem',
            textAlign: 'center',
            borderRadius: '15px 15px 0 0' // Rounded top corners for the header
        },
        headerTitle: {
            fontSize: '2rem',
            fontWeight: '700',
            margin: '0 0 0.5rem 0',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        headerSubtitle: {
            fontSize: '1rem',
            opacity: 0.9,
            margin: 0,
        },
    };

    return (
        <div style={styles.formContainer}>
            <div style={styles.formHeader}>
                <h2 style={styles.headerTitle}>Add New Fund Entry</h2>
                <p style={styles.headerSubtitle}>Input financial transaction details</p>
            </div>
            <form style={{ padding: '2.5rem' }} onSubmit={handleSubmit}>
                {/* Basic Information */}
                <div style={{ marginBottom: '3rem' }}>
                    <h3 style={styles.sectionTitle}>
                        <DollarSign size={20} color="#667eea" />
                        Fund Details
                    </h3>
                    <div style={styles.formGrid}>
                        <div style={styles.formGroup}>
                            <label style={styles.label} htmlFor="date">
                                <Calendar size={16} style={{ marginRight: '5px' }} />
                                Date *
                            </label>
                            <input
                                style={styles.input}
                                type="date"
                                name="date" // Corrected name to lowercase 'd'
                                id="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label} htmlFor="time">
                                <Clock size={16} style={{ marginRight: '5px' }} />
                                Time *
                            </label>
                            <input
                                style={styles.input}
                                type="time"
                                name="time" // Added time field
                                id="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label} htmlFor="amount">
                                <DollarSign size={16} style={{ marginRight: '5px' }} />
                                Amount *
                            </label>
                            <input
                                style={styles.input}
                                type="number"
                                name="amount"
                                id="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                                placeholder="Enter amount"
                                step="0.01"
                                required
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label} htmlFor="approvedBy">
                                <UserCheck size={16} style={{ marginRight: '5px' }} />
                                Approved By *
                            </label>
                            <input
                                style={styles.input}
                                type="text"
                                name="approvedBy"
                                id="approvedBy"
                                value={formData.approvedBy}
                                onChange={handleInputChange}
                                placeholder="Enter approver name"
                                required
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label} htmlFor="type">
                                <Tag size={16} style={{ marginRight: '5px' }} />
                                Type *
                            </label>
                            <select
                                style={styles.select}
                                name="type"
                                id="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="Income">Income</option>
                                <option value="Expense">Expense</option>
                            </select>
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label} htmlFor="category">
                                <Tag size={16} style={{ marginRight: '5px' }} />
                                Category *
                            </label>
                            <select
                                style={styles.select}
                                name="category"
                                id="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="description">
                            <Info size={16} style={{ marginRight: '5px' }} />
                            Description (Optional)
                        </label>
                        <textarea
                            style={styles.textarea}
                            name="description"
                            id="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Add a brief description of the fund entry"
                            rows="3"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div style={styles.buttonGroup}>
                    <button type="button" style={styles.cancelButton} onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="submit" style={styles.submitButton}>
                        Add Fund Entry
                    </button>
                </div>
            </form>
        </div>
    );
};


// Main Funds Component
const Funds = () => {
    const [funds, setFunds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDownloadMenu, setShowDownloadMenu] = useState(false);
    const [summary, setSummary] = useState({ totalEntries: 0, totalIncome: 0, totalExpenses: 0 });
    const [currentView, setCurrentView] = useState('all'); // 'all' or 'add'

    const fetchFunds = async () => {
        try {
            setLoading(true);
            // Corrected data access from backend response
            const { data } = await axios.get("https://ulcclub1.onrender.com/api/v1/fund/all-funds"); 
            if (data?.success) {
                setFunds(data.funds); // Changed from data.users to data.funds
                calculateSummary(data.funds);
            } else {
                toast.error("Failed to fetch funds");
            }
        } catch (error) {
            console.error(error);
            toast.error("Server error while fetching fund details");
        } finally {
            setLoading(false);
        }
    };

    const calculateSummary = (fundsList) => {
        const totalIncome = fundsList
            .filter(f => f.type === 'Income')
            .reduce((sum, f) => sum + parseFloat(f.amount), 0); // Ensure amount is parsed as float

        const totalExpenses = fundsList
            .filter(f => f.type === 'Expense')
            .reduce((sum, f) => sum + parseFloat(f.amount), 0); // Ensure amount is parsed as float
        
        setSummary({
            totalEntries: fundsList.length,
            totalIncome,
            totalExpenses,
        });
    };

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`https://ulcclub1.onrender.com/api/v1/fund/delete/${id}`);
            if (data.success) {
                toast.success("Fund entry deleted successfully");
                fetchFunds(); // Refresh the list
            } else {
                toast.error("Failed to delete fund entry");
            }
        } catch (error) {
            console.error(error);
            toast.error("Server error while deleting");
        }
    };

    const handleFundAdded = () => {
        setCurrentView('all'); // Switch back to 'all' view after adding
        fetchFunds(); // Refresh the funds list
    };

    const downloadAsCSV = () => {
        if (funds.length === 0) {
            toast.warning("No data to download");
            return;
        }
        let csvContent = "Date,Time,ApprovedBy,Amount,Category,Description,Type\n";
        funds.forEach(fund => {
            const row = [
                fund.date,
                fund.time,
                `"${fund.approvedBy.replace(/"/g, '""')}"`,
                fund.amount,
                `"${fund.category.replace(/"/g, '""')}"`,
                `"${fund.description ? fund.description.replace(/"/g, '""') : ''}"`, // Handle optional description
                fund.type
            ].join(',');
            csvContent += row + '\n';
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `funds_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("CSV file downloaded successfully");
    };

    const downloadAsJSON = () => {
        if (funds.length === 0) {
            toast.warning("No data to download");
            return;
        }
        const jsonContent = JSON.stringify(funds, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `funds_${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("JSON file downloaded successfully");
    };

    const downloadAsXML = () => {
        if (funds.length === 0) {
            toast.warning("No data to download");
            return;
        }
        let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n<funds>\n';
        funds.forEach(fund => {
            xmlContent += `  <fund>\n`;
            xmlContent += `    <id>${fund._id}</id>\n`;
            xmlContent += `    <date>${fund.date}</date>\n`;
            xmlContent += `    <time>${fund.time}</time>\n`;
            xmlContent += `    <approvedBy>${fund.approvedBy}</approvedBy>\n`;
            xmlContent += `    <amount>${fund.amount}</amount>\n`;
            xmlContent += `    <category>${fund.category}</category>\n`;
            xmlContent += `    <description>${fund.description || ''}</description>\n`; // Handle optional description
            xmlContent += `    <type>${fund.type}</type>\n`;
            xmlContent += `  </fund>\n`;
        });
        xmlContent += '</funds>';

        const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `funds_${new Date().toISOString().split('T')[0]}.xml`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("XML file downloaded successfully");
    };

    useEffect(() => {
        fetchFunds();
    }, []); // Only run on component mount

    const styles = {
        product: {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            minHeight: "100vh",
            padding: "20px",
        },
        container: {
            padding: '2rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            minHeight: '100vh',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        },
        row: {
            display: 'flex',
            gap: '2rem',
            maxWidth: '1400px',
            margin: '0 auto',
            flexWrap: 'wrap'
        },
        sidebarCol: {
            flex: '0 0 250px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '1rem',
            height: 'fit-content',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
        },
        mainContentCol: {
            flex: '1',
            minWidth: '600px'
        },
        header: {
            textAlign: 'center',
            marginBottom: '40px',
            color: '#fff'
        },
        heading: {
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '8px',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        },
        subtitle: {
            fontSize: '1.1rem',
            opacity: 0.9,
            fontWeight: '400'
        },
        navBar: {
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '30px',
            flexWrap: 'wrap'
        },
        navButton: {
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#ffffff',
            padding: '12px 20px',
            fontSize: '1rem',
            fontWeight: '600',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
        },
        navButtonActive: {
            background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)', // More vibrant color for active
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 25px rgba(0,0,0,0.15)'
        },
        actionBar: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
            flexWrap: 'wrap',
            gap: '15px'
        },
        downloadContainer: {
            position: 'relative',
            display: 'inline-block'
        },
        downloadButton: {
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#ffffff',
            padding: '14px 24px',
            fontSize: '1rem',
            fontWeight: '600',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
            justifyContent: 'space-between'
        },
        downloadButtonHover: {
            background: 'rgba(255,255,255,0.3)',
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 25px rgba(0,0,0,0.15)'
        },
        downloadMenu: {
            position: 'absolute',
            top: '100%',
            left: '0',
            right: '0',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '16px',
            marginTop: '8px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            zIndex: 1000,
            overflow: 'hidden'
        },
        downloadMenuItem: {
            padding: '14px 20px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            color: '#2d3748',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid rgba(0,0,0,0.05)'
        },
        downloadMenuItemHover: {
            background: 'rgba(102,126,234,0.1)',
            color: '#667eea'
        },
        statsBar: {
            display: 'flex',
            justifyContent: 'center',
            gap: '30px',
            marginBottom: '40px',
            flexWrap: 'wrap'
        },
        statItem: {
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            padding: '16px 24px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.2)',
            textAlign: 'center',
            minWidth: '120px'
        },
        statNumber: {
            fontSize: '1.8rem',
            fontWeight: '700',
            color: '#ffffff',
            display: 'block'
        },
        statLabel: {
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.8)',
            marginTop: '4px'
        },
        loadingContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px'
        },
        spinner: {
            width: '40px',
            height: '40px',
            border: '4px solid rgba(255,255,255,0.3)',
            borderTop: '4px solid #ffffff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        },
        emptyState: {
            textAlign: 'center',
            padding: '60px 20px',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.2)'
        },
        emptyText: {
            fontSize: '1.2rem',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '10px'
        },
        emptySubtext: {
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.7)'
        },
        card: {
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            padding: '28px',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            marginBottom: '24px',
            border: '1px solid rgba(255,255,255,0.3)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
        },
        cardHover: {
            transform: 'translateY(-5px)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
        },
        cardHeader: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
            paddingBottom: '16px',
            borderBottom: '2px solid #f0f0f0'
        },
        typeIcon: {
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '16px',
            fontSize: '1.2rem',
            fontWeight: '600',
            color: '#ffffff',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
        },
        incomeIcon: {
            background: 'linear-gradient(135deg, #4ECDC4 0%, #46A8DA 100%)'
        },
        expenseIcon: {
            background: 'linear-gradient(135deg, #FF6B6B 0%, #F04E62 100%)'
        },
        cardTitle: {
            fontSize: '1.3rem',
            fontWeight: '600',
            color: '#2d3748',
            margin: 0
        },
        cardSubtitle: {
            fontSize: '0.9rem',
            color: '#718096',
            marginTop: '4px'
        },
        infoGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
            marginBottom: '20px'
        },
        infoItem: {
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
        },
        infoIcon: {
            marginRight: '12px',
            color: '#667eea'
        },
        infoLabel: {
            fontSize: '0.85rem',
            color: '#718096',
            fontWeight: '500',
            marginBottom: '2px'
        },
        infoValue: {
            fontSize: '0.95rem',
            color: '#2d3748',
            fontWeight: '600'
        },
        deleteButton: {
            position: 'absolute',
            top: '24px',
            right: '24px',
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 16px',
            fontSize: '0.9rem',
            fontWeight: '600',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(255,107,107,0.3)'
        },
        deleteButtonHover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(255,107,107,0.4)'
        }
    };

    const keyframes = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

    const downloadOptions = [
        { label: 'Download as CSV', action: downloadAsCSV },
        { label: 'Download as JSON', action: downloadAsJSON },
        { label: 'Download as XML', action: downloadAsXML }
    ];

    return (
        <Layout title={"Fund Management"}> {/* Corrected title here */}
            <style>{keyframes}</style>
            <div style={styles.product}>
                {/* ToastContainer should ideally be in App.js or a higher-level Layout */}
                {/* <ToastContainer /> */} 
                <div style={styles.container}>
                    <div style={styles.row}> {/* Use flex container as defined in styles.row */}
                        <div style={styles.sidebarCol}>
                            <AdminMenu /> {/* Admin menu sidebar */}
                        </div>
                        <div style={styles.mainContentCol}>
                            <div style={styles.header}>
                                <h1 style={styles.heading}>Fund Management Dashboard</h1> {/* General dashboard heading */}
                                <p style={styles.subtitle}>Oversee all financial transactions and summaries.</p>
                            </div>

                            <div style={styles.navBar}>
                                <button
                                    style={{ ...styles.navButton, ...(currentView === 'all' ? styles.navButtonActive : {}) }}
                                    onClick={() => setCurrentView('all')}
                                >
                                    <BarChart2 size={20} style={{ marginRight: '8px' }} />
                                    View All Funds
                                </button>
                                <button
                                    style={{ ...styles.navButton, ...(currentView === 'add' ? styles.navButtonActive : {}) }}
                                    onClick={() => setCurrentView('add')}
                                >
                                    <PlusCircle size={20} style={{ marginRight: '8px' }} />
                                    Add New Fund
                                </button>
                            </div>

                            {currentView === 'add' ? (
                                <AddFundForm onFundAdded={handleFundAdded} onCancel={() => setCurrentView('all')} />
                            ) : (
                                <>
                                    {!loading && funds.length > 0 && (
                                        <>
                                            <div style={styles.actionBar}>
                                                <div style={styles.downloadContainer}>
                                                    <button
                                                        style={styles.downloadButton}
                                                        onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                                                        onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.downloadButtonHover)}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                                                            e.currentTarget.style.transform = 'translateY(0)';
                                                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                                                        }}
                                                    >
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <Download size={20} style={{ marginRight: '8px' }} />
                                                            Download Data
                                                        </div>
                                                        <ChevronDown size={16} style={{ 
                                                            transform: showDownloadMenu ? 'rotate(180deg)' : 'rotate(0deg)',
                                                            transition: 'transform 0.2s ease'
                                                        }} />
                                                    </button>
                                                    
                                                    {showDownloadMenu && (
                                                        <div style={styles.downloadMenu}>
                                                            {downloadOptions.map((option, index) => (
                                                                <div
                                                                    key={index}
                                                                    style={styles.downloadMenuItem}
                                                                    onClick={() => {
                                                                        option.action();
                                                                        setShowDownloadMenu(false);
                                                                    }}
                                                                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.downloadMenuItemHover)}
                                                                    onMouseLeave={(e) => {
                                                                        e.currentTarget.style.background = 'transparent';
                                                                        e.currentTarget.style.color = '#2d3748';
                                                                    }}
                                                                >
                                                                    {option.label}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div style={styles.statsBar}>
                                                <div style={styles.statItem}>
                                                    <span style={styles.statNumber}>₹{summary.totalIncome.toFixed(2)}</span>
                                                    <span style={styles.statLabel}>Total Income</span>
                                                </div>
                                                <div style={styles.statItem}>
                                                    <span style={styles.statNumber}>₹{summary.totalExpenses.toFixed(2)}</span>
                                                    <span style={styles.statLabel}>Total Expenses</span>
                                                </div>
                                                <div style={styles.statItem}>
                                                    <span style={styles.statNumber}>₹{(summary.totalIncome - summary.totalExpenses).toFixed(2)}</span>
                                                    <span style={styles.statLabel}>Net Balance</span>
                                                </div>
                                                <div style={styles.statItem}>
                                                    <span style={styles.statNumber}>{summary.totalEntries}</span>
                                                    <span style={styles.statLabel}>Total Entries</span>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {loading ? (
                                        <div style={styles.loadingContainer}>
                                            <div style={styles.spinner}></div>
                                        </div>
                                    ) : funds.length === 0 ? (
                                        <div style={styles.emptyState}>
                                            <p style={styles.emptyText}>No fund entries found</p>
                                            <p style={styles.emptySubtext}>Add new entries to view them here</p>
                                        </div>
                                    ) : (
                                        funds.map((fund) => (
                                            <div
                                                key={fund._id}
                                                style={styles.card}
                                                onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                                                }}
                                            >
                                                <div style={styles.cardHeader}>
                                                    <div style={{
                                                        ...styles.typeIcon,
                                                        ...(fund.type === 'Income' ? styles.incomeIcon : styles.expenseIcon)
                                                    }}>
                                                        {fund.type === 'Income' ? <PlusCircle size={20} /> : <BarChart2 size={20} />}
                                                    </div>
                                                    <div>
                                                        <h3 style={styles.cardTitle}>
                                                            {fund.type}
                                                        </h3>
                                                        <p style={styles.cardSubtitle}>
                                                            {fund.category}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div style={styles.infoGrid}>
                                                    <div style={styles.infoItem}>
                                                        <DollarSign size={16} style={styles.infoIcon} />
                                                        <div>
                                                            <div style={styles.infoLabel}>Amount</div>
                                                            <div style={styles.infoValue}>₹{fund.amount.toFixed(2)}</div>
                                                        </div>
                                                    </div>
                                                    <div style={styles.infoItem}>
                                                        <Calendar size={16} style={{...styles.infoIcon, color: '#F063A4'}}/>
                                                        <div>
                                                            <div style={styles.infoLabel}>Date & Time</div>
                                                            <div style={styles.infoValue}>{fund.date} at {fund.time}</div>
                                                        </div>
                                                    </div>
                                                    <div style={styles.infoItem}>
                                                        <UserCheck size={16} style={{...styles.infoIcon, color: '#32D48B'}}/>
                                                        <div>
                                                            <div style={styles.infoLabel}>Approved By</div>
                                                            <div style={styles.infoValue}>{fund.approvedBy}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {fund.description && (
                                                    <div style={styles.infoItem}>
                                                        <Info size={16} style={{...styles.infoIcon, color: '#FFBD59'}}/>
                                                        <div>
                                                            <div style={styles.infoLabel}>Description</div>
                                                            <div style={styles.infoValue}>{fund.description}</div>
                                                        </div>
                                                    </div>
                                                )}
                                                <button
                                                    style={styles.deleteButton}
                                                    onClick={() => handleDelete(fund._id)}
                                                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.deleteButtonHover)}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform = 'translateY(0)';
                                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,107,107,0.3)';
                                                    }}
                                                >
                                                    <Trash2 size={16} style={{ marginRight: '6px' }} />
                                                    Delete
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Funds;
