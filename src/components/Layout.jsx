import { Outlet } from 'react-router-dom';
import Header from '../components/Header.jsx';
import cargoImg from '../assets/images/images.jpg';
const Layout = () => {
  return (
    <div
      className="min-h-screen w-full bg-no-repeat bg-cover bg-center"
      style={{
        // backgroundImage: `url(${cargoImg})`,
      }}
    >
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
