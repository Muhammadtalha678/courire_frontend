import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { AppRoutes } from '../constants/AppRoutes';
import { useNavigate } from 'react-router-dom';

const ContainerList = () => {
    const [containerList, setContainerList] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        const getContainerList = async () => {
            try {
                const response = await axios.get(AppRoutes.allContainersList);
                setContainerList(response?.data?.data?.containersList || []);
            } catch (error) {
                console.log(error);
                // Error message dikhana behtar hoga
            }
        };
        getContainerList();
    }, []);

    // --- Action Handlers (Edit/Delete ke liye) ---
    const handleEdit = (id) => {
        console.log("Edit Container with ID:", id);
        // Yahan aap edit page pe navigate kar sakte hain
         navigate(`/update-container/edit/${id}`);

    };

    const handleDelete = (id) => {
        console.log("Delete Container with ID:", id);
        // Yahan aap delete API call kar sakte hain
    };

    // Columns ke liye keys hasil karna, internal keys ko filter karte hue
    // const allKeys = containerList.length > 0
    //     ? Object.keys(containerList[0]).filter(
    //           (key) => key !== '_id' && key !== '__v' && key !== 'createdAt' && key !== 'updatedAt'
    //       )
    //     : [];

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <h1 className="text-center text-2xl font-bold text-blue-800 px-4 pt-6 pb-2">
    All Bookings Details
  </h1>
            <div className="p-4">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-700 bg-white">
  <thead className="text-xl uppercase bg-gray-200 text-gray-800">
    <tr className="border-b border-gray-300">
      <th className="px-6 py-3 text-center whitespace-nowrap">S.No</th>
      <th className="px-6 py-3 text-center whitespace-nowrap">Container No</th>
      <th className="px-6 py-3 text-center whitespace-nowrap">Destination</th>
      <th className="px-6 py-3 text-center whitespace-nowrap">Invoices</th>
      <th className="px-6 py-3 text-center whitespace-nowrap">Shipped</th>
      <th className="px-6 py-3 text-center whitespace-nowrap">Status</th>
      <th className="px-6 py-3 text-center whitespace-nowrap">Actions</th>
    </tr>
  </thead>
  <tbody>
    {containerList.length > 0 ? (
      containerList.map((container, index) => {
        // --- Invoices parsing ---
        const invoiceNumbers = [];
        let totalShipped = 0;

        // if (Array.isArray(container.Invoices)) {
        //   container.Invoices.forEach(item => {
        //     const [inv, qty] = item.split('/');
        //     invoiceNumbers.push(inv);
        //     totalShipped += parseInt(qty || 0);
        //   });
          // }
          let Destination
        if (container.Destination) {
              Destination =` From: ${container.Destination.From} → To: ${container.Destination.To}`
          }
          console.log(Destination);
          
          if (container.Invoices) {
              container.Invoices.forEach((item) => {
                  const [inv, qty] = item.split('/');
                  invoiceNumbers.push(inv);
                  totalShipped += parseInt(qty || 0);
              });
                
          }
          
        return (
          <tr key={container._id || index} className="bg-white border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-center">{index + 1}</td>
            <td className="px-6 py-4 text-center">{container.ContainerNumber || '-'}</td>
            <td className="px-6 py-4 text-center">{Destination}</td>
            <td className="px-6 py-4 text-center">{invoiceNumbers.join(', ') || '-'}</td>
            <td className="px-6 py-4 text-center">{totalShipped}</td>
            <td className="px-6 py-4 text-center">{container.Status || '-'}</td>
            <td className="px-6 py-4 text-center">
              <button
                onClick={() => handleEdit(container._id)}
                className="text-blue-600 hover:text-blue-800"
              >
                Update Status
              </button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan={7} className="text-center py-8 text-red-600 font-semibold text-lg">
          No Containers Data Found
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

export default ContainerList;