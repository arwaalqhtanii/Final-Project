
import { useState, useEffect, useRef } from 'react';
import Slider from './Slider';
import SearchBar from './SearchBar';
import EventsGrid from './EventsGrid';
import HowToBook from './HowToBook';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QCyiNFjwRhkW7KwJEkXQOsCQEU2GDFji43vyUInNGrJr2l6QIk0wpStec41VtJKOLZwnbyOr3Q8mB5uSLp86z9n00veLycNjH');

const EventsPage = () => {
    const [eventsData, setEventsData] = useState([]); 
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [visibleCount, setVisibleCount] = useState(8);
    const searchBarRef = useRef(null); 

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:8050/event/allevents');
                const data = await response.json();
                console.log(data);

                setEventsData(data); 
                setFilteredEvents(data.slice(0, visibleCount)); 
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, [visibleCount]); 

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

    const handleScrollToSearchBar = () => {
        if (searchBarRef && searchBarRef.current) {
            searchBarRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <Navbar />
            <Slider searchBarRef={searchBarRef} /> 
            <div ref={searchBarRef}>
                <SearchBar onSearch={handleSearch} />
            </div>
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
