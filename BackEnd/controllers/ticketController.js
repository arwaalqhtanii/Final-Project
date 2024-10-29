import Ticket from '../models/ticket.js';
import Event from '../models/Event.js';
import User from '../models/User.js';
import mongoose from 'mongoose'; 
import crypto from 'crypto'; 
import CryptoJS from 'crypto-js'; 
import dotenv from 'dotenv';
import Stripe from 'stripe';
import Notification from '../models/notificationSchema.js'; 



// format date to dd/mm/yyyy
const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};


dotenv.config(); 


const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; 
const IV_LENGTH = 16; 


export const decrypt = (text) => {
    const parts = text.split(':');
    if (parts.length !== 2) {
        throw new Error('Invalid encrypted data format');
    }

    const [ivHex, encryptedText] = parts;

    const iv = Buffer.from(ivHex, 'hex');
    const keyBuffer = Buffer.from(ENCRYPTION_KEY.trim(), 'hex');

    let decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
};



// Purchase ticket
export const purchaseTicket = async (req, res) => {
    const { ticketType, quantity, visitDate } = req.body;
    const { eventId } = req.params;
    const { _id: userId, IDNumber, email } = req.user; 


    try {
        
        const decryptedIDNumber = decrypt(IDNumber);

         const event = await Event.findById(eventId);
         if (!event) {
             return res.status(404).json({ message: 'Event not found' });
         }

    const startDateStr = event.startDate;
    const endDateStr = event.endDate;
    const visitDateStr = visitDate; 
 console.log("visitDateStr"+visitDateStr);
 
    if (typeof visitDateStr !== 'string' || !/^\d{2}\/\d{2}\/\d{4}$/.test(visitDateStr)) {
        return res.status(400).json({ message: 'Visit date must be provided in dd/mm/yyyy format.' });
    }

    const [visitDay, visitMonth, visitYear] = visitDateStr.split('/');
    const visitDateObj = new Date(`${visitYear}-${visitMonth}-${visitDay}`);

    console.log('visitDateObj:', visitDateObj);

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    // Validate that visitDate is within the event date range
    if (visitDateObj < startDate || visitDateObj > endDate) {
        return res.status(400).json({
            message: `Visit date must be between ${formatDate(startDate)} and ${formatDate(endDate)}.`
        });
    }


         // Check ticket availability
        const totalSold = event.totalTicketsSold[ticketType] || 0;
        const totalAvailable = event[`totalTickets${ticketType.charAt(0).toUpperCase() + ticketType.slice(1)}`]; 

        if (totalSold + quantity > totalAvailable) {
            return res.status(400).json({
                message: `Cannot purchase ${quantity} ${ticketType} tickets. Only ${totalAvailable - totalSold} tickets left.`
            });
        }
 
        const price = calculatePrice(ticketType, quantity);
        const tickets = []; 

        for (let i = 0; i < quantity; i++) {
            const uniqueCode = await generateUniqueCode(userId, eventId);

            const ticket = new Ticket({
                eventId,
                userId,
                ticketType,
                quantity: 1, 
                price: price / quantity, 
                totalPrice:price,
                visitDate:visitDateObj,
                uniqueCode,
                updateStatus: 0 ,
                isPendingSale: false
            });

            tickets.push(ticket.save());
        }

        const savedTickets = await Promise.all(tickets);

        await Event.updateOne(
            { _id: eventId },
            { $inc: { [`totalTicketsSold.${ticketType}`]: quantity } } 
        );
       
        res.status(201).json({
            message: 'Tickets purchased successfully',
            tickets: savedTickets,
            user: {
                IDNumber:decryptedIDNumber,
                email,
                userId,   
            },
        });
    } catch (error) {
        console.error('Error purchasing tickets:', error);
        res.status(400).json({ message: 'Error purchasing tickets', error });
    }
};

//encripted id number 
const encryptIdNumber = (idNumber, eventId) => {
    const combined = `${idNumber}-${eventId}`; 
    const encrypted = CryptoJS.AES.encrypt(combined,process.env.ENCRYPTION_KEY ).toString(); 
    return encrypted;
};




export const generateUniqueCode = async (idNumber, eventId) => {
    const encryptedIdNumber = encryptIdNumber(idNumber, eventId); 
    const uniqueCode = CryptoJS.SHA256(`${encryptedIdNumber}${Date.now()}`).toString().slice(0, 6);

   
    const existingTicket = await Ticket.findOne({ uniqueCode });
    if (existingTicket) {
        return await generateUniqueCode(idNumber, eventId); 
    }

    return uniqueCode;
};

