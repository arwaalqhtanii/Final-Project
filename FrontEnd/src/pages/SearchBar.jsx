
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        onSearch(searchTerm); 
    };

    return (
        <div className="container mx-auto py-10 flex gap-9 flex-col-reverse md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex  items-center w-full md:w-3/5 lg:w-2/5 bg-gray-100 p-4 rounded-full shadow-md">
                <input
                    type="text"
                    placeholder="ابحث عن فعاليات موسم الرياض"
                    className="w-full bg-transparent focus:outline-none text-gray-700 px-4 text-right"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <button className="text-purple-800" onClick={handleSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>
            <h2 className="text-3xl text-right mr-5">فعاليات الشهر الحالي</h2>
        </div>
    );
};

export default SearchBar;

