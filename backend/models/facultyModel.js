import mongoose  from  "mongoose";

const facultySchema = new mongoose.Schema(
    {
    name:{
        type:String,
        required: [true, 'name is required'],
    },
    description:{
        type:String,
        required: [true, 'description is required'],
    },
    category: {
    type: String,
    enum: ['Dean', 'HOD', 'Program Director', 'Associate Profesor'],
    trim: true
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    cabin: {
    type: String,
    required: [true, 'cabin is required'],
    },
    phone: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    Date: {
    type: Date,
    default: Date.now
  }
},
  { timestamps: true }
)

export default mongoose.model("Faculty", facultySchema);
