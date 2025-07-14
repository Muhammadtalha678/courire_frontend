import axios from 'axios';
import React, { useState,useEffect } from 'react';
import {AppRoutes} from '../constants/AppRoutes.js'
import { toast } from 'react-toastify';

const WhatsAppMarketing = () => {
  const [file, setFile] = useState(null);
  const [contactInput, setContactInput] = useState('');
  // const [contactsByCity, setContactsByCity] = useState({
    //   dammam: ['+9663210000001', '+9663210000002'],
    //   khoober: ['+9663110000003', '+9663110000004'],
    //   jubail: ['+9663010000005', '+9663010000006'],
    // });
    const [contacts, setContacts] = useState([
        '0321******', '0311******', '0301******', '0966******', '0331******'
      ]);
    const [contactsByCity, setContactsByCity] = useState({});
  const [city, setCity] = useState('');
  const [numberLoading, setNumberLoading] = useState(false);
const [cityOptions, setCityOptions] = useState([]);
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSend = () => {
    if (!file || !city) {
      alert('Please upload a file and select a city.');
      return;
    }
    const cityContacts = contactsByCity[city.toLowerCase()] || [];
    alert(`Message sent to ${cityContacts.length} contacts in ${city}!`);
  };

  const handleAddContact = () => {
    if (!contactInput || !city) return;
    setContactsByCity((prev) => ({
      ...prev,
      [city]: [...(prev[city] || []), contactInput],
    }));
    setContactInput('');
  };
const getNumbers = async () => {
  try {
    setNumberLoading(true);
    const response = await axios.get(AppRoutes.allWhatsappNumber);

    const numbers = response?.data?.data?.result || [];
    const groupedContacts = {};
    const citySet = new Set(); // For dropdown options

    numbers.forEach(number => {
      // Sender
      if (number?.sender?.area && number?.sender?.number) {
        const area = number.sender.area.toLowerCase();
        citySet.add(area); // Add to dropdown list
        if (!groupedContacts[area]) groupedContacts[area] = [];
        if (!groupedContacts[area].includes(number.sender.number)) {
          groupedContacts[area].push(number.sender.number);
        }
      }

      // Receiver
      if (number?.receiver?.area) {
        const area = number.receiver.area.toLowerCase();
        citySet.add(area); // Add to dropdown list
        if (!groupedContacts[area]) groupedContacts[area] = [];

        [number.receiver.number1, number.receiver.number2].forEach(num => {
          if (num && !groupedContacts[area].includes(num)) {
            groupedContacts[area].push(num);
          }
        });
      }
    });

    setContactsByCity(groupedContacts);
    setCityOptions([...citySet]); // Convert Set to array

  } catch (error) {
    console.log(error);
    const err = error?.response?.data?.errors;
    if (err?.general) toast.error(err.general);
    else toast.error('Something went wrong while fetching contacts');
  } finally {
    setNumberLoading(false);
  }
};

  useEffect(() => {
    getNumbers();
  }, []);
  console.log(contactsByCity);
  
  return (
    numberLoading ?((
        <div className="flex items-center justify-center h-screen bg-gray-50 text-purple-600 text-xl">
        Loading...
          </div>
        )):
  (  <div
      className="relative min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/w5.webp')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="bg-white bg-opacity-95 p-8 rounded-xl shadow-2xl w-full max-w-3xl text-black">
          <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="Logo"
              className="h-8 w-8"
            />
            WhatsApp Broadcast Panel
          </h2>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full">
              <label className="block mb-1 font-semibold">Upload File</label>
              <input
                type="file"
                accept=".png,.jpeg,.jpg,.mp4,.mkv"
                onChange={handleFileChange}
                className="block w-full mb-2 p-2 border rounded"
              />
              <p className="text-sm text-gray-600">Supported: .png, .jpeg, .mp4</p>

              <label className="block mt-4 font-semibold">Select City</label>
              <select
  className="mt-1 p-2 w-full rounded border"
  onChange={(e) => setCity(e.target.value)}
  value={city}
>
  <option value="">-- SELECT CITY --</option>
  {cityOptions.map((cityName, idx) => (
    <option key={idx} value={cityName}>
      {cityName.charAt(0).toUpperCase() + cityName.slice(1)}
    </option>
  ))}
</select>


              <div className="mt-4">
                <label className="block mb-1 font-semibold">Add Contact Number</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={contactInput}
                    onChange={(e) => setContactInput(e.target.value)}
                    placeholder="+9663xxxxxxxx"
                    className="flex-1 p-2 border rounded"
                  />
                  <button
                    onClick={handleAddContact}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full">
              <h3 className="font-semibold mb-2">Contact List ({city || 'No City Selected'})</h3>
              <div className="max-h-48 overflow-y-auto pr-2 border border-gray-300 rounded p-3 bg-gray-50">
                {(contactsByCity[city] || []).map((contact, index) => (
                  <div key={index} className="flex justify-between mb-1 text-sm">
                    <span>{contact}</span>
                    <span className="text-green-600 font-bold">✔</span>
                  </div>
                ))}
                {(!contactsByCity[city] || contactsByCity[city].length === 0) && (
                  <p className="text-gray-500 italic">No contacts available.</p>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleSend}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 w-full rounded"
          >
            📤 Send WhatsApp Message
          </button>
        </div>
      </div>
    </div>)
  );
};

export default WhatsAppMarketing;