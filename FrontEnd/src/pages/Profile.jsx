import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';  // استيراد أيقونة الخروج

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // هنا يمكنك إضافة منطق الخروج الفعلي، مثل إزالة الـ token أو مسح بيانات المستخدم
    navigate('/LoginW'); // إعادة التوجيه لصفحة تسجيل الدخول بعد الخروج
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center relative">
        {/* أيقونة الخروج */}
        <FiLogOut 
          onClick={handleLogout} 
          className="absolute top-4 right-4 text-2xl text-[#78006e] cursor-pointer hover:text-[#be008d] transition-all duration-300" 
        />
        
        <h1 className="text-2xl font-bold text-[#78006e] mb-4">مرحباً بك، المستخدم</h1>
        <p className="text-lg text-gray-600 mb-6">بريدك الإلكتروني: user@example.com</p>
      </div>
    </div>
  );
};

export default Profile;
