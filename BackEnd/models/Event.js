import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true, // Assuming you're storing the image URL
    },
    location: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt timestamps
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
