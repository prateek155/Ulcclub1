import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DollarSign, BarChart2, PlusCircle, Trash2, ChevronDown, Download, Calendar, Clock, UserCheck, Tag, Info } from 'lucide-react'; // Added Calendar, Clock, Tag, Info icons

// Add Fund Component (Integrated directly into Funds.js)
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
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.date || !formData.time || !formData.approvedBy || !formData.amount) {
            toast.error('Please fill in all required fields.');
            return;
        }

        try {
            // Using the correct backend route for creating funds
            const response = await axios.post('https://ulcclub1.onrender.com/api/v1/fund/create', formData);
            if (response.data.success) {
                toast.success("Fund entry added successfully!");
                onFundAdded(); // Trigger refresh and switch view
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
                toast.error("Failed to add fund entry.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Server error while adding fund entry.");
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
            fontSize: '14px',
            fontWeight: 'bold',
            marginBottom: '8px',
            color: '#4a5568',
        },
        input: {
            padding: '12px',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            fontSize: '16px',
            background: '#edf2f7',
            color: '#2d3748',
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            outline: 'none'
        },
        inputFocus: {
            borderColor: '#667eea',
            boxShadow: '0 0 0 3px rgba(102,126,234,0.3)'
        },
        select: {
            padding: '12px',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            fontSize: '16px',
            background: '#edf2f7',
            color: '#2d3748',
            outline: 'none'
        },
        textarea: {
            padding: '12px',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            fontSize: '16px',
            background: '#edf2f7',
            color: '#2d3748',
            minHeight: '80px',
            resize: 'vertical',
            outline: 'none'
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
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
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
        }
    };

    return (
        <div style={styles.formContainer}>
            <h2 style={{ fontSize: '1.8rem', color: '#2d3748', marginBottom: '25px' }}>➕ Add New Fund Entry</h2>
            <form style={styles.form} onSubmit={handleSubmit}>
                <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="date">
                            <Calendar size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                            Date *
                        </label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="time">
                            <Clock size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                            Time *
                        </label>
                        <input
                            type="time"
                            name="time"
                            id="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            style={styles.input}
                            required
                        />
                    </div>
                </div>

                <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="approvedBy">
                            <UserCheck size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                            Approved By *
                        </label>
                        <input
                            type="text"
                            name="approvedBy"
                            id="approvedBy"
                            value={formData.approvedBy}
                            onChange={handleInputChange}
                            style={styles.input}
                            placeholder="Enter approver name"
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="amount">
                            <DollarSign size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                            Amount *
                        </label>
                        <input
                            type="number"
                            name="amount"
                            id="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            style={styles.input}
                            placeholder="Enter amount"
                            step="0.01"
                            required
                        />
                    </div>
                </div>

                <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="type">
                            <Tag size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                            Type
                        </label>
                        <select
                            name="type"
                            id="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            style={styles.select}
                        >
                            <option value="Income">Income</option>
                            <option value="Expense">Expense</option>
                        </select>
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label} htmlFor="category">
                            <Tag size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                            Category
                        </label>
                        <select
                            name="category"
                            id="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            style={styles.select}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="description">
                        <Info size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        style={styles.textarea}
                        placeholder="Enter description (optional)"
                    />
                </div>

                <div style={styles.buttonGroup}>
                    <button type="button" onClick={onCancel} style={styles.cancelButton}>
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
            const { data } = await axios.get('https://ulcclub1.onrender.com/api/v1/fund/all-funds');
            if (data.success) {
                const fetchedFunds = data.funds;
                setFunds(fetchedFunds);
                calculateSummary(fetchedFunds);
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
            .reduce((sum, f) => sum + f.amount, 0);

        const totalExpenses = fundsList
            .filter(f => f.type === 'Expense')
            .reduce((sum, f) => sum + f.amount, 0);
        
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
                fetchFunds();
            } else {
                toast.error("Failed to delete fund entry");
            }
        } catch (error) {
            console.error(error);
            toast.error("Server error while deleting");
        }
    };

    const handleFundAdded = () => {
        setCurrentView('all'); // Switch back to 'all' view
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
                `"${fund.description.replace(/"/g, '""')}"`,
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
            xmlContent += `    <id>${fund._id}</id>\n`; // Include ID for consistency
            xmlContent += `    <date>${fund.date}</date>\n`;
            xmlContent += `    <time>${fund.time}</time>\n`;
            xmlContent += `    <approvedBy>${fund.approvedBy}</approvedBy>\n`;
            xmlContent += `    <amount>${fund.amount}</amount>\n`;
            xmlContent += `    <category>${fund.category}</category>\n`;
            xmlContent += `    <description>${fund.description}</description>\n`;
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
    }, []);

    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '40px 20px',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        },
        content: {
            maxWidth: '1000px',
            margin: '0 auto'
        },
        header: {
            textAlign: 'center',
            marginBottom: '40px'
        },
        heading: {
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '8px',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        },
        subtitle: {
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.9)',
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
        },
        toastContainer: {
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999
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
        <>
            <style>{keyframes}</style>
            <div style={styles.container}>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    style={styles.toastContainer}
                />
                
                <div style={styles.content}>
                    <div style={styles.header}>
                        <h1 style={styles.heading}>Fund Management</h1>
                        <p style={styles.subtitle}>Manage and view all financial transactions</p>
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
        </>
    );
};

export default Funds;
