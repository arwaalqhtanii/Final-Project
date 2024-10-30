import express from 'express';
import cors from 'cors';
import connectDB from './database/database.js'; 
import userRoutes from './routes/userRoutes.js';
import eventRoute from './routes/eventRoutes.js'
import ticketRoutes from './routes/ticketRoutes.js';
import notificationRouter from './routes/notificationRoutes.js'
import dotenv from 'dotenv';


dotenv.config();
const app = express();
// app.use(cors());
app.options('*', cors());

app.use(express.json());

connectDB();


// Use Routes
app.use('/user', userRoutes);
app.use('/event', eventRoute);
app.use('/tickets', ticketRoutes);
app.use('/notifications', notificationRouter);


const PORT = process.env.PORT||3000 ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
