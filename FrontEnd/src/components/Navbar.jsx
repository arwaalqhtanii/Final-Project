import React, { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX, FiLogOut, FiBell } from 'react-icons/fi';
import { FaCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoSettingsOutline } from "react-icons/io5";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const notificationRef = useRef(null);
    const navigate = useNavigate();

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (isNotificationOpen) setIsNotificationOpen(false);
    };

    const toggleNotificationDropdown = () => {
        setIsMenuOpen(false);
        setIsNotificationOpen(!isNotificationOpen);
    };

    const toggleProfileDropdown = () => {
        setIsNotificationOpen(false);
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };




    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate('/LoginW');
    };
    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://whitetik-project.onrender.com/notifications/notificationsshow', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            console.log('oooooooooooooooooooooo');

            setNotifications(response.data.notifications || []);
            console.log(notifications);

            console.log('noti');


        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);

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
                    <img className='w-[15vw]' src={isScrolled ?'https://iili.io/2CaS94e.md.png':'https://iili.io/2Ca8pC7.md.png'} ></img>


                    <div className="md:hidden flex items-center space-x-4">
                        {isLoggedIn && (
                            <div className="relative">
                                <FiBell
                                    className={`text-3xl cursor-pointer transition-colors duration-300 ${isScrolled ? 'text-[#78006e] hover:text-[#171617]' : 'text-white'}`}
                                    onClick={toggleNotificationDropdown}
                                />
                                {notifications.length > 0 && (
                                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-600 rounded-full"></span>
                                )}
                                {isNotificationOpen && (
                                    <div ref={notificationRef} className=" absolute top-14 right-0 w-64 bg-white shadow-lg rounded-lg py-2 z-10 overflow-y-auto max-h-48">
                                        <h3 className="text-lg font-bold px-4 py-2 text-[#78006e] border-b">Notifications</h3>
                                        <ul className="text-[#101010]">
                                            {notifications.length === 0 ? (
                                                <li className="px-4 py-2 text-gray-500">No notifications found.</li>
                                            ) : (
                                                notifications.map((notification, index) => (
                                                    <li key={index} className={`px-4 py-2 hover:bg-[#f3f3f3] cursor-pointer flex items-center gap-x-[0.5rem] ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                                                        }`} onClick={() => handleNavigate(notification.uniqueCode, notification.newPrice)}>
                                                        <span className='font-semibold'>ticket request. </span>{notification.eventName}
                                                        <span>
                                                            <div
                                                                className={`w-[15px] h-[15px] flex items-center justify-center rounded-full ${notification.status === 'approved' ? 'bg-green-500' :
                                                                    notification.status === 'pending' ? 'bg-orange-500' :
                                                                        notification.status === 'canceled' ? 'bg-red-500' : 'bg-gray-300'
                                                                    }`}
                                                            >
                                                                {notification.status === 'pending' && (
                                                                    <span className="text-white text-[10px] font-bold">!</span>
                                                                )}
                                                                {notification.status === 'approved' && (
                                                                    <span className="text-white text-[10px] font-bold">✔</span>
                                                                )}
                                                                {notification.status === 'canceled' && (
                                                                    <span className="text-white text-[10px] font-bold">✘</span>
                                                                )}
                                                            </div>
                                                        </span>
                                                    </li>
                                                ))
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

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

                        {isLoggedIn ?
                            <Link to="/Teckitmanager" className={`text-lg font-semibold transition-colors duration-300 hover:text-[#78006e] ${isScrolled ? 'text-[#78006e] hover:text-[#101010]' : 'text-white'}`}>
                                Ticket Management
                            </Link>
                            :
                            <>
                                <Link to="/LoginW" className={`text-lg font-semibold transition-colors duration-300 hover:text-[#78006e] ${isScrolled ? 'text-[#78006e] hover:text-[#101010]' : 'text-white'}`}>
                                    Log in
                                </Link>


                            </>

                        }
                        {isLoggedIn && (
                            <div className="relative">
                                <FiBell
                                    className={`text-3xl cursor-pointer transition-colors duration-300 ${isScrolled ? 'text-[#78006e] hover:text-[#171617]' : 'text-white'}`}
                                    onClick={toggleNotificationDropdown}
                                />
                                {notifications && (
                                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-600 rounded-full"></span>
                                )}
                                {isNotificationOpen && (
                                    <div ref={notificationRef} className="absolute top-14 right-0 w-64 bg-white shadow-lg rounded-lg py-2 z-10 overflow-y-auto max-h-48">
                                        <h3 className="text-lg font-bold px-4 py-2 text-[#78006e] border-b">Notifications</h3>
                                        <ul className="text-[#101010]">
                                            {notifications.length === 0 ? (
                                                <li className="px-4 py-2 text-gray-500">No notifications found.</li>
                                            ) : (
                                                notifications.map((notification, index) => (
                                                    <li key={index} className={`px-4 py-2 hover:bg-[#f3f3f3] cursor-pointer flex items-center gap-x-[0.5rem] ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                                                        }`} onClick={() => handleNavigate(notification.uniqueCode, notification.newPrice)}>
                                                        <span className='font-semibold'>ticket request. </span>{notification.eventName}
                                                        <span>
                                                            <div
                                                                className={`w-[15px] h-[15px] flex items-center justify-center rounded-full ${notification.status === 'approved' ? 'bg-green-500' :
                                                                    notification.status === 'pending' ? 'bg-orange-500' :
                                                                        notification.status === 'canceled' ? 'bg-red-500' : 'bg-gray-300'
                                                                    }`}
                                                            >
                                                                {notification.status === 'pending' && (
                                                                    <span className="text-white text-[10px] font-bold">!</span>
                                                                )}
                                                                {notification.status === 'approved' && (
                                                                    <span className="text-white text-[10px] font-bold">✔</span>
                                                                )}
                                                                {notification.status === 'canceled' && (
                                                                    <span className="text-white text-[10px] font-bold">✘</span>
                                                                )}
                                                            </div>
                                                        </span>


                                                    </li>
                                                ))
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
            
                        {isLoggedIn && (
                            <div className="relative">
                                <FaCircleUser
                                    className={`text-3xl cursor-pointer transition-colors duration-300 ${isScrolled ? 'text-[#78006e] hover:text-[#171617]' : 'text-white'}`}
                                    onClick={toggleProfileDropdown}
                                ></FaCircleUser>
                                {isProfileMenuOpen && (
                                    <div className="absolute top-14 right-0 w-64 bg-white shadow-lg rounded-lg py-2 z-10">
                                        <ul className="text-[#101010]">
                                            <li className="flex items-center gap-x-[0.2rem]">

                                                <button onClick={()=>{navigate('/profile')}} className="transition-colors duration-300 font-bold px-4 py-2">
                                                    <IoSettingsOutline className={`text-3xl   text-[#78006e] hover:text-[#171617]`} />
                                                </button>
                                                <span onClick={()=>{navigate('/profile')}} className='font-semibold cursor-pointer'>Settings</span>
                                            </li>
                                            <li className='flex items-center gap-x-[0.2rem]'>
                                                <button onClick={handleLogout} className="transition-colors duration-300 font-bold px-4 py-2">
                                                    <FiLogOut className={`text-3xl   text-[#78006e] hover:text-[#171617]`} />
                                                </button>
                                                <span onClick={handleLogout} className='font-semibold cursor-pointer'>Log out</span>
                                            </li>

                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                      
                    </div>


                    <div className={`md:hidden flex flex-col items-start p-4 absolute top-full left-0 w-full bg-white transition-transform duration-300 ${isMenuOpen ? 'block' : 'hidden'}`}>
                        <Link to="/" className="text-lg font-semibold text-[#78006e] py-2 hover:text-[#171617]">Home</Link>
                        {isLoggedIn ?
                            <>
                                <Link to="/Teckitmanager" className="text-lg font-semibold text-[#78006e] py-2 hover:text-[#171617]">Ticket Management</Link>
                                <Link to="/profile" className="text-lg font-semibold text-[#78006e] py-2 hover:text-[#171617]">Profile</Link>
                                <button onClick={handleLogout} className="transition-colors duration-300">
                                    <FiLogOut className={`text-3xl text-[#78006e] hover:text-[#171617]`} />

                                </button>
                            </>

                            :
                            <>
                                <Link to="/LoginW" className="text-lg font-semibold text-[#78006e] py-2 hover:text-[#171617]">Log in</Link>

                            </>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;