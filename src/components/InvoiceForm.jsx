import React,{useState,useEffect} from 'react'
import {numberToWords} from '../lib/helper/numberToWord'
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppRoutes } from '../constants/AppRoutes';
import {handlePdfSave} from '../lib/helper/pdfGenerator'
const InvoiceForm = () => {
    
    const [errors, setErrors] = useState({});
    const  [isSubmitted,setIsSubmitted] = useState(false)
    const  [isSubmittedBooking,setIsSubmittedBooking] = useState(false)
    const  [isEditingBooking,setIsEditingBooking] = useState(false)
    const  [isDeleting,setIsDeleting] = useState(false)

    const [formData, setFormData] = useState({
    SenderName: "",
    SenderMobile: "",
    SenderIdNumber:"",
    SenderAddress: "",
    SenderArea: "",
    
    ReceiverName: "",
    ReceiverMobile1: "",
    ReceiverMobile2: "",
    ReceiverAddress: "",
    
    ItemDetails:"",
    OtherDetails:"",

    NoOfPieces: "",
    Branch: "",
    BookingDate:new Date().toISOString().split('T')[0],
    //  BiltyNo: "",
    //  InvoiceNo: "",
    
    Charges: {
        FreightCharges: { enabled: false, unitRate: '', qty: '', total: '' },
        Insurance: { enabled: false, unitRate: '', qty: '', total: '' },
        Packing: { enabled: false, unitRate: '', qty: '', total: '' },
        Customs: { enabled: false, unitRate: '', qty: '', total: '' },
        Clearance: { enabled: false, unitRate: '', qty: '', total: '' },
        OtherCharges: { enabled: false, unitRate: '', qty: '', total: '' },
    },
    Discount: { enabled: false, discount: '' },
    SubTotal:"",
    Vat:"",
    VatTotal:"",
    
    AmountInWords: '',
    InvoiceTotal: ''
    })

   
    const handleChange = (e) => {
        const { name, value, type, checked, dataset } = e.target;
      
        // Charges section
        if (dataset.charge) {
          const chargeKey = dataset.charge;
          const field = dataset.field;
      
          // If it's Discount
          if (chargeKey === "Discount") {
            setFormData((prev) => ({
              ...prev,
              Discount: {
                ...prev.Discount,
                [field]: type === "checkbox" ? checked : value,
              },
            }));
          } else {
            // Normal Charges
            setFormData((prev) => {
              const updatedCharge = {
                ...prev.Charges[chargeKey],
                [field]: type === "checkbox" ? checked : value,
              };
      
              // const unit = parseFloat(field === 'unitRate' ? value : updatedCharge.unitRate) || 0;
              // const qty = parseFloat(field === 'qty' ? value : updatedCharge.qty) || 0;
              // updatedCharge.total = (unit * qty).toFixed(2);

              const unit = Math.max(0, parseFloat(field === 'unitRate' ? value : updatedCharge.unitRate) || 0);
              const qty = Math.max(0, parseFloat(field === 'qty' ? value : updatedCharge.qty) || 0);

              // Only calculate total if both unit and qty have valid positive values
              updatedCharge.total = unit > 0 && qty > 0 ? (unit * qty).toFixed(2) : '';

      
              return {
                ...prev,
                Charges: {
                  ...prev.Charges,
                  [chargeKey]: updatedCharge,
                },
              };
            });
          }
        } else {
          // Top-level fields
          setFormData((prev) => ({
            ...prev,
            [name]: value,
          }));
        }
      };
      
           
   
    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(formData);
        
        const newErrors = {};
         // Required Fields
        const requiredFields = [
            "SenderName",
            "SenderMobile",
            "SenderIdNumber",
            "SenderAddress",
            "SenderArea",
            "ReceiverName",
            "ReceiverMobile1",
            "ReceiverMobile2",
            "ReceiverAddress",
            "NoOfPieces",
          "Branch",
            "BookingDate"
        ];
        requiredFields.forEach((field) => {
            if (!formData[field]) {
              newErrors[field] = "This field is required";
            }
        });
        // Mobile & Numeric Validation
        const numberFields = ["SenderMobile", "ReceiverMobile1", "ReceiverMobile2", "NoOfPieces"];
        numberFields.forEach((field) => {
            if (formData[field] && !/^\d+$/.test(formData[field])) {
            newErrors[field] = "Only numbers allowed";
            }
        });
        setErrors(newErrors);
        // If errors exist, return and prevent submit
        // console.log(Object.keys(newErrors));
        
        if (Object.keys(newErrors).length > 0) {
          return;
      }
      try {
        setIsSubmittedBooking(true)
        const response = await axios.post(AppRoutes.addBooking,formData)
      const data = response.data
      // set response data into form
      setFormData((prev) => ({
        ...prev,
        ...data?.data?.bookingData,
      }));
      toast.success(data?.data?.message)
       setIsSubmitted(true)
      } catch (error) {
        console.log(error);
        
        const err = error?.response?.data?.errors;
        if (err?.general) toast.error(err.general);
        if (!err) toast.error('Something went wrong');
      } finally {
        setIsSubmittedBooking(false)
      }

  }
  
  const handleNewShipment = () => {
    setFormData({
      SenderName: "",
    SenderMobile: "",
    SenderIdNumber:"",
    SenderAddress: "",
    SenderArea: "",
    
    ReceiverName: "",
    ReceiverMobile1: "",
    ReceiverMobile2: "",
    ReceiverAddress: "",
    
    ItemDetails:"",
    OtherDetails:"",

    NoOfPieces: "",
    Branch: "",
    BookingDate:new Date().toISOString().split('T')[0],
    //  BiltyNo: "",
    //  InvoiceNo: "",
    
    Charges: {
        FreightCharges: { enabled: false, unitRate: '', qty: '', total: '' },
        Insurance: { enabled: false, unitRate: '', qty: '', total: '' },
        Packing: { enabled: false, unitRate: '', qty: '', total: '' },
        Customs: { enabled: false, unitRate: '', qty: '', total: '' },
        Clearance: { enabled: false, unitRate: '', qty: '', total: '' },
        OtherCharges: { enabled: false, unitRate: '', qty: '', total: '' },
    },
    Discount: { enabled: false, discount: '' },
    SubTotal:"",
    Vat:"",
    VatTotal:"",
    
    AmountInWords: '',
    InvoiceTotal: '',
    BiltyNo: '',
    InvoiceNo: ''
    
    });
    setIsSubmitted(false);
  };
  
  const handleEdit =async () => {
    try {
      setIsEditingBooking(true)
      const response = await axios.post(AppRoutes.editBooking,formData)
      const data = response.data
      toast.success(data?.data?.message)
       // set response data into form
       setFormData((prev) => ({
        ...prev,
        ...data?.data?.bookingData,
       }));
      console.log("success=>",data);
      
    } catch (error) {
      console.log("error=>",error);
      const err = error?.response?.data?.errors;
      if (err?.general) toast.error(err.general);
      if (!err) toast.error('Something went wrong');
    } finally {
      setIsEditingBooking(false)
      
    }
    
  }
  const handleDelete = async(builtNo) => {
    try {
      if (!builtNo) {
        toast.error('Builty no is missing')
        return
      }
      const response = await axios.delete(AppRoutes.deleteBooking, { data: { BiltyNo: builtNo } })
      const data = response.data
      toast.success(data?.data?.message)
      handleNewShipment()
      
    } catch (error) {
      const err = error?.response?.data?.errors;
      if (err?.general) toast.error(err?.general)
      if (!err) toast.error('Something went wrong');
    }
  }
  useEffect(() => {
        
        const discount = parseFloat(formData.Discount.discount) || 0;
        console.log("discount",discount);
        const allCharges = Object.values(formData.Charges);
        let subtotal = allCharges.reduce((sum, charge) => {
          const total = parseFloat(charge.total) || 0;
          return sum + total ;
        }, 0);
        subtotal += discount
        
        const selectedCharges = allCharges.filter(c => c.enabled);
        let selectedTotal = selectedCharges.reduce((sum, charge) => {
          const total = parseFloat(charge.total) || 0;
          return sum + total ;
        }, 0);
        // ✅ If discount checkbox is ticked, treat discount as a VAT-able amount (like a charge)
        if (formData.Discount.enabled) {
            selectedTotal += discount;
        }
        const vatPercent = parseFloat(formData.Vat) || 0;
        const vatTotal = (selectedTotal * vatPercent / 100);
      
      
        const invoiceTotal = subtotal + vatTotal ;
      const amountInWords = numberToWords(invoiceTotal.toFixed(2));
      console.log(amountInWords);
      
        setFormData(prev => ({
          ...prev,
          SubTotal: subtotal.toFixed(2),
          VatTotal: vatTotal.toFixed(2),
          InvoiceTotal: invoiceTotal.toFixed(2),
          AmountInWords:amountInWords
        }));
      }, [formData.Charges, formData.Vat, formData.Discount]);
      
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
        <form onSubmit={handleSubmit} className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl p-6 space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-800">
            ABCD – CARGO SERVICES
            </h1>
            <h2 className="text-xl font-semibold text-gray-700">
            New Invoice Entry
            </h2>
        </div>

        <div className="grid grid-cols-4 gap-4">
            <div>
            <label className="font-medium">Bilty No</label>
            <input type="text" readOnly className="w-full border rounded px-2 py-1" value={formData.BiltyNo}/>
            </div>
            <div>
            <label className="font-medium">Invoice No</label>
            <input type="text" readOnly className="w-full border rounded px-2 py-1" value={formData.InvoiceNo}/>
            </div>
            <div>
            <label className="font-medium">Date</label>
            <input name='BookingDate' type="date" className="w-full border rounded px-2 py-1" value={formData.BookingDate} onChange={handleChange}/>
            {errors["BookingDate"] && (
                    <p className="text-sm text-red-600 mt-1">{errors["BookingDate"]}</p>
                    )}  
          </div>
            <div>
            <label  className="font-medium">Branch</label>
            <input name='Branch' onChange={handleChange} value={formData.Branch} type="text" className="w-full border rounded px-2 py-1" />
            {errors["Branch"] && (
                    <p className="text-sm text-red-600 mt-1">{errors["Branch"]}</p>
                    )}
            </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
            {/* Sender Details */}
            <div>
            <h3 className="text-lg font-bold text-blue-800 mb-2">
                Sender Details
            </h3>
            {[
                { label: "Name", key: "SenderName" },
                { label: "Mobile No", key: "SenderMobile" },
                { label: "ID Number", key: "SenderIdNumber" },
                { label: "Address", key: "SenderAddress" },
                { label: "Area", key: "SenderArea" },
                { label: "Other Details", key: "SenderOtherDetails" },
                { label: "Item Details", key: "SenderItemDetails" },
            ].map((sender,index) => (
                <div key={index} className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                    {sender.label}
                </label>
                <input
                    name={sender.key}
                    type="text"
                    value={formData[sender.key]}
                    onChange={handleChange}
                    className="w-full border rounded px-2 py-1"
                    />
                     {errors[sender.key] && (
                    <p className="text-sm text-red-600 mt-1">{errors[sender.key]}</p>
                    )}
                </div>
            ))}
            </div>

            {/* Receiver Details */}
            <div>
            <h3 className="text-lg font-bold text-blue-800 mb-2">
                Receiver Details
            </h3>
            {[
                { label: "Name", key: "ReceiverName" },
                { label: "Mobile No 1", key: "ReceiverMobile1" },
                { label: "Mobile No 2", key: "ReceiverMobile2" },
                { label: "Address", key: "ReceiverAddress" },
                { label: "No Of Pieces", key: "NoOfPieces" },
            ].map((reciever,index) => (
                <div key={index} className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                    {reciever.label}
                </label>
                <input
                name={reciever.key}
                    type="text"
                    className="w-full border rounded px-2 py-1"
                    value={formData[reciever.key]}
                    onChange={handleChange}
                    inputMode="numeric"
            
                    
                />
                 {errors[reciever.key] && (
                    <p className="text-sm text-red-600 mt-1">{errors[reciever.key]}</p>
                )}
                </div>
            ))}
            </div>
        </div>
        {/* Charges Table */}
             
        <div>
            <h3 className="text-lg font-bold text-blue-800 mb-2">Charges</h3>
            <div className="grid grid-cols-6 gap-2 font-semibold text-sm text-gray-600 border-b pb-1">
            <div>Apply</div>
            <div>Charge Type</div>
            <div>U / Rate</div>
            <div>Qty</div>
            <div>Total</div>
            </div>

            {Object.entries(formData.Charges).map(([chargeKey, chargeData], index) => {
  if (chargeKey === "SubTotal") return null;

  return (
    <div key={chargeKey} className="grid grid-cols-6 gap-2 items-center mt-1">
      <div>
        <input
          type="checkbox"
          checked={chargeData.enabled}
          onChange={handleChange}
          data-charge={chargeKey}
          data-field="enabled"
          className="h-4 w-4 text-blue-600"
        />
      </div>
      <div className="text-sm font-medium text-gray-700">{chargeKey}</div>
      <input
        type="number"
         min="0"
        value={chargeData.unitRate}
        onChange={handleChange}
        data-charge={chargeKey}
        data-field="unitRate"
        className="border rounded px-2 py-1"
      />
      <input
        type="number"
         min="0"
        value={chargeData.qty}
        onChange={handleChange}
        data-charge={chargeKey}
        data-field="qty"
        className="border rounded px-2 py-1"
      />
      <input
        type="text"
        value={chargeData.total}
        readOnly
        className="border rounded px-2 py-1 bg-gray-100"
      />
    </div>
  );
})}
    {/* Discount */}
    <div className="grid grid-cols-6 gap-2 items-center mt-1">
  {/* Just a visual checkbox (can toggle but does NOT affect input accessibility) */}
  <div>
    <input
      type="checkbox"
      checked={formData.Discount.enabled}
      onChange={handleChange}
      data-charge="Discount"
      data-field="enabled"
      className="h-4 w-4 text-blue-600"
    />
  </div>

  <div className="text-sm font-medium text-gray-700">Discount</div>

  {/* Unit Rate & Qty - always disabled */}
  <input
    type="number"
     min="0"
    disabled
    className="border rounded px-2 py-1 bg-gray-100"
  />
  <input
    type="number"
     min="0"
    disabled
    className="border rounded px-2 py-1 bg-gray-100"
  />

  {/* Discount amount - always editable */}
  <input
    type="text"
    value={formData.Discount.discount}
    onChange={handleChange}
    data-charge="Discount"
    data-field="discount"
    className="border rounded px-2 py-1"
  />
