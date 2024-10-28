

// import { useState, useEffect } from 'react';
// import { MdLocationPin } from "react-icons/md";
// import { CiCalendarDate } from "react-icons/ci";
// import { MdAccessTime } from "react-icons/md";
// import { FaTicketAlt } from "react-icons/fa";

// import Vector from '/Vector.png';

// function MyTicket(props) {
//     const [windowWidth, setWindowWidth] = useState(window.innerWidth);


//     useEffect(() => {
//         // Function to handle screen resize
//         const handleResize = () => {
//             setWindowWidth(window.innerWidth);
//         };

//         // Add event listener to track window resizing
//         window.addEventListener('resize', handleResize);

//         // Cleanup the event listener on component unmount
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     return (
//         <div className={` ${windowWidth > 700 ? 'ticket-big' : 'ticket-small'} w-[50vw] max-md:w-[80%] h-[40vh]  max-md:h-[fit-content] max-md:py-[15px] flex max-md:flex-col max-md:items-center justify-start rounded-[10px] relative ${props.status === 1 ? 'bg-gray-300 text-gray-500' : 'bg-white'}`}>
//             <div className='w-[65%] max-md:w-[100%] h-[100%] max-md:items-center flex flex-col items-start max-md:gap-y-[1.5rem] justify-evenly  p-[10px]  pl-[35px] pr-[35px]'>
//                 <div className='flex'>
//                     <div className={` text-[2rem] font-bold ${props.status === 1 ? 'text-gray-500' : 'text-[#78006E]'}`}>{props.title}</div>
//                 </div>
//                 <div className='flex items-center gap-x-[1rem]'>
//                     <div className='font-bold text-[1.5rem]'>{props.location}</div>
//                     <MdLocationPin className='text-[1.5rem]'></MdLocationPin>
//                 </div>
//                 <div className='flex flex-row-reverse gap-x-[1rem]  max-md:w-[100%] max-md:gap-x-[1rem] max-md:justify-center'>
//                     <div className='flex flex-col items-center gap-y-[0.7rem] '>
//                         <FaTicketAlt className='text-[1.5rem] font-bold'></FaTicketAlt>
//                         <div>{props.type}</div>
//                     </div>
//                     <div className='flex flex-col items-center gap-y-[0.7rem] '>
//                         <MdAccessTime className='text-[1.5rem] font-bold'></MdAccessTime>
//                         <div>{props.time}</div>
//                     </div>
//                     <div className='flex flex-col items-center gap-y-[0.7rem] '>
//                         <CiCalendarDate className='text-[1.5rem] text-center font-bold'></CiCalendarDate>
//                         <div>{props.date}</div>
//                     </div>
//                 </div>
//                 {windowWidth > 700 ? <img className='w-[60%] max-md:w-[100%] h-[10px]' src={Vector}></img> : null}

//                 {props.newPrice ? <div className='h-[40px] font-bold text-[1.2rem]'>Price : {props.newPrice} SR</div> : <div className='h-[40px]'></div>}
//             </div>

//             <div className={`w-[35%] max-md:w-[100%] h-[100%] ${windowWidth > 700 ? 'border-l-[3px]' : 'border-t-[3px]'} border-dashed  border-black p-[10px] max-md:px-[12.5px] pl-[10px] relative`}>
//                 <div className='w-[100%] h-[100%] flex flex-col justify-evenly items-center relative'>
//                     {/* QR Code Section */}
//                     <div className='relative flex justify-center'>
//                         {/* QR Code with conditional blur effect */}
//                         <img
//                             className={`w-[75%] ${props.status === 1 ? 'filter blur-[5px]' : ''}`}
//                             src='https://www.marefa.org/w/images/8/87/QRCode.png'
//                             alt="Barcode"
//                         />
//                     </div>

//                     {/* Code Section */}
//                     <div className='relative'>
//                         <div className='font-bold'>
//                             <span>Ticket code : </span>

//                             <span className={`${props.status === 1 ? 'filter blur-[5px]' : ''}`}>
//                                 {props.code}
//                             </span>


//                         </div>
//                     </div>


//                     {props.forbuy ? (
//                         <div className='flex gap-x-[1.5rem]'>
//                             <button className='px-[10px] py-[5px] text-white rounded-[10px] bg-slate-500 text-center font-bold' onClick={props.ignore}>ignore</button>
//                             <button className='px-[10px] py-[5px] text-white rounded-[10px] bg-[#78006E] text-center font-bold' onClick={props.purchaseForm}>accept</button>
//                         </div>
//                     ) : (
//                         <div className='flex justify-end gap-x-[1.5rem]'>
//                             {props.status === 0  ? (
//                                 <button
//                                 className={`px-[10px] py-[5px] text-white rounded-[10px] text-center font-bold ${props.pending? 'bg-[gray]': ' bg-[#78006E]'} `}
//                                 onClick={ props.popSellForm}
//                             >
//                                     Sell
//                                 </button>
//                             ) : (
//                                 <button
//                                     className='px-[10px] py-[5px] text-white rounded-[10px] bg-slate-500 text-center font-bold'
//                                     disabled
//                                 >
//                                     Not Available
//                                 </button>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default MyTicket;

//----------------------------------------------------------------------------

// import { useState, useEffect } from 'react';
// import { MdLocationPin } from "react-icons/md";
// import { CiCalendarDate } from "react-icons/ci";
// import { MdAccessTime } from "react-icons/md";
// import { FaTicketAlt } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Vector from '/Vector.png';

// function MyTicket(props) {
//     const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//     const [showIgnoreConfirmation, setShowIgnoreConfirmation] = useState(false);
//     const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State for success message
//     const navigate =useNavigate();
//     useEffect(() => {
//         const handleResize = () => {
//             setWindowWidth(window.innerWidth);
//         };

//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     const handleIgnore = () => {
//         setShowIgnoreConfirmation(true);
//     };

//     const handleConfirmIgnore = async () => {
//         setShowIgnoreConfirmation(false);
//         const token = localStorage.getItem('token');

//         try {
//             await axios.put(
//                 `http://localhost:8050/notifications/notificationsignore/${props.ignoreId}`,
//                 {},
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             setShowSuccessMessage(true); // Show success message
//         } catch (error) {
//             const message = error.response?.data?.message || 'An error occurred while ignoring the ticket.';
//             console.error('Error:', message);
//             alert(message); // Simple alert for error
//         }
//     };

//     const handleCancelIgnore = () => {
//         setShowIgnoreConfirmation(false);
//     };

//     const handleCloseSuccessMessage = () => {
//         setShowSuccessMessage(false);
//         navigate('/');
//     };

//     return (
//         <div className={` ${windowWidth > 700 ? 'ticket-big' : 'ticket-small'} w-[50vw] max-md:w-[80%] h-[40vh]  max-md:h-[fit-content] max-md:py-[15px] flex max-md:flex-col max-md:items-center justify-start rounded-[10px] relative ${props.status === 1 ? 'bg-gray-300 text-gray-500' : 'bg-white'}`}>
//             <div className='w-[65%] max-md:w-[100%] h-[100%] max-md:items-center flex flex-col items-start max-md:gap-y-[1.5rem] justify-evenly  p-[10px]  pl-[35px] pr-[35px]'>
//                 <div className='flex'>
//                     <div className={` text-[2rem] font-bold ${props.status === 1 ? 'text-gray-500' : 'text-[#78006E]'}`}>{props.title}</div>
//                 </div>
//                 <div className='flex items-center gap-x-[1rem]'>
//                     <div className='font-bold text-[1.5rem]'>{props.location}</div>
//                     <MdLocationPin className='text-[1.5rem]'></MdLocationPin>
//                 </div>
//                 <div className='flex flex-row-reverse gap-x-[1rem]  max-md:w-[100%] max-md:gap-x-[1rem] max-md:justify-center'>
//                     <div className='flex flex-col items-center gap-y-[0.7rem] '>
//                         <FaTicketAlt className='text-[1.5rem] font-bold'></FaTicketAlt>
//                         <div>{props.type}</div>
//                     </div>
//                     <div className='flex flex-col items-center gap-y-[0.7rem] '>
//                         <MdAccessTime className='text-[1.5rem] font-bold'></MdAccessTime>
//                         <div>{props.time}</div>
//                     </div>
//                     <div className='flex flex-col items-center gap-y-[0.7rem] '>
//                         <CiCalendarDate className='text-[1.5rem] text-center font-bold'></CiCalendarDate>
//                         <div>{props.date}</div>
//                     </div>
//                 </div>
//                 {windowWidth > 700 ? <img className='w-[60%] max-md:w-[100%] h-[10px]' src={Vector}></img> : null}

//                 {props.newPrice ? <div className='h-[40px] font-bold text-[1.2rem]'>Price : {props.newPrice} SR</div> : <div className='h-[40px]'></div>}
//             </div>

//             <div className={`w-[35%] max-md:w-[100%] h-[100%] ${windowWidth > 700 ? 'border-l-[3px]' : 'border-t-[3px]'} border-dashed  border-black p-[10px] max-md:px-[12.5px] pl-[10px] relative`}>
//                 <div className='w-[100%] h-[100%] flex flex-col justify-evenly items-center relative'>
//                     <div className='relative flex justify-center'>
//                         <img
//                             className={`w-[75%] ${props.status === 1 ? 'filter blur-[5px]' : ''}`}
//                             src='https://www.marefa.org/w/images/8/87/QRCode.png'
//                             alt="Barcode"
//                         />
//                     </div>

//                     <div className='relative'>
//                         <div className='font-bold'>
//                             <span>Ticket code : </span>
//                             <span className={`${props.status === 1 ? 'filter blur-[5px]' : ''}`}>
//                                 {props.code}
//                             </span>
//                         </div>
//                     </div>

//                     {props.forbuy ? (
//                         <div className='flex gap-x-[1.5rem]'>
//                             <button className='px-[10px] py-[5px] text-white rounded-[10px] bg-slate-500 text-center font-bold' onClick={handleIgnore}>Ignore</button>
//                             <button className='px-[10px] py-[5px] text-white rounded-[10px] bg-[#78006E] text-center font-bold' onClick={props.purchaseForm}>Accept</button>
//                         </div>
//                     ) : (
//                         <div className='flex justify-end gap-x-[1.5rem]'>
//                             {props.status === 0 ? (
//                                 <button
//                                     className={`px-[10px] py-[5px] text-white rounded-[10px] text-center font-bold ${props.pending ? 'bg-[gray]' : 'bg-[#78006E]'}`}
//                                     onClick={props.popSellForm}
//                                 >
//                                     Sell
//                                 </button>
//                             ) : (
//                                 <button
//                                     className='px-[10px] py-[5px] text-white rounded-[10px] bg-slate-500 text-center font-bold'
//                                     disabled
//                                 >
//                                     Not Available
//                                 </button>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Ignore Confirmation Modal */}
//             {showIgnoreConfirmation && (
//                 <div className="fixed inset-0 flex items-center justify-center z-50">
//                     <div className="fixed inset-0 bg-black opacity-75"></div>
//                     <div className="relative bg-white rounded-lg p-6 z-10 shadow-lg max-w-md mx-auto w-[90%] h-auto">
//                         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Confirm Ignore</h2>
//                         <p className="text-center text-gray-600 mb-6">Are you sure you want to ignore this ticket?</p>

//                         <div className="flex justify-center space-x-4">
//                             <button 
//                                 className="py-2 px-6 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-lg"
//                                 onClick={handleConfirmIgnore}
//                             >
//                                 Yes
//                             </button>
//                             <button 
//                                 className="py-2 px-6 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-semibold text-lg"
//                                 onClick={handleCancelIgnore}
//                             >
//                                 No
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Success Message Modal */}
//             {showSuccessMessage && (
//                 <div className="fixed inset-0 flex items-center justify-center z-50">
//                     <div className="fixed inset-0 bg-black opacity-75"></div>
//                     <div className="relative bg-white rounded-lg p-6 z-10 shadow-lg max-w-md mx-auto w-[90%] h-auto">
//                         <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Success!</h2>
//                         <p className="text-center text-gray-600 mb-6">The ticket has been successfully canceled.</p>

