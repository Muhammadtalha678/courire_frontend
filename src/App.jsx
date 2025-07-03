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
function App() {

  return (
    <Routes>
      <Route element={<Layout/>}>

        <Route path='/' element={<CargoServicesLanding/>}/> 
        <Route path='/booking' element={<Booking/>}/> 
        <Route path='/container' element={<ContainerBooking/>}/> 
        <Route path='/login' element={<Login/>}/> 
        <Route path='/all-bookings' element={<BookingList/>}/> 
        <Route path='/all-containers' element={<ContainerList/>}/> 
      </Route>
   </Routes>
  )
}

export default App
