import Ticket from '../models/ticket.js';
import Event from '../models/Event.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose'; // Make sure to import mongoose
import crypto from 'crypto'; // Import the crypto library
import CryptoJS from 'crypto-js'; // If using crypto-js
import dotenv from 'dotenv';

// Helper function to format date to dd/mm/yyyy
const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};


dotenv.config(); // Load environment variables from .env file


const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Use a strong key stored in your environment variables
const IV_LENGTH = 16; // For AES, this is typically 16 bytes


const decrypt = (text) => {
    // console.log('decripted ID Number:', text);

    const parts = text.split(':');
    if (parts.length !== 2) {
        throw new Error('Invalid encrypted data format');
    }

    const [ivHex, encryptedText] = parts;

    // Ensure IV is a valid hex string
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
    // const { _id: userId } = req.user;
    // const { idNumber: userId } = req.user; // Ensure this matches your user model
    const { eventId } = req.params;
    // console.log('User data:', req.user); // Log the user data
    const { _id: userId, IDNumber, email } = req.user; // Extract user details


    try {
        // Decrypt the IDNumber before using it
        const decryptedIDNumber = decrypt(IDNumber);

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
                totalPrice:price,
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
        // Construct the response with user info
        res.status(201).json({
            message: 'Tickets purchased successfully',
            tickets: savedTickets,
            user: {
                IDNumber:decryptedIDNumber, // Include IDNumber
                email,
                userId,   // Optional userId
            },
        });
        // res.status(201).json({ message: 'Tickets purchased successfully', tickets: savedTickets });
    } catch (error) {
        console.error('Error purchasing tickets:', error);
        res.status(400).json({ message: 'Error purchasing tickets', error });
    }
};


// Generate unique code function
// const generateUniqueCode = async (userId, eventId) => {
//     let uniqueCode;
//     let isDuplicate = true;

//     while (isDuplicate) {
//         const baseString = `${userId}${eventId}${Date.now()}`;
//         uniqueCode = CryptoJS.SHA256(baseString).toString().slice(0, 6);
//         const existingTicket = await Ticket.findOne({ uniqueCode });
//         isDuplicate = !!existingTicket;
//     }

