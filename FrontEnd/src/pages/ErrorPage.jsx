import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#78006e] to-[#be008d] text-white px-4">

      <div className="relative text-center">
        <h2 className="text-9xl font-extrabold mb-4 drop-shadow-lg transform-gpu" style={{ letterSpacing: '0.1em' }}>
          404
        </h2>
        <p className="text-2xl md:text-3xl font-semibold mb-8">Oops! Page Not Found</p>

 
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent to-[#78006e] opacity-30 blur-lg transform scale-150"></div>
        
        <p className="text-lg mb-6 max-w-lg mx-auto">
          The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        
        <Link 
          to="/" 
          className="inline-block bg-white text-[#78006e] py-3 px-8 rounded-full shadow-lg hover:bg-[#be008d] hover:text-white transition-all duration-300 transform hover:scale-105"
        >
          Go Back Home
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    </div>
  );
};

export default ErrorPage;
