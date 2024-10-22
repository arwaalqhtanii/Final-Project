import React from 'react';
import { Link } from 'react-router-dom';
import ErrorImage from '../assets/Error.png'; // استيراد الصورة

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img src={ErrorImage} alt="Error" className="w-1/2 mb-8" /> {/* إضافة الصورة */}
      {/* <h1 className="text-6xl font-bold text-[#78006e] mb-8">404</h1>
      <p className="text-2xl text-gray-600 mb-8">عذراً، الصفحة التي تبحث عنها غير موجودة.</p> */}
      <Link to="/Home" className="bg-purple-800 text-white py-2 px-4 rounded-lg hover:bg-[#be008d] transition-all duration-300">
        العودة إلى الصفحة الرئيسية
      </Link>
    </div>
  );
};

export default ErrorPage;

