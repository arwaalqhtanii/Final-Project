import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Typewriter from 'react-typewriter-effect';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="container px-5 mx-auto py-8 flex gap-9 flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 pt-8">
            <h2 className="text-3xl text-center md:text-left ml-0 md:ml-8 font-bold">Current Month Events</h2>
            <div className="flex items-center w-full md:w-3/5 lg:w-2/5 bg-white border border-gray-300 rounded-full shadow-lg p-4 transition-all duration-300 focus-within:border-purple-800 focus-within:shadow-xl">
                <button className="text-purple-800 ml-4 transition-transform transform hover:scale-110" onClick={handleSearch}>
                    <FaSearch className="h-6 w-6" />
                </button>
                <input
                    type="text"
                    className="w-full bg-transparent focus:outline-none text-gray-700 px-4 text-left"
                    placeholder="Search for Riyadh Season events"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
};

export default SearchBar;
