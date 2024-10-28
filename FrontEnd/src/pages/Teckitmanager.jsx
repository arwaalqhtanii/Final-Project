
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
    const [tickets, setTickets] = useState([]);
    const token = localStorage.getItem('token');
    const [notifications, setNotifications] = useState([]); // State for notifications
    const[message,setMessage]=useState('');
    const [userLocation, setUserLocation] = useState(null);

  

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                setUserLocation(userLocation)
                console.log(userLocation);
                // Use the location as needed
            }, (error) => {
                console.error("Error obtaining location: ", error);
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!token) {
            navigate('/'); // Redirect to home page if not logged in
        }
    }, [token, navigate]);
    
    

    const handleSell = (ticketCode) => {

        setSelectedTicket(ticketCode);
        setSellPop(true);
        // document.body.style.overflow = 'hidden';
    };

    const handleCloseSellPopup = () => {
        setSellPop(false);
        // document.body.style.overflow = 'auto';
    };




    const fetchTickets = async () => {
        try {
            const response = await axios.get('http://localhost:8050/tickets/Usertickets', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Sort tickets by purchaseDate in descending order (most recent first)
            const sortedTickets = response.data.tickets.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
            console.log(sortedTickets);

            setTickets(sortedTickets); // Set the sorted tickets
            // setNotifications(response.data.tickets.flatMap(ticket => ticket.notifications || []));

        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };

   
    useEffect(() => {
        getUserLocation();
        fetchTickets(); // Initial fetch
    }, []);

   
 

    const fetchTicketsByStatus = async (status) => {
        try {
            const response = await axios.get(`http://localhost:8050/tickets/ticketsUserstatus/${status}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            if (response.data.tickets && response.data.tickets.length > 0) {
                setTickets(response.data.tickets);
                setMessage(''); // Clear message if tickets are found
            } else {
                setTickets([]); // Clear tickets if none found
                setMessage( "No tickets found for the selected section."); // Display server message
            }
        } catch (error) {
            console.error('Error fetching tickets:', error);
            setMessage("An error occurred while fetching tickets. Please try again later.");
        }
    };
    

    const handleFilter = (status) => {
        fetchTicketsByStatus(status);
    };



    return (
        <div>
            {sellPop && (
                <SellTicketModal
                    isOpen={sellPop}
                    onClose={handleCloseSellPopup}
                    event={{ ticketCode: selectedTicket }}
                    update={{fetchTickets}}
                   
                />
            )}
            <Navbar />

            <div className='w-[100%] h-[40vh] relative  shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'>
                <img className='w-[100%] h-[100%]' src={riyadhseasonboulevard}></img>
                <div className='w-[100%] h-[100%] bg-black opacity-80 absolute top-0'></div>
                <div className='text-white font-bold text-[3rem] text-center w-[100%] absolute top-[20%]'>Manage My Tickets</div>
                <div className='w-[55vw] max-md:w-[80%] h-[fit-content] py-[20px] flex max-md:flex-col-reverse max-md:justify-center gap-y-[10px] justify-between items-center bg-white rounded-[10px] absolute bottom-0 left-[50%] translate-x-[-50%]'>
                    <div className='w-[40%] max-md:w-[100%] pl-4 max-md:pl-0 max-md:justify-evenly flex gap-x-[1.5rem] font-bold'>
                        <button className=' h-[40px] rounded-[10px] bg-[] hover:text-[#78006E]' onClick={() => handleFilter(0)}>Available</button>
                        <button className=' h-[40px] rounded-[10px] bg-[] hover:text-[#78006E]' onClick={() => handleFilter(1)}>Not available</button>
                    </div>
                    <div className='w-[60%] max-md:w-[100%] max-md:justify-center flex justify-end max-md:pr-0 pr-4'>
                        <input className='w-[80%] h-[40px] rounded-l-[10px] max-md:h-[50px] focus:outline-none px-[10px] border-[1px] border-[#78006E]' type='search'></input>
                        <button className='w-[3vw] max-md:w-[10vw] max-md:h-[50px] flex justify-center items-center bg-[#78006E] h-[40px] rounded-r-lg relative' ><AiOutlineFileSearch className='text-white text-[1.5rem] absolute'></AiOutlineFileSearch></button>
                    </div>

                </div>
            </div>

            <div className='w-[100%] flex flex-col gap-y-[2rem] items-center justify-center py-[10vh] bg-black'>
            {tickets.length > 0 ? (
    tickets.map((ticket) => {
        // const showBarcode = ticket.eventId && ticket.eventId.googlemaplink === userLocation;
        const eventLatitude = ticket.eventId?.Latitude;
        const eventLongitude = ticket.eventId?.Longitude;
        const showBarcode = userLocation && eventLatitude && eventLongitude &&
            getDistance(userLocation.latitude, userLocation.longitude, eventLatitude, eventLongitude) <= DISTANCE_THRESHOLD;

        return ( // Use return here to return the JSX
            <MyTicket
                key={ticket.uniqueCode}
                title={ticket.eventId?.name} // Use optional chaining for safety
                location={ticket.eventId?.location}
                date={ticket.visitDate}
                time={ticket.eventId?.Time}
                type={ticket.ticketType}
                code={ticket.uniqueCode}
                status={ticket.updateStatus}
                process='Sell'
                popSellForm={() => handleSell(ticket.uniqueCode)}
                pending={ticket.notifications?.[0]?.status || null} // Use optional chaining
                showBarcode={showBarcode} // Ensure this is passed
          
            />
        );
    })
) : (
    <p className='text-white'>{message || "No tickets available."}</p> // Use the message state or a default message
)}



                {/* <MyTicket
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

                ></MyTicket> */}

            </div>
            <Footer />
        </div>
    )
}

export default Teckitmanager