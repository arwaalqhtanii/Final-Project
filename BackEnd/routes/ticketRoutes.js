import express from 'express';
import {purchaseTicket,getTicketCountsByDate,getUserTickets} from '../controllers/ticketController.js';
import { authenticateToken } from '../middleware/authMiddleware.js'; // Check the path and export name


const router = express.Router();

// Create a new ticket
router.post('/addTicket/:eventId/purchase', authenticateToken, purchaseTicket);

// Route to get ticket counts by date
router.get('/event/:eventId/ticket-counts', getTicketCountsByDate);

//get all user Ticket
router.get('/Usertickets', authenticateToken, getUserTickets);



// Get all tickets for an event
// router.get('/:eventId', getAllTickets);

// Delete a ticket by ID
// router.delete('/:id', deleteTicket);

export default router;
