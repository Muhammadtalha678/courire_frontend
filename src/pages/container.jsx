import React,{useEffect, useState} from 'react'
import { Search} from 'lucide-react';
import Sidebar from '../comonents/Sidebar'
import axios from 'axios';
const ContainerBooking = () => {
    const cities = ["Riyadh", "Jeddah", "Mecca", "Dammam", "Madina"];

    const [invoives, setInvoices] = useState([])
    const [selectedInvoice,setSelectedInvoice] = useState([])
    const [biltySearch, setBiltySearch] = useState("");

    const filterSearch = invoives.filter((builty) => builty.InvoiceNo.toLowerCase().includes(biltySearch.toLowerCase())) 
    useEffect(() => {
        console.log("filterSearch=>",filterSearch);
        
        const allBookingData = async () => {
            try {
                const data = await axios.get('https://courire-system-backend-express.vercel.app/api/allBooking')
                // const data = await axios.get('http://localhost:5000/api/allBooking')
                setInvoices(data?.data.data?.bookingInvoices)
            } catch (error) {
                console.log(error);            }
        }
         allBookingData() 
        
        
    },[]) 
    
    const [containerNumber, setContainerNumber] = useState('');
    const [supplierName, setSupplierName] = useState('');
    const [portName, setPortName] = useState('');
    const [fromDestination, setFromDestination] = useState('');
    const [toDestination, setToDestination] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('https://courire-system-backend-express.vercel.app/api/addContainer',{containerNumber,
                supplierName,
                portName,
                fromDestination,
                toDestination, totalBuilty: selectedInvoice.length
            })
            const data = response.data
            alert(data?.data?.message)
        } catch (error) {
            console.log("error=>",error);
        }
    }
  
    return (
    <div className="min-h-screen bg-gray-100 flex">
        <Sidebar/>
       <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}

          <form className="grid grid-cols-3 gap-8" onSubmit={handleSubmit}>
            {/* Container Booking Form */}
            <div className="col-span-2 bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Container Booking</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Container Number
                  </label>
                  <input
                    type="text"
                    value={containerNumber}
                    onChange={(e) => setContainerNumber(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter container number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supplier Name
                  </label>
                  <input
                    type="text"
                    value={supplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter supplier name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Port Name
                  </label>
                  <input
                    type="text"
                    value={portName}
                    onChange={(e) => setPortName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter port name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
  {/* FROM Dropdown */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Destination From
    </label>
    <select
      value={fromDestination}
      onChange={(e) => setFromDestination(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      <option value="">Select city</option>
      {cities.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
  </div>

  {/* TO Dropdown */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Destination To
    </label>
    <select
      value={toDestination}
      onChange={(e) => setToDestination(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      <option value="">Select city</option>
      {cities.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
  </div>
</div>


                {/* Add Bilty No Section */}
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Add Invoice No.</h3>
                  
                  <div className="mb-4">
                    <div className="relative">
                      <input
                        type="text"
                        // value={biltySearch}
                        onChange={(e) => setBiltySearch(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                        placeholder="Search your bilty"
                      />
                      <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {filterSearch.map((bilty, index) => (
                      <input
                        key={index}
                        type="text"
                        value={bilty.InvoiceNo}
                            onClick={() => {
                                if (!selectedInvoice.includes(bilty.InvoiceNo)) {
                                    setSelectedInvoice(prevState => ([
                                        ...prevState,bilty.InvoiceNo
                                    ]))
                                }
                        }}
                        // onChange={(e) => handleBiltyChange(index, e.target.value)}
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                        placeholder="Bilty No."
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Display Bilty No Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Display Invoice No.</h3>
              
              <div className="space-y-3 mb-8">
                {selectedInvoice.map((invoice,index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                        <span className="text-sm text-gray-600">{
                        invoice}</span>
                    <div className="w-4 h-4 border border-gray-300 rounded"></div>
                  </div>    
                ))}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                                    <span className="text-sm font-medium text-gray-700">Total Invoice No.
                                        </span>
                                    <span className="text-sm font-medium text-gray-700">
                                        <b>{ selectedInvoice.length}</b></span>
                </div>
              </div>

              <button type='submit' className="w-full bg-gray-600 text-white py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors">
                SAVE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContainerBooking
