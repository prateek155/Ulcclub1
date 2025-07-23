import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    answer:{
        type: String,
        required: true
    },
    role:{
        type: Number,
        default: 0, // Default role can be (user), 1 (admin), etc.
    },
   
},
{ timestamps: true}
);

export default mongoose.model('user',userSchema);