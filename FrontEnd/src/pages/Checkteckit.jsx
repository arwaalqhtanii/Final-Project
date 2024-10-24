import React, { useState } from 'react'
import riyadhseasonboulevard from '/riyadhseasonboulevard.jfif'
import ticketIcon from '/ticket.png'
import MyTicket from '../components/MyTicket'
import { AiOutlineFileSearch } from "react-icons/ai";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


function Checkteckit() {
    const [ticketForCheck, setTicketForCheck] = useState(true)

    function featchTicket() {

    }
    return (
        <div>
            <Navbar/>

            <div className='w-[100%] h-[100vh] relative'>
                <img className='w-[100%] h-[100%]' src={riyadhseasonboulevard}></img>
                <div className='w-[100%] h-[100%] bg-black opacity-80 absolute top-0'></div>
                <div className='max-md:w-[100%]  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-y-[3rem] items-center'>
                    <div className='text-white font-bold text-[3rem]'>تحقق من صلاحية التذكرة</div>

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
                                newPrice='95'
                                Available={true}
                                forbuy={true}
                            ></MyTicket>
                        </div>

                        : <div className='w-[100%] h-[40vh] '>

                        </div>
                    }

                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Checkteckit