//                         <div className="flex justify-center">
//                             <button 
//                                 className="py-2 px-6 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold text-lg"
//                                 onClick={handleCloseSuccessMessage}
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default MyTicket;

//-----------------------------------------------------

import { useState, useEffect } from 'react';
import { MdLocationPin } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { MdAccessTime } from "react-icons/md";
import { FaTicketAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Vector from '/Vector.png';

function MyTicket(props) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showIgnoreConfirmation, setShowIgnoreConfirmation] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State for success message
    const navigate = useNavigate();
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleIgnore = () => {
        setShowIgnoreConfirmation(true);
    };

    const handleConfirmIgnore = async () => {
        setShowIgnoreConfirmation(false);
        const token = localStorage.getItem('token');

        try {
            await axios.put(
                `http://localhost:8050/notifications/notificationsignore/${props.notificationID}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setShowSuccessMessage(true); // Show success message
        } catch (error) {
            const message = error.response?.data?.message || 'An error occurred while ignoring the ticket.';
            console.error('Error:', message);
            alert(message); // Simple alert for error
        }
    };

    const handleCancelIgnore = () => {
        setShowIgnoreConfirmation(false);
    };

    const handleCloseSuccessMessage = () => {
        setShowSuccessMessage(false);
        navigate('/');
    };



    return (
        <div className={` ${windowWidth > 768 ? 'ticket-big' : 'ticket-small'} w-[55vw] max-md:w-[80%] min-h-[40vh] h-[fit-contnet]  max-md:h-[fit-content] max-md:py-[15px] flex max-md:flex-col items-center justify-start rounded-[10px] relative ${props.status === 1 ? 'bg-gray-300 text-gray-500' : 'bg-white'}`}>
            <div className='w-[65%] max-md:w-[100%] h-[100%] max-md:items-center flex flex-col items-start max-md:gap-y-[1.5rem] justify-evenly  p-[10px]  pl-[35px] pr-[35px]'>
                <div className='flex'>
                    <div className={` text-[2rem] font-bold ${props.status === 1 ? 'text-gray-500' : 'text-[#78006E]'}`}>{props.title}</div>
                </div>
                <div className='flex items-center gap-x-[1rem]'>
                    <div className='font-bold text-[1.5rem]'>{props.location}</div>
                    <MdLocationPin className='text-[1.5rem]'></MdLocationPin>
                </div>
                <div className='flex flex-row-reverse gap-x-[2rem]  max-md:w-[100%] max-md:gap-x-[1rem] max-md:justify-center'>
                    <div className='flex flex-col items-center gap-y-[0.4rem] '>
                        <FaTicketAlt className='text-[1.5rem] font-bold'></FaTicketAlt>
                        <div>{props.type}</div>
                    </div>
                    <div className='flex flex-col items-center gap-y-[0.4rem] '>
                        <MdAccessTime className='text-[1.5rem] font-bold'></MdAccessTime>
                        <div>{props.time}</div>
                    </div>
                    <div className='flex flex-col items-center gap-y-[0.4rem] '>
                        <CiCalendarDate className='text-[1.5rem] text-center font-bold'></CiCalendarDate>
                        <div>{props.date}</div>
                    </div>
                </div>
                {windowWidth > 768 ? <img className='w-[60%] max-md:w-[100%] h-[10px]' src={Vector}></img> : null}

                {props.newPrice ? <div className='h-[40px] font-bold text-[1.2rem]'>Price : {props.newPrice} SR</div> : <div className='h-[40px]'></div>}
                {windowWidth > 768 ?
                    <div>
                        {props.forbuy ? (
                            <div className='flex gap-x-[1.5rem]'>
                                <button className='px-[23px] py-[5px] text-white text-[1.2rem] rounded-[10px] bg-slate-500 text-center font-bold' onClick={handleIgnore}>Ignore</button>
                                <button className='px-[23px] py-[5px] text-white text-[1.2rem] rounded-[10px] bg-[#78006E] text-center font-bold' onClick={props.purchaseForm}>Accept</button>
                            </div>
                        ) : (
                            <div className='flex justify-end gap-x-[1.5rem]'>
                                {props.status === 0 ? (
                                    <button
                                        className={`px-[23px] text-[1.2rem] py-[5px] text-white rounded-[10px] text-center font-bold ${props.pending ? 'bg-[gray]' : 'bg-[#78006E]'}`}
                                        onClick={props.popSellForm}
                                    >
                                        Sell
                                    </button>
                                ) : (
                                    <button
                                        className='px-[10px] text-[1.2rem] py-[5px] text-white rounded-[10px] bg-slate-500 text-center font-bold'
                                        disabled
                                    >
                                        Not Available
                                    </button>
                                )}
                            </div>
                        )
                        }
                    </div>
                    : null}

            </div>

            <div className={`w-[35%] max-md:w-[100%] flex flex-col items-center h-[100%] ${windowWidth > 768 ? 'border-l-[3px]' : 'border-t-[3px]'} border-dashed  border-black p-[10px] max-md:px-[12.5px] pl-[10px] relative`}>
                <div className='w-[100%] h-[100%] flex flex-col justify-evenly items-center relative'>
                    <div className='relative flex justify-center'>
                    {props.showBarcode && <img
                            className={`w-[75%] ${props.status === 1 ? 'filter blur-[5px]' : ''}`}
                            src='https://www.marefa.org/w/images/8/87/QRCode.png'
                            alt="Barcode"
                        />}
                    </div>

                    <div className='relative'>
                        <div className='font-bold'>
                            <span>Ticket code : </span>
                            <span className={`${props.status === 1 ? 'filter blur-[5px]' : ''}`}>
                                {props.code}
                            </span>
                        </div>
                    </div>

                    
                    {windowWidth < 768 ?
                    <div>
                        {props.forbuy ? (
                            <div className='flex gap-x-[1.5rem]'>
                                <button className='px-[23px] text-[1.2rem] py-[5px] text-white rounded-[10px] bg-slate-500 text-center font-bold' onClick={handleIgnore}>Ignore</button>
                                <button className='px-[23px] text-[1.2rem] py-[5px] text-white rounded-[10px] bg-[#78006E] text-center font-bold' onClick={props.purchaseForm}>Accept</button>
                            </div>
                        ) : (
                            <div className='flex justify-end gap-x-[1.5rem]'>
                                {props.status === 0 ? (
                                    <button
                                        className={`px-[23px] text-[1.2rem] py-[5px] text-white rounded-[10px] text-center font-bold ${props.pending ? 'bg-[gray]' : 'bg-[#78006E]'}`}
                                        onClick={props.popSellForm}
                                    >
                                        Sell
                                    </button>
                                ) : (
                                    <button
                                        className='px-[23px] text-[1.2rem] py-[5px] text-white rounded-[10px] bg-slate-500 text-center font-bold'
                                        disabled
                                    >
                                        Not Available
                                    </button>
                                )}
                            </div>
                        )
                        }
                    </div>
                    : null}
                </div>
            </div>

            {/* Ignore Confirmation Modal */}
            {showIgnoreConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-75"></div>
                    <div className="relative bg-white rounded-lg p-6 z-10 shadow-lg max-w-md mx-auto w-[90%] h-auto">
                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Confirm Ignore</h2>
                        <p className="text-center text-gray-600 mb-6">Are you sure you want to ignore this ticket?</p>

                        <div className="flex justify-center space-x-4">
                            <button
                                className="py-2 px-6 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-lg"
                                onClick={handleConfirmIgnore}
                            >
                                Yes
                            </button>
                            <button
                                className="py-2 px-6 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-semibold text-lg"
                                onClick={handleCancelIgnore}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Message Modal */}
            {showSuccessMessage && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black opacity-75"></div>
                    <div className="relative bg-white rounded-lg p-6 z-10 shadow-lg max-w-md mx-auto w-[90%] h-auto">
                        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Success!</h2>
                        <p className="text-center text-gray-600 mb-6">The ticket has been successfully canceled.</p>

                        <div className="flex justify-center">
                            <button
                                className="py-2 px-6 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold text-lg"
                                onClick={handleCloseSuccessMessage}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyTicket;