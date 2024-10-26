import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTicketAlt } from 'react-icons/fa';

const Slider = ({ searchBarRef }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const images = [


        //         'https://cdn.pixabay.com/photo/2017/04/03/04/48/riyadh-2197496_1280.jpg',  
        //         'https://cdn.pixabay.com/photo/2018/05/10/11/34/concert-3387324_1280.jpg',
        //         'https://cdn.pixabay.com/photo/2023/08/11/04/51/fireworks-8182800_1280.jpg',
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
        <div className="">
            <div className="relative h-full overflow-hidden">
                <div className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {images.map((image, index) => (
                        <div key={index} className="min-w-full h-screen">
                            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>

                <button onClick={prevSlide} className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
                    &#10094;
                </button>

                <button onClick={nextSlide} className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
                    &#10095;
                </button>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10">
                <h1 className="text-5xl mb-4">Discover the Magic of Riyadh Season</h1>
                <br />
                <p className="text-s mb-6">Experience an unforgettable journey in the heart of the capital. Book your ticket now and get ready for days filled with <br /> entertainment events and amazing shows waiting for you.</p>
                <br />
                <button
                    className="px-8 py-4 flex items-center gap-2 bg-gradient-to-r from-[#9b27b0] to-[#ff4081] text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out animate-fade-in-up delay-300"
                    onClick={handleCheckTicketClick}
                >
                    Book Now <FaTicketAlt />
                </button>
                <p className="absolute bottom-8 text-sm">
                    Don't miss the chance to be part of this grand event that brings together fun, art, and culture in one season.
                </p>
            </div>

            
            <div className="absolute inset-0 bg-black opacity-70"></div>
        </div>

    );
};

export default Slider;
