import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { AppRoutes } from '../constants/AppRoutes'
import axios from 'axios'

const AddContainerNumber = ({ cities, onContainerAdded,isEdit = false,editDestination, editContainerNumber }) => {
// console.log(editDestination);

  const [formdata, setFormData] = useState({
    ContainerNumber:"",
    From:"",
    To:"",
})
const [fromCityErr,setFromCityErr] = useState('')
const [toCityErr,setToCityErr] = useState('')
const [containerErr,setContainerErr] = useState('')
const [loading,setLoading] = useState(false)
const handleChange = (e) => {
    const {name,value} = e.target
    setFormData((prevState) => ({
        ...prevState,[name]:value
    }))
}

const handleSubmit = async () => {
        
        try {
            setLoading(true)
            setContainerErr('')
            setFromCityErr('')
            setToCityErr('')
            if (!formdata.ContainerNumber.trim()) {
                setContainerErr('Container Number are required!');
                return;
                
            }
            if (!formdata.From.trim()) {
                setFromCityErr('From City are required!');
                return;
                
            }
            if (!formdata.To.trim()) {
                setToCityErr('To City are required!');
                return;
                
            }
            const response = await axios.post(AppRoutes.addContainerNo,formdata)
            const data = response.data;
            toast.success(data?.data?.message);
            setFormData({
              ContainerNumber: '',
              From: '',
              To: '',
            });
             // ✅ Call the prop to refresh container list in parent
            if (onContainerAdded) {
              await onContainerAdded();
            }

            //   navigate('/services')
            
            
        } catch (error) {
            const err = error?.response?.data?.errors;
            console.log(error);
            
            if (err?.container) setContainerErr(err.container);
            if (err?.general) toast.error(err.general);
            if (!err) toast.error('Something went wrong');
            
        } finally {
            setLoading(false)
            
        }
    }
  return (
    <>
     <h2 className="text-xl font-semibold text-gray-700">Container Entry</h2>

<div className="grid grid-cols-7 gap-4 items-center">
  <input
    placeholder="Type Container No"
    value={!isEdit ? formdata.ContainerNumber :editContainerNumber }
    onChange={!isEdit ? handleChange:undefined}
    name="ContainerNumber"
          disabled={isEdit}
    className="col-span-2 border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  {containerErr && <span className="text-red-500 text-sm">{containerErr}</span>}
  <h1 className="bg-blue-700 text-white px-4 py-2 rounded-t-md font-semibold">
    Location
  </h1>
        <select
          disabled={isEdit}
            name="From"
            value={!isEdit ? formdata.From:editDestination.From}
            onChange={!isEdit ? handleChange:undefined}
            className="border p-2"
          >
            <option value="">Select From</option>
            {!isEdit &&  cities.map((city, index) => (
              <option key={index} value={city.city}>{city.city}</option>
            ))}
            {isEdit &&  
              <option  value={editDestination.From}>{editDestination.From}</option>
            }
          </select>
          {!isEdit && fromCityErr && <span className="text-red-500 text-sm">{fromCityErr}</span>}
          <select
          value={!isEdit ? formdata.To : editDestination.To}
          name="To"
          onChange={!isEdit ? handleChange:undefined}
          className="border p-2"
          disabled={isEdit}
          >
            <option value="">Select To</option>
            {!isEdit && cities.map((city, index) => (
              <option key={index} value={city.city}>{city.city}</option>
            ))}
            {isEdit &&  
              <option  value={editDestination.To}>{editDestination.To}</option>
            }
          </select>
          {!isEdit && toCityErr && <span className="text-red-500 text-sm">{toCityErr}</span>}
  {
          !isEdit &&
          <>
        <button
   disabled ={isEdit ? isEdit : loading}
    onClick={!isEdit ? handleSubmit: undefined}
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
  >
    {!isEdit && loading ? (
              <svg className="animate-spin h-5 w-5 mx-auto text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : 'Save'}
  </button>
  {/* <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow">
    Edit
  </button>
  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow">
    Del
  </button> */}
          </>
  }
</div>
    </>
  )
}

export default AddContainerNumber
