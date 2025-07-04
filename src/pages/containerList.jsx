import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { AppRoutes } from '../constants/AppRoutes';

const ContainerList = () => {
    const [containerList, setContainerList] = useState([]);

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
        // Misaal ke tor par: navigate(`/containers/edit/${id}`);
    };

    const handleDelete = (id) => {
        console.log("Delete Container with ID:", id);
        // Yahan aap delete API call kar sakte hain
    };

    // Columns ke liye keys hasil karna, internal keys ko filter karte hue
    const allKeys = containerList.length > 0
        ? Object.keys(containerList[0]).filter(
              (key) => key !== '_id' && key !== '__v' && key !== 'createdAt' && key !== 'updatedAt'
          )
        : [];

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <div className="p-4">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-700 bg-white">
                        <thead className="text-xl uppercase bg-gray-200 text-gray-800">
                            <tr className="border-b border-gray-300">
                                <th scope="col" className="px-6 py-3">S.No</th>
                                {allKeys.map((key) => (
                                    <th key={key} scope="col" className="px-6 py-3 capitalize text-center">{key.replace(/([A-Z])/g, ' $1')}</th>
                                ))}
                                {/* --- Actions ka naya column --- */}
                                <th scope="col" className="px-6 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {containerList.length > 0 ? (
                                containerList.map((container, index) => (
                                    <tr key={container._id || index} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900 text-center">{index + 1}</td>
                                        {allKeys.map((key) => {
                                            let value = container[key];
                                            // --- Aapka custom logic barqarar rakha gaya hai ---
                                            if (key === 'Destination' && typeof value === 'object' && value !== null) {
                                                value = `From: ${value.From} → To: ${value.To}`;
                                            }
                                            return <td className="px-6 py-4 text-center" key={key}>{value}</td>;
                                        })}
                                        {/* --- Edit/Delete buttons wala naya cell --- */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-4">
                                                <button
                                                    onClick={() => handleEdit(container._id)}
                                                    className="font-medium text-blue-600 hover:text-blue-800"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(container._id)}
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
                                    {/* --- colSpan ab dynamic hai --- */}
                                    <td colSpan={allKeys.length + 2} className="text-center py-8 text-red-600 font-semibold text-lg">
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