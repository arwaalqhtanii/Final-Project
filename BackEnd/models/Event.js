import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    location: { type: String, required: true },
    googleMapLink: String, 
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    Time: { type: String, required: true }, // Time in HH:mm format
    details: { type: String, required: true },
    totalTickets: { type: Number, required: true }, // Total tickets available
    totalTicketsGold: { type: Number, required: true }, // Total gold tickets
    totalTicketsSilver: { type: Number, required: true }, // Total silver tickets
    totalTicketsStandard: { type: Number, required: true }, // Total standard tickets
    totalTicketsSold: {
        gold: { type: Number, default: 0 },
        silver: { type: Number, default: 0 },
        standard: { type: Number, default: 0 }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', EventSchema);

export default Event;
