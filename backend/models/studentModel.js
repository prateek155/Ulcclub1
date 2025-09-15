import mongoose  from  "mongoose";

// Define the complaint schema
const complaintSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Define the student schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  class: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20
  },
  photo: {
    type: String, // Base64 encoded image or file path
    default: null
  },
  complaints: [complaintSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
studentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Create indexes for better performance
studentSchema.index({ name: 1 });
studentSchema.index({ class: 1 });
studentSchema.index({ createdAt: -1 });

// Instance method to add a complaint
studentSchema.methods.addComplaint = function(complaintText) {
  this.complaints.push({ text: complaintText });
  return this.save();
};

// Instance method to update a complaint
studentSchema.methods.updateComplaint = function(complaintId, newText) {
  const complaint = this.complaints.id(complaintId);
  if (complaint) {
    complaint.text = newText;
    return this.save();
  }
  throw new Error('Complaint not found');
};

// Instance method to remove a complaint
studentSchema.methods.removeComplaint = function(complaintId) {
  this.complaints.pull(complaintId);
  return this.save();
};

// Static method to find students by class
studentSchema.statics.findByClass = function(className) {
  return this.find({ class: className });
};

// Virtual to get complaint count
studentSchema.virtual('complaintCount').get(function() {
  return this.complaints.length;
});

// Ensure virtual fields are serialized
studentSchema.set('toJSON', { virtuals: true });
studentSchema.set('toObject', { virtuals: true });


export default mongoose.model("student", studentSchema);
