import React, { useState } from 'react';
import { FaCalendarAlt, FaCreditCard, FaApple } from 'react-icons/fa';

function FormBookTicket() {
  const [ticketType, setTicketType] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [eventDate, setEventDate] = useState('');

  const handleTicketChange = (e) => {
    setTicketType(e.target.value);
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-white overflow-hidden">
      
      {/* تصميم التذكرة الفعلي */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-3xl mx-auto p-0 overflow-hidden my-6">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#78006e] to-[#be008d] pointer-events-none opacity-20"></div>

        {/* القسم العلوي: المعلومات الأساسية */}
        <div className="bg-gradient-to-r from-[#78006e] to-[#be008d] p-6 rounded-t-lg text-center">
          <h1 className="text-5xl font-extrabold text-white mb-2">بوليفارد ورلد</h1>
          <p className="text-lg text-gray-200">تاريخ الفعالية: 1 نوفمبر 2024</p>
        </div>

        {/* الصورة والتفاصيل */}
        <div className="relative">
          <div className="p-4">
            <div className="flex items-center justify-center mb-6 relative">
              <img
                src="https://i.pinimg.com/736x/52/73/32/527332acfe26031d72ebf0415fbfe7de.jpg"
                alt="بوليفارد ورلد"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h2 className="text-4xl font-bold text-white">تجربة فريدة بانتظارك!</h2>
              </div>
            </div>
          </div>
        </div>

        {/* محتوى التذكرة */}
        <div className="p-6">
          <p className="text-gray-700 mb-6 text-lg text-center">استعد لتجربة لا تُنسى في بوليفارد ورلد.</p>

          <div className="mb-4">
            <label className="block text-right mb-2 text-gray-700">:تحديد تاريخ الحضور</label>
            <div className="relative">
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="border-2 border-[#78006e] focus:outline-none focus:ring-2 focus:ring-[#be008d] rounded-lg pl-10 py-2 w-full"
                placeholder="اختر تاريخ الحدث"
              />
              <FaCalendarAlt className="absolute left-3 top-2 text-gray-500" />
            </div>
          </div>

          {/* اختيار نوع التذكرة */}
          <div className="mb-6">
            <label className="block text-right mb-2 text-gray-700">:نوع التذكرة</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['Gold - 150 SAR', 'Silver - 100 SAR', 'Bronze - 50 SAR'].map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleTicketChange(option.split(' ')[0])}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg border cursor-pointer transition-transform duration-300 transform hover:scale-105 ${ticketType === option.split(' ')[0] ? 'bg-[#78006e] text-white border-[#be008d]' : 'bg-white text-[#78006e] border-[#78006e]'}`}
                >
                  <span className="text-lg font-semibold">{option}</span>
                </div>
              ))}
            </div>
          </div>

          {/* اختيار طريقة الدفع */}
          <div className="mb-6">
            <label className="block text-right mb-2 text-gray-700">:طريقة الدفع</label>
            <div className="flex justify-center space-x-4">
              <div
                onClick={() => handlePaymentChange('ApplePay')}
                className={`flex items-center cursor-pointer transition-transform duration-300 transform hover:scale-105 ${paymentMethod === 'ApplePay' ? 'text-[#78006e]' : 'text-gray-700'}`}
              >
                <FaApple className="text-2xl mr-2" />
                <span className="text-lg">أبل باي</span>
              </div>
              <div
                onClick={() => handlePaymentChange('CreditCard')}
                className={`flex items-center cursor-pointer transition-transform duration-300 transform hover:scale-105 ${paymentMethod === 'CreditCard' ? 'text-[#78006e]' : 'text-gray-700'}`}
              >
                <FaCreditCard className="text-2xl mr-2" />
                <span className="text-lg">بطاقة بنكية</span>
              </div>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-[#78006e] to-[#be008d] text-white hover:bg-[#be008d] focus:outline-none focus:ring-4 focus:ring-[#be008d] transition-all duration-300 rounded-lg py-3 text-lg">
            حجز التذكرة
          </button>
        </div>

        {/* القسم السفلي: الشروط والأحكام */}
        <div className=" p-4 rounded-b-lg">
          <footer className="text-sm text-center">
            <p><a href="#" className="hover:underline">الشروط والأحكام</a> | <a href="#" className="hover:underline">سياسة الخصوصية</a> | <a href="#" className="hover:underline">اتصل بنا</a></p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default FormBookTicket;
