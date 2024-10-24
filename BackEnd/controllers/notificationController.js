import  Ticket  from'../models/ticket.js';
import  User  from '../models/User.js';
import  Notification  from '../models/notificationSchema.js'; // Import the Notification model

//send notification to user (condition not exceed more than 50%)
export const notifyUserAboutTicket = async (req, res) => {
    const { targetUserEmail, newPrice } = req.body; // Get targetUserEmail and newPrice from the body
    const { uniqueCode } = req.params; // Get uniqueCode from the URL parameters
    const currentUserEmail = req.user.email; // Assume the current user's email is available in req.user

    try {
        // Ensure the target user's email is different from the current user's email
        if (targetUserEmail === currentUserEmail) {
            return res.status(400).json({ message: 'You cannot notify yourself.' });
        }

        // Find the ticket by unique code
        const ticket = await Ticket.findOne({ uniqueCode }).populate('eventId');
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Find the target user by email
        const targetUser = await User.findOne({ email: targetUserEmail });
        if (!targetUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if there's already a pending notification for the same unique code
        const existingNotification = await Notification.findOne({
            'ticketInfo.uniqueCode': uniqueCode, // Check for the same unique code
            status: { $in: ['pending', 'approved'] }, // Check for pending or approved notifications
        });

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
                eventId: ticket.eventId._id,
            },
            status: 'pending', // Set status to pending
        });

        await notification.save(); // Save the notification

        res.status(200).json({
            message: 'Notification sent successfully',
            ticket: {
                uniqueCode: ticket.uniqueCode,
                eventName: ticket.eventId.name,
                newPrice: newPrice,
            },
        });
    } catch (error) {
        console.error('Error notifying user:', error);
        res.status(500).json({ message: 'Error sending notification', error });
    }
};




export const approveNotification = async (req, res) => {
    const { notificationId } = req.params; // Get the notification ID from params

    try {
        const notification = await Notification.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        notification.status = 'approved'; // Change the status to approved
        await notification.save();

        res.status(200).json({ message: 'Notification approved successfully.' });
    } catch (error) {
        console.error('Error approving notification:', error);
        res.status(500).json({ message: 'Error approving notification', error });
    }
};


export const cancelNotification = async (req, res) => {
    const { notificationId } = req.params; // Get the notification ID from params

    try {
        const notification = await Notification.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        notification.status = 'canceled'; // Change the status to canceled
        await notification.save();

        res.status(200).json({ message: 'Notification canceled successfully.' });
    } catch (error) {
        console.error('Error canceling notification:', error);
        res.status(500).json({ message: 'Error canceling notification', error });
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


