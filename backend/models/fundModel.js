import mongoose from "mongoose";

const fundSchema = new mongoose.Schema({
    date: {
        type: String, // Storing as a string for simplicity, can be Date type
        required: [true, 'Date is required']
    },
    time: {
        type: String, // Storing as a string for simplicity, can be Date type
        required: [true, 'Time is required']
    },
    approvedBy: {
        type: String,
        required: [true, 'Approved by field is required']
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [0, 'Amount cannot be negative']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Equipment', 'Software', 'Training', 'Research', 'Travel', 'Office Supplies', 'Other']
    },
    description: {
        type: String,
        default: 'N/A'
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
        enum: ['Income', 'Expense']
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});


export default mongoose.model("Funds", fundSchema);

