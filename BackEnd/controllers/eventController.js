import Event from '../models/Event.js'; 
import mongoose from 'mongoose';


//post the event 
export const createEvent = async (req, res) => {
    console.log(req.body);
    const { 
        name, 
        image, 
        location, 
        googleMapLink,
        Latitude,
        Longitude,
        startDate, 
        endDate, 
        Time, 
        details, 
        totalTickets, 
        totalTicketsGold, 
        totalTicketsSilver, 
        totalTicketsStandard 
    } = req.body;

    try {
        const event = new Event({
            name,
            image,
            location,
            googleMapLink,
            Latitude,
            Longitude,
            startDate,
            endDate,
            Time, 
            details,
            totalTickets,
            totalTicketsGold, 
            totalTicketsSilver, 
            totalTicketsStandard, 
            totalTicketsSold: { gold: 0, silver: 0, standard: 0 }
        });

        await event.save();

        res.status(201).json({
            message: 'Event created successfully',
            event
        });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Server error' });
    }
};




//get all events
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();

        // Function to format date to dd/mm/yyyy
        const formatResponseDate = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        };

        // Map over events to format the dates
        const formattedEvents = events.map(event => ({
            ...event.toObject(),
            startDate: formatResponseDate(event.startDate),
            endDate: formatResponseDate(event.endDate),
        }));

        res.status(200).json(formattedEvents);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Server error' });
    }
};





//delete by id event
export const deleteEvent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }
    try {
        const event = await Event.findByIdAndDelete(id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ message: 'Server error' });
    }
};




//update the number of gold-silver -standard 
export const updateEvent = async (req, res) => {
    const eventId = req.params.eventId;
    const {
        name,
        image,
        location,
        details,
        totalTicketsGold,
        totalTicketsSilver,
        totalTicketsStandard,
        googleMapLink,
        Time,
        Latitude,
        Longitude,
    } = req.body;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Update event fields
        if (name) event.name = name;
        if (image) event.image = image;
        if (location) event.location = location;
        if (details) event.details = details;
        if (googleMapLink) event.googleMapLink = googleMapLink;
        if (Time) event.Time = Time;
        if (Latitude !== undefined) event.Latitude = Latitude;
        if (Longitude !== undefined) event.Longitude = Longitude;

        // Update total tickets for each type and calculate the overall total
        if (totalTicketsGold !== undefined) event.totalTicketsGold = totalTicketsGold;
        if (totalTicketsSilver !== undefined) event.totalTicketsSilver = totalTicketsSilver;
        if (totalTicketsStandard !== undefined) event.totalTicketsStandard = totalTicketsStandard;
        event.totalTickets = (totalTicketsGold || 0) + (totalTicketsSilver || 0) + (totalTicketsStandard || 0);

        await event.save();
        res.status(200).json({ message: 'Event updated successfully', event });
    } catch (error) {
        console.error('Error updating event:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};


