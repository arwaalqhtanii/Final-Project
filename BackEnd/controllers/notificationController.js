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

//send notification
export const notifyUserAboutTicket = async (req, res) => {
    const { targetUserEmail, newPrice } = req.body;
    const { uniqueCode } = req.params;

    try {
        const ticket = await Ticket.findOne({ uniqueCode }).populate('eventId');
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

        const targetUser = await User.findOne({ email: targetUserEmail });
        if (!targetUser) return res.status(404).json({ message: 'User not found' });

       // Check for existing notifications with either pending or approved status
        const existingNotification = await Notification.findOne({
            'ticketInfo.uniqueCode': uniqueCode,
            status: { $in: ['pending', 'approved'] }, // Check for both pending and approved statuses
        });

        // If a pending or approved notification exists, return an error
        if (existingNotification) {
            return res.status(400).json({ message: 'A notification for this unique code is already pending or approved.' });
        }

        // Check if new price exceeds original price by more than 50%
        const priceIncreaseLimit = ticket.price * 1.5; // Calculate 150% of the original price
        if (newPrice > priceIncreaseLimit) {
            return res.status(400).json({ message: `New price cannot exceed 50% of the original price  (${priceIncreaseLimit}).` });
        }

        // Create a new notification
        const notification = new Notification({
            userId: targetUser._id,
            ticketInfo: {
                eventName: ticket.eventId.name,
                uniqueCode: ticket.uniqueCode,
                originalPrice: ticket.price,
                newPrice: newPrice,
            },
            status: 'pending',
        });

        await notification.save();

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
export const ignoreNotification = async (req, res) => {
    const { notificationId } = req.params;

    try {
        // Find the notification by ID
        const notification = await Notification.findById(notificationId);
        if (!notification) return res.status(404).json({ message: 'Notification not found' });

        // Update the status to 'canceled'
        notification.status = 'canceled';
        await notification.save();

        res.status(200).json({
            message: 'Notification status updated to canceled',
            notification,
        });
    } catch (error) {
        console.error('Error ignoring notification:', error);
        res.status(500).json({ message: 'Error updating notification status', error });
    }
};

//approved notification
export const approveNotification = async (req, res) => {
    const { notificationId } = req.params;

    // Extract token from headers
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        // Verify token and extract user information
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const currentUserId = decoded.id; // Current user's ID from token

        // Fetch the notification to be approved
        const notification = await Notification.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        // Check if the notification is already approved or canceled
        if (notification.status !== 'pending') {
            return res.status(403).json({ message: 'Notification is not in a pending state' });
        }

        // Update the notification status to 'approved'
        notification.status = 'approved';
        await notification.save();

        // Fetch the associated ticket using the unique code
        const ticket = await Ticket.findOne({ uniqueCode: notification.ticketInfo.uniqueCode });
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Update the original ticket's status
        ticket.isPendingSale = false; 
        ticket.status = 'approved'; // Set the ticket status to approved
        ticket.updateStatus = 1; // Mark ticket as updated
        await ticket.save();

        // Create a new ticket for the user with the same information
        const { ticketType, quantity, visitDate } = ticket; // Assuming these fields exist in the ticket
        const price = calculatePrice(ticketType, quantity); // Calculate total price if necessary

        // Generate a unique code for the new ticket
        const uniqueCode = await generateUniqueCode(currentUserId, ticket.eventId);

        // Create and save the new ticket
        const newTicket = new Ticket({
            eventId: ticket.eventId,
            userId: currentUserId,
            ticketType,
            quantity: 1, // Assuming you want to create a single ticket
            price: price, // Adjust if needed
            totalPrice: price, // Adjust if needed
            visitDate,
            uniqueCode,
            updateStatus: 0, // Setting the update status to 0
            isPendingSale: false
        });

        await newTicket.save();

        res.status(200).json({
            message: 'Notification approved, original ticket updated, and new ticket created',
            notification,
            updatedTicket: ticket,
            newTicket: newTicket, // Include the newly created ticket in the response
        });
    } catch (error) {
        console.error('Error approving notification:', error);
        res.status(500).json({ message: 'Error approving notification', error });
    }
};

//track user for suspend 
// export const trackAndSuspendUser = async (req, res) => {
//     // Set the timeframe to the last minute
//     const oneMinuteAgo = new Date(Date.now() - 60 * 1000);

//     try {
//         const notificationThreshold = 3;
//         const notifications = await Notification.aggregate([
//             {
//                 $match: {
//                     status: 'approved',
//                     visitDate: { $gte: oneMinuteAgo },
//                 },
//             },
//             {
//                 $group: {
//                     _id: {
//                         userId: '$userId',
//                         visitDate: { $dateToString: { format: "%Y-%m-%d", date: "$visitDate" } },
//                     },
//                     count: { $sum: 1 },
//                 },
//             },
//             {
//                 $group: {
//                     _id: '$_id.userId',
//                     uniqueVisitDays: { $sum: 1 },
//                 },
//             },
//             {
//                 $match: {
//                     notificationCount: { $gt: notificationThreshold },
//                 },
//             },
//         ]);

//         // Suspend users who meet the criteria
//         for (const user of notifications) {
//             await User.findByIdAndUpdate(user._id, {
//                 isSuspended: true,
//                 suspensionEnd: Date.now() + 120000, // Set end time for suspension 
//             });

//             // Schedule unsuspension
//             setTimeout(async () => {
//                 await User.findByIdAndUpdate(user._id, {
//                     isSuspended: false,
//                     suspensionEnd: null, // Clear suspension end
//                 });
//             }, 120000); // 120000 ms = 2 minutes
       
//         }

//         res.status(200).json({
//             message: 'Users suspended temporarily for sending excessive notifications.',
//             users: notifications,
//         });
//     } catch (error) {
//         console.error('Error suspending users:', error);
//         res.status(500).json({ message: 'Error suspending users', error });
//     }
// };

export const trackAndSuspendUser = async (req, res) => {
    const { userId } = req.body;
    const startTime = new Date(Date.now() - 60000); // Last minute

    try {
        const notifications = await Notification.find({
            userId: new mongoose.Types.ObjectId(userId),
            status: 'approved',
            createdAt: { $gte: startTime },
        });

        console.log('Fetched Notifications:', notifications);
        
        if (notifications.length < 2) {
            return res.status(200).json({
                message: 'User does not meet the criteria for suspension.',
                user: userId,
            });
        }

        const visitDates = new Set();

        notifications.forEach(n => {
            if (n.ticketInfo && n.ticketInfo.visitDate) {
                const date = n.ticketInfo.visitDate.toISOString().split('T')[0];
                console.log('Visit Date:', date);
                visitDates.add(date);
            }
        });

        console.log('Unique Visit Dates:', Array.from(visitDates));

        // Check if there are at least 2 unique visit dates
        if (visitDates.size > 1) {
            console.log('Suspending user:', userId); // Log before suspension
            await User.findByIdAndUpdate(userId, {
                isSuspended: true,
                suspensionEnd: Date.now() + 120000, // Suspend for 2 minutes
            });

            return res.status(200).json({
                message: 'User suspended temporarily for receiving excessive notifications.',
                user: userId,
            });
        }

        res.status(200).json({
            message: 'User does not meet the criteria for suspension.',
            user: userId,
        });
    } catch (error) {
        console.error('Error suspending user:', error);
        res.status(500).json({ message: 'Error suspending user', error });
    }
};














//test suspend 
// const createTestNotifications = async () => {
//     // const foundUser = await User.findOne(); // Fetch a valid user
//     const userId = '67138d9ab170d1582fe5462b'; // Use the user's ObjectId
//     console.log("userId :  " + userId);
    
//     const notifications = [];
//     for (let i = 0; i < 4; i++) { // Create 3 notifications for testing
//         notifications.push({
//             userId,
//             ticketInfo: {
//                 eventName: 'Test Event',
//                 uniqueCode: 'testCode' + i,
//                 originalPrice: 100,
//                 newPrice: 75,
//             },
//             status: 'approved', // Set status to approved
//             visitDate: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)), // Create notifications on different past days
//         });
//     }

//     await Notification.insertMany(notifications);
//     const notifications5 = await Notification.find({ userId: '67138d9ab170d1582fe5462b' });
//     console.log(notifications5);

//     console.log('Test notifications created');
// };

// createTestNotifications();
const createNotifications = async () => {
    const newNotifications = [
        {
            userId: new mongoose.Types.ObjectId('67138d9ab170d1582fe5462b'),
            ticketInfo: {
                eventName: 'Test Event 1',
                uniqueCode: 'testCode1',
                originalPrice: 100,
                newPrice: 75,
                visitDate: new Date('2024-11-16T00:00:00.000Z') // Ensure this is included
            },
            status: 'approved',
            createdAt: new Date(),
        },
        {
            userId: new mongoose.Types.ObjectId('67138d9ab170d1582fe5462b'),
            ticketInfo: {
                eventName: 'Test Event 2',
                uniqueCode: 'testCode2',
                originalPrice: 100,
                newPrice: 75,
                visitDate: new Date('2024-11-15T00:00:00.000Z') // Ensure this is included
            },
            status: 'approved',
            createdAt: new Date(),
        },
    ];
    
    // Save notifications to the database
    await Notification.insertMany(newNotifications);
    

};

createNotifications().then(() => console.log('Notifications created.'));










