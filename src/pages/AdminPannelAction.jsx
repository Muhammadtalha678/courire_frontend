import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const AdminPannelAction = () => {
  const location = useLocation();
  const actionType = location.state?.actionType;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (actionType === 'branchAction') {
      fetchBranches();
    } else if (actionType === 'cityAction') {
      fetchCities();
    }
  }, [actionType]);

  const fetchBranches = async () => {
    try {
      const res = await axios.get('/api/branches'); // replace with your actual route
      setData(res.data?.branches || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCities = async () => {
    try {
      const res = await axios.get('/api/cities'); // replace with your actual route
      setData(res.data?.cities || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div className="bg-gray-50 min-h-screen">
            <Header />
            <h1 className="text-center text-2xl font-bold text-blue-800 px-4 pt-6 pb-2">
    {actionType === 'branchAction' ? 'All Branches ' : 'All Cities'}
  </h1>
            <div className="p-4">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-700 bg-white">
  <thead className="text-xl uppercase bg-gray-200 text-gray-800">
    <tr className="border-b border-gray-300">
      <th className="px-6 py-3 text-center whitespace-nowrap">S.No</th>
      <th className="px-6 py-3 text-center whitespace-nowrap">Branch</th>
    
      <th className="px-6 py-3 text-center whitespace-nowrap">Actions</th>
    </tr>
  </thead>
  <tbody>
    {data.length > 0 ? (
      data.map((container, index) => {
        // --- Invoices parsing ---
        const invoiceNumbers = [];
        let totalShipped = 0;

          
        return (
          <tr key={container._id || index} className="bg-white border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-center">{index + 1}</td>
            <td className="px-6 py-4 text-center">{index + 1}</td>
            <td className="px-6 flex gap-4 py-4 text-center">
              <button
                onClick={() => handleEditContainer(container._id)}
                className="cursor-pointer text-green-600 whitespace-nowrap hover:text-blue-800"
              >
                Edit Container
              </button>
              <button
                // onClick={() => handleEdit(container._id)}
                className="cursor-pointer text-red-600 whitespace-nowrap hover:text-blue-800"
              >
                Delete Container
              </button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan={7} className="text-center py-8 text-red-600 font-semibold text-lg">
          {actionType === 'branchAction' ? 'No Branches Found' : 'No  City Found'}
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

export default AdminPannelAction;
