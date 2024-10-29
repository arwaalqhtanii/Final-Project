import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    location: { type: String, required: true },
    googleMapLink: String, 
    Latitude: { type: Number }, 
    Longitude: { type: Number }, 
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    Time: { type: String, required: true }, 
    details: { type: String, required: true },
    totalTickets: { type: Number, required: true }, 
    totalTicketsGold: { type: Number, required: true }, 
    totalTicketsSilver: { type: Number, required: true }, 
    totalTicketsStandard: { type: Number, required: true }, 
    totalTicketsSold: {
        gold: { type: Number, default: 0 },
        silver: { type: Number, default: 0 },
        standard: { type: Number, default: 0 }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Event = mongoose.model('Event', EventSchema);

export default Event;
