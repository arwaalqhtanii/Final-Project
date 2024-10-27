import riyadhseasonboulevard from '/riyadhseasonboulevard.jfif';
import MyTicket from '../components/MyTicket';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Purchase from '../components/Purchase';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js'; // Make sure this line is included
import { loadStripe } from '@stripe/stripe-js';

function Checkteckit() {
    const [purchasePop, setPurchasePop] = useState(false);
    const stripePromise = loadStripe('pk_test_51QCyiNFjwRhkW7KwJEkXQOsCQEU2GDFji43vyUInNGrJr2l6QIk0wpStec41VtJKOLZwnbyOr3Q8mB5uSLp86z9n00veLycNjH');

    const location = useLocation();
    const { code, newPrice } = location.state || {}; // Access state passed from notification
    const [ticketForCheck, setTicketForCheck] = useState(null); // Initialize as null
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await axios.get(`http://localhost:8050/tickets/tickets/unique-code/${code}`);
               console.log('test fetch ticket ');
               
                console.log(response.data.ticket);

                setTicketForCheck(response.data.ticket); // Set the ticket data
            } catch (err) {
                setError('Error retrieving ticket: ' + (err.response?.data?.message || err.message));
            } finally {
                setLoading(false);
            }
        };

        if (code) { // Ensure code is defined before fetching
            fetchTicket();
        } else {
            setError('No ticket code provided.');
            setLoading(false);
        }
    }, [code]);

   
    // function ignoreTicket() {
    //     // محتوى الدالة يمكن إضافته هنا لاحقًا
    // }

    function popPurchaseform() {
        setPurchasePop(true);
        document.body.style.overflow = 'hidden'; // منع تمرير الصفحة أثناء عرض النافذة
    }

    const handleCloseBuyPopup = () => {
        setPurchasePop(false);
        document.body.style.overflow = 'auto'; // السماح بتمرير الصفحة عند إغلاق النافذة
    };

    // console.log("test ticket "+ticketForCheck.user.userId);
    

    return (
        <div>
            <Navbar />
            {purchasePop && (
                <Elements stripe={stripePromise}>
                    <Purchase isOpen={true} onClose={handleCloseBuyPopup} newPrice={newPrice}  notificationID={ticketForCheck.notificationID}  />
                </Elements>
            )}
            {/* {purchasePop && (
                <Purchase isOpen=
                {true} onClose={handleCloseBuyPopup} />
                add here
            )} */}
            <div className='w-[100%] h-[100vh] relative'>
                <img className='w-[100%] h-[100%]' src={riyadhseasonboulevard} alt="Background" />
                <div className='w-[100%] h-[100%] bg-black opacity-80 absolute top-0'></div>
                <div className='max-md:w-[100%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-y-[3rem] items-center'>
                <div className='text-white font-bold text-3xl'>Waiting for purchase</div>
                {loading && <div className="text-white">Loading...</div>}
                    {error && <div className="text-red-500">{error}</div>}
                    {ticketForCheck ? (
                        <div className='w-[100%] flex justify-center'>
                        
                            <MyTicket
                                title={ticketForCheck.eventId?.name || 'Event not found'} // Safe access
                                location={ticketForCheck.eventId?.location || 'Location not found'} // Safe access
                                date={ticketForCheck.visitDate ? new Date(ticketForCheck.visitDate).toLocaleDateString('en-GB') : 'Date not found'}
                                time={ticketForCheck.eventId?.Time || 'Time not found'} // Safe access
                                type={ticketForCheck.ticketType || 'Type not found'} // Default message
                                code={ticketForCheck.uniqueCode || 'Code not found'} // Default message
                                status={ticketForCheck.updateStatus} // Update status logic
                                newPrice={newPrice} // Safe access
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



// import React, { useState ,useEffect} from 'react'
// import riyadhseasonboulevard from '/riyadhseasonboulevard.jfif'
// import ticketIcon from '/ticket.png'
// import MyTicket from '../components/MyTicket'
// import { AiOutlineFileSearch } from "react-icons/ai";
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import axios from 'axios';
// import { useParams  } from 'react-router-dom';


// function Checkteckit() {
//     let {code,newprice} = useParams();
//     const [ticketForCheck, setTicketForCheck] = useState(true);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     console.log("code :  " + code);
// console.log("price"+ newprice);

//     useEffect(() => {
//         const fetchTicket = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8050/tickets/tickets/unique-code/${code}`);
//                 console.log(response);

//                 setTicketForCheck(response.data.ticket); // Access the ticket object directly
//                 console.log(ticketForCheck);
                
//             } catch (err) {
//                 console.log("err : " +err);
                
//                 // setError('Error retrieving ticket: ' + err.response?.data?.message || err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchTicket();
//     }, []);

//     return (
//         <div>
//             <Navbar/>

//             <div className='w-[100%] h-[100vh] relative'>
//                 <img className='w-[100%] h-[100%]' src={riyadhseasonboulevard}></img>
//                 <div className='w-[100%] h-[100%] bg-black opacity-80 absolute top-0'></div>
//                 <div className='max-md:w-[100%]  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-y-[3rem] items-center'>
//                     <div className='text-white font-bold text-[3rem]'>تحقق من صلاحية التذكرة</div>
//                     {loading && <div className="text-white">Loading...</div>}
//                     {error && <div className="text-red-500">{error}</div>}
//                     {ticketForCheck ? (
//                         <div className='w-[100%] flex justify-center'>
//                             <MyTicket
//                                 title={ticketForCheck.eventId?.name || 'Event not found'} // Safe access
//                                 location={ticketForCheck.eventId?.location || 'Location not found'} // Safe access
//                                 date={new Date(ticketForCheck.visitDate).toLocaleDateString() || 'Date not found'} // Format date
//                                 time={ticketForCheck.eventId?.Time || 'Time not found'} // Safe access
//                                 type={ticketForCheck.ticketType || 'Type not found'} // Default message
//                                 code={ticketForCheck.uniqueCode || 'Code not found'} // Default message
//                                 status={ticketForCheck.updateStatus === 0 ? 'Available' : 'Not Available'} // Update status logic
//                                 newPrice={newPrice || ticketForCheck.price || 'Price not found'} // Safe access
//                             />
//                         </div>
//                     ) : (
//                         !loading && <div className='text-white'>No ticket found.</div>
//                     )}

//                 </div>
//             </div>
//             <Footer/>
//         </div>
//     )
// }

// export default Checkteckit




export default Checkteckit;
