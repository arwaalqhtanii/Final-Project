import React, { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX, FiLogOut, FiBell } from 'react-icons/fi';  
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);  
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);  
    const navigate = useNavigate();
    const notificationRef = useRef(null);

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleNotificationDropdown = () => {
        setIsNotificationOpen(!isNotificationOpen);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/LoginW');
    };
// Fetch notifications
const fetchNotifications = async () => {
    try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('http://localhost:8050/notifications/notificationsshow', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        // const ticket = response.data.ticket;
        console.log('oooooooooooooooooooooo');

        setNotifications(response.data.notifications);
        console.log(notifications);
        
        console.log('noti');

        
    } catch (error) {
        console.error('Error fetching notifications:', error);
    }
};

useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    fetchNotifications();
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);

const handleNavigate = (uniqueCode, newPrice) => {
    navigate('/Checkteckit', {
        state: { code: uniqueCode, newPrice }
    });
};
useEffect(() => {
    const handleClickOutside = (event) => {
        if (notificationRef.current && !notificationRef.current.contains(event.target)) {
            setIsNotificationOpen(false);  
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, []);


   

    return (
        <div>
            <nav className={`fixed top-0 left-0 w-full transition-all duration-300 ${isScrolled ? 'bg-white text-[#78006e]' : 'bg-transparent text-white'} z-50`}>
                <div className="container mx-auto flex justify-between items-center p-4">
                    <h1 className={`text-2xl font-bold ${isScrolled ? 'text-[#78006e]' : 'text-white'}`}>WhiteTik</h1>

                  
                    <div className="md:hidden flex items-center space-x-4">
                        
                        <div className="relative">
                            <FiBell 
                                className={`text-3xl cursor-pointer transition-colors duration-300 ${isScrolled ? 'text-[#78006e] hover:text-[#171617]' : 'text-white'}`} 
                                onClick={toggleNotificationDropdown}
                            />
                            {notifications.length > 0  && (
                                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-600 rounded-full"></span>
                            )}
                            {isNotificationOpen && (
                                <div  ref={notificationRef} className="absolute top-14 right-0 w-64 bg-white shadow-lg rounded-lg py-2 z-10 overflow-y-auto max-h-48">
                                    <h3 className="text-lg font-bold px-4 py-2 text-[#78006e] border-b">Notifications</h3>
                                    <ul className="text-[#101010]">
                                    {notifications.length === 0 ? (
                                        <li className="px-4 py-2 text-gray-500">No notifications found.</li>
                                    ) : (
                                        notifications.map((notification, index) => (
                                            <li key={index}  className={`px-4 py-2 hover:bg-[#f3f3f3] cursor-pointer ${
                                                index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                                            }`} onClick={() => handleNavigate(notification.uniqueCode, notification.newPrice)}>
                                             You have a new ticket request. {notification.eventName } -{notification.uniqueCode}- {notification.status}
                                            </li>
                                        ))
                                    )}
                                    </ul>
                                </div>
                            )}
                        </div>

                      
                        <button onClick={toggleMenu}>
                            {isMenuOpen ? <FiX className="text-3xl" /> : <FiMenu className="text-3xl" />}
                        </button>
                    </div>

                 
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link
                            to="/"
                            className={`text-lg font-semibold transition-colors duration-300 hover:text-[#78006e] ${isScrolled ? 'text-[#78006e] hover:text-[#101010]' : 'text-white'}`}
                        >
                            Home
                        </Link>

                        <Link to="/Checkteckit" className={`text-lg font-semibold transition-colors duration-300 hover:text-[#78006e] ${isScrolled ? 'text-[#78006e] hover:text-[#101010]' : 'text-white'}`}>
                            Check Ticket
                        </Link>
                        <Link to="/Teckitmanager" className={`text-lg font-semibold transition-colors duration-300 hover:text-[#78006e] ${isScrolled ? 'text-[#78006e] hover:text-[#101010]' : 'text-white'}`}>
                            Ticket Management
                        </Link>

                       
                        <div className="relative">
                            <FiBell 
                                className={`text-3xl cursor-pointer transition-colors duration-300 ${isScrolled ? 'text-[#78006e] hover:text-[#171617]' : 'text-white'}`} 
                                onClick={toggleNotificationDropdown}
                            />
                            {notifications && (
                                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-600 rounded-full"></span>
                            )}
                            {isNotificationOpen && (
                                <div  ref={notificationRef} className="absolute top-14 right-0 w-64 bg-white shadow-lg rounded-lg py-2 z-10 overflow-y-auto max-h-48">
                                    <h3 className="text-lg font-bold px-4 py-2 text-[#78006e] border-b">Notifications</h3>
                                    <ul className="text-[#101010]">
                                    {notifications.length === 0 ? (
                                        <li className="px-4 py-2 text-gray-500">No notifications found.</li>
                                    ) : (
                                        notifications.map((notification, index) => (
                                            <li key={index}  className={`px-4 py-2 hover:bg-[#f3f3f3] cursor-pointer ${
                                                index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                                            }`} onClick={() => handleNavigate(notification.uniqueCode, notification.newPrice)}>
                                             You have a new ticket request. {notification.eventName } -{notification.uniqueCode}- {notification.status}
                                            </li>
                                        ))
                                    )}
                                    </ul>
                                </div>
                            )}
                        </div>

                     
                        <button onClick={handleLogout} className="transition-colors duration-300">
                            <FiLogOut className={`text-3xl ${isScrolled ? 'text-[#78006e] hover:text-[#171617]' : 'text-white'}`} />
                        </button>
                    </div>

                   
                    <div className={`md:hidden flex flex-col items-start p-4 absolute top-full left-0 w-full bg-white transition-transform duration-300 ${isMenuOpen ? 'block' : 'hidden'}`}>
                        <Link to="/" className="text-lg font-semibold text-[#78006e] py-2 hover:text-[#171617]">Home</Link>
                        <Link to="/check-ticket" className="text-lg font-semibold text-[#78006e] py-2 hover:text-[#171617]">Check Ticket</Link>
                        <Link to="/ticket-management" className="text-lg font-semibold text-[#78006e] py-2 hover:text-[#171617]">Ticket Management</Link>

                        <button onClick={handleLogout} className="mt-2">
                            <FiLogOut className="text-3xl text-[#78006e]" />
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;