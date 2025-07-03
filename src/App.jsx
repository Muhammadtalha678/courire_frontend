import './App.css'
import {Routes,Route} from 'react-router-dom'
import Booking from './pages/booking.jsx'
import ContainerBooking from './pages/container.jsx'
// import TrackingPage from './pages/tracking.jsx'
import Layout from './components/Layout.jsx'
import CargoServicesLanding from './pages/CargoServicesLanding.jsx'
function App() {

  return (
    <Routes>
      <Route element={<Layout/>}>

        <Route path='/' element={<CargoServicesLanding/>}/> 
        <Route path='/booking' element={<Booking/>}/> 
        <Route path='/container' element={<ContainerBooking/>}/> 
      </Route>
   </Routes>
  )
}

export default App
