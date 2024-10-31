import  Ticket  from'../models/ticket.js';
import  User  from '../models/User.js';
import  Notification  from '../models/notificationSchema.js'; 
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { generateUniqueCode } from '../controllers/ticketController.js'


export const notifyUserAboutTicket = async (req, res) => {
    const { targetUserEmail, newPrice } = req.body;
    const { uniqueCode } = req.params;

    // Extract token from headers
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        // Verify the token and extract user information
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const creatorUserId = decoded.id;

        const ticket = await Ticket.findOne({ uniqueCode }).populate('eventId');
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

        const targetUser = await User.findOne({ email: targetUserEmail });
        if (!targetUser) return res.status(404).json({ message: 'User not found' });

        const existingNotification = await Notification.findOne({
            'ticketInfo.uniqueCode': uniqueCode,
            status: { $in: ['pending', 'approved'] },
        });

        if (existingNotification) {
            return res.status(400).json({ message: 'A notification for this unique code is already pending or approved.' });
        }

        const priceIncreaseLimit = ticket.price * 1.5;
        if (newPrice > priceIncreaseLimit) {
            return res.status(400).json({ message: `New price cannot exceed 50% of the original price (${priceIncreaseLimit}).` });
        }

        const notification = new Notification({
            userId: targetUser._id,
            ticketInfo: {
                eventName: ticket.eventId.name,
                uniqueCode: ticket.uniqueCode,
                originalPrice: ticket.price,
                newPrice: newPrice,
            },
            createdBy: { // Include the creator's info
                userId: creatorUserId,
                email: decoded.email,
            },
            status: 'pending',
        });

        await notification.save();
        console.log('Created Notification:', notification);

        res.status(200).json({
            message: 'Notification sent successfully',
            notification,
        });
    } catch (error) {
        console.error('Error notifying user:', error);
        res.status(500).json({ message: 'Error sending notification', error });
    }
};


//get notification from user 
export const getUserNotifications = async (req, res) => {
    const userId = req.user._id;

    try {
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

        if (notifications.length === 0) {
            return res.status(200).json({
                message: 'No notifications found for this user.',
                notifications: [],
            });
        }

        // Format notifications to include only the relevant information
        const formattedNotifications = notifications.map(notification => ({
            eventName: notification.ticketInfo.eventName,
            uniqueCode: notification.ticketInfo.uniqueCode,
            originalPrice: notification.ticketInfo.originalPrice,
            newPrice: notification.ticketInfo.newPrice,
            createdAt: notification.createdAt,
            status: notification.status,
            id:notification._id,

        }));

        res.status(200).json({
            message: 'Notifications retrieved successfully',
            notifications: formattedNotifications,
        });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
};


export const ignoreNotification = async (req, res) => {
    const { notificationId } = req.params;

    try {
        // Find the notification by ID
        const notification = await Notification.findById(notificationId);
        if (!notification) return res.status(404).json({ message: 'Notification not found' });

        
        notification.status = 'canceled';
     
        

        const ticketId = notification.ticketId;
        
    
        if (ticketId) {
            const ticket = await Ticket.findById(ticketId);
            if (ticket) {
                ticket.isPending = false;
                await ticket.save();
            }
        }

        await notification.save();

        res.status(200).json({
            message: 'Notification status updated to canceled and ticket pending status set to false',
            notification,
        });
    } catch (error) {
        console.error('Error ignoring notification:', error);
        res.status(500).json({ message: 'Error updating notification status', error });
    }
};


//aprover notifecation with newtick inital with track user 
export const approveNotification = async (req, res) => {
    const { notificationId } = req.params;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const currentUserId = decoded.id;

        const notification = await Notification.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        if (notification.status !== 'pending' && notification.status !== 'canceled') {
            return res.status(403).json({ message: 'Notification is not in a pending state' });
        }

        // Approve the notification
        notification.status = 'approved';
        await notification.save();

        const ticket = await Ticket.findOne({ uniqueCode: notification.ticketInfo.uniqueCode });
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Update ticket status
        ticket.isPending = false; 
        ticket.status = 'approved';
        ticket.updateStatus = 1;
        await ticket.save();

        // Create a new ticket based on notification details
        const newTicket = new Ticket({
            userId: currentUserId,
            ticketType: notification.ticketInfo.ticketType || ticket.ticketType,
            quantity: 1,
            price: notification.ticketInfo.newPrice,
            uniqueCode: await generateUniqueCode(currentUserId, ticket.eventId),
            updateStatus: 0,
            eventId: ticket.eventId,
            visitDate: ticket.visitDate,
            isPendingSale: false,
        });

        await newTicket.save();

        const senderId = notification.createdBy.userId;
        const sender = await User.findById(senderId);

        // Track unique visit days
        const visitDateString = ticket.visitDate.toISOString().split('T')[0];

        if (!sender.approvedVisitDays.includes(visitDateString)) {
            sender.approvedVisitDays.push(visitDateString);
            sender.approvedNotificationCount += 1;
        }

        // Track approval timestamps
        sender.approvalTimestamps.push(Date.now());

       // Check for recent approvals for suspension logic
const oneMinuteAgo = Date.now() - 60 * 1000;
const recentApprovals = sender.approvalTimestamps.filter(timestamp => timestamp >= oneMinuteAgo);

// Check if count is > 0
if (recentApprovals.length > 0) {
    if (!sender.isSuspended) {
        sender.isSuspended = true;
        sender.suspensionEnd = Date.now() + 120000;
        await sender.save();

        // Schedule unsuspension
        setTimeout(async () => {
            sender.isSuspended = false;
            sender.suspensionEnd = null;
            await sender.save();
        }, 120000);

        }
    }
       
        res.status(200).json({
            message: 'Notification approved and new ticket created',
            notification,
            newTicket
        });
    } catch (error) {
        console.error('Error approving notification:', error);
        res.status(500).json({ message: 'Error approving notification', error });
    }
};





//fetch notification by userId
export const fetchNotifications = async (req, res) => {
    const { userId } = req.body; 

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const notifications = await Notification.find({
            userId: new mongoose.Types.ObjectId(userId),
            status: "approved"
        })
        .sort({ createdAt: 1 }); 

        res.json(notifications); 
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
};