import { Search, Package, Truck, List, BarChart3, Users, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    // { icon: BarChart3, label: 'Dashboard', active: false },
    { icon: Package, label: 'Create Booking', active: false,path:'/booking' },
    // { icon: List, label: 'Orders List', active: false },
    { icon: Package, label: 'Create Container', active: true,path:'/container' },
    // { icon: List, label: 'Container List', active: false },
    // { icon: Truck, label: 'Track Your Deliveries', active: false },
    // { icon: Users, label: 'Social Media', active: false },
    // { icon: CreditCard, label: 'My Payments', active: false }
  ];
  return (
    <div className="w-80 bg-yellow-100 p-6">
    {/* Logo */}
    <div className="flex items-center mb-8">
      <div className="flex flex-col space-y-1 mr-3">
        <div className="w-4 h-1 bg-cyan-400 rounded"></div>
        <div className="w-4 h-1 bg-blue-500 rounded"></div>
        <div className="w-4 h-1 bg-blue-600 rounded"></div>
      </div>
      <div>
        <h1 className="text-lg font-bold text-gray-800">A to Z Courier</h1>
        <p className="text-sm text-gray-600">Service</p>
      </div>
    </div>

    {/* Menu */}
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Menu</h2>
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <Link to={item.path}
            key={index}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
              item.active 
                ? 'bg-yellow-200 text-gray-800 font-medium' 
                : 'text-gray-700 hover:bg-yellow-50'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  </div>

  )
}

export default Sidebar
