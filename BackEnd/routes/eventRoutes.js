import express from 'express';
import { createEvent,getAllEvents,deleteEvent } from '../controllers/eventController.js'; // Adjust the import path

const router = express.Router();

//post event 
router.post('/events', createEvent);

// Define the GET endpoint
router.get('/allevents', getAllEvents);

//delete event 
router.delete('/deleteevent/:id', deleteEvent); // Route to delete an event by ID


export default router;
