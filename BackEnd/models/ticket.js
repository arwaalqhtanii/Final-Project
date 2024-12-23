import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ticketType: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    totalPrice: { type: Number},
    visitDate: { type: Date, required: true },
    uniqueCode: { type: String, required: true },
    purchaseDate: { type: Date, default: Date.now },
    updateStatus: { type: Number, default: 0 } ,
    isPending:{type:Boolean ,default:false},
   
});


const Ticket = mongoose.model('Ticket', TicketSchema);

export default Ticket;
