import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'; // ✅ Use the default import

export const handlePdfSave = (formData, buttonType) => {
  const doc = new jsPDF();

  // --------- Header Blue Section ----------
  doc.setFillColor(33, 91, 168); // blue
  doc.rect(0, 0, 210, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text("Invoice", 15, 25);

  doc.setFontSize(12);
  doc.text("Your Company Name", 150, 15);
  doc.text("Your Business Address", 150, 22);
  doc.text("City", 150, 28);
  doc.text("Country", 150, 34);
  doc.text("Postal", 150, 40);

  // ----------- BILL TO section ----------
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text("BILL TO:", 15, 50);
  doc.setFont("helvetica", "bold");
  doc.text(formData.SenderName || "", 15, 56);
  doc.setFont("helvetica", "normal");
  doc.text(formData.SenderAddress || "", 15, 62);
  doc.text(formData.SenderArea || "", 15, 68);
  doc.text("Pakistan", 15, 74);

  // ----------- Invoice Info Right Side ----------
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE #", 150, 50);
  doc.setFont("helvetica", "normal");
  doc.text(formData.InvoiceNo || "", 150, 56);

  doc.setFont("helvetica", "bold");
  doc.text("DATE", 150, 62);
  doc.setFont("helvetica", "normal");
  doc.text(formData.BookingDate || "", 150, 68);

  doc.setFont("helvetica", "bold");
  doc.text("DUE DATE", 150, 74);
  doc.setFont("helvetica", "normal");
  doc.text(formData.BookingDate || "", 150, 80); // Can adjust due date logic

  // ---------- Items Table ----------
  const items = [
    {
      item: "Item",
      description: formData.ItemDetails || "No details",
      quantity: formData.NoOfPieces || "1",
      price: formData?.Charges?.FreightCharges?.unitRate || "0",
      tax: "0%",
      amount: formData.SubTotal || "0"
    }
  ];

  autoTable(doc, {
    head: [["ITEMS", "DESCRIPTION", "QUANTITY", "PRICE", "TAX", "AMOUNT"]],
    body: items.map(item => [
      item.item,
      item.description,
      item.quantity,
      `$${item.price}`,
      item.tax,
      `$${item.amount}`
    ]),
    startY: 90,
    theme: 'grid'
  });

  const finalY = doc.lastAutoTable?.finalY || 110;

  // ---------- Notes and Total ----------
  doc.setFillColor(215, 234, 249);
  doc.rect(0, finalY + 10, 150, 20, 'F');
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text("NOTES:", 10, finalY + 16);
  doc.text(
    "Thank you for your business! If you have questions, let us know.",
    10,
    finalY + 22
  );

  doc.setFillColor(33, 91, 168);
  doc.setTextColor(255, 255, 255);
  doc.rect(150, finalY + 10, 60, 20, 'F');
  doc.setFontSize(12);
  doc.text("TOTAL", 160, finalY + 17);
  doc.setFontSize(16);
  doc.text(`$${formData.InvoiceTotal || "0.00"}`, 160, finalY + 25);

  const fileName = `booking_${formData.InvoiceNo || "record"}`;

  if (buttonType === "SavePDF") {
    doc.save(`${fileName}.pdf`);
  }

  if (buttonType === "Save&PRINT") {
    const blob = doc.output("blob");
    const blobURL = URL.createObjectURL(blob);
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = blobURL;
    document.body.appendChild(iframe);
    iframe.onload = () => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      URL.revokeObjectURL(blobURL);
    };
  }

  if (buttonType === "SendToWhatsapp") {
    const blob = doc.output("blob");
    const file = new File([blob], fileName, { type: "application/pdf" });
    alert("Send to WhatsApp coming soon 🚀");
  }
};
