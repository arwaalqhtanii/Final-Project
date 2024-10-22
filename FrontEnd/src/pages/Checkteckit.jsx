import React, { useState } from 'react'
import riyadhseasonboulevard from '/riyadhseasonboulevard.jfif'
import ticketIcon from '/ticket.png'
import MyTicket from '../components/MyTicket'
import { AiOutlineFileSearch } from "react-icons/ai";


function Checkteckit() {
    const [ticketForCheck, setTicketForCheck] = useState(true)

    function featchTicket() {

    }
    return (
        <div>
            <div className='w-[100%] h-[10vh] bg-[#78006E]'>

            </div>
            <div className='w-[100%] h-[100vh] relative'>
                <img className='w-[100%] h-[100%]' src={riyadhseasonboulevard}></img>
                <div className='w-[100%] h-[100%] bg-black opacity-80 absolute top-0'></div>
                <div className='max-md:w-[100%]  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-y-[3rem] items-center'>
                    <div className='text-white font-bold text-[3rem]'>تحقق من صلاحية التذكرة</div>
                    <div className='flex justify-center'>
                        <input className='w-[20vw] max-md:w-[70vw] h-[40px] rounded-l-lg focus:outline-none text-right px-[5px]' placeholder='أدخل رقم التذكرة' value={ticketForCheck} onChange={(e) => { setTicketForCheck(e.target.value) }} type='search'></input>
                        <button className='w-[3vw] max-md:w-[10vw] flex justify-center items-center bg-[#78006E] h-[40px] rounded-r-lg relative' onClick={featchTicket}><AiOutlineFileSearch className='text-white text-[1.5rem] absolute'></AiOutlineFileSearch></button>
                    </div>
                    {ticketForCheck ?
                        <div className='w-[100%] flex justify-center'>
                            <MyTicket
                                title='WWE RAW'
                                location='RIYADH'
                                date='17 - 04'
                                time='7:30 PM'
                                type='GOLD'
                                code='265'
                                status='Available'
                            ></MyTicket>
                        </div>

                        : <div className='w-[100%] h-[40vh] '>

                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default Checkteckit