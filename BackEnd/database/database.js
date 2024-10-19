// Database.js
import mongoose from 'mongoose';

const connectDB = async () => {
    // console.log('MONGODB_URI:', process.env.MONGO_URL); // Log the URI
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

export default connectDB;
