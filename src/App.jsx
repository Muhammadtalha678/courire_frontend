import './App.css'
import {Routes,Route} from 'react-router-dom'
import Booking from './pages/booking.jsx'
function App() {

  return (
    <Routes>
      <Route path='/booking' element={<Booking/>}/>
   </Routes>
  )
}

export default App
