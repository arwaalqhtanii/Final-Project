import { useState, useEffect } from 'react';
import { MdLocationPin } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { MdAccessTime } from "react-icons/md";
import { FaTicketAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react'; 
import Vector from '/Vector.png';

function MyTicket(props) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showIgnoreConfirmation, setShowIgnoreConfirmation] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const navigate = useNavigate();

    console.log("showBarcode"+ props.showBarcode);
    
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
                `https://whitetik-project.onrender.com/notifications/notificationsignore/${props.notificationID}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setShowSuccessMessage(true);
        } catch (error) {
            const message = error.response?.data?.message || 'An error occurred while ignoring the ticket.';
            console.error('Error:', message);
            alert(message);
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
            <div className='w-[65%] max-md:w-[100%] h-[100%] max-md:items-center flex flex-col items-start max-md:gap-y-[1.5rem] max-sm:gap-y-[1rem] gap-y-[0.7rem]  p-[10px]  pl-[35px] pr-[35px]'>
                <div className='flex'>
                    <div className={` text-[2rem] font-bold ${props.status === 1 ? 'text-gray-500' : 'text-[#78006E]'}`}>{props.title}</div>
                </div>
                <div className='flex max-sm:justify-start max-sm:w-[100%] items-center gap-x-[1rem]'>
                    <div className=' text-gray-500 '>{props.location}</div>
                    <MdLocationPin className='text-[1.5rem]'></MdLocationPin>
                </div>
                <div className='flex flex-row-reverse gap-x-[2rem]  max-md:w-[100%] max-md:gap-x-[1rem] max-md:justify-center'>
                    <div className='flex flex-col items-center gap-y-[0.4rem] '>
                        <FaTicketAlt 
                            style={{
                                color: 
                                props.type === 'standard' ? 'black' : 
                                props.type === 'silver' ? 'gray' : 
                                props.type === 'gold' ? 'gold' : 'black'
                            }}
                        className='text-[1.5rem]  font-bold'></FaTicketAlt>
                        <div className=' max-sm:text-[0.8rem]'>{props.type}</div>
                    </div>
                    <div className='flex flex-col items-center gap-y-[0.4rem] '>
                        <MdAccessTime className='text-[1.5rem] font-bold'></MdAccessTime>
                        <div className=' max-sm:text-[0.8rem]'>{props.time}</div>
                    </div>
                    <div className='flex flex-col items-center gap-y-[0.4rem] '>
                        <CiCalendarDate className='text-[1.5rem] text-center font-bold'></CiCalendarDate>
                        <div className=' max-sm:text-[0.8rem]'>{props.date}</div>
                    </div>
                </div>
                {windowWidth > 768 ? <img className='w-[60%] max-md:w-[100%] h-[10px]' src={Vector}></img> : null}

                {props.newPrice ? <div className='h-[40px] font-bold text-[1.2rem]'>Price : {props.newPrice} SR</div> : <div className='h-[]'></div>}
                {windowWidth > 768 ?
                    <div>
                        {props.forbuy ? (
                            <div className='flex gap-x-[1.5rem]'>
                                <button className='px-[23px] py-[5px] text-white text-[1.2rem] rounded-[10px] bg-slate-500 hover:bg-gray-400 text-center ' onClick={handleIgnore}>Ignore</button>
                                <button className='px-[23px] py-[5px] text-white text-[1.2rem] rounded-[10px] bg-[#78006e] hover:bg-[#be008d] text-center ' onClick={props.purchaseForm}>Accept</button>
                            </div>
                        ) : (
                            <div className='flex justify-end gap-x-[1.5rem]'>
                                {props.status === 0 ? (
                                    <button
                                        className={`px-[23px] text-[1.2rem] py-[5px] text-white rounded-[10px] text-center  ${props.pending ? 'bg-gray-400 ' : 'bg-[#78006e] hover:bg-[#be008d]'
                                            }`}
                                        onClick={props.pending ? null : props.popSellForm}
                                        disabled={props.pending}
                                    >
                                        {props.pending ? 'Pending' : 'Sell'}
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
                        )}
                    </div>
                    : null}
            </div>

            <div className={`w-[35%] max-md:w-[100%]  flex flex-col items-center justify-center min-h-[40vh] max-md:min-h-[35%] h-[fit-contnet] ${windowWidth > 768 ? 'border-l-[3px]' : 'border-t-[3px]'} border-dashed border-black p-[10px] max-md:px-[12.5px] pl-[10px] relative`}>
                <div className='w-[100%] h-[100%] flex flex-col justify-evenly max-md:gap-y-[1rem] items-center relative'>
                    <div className='relative flex items-center justify-center'>
                        
                            <QRCodeCanvas
                                value={props.code}
                                size={150}
                                className={`${props.status === 1 && props.showBarcode ? '' : 'filter blur-[5px]'}`}
                                />
                        
                    </div>


                    {windowWidth < 768 ?
                        <div>
                            {props.forbuy ? (
                                <div className='flex gap-x-[1.5rem]'>
                                    <button className='px-[23px] text-[1.2rem] py-[5px] text-white rounded-[10px] bg-slate-500 hover:bg-gray-400 text-center ' onClick={handleIgnore}>Ignore</button>
                                    <button className='px-[23px] text-[1.2rem] py-[5px] text-white rounded-[10px] bg-[#78006e] hover:bg-[#be008d] text-center ' onClick={props.purchaseForm}>Accept</button>
                                </div>
                            ) : (
                                <div className='flex justify-end gap-x-[1.5rem]'>
                                    {props.status === 0 ? (
                                        <button
                                            className={`px-[23px] text-[1.2rem] py-[5px] text-white rounded-[10px] text-center  ${props.pending ? 'bg-gray-400' : 'bg-[#78006e] hover:bg-[#be008d]'
                                                }`}
                                            onClick={props.pending ? null : props.popSellForm}
                                            disabled={props.pending}
                                        >
                                            {props.pending ? 'Pending' : 'Sell'}
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
                            )}
                        </div>
                        : null}
                </div>
            </div>


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