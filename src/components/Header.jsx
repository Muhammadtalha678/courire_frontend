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
  const headerMenuItems = [
    { label: 'Home',path:'/' },
    { label: 'Booking',path:'/add-booking' },
    { label: 'Container',path:'/container' },
    { label: 'All Bookings',path:'/all-bookings' },
    { label: 'All Containers',path:'/all-containers' },
    { label: 'Services',path:'/services' },
   
    
  ];
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
            !user && location.pathname === '/' ?
              (
                <>
                {/* <Link to="/" className="text-gray-800 font-medium hover:cursor-pointer underline hover:text-gray-600">
            Home
          </Link> */}
          {/* <button className="text-gray-800 font-medium underline cursor-pointer hover:text-gray-600 ">
            User Login
          </button> */}
          <Link to="/user-login" className="text-gray-800 font-medium hover:cursor-pointer underline hover:text-gray-600">
            User Login
          </Link> 
          <Link to="/login" className="text-gray-800 font-medium hover:cursor-pointer underline hover:text-gray-600">
            Admin Login
          </Link> 
          <Link to="/privacy-policy" className="text-gray-800 font-medium hover:cursor-pointer underline hover:text-gray-600">
            Privacy Policy
          </Link> 
          <Link to="/terms-of-services" className="text-gray-800 font-medium hover:cursor-pointer underline hover:text-gray-600">
            Terms of Services
          </Link> 
                </>
              ) :
              user && location.pathname === '/' ?
                (
                  <>
                    <Link to="/services" className="text-gray-800 font-medium hover:cursor-pointer underline hover:text-gray-600">
            Services
          </Link>
                  
                    <button onClick={handleLogout} className=" text-gray-800 font-medium underline cursor-pointer hover:text-gray-600">
                      Logout
                    </button>
                    
                  </>
                ) :
                user && location.pathname === '/services' ?
                  (
                    <>
                    <Link to="/" className="text-gray-800 font-medium hover:cursor-pointer underline hover:text-gray-600">
                      Home
                    </Link>
                    <button onClick={handleLogout} className="text-gray-800 font-medium underline hover:text-gray-600 cursor-pointer">
                      Logout
                    </button>
                  </>
                  ) :
                  !user && location.pathname === '/login' ? (
                    <>
                    <Link  to={'/'} className="text-gray-800 font-medium underline hover:text-gray-600">
                      Home
                    </Link>
                    <Link  to={'/privacy-policy'} className="text-gray-800 font-medium underline hover:text-gray-600">
                      Privacy Policy
                      </Link>
                      <Link to="/terms-of-services" className="text-gray-800 font-medium hover:cursor-pointer underline hover:text-gray-600">
            Terms of Services
          </Link>
                    </>
                  ) :
                    !user && location.pathname === '/user-login' ? (
                    <>
                    <Link  to={'/'} className="text-gray-800 font-medium underline hover:text-gray-600">
                      Home
                          </Link>
                          <Link to="/privacy-policy" className="text-gray-800 font-medium hover:cursor-pointer underline hover:text-gray-600">
            Privacy Policy
          </Link>
                          <Link to="/terms-of-services" className="text-gray-800 font-medium hover:cursor-pointer underline hover:text-gray-600">
            Terms of Services
          </Link>
                    </>
                  ):
                  !user && location.pathname === '/privacy-policy' ? (
                    <>
                    <Link  to={'/'} className="text-gray-800 font-medium underline hover:text-gray-600">
                      Home
                    </Link>
                    <Link  to={'/user-login'} className="text-gray-800 font-medium underline hover:text-gray-600">
                      User Login
                    </Link>
                    <Link  to={'/login'} className="text-gray-800 font-medium underline hover:text-gray-600">
                      Admin Login
                    </Link>
                    <Link to="/terms-of-services" className="text-gray-800 font-medium hover:cursor-pointer underline hover:text-gray-600">
            Terms of Services
          </Link>
                    </>
                  ):
                  !user && location.pathname === '/terms-of-services' ? (
                    <>
                    <Link  to={'/'} className="text-gray-800 font-medium underline hover:text-gray-600">
                      Home
                    </Link>
                    <Link  to={'/user-login'} className="text-gray-800 font-medium underline hover:text-gray-600">
                      User Login
                    </Link>
                    <Link  to={'/login'} className="text-gray-800 font-medium underline hover:text-gray-600">
                      Admin Login
                    </Link>
                    <Link to="/privacy-policy" className="text-gray-800 font-medium hover:cursor-pointer underline hover:text-gray-600">
            Privacy Policy
          </Link>
                    </>
                  ):
                  
                    user && location.pathname === '/add-booking' ?
                      (
                        <>
                          <button  onClick={() => navigate(-1)} className="text-gray-800 font-medium underline hover:text-gray-600 cursor-pointer">
                            Go Back
                          </button>
                          <button onClick={handleLogout} className="text-gray-800 font-medium underline hover:text-gray-600 cursor-pointer">
                            Logout
                          </button>
                    
                        </>
                      ):
                    user && location.pathname === '/container' ?
                      (
                        <>
                          <button  onClick={() => navigate(-1)} className="text-gray-800 font-medium underline hover:text-gray-600 cursor-pointer">
                            Back
                          </button>
                          <Link  to={'/add-booking'} className="text-gray-800 font-medium underline hover:text-gray-600">
                            Invoice
                          </Link>
                          <button onClick={handleLogout} className="text-gray-800 font-medium underline hover:text-gray-600 cursor-pointer">
                            Logout
                          </button>
                    
                        </>
                      ):
                      user && location.pathname.includes('update-container') ?
                      (
                        <>
                          <button  onClick={() => navigate(-1)} className="text-gray-800 font-medium underline hover:text-gray-600 cursor-pointer">
                            Back
                          </button>
                          <Link  to={'/add-booking'} className="text-gray-800 font-medium underline hover:text-gray-600">
                            Inv
                          </Link>
                          <button onClick={handleLogout} className="text-gray-800 font-medium underline hover:text-gray-600 cursor-pointer">
                            Logout
                          </button>
                    
                        </>
                      ):
                    user && location.pathname === '/admin-pannel' ?
                      (
                        <>
                          <button  onClick={() => navigate(-1)} className="text-gray-800 font-medium underline hover:text-gray-600 cursor-pointer">
                            Go Back
                          </button>
                          <Link  to={'/add-booking'} className="text-gray-800 font-medium underline hover:text-gray-600">
                            Inv
                          </Link>
                          <button onClick={handleLogout} className="text-gray-800 font-medium underline hover:text-gray-600 cursor-pointer">
                            Logout
                          </button>
                    
                        </>
                      ):
                  <>
                  
                  {headerMenuItems.map((m, i) => (
                    <Link key={i} to={m.path} className="text-gray-800 font-medium underline hover:text-gray-600">
                      {m.label}
                    </Link>
                  ))}
                  <button onClick={handleLogout} className="text-gray-800 font-medium underline hover:text-gray-600 cursor-pointer">
                    Logout
                  </button>
                  </>

          }
        </div>
      </div>
    </header>
  );
};

export default Header;