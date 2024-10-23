
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { FaApplePay, FaCreditCard, FaTimes, FaTicketAlt } from 'react-icons/fa'; // استيراد الأيقونات
import "react-datepicker/dist/react-datepicker.css"; // استيراد أنماط react-datepicker

const BookingModal = ({ isOpen, onClose, event }) => {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [date, setDate] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const handleTicketChange = (e) => {
        setSelectedTicket(e.target.value);
    };

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmation(true); // عرض تأكيد الحجز
    };

    // const handleConfirm = () => {
    //     setShowConfirmation(false);
    //     setShowSuccessMessage(true); // عرض رسالة نجاح الحجز
    // };

    // const handleCancel = () => {
    //     setShowConfirmation(false); // إغلاق نافذة التأكيد
    // };

    // const handleSuccessOk = () => {
    //     setShowSuccessMessage(false); // إغلاق رسالة النجاح
    //     onClose(); // إغلاق نافذة الحجز
    // };

    const handleConfirm = async () => {
        setShowConfirmation(false);

        try {
            const response = await fetch(`http://localhost:8050/tickets/addTicket/${event._id}/purchase`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ticketType: selectedTicket,
                    quantity: 1, // missing !!
                    visitDate: date?.toLocaleDateString('en-CA'), // Convert date to YYYY-MM-DD format
                    paymentMethod,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                setShowSuccessMessage(true);
            } else {
                setErrorMessage(result.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error during ticket purchase:', error);
            setErrorMessage('Network error. Please try again.');
        }
    };

    const handleCancel = () => {
        setShowConfirmation(false);
    };

    const handleSuccessOk = () => {
        setShowSuccessMessage(false);
        onClose();
    };

    return (
        <>
            {/* Booking Modal */}
            <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}>
                <div className="fixed inset-0 bg-black opacity-75" onClick={onClose}></div>
                <div className="relative bg-white rounded-lg p-8 z-10 shadow-lg max-w-lg mx-auto w-[95%] h-auto">
                    {/* X Close Icon */}
                    <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-800" onClick={onClose}>
                        <FaTimes className="text-2xl" />
                    </button>

                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{event.name}</h2>

                    {/* Event Date */}
                    <p className="text-gray-600 mb-6 text-center">Date: {event.startDate} - {event.endDate}</p>

                    {/* Booking Form */}
                    <form onSubmit={handleSubmit}>
                        {/* Select Date Field */}
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

                        {/* Ticket Type Selection with Icons */}
                        <div className="mb-6">
                            <label className="block mb-2 font-semibold text-left">Ticket type:</label>
                            <div className="flex flex-col items-start">
                                {/* Gold */}
                                <label className="flex items-center mb-2 cursor-pointer">
                 
                                    <input 
                                        type="radio" 
                                        value="gold" 
                                        checked={selectedTicket === 'gold'} 
                                        onChange={handleTicketChange} 
                                        className="radio radio-primary mr-2"
                                    />
                                    <FaTicketAlt className="mr-2 text-yellow-500 text-2xl" />
                                    <span>150 SAR</span>
                                </label>

                                {/* Silver */}
                                <label className="flex items-center mb-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        value="silver" 
                                        checked={selectedTicket === 'silver'} 
                                        onChange={handleTicketChange} 
                                        className="radio radio-primary mr-2"
                                    />
                                    <FaTicketAlt className="mr-2 text-gray-400 text-2xl" />
                                    <span>100 SAR</span>
                                </label>

                                {/* Bronze */}
                                <label className="flex items-center mb-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        value="standard" 
                                        checked={selectedTicket === 'standard'} 
                                        onChange={handleTicketChange} 
                                        className="radio radio-primary mr-2"
                                    />
                                    <FaTicketAlt className="mr-2 text-orange-500 text-2xl" />
                                    <span>50 SAR</span>
                                </label>
                            </div>
                        </div>

                        {/* Payment Method Selection with Icons */}
                        <div className="mb-6">
                            <label className="block mb-2 font-semibold text-left">Payment method:</label>
                            <div className="flex flex-col items-start">
                                <label className="flex items-center mb-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        value="Apple Pay" 
                                        checked={paymentMethod === 'Apple Pay'} 
                                        onChange={handlePaymentChange} 
                                        className="radio radio-primary mr-2"
                                    />, 
                                    <FaApplePay className="mr-2 text-2xl" />
                                    <span>Apple Pay</span>
                                </label>
                                <label className="flex items-center mb-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        value="Credit Card" 
                                        checked={paymentMethod === 'Credit Card'} 
                                        onChange={handlePaymentChange} 
                                        className="radio radio-primary mr-2"
                                    />
                                    <FaCreditCard className="mr-2 text-2xl" />
                                    <span>Credit Card</span>
                                </label>
                            </div>
                        </div>

                        {/* Booking Button */}
                        <div className="flex justify-center mt-4">
                            <button 
                                type="submit" 
                                className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 px-6 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out"
                            >
                                Book Now
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-75"></div>
                    <div className="relative bg-white rounded-lg p-8 z-10 shadow-lg max-w-lg mx-auto w-[95%] h-auto">
                        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Confirm Booking</h2>
                        <p className="text-center text-gray-600 mb-6">You are about to book <strong>{event.name}</strong> on <strong>{date?.toLocaleDateString()}</strong>. Are you sure you want to proceed?</p>

                        <div className="flex justify-center space-x-4">
                            <button 
                                className="py-2 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold text-lg"
                                onClick={handleConfirm}
                            >
                                Confirm
                            </button>
                            <button 
                                className="py-2 px-6 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-semibold text-lg"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Message Modal */}
            {showSuccessMessage && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-75"></div>
                    <div className="relative bg-white rounded-lg p-8 z-10 shadow-lg max-w-lg mx-auto w-[95%] h-auto">
                        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Booking Successful!</h2>
                        <p className="text-center text-gray-600 mb-6">Your booking for <strong>{event.name}</strong> has been confirmed.</p>

                        <div className="flex justify-center">
                            <button 
                                className="py-2 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold text-lg"
                                onClick={handleSuccessOk}
                            >
                                Ok
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BookingModal;
