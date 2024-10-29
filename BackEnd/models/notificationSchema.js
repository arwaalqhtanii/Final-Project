import mongoose from 'mongoose';

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
        eventName: { type: String, required: true }, 
        uniqueCode: { type: String, required: true }, 
        originalPrice: { type: Number, required: true }, 
        newPrice: { type: Number, required: true }, 
        visitDate: { type: Date },
    },
    status: { 
        type: String, 
        default: 'pending', 
        enum: ['pending', 'approved','canceled'] 
    },
       createdBy: {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      email: String,
      name: String
    },
    updatedAt: {type: Date, default: Date.now },
}, { timestamps: true }); 

export default mongoose.model('Notification', notificationSchema);
