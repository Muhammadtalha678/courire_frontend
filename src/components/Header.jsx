import { Link,useNavigate,useLocation } from 'react-router-dom';
import {useAuth} from '../context/AuthContext'

const Header = () => {
      const {user,setUser} = useAuth()
      const navigate = useNavigate()
      const location = useLocation()
      const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login')
        // window.location.href = '/login';
    };
  return (
    <header className="w-full grid px-10 py-10 shadow-sm">
      <div className="  px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-gray-800 text-lg font-bold">LOGO</div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900">
          ABCD – CARGO SERVICES
        </h1>

        {/* Login Links */}
        <div className="flex space-x-6">
          {
            !user? (
              <>
                <Link to={'/'} className="text-gray-800 font-medium underline hover:text-gray-600">
                  Home
                </Link>
              <button className="text-gray-800 font-medium underline hover:text-gray-600">
                  User Login
                </button> 
                <Link to={'/login'} className="text-gray-800 font-medium underline hover:text-gray-600">
                  Admin Login
                </Link>
              </>
            ) : (
                <>
                <Link to={'/'} className="text-gray-800 font-medium underline hover:text-gray-600">
                  Home
                </Link>
                <Link to={'/booking'} className="text-gray-800 font-medium underline hover:text-gray-600">
                  Booking
                </Link>
                <Link to={'/container'} className="text-gray-800 font-medium underline hover:text-gray-600">
                  Container
                </Link>
                <Link to={'/all-bookings'} className="text-gray-800 font-medium underline hover:text-gray-600">
                  All Bookings
                </Link>
                <Link to={'/all-containers'} className="text-gray-800 font-medium underline hover:text-gray-600">
                  All Containers
                </Link>
                <button onClick={handleLogout} className="text-gray-800 font-medium underline hover:text-gray-600">
              Logout
            </button>
                </>
            )
          }
        </div>
      </div>
    </header>
  );
};

export default Header;