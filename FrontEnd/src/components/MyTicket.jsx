import React from 'react';
import { MdLocationPin } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { MdAccessTime } from "react-icons/md";
import { FaTicketAlt } from "react-icons/fa";


import Vector from '/Vector.png';

function MyTicket(props) {
    return (
        <div className='w-[60vw] max-md:w-[80%] h-[50vh] max-md:h-[fit-content] max-md:py-[15px] flex max-md:flex-col justify-start rounded-[10px] bg-white relative'>
        <div className='w-[60vw] max-md:w-[80%] py-[15px] flex flex-col gap-y-[0.5rem] h-[fit-content]  rounded-[10px] bg-white relative'>
            <div className='flex max-md:  max-md:flex-col justify-start'>
                <div className='w-[55%] max-md:w-[100%] max-md:gap-y-[1rem] h-[100%] flex flex-col justify-between gap-y-[2rem] items-start px-[15px]'>
                    <div className='flex max-md:pt-[3rem]'>
                        <div className='text-[#78006E] text-[2rem] font-bold '>{props.title}</div>
                    </div>
                    <div className='flex items-center gap-x-[1rem]'>
                        <div className='font-bold text-[1.5rem]'>{props.location}</div>
                        <MdLocationPin className='text-[1.5rem]'></MdLocationPin>
                    </div>
                    <div className='flex flex-row-reverse max-md:w-[100%] max-md:gap-x-[1rem] max-md:justify-center'>
                        <div className='flex flex-col items-center gap-y-[0.7rem] px-[10px]'>
                            <FaTicketAlt className='text-[1.5rem] font-bold'></FaTicketAlt>
                            <div>{props.type}</div>
                        </div>
                        <div className='flex flex-col items-center gap-y-[0.7rem] px-[10px]'>
                            <MdAccessTime className='text-[1.5rem] font-bold'></MdAccessTime>
                            <div>{props.time}</div>
                        </div>
                        <div className='flex flex-col items-center gap-y-[0.7rem] px-[10px]'>
                            <CiCalendarDate className='text-[1.5rem] text-center font-bold'></CiCalendarDate>
                            <div>{props.date}</div>
                        </div>
                    </div>
                    <img className='w-[60%] max-md:w-[100%] h-[10px]' src={Vector}></img>

                </div>
                <div className='bg-green-500 absolute  max-md:h-[fit-content] py-[15px] px-[15px] max-md:text-[1.2rem] top-0 right-2 h-[20%] flex justify-center items-center text-white border-dashed border-t-[5px] custom-dashed-border  border-white'>
                    {props.status}
                </div>
                <div className='w-[30%] max-md:w-[100%] h-[100%] flex justify-end'>

                    <div className='flex flex-col max-md:flex-col-reverse gap-y-[5px] items-center justify-center w-[100%] h-[100%]'>
                        <img className='max-md:w-[60%]' src='https://www.marefa.org/w/images/8/87/QRCode.png'></img>
                        <div className='flex flex-col items-center'>
                            <div className='text-gray-500 font-bold max-md:text-[1.5rem]'>Ticket Code</div>
                            <div className='font-bold max-md:text-[1.2rem]'>{props.code}</div>
                        </div>

                    </div>

                </div>

            </div>

            <div className=' flex flex-col items-center justify-start w-[15%] max-md:w-[40%] px-[15px]'>
                <button className='px-[23px] max-md:text-[1.5rem] w-[100%] py-[5px] rounded-[5px] text-white bg-[#78006e] hover:bg-[#be008d]' onClick={props.popSellForm}>{props.process}</button>
            </div>

        </div>
        </div>
    );
}

export default MyTicket;