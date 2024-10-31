import riyadhseasonboulevard from '/riyadhseasonboulevard.jfif';
import MyTicket from '../components/MyTicket';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Purchase from '../components/Purchase';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js'; 
import { loadStripe } from '@stripe/stripe-js';

function Checkteckit() {
    const [purchasePop, setPurchasePop] = useState(false);
    const stripePromise = loadStripe('pk_test_51QCyiNFjwRhkW7KwJEkXQOsCQEU2GDFji43vyUInNGrJr2l6QIk0wpStec41VtJKOLZwnbyOr3Q8mB5uSLp86z9n00veLycNjH');
    const location = useLocation();
    const { code, newPrice } = location.state || {}; 
    const [ticketForCheck, setTicketForCheck] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    const navigate = useNavigate();
    
    useEffect(() => {
        if (!token) {
            navigate('/'); 
        }
    }, [token, navigate]);
    

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await axios.get(`https://whitetik-project.onrender.com/tickets/tickets/unique-code/${code}`);
               console.log('test fetch ticket ');
               
                console.log(response.data.ticket);

                setTicketForCheck(response.data.ticket); 
            } catch (err) {
                setError('Error retrieving ticket: ' + (err.response?.data?.message || err.message));
            } finally {
                setLoading(false);
            }
        };

        if (code) { 
            fetchTicket();
        } else {
            setError('No ticket code provided.');
            setLoading(false);
        }
    }, [code]);

  

    function popPurchaseform() {
        setPurchasePop(true);
    }

    const handleCloseBuyPopup = () => {
        setPurchasePop(false);
    };

    return (
        <div>
            <Navbar />
            {purchasePop && (
                <Elements stripe={stripePromise}>
                    <Purchase isOpen={true} onClose={handleCloseBuyPopup} newPrice={newPrice}  notificationID={ticketForCheck.notificationID} userId={ticketForCheck.user.userId}/>
                </Elements>
            )}
           
            <div className='w-[100%] h-[100vh] max-sm:h-[120vh] relative'>
                <img className='w-[100%] h-[100%] '  src={riyadhseasonboulevard} alt="Background" />
                <div className='w-[100%] h-[100%] bg-black opacity-80 absolute top-0'></div>
                <div className='max-md:w-[100%] absolute top-[50%] max-sm:top-[55%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-y-[3rem] items-center'>
                <div className='text-white font-bold text-[3rem] max-sm:text-center'>Waiting for purchase</div>
                {loading && <div className="text-white">Loading...</div>}
                    {error && <div className="text-red-500">{error}</div>}
                    {ticketForCheck ? (
                        <div className='w-[100%] flex justify-center mb-12'>
                        
                            <MyTicket
                                title={ticketForCheck.eventId?.name || 'Event not found'} 
                                location={ticketForCheck.eventId?.location || 'Location not found'} 
                                date={ticketForCheck.visitDate ? new Date(ticketForCheck.visitDate).toLocaleDateString('en-GB') : 'Date not found'}
                                time={ticketForCheck.eventId?.Time || 'Time not found'} 
                                type={ticketForCheck.ticketType || 'Type not found'} 
                                code={ticketForCheck.uniqueCode || 'Code not found'} 
                                status={ticketForCheck.updateStatus} 
                                newPrice={newPrice} 
                                forbuy='true'
                                notificationID={ticketForCheck.notificationID}
                                purchaseForm={popPurchaseform}
                                isPending={ticketForCheck.isPending}
                            />
                         
                        </div>
                    ) : (
                        !loading && <div className='text-white'>No ticket found.</div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}


export default Checkteckit;
