import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import InvoiceForm from '../components/InvoiceForm'
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppRoutes } from '../constants/AppRoutes';
import {useAuth} from '../context/AuthContext'
const AddBooking = () => {
  const [branchList, setBranchList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const {loading} = useAuth  
  useEffect(() => {
      const fetchData = async () => {
        try {
          loading == false && setLoadingList(true) 
          
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
          loading == false && setLoadingList(false)
          
        }
      }  
      fetchData()
    },[])
  
  return (
     
    <div>
          <Header />
          <InvoiceForm cityList={cityList} branchList={branchList} loadingList={loadingList}/>
    </div>
  )
}

export default AddBooking
