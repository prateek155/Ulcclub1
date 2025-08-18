// models/Attendance.js
import mongoose from "mongoose";

// Schema for individual member attendance
const MemberAttendanceSchema = new mongoose.Schema({
  memberName: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late', 'excused'],
    default: 'absent'
  },
  checkInTime: {
    type: Date,
    default: null
  },
  checkOutTime: {
    type: Date,
    default: null
  },
  notes: {
    type: String,
    default: ''
  }
});

// Main attendance schema for a specific date
const AttendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
    index: true
  },
  dateString: {
    type: String,
    required: true,
    index: true // Format: "YYYY-MM-DD"
  },
  members: [MemberAttendanceSchema],
  isLocked: {
    type: Boolean,
    default: false
  },
  lockedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  lockedAt: {
    type: Date,
    default: null
  },
  totalMembers: {
    type: Number,
    default: 12
  },
  presentCount: {
    type: Number,
    default: 0
  },
  absentCount: {
    type: Number,
    default: 0
  },
  attendancePercentage: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  modificationHistory: [{
    modifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    modifiedAt: {
      type: Date,
      default: Date.now
    },
    changes: {
      type: String // JSON string of changes made
    }
  }]
}, {
  timestamps: true
});

// Pre-save middleware to calculate statistics
AttendanceSchema.pre('save', function(next) {
  if (this.members && this.members.length > 0) {
    this.presentCount = this.members.filter(member => member.status === 'present').length;
    this.absentCount = this.members.filter(member => member.status === 'absent').length;
    this.totalMembers = this.members.length;
    this.attendancePercentage = (this.presentCount / this.totalMembers) * 100;
  }
  next();
});

// Static methods for common queries
AttendanceSchema.statics.getMonthlyAttendance = function(month, year) {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);
  
  return this.find({
    date: {
      $gte: startDate,
      $lte: endDate
    }
  }).sort({ date: 1 });
};

AttendanceSchema.statics.getMemberAttendanceStats = function(memberName, startDate, endDate) {
  return this.aggregate([
    {
      $match: {
        date: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $unwind: '$members'
    },
    {
      $match: {
        'members.memberName': memberName
      }
    },
    {
      $group: {
        _id: '$members.memberName',
        totalDays: { $sum: 1 },
        presentDays: {
          $sum: {
            $cond: [{ $eq: ['$members.status', 'present'] }, 1, 0]
          }
        },
        absentDays: {
          $sum: {
            $cond: [{ $eq: ['$members.status', 'absent'] }, 1, 0]
          }
        },
        lateDays: {
          $sum: {
            $cond: [{ $eq: ['$members.status', 'late'] }, 1, 0]
          }
        }
      }
    },
    {
      $addFields: {
        attendancePercentage: {
          $multiply: [
            { $divide: ['$presentDays', '$totalDays'] },
            100
          ]
        }
      }
    }
  ]);
};

AttendanceSchema.statics.getLockedDates = function(startDate, endDate) {
  return this.find({
    date: { $gte: startDate, $lte: endDate },
    isLocked: true
  }).select('date dateString isLocked lockedBy lockedAt');
};

// Instance methods
AttendanceSchema.methods.lockAttendance = function(userId) {
  this.isLocked = true;
  this.lockedBy = userId;
  this.lockedAt = new Date();
  return this.save();
};

AttendanceSchema.methods.unlockAttendance = function() {
  this.isLocked = false;
  this.lockedBy = null;
  this.lockedAt = null;
  return this.save();
};

AttendanceSchema.methods.addModificationHistory = function(userId, changes) {
  this.modificationHistory.push({
    modifiedBy: userId,
    modifiedAt: new Date(),
    changes: JSON.stringify(changes)
  });
};

// Indexes for better performance
AttendanceSchema.index({ date: 1, isLocked: 1 });
AttendanceSchema.index({ 'members.memberName': 1, date: 1 });
AttendanceSchema.index({ createdBy: 1, date: -1 });

export default mongoose.model("Attendance", AttendanceSchema);

