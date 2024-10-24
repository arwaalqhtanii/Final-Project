
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // استيراد useNavigate

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate(); // استخدام useNavigate

    const images = [
        'https://i.pinimg.com/736x/cf/fe/cf/cffecf7ee5420bec5e123256036970f8.jpg',  
        'https://i.pinimg.com/474x/c1/b6/86/c1b6864254ddfd0f9d6440f87e9a8b7f.jpg',
        'https://i.pinimg.com/474x/8a/df/2b/8adf2bc38f4c276034c1abcbce621b96.jpg'
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

    // دالة لتوجيه المستخدم إلى صفحة التحقق من التذكرة
    const handleCheckTicketClick = () => {
        navigate('/Checkteckit'); // تغيير الصفحة إلى /checkticket
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
                <h1 className="text-5xl font-bold mb-4">Discover the Magic of Riyadh Season</h1>
                <br />
                <p className="text-m mb-6">Experience an unforgettable journey in the heart of the capital. Book your ticket now and get ready for days filled with <br /> entertainment events and amazing shows waiting for you.</p>
                <br />
                <button 
                    className="px-8 py-4 bg-gradient-to-r from-[#9b27b0] to-[#ff4081] text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out"
                    onClick={handleCheckTicketClick} // استدعاء دالة التوجيه عند الضغط
                >
                    Check Ticket
                </button>
                <p className="absolute bottom-8 text-sm">
                    Don't miss the chance to be part of this grand event that brings together fun, art, and culture in one season.
                </p>
            </div>

            <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
    );
};

export default Slider;
