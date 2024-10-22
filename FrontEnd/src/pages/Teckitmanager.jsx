import React, { useState } from 'react'
import MyTicket from '../components/MyTicket'
import { CiSearch } from "react-icons/ci";
import riyadhseasonboulevard from '/riyadhseasonboulevard.jfif'
import { AiOutlineFileSearch } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

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
        
        <div className='relative'>
            <Navbar/>
            {sellPop && (
                <div className='fixed inset-0 flex items-center justify-center z-[9999]'>
                    <div className='fixed inset-0 bg-black opacity-80'></div>
                    <div className='flex flex-col items-center justify-evenly w-[40%] h-[40vh] bg-white rounded-[10px] z-[9999999] p-[20px]'>
                        <div className='w-[100%] text-[1.5rem] font-bold flex justify-between'>
                            <div>Sell your Ticket</div>
                            <button onClick={handleCloseSellPopup}>
                                <IoClose className='text-[2rem]' />
                            </button>
                        </div>
                        <div className='font-bold text-[1.5rem]'>Ticket Code: {selectedTicket}</div>
                        <div className='font-bold text-[1.2rem]'>TO</div>
                        <input className='px-[10px] w-[60%] h-[50px] rounded-[10px] border-[1px] border-[#78006E]' placeholder="Buyer's Email" />
                        <button className='px-[23px] py-[5px] rounded-[5px] text-white bg-[#78006e] hover:bg-[#be008d]'>
                            Sell
                        </button>
                    </div>
                </div>
            )}


            <div className=''>

            </div>
            <div className='w-[100%] h-[40vh] relative  shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'>
                <img className='w-[100%] h-[100%]' src={riyadhseasonboulevard}></img>
                <div className='w-[100%] h-[100%] bg-black opacity-80 absolute top-0'></div>
                <div className='text-white font-bold text-[3rem] text-center w-[100%] absolute top-[20%]'>Manage My Tickets</div>
                <div className='w-[60%] max-md:w-[80%] h-[30%] flex max-md:flex-col-reverse max-md:justify-center gap-y-[10px] justify-between items-center bg-white rounded-[10px] absolute bottom-0 left-[50%] translate-x-[-50%]'>
                    <div className='w-[40%] max-md:w-[100%] pl-4 max-md:pl-0 max-md:justify-evenly flex gap-x-[1.5rem] font-bold'>
                        <button className='px-[16px] h-[40px] rounded-[10px] bg-[] hover:text-[#78006E]'>Available</button>
                        <button className='px-[5px] h-[40px] rounded-[10px] bg-[] hover:text-[#78006E]'>Not available</button>
                        <button className='px-[16px] h-[40px] rounded-[10px] bg-[] hover:text-[#78006E]'>Expired</button>

                    </div>
                    <div className='w-[60%] max-md:w-[100%] max-md:justify-center flex justify-end max-md:pr-0 pr-4'>
                        <input className='w-[80%] h-[40px] rounded-l-[10px] max-md:h-[50px] border-[1px] border-[#78006E]' type='search'></input>
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
                    status='Available'
                    popSellForm={() => handleSell('265')}
                ></MyTicket>
                <MyTicket
                    title='WWE RAW'
                    location='RIYADH'
                    date='17 - 04'
                    time='7:30 PM'
                    type='GOLD'
                    code='266'
                    status='Available'
                    popSellForm={() => handleSell('266')}
                ></MyTicket>

            </div>
      <Footer/>
        </div>
    )
}

export default Teckitmanager