// Price calculation function
export const calculatePrice = (ticketType, quantity) => {
    const prices = {
        gold: 150,
        silver: 100,
        standard: 50,
    };
    return (prices[ticketType] || 0) * quantity; 
};



//--------------------------------------------


//count for Ticket 
export const getTicketCountsByDate = async (req, res) => {
    const { eventId } = req.params;
    const dateParam = req.query.date;

    if (!eventId) {
        return res.status(400).json({ message: "Event ID is required" });
    }
    if (!dateParam) {
        return res.status(400).json({ message: "Date is required" });
    }

    const date = new Date(dateParam);
    if (isNaN(date)) {
        return res.status(400).json({ message: "Invalid date format" });
    }

    const startOfDay = new Date(date);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        const totalTickets = {
            gold: event.totalTicketsGold || 0,
            silver: event.totalTicketsSilver || 0,
            standard: event.totalTicketsStandard || 0,
        };

        const ticketCounts = await Ticket.aggregate([
            {
                $match: {
                    eventId:new mongoose.Types.ObjectId(eventId),
                    visitDate: {
                        $gte: startOfDay,
                        $lte: endOfDay
                    }
                }
            },
            {
                $group: {
                    _id: '$ticketType',
                    totalPurchased: { $sum: '$quantity' }
                }
            }
        ]);

        const counts = {
            gold: 0,
            silver: 0,
            standard: 0,
        };

        ticketCounts.forEach(ticket => {
            counts[ticket._id] = ticket.totalPurchased || 0;
        });

        const remainingTickets = {
            gold: totalTickets.gold - counts.gold,
            silver: totalTickets.silver - counts.silver,
            standard: totalTickets.standard - counts.standard,
        };

         // Check if no remaining tickets are available
         if (remainingTickets.gold === 0 && remainingTickets.silver === 0 && remainingTickets.standard === 0) {
            return res.status(200).json({
                message: "There are no tickets available for this day.",
                counts,
                remainingTickets
            });
        }

        res.status(200).json({
            counts,
            remainingTickets
        });
    } catch (error) {
        console.error('Error retrieving ticket counts:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


//-------------------------------//--------------------------


//get user ticket
export const getUserTickets = async (req, res) => {
    const userId = req.user._id; 

    try {
        const tickets = await Ticket.find({ userId }).populate('eventId'); 
        if (!tickets.length) {
            return res.status(404).json({ message: 'No tickets found for this user.' });
        }

        const user = await User.findById(userId); 
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const decryptedIdNumber = decrypt(user.idNumber); 

        const notifications = await Notification.find({
            'ticketInfo.uniqueCode': { $in: tickets.map(ticket => ticket.uniqueCode) }
        });

        const notificationsByTicket = notifications.reduce((acc, notification) => {
            const code = notification.ticketInfo.uniqueCode;
            if (!acc[code]) {
                acc[code] = [];
            }
            acc[code].push(notification);
            return acc;
        }, {});

        const ticketsWithUserInfo = tickets.map(ticket => ({
            ...ticket.toObject(), 
            visitDate: formatDate(ticket.visitDate), 
            user: {
                IDNumber: user.idNumber, 
                email: user.email,      
                userId: user._id.toString(), 
                userId2: decryptedIdNumber
            },
            notifications: notificationsByTicket[ticket.uniqueCode] || [] 
        }));

        res.status(200).json({
            message: 'Tickets retrieved successfully',
            tickets: ticketsWithUserInfo,
        });
    } catch (error) {
        console.error('Error retrieving tickets:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


//get user tickets bt status
export const getUserTicketsupdatestatus = async (req, res) => {
    const userId = req.user._id; 
    const { updateStatus } = req.params; 

    try {
        const query = { userId };

        if (updateStatus !== undefined) {
            query.updateStatus = updateStatus; 
        }

        const tickets = await Ticket.find(query)
            .populate('eventId') 
            .sort({ purchaseDate: -1 }); 

      
            if (!tickets || tickets.length === 0) {
                return res.status(200).json({ message: 'No tickets found for this user.', tickets: [] });
            }

        const user = await User.findById(userId); 
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const decryptedIdNumber = decrypt(user.idNumber); 

        const ticketsWithUserInfo = tickets.map(ticket => ({
            ...ticket.toObject(), 
            visitDate: formatDate(ticket.visitDate), 
            purchaseDate: formatDate(ticket.purchaseDate), 
            user: {
                IDNumber: user.idNumber, 
                email: user.email,      
                userId: user._id.toString(), 
                userId2: decryptedIdNumber 
            },
        }));

        res.status(200).json({
            message: 'Tickets retrieved successfully',
            tickets: ticketsWithUserInfo,
        });
    } catch (error) {
        console.error('Error retrieving tickets:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};



//get tickets by id number 
export const getTicketsByIdNumber = async (req, res) => {
    const { idNumber } = req.params; 

    try {
        const decryptedIdNumber = decrypt(idNumber); 

        const user = await User.findOne({ idNumber: idNumber }); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const tickets = await Ticket.find({ userId: user._id }); 

        if (tickets.length === 0) {
            return res.status(404).json({ message: 'No tickets found for this user' });
        }

        const ticketsWithUserInfo = tickets.map(ticket => ({
            ...ticket.toObject(), 
            user: {
                IDNumber:idNumber , 
                email: user.email,           
                userId: user._id.toString(), 
                decrptionId:decryptedIdNumber
            },
        }));

        res.status(200).json({
            message: 'Tickets retrieved successfully',
            tickets: ticketsWithUserInfo,
        });
    } catch (error) {
        console.error('Error retrieving tickets:', error);
        res.status(500).json({ message: 'Error retrieving tickets', error });
    }
};



//------------//---------------------------------

//update ticket idnumber 
export const updateTicketIdNumber = async (req, res) => {
    const { ticketId, newPrice } = req.params; 

    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        const userId = decoded.id; 

        const foundUser = await User.findById(userId);
        if (!foundUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const ticket = await Ticket.findById(ticketId);
        
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        if (ticket.updateStatus !== 0) {
            return res.status(403).json({ message: 'You are not allowed to update this ticket' });
        }

        ticket.userId = foundUser._id;
        ticket.updateStatus = 1; 
        ticket.idNumber = foundUser.idNumber; 
        ticket.price = newPrice; 
        ticket.status = 'approved'; 

        const newUniqueCode = await generateUniqueCode(foundUser._id, ticket.eventId);
        ticket.uniqueCode = newUniqueCode; 

        await ticket.save();

        res.status(200).json({
            message: 'Ticket updated successfully and approved',
            updatedTicket: ticket,
            user: {
                IDNumber: foundUser.idNumber, 
                email: foundUser.email,
                userId: foundUser._id.toString(),
            },
        });
    } catch (error) {
        console.error('Error updating ticket:', error);
        res.status(500).json({ message: 'Error updating ticket', error });
    }
};


//get ticket by id of ticket id
export const getticketbyID = async (req, res) => {
    const { ticketId } = req.params; 
    console.log(ticketId);

    try {
        const ticket = await Ticket.findById(ticketId).populate('eventId'); 

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.status(200).json({
            message: 'Ticket retrieved successfully',
            ticket,
        });
    } catch (error) {
        console.error('Error retrieving ticket:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


//get ticket by the uniqeCode 
export const TicketfindbyCode = async (req, res) => {
    const { uniqueCode } = req.params; 

    try {
        const ticket = await Ticket.findOne({ uniqueCode }).populate('eventId'); 

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        const notification = await Notification.findOne({ 'ticketInfo.uniqueCode': uniqueCode });

        res.status(200).json({
            message: 'Ticket retrieved successfully',
            ticket: {
                ...ticket.toObject(),
                user: {
                    userId: ticket.userId._id.toString(),
                },
                notificationStatus: notification ? notification.status : null, 
                notificationID: notification ? notification._id : null, 
                ticketId: ticket._id.toString(), 


            },
        });
    } catch (error) {
        console.error('Error retrieving ticket:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


//------------------------------------------------Payment----------------------//

// Initialize Stripe secret key
const stripe = new Stripe('sk_test_51QCyiNFjwRhkW7KwE7OtYSL4Jyq97onSo0ur0n32cMijET3p7x5nV1OSwCPkJtNUTeWGnbsOHtCBEwERM07mzKx00025J8K7SK');

// Function to create payment intent
export const createPaymentIntent = async (req, res) => {
    const { paymentMethodId, amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, 
            currency: 'sar', 
            payment_method: paymentMethodId,
            confirm: true, 
            payment_method_types: ['card'], 
        });

        res.status(200).json({ success: true, paymentIntent });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: error.message });
    }
};