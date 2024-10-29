import { useNavigate } from 'react-router-dom';
import riyadhseasonboulevard from '/riyadhseasonboulevard.jfif';
import { useState, useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Profile = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState([]);
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [isUsernameEditable, setIsUsernameEditable] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8050/user/userinfo', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('User info fetched:', response.data);
        setEmail(response.data.email);
        setUsername(response.data.Username);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSaveUserInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:8050/user/update',
        { username, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('User info updated:', response.data);
      setIsUsernameEditable(false);
      setIsEmailEditable(false);
    } catch (error) {
      console.error('Error updating user info:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
      }
    }
  };

  const handleSavePassword = async () => {

    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:8050/user/update',
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Password updated:', response.data);
      setPassword('');
      setErrorMessage('');
      alert('Password updated successfully.');
    } catch (error) {
      console.error('Error updating password:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/LoginW');
  };

  return (
    <div>
      <Navbar />
      <div className='w-[100%] h-[100vh] relative'>
        <img className='w-[100%] h-[100%]' src={riyadhseasonboulevard} alt="Background" />
        <div className='w-[100%] h-[100%] bg-black opacity-80 absolute top-0'></div>
        <div className='max-md:w-[100%] absolute bottom-[2%] max-md:bottom-[50%] max-md:translate-y-[50%] left-[0%] translate-y-[0%] flex flex-col gap-y-[3rem] items-center'>
          <div className="profile-card flex flex-col items-start max-md:items-center gap-y-[1.5rem] bg-white shadow-lg h-[85vh] p-8 w-[40vw] max-md:w-[80%] max-md:h-[fit-content] rounded-r-md max-md:rounded-md text-center relative">
            <h1 className="text-2xl font-bold text-[#78006e] mb-4">Welcome, {username}</h1>
            <div className='flex flex-col max-md:items-center items-start w-[100%]'>
              <div className='flex flex-col items-start'>
              <p className='text-gray-500 font-semibold'>Name :</p>
              <div className='flex items-center'>
                <input
                  type='text'
                  className='h-[40px] w-[80%] border-[1px] border-[#78006e] focus:outline-none rounded-l-[5px] px-[10px]'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='First name'
                  disabled={!isUsernameEditable}
                />
                <button
                  className='h-[40px] text-white flex justify-center items-center bg-[#78006e] hover:bg-[#be008d] w-[20%] border-[1px] border-[#78006e] rounded-r-[5px]'
                  onClick={isUsernameEditable ? handleSaveUserInfo : () => setIsUsernameEditable(true)}
                >
                  {isUsernameEditable ? 'Save' : <FaRegEdit className='text-[1.2rem] font-bold' />}
                </button>
              </div>
              </div>
              
            </div>

            <div className='flex flex-col items-start'>
              <p className='text-gray-500 font-semibold'>Email :</p>
              <div className='flex items-center'>
                <input
                  type='email'
                  className='h-[40px] w-[80%] border-[1px] px-[10px] focus:outline-none rounded-l-[5px] border-[#78006e]'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEmailEditable}
                />
                <button
                  className='h-[40px] text-white flex justify-center items-center bg-[#78006e] hover:bg-[#be008d] w-[20%] border-[1px] border-[#78006e] rounded-r-[5px]'
                  onClick={isEmailEditable ? handleSaveUserInfo : () => setIsEmailEditable(true)}
                >
                  {isEmailEditable ? 'Save' : <FaRegEdit className='text-[1.2rem] font-bold' />}
                </button>
              </div>
            </div>

            <div className='flex items-start gap-y-[1.5rem] flex-col w-[43%] max-md:w-[85%] mt-4'>
              <div className='flex flex-col items-start w-[100%]'>
                <p className='text-gray-500'>Reset your password :</p>
                <input
                  type='password'
                  className='h-[40px] w-[100%] border-[1px] px-[10px] focus:outline-none rounded-[5px] border-[#78006e]'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='New password'
                />
                {errorMessage && ( 
                  <p className="text-red-500 text-[0.7rem]">{errorMessage}</p>
                )}
              </div>

              <button
                className='h-[40px] w-[100%] text-white flex justify-center items-center bg-[#78006e] hover:bg-[#be008d] border-[1px] border-[#78006e] rounded-[5px]'
                onClick={handleSavePassword}
              >
                Update Password
              </button>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;




