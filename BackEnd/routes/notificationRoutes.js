import express from 'express';
import { notifyUserAboutTicket, getUserNotifications,ignoreNotification,approveNotification ,fetchNotifications} from '../controllers/notificationController.js';
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



//fetchNotifications
router.get('/fetchNotifications', fetchNotifications);


export default router;
