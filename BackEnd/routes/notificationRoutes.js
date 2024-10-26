import express from 'express';
import { notifyUserAboutTicket, getUserNotifications,ignoreNotification,approveNotification,trackAndSuspendUser } from '../controllers/notificationController.js';
import { authenticateToken } from '../middleware/authMiddleware.js'; // Assuming you have an authentication middleware

const router = express.Router();

// Route to notify a user about a ticket
router.post('/notify/:uniqueCode', authenticateToken, notifyUserAboutTicket);

// Route to get notifications for the authenticated user
router.get('/notificationsshow', authenticateToken, getUserNotifications);


//ignore 
router.put('/notificationsignore/:notificationId',authenticateToken, ignoreNotification);

//approved
router.put('/approve/:notificationId', approveNotification);


// Route to track and suspend users
router.post('/track-and-suspend', trackAndSuspendUser);

export default router;
