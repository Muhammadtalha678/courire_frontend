import './App.css'
import {Routes,Route} from 'react-router-dom'
import Booking from './pages/booking.jsx'
import ContainerBooking from './pages/container.jsx'
function App() {

  return (
    <Routes>
      <Route path='/booking' element={<Booking/>}/> 
      <Route path='/container' element={<ContainerBooking/>}/> 
   </Routes>
  )
}

export default App
