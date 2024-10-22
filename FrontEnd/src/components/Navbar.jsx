
import React, { useState, useEffect } from 'react';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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

                    <div className="md:hidden">
                        <button onClick={toggleMenu}>
                            {isMenuOpen ? <FiX className="text-3xl" /> : <FiMenu className="text-3xl" />}
                        </button>
                    </div>

                    <div className={`hidden md:flex space-x-8 items-center`}>
                        <Link
                            to="/"
                            className={`text-lg font-semibold transition-colors duration-300 hover:text-[#78006e] ${isScrolled ? 'text-[#78006e] hover:text-[#171617]' : 'text-white'}`}
                        >
                            Home
                        </Link>

                        <Link to="/Checkteckit" className={`text-lg font-semibold transition-colors duration-300  hover:text-[#78006e] ${isScrolled ? 'text-[#78006e] hover:text-[#171617]' : 'text-white'}`}>Check Ticket</Link>
                        <Link to="/Teckitmanager" className={`text-lg font-semibold transition-colors duration-300 hover:text-[#78006e] ${isScrolled ? ' text-[#78006e] hover:text-[#171617] '  : 'text-white'}`}>Ticket Management</Link>

                        <button onClick={handleLogout} className="transition-colors duration-300">
                            <FiLogOut className={`text-3xl ${isScrolled ? 'text-[#78006e] ' : 'text-white'}`} />
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
