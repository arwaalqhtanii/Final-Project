import express from 'express';
import { notifyUserAboutTicket, getUserNotifications } from '../controllers/notificationController.js';
import { authenticateToken } from '../middleware/authMiddleware.js'; // Assuming you have an authentication middleware

const router = express.Router();

// Route to notify a user about a ticket
router.post('/notify/:uniqueCode', authenticateToken, notifyUserAboutTicket);

// Route to get notifications for the authenticated user
router.get('/notificationsshow', authenticateToken, getUserNotifications);

export default router;
