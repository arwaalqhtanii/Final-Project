
import { useState } from 'react';
import Slider from './Slider';
import SearchBar from './SearchBar';
import EventsGrid from './EventsGrid';
import HowToBook from './HowToBook';

const eventsData = [
    // بيانات الفعاليات
    {
        id: 1,
        image: 'https://scth.scene7.com/is/image/scth/beast-house-1:crop-600x600?defaultImage=beast-house-1&wid=390&hei=390',
        name: 'بيست هاوس',
        location: 'الرياض',
        price: '140 ريال',
        startDate: '17 أكتوبر 2024',
        endDate: '18 أكتوبر 2024',
    },
    {
        id: 2,
        image: 'https://scth.scene7.com/is/image/scth/battle-of-the-giants:crop-600x600?defaultImage=battle-of-the-giants&wid=390&hei=390',
        name: 'معركة العمالقة',
        location: 'الرياض',
        price: '200 ريال',
        startDate: '19 أكتوبر 2024',
        endDate: '19 أكتوبر 2024',
    },
    {
        id: 3,
        image: 'https://scth.scene7.com/is/image/scth/martinlaweance-show-event-1:crop-600x600?defaultImage=martinlaweance-show-event-1&wid=390&hei=390',
        name: 'مهرجان الموسيقى',
        location: 'جدة',
        price: '250 ريال',
        startDate: '21 نوفمبر 2024',
        endDate: '22 نوفمبر 2024',
    },
    {
        id: 4,
        image: 'https://scth.scene7.com/is/image/scth/battle-of-the-giants:crop-600x600?defaultImage=battle-of-the-giants&wid=390&hei=390',
        name: 'معركة العمالقة',
        location: 'الرياض',
        price: '200 ريال',
        startDate: '19 أكتوبر 2024',
        endDate: '19 أكتوبر 2024',
    },
    {
        id: 5,
        image: 'https://scth.scene7.com/is/image/scth/martinlaweance-show-event-1:crop-600x600?defaultImage=martinlaweance-show-event-1&wid=390&hei=390',
        name: 'مهرجان الموسيقى',
        location: 'جدة',
        price: '250 ريال',
        startDate: '21 نوفمبر 2024',
        endDate: '22 نوفمبر 2024',
    },
    {
        id: 6,
        image: 'https://scth.scene7.com/is/image/scth/beast-house-1:crop-600x600?defaultImage=beast-house-1&wid=390&hei=390',
        name: 'بيست هاوس',
        location: 'الرياض',
        price: '140 ريال',
        startDate: '17 أكتوبر 2024',
        endDate: '18 أكتوبر 2024',
    },
    {
        id: 7,
        image: 'https://scth.scene7.com/is/image/scth/martinlaweance-show-event-1:crop-600x600?defaultImage=martinlaweance-show-event-1&wid=390&hei=390',
        name: 'مهرجان الموسيقى',
        location: 'جدة',
        price: '250 ريال',
        startDate: '21 نوفمبر 2024',
        endDate: '22 نوفمبر 2024',
    },
    {
        id: 8,
        image: 'https://scth.scene7.com/is/image/scth/martinlaweance-show-event-1:crop-600x600?defaultImage=martinlaweance-show-event-1&wid=390&hei=390',
        name: 'معركة العمالقة',
        location: 'الرياض',
        price: '200 ريال',
        startDate: '19 أكتوبر 2024',
        endDate: '19 أكتوبر 2024',
    },
    {
        id: 9,
        image: 'https://scth.scene7.com/is/image/scth/martinlaweance-show-event-1:crop-600x600?defaultImage=martinlaweance-show-event-1&wid=390&hei=390',
        name: 'معركة العمالقة',
        location: 'الرياض',
        price: '200 ريال',
        startDate: '19 أكتوبر 2024',
        endDate: '19 أكتوبر 2024',
    },
    {
        id: 9,
        image: 'https://scth.scene7.com/is/image/scth/martinlaweance-show-event-1:crop-600x600?defaultImage=martinlaweance-show-event-1&wid=390&hei=390',
        name: 'معركة العمالقة',
        location: 'الرياض',
        price: '200 ريال',
        startDate: '19 أكتوبر 2024',
        endDate: '19 أكتوبر 2024',
    },
    {
        id: 9,
        image: 'https://scth.scene7.com/is/image/scth/martinlaweance-show-event-1:crop-600x600?defaultImage=martinlaweance-show-event-1&wid=390&hei=390',
        name: 'معركة العمالقة',
        location: 'الرياض',
        price: '200 ريال',
        startDate: '19 أكتوبر 2024',
        endDate: '19 أكتوبر 2024',
    },
    {
        id: 9,
        image: 'https://scth.scene7.com/is/image/scth/martinlaweance-show-event-1:crop-600x600?defaultImage=martinlaweance-show-event-1&wid=390&hei=390',
        name: 'معركة العمالقة',
        location: 'الرياض',
        price: '200 ريال',
        startDate: '19 أكتوبر 2024',
        endDate: '19 أكتوبر 2024',
    },
];

const EventsPage = () => {
    const [filteredEvents, setFilteredEvents] = useState(eventsData.slice(0, 8)); // عرض 8 فعاليات في البداية
    const [visibleCount, setVisibleCount] = useState(8); // عدد الفعاليات المعروضة

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
            <Slider />

            <SearchBar onSearch={handleSearch} />

            <EventsGrid events={filteredEvents} />

            {/* زر المزيد */}
            {visibleCount < eventsData.length && (
                <div className="text-center mt-6">
                    <button
                        onClick={handleShowMore}
                        className="bg-purple-700 text-white py-2 px-4 rounded-full hover:bg-purple-800 transition duration-300"
                    >
                        عرض المزيد
                    </button>
                </div>
            )}

            <HowToBook />
        </div>
    );
};

export default EventsPage;
