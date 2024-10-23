import  Ticket  from'../models/ticket.js';
import  User  from '../models/User.js';
import  Notification  from '../models/notificationSchema.js'; // Import the Notification model

//send notification to user 
export const notifyUserAboutTicket = async (req, res) => {
    const { uniqueCode, targetUserEmail, newPrice } = req.body; // Use targetUserEmail for the user to notify

    try {
        // Find the ticket by unique code
        const ticket = await Ticket.findOne({ uniqueCode }).populate('eventId');
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Find the user by email
        const targetUser = await User.findOne({ email: targetUserEmail });
        if (!targetUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prepare the notification message
        const notificationMessage = `
            You have a new ticket notification:
            Event: ${ticket.eventId.name}
            Unique Code: ${ticket.uniqueCode}
            Original Price: ${ticket.price}
            New Price: ${newPrice}
        `;

        // Create a new notification in the database
        const notification = new Notification({
            userId: targetUser._id,
            message: notificationMessage,
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

//get notification from user 
export const getUserNotifications = async (req, res) => {
    const userId = req.user._id; // Get user ID from the token

    try {
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({
            message: 'Notifications retrieved successfully',
            notifications,
        });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
};

