import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { AppRoutes } from '../constants/AppRoutes';
import { useNavigate } from 'react-router-dom';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
      const navigate = useNavigate()
  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await axios.get(AppRoutes.allBookings);
        setBookings(response?.data?.data?.bookings || []);
      } catch (error) {
        console.log(error);
      }
    };
    getBookings();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <h1 className="text-center text-2xl font-bold text-blue-800 px-4 pt-6 pb-2">
    All Bookings Details
  </h1>
      <div className="p-4">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {bookings.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-700 bg-white">
              <thead className="text-xl uppercase bg-gray-200 text-gray-800">
  <tr className="border-b border-gray-300 text-center">
    <th className="px-6 py-3 whitespace-nowrap">S.No</th>
    <th className="px-6 py-3 whitespace-nowrap">Bilty No</th>
    <th className="px-6 py-3 whitespace-nowrap">Invoice No</th>
    <th className="px-6 py-3 whitespace-nowrap">Booking Date</th>
    <th className="px-6 py-3 whitespace-nowrap">Sender Name</th>
    <th className="px-6 py-3 whitespace-nowrap">Sender Mobile</th>
    <th className="px-6 py-3 whitespace-nowrap">Sender City</th>
    <th className="px-6 py-3 whitespace-nowrap">Receiver Name</th>
    <th className="px-6 py-3 whitespace-nowrap">Receiver Mobile 1</th>
    <th className="px-6 py-3 whitespace-nowrap">Receiver Mobile 2</th>
    <th className="px-6 py-3 whitespace-nowrap">Receiver City</th>
    <th className="px-6 py-3 whitespace-nowrap">No. of Pieces</th>
    <th className="px-6 py-3 whitespace-nowrap">Branch</th>
    <th className="px-6 py-3 text-center whitespace-nowrap">Actions</th>
  </tr>
</thead>

              <tbody>
                {bookings.map((row, index) => (
                  <tr key={index} className="bg-white border-b hover:bg-gray-50 text-center">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{row.BiltyNo || '-'}</td>
                    <td className="px-4 py-2">{row.InvoiceNo || '-'}</td>
                    <td className="px-4 py-2">{row.BookingDate || '-'}</td>
                    <td className="px-4 py-2">{row.SenderName || '-'}</td>
                    <td className="px-4 py-2">{row.SenderMobile || '-'}</td>
                    <td className="px-4 py-2">{row.SenderArea || '-'}</td>
                    <td className="px-4 py-2">{row.ReceiverName || '-'}</td>
                    <td className="px-4 py-2">{row.ReceiverMobile1 || '-'}</td>
                    <td className="px-4 py-2">{row.ReceiverMobile2 || '-'}</td>
                    <td className="px-4 py-2">{row.ReceiverArea || '-'}</td>
                    <td className="px-4 py-2">{row.NoOfPieces || '-'}</td>
                    <td className="px-4 py-2">{row.Branch || '-'}</td>
                    <td className="px-6 flex gap-4 py-4 text-center">
              
              <button
                onClick={() =>  navigate(`/edit-booking/edit/${row._id}`)}
                className="cursor-pointer text-green-600 whitespace-nowrap hover:text-blue-800"
              >
                Edit Booking
              </button>
              <button
                // onClick={() => handleEdit(container._id)}
                className="cursor-pointer text-red-600 whitespace-nowrap hover:text-blue-800"
              >
                Delete Booking
              </button>
            </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8 text-red-600 font-semibold text-lg">
              No Bookings Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingList;
