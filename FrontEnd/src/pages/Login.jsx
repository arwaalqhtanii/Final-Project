import React,{useState} from 'react'
import logo from '../assets/img.png'; // تأكد من أن هذا المسار صحيح
import { Link,useNavigate } from 'react-router-dom';


function Login() {
    const navigate=useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
    
       if(email=== ''){
        newErrors.email = 'يجب تعبئة الحقل'
       }else if (!/\S+@\S+\.\S+/.test(email)) {
          newErrors.email = 'يجب كتابة البريد الإلكتروني بطريقة صحيحة';
        }else if(password.length === 0){
             newErrors.password = 'يجب تعبئة الحقل'
        }else if (password.length < 6) {
          newErrors.password = 'يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل';
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

              if (!response.ok) {
                  throw new Error('Login failed');
              }

              const data = await response.json();
              console.log('تسجيل دخول ناجح', data);
              localStorage.setItem('token',data.token);
              localStorage.setItem('id',data.idNumber);
              localStorage.setItem('email',data.user.email);
              navigate('/'); // الانتقال إلى الصفحة الرئيسية بعد تسجيل الدخول الناجح
          } catch (error) {
              console.error('Error:', error);
              setErrors({ general: 'فشل تسجيل الدخول. حاول مرة أخرى.' });
          }
      }
  };

  return (
    <div className=" flex  items-center justify-center min-h-screen bg-white "> 
    <div
      className=" xl:w-[70%] lg:w-[90%] h-1/2 max-sm:w-[90%] bg-white border rounded-lg shadow-2xl  overflow-hidden flex justify-end "
    >
         <div className=" w-[50%] min-h-full max-sm:hidden " >
        <img src={logo} className=" inset-0 w-full h-full object-cover filter blur-xs" alt="شعار" />
      </div>
      <div className='w-1/2 h-full max-sm:w-full'>
      <div className=" flex flex-col justify-center p-8 text-right ">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#78006E]">تسجيل دخول</h2>
        <form className="space-y-4" onClick={handleSubmit}>
      
         
          <div>
            <label className="block mb-1">البريد الإلكتروني <span className="text-red-500">*</span></label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full text-right" required />
            <small className='mr-2 text-red-500'>{errors.email}</small>

          </div>
          <div>
            <label className="block mb-1">كلمة المرور <span className="text-red-500">*</span></label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full text-right" required />
            <small className='mr-2 text-red-500 ' >{errors.password}</small>

          </div>
          
          <div className='w-full flex justify-center items-center  '>
          <button type="submit" className="bg-[#78006E] text-white rounded-full p-2 w-[80%] hover:bg-black hover:text-white " >تسجيل</button>
          </div>
        </form>
        <div className="mt-4 ">
        <p className='text-[#78006E]'>
  ليس لديك حساب؟
  <Link
    to={'/register'}
    className="text-black mr-1 border-b border-black hover:text-[#78006E] hover:border-b-0 transition"
  >
    إنشاء حساب
  </Link>
</p>
          {/* <p><a href="#" className="text-[#78006E]">نسيت كلمة مرور؟</a></p> */}
        </div>
      </div>
      </div>

   
    </div>
  </div>
  )
}

export default Login