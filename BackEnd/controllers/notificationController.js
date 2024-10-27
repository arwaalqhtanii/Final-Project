import  Ticket  from'../models/ticket.js';
import  User  from '../models/User.js';
import  Notification  from '../models/notificationSchema.js'; // Import the Notification model
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { calculatePrice, generateUniqueCode, decrypt } from '../controllers/ticketController.js'
//send notification to user (condition not exceed more than 50%)
// export const notifyUserAboutTicket = async (req, res) => {
//     const { targetUserEmail, newPrice } = req.body; // Get targetUserEmail and newPrice from the body
//     const { uniqueCode } = req.params; // Get uniqueCode from the URL parameters
//     const currentUserEmail = req.user.email; // Assume the current user's email is available in req.user

//     try {
//         // Ensure the target user's email is different from the current user's email
//         if (targetUserEmail === currentUserEmail) {
//             return res.status(400).json({ message: 'You cannot notify yourself.' });
//         }

//         // Find the ticket by unique code
//         const ticket = await Ticket.findOne({ uniqueCode }).populate('eventId');
//         if (!ticket) {
//             return res.status(404).json({ message: 'Ticket not found' });
//         }

//         // Find the target user by email
//         const targetUser = await User.findOne({ email: targetUserEmail });
//         if (!targetUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Check if there's already a pending notification for the same unique code
//         const existingNotification = await Notification.findOne({
//             'ticketInfo.uniqueCode': uniqueCode, // Check for the same unique code
//             status: { $in: ['pending', 'approved'] }, // Check for pending or approved notifications
//         });

//         if (existingNotification) {
//             return res.status(400).json({ message: 'A notification for this unique code is already pending or approved.' });
//         }

//         // Check if new price exceeds original price by more than 50%
//         const priceIncreaseLimit = ticket.price * 1.5; // Calculate 150% of the original price
//         if (newPrice > priceIncreaseLimit) {
//             return res.status(400).json({ message: `New price cannot exceed 50% of the original price  (${priceIncreaseLimit}).` });
//         }

//         // Create a new notification
//         const notification = new Notification({
//             userId: targetUser._id,
//             ticketInfo: {
//                 eventName: ticket.eventId.name,
//                 uniqueCode: ticket.uniqueCode,
//                 originalPrice: ticket.price,
//                 newPrice: newPrice,
//                 eventId: ticket.eventId._id,
//             },
//             status: 'pending', // Set status to pending
//         });

//         await notification.save(); // Save the notification

//         res.status(200).json({
//             message: 'Notification sent successfully',
//             ticket: {
//                 uniqueCode: ticket.uniqueCode,
//                 eventName: ticket.eventId.name,
//                 newPrice: newPrice,
//             },
//         });
//     } catch (error) {
//         console.error('Error notifying user:', error);
//         res.status(500).json({ message: 'Error sending notification', error });
//     }
// };

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
        const creatorUserId = decoded.id; // Get the ID of the user from the token

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
            userId: targetUser._id, // ID of the user receiving the notification
            ticketInfo: {
                eventName: ticket.eventId.name,
                uniqueCode: ticket.uniqueCode,
                originalPrice: ticket.price,
                newPrice: newPrice,
            },
            createdBy: { // Include the creator's info
                userId: creatorUserId, // ID of the user who created the notification
                email: decoded.email, // Optional: if available in the token
            },
            status: 'pending', // Status of the notification
        });

        await notification.save();
        console.log('Created Notification:', notification); // Log created notification

        res.status(200).json({
            message: 'Notification sent successfully',
            notification,
        });
    } catch (error) {
        console.error('Error notifying user:', error);
        res.status(500).json({ message: 'Error sending notification', error });
    }
};



//send notification
// export const notifyUserAboutTicket = async (req, res) => {
//     const { targetUserEmail, newPrice } = req.body;
//     const { uniqueCode } = req.params;

//     try {
//         const ticket = await Ticket.findOne({ uniqueCode }).populate('eventId');
//         if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

//         const targetUser = await User.findOne({ email: targetUserEmail });
//         if (!targetUser) return res.status(404).json({ message: 'User not found' });

//        // Check for existing notifications with either pending or approved status
//         const existingNotification = await Notification.findOne({
//             'ticketInfo.uniqueCode': uniqueCode,
//             status: { $in: ['pending', 'approved'] }, // Check for both pending and approved statuses
//         });

