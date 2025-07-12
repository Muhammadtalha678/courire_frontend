import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const handlePdfSave = (formData, buttonType,status) => {
  const doc = new jsPDF();
  const safeText = (val) => String(val ?? "");
  // const shipmentStatus = status === 'Shipment in Godown' ? 'Shipment in Godown' : status
  const formatDate = (dateStr) => {
    const [y, m, d] = (dateStr || "").split("-");
    return d && m && y ? `${d}/${m}/${y}` : "";
  };

// --- SETUP FOR HEADER MEASUREMENT ---
doc.setFontSize(12);
doc.setFont("helvetica", "normal");

const companyLines = doc.splitTextToSize("ABCD – CARGO SERVICES", 60);
const addressLines = doc.splitTextToSize("Your Business Address", 60);

// Coordinates for company info (right side)
const companyY = 15;
const addressY = companyY + companyLines.length * 6;
const footerY = addressY + addressLines.length * 6;
const rightColumnBottom = footerY + 18; // for "City", "Saudi Arabia", "75311"

// Coordinates for invoice info (left side)
const invoiceInfoY = 28;
const leftColumnBottom = invoiceInfoY + 18;

// --- DYNAMIC HEIGHT CALC ---
const headerHeight = Math.max(50, rightColumnBottom, leftColumnBottom);

// --- NOW DRAW BACKGROUND BOX BASED ON HEIGHT ---
doc.setFillColor(33, 91, 168);
doc.rect(0, 0, 210, headerHeight, "F");

// --- HEADER CONTENT (WHITE TEXT OVER BLUE) ---
doc.setTextColor(255, 255, 255);

// 1. Invoice title
doc.setFontSize(22);
doc.setFont("helvetica", "bold");
doc.text("Invoice", 15, 20);

// 2. Invoice Info (left)
doc.setFont("helvetica", "normal");
doc.setFontSize(10);
doc.text(`Invoice #: ${safeText(formData.InvoiceNo)}`, 15, invoiceInfoY);
doc.text(`Booking Date: ${formatDate(formData.BookingDate)}`, 15, invoiceInfoY + 6);
doc.text(`Tracking Id: ${safeText(formData.BiltyNo)}`, 15, invoiceInfoY + 12);
doc.text(`Status: ${safeText("Shipment in Container")}`, 15, invoiceInfoY + 18);

// 3. Company Name + Address (right)
doc.setFontSize(12);
companyLines.forEach((line, i) => doc.text(line, 150, companyY + i * 6));
addressLines.forEach((line, i) => doc.text(line, 150, addressY + i * 6));

doc.text("City", 150, footerY);
doc.text("Saudi Arabia", 150, footerY + 6);
doc.text("75311", 150, footerY + 12);

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
  ...doc.splitTextToSize(`City: ${safeText(formData.SenderArea)}`, 60),
  "Saudi Arabia"
];
senderLines.forEach((line, i) => {
  doc.text(line, 15, bodyStartY + 6 + i * 6);
});

// --- RECEIVER DETAILS ---
doc.setFont("helvetica", "bold");
doc.text("RECEIVER DETAILS:", 140, bodyStartY);
doc.setFont("helvetica", "normal");

const receiverLines = [
  ...doc.splitTextToSize(`Name: ${safeText(formData.ReceiverName)}`, 60),
  ...doc.splitTextToSize(`Mobile 1: ${safeText(formData.ReceiverMobile1)}`, 60),
  ...doc.splitTextToSize(`Mobile 2: ${safeText(formData.ReceiverMobile2)}`, 60),
  ...doc.splitTextToSize(`Address: ${safeText(formData.ReceiverAddress)}`, 60),
  ...doc.splitTextToSize(`City: ${safeText(formData.ReceiverArea)}`, 60),
  "Saudi Arabia"
];
receiverLines.forEach((line, i) => {
  doc.text(line, 140, bodyStartY + 6 + i * 6);
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
    `${safeText(value.unitRate)}`,
    value.qty > 0 ? `${value.qty}` : "",
    value.qty > 0 ? `${safeText(value.total)}` : "",
  ]),
  startY: tableStartY,
  theme: "grid",

  // ✅ Center align body columns
  columnStyles: {
    0: { halign: 'center' },
    1: { halign: 'center' },
    2: { halign: 'center' },
    3: { halign: 'center' },
    4: { halign: 'center' },
  },

  // ✅ Center align header text
  headStyles: {
    halign: 'center',
  }
});



  const finalY = doc.lastAutoTable?.finalY || tableStartY + 20;

const notesBoxX = 0;
const notesBoxWidth = 120;
const notesY = finalY + 10;
const boxHeight = 30;

// Draw Notes Box
doc.setFillColor(215, 234, 249);
doc.rect(notesBoxX, notesY, notesBoxWidth, boxHeight, "F");

// Set styles
doc.setTextColor(0, 0, 0);
doc.setFontSize(10);

// Text content
const notesTitle = "NOTES:";
const thankYouMsg = "Thank you for your business! If you have questions, let us know.";

// Calculate vertical start (2 lines × 6px spacing)
const totalTextHeight = 2 * 6;
const verticalStart = notesY + (boxHeight - totalTextHeight) / 2;

// Render text (LEFT aligned)
doc.text(notesTitle, notesBoxX + 10, verticalStart);         // left offset: 10
doc.text(thankYouMsg, notesBoxX + 10, verticalStart + 6);    // next line


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