//     // console.log('Generated unique code:', uniqueCode);
//     return uniqueCode;
// };
const generateUniqueCode = async (userId, eventId) => {
    let uniqueCode;
    let isDuplicate;

    do {
        const randomSuffix = Math.random().toString(36).substring(2, 8); // Random string for more uniqueness
        const baseString = `${userId}${eventId}${Date.now()}${randomSuffix}`; // Use random suffix
        uniqueCode = CryptoJS.SHA256(baseString).toString().slice(0, 6); // Generate a new code
        const existingTicket = await Ticket.findOne({ uniqueCode }); // Check for duplicates
        isDuplicate = !!existingTicket; // Set to true if a ticket with the same code exists
    } while (isDuplicate); // Repeat until a unique code is generated

    return uniqueCode; // Return the unique code
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


//-------------------------------//--------------------------

// Get all tickets for the authenticated user
export const getUserTickets = async (req, res) => {
    const userId = req.user._id; // Get user ID from the authenticated request

    try {

        // Fetch tickets associated with the user
        const tickets = await Ticket.find({ userId }).populate('eventId'); // Populate eventId for more ticket details

        if (!tickets.length) {
            return res.status(404).json({ message: 'No tickets found for this user.' });
        }

        // Fetch user information
        const user = await User.findById(userId); // Assuming userId corresponds to the user's document in the User collection
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const decryptedIdNumber = decrypt(user.idNumber); // Use your decrypt function

        // Construct the response by adding user info to each ticket
        const ticketsWithUserInfo = tickets.map(ticket => ({
            ...ticket.toObject(), // Convert ticket to plain object
            user: {
                IDNumber: user.idNumber, // Include IDNumber
                email: user.email,       // Include email
                userId: user._id.toString(), // Include userId
                userId2:decryptedIdNumber
            },
        }));

        // Return the updated response
        res.status(200).json({
            message: 'Tickets retrieved successfully',
            tickets: ticketsWithUserInfo,
        });
    } catch (error) {
        console.error('Error retrieving tickets:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};



//test just not used 
export const getTicketsByIdNumber = async (req, res) => {
    const { idNumber } = req.params; // Get the ID number from request parameters

    try {
        // Decrypt the provided ID number
        const decryptedIdNumber = decrypt(idNumber); // Use your decrypt function

        // Find the user by the decrypted IDNumber
        const user = await User.findOne({ idNumber: idNumber }); // Match against decrypted IDNumber
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch tickets associated with the user
        const tickets = await Ticket.find({ userId: user._id }); // Assuming userId is stored in the Ticket model

        if (tickets.length === 0) {
            return res.status(404).json({ message: 'No tickets found for this user' });
        }

        // Construct the response by adding user info to each ticket
        const ticketsWithUserInfo = tickets.map(ticket => ({
            ...ticket.toObject(), // Convert ticket to plain object
            user: {
                IDNumber:idNumber , // Include decrypted IDNumber
                email: user.email,           // Include email
                userId: user._id.toString(), // Include userId
                decrptionId:decryptedIdNumber
            },
        }));

        // Return the updated response
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

// update the ticket with new user 
// export const updateTicketIdNumber = async (req, res) => {
//     const { ticketId } = req.params; // Get ticket ID from request parameters
//     const { newIdNumber } = req.body; // Get new ID number from request body
//     // console.log("enter Id : "+newIdNumber);
 
//     try {
//         // Fetch the ticket to be updated
//         const ticket = await Ticket.findById(ticketId);
//         // console.log(ticket);
        
//         if (!ticket) {
//             return res.status(404).json({ message: 'Ticket not found' });
//         }

//         // Check if the ticket's updateStatus is 0
//         if (ticket.updateStatus !== 0) {
//             return res.status(403).json({ message: 'You are not allowed to update this ticket' });
//         }

//         // Fetch all users from the database
//         const users = await User.find();
//         let foundUser = null;

//         // Loop through users to find a match
//         for (let user of users) {
//             // console.log("encription "+user.idNumber);

//             let decryptedIDNumber = decrypt(user.idNumber); // Decrypt the ID number
//             // console.log("decryptedIDNumber"+decryptedIDNumber);
//             if (decryptedIDNumber === newIdNumber) {
//                 foundUser = user; // Store the found user
//                 break; // Exit loop once we find a match
//             }
//         }

//         // If no user found
//         if (!foundUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Update the ticket's userId and set updateStatus to 1
//         ticket.userId = foundUser._id;
//         ticket.updateStatus = 1; // Mark ticket as updated
//         ticket.idNumber=foundUser.idNumber;

//         // Generate a new unique code
//         const newUniqueCode = await generateUniqueCode(foundUser._id, ticket.eventId);
//         ticket.uniqueCode = newUniqueCode; // Assuming your Ticket model has a uniqueCode field

//         // Save the updated ticket
//         await ticket.save();

//         res.status(200).json({
//             message: 'Ticket updated successfully',
//             ticket: {
//                 ...ticket.toObject(),
//                 user: {
//                     IDNumber: newIdNumber, // Original ID number
//                     email: foundUser.email,
//                     userId: foundUser._id.toString(),
//                 },
//             },
//         });
//     } catch (error) {
//         console.error('Error updating ticket:', error);
//         res.status(500).json({ message: 'Error updating ticket', error });
//     }
// };

// Update ticket ID number function
// export const updateTicketIdNumber = async (req, res) => {
//     const { ticketId } = req.params; // Get ticket ID from request parameters
//     const { newIdNumber } = req.body; // New ID number
//     const { _id: userId, IDNumber, email } = req.user; // Extract user details


//     try {
//         // Fetch the ticket to be updated
//         const ticket = await Ticket.findById(ticketId);
//         if (!ticket) {
//             return res.status(404).json({ message: 'Ticket not found' });
//         }

//         // Check if the ticket's updateStatus is 0
//         if (ticket.updateStatus !== 0) {
//             return res.status(403).json({ message: 'You are not allowed to update this ticket' });
//         }

//         // Fetch user based on the newIdNumber
//         const users = await User.find();
//         let foundUser = null;

//         for (let user of users) {
//             let decryptedIDNumber = decrypt(user.idNumber); // Assume you have a decrypt function
//             if (decryptedIDNumber === newIdNumber) {
//                 foundUser = user; // Store the found user
//                 break; // Exit loop once we find a match
//             }
//         }

//         // If no user found
//         if (!foundUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Update the ticket's updateStatus to 1
//         ticket.updateStatus = 1; // Mark ticket as updated

//         // Generate a new unique code for the new ticket
//         const newUniqueCode = await generateUniqueCode(foundUser._id, ticket.eventId);

//         // Create a new ticket with the same information but a different userId
//         const newTicket = new Ticket({
//             eventId: ticket.eventId,
//             userId: foundUser._id, // New user ID
//             ticketType: ticket.ticketType,
//             quantity: ticket.quantity,
//             price: ticket.price,
//             visitDate: ticket.visitDate,
//             uniqueCode: newUniqueCode, // New unique code
//             updateStatus: 0, // New ticket status is not updated
//             purchaseDate: new Date(), // Set the current date
//         });

//         // Save the updated ticket and the new ticket
//         await ticket.save();
//         await newTicket.save();

//         res.status(200).json({
//             message: 'Ticket updated successfully and a new ticket created',
//             updatedTicket: ticket,
//             newTicket: {
//                 ...newTicket.toObject(),
//                 user: {
//                     IDNumber: foundUser.idNumber, // Include the original ID number
//                     email: foundUser.email,
//                     userId: foundUser._id.toString(),
//                 },
//             },
//         });
//     } catch (error) {
//         console.error('Error updating ticket:', error);
//         res.status(500).json({ message: 'Error updating ticket', error });
//     }
// };

export const updateTicketIdNumber = async (req, res) => {
    const { ticketId } = req.params; // Get ticket ID from request parameters
    const { newIdNumber } = req.body; // New ID number
    // const { _id: userId, IDNumber, email } = req.user; // Extract user details from the token

    try {
        // Fetch the ticket to be updated
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // Check if the ticket's updateStatus is 0
        if (ticket.updateStatus !== 0) {
            return res.status(403).json({ message: 'You are not allowed to update this ticket' });
        }

        // Check if the new ID number matches the authenticated user
        let decryptedIDNumber = decrypt(IDNumber); // Decrypt the user's ID number from the token
        if (decryptedIDNumber !== newIdNumber) {
            return res.status(403).json({ message: 'You are not allowed to update this ticket with a different ID number' });
        }

        // Update the ticket's updateStatus to 1
        ticket.updateStatus = 1; // Mark ticket as updated

        // Generate a new unique code for the new ticket
        const newUniqueCode = await generateUniqueCode(userId, ticket.eventId);

        // Create a new ticket with the same information but a different userId
        const newTicket = new Ticket({
            eventId: ticket.eventId,
            userId: userId, // Use the user ID from the token
            ticketType: ticket.ticketType,
            quantity: ticket.quantity,
            price: ticket.price,
            visitDate: ticket.visitDate,
            uniqueCode: newUniqueCode, // New unique code
            updateStatus: 0, // New ticket status is not updated
            purchaseDate: new Date(), // Set the current date
        });

        // Save the updated ticket and the new ticket
        await ticket.save();
        await newTicket.save();

        res.status(200).json({
            message: 'Ticket updated successfully and a new ticket created',
            updatedTicket: ticket,
            newTicket: {
                ...newTicket.toObject(),
                user: {
                    IDNumber: newIdNumber
                    //, // Include the user's ID number
                    // email: email,
                    // userId: userId,
                },
            },
        });
    } catch (error) {
        console.error('Error updating ticket:', error);
        res.status(500).json({ message: 'Error updating ticket', error });
    }
};



//get ticket by id of ticket 
export const getticketbyID = async (req, res) => {
    const { ticketId } = req.params; // Get the ticket ID from request parameters
    console.log(ticketId);

    try {
        // Find the ticket by its ID
        const ticket = await Ticket.findById(ticketId).populate('eventId'); // Populate eventId if needed

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
    const { uniqueCode } = req.params; // Get the unique code from request parameters

    try {
        // Find the ticket by unique code
        const ticket = await Ticket.findOne({ uniqueCode }).populate('eventId'); // Populate eventId if needed

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.status(200).json({
            message: 'Ticket retrieved successfully',
            ticket: {
                ...ticket.toObject(),
                user: {
                    // IDNumber: user.userId.idNumber, // Assuming userId has an idNumber field
                    // email: ticket.userId.email,
                    userId: ticket.userId._id.toString(),
                },
            },
        });
    } catch (error) {
        console.error('Error retrieving ticket:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};






