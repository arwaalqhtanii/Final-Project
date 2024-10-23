
import { useState,useEffect } from 'react';
import Slider from './Slider';
import SearchBar from './SearchBar';
import EventsGrid from './EventsGrid';
import HowToBook from './HowToBook';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


//     // بيانات الفعاليات
//     {
//         id: 1,
//         image: 'https://scth.scene7.com/is/image/scth/beast-house-1:crop-600x600?defaultImage=beast-house-1&wid=390&hei=390',
//         name: 'بيست هاوس',
//         location: 'الرياض',
//         price: '140 ريال',
//         startDate: '17 أكتوبر 2024',
//         endDate: '18 أكتوبر 2024',
//     },
//     {
//         id: 2,
//         image: 'https://scth.scene7.com/is/image/scth/battle-of-the-giants:crop-600x600?defaultImage=battle-of-the-giants&wid=390&hei=390',
//         name: 'معركة العمالقة',
//         location: 'الرياض',
//         price: '200 ريال',
//         startDate: '19 أكتوبر 2024',
//         endDate: '19 أكتوبر 2024',
//     },
//     {
//         id: 3,
//         image: 'https://scth.scene7.com/is/image/scth/martinlaweance-show-event-1:crop-600x600?defaultImage=martinlaweance-show-event-1&wid=390&hei=390',
//         name: 'مهرجان الموسيقى',
//         location: 'جدة',
//         price: '250 ريال',
//         startDate: '21 نوفمبر 2024',
//         endDate: '22 نوفمبر 2024',
//     },
//     {
//         id: 4,
//         image: 'https://scth.scene7.com/is/image/scth/battle-of-the-giants:crop-600x600?defaultImage=battle-of-the-giants&wid=390&hei=390',
//         name: 'معركة العمالقة',
//         location: 'الرياض',
//         price: '200 ريال',
//         startDate: '19 أكتوبر 2024',
//         endDate: '19 أكتوبر 2024',
//     },
//     {
//         id: 5,
//         image: 'https://scth.scene7.com/is/image/scth/martinlaweance-show-event-1:crop-600x600?defaultImage=martinlaweance-show-event-1&wid=390&hei=390',
//         name: 'مهرجان الموسيقى',
//         location: 'جدة',
//         price: '250 ريال',
//         startDate: '21 نوفمبر 2024',
//         endDate: '22 نوفمبر 2024',
//     },
//     {
//         id: 6,
//         image: 'https://scth.scene7.com/is/image/scth/beast-house-1:crop-600x600?defaultImage=beast-house-1&wid=390&hei=390',
//         name: 'بيست هاوس',
//         location: 'الرياض',
//         price: '140 ريال',
//         startDate: '17 أكتوبر 2024',
//         endDate: '18 أكتوبر 2024',
//     },
//     {
//         id: 7,
//         image: 'https://scth.scene7.com/is/image/scth/martinlaweance-show-event-1:crop-600x600?defaultImage=martinlaweance-show-event-1&wid=390&hei=390',
//         name: 'مهرجان الموسيقى',
//         location: 'جدة',
//         price: '250 ريال',
//         startDate: '21 نوفمبر 2024',
//         endDate: '22 نوفمبر 2024',
//     },
//     {
//         id: 8,
//         image: 'https://scth.scene7.com/is/image/scth/martinlaweance-show-event-1:crop-600x600?defaultImage=martinlaweance-show-event-1&wid=390&hei=390',
//         name: 'معركة العمالقة',
//         location: 'الرياض',
//         price: '200 ريال',
//         startDate: '19 أكتوبر 2024',
//         endDate: '19 أكتوبر 2024',
//     },
//     {
//         id: 9,
//         image: 'https://scth.scene7.com/is/image/scth/martinlaweance-show-event-1:crop-600x600?defaultImage=martinlaweance-show-event-1&wid=390&hei=390',
//         name: 'معركة العمالقة',
//         location: 'الرياض',
//         price: '200 ريال',
//         startDate: '19 أكتوبر 2024',
//         endDate: '19 أكتوبر 2024',
//     },
//     {
//         id: 9,
//         image: 'https://scth.scene7.com/is/image/scth/martinlaweance-show-event-1:crop-600x600?defaultImage=martinlaweance-show-event-1&wid=390&hei=390',
//         name: 'معركة العمالقة',
//         location: 'الرياض',
//         price: '200 ريال',
//         startDate: '19 أكتوبر 2024',
//         endDate: '19 أكتوبر 2024',
//     },
//     {
//         id: 9,
//         image: 'https://scth.scene7.com/is/image/scth/martinlaweance-show-event-1:crop-600x600?defaultImage=martinlaweance-show-event-1&wid=390&hei=390',
//         name: 'معركة العمالقة',
//         location: 'الرياض',
//         price: '200 ريال',
//         startDate: '19 أكتوبر 2024',
//         endDate: '19 أكتوبر 2024',
//     },
//     {
//         id: 9,
//         image: 'https://scth.scene7.com/is/image/scth/martinlaweance-show-event-1:crop-600x600?defaultImage=martinlaweance-show-event-1&wid=390&hei=390',
//         name: 'معركة العمالقة',
//         location: 'الرياض',
//         price: '200 ريال',
//         startDate: '19 أكتوبر 2024',
//         endDate: '19 أكتوبر 2024',
//     },
// ];

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
        <div className=''>
            <Navbar/>
            <Slider />

            <SearchBar onSearch={handleSearch} />

            <EventsGrid events={filteredEvents} />

            {/* زر المزيد */}
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
            <Footer/>
        </div>
    );
};

export default EventsPage;
