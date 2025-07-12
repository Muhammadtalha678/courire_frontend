import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { AppRoutes } from '../constants/AppRoutes';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [bookingLoading, setbookingLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
    
  const [searchQuery, setSearchQuery] = useState(""); // ✅ NEW
  const navigate = useNavigate();

  const getBookings = async () => {
    try {
      setbookingLoading(true)
      const response = await axios.get(AppRoutes.allBookings);
      setBookings(response?.data?.data?.bookings || []);
    } catch (error) {
      const err = error?.response?.data?.errors;
      if (err?.general) toast.error(err?.general);
      if (!err) toast.error('Something went wrong');
    } finally {
            setbookingLoading(false)
    }
  };

  useEffect(() => {
    getBookings();
  }, []);
  console.log(bookings);
  
  const handleDelete = async (id, builtNo,statusInput) => {
    try {
      const statusList = Array.isArray(statusInput)
      ? statusInput
      : typeof statusInput === "string"
      ? [statusInput]
      : [];
      console.log(statusList);
      const notAllowed = statusList.some(status => status !== "Shipment in Godown");
      if (notAllowed) {
      toast.error("Cannot delete. Shipment is already processed.");
      return;
    }
      if (!builtNo) {
        toast.error('Builty no is missing');
        return;
      }
      
      const confirmed = window.confirm('Are you sure you want to delete this booking?');
      if (!confirmed) return;
        setDeleteLoadingId(id); 
      const response = await axios.delete(AppRoutes.deleteBooking, { data: { BiltyNo: builtNo } });
      const data = response.data;
      toast.success(data?.data?.message);
      getBookings(); // ✅ Refresh bookings
    } catch (error) {
    console.log(error);
    
      const err = error?.response?.data?.errors;
      if (err?.general) toast.error(err?.general);
      if (!err) toast.error('Something went wrong');
    } finally {
        setDeleteLoadingId(null); 
      
    }
  };

  // ✅ FILTERED BOOKINGS
  const filteredBookings = bookings.filter(booking =>
    booking.InvoiceNo?.toString().includes(searchQuery.trim())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      {
        bookingLoading ? (
        <div className="flex items-center justify-center h-screen bg-gray-50 text-purple-600 text-xl">
        Loading...
          </div>
        ): (
          <>
              <h1 className="text-center text-2xl font-bold text-blue-800 px-4 pt-6 pb-2">
        All Bookings Details
      </h1>

      {/* ✅ SEARCH BAR */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by Invoice No..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/2 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="p-4">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {filteredBookings.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-700 bg-white">
              <thead className="text-xl uppercase bg-gray-200 text-gray-800">
                <tr className="border-b border-gray-300 text-center">
                  <th className="px-6 py-3">S.No</th>
                  <th className="px-6 py-3">Bilty No</th>
                  <th className="px-6 py-3">Invoice No</th>
                  <th className="px-6 py-3">Booking Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Sender Name</th>
                  <th className="px-6 py-3">Sender Mobile</th>
                  <th className="px-6 py-3">Sender City</th>
                  <th className="px-6 py-3">Receiver Name</th>
                  <th className="px-6 py-3">Receiver Mobile 1</th>
                  <th className="px-6 py-3">Receiver Mobile 2</th>
                  <th className="px-6 py-3">Receiver City</th>
                  <th className="px-6 py-3">No. of Pieces</th>
                  <th className="px-6 py-3">Branch</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                        {filteredBookings.map((row, index) => {
                          // console.log(row);
                          
                  return  <tr key={index} className="bg-white border-b hover:bg-gray-50 text-center">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{row.BiltyNo || '-'}</td>
                    <td className="px-4 py-2">{row.InvoiceNo || '-'}</td>
                    <td className="px-4 py-2">{row.BookingDate || '-'}</td>
                    <td className="px-4 py-2">
  {row.status}
</td>

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
                        onClick={() => navigate(`/edit-booking/edit/${row._id}`)}
                        className="cursor-pointer text-green-600 hover:text-blue-800"
                      >
                        Edit Booking
                      </button>
                      
                        <button
  onClick={() => handleDelete(row._id, row.BiltyNo, row.status)}
  className="cursor-pointer text-red-600 hover:text-blue-800"
>
  {deleteLoadingId === row._id ? 'Deleting...' : 'Delete Booking'}


                      </button>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8 text-red-600 font-semibold text-lg">
              No Bookings Found
            </div>
          )}
        </div>
      </div>
          </>
        )
      }
    
    </div>
  );
};

export default BookingList;
