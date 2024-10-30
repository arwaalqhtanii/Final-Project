import React, { useState, useEffect } from 'react'
import MyTicket from '../components/MyTicket'
import riyadhseasonboulevard from '/riyadhseasonboulevard.jfif'
import { AiOutlineFileSearch } from "react-icons/ai";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SellTicketModal from '../components/SellTicketModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Teckitmanager() {

    const [sellPop, setSellPop] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState()
    const [selectedTicketOldPrice,setSelectedTicketOldPrice] = useState()
    const [tickets, setTickets] = useState([]);
    const token = localStorage.getItem('token');
    const [notifications, setNotifications] = useState([]);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [userLocation, setUserLocation] = useState(null);
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState(null);


    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                setUserLocation(userLocation)
                console.log(userLocation);

            }, (error) => {
                console.error("Error obtaining location: ", error);
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };



    const handleSell = (ticketCode,ticketOldPrice) => {

        setSelectedTicket(ticketCode);
        setSelectedTicketOldPrice(ticketOldPrice)
        setSellPop(true);
        
    };

    const handleCloseSellPopup = () => {
        setSellPop(false);
       
    };




    const fetchTickets = async () => {
        try {
            const response = await axios.get('https://whitetik-project.onrender.com/tickets/Usertickets', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            
            const sortedTickets = response.data.tickets.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
            console.log(sortedTickets);

            setTickets(sortedTickets); 
           

        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };


    useEffect(() => {
        getUserLocation();
        fetchTickets();
    }, []);


    const getDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const DISTANCE_THRESHOLD = 5;



    const fetchTicketsByStatus = async (status) => {
        try {

            if (status === null) {
                fetchTickets();
                return;
            }
            const response = await axios.get(`https://whitetik-project.onrender.com/tickets/ticketsUserstatus/${status}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.tickets && response.data.tickets.length > 0) {
                setTickets(response.data.tickets);
                setMessage('');
            } else {
                setTickets([]);
                setMessage("No tickets found for the selected section.");
            }
        } catch (error) {
            console.error('Error fetching tickets:', error);
            setMessage("An error occurred while fetching tickets. Please try again later.");
        }
    };


    const handleFilter = (status) => {
        fetchTicketsByStatus(status);
        setActiveButton(status);
    };

    const handleSearch = () => {
        const filteredTickets = tickets.filter(ticket =>
            ticket.eventId.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setTickets(filteredTickets);
        setMessage(filteredTickets.length ? '' : 'No matching tickets found.');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };


    return (
        <div>
            {sellPop && (
                <SellTicketModal
                    isOpen={sellPop}
                    onClose={handleCloseSellPopup}
                    event={{ ticketCode: selectedTicket,ticketOldPrice: selectedTicketOldPrice}}
                    update={{ fetchTickets }}

                />
            )}
            <Navbar />

            <div className='w-[100%] h-[40vh] relative  shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'>
                <img className='w-[100%] h-[100%]' src={riyadhseasonboulevard}></img>
                <div className='w-[100%] h-[100%] bg-black opacity-80 absolute top-0'></div>
                <div className='text-white font-bold text-[3rem] text-center w-[100%] absolute top-[20%]'>Manage My Tickets</div>
                <div className='w-[55vw] max-md:w-[80%] h-[fit-content] py-[20px] flex max-md:flex-col-reverse max-md:justify-center gap-y-[10px] justify-between items-center bg-white rounded-[10px] absolute bottom-0 left-[50%] translate-x-[-50%]'>                    
                    <div className='w-[40%] max-md:w-[100%] pl-4 max-md:pl-0 max-md:justify-evenly flex gap-x-[1.5rem] font-bold'>
                    <button
                        className={`h-[40px] rounded-[10px] ${activeButton === null ? ' text-[#78006E] font-bold' : 'text-black font-semibold'} hover:text-[#78006E]`}
                        onClick={() => handleFilter(null)}
                    >
                        All
                    </button>
                    <button
                        className={`h-[40px] rounded-[10px] ${activeButton === 0 ? ' text-[#78006E] font-bold' : 'text-black font-semibold'} hover:text-[#78006E]`}
                        onClick={() => handleFilter(0)}
                    >
                        Available
                    </button>
                    <button
                        className={`h-[40px] rounded-[10px] ${activeButton === 1 ? ' text-[#78006E] font-bold' : 'text-black font-semibold'} hover:text-[#78006E]`}
                        onClick={() => handleFilter(1)}
                    >
                        Not available
                    </button>
                </div>
                    
                    <div className="container w-[60%] max-md:w-[100%] px-5 mx-auto  flex gap-9 flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 ">
                        <div className="flex  items-center w-[100%]   bg-gray-100 p-4 rounded-full shadow-md ">
                            <button className="text-purple-800 ml-4" onClick={handleSearch}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                            <input
                                type="text"
                                placeholder="Search Ticket  by name"
                                className="w-[100%] bg-transparent focus:outline-none text-gray-700 px-4 text-left "
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>


                </div>
            </div>

            <div className='w-[100%] flex flex-col gap-y-[2rem] items-center justify-center py-[10vh] bg-black'>
                {tickets.length > 0 ? (
                    tickets.map((ticket) => {
                        const eventLatitude = ticket.eventId?.Latitude;
                        const eventLongitude = ticket.eventId?.Longitude;
                        const showBarcode = userLocation && eventLatitude && eventLongitude &&
                            getDistance(userLocation.latitude, userLocation.longitude, eventLatitude, eventLongitude) <= DISTANCE_THRESHOLD;

                        return (
                            <MyTicket
                                key={ticket.uniqueCode}
                                title={ticket.eventId?.name} 
                                location={ticket.eventId?.location}
                                date={ticket.visitDate}
                                time={ticket.eventId?.Time}
                                type={ticket.ticketType}
                                code={ticket.uniqueCode}
                                status={ticket.updateStatus}
                                process='Sell'
                                popSellForm={() => handleSell(ticket.uniqueCode,ticket.price)}
                                pending={ticket.notifications?.[0]?.status || null} 
                                showBarcode={showBarcode} 

                            />
                        );
                    })
                ) : (
                    <p className='text-white'>{message || "No tickets available."}</p> 
                )}
            </div>
            <Footer />
        </div>
    )
}

export default Teckitmanager