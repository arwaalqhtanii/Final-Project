import { useState, useEffect } from 'react';
import { MdLocationPin } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { MdAccessTime } from "react-icons/md";
import { FaTicketAlt } from "react-icons/fa";

import Vector from '/Vector.png';

function MyTicket(props) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    console.log("pending ticketmanager "+ props.pending);

    useEffect(() => {
        // Function to handle screen resize
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Add event listener to track window resizing
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={` ${windowWidth > 700 ? 'ticket-big' : 'ticket-small'} w-[50vw] max-md:w-[80%] h-[40vh]  max-md:h-[fit-content] max-md:py-[15px] flex max-md:flex-col max-md:items-center justify-start rounded-[10px] relative ${props.status === 1 ? 'bg-gray-300 text-gray-500' : 'bg-white'}`}>
            <div className='w-[65%] max-md:w-[100%] h-[100%] max-md:items-center flex flex-col items-start max-md:gap-y-[1.5rem] justify-evenly  p-[10px]  pl-[35px] pr-[35px]'>
                <div className='flex'>
                    <div className={` text-[2rem] font-bold ${props.status === 1 ? 'text-gray-500' : 'text-[#78006E]'}`}>{props.title}</div>
                </div>
                <div className='flex items-center gap-x-[1rem]'>
                    <div className='font-bold text-[1.5rem]'>{props.location}</div>
                    <MdLocationPin className='text-[1.5rem]'></MdLocationPin>
                </div>
                <div className='flex flex-row-reverse gap-x-[1rem]  max-md:w-[100%] max-md:gap-x-[1rem] max-md:justify-center'>
                    <div className='flex flex-col items-center gap-y-[0.7rem] '>
                        <FaTicketAlt className='text-[1.5rem] font-bold'></FaTicketAlt>
                        <div>{props.type}</div>
                    </div>
                    <div className='flex flex-col items-center gap-y-[0.7rem] '>
                        <MdAccessTime className='text-[1.5rem] font-bold'></MdAccessTime>
                        <div>{props.time}</div>
                    </div>
                    <div className='flex flex-col items-center gap-y-[0.7rem] '>
                        <CiCalendarDate className='text-[1.5rem] text-center font-bold'></CiCalendarDate>
                        <div>{props.date}</div>
                    </div>
                </div>
                {windowWidth > 700 ? <img className='w-[60%] max-md:w-[100%] h-[10px]' src={Vector}></img> : null}

                {props.newPrice ? <div className='h-[40px] font-bold text-[1.2rem]'>Price : {props.newPrice} SR</div> : <div className='h-[40px]'></div>}
            </div>

            <div className={`w-[35%] max-md:w-[100%] h-[100%] ${windowWidth > 700 ? 'border-l-[3px]' : 'border-t-[3px]'} border-dashed  border-black p-[10px] max-md:px-[12.5px] pl-[10px] relative`}>
                <div className='w-[100%] h-[100%] flex flex-col justify-evenly items-center relative'>
                    {/* QR Code Section */}
                    <div className='relative flex justify-center'>
                        {/* QR Code with conditional blur effect */}
                        <img
                            className={`w-[75%] ${props.status === 1 ? 'filter blur-[5px]' : ''}`}
                            src='https://www.marefa.org/w/images/8/87/QRCode.png'
                            alt="Barcode"
                        />
                    </div>

                    {/* Code Section */}
                    <div className='relative'>
                        <div className='font-bold'>
                            <span>Ticket code : </span>
                            
                            <span className={`${props.status === 1 ? 'filter blur-[5px]' : ''}`}>
                                {props.code}
                            </span>
                        </div>
                    </div>


                    {props.forbuy ? (
                        <div className='flex gap-x-[1.5rem]'>
                            <button className='px-[10px] py-[5px] text-white rounded-[10px] bg-slate-500 text-center font-bold' onClick={props.ignore}>ignore</button>
                            <button className='px-[10px] py-[5px] text-white rounded-[10px] bg-[#78006E] text-center font-bold' onClick={props.purchaseForm}>accept</button>
                        </div>
                    ) : (
                        <div className='flex justify-end gap-x-[1.5rem]'>
                            {props.status === 0 ? (
                                <button
                                className={`px-[10px] py-[5px] text-white rounded-[10px] text-center font-bold ${props.pending === '1' ? 'bg-gray-500' : 'bg-[#78006E]'}`}
                                onClick={props.pending === '1' ? null : props.popSellForm}
                            >
                                    Sell
                                </button>
                            ) : (
                                <button
                                    className='px-[10px] py-[5px] text-white rounded-[10px] bg-slate-500 text-center font-bold'
                                    disabled
                                >
                                    Not Available
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyTicket;