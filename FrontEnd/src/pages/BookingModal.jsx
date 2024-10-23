import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { FaTimes, FaTicketAlt } from 'react-icons/fa';
import "react-datepicker/dist/react-datepicker.css";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51QCyiNFjwRhkW7KwJEkXQOsCQEU2GDFji43vyUInNGrJr2l6QIk0wpStec41VtJKOLZwnbyOr3Q8mB5uSLp86z9n00veLycNjH');

const BookingModal = ({ isOpen, onClose, event }) => {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [date, setDate] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state
    const stripe = useStripe();
    const elements = useElements();

    const ticketPrices = {
        Gold: 300, // 150 SAR in cents
        Silver: 150, // 100 SAR in cents
        Bronze: 100, // 50 SAR in cents
    };

    const total = selectedTicket ? ticketPrices[selectedTicket] : 0;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            console.error('Stripe.js has not loaded yet.');
            return; 
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            console.error('CardElement is not rendered properly.');
            return;
        }

        setLoading(true); // Set loading state

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error('[Error]', error);
            setLoading(false); // Reset loading state
            return;
        }

        // Create payment intent on your server
        try {
            const response = await axios.post('http://localhost:8050/tickets/create-payment-intent', {
                paymentMethodId: paymentMethod.id,
                amount: total,
            });

            console.log('Payment Intent response:', response.data);
            setShowSuccessMessage(true); // Show success message if payment is successful
        } catch (error) {
            console.error('Error creating payment intent:', error);
            // Optionally show an error message to the user
        } finally {
            setLoading(false); // Reset loading state
        }
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

                        {/* Ticket Type Selection */}
                        <div className="mb-6">
                            <label className="block mb-2 font-semibold text-left">Ticket type:</label>
                            <div className="flex flex-col items-start">
                                {Object.keys(ticketPrices).map((ticket) => (
                                    <label key={ticket} className="flex items-center mb-2 cursor-pointer">
                                        <input 
                                            type="radio" 
                                            value={ticket} 
                                            checked={selectedTicket === ticket} 
                                            onChange={() => setSelectedTicket(ticket)} 
                                            className="radio radio-primary mr-2"
                                        />
                                        <FaTicketAlt className={`mr-2 text-${ticket === 'Gold' ? 'yellow-500' : ticket === 'Silver' ? 'gray-400' : 'orange-500'} text-2xl`} />
                                        <span>{ticketPrices[ticket] / 100} SAR</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Card Details Field */}
                        <div className="mb-6">
                            <label className="block mb-2 font-semibold text-left">Card details:</label>
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
                                className={`bg-[#78006e] hover:bg-[#be008d] text-white py-3 px-6 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={loading} // Disable button while loading
                            >
                                {loading ? 'Processing...' : 'Book Now'}
                            </button>
                        </div>
                    </form>

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
                </div>
            </div>
        </Elements>
    );
};

export default BookingModal;

