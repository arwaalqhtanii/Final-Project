import Ticket from '../models/ticket.js';
import Event from '../models/Event.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose'; // Make sure to import mongoose
import crypto from 'crypto'; // Import the crypto library
import CryptoJS from 'crypto-js'; // If using crypto-js

// Helper function to format date to dd/mm/yyyy
const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

// Purchase ticket
export const purchaseTicket = async (req, res) => {
    const { ticketType, quantity, visitDate } = req.body;
    const { _id: userId } = req.user;
    const { eventId } = req.params;

    try {

         // Fetch the event to get startDate and endDate
         const event = await Event.findById(eventId);
         if (!event) {
             return res.status(404).json({ message: 'Event not found' });
         }
 
         const startDate = new Date(event.startDate);
         const endDate = new Date(event.endDate);
         const visitDateObj = new Date(visitDate.split('/').reverse().join('-')); // Convert dd/mm/yyyy to Date
 
         // Validate that visitDate is within the event date range
         if (visitDateObj < startDate || visitDateObj > endDate) {
             return res.status(400).json({
                 message: `Visit date must be between ${formatDate(startDate)} and ${formatDate(endDate)}.`
             });
         }
 
        const price = calculatePrice(ticketType, quantity);
        const tickets = []; // Array to hold ticket promises

        for (let i = 0; i < quantity; i++) {
            // Generate the unique code for each ticket
            const uniqueCode = await generateUniqueCode(userId, eventId);

            // Create the ticket with the unique code
            const ticket = new Ticket({
                eventId,
                userId,
                ticketType,
                quantity: 1, // Each ticket will have a quantity of 1
                price: price / quantity, // Calculate price per ticket
                visitDate,
                uniqueCode,
                updateStatus: 0 // Adding the update status flag
            });

            // Save the ticket and push the promise to the array
            tickets.push(ticket.save());
        }

        // Wait for all tickets to be saved
        const savedTickets = await Promise.all(tickets);

        // Update totalTicketsSold for the event
        await Event.updateOne(
            { _id: eventId },
            { $inc: { [`totalTicketsSold.${ticketType}`]: quantity } } // Increment the count based on ticket type
        );

        res.status(201).json({ message: 'Tickets purchased successfully', tickets: savedTickets });
    } catch (error) {
        console.error('Error purchasing tickets:', error);
        res.status(400).json({ message: 'Error purchasing tickets', error });
    }
};


// Generate unique code function
const generateUniqueCode = async (userId, eventId) => {
    let uniqueCode;
    let isDuplicate = true;

    while (isDuplicate) {
        const baseString = `${userId}${eventId}${Date.now()}`;
        uniqueCode = CryptoJS.SHA256(baseString).toString().slice(0, 6);
        const existingTicket = await Ticket.findOne({ uniqueCode });
        isDuplicate = !!existingTicket;
    }

    // console.log('Generated unique code:', uniqueCode);
    return uniqueCode;
};

// Price calculation function
const calculatePrice = (ticketType, quantity) => {
    const prices = {
        gold: 150,
        silver: 100,
        standard: 50,
    };
    return (prices[ticketType] || 0) * quantity; // Ensure a default value if ticketType is invalid
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

        res.status(200).json({
            counts,
            remainingTickets
        });
    } catch (error) {
        console.error('Error retrieving ticket counts:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



// Get all tickets for the authenticated user
export const getUserTickets = async (req, res) => {
    const userId = req.user._id; // Get user ID from the authenticated request

    try {
        const tickets = await Ticket.find({ userId }).populate('eventId'); // Populate eventId for more ticket details

        if (!tickets.length) {
            return res.status(404).json({ message: 'No tickets found for this user.' });
        }

        res.status(200).json({ message: 'Tickets retrieved successfully', tickets });
    } catch (error) {
        console.error('Error retrieving tickets:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
