import { useNavigate } from 'react-router-dom';
import riyadhseasonboulevard from '/riyadhseasonboulevard.jfif'
import { useState,useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";

import { FiLogOut } from 'react-icons/fi';  // استيراد أيقونة الخروج
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const Profile = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('example@gmail.com');
  const [isEditable, setIsEditable] = useState(false);

  // Function to toggle edit mode
  const handleEdit = () => {
    setIsEditable(!isEditable);
  };

  // Function to handle email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleLogout = () => {
    // هنا يمكنك إضافة منطق الخروج الفعلي، مثل إزالة الـ token أو مسح بيانات المستخدم
    navigate('/LoginW'); // إعادة التوجيه لصفحة تسجيل الدخول بعد الخروج
  };

  return (

    <div>
      <Navbar></Navbar>
      <div className='w-[100%] h-[100vh] relative'>
        <img className='w-[100%] h-[100%]' src={riyadhseasonboulevard}></img>
        <div className='w-[100%] h-[100%] bg-black opacity-80 absolute top-0'></div>
        <div className='max-md:w-[100%]  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-y-[3rem] items-center'>
          <div className='text-white font-bold text-[3rem]'>Profile</div>

          <div className="profile-card flex flex-col gap-y-[1.5rem] bg-white shadow-lg rounded-lg p-8 w-96 text-center relative">
            {/* أيقونة الخروج */}
            <h1 className="text-2xl font-bold text-[#78006e] mb-4">Welcome</h1>
            <input type='text' className='h-[40px] border-[1px] border-[#78006e] focus:outline-none rounded-[5px] px-[10px]' placeholder='first name'></input>
            <div className='flex items-center'>
              <input
                type='email'
                className='h-[40px] w-[80%] border-[1px] px-[10px] focus:outline-none rounded-l-[5px] border-[#78006e]'
                value={email}
                onChange={handleEmailChange}
                disabled={!isEditable} // Disable input if not editable
              />
              <button
                className='h-[40px] text-white flex justify-center items-center bg-[#78006e] w-[20%] border-[1px] border-[#78006e] rounded-r-[5px]'
                onClick={handleEdit}
              >
                {isEditable ? 'Save' : <FaRegEdit className='text-[1.2rem] font-bold'></FaRegEdit>}
              </button>
            </div>
            <div className='flex w-[100%] justify-center gap-x-[1.2rem]'>
              <button className='px-[16px] py-[5px] border-[1px] rounded-[5px] bg-[#78006e] text-white'>Close</button>
            </div>
          </div>



        </div>
      </div>


      <Footer></Footer>
    </div>

  );
};

export default Profile;
