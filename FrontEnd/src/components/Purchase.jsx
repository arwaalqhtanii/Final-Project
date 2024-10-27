// import React, { useState } from 'react';
// import { IoHardwareChipOutline } from "react-icons/io5";
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Purchase = ({ isOpen, onClose, newPrice ,notificationID,userId}) => {
//     console.log("test purches ");
//     console.log(newPrice);
//     console.log(notificationID);
//     console.log("user in purches !!"+userId);
    
     
    
//     const stripe = useStripe();
//     const elements = useElements();
//     const [loading, setLoading] = useState(false);
//     const [showConfirmation, setShowConfirmation] = useState(false);
//     const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//     const [cardName, setCardName] = useState('');
//     const [paymentMethodId, setPaymentMethodId] = useState(null);
//     const navigate =useNavigate();
//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!stripe || !elements) {
//             console.error('Stripe.js has not loaded yet.');
//             return;
//         }

//         const cardElement = elements.getElement(CardElement);

//         if (!cardElement) {
//             console.error('CardElement is not rendered properly.');
//             return;
//         }

//         setLoading(true);

//         const { error, paymentMethod } = await stripe.createPaymentMethod({
//             type: 'card',
//             card: cardElement,
//         });

//         if (error) {
//             alert(error.message);
//             setLoading(false);
//             return;
//         }

//         setPaymentMethodId(paymentMethod.id);
//         setShowConfirmation(true);
//         setLoading(false);
//     };

//     // const handleConfirmSale = async () => {
//     //     setShowConfirmation(false);
//     //     if (!paymentMethodId) return;
    
//     //     try {
//     //         console.log("CLACL : " + newPrice * 100);
            
//     //         const response = await axios.post('http://localhost:8050/tickets/create-payment-intent', {
//     //             paymentMethodId: paymentMethodId,
//     //             amount: newPrice * 100, // Amount should be in cents
//     //         });
    
//     //         if (!response.data.success) {
//     //             throw new Error(response.data.error || 'Payment failed');
//     //         }
    
//     //         // Payment succeeded, now send the notification
           
//     //         const token = localStorage.getItem('token'); // Replace with your actual token
    
//     //         await axios.put(`http://localhost:8050/notifications/approve/${notificationID}`, {}, {
//     //             headers: {
//     //                 Authorization: `Bearer ${token}`,
//     //             },
//     //         });
    
//     //         console.log('Notification approved successfully');
    
//     //         setShowSuccessMessage(true);
//     //         navigate('/Teckitmanager')
//     //     } catch (error) {
//     //         alert('Payment confirmation failed. Please try again.');
//     //         console.error('Error during payment confirmation:', error);
//     //     }
//     // };
    
//     const handleConfirmSale = async () => {
//         setShowConfirmation(false);
//         if (!paymentMethodId) return;
    
//         try {
//             console.log("CLACL : " + newPrice * 100);
            
//             const response = await axios.post('http://localhost:8050/tickets/create-payment-intent', {
//                 paymentMethodId: paymentMethodId,
//                 amount: newPrice * 100, // Amount should be in cents
//             });
    
//             if (!response.data.success) {
//                 throw new Error(response.data.error || 'Payment failed');
//             }
    
//             // Call track-and-suspend endpoint
//             const suspendResponse = await axios.post('http://localhost:8050/notifications/track-and-suspend', {
//                 userId: userId,
//             });
    
//             if (suspendResponse.status !== 200) {
//                 throw new Error('Error tracking and suspending users');
//             }
    
//             console.log('Suspension process completed successfully:', suspendResponse.data);
    
//             // Payment succeeded, now send the notification
//             const token = localStorage.getItem('token'); // Replace with your actual token
    
//             await axios.put(`http://localhost:8050/notifications/approve/${notificationID}`, {}, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
    
//             console.log('Notification approved successfully');
    
//             setShowSuccessMessage(true);
//             navigate('/Teckitmanager');
//         } catch (error) {
//             alert('Payment confirmation failed. Please try again.');
//             console.error('Error during payment confirmation:', error);
//         }
//     };
    

//     const handleSuccessOk = () => {
//         setShowSuccessMessage(false);
//         onClose(); // Close the modal after success
//     };

//     return (
//         <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}>
//             <div className="fixed inset-0 bg-black opacity-75" onClick={onClose}></div>
//             <div className="flex flex-col gap-y-[2rem] relative bg-white rounded-lg z-10 shadow-lg max-w-md mx-auto w-[90%] h-auto">
//                 <div className="flex justify-center items-center p-6 bg-gradient-to-r from-[#F8F9D7] to-[#E49BFF] rounded-t-md">
//                     <div className="flex flex-col justify-end p-4 gap-y-[0.3rem] w-[80%] h-[25vh] max-md:h-[20vh] rounded-md bg-gradient-to-r from-[#78006E] to-[#be008d] shadow-xl">
//                         <IoHardwareChipOutline className="text-[2.5rem] text-[#F3CA52]" />
//                         <input
//                             className="w-full text-white font-semibold bg-transparent focus:outline-none uppercase"
//                             placeholder="Card Holder Name"
//                             value={cardName}
//                             onChange={(e) => setCardName(e.target.value)}
//                         />
//                     </div>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                     <CardElement
//                         options={{
//                             style: {
//                                 base: {
//                                     fontSize: '16px',
//                                     color: '#32325d',
//                                     fontFamily: 'Arial, sans-serif',
//                                     '::placeholder': {
//                                         color: '#a0aec0',
//                                     },
//                                     padding: '10px 12px',
//                                 },
//                                 invalid: {
//                                     color: '#fa755a',
//                                 },
//                             },
//                         }}
//                         className="input input-bordered w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#be008d]"
//                     />
//                     <div className="flex justify-between">
//                         <button type="button" className="w-[40%] h-[40px] rounded-md bg-white border-[#78006E] border-[1px] shadow-md text-[#78006E] font-bold" onClick={onClose}>
//                             Cancel
//                         </button>
//                         <button type="submit" disabled={loading} className="w-[40%] h-[40px] rounded-md bg-gradient-to-r from-[#78006E] to-[#be008d] text-white shadow-md font-bold">
//                             {loading ? 'Processing...' : 'Submit'}
//                         </button>
//                     </div>
//                 </form>

//                 {showConfirmation && (
//                     <div className="fixed inset-0 flex items-center justify-center z-50">
//                         <div className="fixed inset-0 bg-black opacity-75"></div>
//                         <div className="relative bg-white rounded-lg p-6 z-10 shadow-lg max-w-md mx-auto w-[90%] h-auto">
//                             <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Confirm Ticket Purchase</h2>
//                             <div className="flex justify-center space-x-4">
//                                 <button className="py-2 px-6 rounded-lg bg-[#be008d] hover:bg-[#78006e] text-white font-semibold text-lg" onClick={handleConfirmSale}>
//                                     Confirm
//                                 </button>
//                                 <button className="py-2 px-6 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-semibold text-lg" onClick={() => setShowConfirmation(false)}>
//                                     Cancel
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {showSuccessMessage && (
//                     <div className="fixed inset-0 flex items-center justify-center z-50">
//                         <div className="fixed inset-0 bg-black opacity-75"></div>
//                         <div className="relative bg-white rounded-lg p-6 z-10 shadow-lg max-w-md mx-auto w-[90%] h-auto">
//                             <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Purchase Successful!</h2>
//                             <p className="text-center text-gray-600 mb-6">The ticket has been successfully purchased.</p>
//                             <div className="flex justify-center">
//                                 <button className="py-2 px-6 rounded-lg bg-[#be008d] hover:bg-[#78006e] text-white font-semibold text-lg" onClick={handleSuccessOk}>
//                                     Ok
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Purchase;

import React, { useState } from 'react';
import { IoHardwareChipOutline } from "react-icons/io5";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Purchase = ({ isOpen, onClose, newPrice, notificationID }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [cardName, setCardName] = useState('');
    const [paymentMethodId, setPaymentMethodId] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

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

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                name: cardName, // Add card holder name
            },
        });

        if (error) {
            alert(error.message);
            setLoading(false);
            return;
        }

        setPaymentMethodId(paymentMethod.id);
        setShowConfirmation(true);
        setLoading(false);
    };

    const handleConfirmSale = async () => {
        setShowConfirmation(false);
        if (!paymentMethodId) return;

        try {
            const response = await axios.post('http://localhost:8050/tickets/create-payment-intent', {
                paymentMethodId: paymentMethodId,
                amount: newPrice * 100, // Amount in cents
            });

            if (!response.data.success) {
                throw new Error(response.data.error || 'Payment failed');
            }

            console.log(response.data);
            
            // Call track-and-suspend endpoint
            // const suspendResponse = await axios.post('http://localhost:8050/notifications/track-and-suspend', {
            //     userId: userId,
            // });

            // if (suspendResponse.status !== 200) {
            //     throw new Error('Error tracking and suspending users');
            // }

            const token = localStorage.getItem('token'); // Your actual token
            console.log(token);
            
            console.log("notificationID"+notificationID);
            
            await axios.put(`http://localhost:8050/notifications/approve/${notificationID}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setShowSuccessMessage(true);
            navigate('/Teckitmanager');
        } catch (error) {
            alert('Payment confirmation failed. Please try again: ' + error.message);
            console.error('Error during payment confirmation:', error);
        }
    };

    const handleSuccessOk = () => {
        setShowSuccessMessage(false);
        onClose(); // Close the modal after success
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="fixed inset-0 bg-black opacity-75" onClick={onClose}></div>
            <div className="flex flex-col gap-y-[2rem] relative bg-white rounded-lg z-10 shadow-lg max-w-md mx-auto w-[90%] h-auto">
                <div className="flex justify-center items-center p-6 bg-gradient-to-r from-[#F8F9D7] to-[#E49BFF] rounded-t-md">
                    <div className="flex flex-col justify-end p-4 gap-y-[0.3rem] w-[80%] h-[25vh] max-md:h-[20vh] rounded-md bg-gradient-to-r from-[#78006E] to-[#be008d] shadow-xl">
                        <IoHardwareChipOutline className="text-[2.5rem] text-[#F3CA52]" />
                        <input
                            className="w-full text-white font-semibold bg-transparent focus:outline-none uppercase"
                            placeholder="Card Holder Name"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                        />
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
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
                    <div className="flex justify-between">
                        <button type="button" className="w-[40%] h-[40px] rounded-md bg-white border-[#78006E] border-[1px] shadow-md text-[#78006E] font-bold" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="w-[40%] h-[40px] rounded-md bg-gradient-to-r from-[#78006E] to-[#be008d] text-white shadow-md font-bold">
                            {loading ? 'Processing...' : 'Submit'}
                        </button>
                    </div>
                </form>

                {showConfirmation && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="fixed inset-0 bg-black opacity-75"></div>
                        <div className="relative bg-white rounded-lg p-6 z-10 shadow-lg max-w-md mx-auto w-[90%] h-auto">
                            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Confirm Ticket Purchase</h2>
                            <div className="flex justify-center space-x-4">
                                <button className="py-2 px-6 rounded-lg bg-[#be008d] hover:bg-[#78006e] text-white font-semibold text-lg" onClick={handleConfirmSale}>
                                    Confirm
                                </button>
                                <button className="py-2 px-6 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-semibold text-lg" onClick={() => setShowConfirmation(false)}>
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
                            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Purchase Successful!</h2>
                            <p className="text-center text-gray-600 mb-6">The ticket has been successfully purchased.</p>
                            <div className="flex justify-center">
                                <button className="py-2 px-6 rounded-lg bg-[#be008d] hover:bg-[#78006e] text-white font-semibold text-lg" onClick={handleSuccessOk}>
                                    Ok
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Purchase;

