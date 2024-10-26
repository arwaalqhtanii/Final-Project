import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { FaTimes, FaTicketAlt, FaPlus, FaMinus } from 'react-icons/fa';
import "react-datepicker/dist/react-datepicker.css";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const BookingModal = ({ isOpen, onClose, event }) => {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [date, setDate] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [numberOfTickets, setNumberOfTickets] = useState(1);
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);


    
    const ticketPrices = {
        gold: 150,  
        silver: 100,
        standard: 50,
    };
   
    console.log("selectedTicket"+selectedTicket);
    console.log("ticketPrices"+ticketPrices[selectedTicket]);
    
    
    
    const total = selectedTicket ? ticketPrices[selectedTicket] * numberOfTickets * 100 : 0;

    console.log("total"+total);
     
    

    
const handleSubmit = async () => { 
    setError('');
    if (!stripe || !elements) {
        console.error('Stripe.js has not loaded yet.');
        return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
        console.error('CardElement is not rendered properly.');
        return;
    }

    setLoading(true);

    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
    });

    if (paymentMethodError) {
        console.error('[Error]', paymentMethodError);
        alert(paymentMethodError.message);
        setLoading(false);
        return;
    }

    try {
        // Create payment intent
        const paymentResponse = await axios.post('http://localhost:8050/tickets/create-payment-intent', {
            paymentMethodId: paymentMethod.id,
            amount: total,
        });

        console.log("Payment Intent Response:", paymentResponse.data);

        if (!paymentResponse.data.success) {
            throw new Error(paymentResponse.data.error || 'Payment failed');
        }

        // Assuming you have a user authentication token stored
        const userToken = localStorage.getItem('token'); 

        // Format the visit date
        const formatDate = (date) => {
            if (!date) return '';
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`; // Change to yyyy-mm-dd
        };

        const finalTicketData = {
            ticketType: selectedTicket,
            quantity: numberOfTickets,
            visitDate: formatDate(date), // Use formatted date
        };


        console.log("Final Ticket Data:", finalTicketData);

        console.log('event id'+event._id);
        // Create ticket for the user
        const ticketResponse = await axios.post(`http://localhost:8050/tickets/addTicket/${event._id}/purchase`, finalTicketData, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
    
        console.log('Ticket Response:', ticketResponse.data);
    
        // Check if the response has the expected structure
        if (ticketResponse.data && ticketResponse.data.message) {
            console.log("Tickets purchased successfully");
            setShowSuccessMessage(true);
        } else {
            throw new Error('Ticket creation failed');
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
            setError(errorMessage); // Set error message from the response or fallback
            console.error('Error during ticket creation:', errorMessage);
    }
};
const totalcalc= ticketPrices[selectedTicket] * numberOfTickets;

    const handleConfirm = () => {
        setShowConfirmation(false);
        handleSubmit(); // Call handleSubmit directly
    };

    const incrementTickets = () => {
        if (numberOfTickets < 5) {
            setNumberOfTickets(numberOfTickets + 1);
        }
    };

    const decrementTickets = () => {
        if (numberOfTickets > 1) {
            setNumberOfTickets(numberOfTickets - 1);
        }
    };

  

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="fixed inset-0 bg-black opacity-75" onClick={onClose}></div>
            <div className="relative bg-white rounded-lg p-8 z-10 shadow-lg max-w-lg mx-auto w-[95%] h-auto">
                <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-800" onClick={onClose}>
                    <FaTimes className="text-2xl" />
                </button>

                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{event.name}</h2>
                <p className="text-gray-600 mb-6 text-center">Date: {event.startDate} - {event.endDate}</p>
                {error && <h1 className="text-red-600">{error}</h1>} {/* Display error message */}
                <form onSubmit={(e) => { e.preventDefault(); setShowConfirmation(true); }}>
                    <div className="mb-6 md:flex md:items-start">
                        <div className="w-full mb-4 md:mb-0">
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

                        <div className="flex items-center border border-gray-300 rounded-lg p-[0.71rem] mt-4 md:mt-7 md:ml-2 w-60">
                            <span className="mr-2 text-gray-600">Tickets:</span>
                            <button type="button" onClick={decrementTickets} className="text-[#78006e] hover:text-[#be008d]">
                                <FaMinus />
                            </button>
                            <span className="mx-2">{numberOfTickets}</span>
                            <button type="button" onClick={incrementTickets} className="text-[#78006e] hover:text-[#be008d]">
                                <FaPlus />
                            </button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 font-semibold text-left">Ticket type:</label>
                        <div className="flex flex-col items-start">
                            {Object.keys(ticketPrices).map((ticket) => (
                                <label key={ticket} className="flex items-center mb-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        value={ticket}
                                        checked={selectedTicket === ticket}
                                        onChange={(e) => setSelectedTicket(e.target.value)}
                                        className="radio radio-primary mr-2"
                                    />
                                    <FaTicketAlt className={`mr-2 text-${ticket === 'gold' ? 'yellow-500' : ticket === 'silver' ? 'gray-400' : 'orange-500'} text-2xl`} />
                                    <span>{ticketPrices[ticket]} SAR</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {numberOfTickets > 1 && selectedTicket && (
                        <div className="mb-6">
                            <p className="font-semibold text-left">Total: <strong>{total} SAR</strong></p>
                        </div>
                    )}

                    <div className="mb-6">
                        <label className="block mb-2 font-semibold text-left">Enter your card details:</label>
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#32325d',
                                        fontFamily: 'Arial, sans-serif',
                                        '::placeholder': {
                                            color: '#a0aec0',
                                        },
                                        padding: '10px 12px',
                                    },
                                    invalid: {
                                        color: '#fa755a',
                                    },
                                },
                            }}
                            className="input input-bordered w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#be008d]"
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

                {/* Confirmation Modal */}
                {showConfirmation && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black opacity-75 z-50">
                        <div className="bg-white rounded-lg p-6 z-10 shadow-lg max-w-md mx-auto w-[90%]">
                            <h2 className="text-xl font-bold mb-4">Confirm Your Booking</h2>
                            <p className="mb-2">Ticket Type: <strong>{selectedTicket}</strong></p>
                            <p className="mb-2">Number of Tickets: <strong>{numberOfTickets}</strong></p>
                            <p className="mb-2">Total Amount: <strong>{totalcalc} SAR</strong></p>
                            <p className="mb-4">Do you want to proceed with the payment?</p>
                            <div className="flex justify-between">
                                <button onClick={() => setShowConfirmation(false)} className="bg-gray-400 text-white py-2 px-4 rounded">Cancel</button>
                                <button onClick={handleConfirm} className="bg-[#78006e] hover:bg-[#be008d] text-white py-2 px-4 rounded">Confirm</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Success Message */}
                {showSuccessMessage && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black opacity-75 z-50">
                        <div className="bg-white rounded-lg p-6 z-10 shadow-lg max-w-md mx-auto w-[90%]">
                            <h2 className="text-xl font-bold mb-4">Booking Successful!</h2>
                            <p className="mb-4">Thank you for your booking. Your tickets will be sent to your email.</p>
                            <button onClick={() => { setShowSuccessMessage(false); onClose(); }} className="bg-[#78006e] hover:bg-[#be008d] text-white py-2 px-4 rounded">Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingModal;
