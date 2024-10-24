// notificationSchema.js
import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String },
    ticketInfo: {
        eventName: String,
        uniqueCode: String,
        originalPrice: Number,
        newPrice: Number,
    },
    status: { type: String, default: 'pending' }, // Status field to track notification state
}, { timestamps: true });

export default mongoose.model('Notification', notificationSchema);
