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

  // --- Action Handlers ---
  // You can add your logic here (e.g., navigate to an edit page or call a delete API)
  const handleEdit = (id) => {
    console.log("Edit booking with ID:", id);
    // Example: navigate(`/bookings/edit/${id}`);
  };

  const handleDelete = (id) => {
    console.log("Delete booking with ID:", id);
    // Example: callDeleteApi(id);
  };

  // Dynamically get all keys except for internal ones like _id and __v
  const allKeys = bookings.length > 0 ? Object.keys(bookings[0]).filter((key) => key !== '_id' && key !== '__v' && key !== 'createdAt' && key !== 'updatedAt') : [];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="p-4">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-700 bg-white">
            <thead className="text-xl uppercase bg-gray-200 text-gray-800">
              <tr className="border-b border-gray-300">
                <th scope="col" className="px-6 py-3">S.No</th>
                {
                  allKeys.map((key) => (
                    // Replace camelCase with spaces for better readability
                    <th key={key} scope="col" className="px-6 py-3 capitalize">{key.replace(/([A-Z])/g, ' $1')}</th>
                  ))
                }
                {/* --- Added Actions Header --- */}
                <th scope="col" className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((row, index) => (
                  <tr key={row._id || index} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{index + 1}</td>
                    {allKeys.map((key) => (
                      <td className="px-6 py-4" key={key}>{row[key]}</td>
                    ))}
                    {/* --- Added Actions Buttons Cell --- */}
                    <td className="px-6 py-4">
                       <div className="flex items-center justify-center gap-4">
                         <button 
                           onClick={() => handleEdit(row._id)}
                           className="font-medium text-blue-600 hover:text-blue-800"
                         >
                           Edit
                         </button>
                         <button 
                           onClick={() => handleDelete(row._id)}
                           className="font-medium text-red-600 hover:text-red-800"
                         >
                           Delete
                         </button>
                       </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  {/* --- Updated colSpan to dynamically cover all columns --- */}
                  <td colSpan={allKeys.length + 2} className="text-center py-8 text-red-600 font-semibold text-lg">
                    No Bookings Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingList;