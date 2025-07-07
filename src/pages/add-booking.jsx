import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import InvoiceForm from '../components/InvoiceForm'
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppRoutes } from '../constants/AppRoutes';
const AddBooking = () => {
  const [branchList, setBranchList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [loading, setLoading] = useState(false);
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true)
          const [branchRes, cityRes] = await Promise.all([
            axios.get(AppRoutes.allBranch),
            axios.get(AppRoutes.allCity),
          ]);
          console.log(branchRes);
          console.log(cityRes)
          
          const allBranches = branchRes.data?.data?.allBranches || [];
          const allCities = cityRes.data?.data?.allCities || [];
          
          setBranchList(allBranches);
          setCityList(allCities);
          
        } catch (error) {
          console.log(error)
          const err = error?.response?.data?.errors;
              if (err?.general) toast.error(err.general);
              if (!err) toast.error('Something went wrong');
        } finally {
          setLoading(false)
          
        }
      }  
      fetchData()
    },[])
  if (loading) {
    return <h2 className='text-3xl text-blue-700   flex flex-col justify-center items-center h-screen'>Loading....</h2>
  }
  return (
     
    <div>
          <Header />
          <InvoiceForm cityList={cityList} branchList={branchList}/>
    </div>
  )
}

export default AddBooking
