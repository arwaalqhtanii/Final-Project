import React from 'react';

const CustomModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 z-10 shadow-lg max-w-md mx-auto w-[90%] sm:w-[80%]">
        <h2 className="text-xl font-bold text-center mb-4">Message</h2>
        <p className="text-center">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-[#78006e] text-white py-2 rounded-lg hover:bg-gray-500 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CustomModal;
