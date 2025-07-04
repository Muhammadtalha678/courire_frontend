CargoServicesLanding.jsx
import axios from 'axios';
import React, { useState } from 'react';
import Background from "../assets/images/990244-cargo.jpg";
import { AppRoutes } from '../constants/AppRoutes';

export default function CargoServicesLanding() {
  const [trackingId, setTrackingId] = useState('');
  const [showtrackingData, setshowtrackingData] = useState(null);
 const [loading,setLoading] = useState(false)
  const handleSearch =async () => {
    try {
      setLoading(true)
      if (trackingId.trim() === '') return;
      if (trackingId.length != 12) {
        alert("tracking id must be of 12 digit")
        return
      };
 
      const response = await axios.get(`${AppRoutes.tracking}/${trackingId}`)
      const data = response.data
      // console.log('data:', data);
      setshowtrackingData(data.data.foundTrackingId)
    
    } catch (error) {
      alert(`${error?.response?.data?.errors?.general}` || 'Something went wrong')
      console.log('error:', error);
    } finally {

      setLoading(false)
    }
  };

  return (
    <div className="flex flex-col justify-center">
<div className="backdrop-blur-sm rounded-xl p-8 shadow-lg text-center">
  <h2 className="text-6xl font-semibold text-yellow-700 mb-6">
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
      {loading ? "... Searching" : "Search"}
    </button>
  </div>

  {showtrackingData && (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border border-gray-300">
        <tbody>
          {/* object.entries ny convert kra array ma is trha objet ko
      [
        ["name","talha"]
        ]
      phr map ma destructor method array krky key value haskil krli */}
          {Object.entries(showtrackingData).map(([key, value]) => {
            // console.log(value);

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
  )}
</div>
</div>
  );
}


