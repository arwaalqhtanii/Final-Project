import express from 'express';
import cors from 'cors';
import connectDB from './database/Database.js'; // Ensure this matches the file name exactly
import userRoutes from './routes/userRoutes.js';
import eventRoute from './routes/eventRoutes.js'
import ticketRoutes from './routes/ticketRoutes.js';
import dotenv from 'dotenv';
import crypto from 'crypto';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();
// const generateKey = () => {
//     return crypto.randomBytes(32).toString('hex'); // Generates a 64-character hex string
// };

// console.log("Your new encryption key:", generateKey());


// Use Routes
app.use('/user', userRoutes);
app.use('/event', eventRoute);
app.use('/tickets', ticketRoutes);

// Start the Server
const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
