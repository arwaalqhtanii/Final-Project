import React, { useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';
import BookingModal from './BookingModal';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    if (!event || !event.image) {
        return <p className="text-red-500 text-center">No data available for this event</p>;
    }

    const handleBookNow = () => {
        const token = localStorage.getItem('token'); 
        if (!token) {
            navigate('/loginw'); 
            return;
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="relative group bg-white shadow-md rounded-lg overflow-hidden flex flex-col w-74 h-64">
            <img src={event.image} alt={event.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-purple-800 bg-opacity-80 text-white flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4 text-left">
                <h3 className="text-2xl font-bold mb-2">{event.name}</h3>

                <div className="flex items-center justify-start mb-2">
                    <FaMapMarkerAlt className="mr-1" />
                    <p className="text-lg">{event.location}</p>
                </div>


                <div className="flex items-center justify-start mb-2">
                    <FaCalendarAlt className="mr-1" />
                    <p className="text-lg">{event.startDate} - {event.endDate}</p>
                </div>


                <div className="flex items-center justify-start mb-4">
                    <FaClock className="mr-1" />
                    <p className="text-lg">{event.Time}</p>
                </div>

                <button
                    className="bg-white text-purple-800 py-2 px-4 rounded-full border-2 border-purple-800 hover:bg-purple-200 hover:text-purple-800 transition duration-300"
                    onClick={handleBookNow}
                >
                    Book Now
                </button>
            </div>

            <div className="absolute top-1/2 -left-4 w-8 h-8 bg-gray-100 rounded-full   transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 -right-4 w-8 h-8 bg-gray-100 rounded-full   transform -translate-y-1/2"></div>

            {isModalOpen && <BookingModal isOpen={isModalOpen} onClose={closeModal} event={event} />}
        </div>
    );
};

export default EventCard;