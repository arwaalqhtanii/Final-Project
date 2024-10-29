import React, { useState } from 'react';
import { FaTimes, FaEnvelope, FaDollarSign } from 'react-icons/fa';
import axios from 'axios';


const SellTicketModal = ({ isOpen, onClose, event, update, originalPrice }) => {
    const [buyerEmail, setBuyerEmail] = useState('');
    const [ticketPrice, setTicketPrice] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


 

    const handleSellSubmit = (e) => {
        e.preventDefault();
        setShowConfirmation(true);
    };

    const handleConfirmSale = async () => {
        setShowConfirmation(false);
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(
                `http://localhost:8050/notifications/notify/${event.ticketCode}`,
                {
                    targetUserEmail: buyerEmail,
                    newPrice: ticketPrice,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                }
            );

            console.log(response.data);
            setShowSuccessMessage(true);
            update.fetchTickets();
            resetForm();
        } catch (error) {
            const message = error.response.data.message || 'An error occurred while selling the ticket.';
            setErrorMessage('Error selling ticket: ' + message);
            console.log(message);
            console.error('Error:', error);
        }
    };


    const handleCancelSale = () => {
        setShowConfirmation(false);
        resetForm();
    };

    const handleSuccessOk = () => {
        setShowSuccessMessage(false);
        onClose();
    };

    const resetForm = () => {
        setBuyerEmail('');
        setTicketPrice('');
    };

    return (
        <>

            <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}>
                <div className="fixed inset-0 bg-black opacity-75" onClick={onClose}></div>
                <div className="relative bg-white rounded-lg p-6 z-10 shadow-lg max-w-md mx-auto w-[90%] h-auto">

                    <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-800" onClick={onClose}>
                        <FaTimes className="text-2xl" />
                    </button>

                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sell Ticket</h2>





                    <form onSubmit={handleSellSubmit}>

                        <div className="mb-6">
                            <label className="block mb-2 font-semibold text-left">Buyer Email:</label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="email"
                                    value={buyerEmail}
                                    onChange={(e) => setBuyerEmail(e.target.value)}
                                    className="input input-bordered w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#be008d]"
                                    placeholder="Enter buyer's email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block mb-2 font-semibold text-left">Original Ticket Price:</label>
                            <p className="bg-gray-100 p-4 rounded-lg text-center font-semibold text-gray-700">{event.ticketOldPrice || 'N/A'} SAR</p>
                        </div>
                        <div className="mb-6">

                            <label className="block mb-2 font-semibold text-left">New Ticket Price:</label>
                            <div className="relative">
                                <FaDollarSign className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="number"
                                    value={ticketPrice}
                                    onChange={(e) => setTicketPrice(e.target.value)}
                                    className="input input-bordered w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#be008d]"
                                    placeholder="Enter new price"
                                    required
                                />
                            </div>
                        </div>


                        <div className="flex justify-center mt-4">
                         
                            <button
                                type="submit"
                                className="py-2 px-6 rounded-lg bg-[#be008d] hover:bg-[#78006e] w-44 text-white font-semibold text-lg"
                            >
                                Sell Ticket
                            </button>
                        </div>
                    </form>
                </div>
            </div>


            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-75"></div>
                    <div className="relative bg-white rounded-lg p-6 z-10 shadow-lg max-w-md mx-auto w-[90%] h-auto">
                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Confirm Ticket Sale</h2>
                        <p className="text-center text-gray-600 mb-6">You are about to sell this ticket for <strong>{ticketPrice} SAR</strong> to <strong>{buyerEmail}</strong>. Are you sure you want to proceed?</p>

                        <div className="flex justify-center space-x-4">
                            <button
                                className="py-2 px-6 rounded-lg bg-[#be008d] hover:bg-[#78006e] text-white font-semibold text-lg"
                                onClick={handleConfirmSale}
                            >
                                Confirm
                            </button>
                            <button
                                className="py-2 px-6 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-semibold text-lg"
                                onClick={handleCancelSale}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {showSuccessMessage && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-75"></div>
                    <div className="relative bg-white rounded-lg p-6 z-10 shadow-lg max-w-md mx-auto w-[90%] h-auto">
                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sale Successful!</h2>
                        <p className="text-center text-gray-600 mb-6">The ticket has been successfully sold.</p>

                        <div className="flex justify-center">
                            <button
                                className="py-2 px-6 rounded-lg bg-[#be008d] hover:bg-[#78006e] text-white font-semibold text-lg"
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

export default SellTicketModal;