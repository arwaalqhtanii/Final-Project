
import React, { useState } from 'react'
import riyadhseasonboulevard from '/riyadhseasonboulevard.jfif'
import ticketIcon from '/ticket.png'
import MyTicket from '../components/MyTicket'
import { AiOutlineFileSearch } from "react-icons/ai";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


function Checkteckit() {
    const [ticketForCheck, setTicketForCheck] = useState()

    function featchTicket() {

    }
    return (
        <div>
            <Navbar/>
            <div className=''>

            </div>
            <div className='w-[100%] h-[110vh] relative'>
                <img className='w-[100%] h-[100%]' src={riyadhseasonboulevard}></img>
                <div className='w-[100%] h-[100%] bg-black opacity-80 absolute top-0'></div>
                <div className='max-md:w-[100%]  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-y-[3rem] items-center'>
                    <div className='text-white font-bold text-[3rem]'>Check the ticket validity</div>
                    <div className='flex justify-center'>
                        <input className='w-[20vw] max-md:w-[70vw] h-[40px] rounded-l-lg focus:outline-none px-[10px]' placeholder='Enter Ticket code' value={ticketForCheck} onChange={(e) => { setTicketForCheck(e.target.value) }} type='search'></input>
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
                                process='Buy'
                            ></MyTicket>
                        </div>

                        : <div className='w-[100%] h-[50vh] '>

                        </div>
                    }

                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Checkteckit