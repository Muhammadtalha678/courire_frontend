CargoServicesLanding.jsx
import axios from 'axios';
import React, { useState,useEffect } from 'react';
import Background from "../assets/images/990244-cargo.jpg";
import { AppRoutes } from '../constants/AppRoutes';
import TrackingStatus from '../components/TrackingStatus';

export default function CargoServicesLanding() {
  const [trackingId, setTrackingId] = useState('');
  const [showtrackingData, setshowtrackingData] = useState(null);
  // const [shipmentStatus, setShipmentStatus] = useState('');
  const [shipmentContainerDetails, setShipmentContainerDetails] = useState([]);

  const [loading, setLoading] = useState(false)
  const handleSearch =async () => {
    
    try {
      setLoading(true)
      if (trackingId.trim() === '') return;
      if (trackingId.length != 12) {
        alert("tracking id must be of 12 digit")
        return
      };
 
      const response = await axios.get(`${AppRoutes.tracking}/${trackingId}`)
      // console.log(response);
      
      const data = response.data
      // console.log('data',data.data.shipmentParts);
      
      setshowtrackingData(data?.data?.foundTrackingId)
      setShipmentContainerDetails(data?.data?.shipmentParts)
      
    } catch (error) {
      alert(`${error?.response?.data?.errors?.general}` || 'Something went wrong')
      console.log('error:', error);
    } finally {
      
      setLoading(false)
    }
  };
  console.log("shipmentContainerDetails",shipmentContainerDetails);
  console.log("showtrackingData ",showtrackingData );
  return (
    <div className="flex flex-col justify-center">
<div className="backdrop-blur-sm rounded-xl p-8 shadow-lg text-center">
  <h2 className="text-6xl font-semibold text-white mb-6">
    Track Your Shipment
  </h2>

  <div className="flex">
    <input
      type="text"
      value={trackingId}
      onChange={(e) => {
        if (/^[0-9]{0,12}$/.test(e.target.value)) {
          setTrackingId(e.target.value);
        }
      }}
      placeholder="Enter 12 digit tracking ID"
      className="flex-grow p-3 rounded-l-lg border border-gray-300 focus:outline-none"
    />
    <button
      disabled={loading}
      onClick={handleSearch}
      className="bg-blue-600 text-white px-5 rounded-r-lg hover:bg-blue-700 transition"
    >
      {loading ? (<div className="flex justify-center">
    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  </div>) :( "Search")}
    </button>
  </div>
  {
    shipmentContainerDetails.length >0 &&
    shipmentContainerDetails.map((detail,index) => {
      return <TrackingStatus status={detail?.container?.Status} BuiltNo={trackingId} BookingDate={showtrackingData.BookingDate} InvoiceId={`${detail?.invoiceId}/${detail?.pieces}`} ContainerNumber={detail?.container?.ContainerNumber}/>
    })
  }
  {/* {showtrackingData && (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border border-gray-300">
        <tbody>
          {Object.entries(showtrackingData).map(([key, value]) => {

            return (
              <tr key={key} className="border-b border-gray-200">
                <td className="font-semibold capitalize px-3 py-2">
                  {key.replace(/([A-Z])/g, " $1")}
                </td>
                <td className="px-3 py-2">{value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
          </div>

    
  

  )} */}
</div>
</div>
  );
}


