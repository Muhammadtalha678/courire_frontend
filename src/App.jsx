import './App.css'
import {Routes,Route} from 'react-router-dom'
import ContainerBooking from './pages/container.jsx'
import Layout from './components/Layout.jsx'
import CargoServicesLanding from './pages/CargoServicesLanding.jsx'
import Login from './pages/login.jsx'
import BookingList from './pages/bookingList.jsx'
import ContainerList from './pages/containerList.jsx'
import Services from './pages/services.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { useAuth } from './context/AuthContext.jsx'
import PublicRoute from './components/PublicRoute.jsx'
import NotFound from './components/Not-Found.jsx'
import { ToastContainer } from 'react-toastify'
import AddBooking from './pages/add-booking.jsx'
import AdminPannel from './pages/admin-pannel.jsx'
import UpdateContainer from './pages/update-container.jsx'
import EditContainer from './pages/edit-container.jsx'
import EditBooking from './pages/edit-booking.jsx'
import UserLogin from './pages/user-login.jsx'
import AdminPannelAction from './pages/AdminPannelAction.jsx'
import ContainerBulkStatus from './pages/container-bulk-status.jsx'
import WhatsAppMarketing from './pages/whatsapp-marketing.jsx'
import PrivacyPolicy from './pages/privacy-policy.jsx'
import Terms from './pages/terms.jsx'
function App() {
  const { loading } = useAuth()
  if (loading) {
    // console.log(loading);
    
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 text-purple-600 text-xl">
        Loading...
      </div>
    );
  }
  return (
    <>
    <Routes>
      <Route element={<ProtectedRoute/>}>
          <Route path='/add-booking' element={<AddBooking/>}/> 
          <Route path='/edit-booking/edit/:id' element={<EditBooking/>}/> 
          <Route path='/container' element={<ContainerBooking/>}/> 
          <Route path='/all-bookings' element={<BookingList/>}/> 
          <Route path='/all-containers' element={<ContainerList/>}/> 
          <Route path='/all-container-bulk-status' element={<ContainerBulkStatus/>}/> 
          <Route path={'/admin-pannel'} element={<AdminPannel/>}/>        
          <Route path={'/admin-pannel-action'} element={<AdminPannelAction/>}/>        
          <Route path="/update-container/edit/:id" element={<UpdateContainer />} />
          <Route path="/edit-container/edit/:id" element={<EditContainer />} />
          <Route path="/whatsapp-marketing" element={<WhatsAppMarketing />} />
       
          
      </Route>
      <Route element={<Layout/>}>
          <Route element={<PublicRoute/>}>
            <Route path={'/login'} element={<Login/>}/>        
            <Route path={'/user-login'} element={<UserLogin/>}/>        
            {/* <Route path={'/privacy-policy'} element={<PrivacyPolicy/>}/>         */}
         </Route>
        
          <Route path='/' element={<CargoServicesLanding/>}/> 
          <Route element={<ProtectedRoute/>}>
            <Route path='/services' element={<Services/>}/> 
            {/* <Route path={'/user-login'} element={<UserLogin/>}/>  */}
        </Route>
      </Route>
      <Route path='*' element={<NotFound />} />
       <Route element={<PublicRoute/>}>
            {/* <Route path={'/login'} element={<Login/>}/>        
            <Route path={'/user-login'} element={<UserLogin/>}/>         */}
            <Route path={'/privacy-policy'} element={<PrivacyPolicy/>}/>        
            <Route path={'/terms-of-services'} element={<Terms/>}/>        
         </Route>
        
      </Routes>
      <ToastContainer position='top-center' autoClose={2000} />
    </>
  )
}

export default App
