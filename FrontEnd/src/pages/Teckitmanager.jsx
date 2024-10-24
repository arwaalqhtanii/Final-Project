import React, { useState } from 'react'
import MyTicket from '../components/MyTicket'
import { CiSearch } from "react-icons/ci";
import riyadhseasonboulevard from '/riyadhseasonboulevard.jfif'
import { AiOutlineFileSearch } from "react-icons/ai";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { IoClose } from "react-icons/io5";
import SellTicketModal from '../components/SellTicketModal';
function Teckitmanager() {

    const [sellPop, setSellPop] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState()
    const handleSell = (ticketCode) => {
        setSelectedTicket(ticketCode);
        setSellPop(true);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseSellPopup = () => {
        setSellPop(false);
        document.body.style.overflow = 'auto';
    };
    return (
        <div>
            {sellPop && (
                <SellTicketModal></SellTicketModal>
            )}
            <Navbar />

            <div className='w-[100%] h-[40vh] relative  shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'>
                <img className='w-[100%] h-[100%]' src={riyadhseasonboulevard}></img>
                <div className='w-[100%] h-[100%] bg-black opacity-80 absolute top-0'></div>
                <div className='text-white font-bold text-[3rem] text-center w-[100%] absolute top-[20%]'>Manage My Tickets</div>
                <div className='w-[50%] max-md:w-[80%] h-[30%] flex max-md:flex-col-reverse max-md:justify-center gap-y-[10px] justify-between items-center bg-white rounded-[10px] absolute bottom-0 left-[50%] translate-x-[-50%]'>
                    <div className='w-[40%] max-md:w-[100%] pl-4 max-md:pl-0 max-md:justify-evenly flex gap-x-[1.5rem] font-bold'>
                        <button className=' h-[40px] rounded-[10px] bg-[] hover:text-[#78006E]'>Available</button>
                        <button className=' h-[40px] rounded-[10px] bg-[] hover:text-[#78006E]'>Not available</button>
                    </div>
                    <div className='w-[60%] max-md:w-[100%] max-md:justify-center flex justify-end max-md:pr-0 pr-4'>
                        <input className='w-[80%] h-[40px] rounded-l-[10px] max-md:h-[50px] focus:outline-none px-[10px] border-[1px] border-[#78006E]' type='search'></input>
                        <button className='w-[3vw] max-md:w-[10vw] max-md:h-[50px] flex justify-center items-center bg-[#78006E] h-[40px] rounded-r-lg relative' ><AiOutlineFileSearch className='text-white text-[1.5rem] absolute'></AiOutlineFileSearch></button>
                    </div>

                </div>
            </div>

            <div className='w-[100%] flex flex-col gap-y-[2rem] items-center justify-center py-[10vh] bg-black'>
                <MyTicket
                    title='WWE RAW'
                    location='RIYADH'
                    date='17 - 04'
                    time='7:30 PM'
                    type='GOLD'
                    code='265'
                    Available={true}
                    popSellForm={() => handleSell('265')}

                ></MyTicket>
                <MyTicket
                    title='WWE RAW'
                    location='RIYADH'
                    date='17 - 04'
                    time='7:30 PM'
                    type='GOLD'
                    code='265'
                    Available={false}
                    popSellForm={() => handleSell('265')}

                ></MyTicket>

            </div>
            <Footer />
        </div>
    )
}

export default Teckitmanager