import mongoose  from  "mongoose";

const lostSchema = new mongoose.Schema(
    {
    name:{
        type:String,
        required: [true, 'Event name is required'],
    },
    description:{
        type:String,
        required: [true, 'Event description is required'],
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    venue: {
    type: String,
    required: [true, 'Venue is required'],
    },
   
},
  { timestamps: true }
)

export default mongoose.model("Losts", lostSchema);
