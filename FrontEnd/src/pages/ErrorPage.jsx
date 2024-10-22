import React from 'react';
import { Link } from 'react-router-dom';
import ErrorImage from '../assets/Error.png'; // Importing the image

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <img 
        src={ErrorImage} 
        alt="Error" 
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mb-8" 
      /> {/* Adding the image and making it responsive */}
     
      <p className="text-2xl text-gray-600 mb-8">Sorry, the page you are looking for does not exist.</p>
      <Link 
        to="/Home" 
        className="bg-[#e9ae40] text-white py-2 px-4 rounded-lg hover:bg-[#767674] transition-all duration-300 text-sm sm:text-base md:text-lg lg:text-xl"
      >
        Go back to Home Page
      </Link>
    </div>
  );
};

export default ErrorPage;


