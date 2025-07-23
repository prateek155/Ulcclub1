import mongoose  from  "mongoose";

const sponserSchema = new mongoose.Schema(
    {
     sponsername:{
            type:String,
            required: [true, 'Sponsername is required'],
        },
        description:{
            type:String,
            required: [true, 'sponser description is required'],
        },
        photo:{
            data:Buffer,
            contentType:String
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
    },
  { timestamps: true }
)

export default mongoose.model("Sponsers", sponserSchema);