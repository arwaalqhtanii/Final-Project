
// import React, { useState } from 'react'

// import MyTicket from '../components/MyTicket'
// import { CiSearch } from "react-icons/ci";
// import riyadhseasonboulevard from '/riyadhseasonboulevard.jfif'
// import { AiOutlineFileSearch } from "react-icons/ai";
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import { IoClose } from "react-icons/io5";
// import SellTicketModal from '../components/SellTicketModal';
// function Teckitmanager() {

//     const [sellPop, setSellPop] = useState(false);
//     const [selectedTicket, setSelectedTicket] = useState()
//     const handleSell = (ticketCode) => {
//         setSelectedTicket(ticketCode);
//         setSellPop(true);
//         document.body.style.overflow = 'hidden';
//     };

//     const handleCloseSellPopup = () => {
//         setSellPop(false);
//         document.body.style.overflow = 'auto';

//     };
//     return (
//         <div>
//             {sellPop && (
//                 <SellTicketModal
//                     isOpen={sellPop}
//                     onClose={handleCloseSellPopup}
//                     event={{ ticketCode: selectedTicket }}
//                 />
//             )}
//             <Navbar />

//             <div className='w-[100%] h-[40vh] relative  shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'>
//                 <img className='w-[100%] h-[100%]' src={riyadhseasonboulevard}></img>
//                 <div className='w-[100%] h-[100%] bg-black opacity-80 absolute top-0'></div>
//                 <div className='text-white font-bold text-[3rem] text-center w-[100%] absolute top-[20%]'>Manage My Tickets</div>
//                 <div className='w-[50%] max-md:w-[80%] h-[30%] flex max-md:flex-col-reverse max-md:justify-center gap-y-[10px] justify-between items-center bg-white rounded-[10px] absolute bottom-0 left-[50%] translate-x-[-50%]'>
//                     <div className='w-[40%] max-md:w-[100%] pl-4 max-md:pl-0 max-md:justify-evenly flex gap-x-[1.5rem] font-bold'>
//                         <button className=' h-[40px] rounded-[10px] bg-[] hover:text-[#78006E]'>Available</button>
//                         <button className=' h-[40px] rounded-[10px] bg-[] hover:text-[#78006E]'>Not available</button>
//                     </div>
//                     <div className='w-[60%] max-md:w-[100%] max-md:justify-center flex justify-end max-md:pr-0 pr-4'>
//                         <input className='w-[80%] h-[40px] rounded-l-[10px] max-md:h-[50px] focus:outline-none px-[10px] border-[1px] border-[#78006E]' type='search'></input>
//                         <button className='w-[3vw] max-md:w-[10vw] max-md:h-[50px] flex justify-center items-center bg-[#78006E] h-[40px] rounded-r-lg relative' ><AiOutlineFileSearch className='text-white text-[1.5rem] absolute'></AiOutlineFileSearch></button>
//                     </div>

//                 </div>
//             </div>

//             <div className='w-[100%] flex flex-col gap-y-[2rem] items-center justify-center py-[10vh] bg-black'>
//                 <MyTicket
//                     title='WWE RAW'
//                     location='RIYADH'
//                     date='17 - 04'
//                     time='7:30 PM'
//                     type='GOLD'
//                     code='265'
//                     Available={true}
//                     popSellForm={() => handleSell('265')}

//                 ></MyTicket>
//                 <MyTicket
//                     title='WWE RAW'
//                     location='RIYADH'
//                     date='17 - 04'
//                     time='7:30 PM'
//                     type='GOLD'
//                     code='265'
//                     Available={false}
//                     popSellForm={() => handleSell('265')}

//                 ></MyTicket>

//             </div>
//             <Footer />
//         </div>
//     )
// }

// export default Teckitmanager


// مع اللوكيشن 
import React, { useState, useEffect } from 'react';
import MyTicket from '../components/MyTicket';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SellTicketModal from '../components/SellTicketModal';
import riyadhseasonboulevard from '/riyadhseasonboulevard.jfif';
import { AiOutlineFileSearch } from "react-icons/ai";

function Teckitmanager() {
    const [sellPop, setSellPop] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [error, setError] = useState(null);
    const [events, setEvents] = useState([]);
    const [showBarcode, setShowBarcode] = useState(false);

    const handleSell = (ticketCode) => {
        setSelectedTicket(ticketCode);
        setSellPop(true);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseSellPopup = () => {
        setSellPop(false);
        document.body.style.overflow = 'auto';
    };

    // api حق الفعاليات
    useEffect(() => {
        const apiUrl = "http://localhost:8050/event/allevents";
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => setEvents(data))
            .catch((error) => {
                console.error("Error fetching events:", error);
                setError("Error fetching events. Please try again later.");
            });
    }, []);

//   موقع اليوزر 
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => setError(error.message)
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };

    // يتاكد من الموقع والتاريخ
    useEffect(() => {
        getLocation();

        const today = new Date().toISOString().split('T')[0];
        const checkUserLocation = () => {
            const isUserAtEventLocation = events.some((event) => {
                const distance = Math.sqrt(
                    Math.pow(location.latitude - event.latitude, 2) +
                    Math.pow(location.longitude - event.longitude, 2)
                );
                const distanceThreshold = 0.01;
                return distance < distanceThreshold && event.date === today;
            });

            setShowBarcode(isUserAtEventLocation);
        };

        if (location.latitude && location.longitude) {
            checkUserLocation();
        }
    }, [location, events]);

    return (
        <div>
            {sellPop && (
                <SellTicketModal
                    isOpen={sellPop}
                    onClose={handleCloseSellPopup}
                    event={{ ticketCode: selectedTicket }}
                />
            )}
            <Navbar />

            <div className="w-full h-[40vh] relative shadow-md">
                <img className="w-full h-full object-cover" src={riyadhseasonboulevard} alt="Riyadh Season Boulevard"/>
                <div className="absolute top-0 w-full h-full bg-black opacity-80"></div>
                <div className="absolute top-[20%] w-full text-center text-white font-bold text-3xl md:text-4xl lg:text-5xl">
                    Manage My Tickets
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 md:w-3/4 lg:w-1/2 flex flex-col md:flex-row justify-between items-center bg-white rounded-lg p-4 gap-4">
                    <div className="flex gap-x-4 font-bold text-sm md:text-base">
                        <button className="hover:text-[#78006E]">Available</button>
                        <button className="hover:text-[#78006E]">Not available</button>
                    </div>
                    <div className="flex w-full md:w-auto">
                        <input className="flex-grow border border-[#78006E] rounded-l-lg p-2" type="search" placeholder="Search tickets..." />
                        <button className="bg-[#78006E] rounded-r-lg p-2">
                            <AiOutlineFileSearch className="text-white text-lg md:text-xl" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col items-center justify-center py-20 bg-black text-white space-y-10 px-4">
                <MyTicket
                    title='WWE RAW'
                    location='RIYADH'
                    date='17 - 04'
                    time='7:30 PM'
                    type='GOLD'
                    code='265'
                    Available={true}
                    showBarcode={showBarcode}
                    popSellForm={() => handleSell('265')}
                />
                <MyTicket
                    title='Concert'
                    location='JEDDAH'
                    date='20 - 04'
                    time='8:00 PM'
                    type='VIP'
                    code='789'
                    Available={false}
                    showBarcode={showBarcode}
                    popSellForm={() => handleSell('789')}
                />
            </div>

            <Footer />
        </div>
    );
}

export default Teckitmanager;