</div>

    {/* Subtotal */}
            <div className="grid grid-cols-6 gap-2 items-center mt-1">
                <div>
                    <input
                    disabled
                    type="checkbox"
                    //   checked={chargeData.enabled}
                    //   onChange={handleChange}
                    //   data-charge={chargeKey}
                    data-field="enabled"
                    className="h-4 w-4 text-blue-600"
                    />
                </div>
                <div className="text-sm font-medium text-gray-700">Sub Total</div>
                <input
                    disabled
                    type="number"
                     min="0"
                    // value={chargeData.unitRate}
                    // onChange={handleChange}
                    // data-charge={chargeKey}
                    data-field="unitRate"
                    className="border rounded px-2 py-1"
                    />
                <input
                    disabled
                    type="number"
                     min="0"
                    // value={chargeData.qty}
                    // onChange={handleChange}
                    // data-charge={chargeKey}
                    data-field="qty"
                    className="border rounded px-2 py-1"
                />
                <input
                type="text"
                value={formData.SubTotal}
                readOnly
                className="border rounded px-2 py-1 bg-gray-100"
                />
            </div>
    {/* Vat in percent */}
            <div className="grid grid-cols-6 gap-2 items-center mt-1">
                <div>
                    <input
                    disabled
                    type="checkbox"
                    //   checked={chargeData.enabled}
                    //   onChange={handleChange}
                    //   data-charge={chargeKey}
                    data-field="enabled"
                    className="h-4 w-4 text-blue-600"
                    />
                </div>
                <div className="text-sm font-medium text-gray-700">Vat</div>
                <input
                    disabled
                    type="number"
                     min="0"
                    // value={chargeData.unitRate}
                    // onChange={handleChange}
                    // data-charge={chargeKey}
                    data-field="unitRate"
                    className="border rounded px-2 py-1"
                    />
                <input
                    disabled
                    type="number"
                     min="0"
                    // value={chargeData.qty}
                    // onChange={handleChange}
                    // data-charge={chargeKey}
                    data-field="qty"
                    className="border rounded px-2 py-1"
                />
                <input
                    type="text"
                     name="Vat"
                    value={formData.Vat}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 bg-gray-100"
                />
            </div>
            {/* total vat */}
            <div className="grid grid-cols-6 gap-2 items-center mt-4 font-semibold text-gray-800">
            <div></div>
            <div>VAT ({formData.Vat}%) Total</div>
            <div></div>
            <div></div>
            <input
                type="text"
                value={formData.VatTotal}
                readOnly
                className="border rounded px-2 py-1 bg-gray-100"
            />
            </div>
        </div>
         
        {/* Amount in Words */}
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
            Amount In Words SAR
            </label>
            <input readOnly value={formData.AmountInWords} type="text" className="w-full border rounded px-2 py-1" />
        </div>

        {/* Invoice Total */}
        <div className="text-right">
            <div className="inline-block text-sm font-semibold text-gray-700 mr-2">
            Invoice Total SAR:
            </div>
            <input type="text" readOnly value={formData.InvoiceTotal} className="border rounded px-2 py-1 w-48" />
        </div>
        <div>
        {
          !isSubmitted && 
          
            ( <button
            disabled={isSubmittedBooking}
              type="submit"
              className="md:col-span-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition w-full mt-4"
            >
              {
                    isSubmittedBooking ?
                    <div className="flex justify-center">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  </div>:
              "Save Shipment"
              }
            </button>)
        }
        </div>
      </form>
        {/* Action Buttons */}
        {
          isSubmitted && 
        <div>
            <button
              type="button"
              onClick={handleNewShipment}
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition w-full mt-4"
            >
              New Shipment
            </button>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
                {[
                // {label:"Save & Print"},
                // "Save PDF",
                // "Edit Invoice",
                // "Del. Invoice",
                // "PDF To Whatsapp",
                {
                  label: "Save & Print",
                  onClick: () => handlePdfSave(formData,'Save&PRINT'),
                },
                {
                  label: "Save PDF",
                  onClick: () => () =>  handlePdfSave(formData, 'SavePDF'),
                },
                {
                  label: "Edit Invoice",
                  onClick: handleEdit,
                  isLoading: isEditingBooking,
                },
                {
                  label: "Del. Invoice",
                  onClick: () => handleDelete(formData.BiltyNo),
                  isLoading: isDeleting
                },
                {
                  label: "PDF To Whatsapp",
                  onClick: () => handlePdfSave(formData,"SendToWhatsapp"),
                },
                ].map(({label,onClick,isLoading},index) => (
                <button
                    key={index}
                    onClick={onClick}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md"
                >
                    {isLoading ? (
          <div className="flex justify-center">
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </div>
        ) : (
          label
        )}
                </button>
                ))}
            </div>
          
          </div>
          
        }
      
     </div>
  )
}

export default InvoiceForm
