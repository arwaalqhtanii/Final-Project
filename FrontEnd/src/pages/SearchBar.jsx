
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

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
        <div className="container px-5 mx-auto   py-8 flex gap-9 flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 pt-8">
            <h2 className="text-3xl  text-left ml-8">Current Month Events</h2>
            <div className="flex  items-center w-full md:w-3/5 lg:w-2/5 bg-gray-100 p-4 rounded-full shadow-md ">
                <button className="text-purple-800 ml-4" onClick={handleSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
                <input
                    type="text"
                    placeholder="Search for Riyadh Season events"
                    className="w-full bg-transparent focus:outline-none text-gray-700 px-4 text-left "
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
 

    );
};

export default SearchBar;
