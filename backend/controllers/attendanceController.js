import attendanceModel from "../models/attendanceModel";
import moment from "moment";

// Create or update attendance for a specific date
export const createOrUpdateAttendance = async (req, res) => {
  try {
    const { date, attendance } = req.body;
    const userId = req.user.id;

    if (!date || !attendance) {
      return res.status(400).json({
        success: false,
        message: 'Date and attendance data are required'
      });
    }

    const attendanceDate = new Date(date);
    const dateString = moment(attendanceDate).format('YYYY-MM-DD');

    const existingAttendance = await attendanceModel.findOne({ dateString });
    if (existingAttendance && existingAttendance.isLocked) {
      return res.status(403).json({
        success: false,
        message: 'Cannot modify attendance for a locked date'
      });
    }

    const membersArray = Object.entries(attendance).map(([memberName, status]) => ({
      memberName,
      status,
      checkInTime: status === 'present' ? new Date() : null
    }));

    let attendanceRecord;

    if (existingAttendance) {
      const previousData = existingAttendance.members;
      existingAttendance.members = membersArray;
      existingAttendance.lastModifiedBy = userId;

      if (typeof existingAttendance.addModificationHistory === "function") {
        existingAttendance.addModificationHistory(userId, {
          previous: previousData,
          current: membersArray,
          action: 'update'
        });
      }

      attendanceRecord = await existingAttendance.save();
    } else {
      attendanceRecord = new attendanceModel({
        date: attendanceDate,
        dateString,
        members: membersArray,
        createdBy: userId,
        lastModifiedBy: userId
      });

      await attendanceRecord.save();
    }

    res.status(200).json({
      success: true,
      message: 'Attendance saved successfully',
      data: attendanceRecord
    });
  } catch (error) {
    console.error('Error saving attendance:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get attendance for a specific date
export const getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const dateString = moment(date).format('YYYY-MM-DD');

    const attendance = await attendanceModel.findOne({ dateString })
      .populate('createdBy', 'name email')
      .populate('lastModifiedBy', 'name email')
      .populate('lockedBy', 'name email');

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'No attendance record found for this date'
      });
    }

    res.status(200).json({
      success: true,
      data: attendance
    });
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get monthly attendance
export const getMonthlyAttendance = async (req, res) => {
  try {
    const { month, year } = req.params;

    const monthlyData = await attendanceModel.getMonthlyAttendance(
      parseInt(month),
      parseInt(year)
    );

    const stats = {
      totalDays: monthlyData.length,
      averageAttendance: 0,
      memberStats: {}
    };

    if (monthlyData.length > 0) {
      const totalPercentage = monthlyData.reduce((sum, day) => sum + day.attendancePercentage, 0);
      stats.averageAttendance = totalPercentage / monthlyData.length;

      const memberNames = [...new Set(monthlyData.flatMap(day => day.members.map(m => m.memberName)))];

      memberNames.forEach(memberName => {
        const memberDays = monthlyData.filter(day =>
          day.members.some(m => m.memberName === memberName)
        );

        const presentDays = memberDays.filter(day =>
          day.members.find(m => m.memberName === memberName)?.status === 'present'
        ).length;

        stats.memberStats[memberName] = {
          totalDays: memberDays.length,
          presentDays,
          absentDays: memberDays.length - presentDays,
          attendancePercentage: (presentDays / memberDays.length) * 100
        };
      });
    }

    res.status(200).json({
      success: true,
      data: {
        attendance: monthlyData,
        statistics: stats
      }
    });
  } catch (error) {
    console.error('Error fetching monthly attendance:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Lock / unlock attendance
export const toggleAttendanceLock = async (req, res) => {
  try {
    const { date, isLocked } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;

    if (userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only administrators can lock/unlock attendance'
      });
    }

    const dateString = moment(date).format('YYYY-MM-DD');
    const attendanceRecord = await attendanceModel.findOne({ dateString });

    if (!attendanceRecord) {
      return res.status(404).json({
        success: false,
        message: 'No attendance record found for this date'
      });
    }

    if (isLocked && typeof attendanceRecord.lockAttendance === "function") {
      await attendanceRecord.lockAttendance(userId);
    } else if (!isLocked && typeof attendanceRecord.unlockAttendance === "function") {
      await attendanceRecord.unlockAttendance();
    }

    res.status(200).json({
      success: true,
      message: `Attendance ${isLocked ? 'locked' : 'unlocked'} successfully`,
      data: attendanceRecord
    });
  } catch (error) {
    console.error('Error toggling attendance lock:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get member-specific stats
export const getMemberStats = async (req, res) => {
  try {
    const { memberName } = req.params;
    const { startDate, endDate } = req.query;

    const start = startDate ? new Date(startDate) : moment().startOf('month').toDate();
    const end = endDate ? new Date(endDate) : moment().endOf('month').toDate();

    const stats = await attendanceModel.getMemberAttendanceStats(memberName, start, end);

    if (stats.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No attendance data found for this member in the specified period'
      });
    }

    res.status(200).json({
      success: true,
      data: stats[0]
    });
  } catch (error) {
    console.error('Error fetching member stats:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get attendance summary
export const getAttendanceSummary = async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    let startDate, endDate;

    switch (period) {
      case 'week':
        startDate = moment().startOf('week').toDate();
        endDate = moment().endOf('week').toDate();
        break;
      case 'year':
        startDate = moment().startOf('year').toDate();
        endDate = moment().endOf('year').toDate();
        break;
      default:
        startDate = moment().startOf('month').toDate();
        endDate = moment().endOf('month').toDate();
    }

    const summary = await attendanceModel.aggregate([
      { $match: { date: { $gte: startDate, $lte: endDate } } },
      {
        $group: {
          _id: null,
          totalDays: { $sum: 1 },
          totalPresentCount: { $sum: '$presentCount' },
          totalAbsentCount: { $sum: '$absentCount' },
          averageAttendance: { $avg: '$attendancePercentage' },
          lockedDays: { $sum: { $cond: ['$isLocked', 1, 0] } }
        }
      }
    ]);

    const lockedDates = await attendanceModel.getLockedDates(startDate, endDate);

    res.status(200).json({
      success: true,
      data: {
        summary: summary[0] || {
          totalDays: 0,
          totalPresentCount: 0,
          totalAbsentCount: 0,
          averageAttendance: 0,
          lockedDays: 0
        },
        lockedDates
      }
    });
  } catch (error) {
    console.error('Error fetching attendance summary:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

