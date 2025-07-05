import { jsPDF } from 'jspdf'

export const handlePdfSave = (formData,buttonType) => {
    const pdf = new jsPDF();
    let y = 20;
  
    const leftX = 20;
    const rightX = 110;
  
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text("Booking Details", 80, 10);
  
    // ----- Sender Heading -----
    pdf.setFontSize(13);
    pdf.text("Sender Details", leftX, y);
    // ----- Receiver Heading -----
    pdf.text("Receiver Details", rightX, y);
  
    y += 8;
    pdf.setFontSize(12);
  
    const senderFields = [
      "SenderName", "SenderAddressDetail", "SenderMobile",
      "SenderCity", "SenderOtherDetails"
    ];
  
    const receiverFields = [
      "ReceiverName", "ReceiverAddressDetail", "ReceiverMobile",
      "ReceiverCity", "ReceiverOtherDetail"
    ];
  
    // Sender fields
    senderFields.forEach((key) => {
      const text = `${key}: ${formData[key] || ""}`;
      pdf.setFont("helvetica", "normal");
      pdf.text(text, leftX, y);
      y += 8;
    });
  
    // Reset Y for receiver and write on right side
    y = 28; // receiver heading was at 20, +8 = 28
    receiverFields.forEach((key) => {
      const text = `${key}: ${formData[key] || ""}`;
      pdf.setFont("helvetica", "normal");
      pdf.text(text, rightX, y);
      y += 8;
    });
  
    // -------- Bottom Section --------
    y = Math.max(y, 70) + 10;
  
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.text("Cargo Charges", 85, y);
  
    y += 10;
    pdf.setFontSize(12);
  
    const bottomFields = [
      "NoOfPieces", "DetailOfItems", "BranchName", "UnitRate",
      "TotalWeight", "TotalAmount", "Customs", "Packaging", "Shipping",
      "Clearance", "OtherCharges", "VAT", "VAT_Value", "TotalInvoiceAmount",
      "BiltyNo", "InvoiceNo"
    ];
  
    // Divide bottom fields in 2 columns
    const half = Math.ceil(bottomFields.length / 2);
    const leftFields = bottomFields.slice(0, half);
    const rightFields = bottomFields.slice(half);
  
    let bottomYLeft = y;
    let bottomYRight = y;
  
    // Left side cargo fields
    leftFields.forEach((key) => {
      const text = `${key}: ${formData[key] || ""}`;
      pdf.setFont("helvetica", "normal");
      pdf.text(text, leftX, bottomYLeft);
      bottomYLeft += 8;
    });
  
    // Right side cargo fields
    rightFields.forEach((key) => {
      const text = `${key}: ${formData[key] || ""}`;
      pdf.setFont("helvetica", "normal");
      pdf.text(text, rightX, bottomYRight);
      bottomYRight += 8;
    });
  const fileName = `booking_${formData.BiltyNo}`
    // Save PDF
    if (buttonType === 'SavePDF') {
      pdf.save(`booking_${fileName || "record"}`);
      
    }
    if (buttonType === "Save&PRINT") {
      const blob = pdf.output("blob");
      const blobURL = URL.createObjectURL(blob);
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = blobURL;
      document.body.appendChild(iframe);
      iframe.onload = () => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        URL.revokeObjectURL(blobURL); // Cleanup
      };
    }

    if (buttonType === "SendToWhatsapp") {
      const blob = pdf.output("blob");
      const file = new File([blob], fileName, { type: "application/pdf" });
  
      // Now you can upload this `file` to your server or use FormData to send
      alert("Send to WhatsApp feature coming soon 🚀");
    }
  };
  