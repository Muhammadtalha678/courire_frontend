import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { useNavigate  } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin =async () => {
        try {
                     // Simple email regex for validation
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!email.trim() || !password.trim()) {
        alert('Email and password are required!');
        return;
      }
  
      if (!isValidEmail) {
        alert('Please enter a valid email address!');
        return;
    }
    const response = await axios.post("http://localhost:5000/api/auth/login",{email,password})
    const data = response.data
    localStorage.setItem('user',data?.data?.userData?.email)
    alert(data?.data?.message);
    navigate('/services')
    
    
} catch (error) {
    console.log(error);
    
    alert(`${error?.response?.data?.errors?.email}` || 'Something went wrong')
        }
      
    };
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
          navigate('/services');
        }
      }, [navigate]);
  return (
    <div className="flex justify-center items-center min-h-96">
          <div className="bg-white/20 backdrop-blur-sm p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              User Login
            </h2>
            
            <div className="space-y-4 w-96">
              {/* User Name Field */}
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

              {/* Login Button */}
              <button
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded font-medium hover:bg-blue-700 transition-colors mt-6"
              >
                Login
              </button>
            </div>
          </div>
        </div>
  )
}

export default Login
