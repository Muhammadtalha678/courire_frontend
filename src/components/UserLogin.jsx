import React from 'react'

const UserLogin = () => {
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
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 border-2 border-red-500 focus:outline-none focus:border-red-600 bg-gray-200"
            placeholder="Email address"
          />
        </div>
      {/* <p className='text-red-600 text-sm'>{emailErr}</p> */}

        {/* Password Field */}
        <div className="flex">
          <div className="bg-blue-600 text-yellow-300 px-4 py-3 font-medium text-sm w-32 flex items-center">
            Password
          </div>
          <input
            type="password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            className="flex-1 px-4 py-3 border-2 border-red-500 focus:outline-none focus:border-red-600 bg-gray-200"
            placeholder="Password"
          />
        </div>
        {/* <span className='text-red-600 text-sm'>{passwordErr}</span> */}

        {/* Login Button */}
        <button
        //   disabled={loading}
        //   onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded font-medium hover:bg-blue-700 transition-colors mt-6"
    >
       Login

        </button>
      </div>
    </div>
  </div>
  )
}

export default UserLogin
