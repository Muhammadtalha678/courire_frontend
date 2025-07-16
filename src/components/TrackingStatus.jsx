import React from "react";
import {
  FaClipboardList,
  FaBoxOpen,
  FaShippingFast,
  FaShip,
  FaWarehouse,
  FaPlaneArrival,
  FaTruckMoving,
  FaStore,
  FaCheckCircle,
} from "react-icons/fa";
import { formatDate } from "../lib/helper/britishDate";

export default function TrackingStatus({ status,BuiltNo,BookingDate,InvoiceId,ContainerNumber }) {
  const steps = [
    'Shipment at Godown',
    'Shipment In Container',
    'Shipment at Sending Port',
    'Shipment In Transit',
    'Shipment Arrived At Port',
    'Shipment Under Clearance',
    'Shipmen Arrived At Godown',
    'Out For Delivery',
    'Delivered'
  ];
  const icons = [
    <FaWarehouse />,
    <FaBoxOpen />,
    <FaShippingFast />,
    <FaShip />,
    <FaClipboardList />,
    <FaStore />,
    <FaTruckMoving />,
    <FaCheckCircle />,
  ];

  const currentStepIndex = steps.indexOf(status);

// If manual, render just one step:
  const isManualStatus = !steps.includes(status);
if (isManualStatus) {
  return (
    <div className="flex items-center space-x-2 p-4 border rounded bg-yellow-100">
      <i className="fas fa-edit text-yellow-600"></i> {/* Manual FontAwesome icon */}
      <span className="font-bold">{status}</span>
    </div>
  );
}
  return (
    <section className=" flex items-center justify-center py-10">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-7xl p-8">
        <div className="flex justify-between items-start mb-8 flex-wrap">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <h5 className="text-md font-semibold">
    {/* BILTY#{" "} */}
    TRACKING ID{" "}
    <span className="text-indigo-600 font-bold">{BuiltNo}</span>
  </h5>

  {BookingDate && (
    <h5 className="text-md font-semibold">
      BOOKING DATE{" "}
      <span className="text-indigo-600 font-bold">{formatDate(BookingDate)}</span>
    </h5>
  )}

  {InvoiceId && (
    <h5 className="text-md font-semibold">
      INVOICE{" "}
      <span className="text-indigo-600 font-bold">#{InvoiceId}</span>
      {/* <span className="text-indigo-600 font-bold">#{InvoiceId}</span> */}
    </h5>
  )}

  {ContainerNumber && (
    <h5 className="text-md font-semibold">
      CONTAINER {" "}
      <span className="text-indigo-600 font-bold">#{ContainerNumber}</span>
    </h5>
  )}
</div>

        </div>

        {/* Full Progress Steps */}
        <div className="flex items-center justify-between relative mb-8 overflow-x-auto px-4">
          {steps.map((step, i) => (
            <div key={step} className="flex flex-col items-center text-center min-w-[100px] relative">
              {/* Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white z-10 
                  ${
                    i <= currentStepIndex
                      ? "bg-indigo-700"
                      : "bg-gray-300"
                  }`}
              >
                {icons[i]}
              </div>
              {/* Line */}
              {i !== steps.length - 1 && (
                <div className={`h-1 w-full absolute top-5 left-1/2 right-0 z-0 
                  ${i < currentStepIndex ? "bg-indigo-700" : "bg-gray-300"}
                `}></div>
              )}
              {/* Label */}
              <p
                className={`text-xs mt-2 font-semibold ${
                  i <= currentStepIndex
                    ? "text-indigo-700"
                    : "text-gray-400"
                }`}
              >
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
