import './App.css'
import {Routes,Route} from 'react-router-dom'
import Booking from './pages/booking.jsx'
import ContainerBooking from './pages/container.jsx'
// import TrackingPage from './pages/tracking.jsx'
import Layout from './components/Layout.jsx'
import CargoServicesLanding from './pages/CargoServicesLanding.jsx'
import Login from './pages/login.jsx'
import BookingList from './pages/bookingList.jsx'
import ContainerList from './pages/containerList.jsx'
import Services from './pages/services.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { useAuth } from './context/AuthContext.jsx'
import {Navigate} from 'react-router-dom'
import PublicRoute from './components/PublicRoute.jsx'
import NotFound from './components/Not-Found.jsx'
import UserLogin from './components/UserLogin.jsx'
import { ToastContainer } from 'react-toastify'
function App() {
  const {user} = useAuth()
  return (
    <>
    <Routes>
      <Route element={<ProtectedRoute/>}>
          <Route path='/booking' element={<Booking/>}/> 
          <Route path='/container' element={<ContainerBooking/>}/> 
          <Route path='/all-bookings' element={<BookingList/>}/> 
          <Route path='/all-containers' element={<ContainerList/>}/> 
          
      </Route>
      <Route element={<Layout/>}>
          <Route element={<PublicRoute/>}>
            <Route path={'/login'} element={<Login/>}/>        
         </Route>
        
          <Route path='/' element={<CargoServicesLanding/>}/> 
          <Route element={<ProtectedRoute/>}>
          <Route path='/services' element={<Services/>}/> 
          {/* <Route path={'/user-login'} element={<UserLogin/>}/>  */}
        </Route>
      </Route>
      <Route path='*' element={<NotFound />} />
      
      </Routes>
      <ToastContainer position='top-center' autoClose={2000} />
    </>
  )
}

export default App
