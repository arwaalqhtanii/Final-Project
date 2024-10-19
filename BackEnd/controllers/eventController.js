import Event from '../models/Event.js'; // Adjust the import path

//post the event 
export const createEvent = async (req, res) => {
    const { name, image, location, googleMapsLink, startDate, endDate, details } = req.body;

    try {
        // Validate input
        if (!name || !image || !location || !googleMapsLink || !startDate || !endDate || !details) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Format dates from dd/mm/yyyy to ISO format
        const formatDate = (dateStr) => {
            const [day, month, year] = dateStr.split('/');
            return new Date(`${year}-${month}-${day}T00:00:00Z`); // Adjust time as needed
        };

        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);

        // Check if the start date is before the end date
        if (formattedStartDate >= formattedEndDate) {
            return res.status(400).json({ message: 'Start date must be before end date' });
        }

        // Create a new event
        const newEvent = new Event({
            name,
            image,
            location,
            googleMapsLink,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            details,
        });

        await newEvent.save();

        // Format the dates for the response
        const formatResponseDate = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        };

        res.status(201).json({
            message: 'Event created successfully',
            event: {
                ...newEvent.toObject(),
                startDate: formatResponseDate(formattedStartDate),
                endDate: formatResponseDate(formattedEndDate),
            },
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