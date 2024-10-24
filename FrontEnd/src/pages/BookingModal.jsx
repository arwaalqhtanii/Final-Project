
/////الجديد 
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { FaTimes, FaTicketAlt } from 'react-icons/fa'; // استيراد الأيقونات
import "react-datepicker/dist/react-datepicker.css"; // استيراد أنماط react-datepicker

// استيراد مكتبات Stripe

import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// تحميل مفتاح النشر من Stripe
const stripePromise = loadStripe('pk_test_51QCyiNFjwRhkW7KwJEkXQOsCQEU2GDFji43vyUInNGrJr2l6QIk0wpStec41VtJKOLZwnbyOr3Q8mB5uSLp86z9n00veLycNjH');

const BookingModal = ({ isOpen, onClose, event }) => {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [date, setDate] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // المتغير الذي يتحكم في ظهور رسالة النجاح

    // Stripe Hooks
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // هنا سيتم عرض رسالة النجاح مباشرة عند الضغط على زر "Book Now"
        setShowSuccessMessage(true);
    };

    return (
        <Elements stripe={stripePromise}>
            <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}>
                <div className="fixed inset-0 bg-black opacity-75" onClick={onClose}></div>
                <div className="relative bg-white rounded-lg p-8 z-10 shadow-lg max-w-lg mx-auto w-[95%] h-auto">
                    <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-800" onClick={onClose}>
                        <FaTimes className="text-2xl" />
                    </button>

                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{event.name}</h2>

                    <p className="text-gray-600 mb-6 text-center">Date: {event.startDate} - {event.endDate}</p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block mb-2 font-semibold text-left">Select attendance date:</label>
                            <DatePicker
                                selected={date}
                                onChange={(date) => setDate(date)}
                                className="input input-bordered w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#be008d]"
                                dateFormat="yyyy/MM/dd"
                                placeholderText="Select a date"
                                required
                            />
                        </div>

                        {/* تحديد نوع التذكرة */}
                        <div className="mb-6">
                            <label className="block mb-2 font-semibold text-left">Ticket type:</label>
                            <div className="flex flex-col items-start">
                                <label className="flex items-center mb-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        value="Gold" 
                                        checked={selectedTicket === 'Gold'} 
                                        onChange={(e) => setSelectedTicket(e.target.value)} 
                                        className="radio radio-primary mr-2"
                                    />
                                    <FaTicketAlt className="mr-2 text-yellow-500 text-2xl" />
                                    <span>150 SAR</span>
                                </label>

                                <label className="flex items-center mb-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        value="Silver" 
                                        checked={selectedTicket === 'Silver'} 
                                        onChange={(e) => setSelectedTicket(e.target.value)} 
                                        className="radio radio-primary mr-2"
                                    />
                                    <FaTicketAlt className="mr-2 text-gray-400 text-2xl" />
                                    <span>100 SAR</span>
                                </label>

                                <label className="flex items-center mb-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        value="Bronze" 
                                        checked={selectedTicket === 'Bronze'} 
                                        onChange={(e) => setSelectedTicket(e.target.value)} 
                                        className="radio radio-primary mr-2"
                                    />
                                    <FaTicketAlt className="mr-2 text-orange-500 text-2xl" />
                                    <span>50 SAR</span>
                                </label>
                            </div>
                        </div>

                        {/* payment */}
                        <div className="flex items-center justify-between mb-5">
                            <span className="text-xl text-gray-700">Card details</span>
                        </div>
                        <div className="mb-6">
                            <CardElement 
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#424770',
                                            '::placeholder': {
                                                color: '#aab7c4',
                                            },
                                        },
                                        invalid: {
                                            color: '#9e2146',
                                        },
                                    },
                                }}
                                className="border-b-2 py-2"
                            />
                        </div>

                        <div className="flex justify-center mt-4">
                            <button 
                                type="submit" 
                                className="bg-[#78006e] hover:bg-[#be008d] text-white py-3 px-6 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out"
                            >
                                Book Now
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Success Message */}
            {showSuccessMessage && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-75"></div>
                    <div className="relative bg-white rounded-lg p-8 z-10 shadow-lg max-w-lg mx-auto w-[95%] h-auto">
                        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Booking Successful!</h2>
                        <p className="text-center text-gray-600 mb-6">Your booking for <strong>{event.name}</strong> has been confirmed.</p>

                        <div className="flex justify-center">
                            <button 
                                className="py-2 px-6 rounded-lg bg-[#78006e] hover:bg-[#be008d] text-white font-semibold text-lg"
                                onClick={() => setShowSuccessMessage(false)}
                            >
                                Ok
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Elements>
    );
};

export default BookingModal;
