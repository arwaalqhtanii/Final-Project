import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    idNumber: { type: String, required: true, unique: true },
    Username:{type:String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String }, 
    isSuspended: { type: Boolean, default: false },
    suspensionEnd: { type: Date, default: null },
    approvedNotificationCount: { type: Number, default: 0 }, 
    approvalTimestamps: { type: [Date], default: [] }, 
    approvedVisitDays: { type: [String], default: [] }, 

});

const User = mongoose.model('User', UserSchema);

export default User; 
