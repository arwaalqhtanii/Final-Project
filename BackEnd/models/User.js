// In models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    idNumber: { type: String, required: true, unique: true },
    Username:{type:String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String }, // For session management
    isSuspended: { type: Boolean, default: false },
    suspensionEnd: { type: Date, default: null },
    approvedNotificationCount: { type: Number, default: 0 }, // Set default to 0
    approvalTimestamps: { type: [Date], default: [] }, // Set default to an empty array
    approvedVisitDays: { type: [String], default: [] }, 

});

const User = mongoose.model('User', UserSchema);

export default User; // Ensure you are using default export
