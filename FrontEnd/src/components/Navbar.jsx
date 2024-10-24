import React, { useState, useEffect } from 'react';
import { FiMenu, FiX, FiLogOut, FiBell } from 'react-icons/fi';  
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hasNotification, setHasNotification] = useState(true);  
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);  
    const navigate = useNavigate();

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
        navigate('/LoginW');
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
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
                            {hasNotification && (
                                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-600 rounded-full"></span>
                            )}
                            {isNotificationOpen && (
                                <div className="absolute top-14 right-0 w-64 bg-white shadow-lg rounded-lg py-2 z-10">
                                    <h3 className="text-lg font-bold px-4 py-2 text-[#78006e] border-b">Notifications</h3>
                                    <ul className="text-[#101010]">
                                        <li className="px-4 py-2 hover:bg-[#f3f3f3] cursor-pointer bg-gray-100">
                                            You have a new ticket request.
                                        </li>
                                        <li className="px-4 py-2 hover:bg-[#f3f3f3] cursor-pointer bg-white">
                                            Your ticket request has been approved.
                                        </li>
                                        <li className="px-4 py-2 hover:bg-[#f3f3f3] cursor-pointer bg-gray-100">
                                            Special discount on your next purchase!
                                        </li>
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
                            {hasNotification && (
                                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-600 rounded-full"></span>
                            )}
                            {isNotificationOpen && (
                                <div className="absolute top-14 right-0 w-64 bg-white shadow-lg rounded-lg py-2 z-10">
                                    <h3 className="text-lg font-bold px-4 py-2 text-[#78006e] border-b">Notifications</h3>
                                    <ul className="text-[#101010]">
                                        <li className="px-4 py-2 hover:bg-[#f3f3f3] cursor-pointer bg-gray-100">
                                            You have a new ticket request.
                                        </li>
                                        <li className="px-4 py-2 hover:bg-[#f3f3f3] cursor-pointer bg-white">
                                            Your ticket request has been approved.
                                        </li>
                                        <li className="px-4 py-2 hover:bg-[#f3f3f3] cursor-pointer bg-gray-100">
                                            Special discount on your next purchase!
                                        </li>
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