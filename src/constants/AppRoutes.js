// import moduleName from 'dotenv/config'

const DEV_URL = import.meta.env.VITE_BASE_URL_DEV
const PROD_URL = import.meta.env.VITE_BASE_URL_PROD
// console.log("process.env.BASE_URL_DEV",process.env.BASE_URL_DEV);


const BASE_URL = import.meta.env.NODE_ENV === 'production' ? PROD_URL : DEV_URL

// console.log(DEV_URL);
// console.log(PROD_URL);


export const AppRoutes = {
    login: BASE_URL + "/api/auth/login",
    // booking routers
    addBooking: BASE_URL + "/api/addBooking",
    allBookings: BASE_URL + "/api/bookings",
    
    // container routers
    addContainer: BASE_URL + "/api/addContainer",
    allBookingInvoiceNo: BASE_URL + "/api/allBookingInvoiceNo",
    allContainersList: BASE_URL + "/api/allContainersList",
    
    //search data by tracking id
    tracking: BASE_URL + "/api/tracking",
    
    // user info route
    userInfo: BASE_URL + "/api/userInfo",
}