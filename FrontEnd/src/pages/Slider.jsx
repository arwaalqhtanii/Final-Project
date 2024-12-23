import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTicketAlt } from 'react-icons/fa';
import Typewriter from 'react-typewriter-effect';

const Slider = ({ searchBarRef }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const images = [
        'https://cdn.pixabay.com/photo/2017/04/03/04/48/riyadh-2197496_1280.jpg',
        'https://cdn.pixabay.com/photo/2018/05/10/11/34/concert-3387324_1280.jpg',
        'https://cdn.pixabay.com/photo/2023/08/11/04/51/fireworks-8182800_1280.jpg',
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 3000);
        return () => clearInterval(slideInterval);
    }, []);

    const handleCheckTicketClick = () => {
        if (searchBarRef && searchBarRef.current) {
            searchBarRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative w-full h-screen">
            <div className="relative h-full overflow-hidden">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <div key={index} className="min-w-full h-screen">
                            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>

                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                    &#10094;
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                    &#10095;
                </button>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 p-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">Discover the Magic of Riyadh Season</h1>
                <Typewriter
                    text="Experience an unforgettable journey in the heart of the capital. Book your ticket now and get ready for days filled with entertainment events."
                    cursorColor="#fff"
                    textStyle={{
                        fontSize: '14px',
                        color: '#fff',
                    }}
                    typeSpeed={50}
                    startDelay={500}
                />
                <div className="mt-16">
                    <button
                        className="px-6 py-3 md:px-8 md:py-4 flex items-center gap-2 bg-gradient-to-r from-[#9b27b0] to-[#ff4081] text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out"
                        onClick={handleCheckTicketClick}
                    >
                        Book Now <FaTicketAlt />
                    </button>
                </div>
                <p className="absolute bottom-4 text-xs sm:text-sm md:text-base px-4">
                    Don't miss the chance to be part of this grand event that brings together fun, art, and culture in one season.
                </p>
            </div>

            <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
    );
};

export default Slider;