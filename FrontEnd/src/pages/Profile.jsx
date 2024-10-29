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
  const [isEditable, setIsEditable] = useState(false);
  const [password, setPassword] = useState(''); // إضافة حالة لحفظ كلمة المرور الجديدة

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

  const handleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleSave = async () => {
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
      setIsEditable(false);
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  const handlePasswordChange = async () => {
    try {
      const response = await axios.post('http://localhost:8050/user/forgetPassword', {
        email
      });

      console.log('Password reset request sent:', response.data);
      setPassword(''); // تفريغ حقل كلمة المرور بعد الإرسال
      alert('Password reset link has been sent to your email.');
    } catch (error) {
      console.error('Error sending password reset request:', error);
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
        <div className='max-md:w-[100%] absolute top-[50%] left-[0%] translate-y-[-50%] flex flex-col gap-y-[3rem] items-center'>
          <div className="profile-card flex flex-col items-start gap-y-[1.5rem] bg-white shadow-lg h-[100vh] p-8 w-[40vw] text-center relative">
            <h1 className="text-2xl font-bold text-[#78006e] mb-4">Welcome, {username}</h1>

            <input
              type='text'
              className='h-[40px] border-[1px] border-[#78006e] focus:outline-none rounded-[5px] px-[10px]'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='First name'
              disabled={!isEditable}
            />
            <div className='flex items-center'>
              <input
                type='email'
                className='h-[40px] w-[80%] border-[1px] px-[10px] focus:outline-none rounded-l-[5px] border-[#78006e]'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditable}
              />
              <button
                className='h-[40px] text-white flex justify-center items-center bg-[#78006e] w-[20%] border-[1px] border-[#78006e] rounded-r-[5px]'
                onClick={isEditable ? handleSave : handleEdit}
              >
                {isEditable ? 'Save' : <FaRegEdit className='text-[1.2rem] font-bold' />}
              </button>
            </div>

            {/* حقل إدخال جديد لتعديل كلمة المرور */}
            <div className='flex items-center gap-y-[1.5rem] flex-col w-full'>
              <input
                type='password'
                className='h-[40px] w-[100%] border-[1px] px-[10px] focus:outline-none rounded-[5px] border-[#78006e]'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='New Password'
              />
              <button
                className='h-[40px] w-[100%] text-white flex justify-center items-center bg-[#78006e] border-[1px] border-[#78006e] rounded-[5px]'
                onClick={handlePasswordChange}
              >
                Update Password
              </button>
            </div>

            <div className='flex w-[100%] justify-center gap-x-[1.2rem]'>
              <button className='px-[16px] py-[5px] border-[1px] rounded-[5px] bg-[#78006e] text-white' onClick={handleLogout}>
                Logout
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

