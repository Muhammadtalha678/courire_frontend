import { Link } from 'react-router-dom';

const Header = () => {
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
         <button className="text-gray-800 font-medium underline hover:text-gray-600">
            User Login
          </button> 
          <Link to={'/login'} className="text-gray-800 font-medium underline hover:text-gray-600">
            Admin Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;