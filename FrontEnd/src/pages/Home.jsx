
import { useState, useEffect } from 'react';
import Slider from './Slider';
import SearchBar from './SearchBar';
import EventsGrid from './EventsGrid';
import HowToBook from './HowToBook';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Elements } from '@stripe/react-stripe-js'; 
import { loadStripe } from '@stripe/stripe-js'; // استيراد loadStripe

// تحميل مفتاح Stripe الخاص بك
const stripePromise = loadStripe('pk_test_51QCyiNFjwRhkW7KwJEkXQOsCQEU2GDFji43vyUInNGrJr2l6QIk0wpStec41VtJKOLZwnbyOr3Q8mB5uSLp86z9n00veLycNjH');

const EventsPage = () => {
    const [eventsData, setEventsData] = useState([]); // To store fetched events
    const [filteredEvents, setFilteredEvents] = useState(eventsData.slice(0, 8)); // عرض 8 فعاليات في البداية
    const [visibleCount, setVisibleCount] = useState(8); // عدد الفعاليات المعروضة

    // Fetch events data from the API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:8050/event/allevents');
                const data = await response.json();
                console.log(data);

                setEventsData(data); // Update the events data state
                setFilteredEvents(data.slice(0, visibleCount)); // Initialize filtered events
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []); // Empty dependency array to run once on mount

    // دالة البحث
    const handleSearch = (searchTerm) => {
        if (searchTerm === '') {
            setFilteredEvents(eventsData.slice(0, visibleCount));
        } else {
            const filtered = eventsData.filter(event =>
                event.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredEvents(filtered.slice(0, visibleCount));
        }
    };

    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 8);
        setFilteredEvents(eventsData.slice(0, visibleCount + 8));
    };

    return (
        <div>
            <Navbar />
            <Slider />
            <SearchBar onSearch={handleSearch} />
            <Elements stripe={stripePromise}>
                <EventsGrid events={filteredEvents} />
            </Elements>
            {visibleCount < eventsData.length && (
                <div className="text-center mt-6">
                    <button
                        onClick={handleShowMore}
                        className="bg-[#78006e] hover:bg-[#be008d] text-white py-3 px-6 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out"
                    >
                        Show More
                    </button>
                </div>
            )}
            <HowToBook />
            <Footer />
        </div>
    );
};

export default EventsPage;
