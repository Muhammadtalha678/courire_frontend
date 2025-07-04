const BASE_URL = import.meta.env.VITE_BASE_URL;
// console.log(DEV_URL);
// console.log(PROD_URL);
console.log(BASE_URL);


export const AppRoutes = {
    login: BASE_URL + "/api/auth/login",
    // booking routers
    addBooking: BASE_URL + "/api/addBooking",
    allBookings: BASE_URL + "/api/bookings",
    // delet booking by bilty no
    deleteBooking: BASE_URL + "/api/deleteBooking",
    // edit booking by bilty no
    editBooking: BASE_URL + "/api/editBooking",
    
    // container routers
    addContainer: BASE_URL + "/api/addContainer",
    allBookingInvoiceNo: BASE_URL + "/api/allBookingInvoiceNo",
    allContainersList: BASE_URL + "/api/allContainersList",
    
    //search data by tracking id
    tracking: BASE_URL + "/api/tracking",
    
    // user info route
    userInfo: BASE_URL + "/api/userInfo",
    
}