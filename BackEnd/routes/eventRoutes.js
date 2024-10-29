import express from 'express';
import { createEvent,getAllEvents,deleteEvent,updateEvent } from '../controllers/eventController.js'; 

const router = express.Router();

//post event 
router.post('/events', createEvent);

// Define the GET endpoint
router.get('/allevents', getAllEvents);

//delete event 
router.delete('/deleteevent/:id', deleteEvent); 

//updateEvent 
router.put('/update/:eventId', updateEvent);



export default router;
