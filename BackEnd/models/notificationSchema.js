import mongoose from 'mongoose';

// Define the notification schema
const notificationSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    message: { 
        type: String, 
        required: true // Make this required if you want to ensure every notification has a message
    },
    ticketInfo: {
        eventName: { type: String, required: true }, // Ensure event name is required
        uniqueCode: { type: String, required: true }, // Ensure unique code is required
        originalPrice: { type: Number, required: true }, // Ensure original price is required
        newPrice: { type: Number, required: true }, // Ensure new price is required
    },
    status: { 
        type: String, 
        default: 'pending', // Default status
        enum: ['pending', 'approved', 'cancel'] // Optional: restrict status values
    },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Export the Notification model
export default mongoose.model('Notification', notificationSchema);
