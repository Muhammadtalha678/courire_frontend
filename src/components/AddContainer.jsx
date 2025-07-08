import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AppRoutes } from '../constants/AppRoutes';
import { useNavigate } from 'react-router-dom';

const AddContainer = ({ containerList, invoiceList }) => {
const [totalInvoices, setTotalInvoices] = useState(invoiceList.length);

  const [selectedContainer, setSelectedContainer] = useState('');
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const[loadingSave,setLoadingSave] = useState(false)
  const navigate = useNavigate()
  const [invoices, setInvoices] = useState(
    invoiceList.map((invoice) => {
      const [invNo = ''] = invoice.InvoiceNo?.split('/') || [];
    const pcs = invoice.RemainingPieces ?? 0; // ✅ Use RemainingPieces, fallback to 0
    return {
        ...invoice,
        invNo,
        pcs:pcs,
        shipped: null,
        balance: null,
        selected: false,
      };
    })
  );
console.log(invoices);

const handleSelect = (index, checked) => {
  setInvoices((prev) => {
    const updated = prev.map((inv, i) =>
      i === index
        ? {
            ...inv,
            selected: checked,
            shipped: checked ? inv.pcs : null,
            balance: checked ? 0 : null,
          }
        : inv
    );

    recalculateTotalInvoices(updated); // ✅ recalculate here
    return updated;
  });
};



const handleSelectAll = (checked) => {
  setSelectAll(checked);
  setInvoices((prev) => {
    const updated = prev.map((inv) => ({
      ...inv,
      selected: checked,
      shipped: checked ? inv.pcs : null,
      balance: checked ? 0 : null,
    }));

    const fullyShipped = updated.filter((inv) => inv.selected && inv.balance === 0).length;
    setTotalInvoices(invoiceList.length - fullyShipped);

    return updated;
  });
};


const handleShippedChange = (index, value) => {
  setInvoices((prev) => {
    const updated = prev.map((inv, i) => {
      if (i !== index) return inv;

      const pcs = inv.pcs;
      const shipped = Number(value);

      if (isNaN(shipped) || shipped < 0 || shipped > pcs) {
        return { ...inv, shipped: '', balance: '' };
      }

      const balance = pcs - shipped;

      return {
        ...inv,
        shipped,
        balance,
        selected: shipped === pcs ? true : inv.selected // ✅ Auto select if fully shipped
      };
    });

    recalculateTotalInvoices(updated); // ✅ recalculate here too
    return updated;
  });
};


const recalculateTotalInvoices = (invoices) => {
  const fullyShipped = invoices.filter(
    (inv) => inv.selected && inv.shipped === inv.pcs
  ).length;
  setTotalInvoices(invoiceList.length - fullyShipped);
};

  

  const handleSave = async () => {
    if (!selectedContainer) {
      toast.error('Please select a container number');
      return;
    }

    const validInvoices = invoices.filter((inv) => {
      const shipped = inv.shipped;
      return typeof shipped === 'number' && shipped > 0 && shipped <= inv.pcs;
    });

    if (validInvoices.length === 0) {
      toast.error('Please enter valid shipped quantities');
      return;
    }

    const invoiceNumbers = validInvoices.map((inv) => `${inv.invNo}/${inv.shipped}`);

    const payload = {
      containerNumber: selectedContainer,
      fromDestination: fromCity,
      toDestination: toCity,
      invoices: invoiceNumbers,
      status: 'Shipment In Container',
    };

    try {
      setLoadingSave(true)
      const response = await axios.post(AppRoutes.addContainer, payload);
      toast.success(response?.data?.data?.message);
      
      navigate("/all-containers")
    } catch (error) {
      const err = error?.response?.data?.errors;
      console.log(error);
      if (err?.general) toast.error(err.general);
      else toast.error('Something went wrong');
    } finally {
      setLoadingSave(false)
    }
  };

  useEffect(() => {
    const cities = containerList.find((c) => c.ContainerNumber === selectedContainer);
    if (cities) {
      setFromCity(cities.From);
      setToCity(cities.To);
    }
  }, [selectedContainer]);

  return (
    <>
      <div className="bg-yellow-400 text-black font-bold py-2 px-4 w-fit">
        Attach Bilty To Container
      </div>

      <div>
        <select
          name="selectedContainer"
          className="border p-2"
          value={selectedContainer}
          onChange={(e) => setSelectedContainer(e.target.value)}
        >
          <option value="">Select Container Number</option>
          {containerList.map((container, index) => (
            <option key={index} value={container.ContainerNumber}>
              {container.ContainerNumber}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-blue-600 text-white px-4 py-2 w-fit mt-2">
        Show & Select Bookings
      </div>

      <table className="w-full border mt-2">
        <thead>
          <tr className="bg-gray-200">
            <th>Inv #</th>
            <th>Pieces</th>
            <th>Shipped</th>
            <th>Balance</th>
            <th>
              <input
                type="checkbox"
                onChange={(e) => handleSelectAll(e.target.checked)}
                checked={selectAll}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4">
                No invoices found.
              </td>
            </tr>
          ) : (
            invoices.map((invoice, index) => (
              <tr key={index}>
                <td>
                  <input
                    value={invoice.invNo}
                    readOnly
                    className="text-center border w-full"
                  />
                </td>
                <td>
                  <input
                    value={invoice.pcs}
                    readOnly
                    className="text-center border w-full"
                  />
                </td>
                <td>
                  <input
  type="number"
  value={invoice.shipped ?? ''}
  onChange={(e) => handleShippedChange(index, e.target.value)}
  className="text-center border w-full bg-gray-100 className={`text-center border w-full ${invoice.selected ? 'bg-gray-200 cursor-not-allowed' : ''}`}
"
  min={0}
  max={invoice.pcs}
  readOnly={invoice.selected} // ✅ Disable if selected
/>

                </td>
                <td>
                  <input
                    value={invoice.balance ?? ''}
                    readOnly
                    className="text-center border w-full"
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    className="text-center"
                    checked={!!invoice.selected}
                    onChange={(e) => handleSelect(index, e.target.checked)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
  <div className="flex space-x-2">
    <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2" disabled={loadingSave}>
      {
        loadingSave ? (
          <div className="flex justify-center">
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : "Save"
      }
    </button>
    <button className="bg-blue-600 text-white px-4 py-2">Edit</button>
    <button className="bg-blue-600 text-white px-4 py-2">Del</button>
  </div>

  <div className="text-right">
    <div className="font-bold">Total No Of Bilty</div>
    <input
      readOnly
      value={totalInvoices}
      className="border mt-1 px-2 py-1 w-32 text-center"
    />
  </div>
</div>

      
    </>
  );
};

export default AddContainer;
