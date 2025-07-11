const BASE_URL = import.meta.env.VITE_BASE_URL;
// console.log(DEV_URL);
// console.log(PROD_URL);
console.log(BASE_URL);


export const AppRoutes = {
    register: BASE_URL + "/api/auth/register",
    login: BASE_URL + "/api/auth/login",
    // booking routers
    addBooking: BASE_URL + "/api/addBooking",
    allBookings: BASE_URL + "/api/bookings",
    // delet booking by bilty no
    deleteBooking: BASE_URL + "/api/deleteBooking",
    // edit booking by bilty no
    editBooking: BASE_URL + "/api/editBooking",
    editBookingById: BASE_URL + "/api/editBookingById",
    
    // container routers
    addContainer: BASE_URL + "/api/addContainer",
    allBookingInvoiceNo: BASE_URL + "/api/allBookingInvoiceNo",
    allContainersList: BASE_URL + "/api/allContainersList",
    getSingleContainer: BASE_URL + "/api/container",
    updateSingleContainer: BASE_URL + "/api/update-container",
    getBookingById: BASE_URL + "/api/getBookingById",
    editBookingById: BASE_URL + "/api/editBookingById",
    
    //search data by tracking id
    tracking: BASE_URL + "/api/tracking",
    
    // user info route
    userInfo: BASE_URL + "/api/userInfo",
    
    // Add city route
    addCity: BASE_URL + "/api/addCity",
    allCity: BASE_URL + "/api/allCity",
    
    // Add branch route
    addBranch: BASE_URL + "/api/addBranch",
    allBranch: BASE_URL + "/api/allBranch",
    editBranch: BASE_URL + "/api/editBranch",
    
    // Add ContainerNo route
    addContainerNo: BASE_URL + "/api/addContainerNo",
    editContainerNo: BASE_URL + "/api/editContainerNo",
    deleteContainerNo: BASE_URL + "/api/deleteContainerNo",
    allContainerNoList: BASE_URL + "/api/allContainerNoList",
}