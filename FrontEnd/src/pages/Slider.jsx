import { useState, useEffect } from 'react';

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

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

    return (

        <div className="relative w-full h-screen pt-16">

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
                <h1 className="text-6xl font-bold mb-4" >اكتشف سحر موسم الرياض</h1>
                <p className="text-lg mb-6">عيش تجربة لا مثيل لها في قلب العاصمة. احجز تذكرتك الآن واستعد لأيام مليئة بالفعاليات الترفيهية والعروض الرائعة التي تنتظرك 
                </p>
                <button className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-[#78006D] hover:text-white transition-all duration-300">
                    التحقق من التذكرة
                </button>
                <p className="absolute bottom-8 text-sm">
                لا تفوت الفرصة لتكون جزءًا من هذا الحدث الضخم الذي يجمع بين المتعة، الفن، والثقافة في موسم واحد.
                </p>
            </div>

            <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
    );
};

export default Slider;