//         // If a pending or approved notification exists, return an error
//         if (existingNotification) {
//             return res.status(400).json({
//                 message: 'A notification for this unique code is already pending or approved.',
//                 existingNotification,
//             });
//         }
//         // Check if new price exceeds original price by more than 50%
//         const priceIncreaseLimit = ticket.price * 1.5; // Calculate 150% of the original price
//         if (newPrice > priceIncreaseLimit) {
//             return res.status(400).json({ message: `New price cannot exceed 50% of the original price  (${priceIncreaseLimit}).` });
//         }

//         // Create a new notification
//         const notification = new Notification({
//             userId: targetUser._id,
//             ticketInfo: {
//                 eventName: ticket.eventId.name,
//                 uniqueCode: ticket.uniqueCode,
//                 originalPrice: ticket.price,
//                 newPrice: newPrice,
//                 isPending:true,
//             },
//             status: 'pending',
//         });


//         await notification.save();
//         console.log('Created notification:', notification);

//         res.status(200).json({
//             message: 'Notification sent successfully',
//             notification,
//         });
//     } catch (error) {
//         console.error('Error notifying user:', error);
//         res.status(500).json({ message: 'Error sending notification', error });
//     }
// };






//get notification from user 
export const getUserNotifications = async (req, res) => {
    const userId = req.user._id; // Get user ID from the token

    try {
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

        if (notifications.length === 0) {
            return res.status(200).json({
                message: 'No notifications found for this user.',
                notifications: [], // Return an empty array
            });
        }

        // Format notifications to include only the relevant information
        const formattedNotifications = notifications.map(notification => ({
            eventName: notification.ticketInfo.eventName,
            uniqueCode: notification.ticketInfo.uniqueCode,
            originalPrice: notification.ticketInfo.originalPrice,
            newPrice: notification.ticketInfo.newPrice,
            createdAt: notification.createdAt, // Optionally include the timestamp
            status: notification.status, // Include the status of the notification
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


//ignore  notification status 
// export const ignoreNotification = async (req, res) => {
//     const { notificationId } = req.params;

//     try {
//         // Find the notification by ID
//         const notification = await Notification.findById(notificationId);
//         if (!notification) return res.status(404).json({ message: 'Notification not found' });

//         // Update the status to 'canceled'
//         notification.status = 'canceled';
//         notification.isPendingSale = false; 
//         await notification.save();

//         res.status(200).json({
//             message: 'Notification status updated to canceled',
//             notification,
//         });
//     } catch (error) {
//         console.error('Error ignoring notification:', error);
//         res.status(500).json({ message: 'Error updating notification status', error });
//     }
// };
export const ignoreNotification = async (req, res) => {
    const { notificationId } = req.params;

    try {
        // Find the notification by ID
        const notification = await Notification.findById(notificationId);
        if (!notification) return res.status(404).json({ message: 'Notification not found' });

        // Update the notification status to 'canceled'
        notification.status = 'canceled';
        // notification.isPendingSale = false; 
        
        // Assuming there is a ticketId associated with the notification
        const ticketId = notification.ticketId; // Adjust if your model structure is different
        
        // If you have a Ticket model, update the ticket status as well
        if (ticketId) {
            const ticket = await Ticket.findById(ticketId); // Make sure you have imported the Ticket model
            if (ticket) {
                ticket.isPending = false; // Change this to match your model's field for pending status
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



//approved with track user behaivoure 
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

        notification.status = 'approved';
        await notification.save();

        const ticket = await Ticket.findOne({ uniqueCode: notification.ticketInfo.uniqueCode });
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        ticket.isPending = false; 
        ticket.status = 'approved';
        notification.updatedAt = new Date();
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
        const visitDateString = ticket.visitDate.toISOString().split('T')[0]; // Get date as YYYY-MM-DD
        
        if (!sender.approvedVisitDays.includes(visitDateString)) {
            sender.approvedVisitDays.push(visitDateString);
            sender.approvedNotificationCount += 1; // Increment only if it's a unique visit day
        }
 
        console.log("approvedNotificationCount"+sender.approvedNotificationCount);
        console.log("sender.approvedVisitDays"+ sender.approvedVisitDays);
        
        // Track approval timestamps
        sender.approvalTimestamps.push(Date.now());

        // Check for recent approvals for suspension logic...

        await sender.save();

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
    const { userId } = req.body; // Get userId from request body

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const notifications = await Notification.find({
            userId: new mongoose.Types.ObjectId(userId),
            status: "approved"
        })
        .sort({ createdAt: 1 }); // Sort by createdAt in ascending order

        res.json(notifications); // Return the fetched notifications
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
};

