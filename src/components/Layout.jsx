import { Outlet } from 'react-router-dom';
import Header from '../components/Header.jsx';
import cargoImg from '../assets/images/images.jpg';
const Layout = () => {
  return (
    <div
      className=""
      style={{
        // backgroundImage: `url(${cargoImg})`,
      }}
    >
      <Header />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
