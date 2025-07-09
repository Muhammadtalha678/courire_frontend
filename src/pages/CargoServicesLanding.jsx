CargoServicesLanding.jsx
import axios from 'axios';
import React, { useState,useEffect } from 'react';
import Background from "../assets/images/990244-cargo.jpg";
import { AppRoutes } from '../constants/AppRoutes';
import TrackingStatus from '../components/TrackingStatus';
import { toast } from 'react-toastify';

export default function CargoServicesLanding() {
  const [trackingId, setTrackingId] = useState('');
  const [showtrackingData, setshowtrackingData] = useState(null);
  const [showMoreDetails, setshowMoreDetails] = useState(false);
  // const [shipmentStatus, setShipmentStatus] = useState('');
  const [shipmentContainerDetails, setShipmentContainerDetails] = useState([]);

  const [loading, setLoading] = useState(false)
  const handleSearch =async () => {
    
    try {
      setLoading(true)
      if (trackingId.trim() === '') {
        setshowtrackingData(null); setshowMoreDetails(false); setShipmentContainerDetails([]);  
      };
      if (trackingId.length != 12) {
        toast.error("tracking id must be of 12 digit")
        return
      };
 
      const response = await axios.get(`${AppRoutes.tracking}/${trackingId}`)
      // console.log(response);
      
      const data = response.data
      // console.log('data',data.data.shipmentParts);
      
      setshowtrackingData(data?.data?.foundTrackingId)
      setShipmentContainerDetails(data?.data?.shipmentParts)
    } catch (error) {
       console.log(error);
          const err = error?.response?.data?.errors;
      if (err?.trackingId) { setshowtrackingData(null); setshowMoreDetails(false); setShipmentContainerDetails([]);   toast.error(err.trackingId)};
          if (err?.general) toast.error(err.general);
          if (!err) toast.error('Something went wrong');
    } finally {
      
      setLoading(false)
    }
  };
  
  console.log("shipmentContainerDetails",shipmentContainerDetails);
  console.log("showtrackingData ",showtrackingData );
  // console.log(r);
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
 {shipmentContainerDetails.length > 0 &&
  shipmentContainerDetails.map((detail, index) => {
    const containerStatus = detail?.container?.Status || detail?.status || "Status not available";
    const containerNumber = detail?.container?.ContainerNumber || "N/A";
    return (
      <TrackingStatus
        key={index}
        status={containerStatus}
        BuiltNo={detail?.trackingId}
        BookingDate={showtrackingData.BookingDate}
        InvoiceId={`${detail?.invoiceId}/${detail?.pieces}`}
        ContainerNumber={containerNumber}
      />
    );
  })}

  {
    !showMoreDetails && showtrackingData && 
    <button
    onClick={() => setshowMoreDetails(true)}
    className="bg-blue-600 text-white px-5 py-2 mt-4 rounded-lg hover:bg-blue-700 transition"
  >
    Show More Details
  </button>
  
  }
  {showMoreDetails && showtrackingData && (
    <div className="w-full px-4">
  <div className="w-full overflow-x-auto shadow-md sm:rounded-lg">
    <table className="min-w-full text-sm text-left text-gray-700 bg-white">
      <thead className="text-xl uppercase bg-gray-200 text-gray-800">
        <tr className="border-b border-gray-300">
          <th className="px-6 py-3 text-center whitespace-nowrap">Bilty No</th>
          <th className="px-6 py-3 text-center whitespace-nowrap">Invoice No</th>
          <th className="px-6 py-3 text-center whitespace-nowrap">Booking Date</th>
          <th className="px-6 py-3 text-center whitespace-nowrap">Sender Name</th>
          <th className="px-6 py-3 text-center whitespace-nowrap">Sender Mobile</th>
          <th className="px-6 py-3 text-center whitespace-nowrap">Sender City</th>
          <th className="px-6 py-3 text-center whitespace-nowrap">Receiver Name</th>
          <th className="px-6 py-3 text-center whitespace-nowrap">Receiver Mobile 1</th>
          <th className="px-6 py-3 text-center whitespace-nowrap">Receiver Mobile 2</th>
          <th className="px-6 py-3 text-center whitespace-nowrap">Receiver City</th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-white border-b hover:bg-gray-50">
          <td className="px-6 py-4 text-center">{showtrackingData.BiltyNo}</td>
          <td className="px-6 py-4 text-center">{showtrackingData.InvoiceNo}</td>
          <td className="px-6 py-4 text-center">{showtrackingData.BookingDate}</td>
          <td className="px-6 py-4 text-center">{showtrackingData.SenderName}</td>
          <td className="px-6 py-4 text-center">{showtrackingData.SenderMobile}</td>
          <td className="px-6 py-4 text-center">{showtrackingData.SenderArea}</td>
          <td className="px-6 py-4 text-center">{showtrackingData.ReceiverName}</td>
          <td className="px-6 py-4 text-center">{showtrackingData.ReceiverMobile1}</td>
          <td className="px-6 py-4 text-center">{showtrackingData.ReceiverMobile2}</td>
          <td className="px-6 py-4 text-center">{showtrackingData.ReceiverArea}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>


    
  

  )}
  {
    showMoreDetails && showtrackingData &&
    <button
    onClick={() => setshowMoreDetails(false)}
    className="bg-blue-600 text-white px-5 py-2 mt-4 rounded-lg hover:bg-blue-700 transition"
  >
    Hide Details
  </button>
  
  }
</div>
</div>
  );
}


