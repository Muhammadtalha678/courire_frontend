import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ContainerNumber from '../components/ContainerNumber';
import axios from 'axios';
import { AppRoutes } from '../constants/AppRoutes';
import { useAuth } from '../context/AuthContext';
import AddContainer from '../components/AddContainer';
import { toast } from 'react-toastify';

export default function ContainerBooking() {
  const [cities,SetCities] = useState([])
  const [invoices, SetInvoices] = useState([])
  const [containerList, setContainerList] = useState([])
  const [containerBookedList, setContainerBookedList] = useState([])
 
  const [loadingList, setLoadingList] = useState(false);
  const {loading} = useAuth
  
   // ✅ This function can be called after adding a new container
   const refreshContainerList = async () => {
    try {
      const response = await axios.get(AppRoutes.allContainerNoList);
      const updatedContainers = response.data?.data?.containerNumberRecord || [];
      setContainerList(updatedContainers);
    } catch (error) {
      toast.error('Failed to refresh container list');
    }
  };


  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoadingList(true) 
          
        const [cityRes, invoiceRes,containerRes,bookedContainerRes] = await Promise.all([
          axios.get(AppRoutes.allCity),
          axios.get(AppRoutes.allBookingInvoiceNo),
          axios.get(AppRoutes.allContainerNoList),
          axios.get(AppRoutes.allContainersList),
        ]) 
        console.log("Cities:", cityRes);
        console.log("Invoices:", invoiceRes);
        console.log("Containers:", containerRes);
        console.log("Containers:", bookedContainerRes);

          const allCities = cityRes.data?.data?.allCities || [];
        const allInvoices = invoiceRes.data?.data?.bookingInvoices || [];
        const allContainers = containerRes.data?.data?.containerNumberRecord || [];
        const allbookedContainers = bookedContainerRes.data?.data?.containersList || [];
        SetCities(allCities);
        SetInvoices(allInvoices);
        setContainerList(allContainers)
        setContainerBookedList(allbookedContainers)
          
      } catch (error) {
        const err = error?.response?.data?.errors;
            if (err?.general) toast.error(err.general);
            if (!err) toast.error('Something went wrong');
      }finally {
        setLoadingList(false)
        
      }
    }
    fetchCities()
  },[])

  return (
    <div >
      <Header/>
      {
        loadingList ? (<div className="flex items-center justify-center h-screen bg-gray-50 text-purple-600 text-xl">
        Loading...
        </div>) :
        (<div className="p-6 space-y-4 bg-gray-100 min-h-screen">
        
            <ContainerNumber cities={cities} onContainerAdded={refreshContainerList} />

            <AddContainer containerList={containerList} invoiceList={invoices}/>

          <div className="flex justify-between items-center mt-4">
            <div>
              <div className="bg-blue-600 text-white px-4 py-2 w-fit">Selected Bilty</div>
              <table className="border w-full mt-2">
                <thead>
                  <tr className="bg-gray-200">
                    <th>Container No</th>
                    <th>Inv No</th>
                    <th>Shipped Pieces</th>
                  </tr>
                </thead>
                <tbody>
                {containerBookedList.map((containerBook, i) => {
  const invoiceList = containerBook.Invoices || [];

  // Convert Invoices to comma-separated string
  const invoiceString = invoiceList.join(', ');

  // Calculate total shipped pieces
  const shippedTotal = invoiceList.reduce((total, invoice) => {
    const parts = invoice.split('/');
    const pieces = parseInt(parts[1], 10);
    return total + (isNaN(pieces) ? 0 : pieces);
  }, 0);

  return (
    <tr key={i}>
      <td>
        <input className="border w-full text-center" value={containerBook.ContainerNumber} readOnly />
      </td>
      <td>
        <input className="border w-full text-center" value={invoiceString} readOnly />
      </td>
      <td>
        <input className="border w-full text-center" value={shippedTotal} readOnly />
      </td>
    </tr>
  );
})}

                </tbody>
              </table>
            </div>

            
          </div>

         
        </div>)
          
      }

    </div>
  );
}
