import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';  
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios'; 
import riyadhseasonboulevard from '/riyadhseasonboulevard.jfif';
function SignupW() {
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (idNumber.length === 0) {
      newErrors.idNumber = 'This field is required';
    } else if (idNumber.length !== 9) {
      newErrors.idNumber = 'ID number must be exactly 9 digits';
    } else if (!/^\d+$/.test(idNumber)) {
      newErrors.idNumber = 'ID number must contain only digits';
    }   else if (password === '') {
      newErrors.password = 'This field is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (confirmPassword === '') {
      newErrors.confirmPassword = 'This field is required';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }else if (email === '') {
      newErrors.email = 'This field is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      try {
      
        const response = await axios.post('https://whitetik-project.onrender.com/user/register', {
          idNumber,
          email,
          password,
        });

        if (response.status === 201) {
          console.log('Registration successful!');
          navigate('/LoginW'); 
        }
      } catch (error) {
       
        if (error.response && error.response.data) {
          setErrors({ api: error.response.data.message });
        } else {
          setErrors({ api: 'Registration failed. Please try again.' });
        }
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
      <img src={riyadhseasonboulevard} alt="Background" className="absolute w-full h-full object-cover opacity-95" />
      <div className="absolute w-full h-full bg-black opacity-70"></div>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <svg className="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 opacity-30" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 300 300">
        <line x1="0" y1="0" x2="300" y2="300" stroke="#78006e" strokeWidth="10"/>
        <line x1="75" y1="0" x2="300" y2="225" stroke="#be008d" strokeWidth="6"/>
      </svg>
      <svg className="absolute bottom-0 right-0 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 opacity-30" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 300 300">
        <line x1="0" y1="0" x2="300" y2="300" stroke="#be008d" strokeWidth="6"/>
        <line x1="150" y1="0" x2="300" y2="150" stroke="#78006e" strokeWidth="4"/>
      </svg>
    </div>
  
    <div className="relative bg-white shadow-lg rounded-xl p-4 sm:p-6 max-w-md sm:max-w-xl w-full z-10 min-h-[550px]">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-[#78006e]">Create Account</h2>
  
      <div className="mb-4 sm:mb-6">
        <label className="block text-left mb-2 text-gray-600">Enter ID Number:</label>
        <input 
          type="text" 
          className="w-full border-2 border-[#78006e] rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-[#be008d]" 
          placeholder="ID Number" 
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
        />
        <small className="ml-1 text-red-500">{errors.idNumber}</small>
      </div>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 sm:mb-6">
        <div className="relative mb-4 sm:mb-0">
          <label className="block text-left mb-2 text-gray-600">Password:</label>
          <div className="relative flex items-center">
            <input 
              type={showPassword ? 'text' : 'password'} 
              className="w-full h-12 border-2 border-[#78006e] rounded-lg pl-3 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-[#be008d]" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span 
              onClick={togglePasswordVisibility} 
              className="absolute right-3 cursor-pointer top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
            </span>
          </div>
          <small className="ml-1 text-red-500">{errors.password}</small>
        </div>
  
        <div className="relative">
          <label className="block text-left mb-2 text-gray-600">Confirm Password:</label>
          <div className="relative flex items-center">
            <input 
              type={showConfirmPassword ? 'text' : 'password'} 
              className="w-full h-12 border-2 border-[#78006e] rounded-lg pl-3 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-[#be008d]" 
              placeholder="••••••••" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span 
              onClick={toggleConfirmPasswordVisibility} 
              className="absolute right-3 cursor-pointer top-1/2 transform -translate-y-1/2"
            >
              {showConfirmPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
            </span>
          </div>
          <small className="ml-1 text-red-500">{errors.confirmPassword}</small>
        </div>
      </div>
  
      <div className="mb-4 sm:mb-6">
        <label className="block text-left mb-2 text-gray-600">Email:</label>
        <input 
          type="email" 
          className="w-full border-2 border-[#78006e] rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-[#be008d]" 
          placeholder="example@example.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <small className="ml-1 text-red-500">{errors.email}</small>
      </div>
  
      <button 
        className="w-full bg-[#78006e] text-white py-3 text-lg sm:text-xl rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-500 transition-all duration-300"
        onClick={handleSubmit}
      >
        Sign Up
      </button>
  
      <div className="text-left mt-4">
        <p className="text-sm sm:text-lg">
          Already have an account? 
          <Link to="/LoginW" className="text-[#78006e] hover:underline"> Log In</Link>
        </p>
      </div>
    </div>
  </div>
  
  );
}

export default SignupW;