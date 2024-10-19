import React ,{ useState }from 'react';
import logo from '../assets/img.png'; 
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';


function Register() {
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
if(idNumber.length==0){
  newErrors.idNumber = 'يجب تعبئة الحقل';
}else if (idNumber.length !== 9) {
      newErrors.idNumber = 'يجب أن يحتوي رقم الهوية على 9 أرقام فقط';
    } else if(email ===''){
      newErrors.email = 'يجب تعبئة الحقل';

    }else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'يجب كتابة البريد الإلكتروني بطريقة صحيحة';
    }else if (password ===''){
      newErrors.password = 'يجب تعبئة الحقل';
    } else if (password.length < 6) {
      newErrors.password = 'يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل';
    }else if(confirmPassword === ''){
      newErrors.confirmPassword = 'يجب تعبئة الحقل';
    }else  if (password !== confirmPassword) {
      newErrors.confirmPassword = 'يجب أن تتطابق كلمة المرور';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      try {
          // Send the data to the backend
          const response = await axios.post('http://localhost:8050/user/register', {
              idNumber,
              email,
              password,
          });

          if (response.status === 201) {
            console.log('test good!!!');
            
              alert('Registration successful!');
              navigate('/login'); // Navigate to the login page
          }
      } catch (error) {
          // Handle error from the server
          if (error.response && error.response.data) {
              setErrors({ api: error.response.data.message });
          } else {
              setErrors({ api: 'Registration failed. Please try again.' });
          }
      }
  }
};

  return (
    <>
      <div className=" flex  items-center justify-center min-h-screen bg-white "> 
        <div
          className=" xl:w-[70%] lg:w-[90%] max-sm:w-[90%]  bg-white border rounded-lg shadow-2xl  overflow-hidden flex justify-end "
        >
             <div className=" w-[50%] min-h-full max-sm:hidden " >
            <img src={logo} className=" inset-0 w-full h-full object-cover filter blur-xs" alt="شعار" />
          </div>
          <div className='w-1/2 h-full max-sm:w-full'>
          <div className=" flex flex-col justify-center p-8 text-right ">
            <h2 className="text-2xl font-bold mb-4 text-center text-[#78006E]">إنشاء الحساب</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
            {/* <div>
                <label className="block mb-1">اسم المستخدم <span className="text-red-500">*</span></label>
                <input type="text"  className="border border-gray-300 rounded-md p-2 w-full text-right" required />
                <small className='mr-2'>يجب ان يحتوي اسم المستخدم على حرف واحد على الاقل كبير </small>
              </div> */}
              <div>
                <label className="block mb-1">رقم الهوية <span className="text-red-500">*</span></label>
                <input type="text" value={idNumber} onChange={(e)=>setIdNumber(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full text-right" required />
                <small className='mr-2 text-red-500'>{errors.idNumber}</small>

              </div>
              <div>
                <label className="block mb-1">البريد الإلكتروني <span className="text-red-500">*</span></label>
                <input type="email"  value={email} onChange={(e)=>setEmail(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full text-right" required />
                <small className='mr-2 text-red-500'>{errors.email}</small>

              </div>
              <div>
                <label className="block mb-1">كلمة المرور <span className="text-red-500">*</span></label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}   className="border border-gray-300 rounded-md p-2 w-full text-right" required />
                <small className='mr-2 text-red-500'>{errors.password}</small>

              </div>
              <div>
                <label className="block mb-1"> تأكيد كلمة المرور   <span className="text-red-500">*</span></label>
                <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="border border-gray-300 rounded-md p-2  w-full text-right" required />
                <small className='mr-2 text-red-500'>{errors.confirmPassword}</small>

              </div>
              <div className='w-full flex justify-center items-center'>
              <button type="submit" className="bg-[#78006E] text-white rounded-full p-2 w-[80%] hover:bg-black hover:text-white " >تسجيل</button>
              </div>
            </form>
            <div className="mt-4">
            <p className='text-[#78006E]'>
  هل لديك حساب بالفعل؟
  <Link
    to={'/login'}
    className="text-[black] mr-1 border-b border-[black] hover:text-[#78006E] hover:border-b-0  transition"
  >
    تسجيل دخول
  </Link>
</p>
              {/* <p><a href="#" className="text-[#78006E]">نسيت كلمة مرور؟</a></p> */}
            </div>
          </div>
          </div>

       
        </div>
      </div>
    </>
  );
}

export default Register;
