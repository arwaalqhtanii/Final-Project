// In models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    idNumber: { type: String, required: true, unique: true },
    Username:{typr:String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String } // For session management

});

const User = mongoose.model('User', UserSchema);

export default User; // Ensure you are using default export
