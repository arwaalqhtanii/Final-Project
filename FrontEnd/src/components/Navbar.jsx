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
                headers: { Authorization: `Bearer ${token}` },
            });
            setNotifications(response.data.notifications || []);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        setIsLoggedIn(!!localStorage.getItem('token'));
        fetchNotifications();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleNavigate = (uniqueCode, newPrice) => {
        navigate('/Checkteckit', { state: { code: uniqueCode, newPrice } });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsNotificationOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div>
            <nav className={`fixed top-0 left-0 w-full transition-all duration-300 ${isScrolled ? 'bg-white text-[#78006e]' : 'bg-transparent text-white'} z-50`}>
                <div className="container mx-auto flex justify-between items-center p-4">
                    <Link to="/">
                        <img className='w-[15vw]' src={isScrolled ? 'https://iili.io/2CaS94e.md.png' : 'https://iili.io/2Ca8pC7.md.png'} alt="logo" />
                    </Link>

                    <div className="md:hidden flex items-center space-x-4">
                        {isLoggedIn && (
                            <div className="relative">
                                <FiBell className={`text-3xl cursor-pointer transition-colors duration-300 ${isScrolled ? 'text-[#78006e]' : 'text-white'}`} onClick={toggleNotificationDropdown} />
                                {notifications.length > 0 && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-600 rounded-full"></span>}
                                {isNotificationOpen && (
                                    <div ref={notificationRef} className="absolute top-14 right-0 w-64 bg-white shadow-lg rounded-lg py-2 z-10 overflow-y-auto max-h-48">
                                        <h3 className="text-lg font-bold px-4 py-2 text-[#78006e] border-b">Notifications</h3>
                                        <ul className="text-[#101010]">
                                            {notifications.length === 0 ? (
                                                <li className="px-4 py-2 text-gray-500">No notifications found.</li>
                                            ) : (
                                                notifications.map((notification, index) => (
                                                    <li key={index} className={`px-4 py-2 hover:bg-[#f3f3f3] cursor-pointer flex items-center gap-x-2 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`} onClick={() => handleNavigate(notification.uniqueCode, notification.newPrice)}>
                                                        <span className='font-semibold'>ticket request</span> {notification.eventName}
                                                        <span className={`ml-2 w-4 h-4 flex items-center justify-center rounded-full ${notification.status === 'approved' ? 'bg-green-500' : notification.status === 'pending' ? 'bg-orange-500' : notification.status === 'canceled' ? 'bg-red-500' : 'bg-gray-300'}`}>
                                                            {notification.status === 'pending' && <span className="text-white text-xs font-bold">!</span>}
                                                            {notification.status === 'approved' && <span className="text-white text-xs font-bold">✔</span>}
                                                            {notification.status === 'canceled' && <span className="text-white text-xs font-bold">✘</span>}
                                                        </span>
                                                    </li>
                                                ))
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        <button onClick={toggleMenu}>{isMenuOpen ? <FiX className="text-3xl" /> : <FiMenu className="text-3xl" />}</button>
                    </div>

                    <div className={`hidden md:flex space-x-8 items-center`}>
                        <Link to="/" className={`text-lg font-semibold ${isScrolled ? 'text-[#78006e] hover:text-[#101010]' : 'text-white'}`}>Home</Link>
                        {isLoggedIn ? (
                            <>
                                <Link to="/Teckitmanager" className={`text-lg font-semibold ${isScrolled ? 'text-[#78006e]' : 'text-white'}`}>Ticket Management</Link>
                                <div className="relative">
                                    <FaCircleUser className={`text-3xl cursor-pointer ${isScrolled ? 'text-[#78006e]' : 'text-white'}`} onClick={toggleProfileDropdown} />
                                    {isProfileMenuOpen && (
                                        <div className="absolute top-14 right-0 w-64 bg-white shadow-lg rounded-lg py-2 z-10">
                                            <ul className="text-[#101010]">
                                                <li className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-[#f3f3f3]" onClick={() => navigate('/profile')}>
                                                    <IoSettingsOutline className="text-[#78006e]" /> <span>Settings</span>
                                                </li>
                                                <li className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-[#f3f3f3]" onClick={handleLogout}>
                                                    <FiLogOut className="text-[#78006e]" /> <span>Log out</span>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <Link to="/LoginW" className={`text-lg font-semibold ${isScrolled ? 'text-[#78006e]' : 'text-white'}`}>Log in</Link>
                        )}
                    </div>

                    <div className={`md:hidden absolute top-16 left-0 w-full bg-white transition-transform duration-300 ${isMenuOpen ? 'block' : 'hidden'}`}>
                        <Link to="/" className="text-lg font-semibold text-[#78006e] py-2 px-4 block">Home</Link>
                        {isLoggedIn ? (
                            <>
                                <Link to="/Teckitmanager" className="text-lg font-semibold text-[#78006e] py-2 px-4 block">Ticket Management</Link>
                                <Link to="/profile" className="text-lg font-semibold text-[#78006e] py-2 px-4 block">Profile</Link>
                                <button onClick={handleLogout} className="w-full text-left text-lg font-semibold text-[#78006e] py-2 px-4">Log out</button>
                            </>
                        ) : (
                            <Link to="/LoginW" className="text-lg font-semibold text-[#78006e] py-2 px-4 block">Log in</Link>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;