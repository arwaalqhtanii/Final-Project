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
    },
    ticketInfo: {
        eventName: { type: String, required: true }, // Ensure event name is required
        uniqueCode: { type: String, required: true }, // Ensure unique code is required
        originalPrice: { type: Number, required: true }, // Ensure original price is required
        newPrice: { type: Number, required: true }, // Ensure new price is required\
        visitDate: { type: Date },
    },
    status: { 
        type: String, 
        default: 'pending', // Default status
        enum: ['pending', 'approved','canceled'] // Optional: restrict status values
    },
   
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Export the Notification model
export default mongoose.model('Notification', notificationSchema);
