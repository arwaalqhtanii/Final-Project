
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
        <div className="w-full max-w-md bg-transparent focus:outline-none text-gray-700 px-4 text-left">
        <Typewriter
        text="Search for Riyadh Season events"
        cursorColor="#78006e"
        textStyle={{
            fontSize: '16px',
            color: '#4a5568',
        }}
        typeSpeed={100}
        startDelay={500}
    />
    </div>
    </div>
    </div>
    
        
    );
};

export default SearchBar;