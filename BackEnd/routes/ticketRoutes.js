import express from 'express';
import {purchaseTicket,getTicketCountsByDate,getUserTickets,getTicketsByIdNumber,updateTicketIdNumber,getticketbyID, TicketfindbyCode,createPaymentIntent,getUserTicketsupdatestatus} from '../controllers/ticketController.js';
import { authenticateToken } from '../middleware/authMiddleware.js'; // Check the path and export name


const router = express.Router();

// Create a new ticket
router.post('/addTicket/:eventId/purchase', authenticateToken, purchaseTicket);

// Route to get ticket counts by date
router.get('/event/:eventId/ticket-counts', getTicketCountsByDate);

//get all user Ticket
router.get('/Usertickets', authenticateToken, getUserTickets);

//get user ticket depends on the IDNumber 
router.get('/ticketsUserId/:idNumber', authenticateToken, getTicketsByIdNumber);


//get user ticket by the update status
router.get('/ticketsUserstatus/:updateStatus', authenticateToken, getUserTicketsupdatestatus);

///update ticket
router.put('/tickets/update/:ticketId', authenticateToken, updateTicketIdNumber);


//GeT ticket bt id of ticket 
router.get('/tickets/id/:ticketId',getticketbyID);

//TicketfindbyCode
router.get('/tickets/unique-code/:uniqueCode', TicketfindbyCode);


//payment Method
router.post('/create-payment-intent', createPaymentIntent);

// Get all tickets for an event
// router.get('/:eventId', getAllTickets);

// Delete a ticket by ID
// router.delete('/:id', deleteTicket);

export default router;
