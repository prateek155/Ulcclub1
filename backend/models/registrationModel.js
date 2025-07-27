import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/
  }
}, { _id: false });

const registrationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['individual', 'group'],
    required: true
  },

  // Individual fields
  name: {
    type: String,
    required: function () {
      return this.type === 'individual';
    }
  },
  department: {
    type: String,
    required: function () {
      return this.type === 'individual';
    }
  },
  phone: {
    type: String,
    required: function () {
      return this.type === 'individual';
    },
    match: /^[0-9]{10}$/
  },
  email: {
    type: String,
    required: function () {
      return this.type === 'individual';
    },
    match: /.+\@.+\..+/
  },

  // Group fields
  groupName: {
    type: String,
    required: function () {
      return this.type === 'group';
    }
  },
  leadername: {
    type: String,
    required: function () {
      return this.type === 'group';
    }
  },
  leaderphone: {
    type: String,
    required: function () {
      return this.type === 'group';
    },
    match: /^[0-9]{10}$/
  },
  leaderemail: {
    type: String,
    required: function () {
      return this.type === 'group';
    },
    match: /.+\@.+\..+/
  },
  members: {
    type: [memberSchema],
    required: function () {
      return this.type === 'group';
    },
    validate: {
      validator: function (value) {
        return this.type === 'group' ? value.length > 0 : true;
      },
      message: 'At least one group member is required.'
    }
  },

  registrationDate: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Registration', registrationSchema);
