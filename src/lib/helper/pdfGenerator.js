import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const handlePdfSave = (formData, buttonType) => {
  const doc = new jsPDF();
  const safeText = (val) => String(val ?? "");

  // --- HEADER ---
  doc.setFillColor(33, 91, 168);
  doc.rect(0, 0, 210, 50, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text("Invoice", 15, 25);

  doc.setFontSize(12);
  doc.text("ABCD – CARGO SERVICES", 150, 15);
  doc.text("Your Business Address", 150, 22);
  doc.text("City", 150, 28);
  doc.text("Saudia Arabia", 150, 34);
  doc.text("75311", 150, 40);

  // --- SENDER DETAILS ---
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("SENDER DETAILS:", 15, 60);
  doc.setFont("helvetica", "normal");
  doc.text(safeText(formData.SenderName), 15, 66);
  doc.text(safeText(formData.SenderAddress), 15, 72);
  doc.text(safeText(formData.SenderArea), 15, 78);
  doc.text("Saudia Arabia", 15, 84);

  // --- INVOICE INFO ---
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE # :", 150, 60);
  doc.setFont("helvetica", "normal");
  doc.text(safeText(formData.InvoiceNo), 174, 60);

  doc.setFont("helvetica", "bold");
  doc.text("DATE :", 150, 68);
  doc.setFont("helvetica", "normal");
  doc.text(safeText(formData.BookingDate), 165, 68);

  // --- RECEIVER DETAILS ---
  doc.setFont("helvetica", "bold");
  doc.text("RECEIVER DETAILS:", 15, 100);
  doc.setFont("helvetica", "normal");
  doc.text(safeText(formData.ReceiverName), 15, 106);
  doc.text(safeText(formData.ReceiverAddress), 15, 112);
  doc.text(safeText(formData.ReceiverArea), 15, 118);
  doc.text("Saudia Arabia", 15, 124);

  // --- PIECES & ITEMS ---
  doc.setFont("helvetica", "bold");
  doc.text("PIECES # :", 150, 100);
  doc.setFont("helvetica", "normal");
  doc.text(safeText(formData.NoOfPieces), 174, 100);

  doc.setFont("helvetica", "bold");
  doc.text("ITEM DETAILS :", 150, 108);
  doc.setFont("helvetica", "normal");
  doc.text(safeText(formData.ItemDetails), 150, 114);

  // --- CHARGES TABLE ---
  autoTable(doc, {
    head: [["#", "CHARGES", "UNIT/RATE", "QUANTITY", "TOTAL"]],
    body: Object.entries(formData.Charges || {}).map(([key, value], index) => [
      index + 1,
      safeText(key),
      `SAR ${safeText(value.unitRate)}`,
      value.qty > 0 ? `${value.qty}` : "",
      value.qty > 0 ? `SAR ${safeText(value.total)}` : "",
    ]),
    startY: 135,
    theme: "grid",
  });

  const finalY = doc.lastAutoTable?.finalY || 150;

  // --- NOTES BOX ---
  doc.setFillColor(215, 234, 249);
  doc.rect(0, finalY + 10, 150, 20, "F");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text("NOTES:", 10, finalY + 16);
  doc.text(
    "Thank you for your business! If you have questions, let us know.",
    10,
    finalY + 22
  );

  // --- TOTAL SECTION ---
  let summaryY = finalY + 10;

  const summaryItems = [
    { label: "SUBTOTAL", value: `SAR ${safeText(formData.SubTotal)}` },
    { label: "VAT", value: `SAR ${safeText(formData.VatTotal)}` },
    { label: "TOTAL", value: `SAR ${safeText(formData.InvoiceTotal)}` },
  ];

  summaryItems.forEach((item, i) => {
    const y = summaryY + i * 10;
    doc.setFillColor(33, 91, 168);
    doc.setTextColor(255, 255, 255);
    doc.rect(150, y, 60, 10, "F");
    doc.setFontSize(12);
    doc.text(item.label, 155, y + 7);
    doc.setFontSize(14);
    doc.text(item.value, 205, y + 7, { align: "right" });
  });

  // --- FILE HANDLING ---
  const fileName = `booking_${safeText(formData.BiltyNo || "record")}`;

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
