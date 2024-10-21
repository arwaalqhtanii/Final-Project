import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';  

function SignupW() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-gray-100">
     
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <svg className="absolute top-0 left-0 w-72 h-72 opacity-30" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200">
          <line x1="0" y1="0" x2="200" y2="200" stroke="#78006e" strokeWidth="8"/>
          <line x1="50" y1="0" x2="200" y2="150" stroke="#be008d" strokeWidth="5"/>
        </svg>
        <svg className="absolute bottom-0 right-0 w-96 h-96 opacity-30" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200">
          <line x1="0" y1="0" x2="200" y2="200" stroke="#be008d" strokeWidth="6"/>
          <line x1="100" y1="0" x2="200" y2="100" stroke="#78006e" strokeWidth="4"/>
        </svg>
      </div>

      <div className="relative bg-white shadow-lg rounded-lg p-8 max-w-lg w-full z-10">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#78006e]">إنشاء حساب</h2>

        <div className="mb-4">
          <label className="block text-right mb-1 text-gray-600">:أدخل رقم الهوية</label>
          <input 
            type="text" 
            className="input input-bordered w-full text-right border-[#78006e] focus:outline-none focus:ring-2 focus:ring-[#be008d]" 
            placeholder="رقم الهوية" 
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-right mb-1 text-gray-600">:كلمة السر</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                className="input input-bordered w-full text-right border-[#78006e] focus:outline-none focus:ring-2 focus:ring-[#be008d]" 
                placeholder="••••••••" 
              />
              <span 
                onClick={togglePasswordVisibility} 
                className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
              </span>
            </div>
          </div>
          <div>
            <label className="block text-right mb-1 text-gray-600">:تأكيد كلمة السر</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                className="input input-bordered w-full text-right border-[#78006e] focus:outline-none focus:ring-2 focus:ring-[#be008d]" 
                placeholder="••••••••" 
              />
              <span 
                onClick={togglePasswordVisibility} 
                className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-right mb-1 text-gray-600">:البريد الإلكتروني</label>
          <input 
            type="email" 
            className="input input-bordered w-full text-right border-[#78006e] focus:outline-none focus:ring-2 focus:ring-[#be008d]" 
            placeholder="example@example.com" 
          />
        </div>

        
        <button className="btn w-full mb-4 bg-[#78006e] text-white hover:bg-[#be008d] focus:outline-none focus:ring-4 focus:ring-[#be008d] transition-all duration-300">
          التسجيل
        </button>

      
        <div className="text-center">
          <p className="text-sm">
            هل لديك حساب؟ 
            <a href="#" className="text-[#78006e] hover:underline"> تسجيل دخول</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupW;
