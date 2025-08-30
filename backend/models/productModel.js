import mongoose  from  "mongoose";

const productSchema = new mongoose.Schema(
    {
    name:{
        type:String,
        required: [true, 'Event name is required'],
    },
    description:{
        type:String,
        required: [true, 'Event description is required'],
    },
    category: {
    type: String,
    enum: ['workshop', 'seminar', 'conference', 'networking', 'social', 'sports', 'cultural', 'educational'],
    trim: true
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    startDate: {
    type: Date,
    required: [true, 'Start date is required']
    },
    endDate: {
    type: Date,
    validate: {
      validator: function(value) {
        // End date should be after start date if provided
        return !value || value >= this.startDate;
      },
      message: 'End date must be after start date'
     }
    },
    venue: {
    type: String,
    required: [true, 'Venue is required'],
    },
    status: {
      type: String,
      enum: ['registered', 'confirmed', 'cancelled'],
      default: 'registered'
    }
},
  { timestamps: true }
)

export default mongoose.model("Products", productSchema);
