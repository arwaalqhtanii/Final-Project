import Event from '../models/Event.js'; // Adjust the import path

//post the event 
export const createEvent = async (req, res) => {
    const { name, image, location, startDate, endDate, details, totalTickets } = req.body;

    try {
        const event = new Event({
            name,
            image,
            location,
            startDate,
            endDate,
            details,
            totalTickets, // Set totalTickets here
            totalTicketsSold: { gold: 0, silver: 0, standard: 0 } // Initialize sold tickets
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
        const events = await Event.find(); // Fetch all events from the database

        // Function to format date to dd/mm/yyyy
        const formatResponseDate = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        };

        // Map over events to format the dates
        const formattedEvents = events.map(event => ({
            ...event.toObject(),
            startDate: formatResponseDate(event.startDate),
            endDate: formatResponseDate(event.endDate),
        }));

        res.status(200).json(formattedEvents); // Send the formatted events as a JSON response
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


//delete by id event
export const deleteEvent = async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters

    try {
        const event = await Event.findByIdAndDelete(id); // Find and delete the event

        if (!event) {
            return res.status(404).json({ message: 'Event not found' }); // Event not found
        }

        res.status(200).json({ message: 'Event deleted successfully' }); // Successful deletion
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ message: 'Server error' }); // Server error
    }
};


//update  the event to take the number of axceed (peoole in day )
// export const updateEvent = async (req, res) => {
//     const eventId = req.params.eventId;
//     const { totalTickets } = req.body;

//     try {
//         const event = await Event.findById(eventId);
//         if (!event) {
//             return res.status(404).json({ message: 'Event not found' });
//         }

//         // Update the totalTickets field
//         event.totalTickets = totalTickets;
//         await event.save();

//         res.status(200).json({ message: 'Event updated successfully', event });
//     } catch (error) {
//         console.error('Error updating event:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

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


        // Update total tickets for each type and calculate the overall total
        if (totalTicketsGold !== undefined) event.totalTicketsGold = totalTicketsGold;
        if (totalTicketsSilver !== undefined) event.totalTicketsSilver = totalTicketsSilver;
        if (totalTicketsStandard !== undefined) event.totalTicketsStandard = totalTicketsStandard;
        event.totalTickets = (totalTicketsGold || 0) + (totalTicketsSilver || 0) + (totalTicketsStandard || 0);

        await event.save();

        res.status(200).json({ message: 'Event updated successfully', event });
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

