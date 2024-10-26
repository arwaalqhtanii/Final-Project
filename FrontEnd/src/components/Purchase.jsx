import { useState } from "react";
import { IoHardwareChipOutline } from "react-icons/io5";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const Purchase = ({ isOpen, onClose }) => {
    const [cardName, setCardName] = useState('');
    const [cardExpiration, setCardExpiration] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardCVV, setCardCVV] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleDateChange = (e) => {
        const fullDate = e.target.value;
        const year = fullDate.slice(2, 4); // آخر رقمين من السنة
        const month = fullDate.slice(5, 7); // الشهر

        setCardExpiration(`${month}/${year}`);
    };

    function SubmitPurchase() {
        const month = cardExpiration.slice(0, 2);
        const year = "20" + cardExpiration.slice(3, 5);

        if (cardName.length <= 0) {
            window.alert("Please fill in the name");
        }
        else if (cardCVV.length !== 3) {
            window.alert("Card CVV must be exactly 3 digits");
        }
        else if (new Date(year, month - 1) < new Date()) {
            window.alert("Your card is expired");
        }
        else {
            setShowConfirmation(true);

        }
    }

    const handleConfirmSale = () => {
        setShowConfirmation(false);
        setShowSuccessMessage(true);
        resetForm();
    };
    const handleCancelSale = () => {
        setShowConfirmation(false);

    };

    const handleSuccessOk = () => {
        setShowSuccessMessage(false);
        onClose();
    };

    const resetForm = () => {
        setCardName('');
        setCardExpiration('');
        setCardNumber('');
        setCardCVV('')
    };
    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="fixed inset-0 bg-black opacity-75" onClick={onClose}></div>
            <div className="flex flex-col gap-y-[2rem] relative bg-white rounded-lg z-10 shadow-lg max-w-md mx-auto w-[90%] h-auto ">
                <div className="flex justify-center items-center p-6 bg-gradient-to-r from-[#F8F9D7] to-[#E49BFF] rounded-t-md">
                    <div className="flex flex-col justify-end p-4 gap-y-[0.3rem] w-[80%] h-[25vh] max-md:h-[20vh] rounded-md bg-gradient-to-r from-[#78006E] to-[#be008d] shadow-xl">
                        <IoHardwareChipOutline className="text-[2.5rem] text-[#F3CA52]" />
                        <div className="flex justify-between w-[100%]">
                            <input
                                className="w-[65%] text-white font-semibold bg-transparent focus:outline-none uppercase"
                                value={cardName}
                                readOnly
                            />                            <input className="w-[30%] text-white font-semibold bg-transparent focus:outline-none" value={cardExpiration} readOnly />
                        </div>
                        <div className="flex">
                            <input className="w-[100%] text-[1.5rem] text-white font-semibold bg-transparent focus:outline-none" value={cardNumber} readOnly />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-y-[1.5rem] p-6">
                    <div className="flex justify-between w-[100%]">
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

                    <div className="flex justify-between">
                        <button className="w-[40%] h-[40px] rounded-md bg-white border-[#78006E] border-[1px] shadow-md text-[#78006E] font-bold" onClick={onClose}>Cancel</button>
                        <button className="w-[40%] h-[40px] rounded-md bg-gradient-to-r from-[#78006E] to-[#be008d] text-white shadow-md font-bold" onClick={SubmitPurchase}>Submit</button>
                    </div>
                </div>
            </div>

            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-75"></div>
                    <div className="relative bg-white rounded-lg p-6 z-10 shadow-lg max-w-md mx-auto w-[90%] h-auto">
                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Confirm Ticket Purchase</h2>

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
                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Purchase Successful!</h2>
                        <p className="text-center text-gray-600 mb-6">The ticket has been successfully purchased.</p>


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
        </div>
    );
}

export default Purchase;

