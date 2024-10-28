import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate,Link } from 'react-router-dom'; 

function LoginW() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const[suspend,setsuspend]=useState('');
  const newErrors = {};

  const handleSubmit = async (e) => {
      e.preventDefault();
     
  
      if (email === '') {
        newErrors.email = 'This field is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Please enter a valid email address';
      } else if (password.length === 0) {
        newErrors.password = 'This field is required';
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters long';
      }
          if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      }  else {
        setErrors({});

        try {
            const response = await fetch('http://localhost:8050/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            // Handle response based on status
            if (!response.ok) {
              const errorData = await response.json(); 
              if (response.status === 403) { 
                  throw new Error(errorData.message || 'Login failed');
              }
              throw new Error('Login failed');
          }


            const data = await response.json();
            console.log('Login successful!', data);
            localStorage.setItem('token',data.token);
            localStorage.setItem('id',data.idNumber);
            localStorage.setItem('email',data.user.email);
            navigate('/'); 
        } catch (error) {
            console.error('Error:', error);
            setsuspend(error.message);
            setErrors({ general: error });
        }
    }
};

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

 

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100">


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
  
   
    <div className="relative bg-white shadow-lg rounded-xl p-6 sm:p-8 md:p-10 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl w-full z-10 min-h-[400px] sm:min-h-[450px] md:min-h-[500px]">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 text-[#78006e]">Login</h2>
      <h1>{suspend}</h1>
      <div className="mb-4 sm:mb-6">
        <label className="block text-left mb-2 text-gray-600">Email:</label>
        <input 
          type="email" 
          className="w-full text-left border-2 border-[#78006e] rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#be008d]" 
          placeholder="example@example.com" 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <small className='text-red-500'>{errors.email}</small>
      </div>
  
      <div className="mb-4 sm:mb-6">
        <label className="block text-left mb-2 text-gray-600">Password:</label>
        <div className="relative">
          <input 
            type={showPassword ? 'text' : 'password'} 
            className="w-full text-left border-2 border-[#78006e] rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#be008d]" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
  
          <span 
            onClick={togglePasswordVisibility} 
            className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
          </span>
        </div>
        <small className='block mt-1 text-red-500'>{errors.password}</small>
      </div>
  
      <button 
        className="w-full mb-4 sm:mb-6 bg-[#78006e] text-white py-2 sm:py-3 text-lg sm:text-xl rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-500 transition-all duration-300"
        onClick={handleSubmit}  
      >
        Login
      </button>
  
      <div className="text-center">
        <p className="text-sm sm:text-lg">
          Don't have an account? 
          <Link to="/SignupW" className="text-[#78006e] hover:underline"> Create an account</Link>
        </p>
      </div>
    </div>
  </div>
  
  );
}

export default LoginW;