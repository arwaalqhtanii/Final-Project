import React from 'react';
import { MdLocationPin } from "react-icons/md";
import Vector from '/Vector.png';

function MyTicket(props) {
    return (
        <div className='w-[60vw] max-md:w-[80%] h-[50vh] max-md:h-[fit-content] max-md:py-[15px] flex max-md:flex-col justify-start rounded-[10px] bg-white relative'>

            <div className='w-[55%] max-md:w-[100%] max-md:gap-y-[1rem] h-[100%] flex flex-col justify-between items-start p-[15px]'>
                <div className='flex max-md:pt-[3rem]'>
                    <div className='text-[#78006E] text-[2rem] font-bold '>{props.title}</div>
                </div>
                <div className='flex items-center gap-x-[1rem]'>
                    <div className='font-bold text-[1.5rem]'>{props.location}</div>
                    <MdLocationPin className='text-[1.5rem]'></MdLocationPin>
                </div>
                <div className='flex flex-row-reverse max-md:w-[100%] max-md:gap-x-[1rem] max-md:justify-center'>
                    <div className='flex-col items-center gap-y-[3rem] px-[10px]'>
                        <div className='text-center font-bold'>Type</div>
                        <div>{props.type}</div>
                    </div>
                    <div className='flex-col items-center gap-y-[3rem] px-[10px]'>
                        <div className='text-center font-bold'>Time</div>
                        <div>{props.time}</div>
                    </div>
                    <div className='flex-col items-center gap-y-[3rem] px-[10px]'>
                        <div className='text-center font-bold'>Date</div>
                        <div>{props.date}</div>
                    </div>
                </div>
                <img className='w-[60%] max-md:w-[100%] h-[10px]' src={Vector}></img>
                <div className=' flex flex-col justify-end'>
                    <button className='px-[23px] max-md:text-[1.5rem] py-[5px] rounded-[5px] text-white bg-[#78006e] hover:bg-[#be008d]' onClick={props.popSellForm}>SELL</button>
                </div>
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
    );
}

export default MyTicket;


