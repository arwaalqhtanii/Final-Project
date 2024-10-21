
import { FaMapMarkerAlt } from 'react-icons/fa';

const EventCard = ({ event }) => {
    if (!event || !event.image) {
        return <p className="text-red-500">لا توجد بيانات لهذه الفعالية</p>;
    }

    return (
        <div className="relative group bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-[50vh]">
            <img src={event.image} alt={event.name} className="w-full h-full   transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-purple-800 bg-opacity-80 text-white flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4 text-right">
                <h3 className="text-3xl font-bold mb-2">{event.name}</h3>
                <div className="flex items-center justify-end mb-2">
                    <FaMapMarkerAlt className="ml-1" />
                    <p className="text-xl">{event.location}</p>
                </div>
                <p className="text-gray-300 font-semibold mb-4">التاريخ: {event.startDate} - {event.endDate}</p>
                <button className="bg-white text-purple-800 py-2 px-4 rounded-full border-2 border-purple-800 hover:bg-purple-200 hover:text-white transition duration-300">
                    احجز الآن
                </button>
            </div>
        </div>
    );
};

export default EventCard;
