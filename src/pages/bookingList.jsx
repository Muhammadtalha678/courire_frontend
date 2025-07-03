import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'

const BookingList = () => {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await axios.get("https://courire-system-backend-express.vercel.app/api/bookings")
        // console.log(response.data)
        setBookings(response?.data?.data?.bookings || [])
      } catch (error) {
        console.log(error)
      }
    }
    getBookings()
  }, [])
  const allKeys = bookings.length > 0 ? Object.keys(bookings[0]).filter((key) => key !== '_id' && key !== '__v') : []

  
  return (
    <div className="relative overflow-x-auto">
      <Header/>
      <table className="w-full text-sm text-left text-black bg-white border border-gray-300">
        <thead className="text-xs uppercase bg-gray-100 text-gray-700">
          <tr className="border-b">
          <th className="px-6 py-3">S.No</th>
            {
                          allKeys.map((key) => (
                            <th key={key} className="px-4 py-3">{key.replace(/([A-Z])/g, ' $1')}</th>
                          ))
            }
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
                      bookings.map((row,index) => {
                // console.log(row._id);
                
                          return <tr key={index} className="border-b">
                     <td className="px-4 py-4 text-center">{index + 1}</td>
                    {allKeys.map((key) => {
                        
                        return <td className="px-4 py-4 text-center" key={key}>{row[key]}</td>
                        
                    
                    })}
              </tr>
            })
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-red-600 font-medium">
                No Bookings Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default BookingList
