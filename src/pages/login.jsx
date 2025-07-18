import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { useNavigate,useLocation  } from 'react-router-dom';
import { AppRoutes } from '../constants/AppRoutes';
import {useAuth} from '../context/AuthContext'
import { toast } from 'react-toastify';
const Login = () => {
    const {setUser} = useAuth()
    const location = useLocation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErr,setEmailErr] = useState('')
    const [passwordErr,setPasswordErr] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();
    const handleLogin =async () => {
      try {
        setLoading(true)
        setEmailErr('');
        setPasswordErr('');
          // Simple email regex for validation
          const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!email.trim()) {
        setEmailErr('Email are required!');
        return;
      }
     
      if (!password.trim()) {
        setPasswordErr('Password are required!');
        return;
        
      }
      
      if (!isValidEmail) {
        setEmailErr('Please enter a valid email address!');
        return;
      }
    const response = await axios.post(AppRoutes.login,{email,password})
    const data = response.data;
    
    localStorage.setItem('token',data?.data?.userData?.accessToken)
    setUser(data?.data?.userData?.email)
    console.log(data);
    
    toast.success(data?.data?.message);
    navigate('/services')
    
    
} catch (error) {
    console.log(error);
    const err = error?.response?.data?.errors;
    if (err?.email) setEmailErr(err.email);
    if (err?.general) toast.error(err.general);
    if (!err) toast.error('Something went wrong');
  
} finally{
  setLoading(false)
  
}
      
  };
  const pathName = location.pathname
    // useEffect(() => {
    //     const user = localStorage.getItem('user');
    //     if (user) {
    //       navigate('/services');
    //     }
    //   }, [navigate]);
  return (
  <div className="flex justify-center items-center min-h-96">
  <form
    className="bg-white/20 backdrop-blur-sm p-8 rounded-lg shadow-lg"
    onSubmit={(e) => {
      e.preventDefault(); // prevent page refresh
      handleLogin(); // your login logic
    }}
  >
    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
      {pathName === '/login' ? 'Admin Login' : 'User Login'}
    </h2>

    <div className="space-y-4 w-96">
      {/* Email Field */}
      <div className="flex">
        <div className="bg-blue-600 text-yellow-300 px-4 py-3 font-medium text-sm w-32 flex items-center">
          Email
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 border-2 border-red-500 focus:outline-none focus:border-red-600 bg-gray-200"
          placeholder="Email address"
        />
      </div>
      <p className="text-red-600 text-sm">{emailErr}</p>

      {/* Password Field */}
      <div className="flex">
        <div className="bg-blue-600 text-yellow-300 px-4 py-3 font-medium text-sm w-32 flex items-center">
          Password
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="flex-1 px-4 py-3 border-2 border-red-500 focus:outline-none focus:border-red-600 bg-gray-200"
          placeholder="Password"
        />
      </div>
      <span className="text-red-600 text-sm">{passwordErr}</span>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded font-medium hover:bg-blue-700 transition-colors mt-6 cursor-pointer"
      >
        {loading ? (
          <div className="flex justify-center">
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </div>
        ) : (
          'Login'
        )}
      </button>
    </div>
  </form>
</div>

  )
}

export default Login
