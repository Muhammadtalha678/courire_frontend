import React,{useState} from 'react'

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = () => {
      if (userName.trim() && password.trim()) {
        console.log('Login attempted with:', { userName, password });
        // Add your login logic here
      }
    };
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
                  User Name
                </div>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-red-500 focus:outline-none focus:border-red-600 bg-gray-200"
                  placeholder=""
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
                  placeholder=""
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
