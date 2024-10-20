

import { useState } from 'react';
import Slider from './Slider';
import SearchBar from './SearchBar';
import EventsGrid from './EventsGrid';
import HowToBook from './HowToBook';


const eventsData = [
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
                id: 2,
                image: 'https://scth.scene7.com/is/image/scth/battle-of-the-giants:crop-600x600?defaultImage=battle-of-the-giants&wid=390&hei=390',
                name: 'معركة العمالقة',
                location: 'الرياض',
                price: '200 ريال',
                startDate: '19 أكتوبر 2024',
                endDate: '19 أكتوبر 2024',
            },
            {
                id: 2,
                image: 'https://scth.scene7.com/is/image/scth/martinlaweance-show-event-1:crop-600x600?defaultImage=martinlaweance-show-event-1&wid=390&hei=390',
                name: 'معركة العمالقة',
                location: 'الرياض',
                price: '200 ريال',
                startDate: '19 أكتوبر 2024',
                endDate: '19 أكتوبر 2024',
            },
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
                id: 3,
                image: 'https://scth.scene7.com/is/image/scth/martinlaweance-show-event-1:crop-600x600?defaultImage=martinlaweance-show-event-1&wid=390&hei=390',
                name: 'مهرجان الموسيقى',
                location: 'جدة',
                price: '250 ريال',
                startDate: '21 نوفمبر 2024',
                endDate: '22 نوفمبر 2024',
            },
            {
                id: 2,
                image: 'https://scth.scene7.com/is/image/scth/martinlaweance-show-event-1:crop-600x600?defaultImage=martinlaweance-show-event-1&wid=390&hei=390',
                name: 'معركة العمالقة',
                location: 'الرياض',
                price: '200 ريال',
                startDate: '19 أكتوبر 2024',
                endDate: '19 أكتوبر 2024',
            },
];

const EventsPage = () => {
    const [filteredEvents, setFilteredEvents] = useState(eventsData); 


    const handleSearch = (searchTerm) => {
        if (searchTerm === '') {
            setFilteredEvents(eventsData); 
        } else {
            const filtered = eventsData.filter(event =>
                event.name.toLowerCase().includes(searchTerm.toLowerCase()) 
            );
            setFilteredEvents(filtered); 
        }
    };

    return (
        <div>
           
            <Slider />

            
            <SearchBar onSearch={handleSearch} />

            
            <EventsGrid events={filteredEvents} />

           
            <HowToBook />
        </div>
    );
};

export default EventsPage;
