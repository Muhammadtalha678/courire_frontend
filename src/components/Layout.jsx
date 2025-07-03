import { Outlet } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Background from "../assets/images/990244-cargo.jpg";
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
      <div className=" max-w-full h-[87vh]">
          <div className="bg-gray-500 z-0 w-full grid grid-cols-2">
            <div className="h-[87vh]">
              <div className=" bg-amber-500 ">
                <img
                  src={Background}
                  alt="left image"
                  width="100%"
                  className="object-cover h-[87vh] rounded-l-xl shadow-lg"
                
                />
              </div>
            </div>
           <Outlet/>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
