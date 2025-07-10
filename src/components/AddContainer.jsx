import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppRoutes } from '../constants/AppRoutes';
import { useNavigate } from 'react-router-dom';

const AddContainer = ({
  containerList = [],
  invoiceList = [],
  bookedContainerList = [],
  refreshBookedContainer,
  refreshInvoices,
  refreshContainerNoList,
  isEdit
}) => {
  const navigate = useNavigate();
  const [selectedContainer, setSelectedContainer] = useState('');
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [totalInvoices, setTotalInvoices] = useState(invoiceList.length);
  const [invoices, setInvoices] = useState([]);

  // ✅ Sync invoices when invoiceList changes
  useEffect(() => {
    const updatedInvoices = invoiceList.map((invoice) => {
      const [invNo = ''] = invoice.InvoiceNo?.split('/') || [];
      const pcs = invoice.RemainingPieces ?? 0;
      return {
        ...invoice,
        invNo,
        pcs,
        shipped: null,
        balance: null,
        selected: false,
      };
    });

    setInvoices(updatedInvoices);
    setTotalInvoices(invoiceList.length);
  }, [invoiceList]);

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
      recalculateTotalInvoices(updated);
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
          selected: shipped === pcs ? true : inv.selected,
        };
      });

      recalculateTotalInvoices(updated);
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
      setLoadingSave(true);
      const response = await axios.post(AppRoutes.addContainer, payload);
      toast.success(response?.data?.data?.message);
      refreshBookedContainer?.();
      refreshContainerNoList?.();
      refreshInvoices?.();
    } catch (error) {
      const err = error?.response?.data?.errors;
      if (err?.general) toast.error(err.general);
      else toast.error('Something went wrong');
    } finally {
      setLoadingSave(false);
    }
  };

  useEffect(() => {
    const cities = containerList.find((c) => c.ContainerNumber === selectedContainer);
    if (cities) {
      setFromCity(cities.From);
      setToCity(cities.To);
    }
  }, [selectedContainer, containerList]);

  const selectedBilty = bookedContainerList.filter(
    (b) => b.Status === 'Shipment In Container'
  );
console.log(bookedContainerList);

  return (
    <>
      <h3 className="text-lg font-semibold text-yellow-700 mb-2">
        Attach Bilty To Container
      </h3>

      <div className="flex justify-between gap-4 items-center mb-4">
        <select
          className="w-full border px-3 py-2 rounded-md focus:outline-none"
          value={selectedContainer}
          onChange={(e) => setSelectedContainer(e.target.value)}
        >
          <option value="">Select Container No</option>
          {containerList.map((c, i) => (
            <option key={i} value={c.ContainerNumber}>
              {c.ContainerNumber}
            </option>
          ))}
        </select>

        <div className="flex gap-2 w-full">
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow cursor-pointer"
            onClick={handleSave}
            disabled={loadingSave}
          >
            {loadingSave ? 'Saving...' : 'Save'}
          </button>
          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow cursor-pointer">Edit</button>
          <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow cursor-pointer">Del</button>
        </div>
      </div>

      <div className="flex gap-4">
        {/* Left Table */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <h4 className="bg-blue-700 text-white px-4 py-2 rounded-t-md font-semibold">
              Show & Select Bookings
            </h4>
            <input
              type="text"
              disabled
              value={`Total Available Bilty: ${invoices.length}`}
              className="border text-center rounded px-2 py-1 text-sm"
            />
          </div>

          <div className={`${invoices.length > 0 ? 'h-[200px]' : 'h-[100px]'} overflow-auto border rounded`}>
            <table className="w-full border border-t-0">
              <thead className="bg-gray-100 text-sm">
                <tr className="text-center">
                  <th className="border px-2 py-1">Inv #</th>
                  <th className="border px-2 py-1">Pieces</th>
                  <th className="border px-2 py-1">Shipped</th>
                  <th className="border px-2 py-1">Balance</th>
                  <th className="border px-2 py-1">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((b, i) => (
                  <tr key={i} className="text-center text-sm">
                    <td className="border px-2 py-1">{b.invNo}</td>
                    <td className="border px-2 py-1">{b.pcs}</td>
                    <td className="border px-2 py-1">
                      <input
                        type="number"
                        value={b.shipped ?? ''}
                        disabled={b.selected}
                        onChange={(e) => handleShippedChange(i, e.target.value)}
                        className="w-16 border rounded px-2 py-1 text-sm"
                      />
                    </td>
                    <td className="border px-2 py-1">{b.balance ?? ''}</td>
                    <td className="border px-2 py-1">
                      <input
                        type="checkbox"
                        checked={b.selected}
                        onChange={(e) => handleSelect(i, e.target.checked)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-2">
            <button
              onClick={handleSave}
              className="bg-green-700 text-white px-3 py-1 rounded"
              disabled={loadingSave}
            >
              {loadingSave ? 'Linking...' : 'Link to Container'}
            </button>
          </div>
        </div>

        {/* Right Table */}
        <div className="w-1/2">
          <div className="flex justify-between items-center mb-1">
            <h4 className="bg-blue-700 text-white px-4 py-2 rounded-t-md font-semibold">
              Selected Bilty
            </h4>
            <input
              type="text"
              disabled
              value={`Total No Of Bilty: ${selectedBilty.length}`}
              className="border text-center rounded px-2 py-1 text-sm"
            />
          </div>

          <div className={`${selectedBilty.length > 0 ? 'h-[200px]' : 'h-[100px]'} overflow-auto border rounded`}>
            <table className="w-full border border-t-0">
              <thead className="bg-gray-100 text-sm">
                <tr className="text-center">
                  <th className="border px-2 py-1">Container No</th>
                  <th className="border px-2 py-1">Inv No</th>
                  <th className="border px-2 py-1">Shipped Pieces</th>
                  <th className="border px-2 py-1">Total</th>
                </tr>
              </thead>
              <tbody>
              {selectedBilty.map((b, i) => {
                const invoiceNumbers = [];
                let totalShipped = 0;

                b.Invoices.forEach((item) => {
                    const [inv, qty] = item.split('/');
                    invoiceNumbers.push(inv);
                    totalShipped += parseInt(qty || 0);
                });
                return (
                    <tr key={i} className="text-center text-sm">
                    <td className="border px-2 py-1">{b.ContainerNumber}</td>
                    <td className="border px-2 py-1">{invoiceNumbers.join(', ')}</td>
                    <td className="border px-2 py-1">{totalShipped}</td>
                    <td className="border px-2 py-1">{totalShipped}</td>
                    </tr>
                );
                })}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddContainer;
