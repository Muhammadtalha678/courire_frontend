import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const handlePdfSave = (formData, buttonType) => {
  const doc = new jsPDF();
  const safeText = (val) => String(val ?? "");

  const formatDate = (dateStr) => {
    const [y, m, d] = (dateStr || "").split("-");
    return d && m && y ? `${d}/${m}/${y}` : "";
  };

 // --- HEADER START ---
// Blue box first
doc.setFillColor(33, 91, 168);
doc.rect(0, 0, 210, 60, "F");

// "Invoice" Title
doc.setFontSize(22);
doc.setTextColor(255, 255, 255);
doc.setFont("helvetica", "bold");
doc.text("Invoice", 15, 20);

// Invoice Info (tight under the title)
doc.setFontSize(10);
doc.text(`Invoice #: ${safeText(formData.InvoiceNo)}`, 15, 28);
doc.text(`Booking Date: ${formatDate(formData.BookingDate)}`, 15, 34);
doc.text(`Bilty #: ${safeText(formData.BiltyNo)}`, 15, 40);

// --- Company info (right side, wrapped) ---
doc.setFontSize(12);
doc.setFont("helvetica", "normal");

const companyLines = doc.splitTextToSize("ABCD – CARGO SERVICES ABCD – CARGO SERVICES", 60);
const addressLines = doc.splitTextToSize("Your Business Address Your Business Address Your Business Address", 60);

const companyY = 15;
companyLines.forEach((line, i) => doc.text(line, 150, companyY + i * 6));

const addressY = companyY + companyLines.length * 6;
addressLines.forEach((line, i) => doc.text(line, 150, addressY + i * 6));

doc.text("City", 150, addressY + addressLines.length * 6);
doc.text("Saudi Arabia", 150, addressY + addressLines.length * 6 + 6);
doc.text("75311", 150, addressY + addressLines.length * 6 + 12);

// Update header height based on tallest column
const headerHeight = Math.max(
  50,
  addressY + addressLines.length * 6 + 18
);

// ========== BODY START ==========
const bodyStartY = headerHeight + 10;

doc.setTextColor(0, 0, 0);
doc.setFontSize(12);

// --- SENDER DETAILS ---
doc.setFont("helvetica", "bold");
doc.text("SENDER DETAILS:", 15, bodyStartY);
doc.setFont("helvetica", "normal");

const senderLines = [
  ...doc.splitTextToSize(`Name: ${safeText(formData.SenderName)}`, 60),
  ...doc.splitTextToSize(`ID: ${safeText(formData.SenderIdNumber)}`, 60),
  ...doc.splitTextToSize(`Mobile: ${safeText(formData.SenderMobile)}`, 60),
  ...doc.splitTextToSize(`Address: ${safeText(formData.SenderAddress)}`, 60),
  ...doc.splitTextToSize(`Area: ${safeText(formData.SenderArea)}`, 60),
  "Saudi Arabia"
];
senderLines.forEach((line, i) => {
  doc.text(line, 15, bodyStartY + 6 + i * 6);
});

// --- RECEIVER DETAILS ---
doc.setFont("helvetica", "bold");
doc.text("RECEIVER DETAILS:", 150, bodyStartY);
doc.setFont("helvetica", "normal");

const receiverLines = [
  ...doc.splitTextToSize(`Name: ${safeText(formData.ReceiverName)}`, 50),
  ...doc.splitTextToSize(`Mobile 1: ${safeText(formData.ReceiverMobile1)}`, 50),
  ...doc.splitTextToSize(`Mobile 2: ${safeText(formData.ReceiverMobile2)}`, 50),
  ...doc.splitTextToSize(`Address: ${safeText(formData.ReceiverAddress)}`, 50),
  ...doc.splitTextToSize(`Area: ${safeText(formData.ReceiverArea)}`, 50),
  "Saudi Arabia"
];
receiverLines.forEach((line, i) => {
  doc.text(line, 150, bodyStartY + 6 + i * 6);
});

// Compute max height
const senderHeight = senderLines.length * 6;
const receiverHeight = receiverLines.length * 6;
const detailStartY = bodyStartY + Math.max(senderHeight, receiverHeight) + 12;

// --- PIECES / ITEM / OTHER DETAILS ---
doc.setFont("helvetica", "bold");
doc.text("PIECES # :", 15, detailStartY);
doc.text("ITEM DETAILS :", 80, detailStartY);
doc.text("OTHER DETAILS :", 150, detailStartY);

doc.setFont("helvetica", "normal");
doc.text(safeText(formData.NoOfPieces), 15, detailStartY + 6);

const itemLines = doc.splitTextToSize(safeText(formData.ItemDetails), 50);
const otherLines = doc.splitTextToSize(safeText(formData.OtherDetails), 50);

doc.text(itemLines, 80, detailStartY + 6);
doc.text(otherLines, 150, detailStartY + 6);

// Don't forget to adjust rest of layout (charges table etc.)

  const detailBlockHeight = Math.max(itemLines.length, otherLines.length) * 6;
  const tableStartY = detailStartY + 20 + detailBlockHeight;

  // ========== CHARGES TABLE ==========
  autoTable(doc, {
    head: [["#", "CHARGES", "UNIT/RATE", "QUANTITY", "TOTAL"]],
    body: Object.entries(formData.Charges || {}).map(([key, value], index) => [
      index + 1,
      safeText(key),
      `SAR ${safeText(value.unitRate)}`,
      value.qty > 0 ? `${value.qty}` : "",
      value.qty > 0 ? `SAR ${safeText(value.total)}` : "",
    ]),
    startY: tableStartY,
    theme: "grid",
  });

  const finalY = doc.lastAutoTable?.finalY || tableStartY + 20;

  // ========== NOTES ==========
  doc.setFillColor(215, 234, 249);
  doc.rect(0, finalY + 10, 150, 20, "F");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text("NOTES:", 10, finalY + 16);
  doc.text("Thank you for your business! If you have questions, let us know.", 10, finalY + 22);

  // ========== TOTALS ==========
  const summaryItems = [
    { label: "SUBTOTAL", value: `SAR ${safeText(formData.SubTotal)}` },
    { label: "VAT", value: `SAR ${safeText(formData.VatTotal)}` },
    { label: "TOTAL", value: `SAR ${safeText(formData.InvoiceTotal)}` },
  ];

  summaryItems.forEach((item, i) => {
    const y = finalY + 10 + i * 10;
    doc.setFillColor(33, 91, 168);
    doc.setTextColor(255, 255, 255);
    doc.rect(120, y, 90, 10, "F");
    doc.setFontSize(12);
    doc.text(item.label, 125, y + 7);
    doc.setFontSize(14);
    doc.text(item.value, 205, y + 7, { align: "right" });
  });

  // ========== FILE EXPORT ==========
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
