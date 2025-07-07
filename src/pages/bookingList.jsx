import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { AppRoutes } from '../constants/AppRoutes';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await axios.get(AppRoutes.allBookings);
        setBookings(response?.data?.data?.bookings || []);
      } catch (error) {
        console.log(error);
        // You might want to show an error message to the user here
      }
    };
    getBookings();
  }, []);

console.log(bookings);

  // Dynamically get all keys except for internal ones like _id and __v
  const allKeys = bookings.length > 0 ? Object.keys(bookings[0]).filter((key) => key !== '_id' && key !== '__v' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'Charges') : [];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="p-4">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {
            bookings.length > 0 ?
              (<table className="w-full text-sm text-left text-gray-700 bg-white">
          
                <thead className="text-xl uppercase bg-gray-200 text-gray-800">
              
                  <tr className="border-b border-gray-300">
                    <th scope="col" className="px-6 py-3">S.No</th>
                    {
                      allKeys.map((key) => (
                        // Replace camelCase with spaces for better readability
                        <th key={key} scope="col" className="px-6 py-3 capitalize">{key.replace(/([A-Z])/g, ' $1')}</th>
                      ))
                    }
                    
                  </tr>
                </thead>
                <tbody>
                {bookings.map((row, index) => (
  <tr key={index} className="bg-white border-b hover:bg-gray-50">
    <td className="px-6 py-4 font-medium text-gray-900">{index + 1}</td>
    
    {allKeys.map((key) => {
      if (key === "Charges") return null; // ❗ Skip Charges key
      return (
        <td className="px-6 py-4" key={key}>
          {row[key]}
        </td>
      );
    })}
  </tr>
))}

                </tbody>
              </table>) : (
                 (
                    <span colSpan={allKeys.length + 2} className="text-center py-8 text-red-600 font-semibold text-lg flex justify-center items-center w-full h-full">
                      No Bookings Found
                    </span>
                )
              )
}  
        </div>
      </div>
    </div>
  );
};

export default BookingList;