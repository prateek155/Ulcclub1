import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Download, Calendar, Users, BarChart3, FileText, Database, Lock, Unlock, Shield } from 'lucide-react';

const Attendance = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [attendanceData, setAttendanceData] = useState({});
  const [lockedDates, setLockedDates] = useState(new Set());
  const [activeView, setActiveView] = useState('daily');
  const [isAdmin, setIsAdmin] = useState(true); // Toggle for admin mode

  // Fixed 12 members
  const members = [
    'Hritik', 'Prateek', 'Amey', 'Vidushi',
    'Shruti', 'Soham', 'Sarthak', 'Akshay',
    'Riya', 'Aaditya', 'Nikhil', 'Akshat'
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Initialize attendance data structure
  useEffect(() => {
    const today = new Date();
    const key = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    
    if (!attendanceData[key]) {
      const newData = { ...attendanceData };
      newData[key] = members.reduce((acc, member) => {
        acc[member] = 'absent';
        return acc;
      }, {});
      setAttendanceData(newData);
    }
  }, []);

  const formatDateKey = (date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  };

  const toggleAttendance = (member, date = currentDate) => {
    const key = formatDateKey(date);
    
    // Check if date is locked
    if (lockedDates.has(key)) {
      alert('This date is locked and cannot be modified!');
      return;
    }
    
    const newData = { ...attendanceData };
    
    if (!newData[key]) {
      newData[key] = members.reduce((acc, m) => {
        acc[m] = 'absent';
        return acc;
      }, {});
    }
    
    const currentStatus = newData[key][member];
    newData[key][member] = currentStatus === 'present' ? 'absent' : 'present';
    setAttendanceData(newData);
    
    // Save to backend (API call would go here)
    saveAttendanceToBackend(key, newData[key]);
  };

  const toggleDateLock = (date = currentDate) => {
    if (!isAdmin) {
      alert('Only admins can lock/unlock dates!');
      return;
    }
    
    const key = formatDateKey(date);
    const newLockedDates = new Set(lockedDates);
    
    if (newLockedDates.has(key)) {
      newLockedDates.delete(key);
    } else {
      newLockedDates.add(key);
    }
    
    setLockedDates(newLockedDates);
    
    // Save lock status to backend
    saveLockStatusToBackend(key, newLockedDates.has(key));
  };

  // Mock API functions (replace with actual API calls)
  const saveAttendanceToBackend = async (date, attendance) => {
    try {
      const { data }= await axios.post('https://ulcclub1.onrender.com/api/v1/attendance/addattendance', {
    
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, attendance })
      });
      console.log('Attendance saved:', await data.json());
    } catch (error) {
      console.error('Error saving attendance:', error);
    }
  };

  const saveLockStatusToBackend = async (date, isLocked) => {
    try {
      const { data } = await axios.post('https://ulcclub1.onrender.com/api/v1/attendance/lock-toggle', {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, isLocked })
      });
      console.log('Lock status saved:', await data.json());
    } catch (error) {
      console.error('Error saving lock status:', error);
    }
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getMonthlyStats = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const stats = {};
    
    members.forEach(member => {
      let presentDays = 0;
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(selectedYear, selectedMonth, day);
        const key = formatDateKey(date);
        if (attendanceData[key] && attendanceData[key][member] === 'present') {
          presentDays++;
        }
      }
      stats[member] = {
        present: presentDays,
        absent: daysInMonth - presentDays,
        percentage: ((presentDays / daysInMonth) * 100).toFixed(1)
      };
    });
    
    return stats;
  };

  const exportToCSV = () => {
    const stats = getMonthlyStats();
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    
    let csv = 'Member Name,Total Present,Total Absent,Attendance %,';
    
    // Add day headers
    for (let day = 1; day <= daysInMonth; day++) {
      csv += `Day ${day},`;
    }
    csv += '\n';
    
    // Add member data
    members.forEach(member => {
      const memberStats = stats[member];
      csv += `${member},${memberStats.present},${memberStats.absent},${memberStats.percentage}%,`;
      
      // Add daily attendance
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(selectedYear, selectedMonth, day);
        const key = formatDateKey(date);
        const status = attendanceData[key] && attendanceData[key][member] === 'present' ? 'P' : 'A';
        csv += `${status},`;
      }
      csv += '\n';
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_${months[selectedMonth]}_${selectedYear}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    const stats = getMonthlyStats();
    const printWindow = window.open('', '_blank');
    
    let htmlContent = `
      <html>
        <head>
          <title>Attendance Report - ${months[selectedMonth]} ${selectedYear}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; background: #0a0a0a; color: #fff; }
            .header { text-align: center; margin-bottom: 30px; }
            .ai-title { color: #00d4ff; font-size: 24px; font-weight: bold; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; background: #1a1a1a; }
            th, td { border: 1px solid #333; padding: 8px; text-align: center; }
            th { background: #2a2a2a; color: #00d4ff; }
            .present { background: #1a4d3a; color: #4ade80; }
            .absent { background: #4d1a1a; color: #f87171; }
            .stats { display: flex; justify-content: space-around; margin-bottom: 20px; }
            .stat-card { background: #1a1a1a; padding: 15px; border-radius: 8px; border: 1px solid #333; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="ai-title">AI Attendance System</div>
            <h2>Monthly Report - ${months[selectedMonth]} ${selectedYear}</h2>
          </div>
          <table>
            <tr>
              <th>Member Name</th>
              <th>Present Days</th>
              <th>Absent Days</th>
              <th>Attendance %</th>
            </tr>
    `;
    
    members.forEach(member => {
      const memberStats = stats[member];
      htmlContent += `
        <tr>
          <td>${member}</td>
          <td class="present">${memberStats.present}</td>
          <td class="absent">${memberStats.absent}</td>
          <td>${memberStats.percentage}%</td>
        </tr>
      `;
    });
    
    htmlContent += `
          </table>
          <script>
            window.onload = function() {
              window.print();
              window.close();
            }
          </script>
        </body>
      </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const renderDailyView = () => {
    const today = formatDateKey(currentDate);
    const todayAttendance = attendanceData[today] || {};
    const isDateLocked = lockedDates.has(today);

    return (
      <div className="daily-view">
        <div className="date-header">
          <div className="date-display">
            <Calendar size={24} />
            <span>{currentDate.toDateString()}</span>
            {isDateLocked && (
              <div className="lock-indicator">
                <Lock size={20} />
                <span>Locked</span>
              </div>
            )}
          </div>
          <div className="date-controls">
            <button 
              onClick={() => setCurrentDate(new Date(currentDate.getTime() - 24 * 60 * 60 * 1000))}
              className="nav-btn"
            >
              ← Previous
            </button>
            <button 
              onClick={() => setCurrentDate(new Date())}
              className="nav-btn today-btn"
            >
              Today
            </button>
            <button 
              onClick={() => setCurrentDate(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000))}
              className="nav-btn"
            >
              Next →
            </button>
            {isAdmin && (
              <button 
                onClick={() => toggleDateLock()}
                className={`nav-btn lock-btn ${isDateLocked ? 'locked' : 'unlocked'}`}
              >
                {isDateLocked ? <Lock size={16} /> : <Unlock size={16} />}
                {isDateLocked ? 'Unlock' : 'Lock'}
              </button>
            )}
          </div>
        </div>

        <div className="members-grid">
          {members.map((member, index) => (
            <div key={member} className={`member-card ${isDateLocked ? 'locked-card' : ''}`}>
              <div className="member-info">
                <div className="member-avatar">
                  {member.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="member-name">{member}</div>
              </div>
              <button
                onClick={() => toggleAttendance(member)}
                disabled={isDateLocked}
                className={`status-btn ${todayAttendance[member] === 'present' ? 'present' : 'absent'} ${isDateLocked ? 'disabled' : ''}`}
              >
                {todayAttendance[member] === 'present' ? 'Present' : 'Absent'}
              </button>
            </div>
          ))}
        </div>

        {isAdmin && (
          <div className="admin-panel">
            <div className="admin-header">
              <Shield size={20} />
              <span>Admin Controls</span>
            </div>
            <div className="admin-info">
              <p>Lock attendance to prevent further modifications. Locked dates cannot be edited by anyone.</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderMonthlyView = () => {
    const stats = getMonthlyStats();
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);

    return (
      <div className="monthly-view">
        <div className="month-header">
          <div className="month-selector">
            <select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="select-input"
            >
              {months.map((month, index) => (
                <option key={month} value={index}>{month}</option>
              ))}
            </select>
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="select-input"
            >
              {[2024, 2025, 2026].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="export-controls">
            <button onClick={exportToCSV} className="export-btn">
              <FileText size={16} />
              Export Excel
            </button>
            <button onClick={exportToPDF} className="export-btn">
              <Download size={16} />
              Export PDF
            </button>
          </div>
        </div>

        <div className="stats-overview">
          <div className="stat-card">
            <div className="stat-icon">
              <Users size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-value">12</div>
              <div className="stat-label">Total Members</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Calendar size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-value">{daysInMonth}</div>
              <div className="stat-label">Days in Month</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <BarChart3 size={24} />
            </div>
            <div className="stat-info">
              <div className="stat-value">
                {Object.values(stats).reduce((acc, stat) => acc + parseFloat(stat.percentage), 0) / 12}%
              </div>
              <div className="stat-label">Avg Attendance</div>
            </div>
          </div>
        </div>

        <div className="attendance-table">
          <table>
            <thead>
              <tr>
                <th>Member</th>
                <th>Present</th>
                <th>Absent</th>
                <th>Percentage</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => {
                const memberStats = stats[member];
                return (
                  <tr key={member}>
                    <td className="member-cell">
                      <div className="member-avatar small">
                        {member.split(' ').map(n => n[0]).join('')}
                      </div>
                      {member}
                    </td>
                    <td className="present-cell">{memberStats.present}</td>
                    <td className="absent-cell">{memberStats.absent}</td>
                    <td className="percentage-cell">{memberStats.percentage}%</td>
                    <td>
                      <div className={`status-indicator ${parseFloat(memberStats.percentage) >= 75 ? 'good' : parseFloat(memberStats.percentage) >= 50 ? 'average' : 'poor'}`}>
                        {parseFloat(memberStats.percentage) >= 75 ? 'Good' : parseFloat(memberStats.percentage) >= 50 ? 'Average' : 'Poor'}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="attendance-app">
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
            color: #ffffff;
            min-height: 100vh;
          }

          .attendance-app {
            min-height: 100vh;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
            padding: 20px;
          }

          .app-header {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            border: 1px solid rgba(0, 212, 255, 0.3);
            backdrop-filter: blur(10px);
          }

          .app-title {
            font-size: 2.5rem;
            font-weight: 700;
            background: linear-gradient(45deg, #00d4ff, #0099cc, #00ff88);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 10px;
            text-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
          }

          .app-subtitle {
            color: #a0a0a0;
            font-size: 1.1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
          }

          .view-tabs {
            display: flex;
            justify-content: center;
            margin-bottom: 30px;
            background: rgba(255, 255, 255, 0.05);
            padding: 5px;
            border-radius: 12px;
            border: 1px solid rgba(0, 212, 255, 0.2);
            backdrop-filter: blur(10px);
            width: fit-content;
            margin-left: auto;
            margin-right: auto;
          }

          .tab-btn {
            padding: 12px 24px;
            background: transparent;
            border: none;
            color: #a0a0a0;
            cursor: pointer;
            border-radius: 8px;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 1rem;
          }

          .tab-btn.active {
            background: linear-gradient(45deg, #00d4ff, #0099cc);
            color: #ffffff;
            box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
          }

          .tab-btn:hover:not(.active) {
            background: rgba(0, 212, 255, 0.1);
            color: #00d4ff;
          }

          .content-container {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            padding: 30px;
            border: 1px solid rgba(0, 212, 255, 0.2);
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          }

          .date-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding: 20px;
            background: linear-gradient(45deg, rgba(0, 212, 255, 0.1), rgba(0, 153, 204, 0.1));
            border-radius: 12px;
            border: 1px solid rgba(0, 212, 255, 0.3);
          }

          .date-display {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 1.3rem;
            font-weight: 600;
            color: #00d4ff;
          }

          .date-controls {
            display: flex;
            gap: 10px;
          }

          .nav-btn {
            padding: 10px 15px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(0, 212, 255, 0.3);
            border-radius: 8px;
            color: #ffffff;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.9rem;
          }

          .nav-btn:hover {
            background: rgba(0, 212, 255, 0.2);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 212, 255, 0.2);
          }

          .today-btn {
            background: linear-gradient(45deg, #00d4ff, #0099cc);
          }

          .members-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
          }

          .member-card {
            background: linear-gradient(45deg, rgba(26, 26, 26, 0.8), rgba(42, 42, 42, 0.6));
            border: 1px solid rgba(0, 212, 255, 0.2);
            border-radius: 12px;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
          }

          .member-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 212, 255, 0.15);
            border-color: rgba(0, 212, 255, 0.4);
          }

          .member-info {
            display: flex;
            align-items: center;
            gap: 15px;
          }

          .member-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(45deg, #00d4ff, #0099cc);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #ffffff;
            box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
          }

          .member-avatar.small {
            width: 35px;
            height: 35px;
            font-size: 0.8rem;
          }

          .member-name {
            font-size: 1.1rem;
            font-weight: 600;
            color: #ffffff;
          }

          .status-btn {
            padding: 10px 20px;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-size: 0.9rem;
          }

          .status-btn.present {
            background: linear-gradient(45deg, #10b981, #059669);
            color: #ffffff;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
          }

          .status-btn.absent {
            background: linear-gradient(45deg, #ef4444, #dc2626);
            color: #ffffff;
            box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
          }

          .status-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
          }

          .status-btn.disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none !important;
          }

          .lock-btn {
            background: linear-gradient(45deg, #f59e0b, #d97706) !important;
          }

          .lock-btn.locked {
            background: linear-gradient(45deg, #ef4444, #dc2626) !important;
          }

          .lock-indicator {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #ef4444;
            font-weight: 600;
            background: rgba(239, 68, 68, 0.1);
            padding: 8px 12px;
            border-radius: 20px;
            border: 1px solid rgba(239, 68, 68, 0.3);
          }

          .locked-card {
            opacity: 0.7;
            border-color: rgba(239, 68, 68, 0.3) !important;
          }

          .admin-panel {
            margin-top: 30px;
            background: linear-gradient(45deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.1));
            border: 1px solid rgba(245, 158, 11, 0.3);
            border-radius: 12px;
            padding: 20px;
            backdrop-filter: blur(10px);
          }

          .admin-header {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #f59e0b;
            font-weight: 600;
            font-size: 1.1rem;
            margin-bottom: 10px;
          }

          .admin-info {
            color: #a0a0a0;
            font-size: 0.9rem;
            line-height: 1.5;
          }

          .month-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            flex-wrap: wrap;
            gap: 20px;
          }

          .month-selector {
            display: flex;
            gap: 15px;
          }

          .select-input {
            padding: 12px 15px;
            background: rgba(26, 26, 26, 0.8);
            border: 1px solid rgba(0, 212, 255, 0.3);
            border-radius: 8px;
            color: #ffffff;
            font-size: 1rem;
            cursor: pointer;
            backdrop-filter: blur(10px);
          }

          .select-input:focus {
            outline: none;
            border-color: #00d4ff;
            box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
          }

          .export-controls {
            display: flex;
            gap: 12px;
          }

          .export-btn {
            padding: 12px 18px;
            background: linear-gradient(45deg, #00d4ff, #0099cc);
            border: none;
            border-radius: 8px;
            color: #ffffff;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 212, 255, 0.2);
          }

          .export-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 212, 255, 0.3);
          }

          .stats-overview {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
          }

          .stat-card {
            background: linear-gradient(45deg, rgba(26, 26, 26, 0.8), rgba(42, 42, 42, 0.6));
            border: 1px solid rgba(0, 212, 255, 0.2);
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
          }

          .stat-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 212, 255, 0.15);
          }

          .stat-icon {
            color: #00d4ff;
            margin-bottom: 10px;
            display: flex;
            justify-content: center;
          }

          .stat-value {
            font-size: 2rem;
            font-weight: bold;
            color: #00d4ff;
            margin-bottom: 5px;
          }

          .stat-label {
            color: #a0a0a0;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .attendance-table {
            overflow-x: auto;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            background: rgba(26, 26, 26, 0.6);
            border-radius: 12px;
            overflow: hidden;
            backdrop-filter: blur(10px);
          }

          th, td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid rgba(0, 212, 255, 0.1);
          }

          th {
            background: linear-gradient(45deg, rgba(0, 212, 255, 0.2), rgba(0, 153, 204, 0.2));
            color: #00d4ff;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-size: 0.9rem;
          }

          .member-cell {
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 600;
          }

          .present-cell {
            color: #10b981;
            font-weight: 600;
          }

          .absent-cell {
            color: #ef4444;
            font-weight: 600;
          }

          .percentage-cell {
            font-weight: 600;
            color: #00d4ff;
          }

          .status-indicator {
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            text-align: center;
          }

          .status-indicator.good {
            background: linear-gradient(45deg, #10b981, #059669);
            color: #ffffff;
          }

          .status-indicator.average {
            background: linear-gradient(45deg, #f59e0b, #d97706);
            color: #ffffff;
          }

          .status-indicator.poor {
            background: linear-gradient(45deg, #ef4444, #dc2626);
            color: #ffffff;
          }

          .floating-particles {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
          }

          .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: #00d4ff;
            border-radius: 50%;
            animation: float 6s infinite ease-in-out;
            opacity: 0.3;
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
              opacity: 0.3;
            }
            50% {
              transform: translateY(-20px) rotate(180deg);
              opacity: 0.8;
            }
          }

          .neural-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -2;
            background-image: 
              radial-gradient(circle at 25% 25%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(0, 255, 136, 0.1) 0%, transparent 50%);
          }

          @media (max-width: 768px) {
            .attendance-app {
              padding: 10px;
            }
            
            .app-title {
              font-size: 2rem;
            }
            
            .members-grid {
              grid-template-columns: 1fr;
            }
            
            .month-header {
              flex-direction: column;
              align-items: stretch;
            }
            
            .export-controls {
              justify-content: center;
            }
            
            .stats-overview {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      <div className="neural-bg"></div>
      <div className="floating-particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="app-header">
        <h1 className="app-title">AI Attendance System</h1>
        <div className="app-subtitle">
          <Database size={24} />
          Intelligent Member Tracking & Analytics
        </div>
      </div>

      <div className="view-tabs">
        <button
          onClick={() => setActiveView('daily')}
          className={`tab-btn ${activeView === 'daily' ? 'active' : ''}`}
        >
          <Calendar size={18} />
          Daily View
        </button>
        <button
          onClick={() => setActiveView('monthly')}
          className={`tab-btn ${activeView === 'monthly' ? 'active' : ''}`}
        >
          <BarChart3 size={18} />
          Monthly Analytics
        </button>
      </div>

      <div className="content-container">
        {activeView === 'daily' ? renderDailyView() : renderMonthlyView()}
      </div>
    </div>
  );
};

export default Attendance;
