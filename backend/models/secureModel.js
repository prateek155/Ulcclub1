import mongoose from "mongoose";

// Define the file schema for secureModel
const secureSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true,
    trim: true
  },
  filename: {
    type: String,
    required: true,
    unique: true
  },
  path: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  accessCount: {
    type: Number,
    default: 0
  },
  lastAccessedAt: {
    type: Date,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  metadata: {
    uploadedBy: {
      type: String,
      default: ''
    },
    ipAddress: {
      type: String,
      default: null
    },
    userAgent: {
      type: String,
      default: null
    }
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
secureSchema.index({ uploadedAt: -1 });
secureSchema.index({ mimeType: 1 });
secureSchema.index({ isActive: 1 });
secureSchema.index({ filename: 1 }, { unique: true });

// Virtual for file size in human readable format
secureSchema.virtual('humanReadableSize').get(function() {
  const bytes = this.size;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Bytes';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  return `${Math.round((bytes / Math.pow(1024, i)) * 100) / 100} ${sizes[i]}`;
});

// Virtual for file extension
secureSchema.virtual('fileExtension').get(function() {
  return this.originalName.split('.').pop().toLowerCase();
});

// Virtual for file category based on mime type
secureSchema.virtual('category').get(function() {
  const mimeType = this.mimeType.toLowerCase();

  if (mimeType.startsWith('image/')) {
    return 'image';
  }
  if (mimeType.startsWith('video/')) {
    return 'video';
  }
  if (mimeType.startsWith('audio/')) {
    return 'audio';
  }
  if (mimeType.includes('pdf')) {
    return 'pdf';
  }
  if (mimeType.includes('word') || mimeType.includes('document')) {
    return 'document';
  }
  if (mimeType.includes('text')) {
    return 'text';
  }
  
  return 'other';
});

// Instance method to increment access count
secureSchema.methods.incrementAccess = function() {
  this.accessCount += 1;
  this.lastAccessedAt = new Date();
  return this.save();
};

// Instance method to check if file is recently uploaded (within 24 hours)
secureSchema.methods.isRecentlyUploaded = function() {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return this.uploadedAt > oneDayAgo;
};

// Static method to find files by category
secureSchema.statics.findByCategory = function(category) {
  let mimeTypePattern;
  
  switch (category.toLowerCase()) {
    case 'image':
      mimeTypePattern = /^image\//;
      break;
    case 'video':
      mimeTypePattern = /^video\//;
      break;
    case 'audio':
      mimeTypePattern = /^audio\//;
      break;
    case 'pdf':
      mimeTypePattern = /pdf/;
      break;
    case 'document':
      mimeTypePattern = /word|document/;
      break;
    case 'text':
      mimeTypePattern = /^text\//;
      break;
    default:
      return this.find({ isActive: true });
  }
  
  return this.find({
    mimeType: { $regex: mimeTypePattern },
    isActive: true
  });
};

// Static method to get file statistics
secureSchema.statics.getStatistics = async function() {
  const stats = await this.aggregate([
    {
      $match: { isActive: true }
    },
    {
      $group: {
        _id: null,
        totalFiles: { $sum: 1 },
        totalSize: { $sum: '$size' },
        avgSize: { $avg: '$size' },
        totalAccess: { $sum: '$accessCount' }
      }
    }
  ]);
  
  const categoryStats = await this.aggregate([
    {
      $match: { isActive: true }
    },
    {
      $group: {
        _id: {
          $switch: {
            branches: [
              { case: { $regexMatch: { input: '$mimeType', regex: /^image\// } }, then: 'image' },
              { case: { $regexMatch: { input: '$mimeType', regex: /^video\// } }, then: 'video' },
              { case: { $regexMatch: { input: '$mimeType', regex: /^audio\// } }, then: 'audio' },
              { case: { $regexMatch: { input: '$mimeType', regex: /pdf/ } }, then: 'pdf' },
              { case: { $regexMatch: { input: '$mimeType', regex: /word|document/ } }, then: 'document' },
              { case: { $regexMatch: { input: '$mimeType', regex: /^text\// } }, then: 'text' },
            ],
            default: 'other'
          }
        },
        count: { $sum: 1 },
        totalSize: { $sum: '$size' }
      }
    }
  ]);
  
  return {
    overall: stats[0] || {
      totalFiles: 0,
      totalSize: 0,
      avgSize: 0,
      totalAccess: 0
    },
    byCategory: categoryStats
  };
};

// Pre-save middleware to validate file
secureSchema.pre('save', function(next) {
  // Ensure file size is positive
  if (this.size <= 0) {
    return next(new Error('File size must be greater than 0'));
  }
  
  // Validate mime type
  const allowedMimeTypes = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/gif',
    'video/mp4', 'video/avi', 'video/mkv', 'video/mov',
    'audio/mp3', 'audio/wav', 'audio/mpeg',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];
  
  if (!allowedMimeTypes.includes(this.mimeType)) {
    return next(new Error('Invalid file type'));
  }
  
  next();
});

// Ensure virtual fields are serialized
secureSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.__v;
    return ret;
  }
});

secureSchema.set('toObject', { virtuals: true });

export default mongoose.model("secureModel", secureSchema);
