import {useState,useEffect} from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar';
const Booking = () => {
  const  [isSubmitted,setIsSubmitted] = useState(false)
   const [formData, setFormData] = useState({
    //  BiltyNo: "",
    //  InvoiceNo: "",
      SenderName: "",
      ReceiverName: "",
      SenderAddressDetail: "",
      SenderMobile: "",
      SenderCity: "",
      SenderOtherDetails: "",
      ReceiverAddressDetail: "",
      ReceiverMobile: "",
      ReceiverCity: "",
      ReceiverOtherDetail: "",
      NoOfPieces: "",
      DetailOfItems: "",
      BranchName: "",
      UnitRate: "",
      TotalWeight: "",
      TotalAmount: "",
      Customs: "",
      Packaging: "",
      Shipping: "",
      Clearance: "",
      OtherCharges: "",
      VAT: "",
      VAT_Value: "",
      TotalInvoiceAmount: "",
    });
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => 
      // console.log(prevState);
       ({
        ...prevState, [name]: value
      })
    )
  }

  const handleSubmit =async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('https://courire-system-backend-express.vercel.app/api/addBooking',formData)
      const data = response.data
      alert(data?.data?.message)
       // set response data into form
       setFormData((prev) => ({
        ...prev,
        ...data?.data?.bookingData,
       }));
      setIsSubmitted(true)
      console.log("success=>",data);
      
    } catch (error) {
      console.log("error=>",error);
      
    }
    
  }
  
  useEffect(() => {
    const unitRate = parseFloat(formData.UnitRate) || 0;
    const totalWeight = parseFloat(formData.TotalWeight) || 0;
    const customs = parseFloat(formData.Customs) || 0;    

    // Step 1: TotalAmount = UnitRate * TotalWeight
      const totalAmount = unitRate * totalWeight;
      const baseAmount = totalAmount + customs;

    const packaging = parseFloat(formData.Packaging) || 0;
    const shipping = parseFloat(formData.Shipping) || 0;
    const clearance = parseFloat(formData.Clearance) || 0;
    const otherCharges = parseFloat(formData.OtherCharges) || 0;
    const vatPercent = parseFloat(formData.VAT) || 0;
    

    // Step 2
    // find vat value
    const vatValue = (packaging + shipping + clearance + otherCharges) * (vatPercent / 100)
    
    // Compute total invoice amount conditionally based on vatValue

    const totalInvoiceAmount = 
      vatValue > 0 ?
        baseAmount + vatValue + packaging + shipping + clearance + otherCharges :
        baseAmount

    setFormData(prevState => ({
      ...prevState,TotalAmount:totalAmount,VAT_Value:vatValue,TotalInvoiceAmount: totalInvoiceAmount
    }))
  
},[formData.UnitRate,formData.TotalWeight,formData.Packaging,formData.Shipping,formData.Clearance,formData.OtherCharges,formData.VAT,formData.Customs])
  
  
const handleNewShipment = () => {
  setFormData({
    SenderName: "",
    ReceiverName: "",
    SenderAddressDetail: "",
    SenderMobile: "",
    SenderCity: "",
    SenderOtherDetails: "",
    ReceiverAddressDetail: "",
    ReceiverMobile: "",
    ReceiverCity: "",
    ReceiverOtherDetail: "",
    NoOfPieces: "",
    DetailOfItems: "",
    BranchName: "",
    UnitRate: "",
    TotalWeight: "",
    TotalAmount: "",
    Customs: "",
    Packaging: "",
    Shipping: "",
    Clearance: "",
    OtherCharges: "",
    VAT: "",
    VAT_Value: "",
    TotalInvoiceAmount: "",
    BiltyNo: "",
    InvoiceNo: "",
  });
  setIsSubmitted(false);
};
  return (
    <div className="bg-white w-full px-2 rounded-lg shadow-md">
      <form
        onSubmit={handleSubmit}
        className="">
      <div className="w-full grid p-2 lg:grid-cols-2 md:grid-cols-2  gap-2 ">
        <div className="">
          <div>
            <h3 className="font-bold text-gray-700 mb-4">Bilty No.</h3>
            <input
              name="BiltyNo"
              value={formData.BiltyNo}
              // type="number"
              placeholder="Bilty No."
              className="w-full border p-2 mb-2"
                required
                readOnly
            />
          </div>
          <div>
            <h3 className="font-bold text-gray-700 mb-4">Sender Name</h3>
            <input
              name="SenderName"
              value={formData.SenderName}
              onChange={handleChange}
              type="text"
              placeholder="Sender Name"
              className="w-full border p-2 mb-2"
              required
            />
          </div>

          <div>
            <h3 className="font-bold text-gray-700 mb-4">
              Sender Address Details
            </h3>
            <input
              name="SenderAddressDetail"
              value={formData.SenderAddressDetail}
              onChange={handleChange}
              type="text"
              placeholder="Sender Address"
              className="w-full border p-2 mb-2"
              required
            />
          </div>
          <div>
            <h3 className="font-bold text-gray-700 mb-4">
              Sender Mobile Number
            </h3>
            <input
              name="SenderMobile"
              value={formData.SenderMobile}
              onChange={handleChange}
              type="number"
              placeholder="Sender Number"
              className="w-full border p-2 mb-2"
              required
            />
          </div>
          <div>
            <h3 className="font-bold text-gray-700 mb-4">Sender City</h3>
            <input
              name="SenderCity"
              value={formData.SenderCity}
              onChange={handleChange}
              type="text"
              placeholder="Sender City"
              className="w-full border p-2 mb-2"
              required
            />
          </div>
          <div>
            <h3 className="font-bold text-gray-700 mb-4">Other Details</h3>
            <input
              name="SenderOtherDetails"
              value={formData.SenderOtherDetails}
              onChange={handleChange}
              type="text"
              placeholder="Sender Other Details"
              className="w-full border p-2 mb-2"
            />
          </div>
        </div>
        <div className=" ">
          <div>
            <h3 className="font-bold text-gray-700 mb-4">Invoice No.</h3>
            <input
              name="InvoiceNo"
              value={formData.InvoiceNo}
              placeholder="Invoice No."
              className="w-full border p-2 mb-2"
                required
                readOnly
            />
          </div>
          <div>
            <h3 className="font-bold text-gray-700 mb-4">Receiver Name</h3>
            <input
              name="ReceiverName"
              value={formData.ReceiverName}
              onChange={handleChange}
              type="text"
              placeholder="Receiver Name"
              className="w-full border p-2 mb-2"
              required
            />
          </div>
          <div>
            <h3 className="font-bold text-gray-700 mb-4">
              Receiver Address Details
            </h3>
            <input
              name="ReceiverAddressDetail"
              value={formData.ReceiverAddressDetail}
              onChange={handleChange}
              type="text"
              placeholder="Receiver Address"
              className="w-full border p-2 mb-2"
              required
            />
          </div>
          <div>
            <h3 className="font-bold text-gray-700 mb-4">Receiver Number</h3>
            <input
              name="ReceiverMobile"
              value={formData.ReceiverMobile}
              onChange={handleChange}
              type="Number"
              placeholder="Receiver Number"
              className="w-full border p-2 mb-2"
              required
            />
          </div>
          <div>
            <h3 className="font-bold text-gray-700 mb-4">Receiver City</h3>
            <input
              name="ReceiverCity"
              value={formData.ReceiverCity}
              onChange={handleChange}
              type="text"
              placeholder="Receiver City"
              className="w-full border p-2 mb-2"
              required
            />
          </div>
          <div>
            <h3 className="font-bold text-gray-700 mb-4">
              Receiver Other Details
            </h3>
            <input
              name="ReceiverOtherDetail"
              value={formData.ReceiverOtherDetail}
              onChange={handleChange}
              type="text"
              placeholder="Receiver Other Details"
              className="w-full border p-2 mb-2"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div>
            <h3 className="font-bold text-gray-700 mb-4">No. of Pieces</h3>
            <input
              name="NoOfPieces"
              value={formData.NoOfPieces}
              onChange={handleChange}
              type="number"
              placeholder="No. of Pieces"
              className="w-full border p-2 mb-2"
              required
            />
          </div>
        </div>
        <div>
          <div>
            <h3 className="font-bold text-gray-700 mb-4">Detail Of Items</h3>
          </div>
          <textarea
            name="DetailOfItems"
            value={formData.DetailOfItems}
            onChange={handleChange}
            rows="5"
            cols="50"
            placeholder="Detail Of Items"
            className="w-full border p-2 mb-2"
          ></textarea>
        </div>
        <div className="md:mt-[-24%] lg:mt-[-20%] xl:mt-[-13%]">
          <h3 className="font-bold text-gray-700 mb-4">Branch Name</h3>
          <input
            name="BranchName"
            value={formData.BranchName}
            onChange={handleChange}
            type="text"
            placeholder="Branch Name"
            className="w-full border p-2 mb-2"
            required
          />
        </div>
      </div>
      <div className="">
        <h1 className="font-bold text-gray-700 text-center text-2xl">
          Cargo Charges
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-4">
        <div>
          <h3 className="font-bold text-gray-700 mb-4">Unit Rate</h3>
          <input
            name="UnitRate"
            value={formData.UnitRate}
            onChange={handleChange}
            type="number"
            placeholder="Unit Rate"
            className="w-full border p-2 mb-2"
            required
          />
        </div>
        <div>
          <h3 className="font-bold text-gray-700 mb-4">Total Weight</h3>
          <input
            name="TotalWeight"
            value={formData.TotalWeight}
            onChange={handleChange}
            type="number"
            placeholder="Total Weight"
            className="w-full border p-2 mb-2"
            required
          />
        </div>
        <div>
          <h3 className="font-bold text-gray-700 mb-4">Total Amount</h3>
          <input
            name="TotalAmount"
            value={formData.TotalAmount}
            type="number"
            placeholder="Total Amount"
            className="w-full border p-2 mb-2"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-4">
        <div>
          <h3 className="font-bold text-gray-700 mb-4">Customs</h3>
          <input
            name="Customs"
            value={formData.Customs}
            onChange={handleChange}
            type="number"
            placeholder="Customs"
            className="w-full border p-2 mb-2"
          />
        </div>
        <div>
          <h3 className="font-bold text-gray-700 mb-4">Packaging</h3>
          <input
            name="Packaging"
            value={formData.Packaging}
            onChange={handleChange}
            type="number"
            placeholder="Packaging"
            className="w-full border p-2 mb-2"
          />
        </div>
        <div>
          <h3 className="font-bold text-gray-700 mb-4">Shipping</h3>
          <input
            name="Shipping"
            value={formData.Shipping}
            onChange={handleChange}
            type="number"
            placeholder="Shipping"
            className="w-full border p-2 mb-2"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-4">
        <div>
          <h3 className="font-bold text-gray-700 mb-4">Clearance</h3>
          <input
            name="Clearance"
            value={formData.Clearance}
            onChange={handleChange}
            type="number"
            placeholder="Clearance"
            className="w-full border p-2 mb-2"
          />
        </div>

        <div>
          <h3 className="font-bold text-gray-700 mb-4">Other</h3>
          <input
            name="OtherCharges"
            value={formData.OtherCharges}
            onChange={handleChange}
            type="number"
            placeholder="Other Charges"
            className="w-full border p-2 mb-2"
          />
          </div>
          {
            (parseFloat(formData.Packaging) > 0 || parseFloat(formData.Clearance) > 0 || parseFloat(formData.Shipping) > 0 || parseFloat(formData.OtherCharges) > 0) &&
            (
              <>
                    <div>
                <h3 className="font-bold text-gray-700 mb-4">VAT %</h3>
                <input
                  name="VAT"
                  value={formData.VAT}
                  onChange={handleChange}
                  type="number"
                  placeholder="VAT %"
                      className="w-full border p-2 mb-2"
                      required
                />
                </div>
                <div>
          <h3 className="font-bold text-gray-700 mb-4">VAT </h3>
          <input
            name="VAT_Value"
                    value={formData.VAT_Value}
                    readOnly
            type="number"
            placeholder="VAT Value"
            className="w-full border p-2 mb-2"
          />
        </div>
              </>
            )
              
          }
        
      
      </div>
      <div>
        <h1 className="font-bold text-gray-700 text-center text-6xl">
          Total Invoice Amount
        </h1>
        <input
          name="TotalInvoiceAmount"
          value={formData.TotalInvoiceAmount}
            //   onChange={handleChange}
            readOnly
          type="number"
          placeholder="Total Invoice Amount"
          className="w-full border p-2 mb-2"
        />
        </div>
        {
          !isSubmitted && 
          
      ( <button
        type="submit"
        className="md:col-span-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition w-full mt-4"
      >
        Save Shipment
      </button>)
        }
      </form>
      {
        isSubmitted && (
          <button
            type="button"
            onClick={handleNewShipment}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition w-full mt-4"
          >
            New Shipment
          </button>
        )
      }
  </div>
  )
}

export default Booking
