
import axios from 'axios';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AppRoutes } from '../../constants/AppRoutes';
import { toast } from 'react-toastify';

export const handlePdfSave = (formData, buttonType, status,setwhatsappLoading) => {
  const doc = new jsPDF();
  const safeText = (val) => String(val ?? "");
  const shipmentStatus = status || 'Ship?ment in Godown';

  const formatDate = (dateStr) => {
    const [y, m, d] = (dateStr || '').split('-');
    return d && m && y ? `${d}/${m}/${y}` : '';
  };

  // ==== HEADER ====
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  const companyLines = doc.splitTextToSize("ABCD â€“ CARGO SERVICES", 60);
  const addressLines = doc.splitTextToSize("Your Business Address", 60);

  const companyY = 15;
  const addressY = companyY + companyLines.length * 6;
  const footerY = addressY + addressLines.length * 6;
  const rightColumnBottom = footerY + 18;

  const invoiceInfoY = 28;
  const leftColumnBottom = invoiceInfoY + 24;

  const headerHeight = Math.max(50, rightColumnBottom, leftColumnBottom);

  doc.setFillColor(33, 91, 168);
  doc.rect(0, 0, 210, headerHeight, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Invoice", 15, companyY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Invoice #: ${safeText(formData.InvoiceNo)}`, 15, companyY + 6);
  doc.text(`Booking Date: ${formatDate(formData.BookingDate)}`, 15, companyY + 12);
  doc.text(`Tracking Id: ${safeText(formData.BiltyNo)}`, 15, companyY + 18);
  doc.text(`City: ${formData.SenderArea}`, 15, companyY + 24);
  doc.text(`Branch: ${formData.Branch}`, 15, companyY + 30);

  doc.setFontSize(12);
  companyLines.forEach((line, i) => doc.text(line, 120, companyY + i * 6));
  addressLines.forEach((line, i) => doc.text(line, 120, addressY + i * 6));

  doc.text("City", 120, footerY);
  doc.text("Saudi Arabia", 120, footerY + 6);
  doc.text("75311", 120, footerY + 12);

  // ==== BODY START ====
  const bodyStartY = headerHeight + 10;

  // Sender and Receiver
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("SENDER DETAILS:", 15, bodyStartY);
  doc.setFont("helvetica", "normal");
  const senderLines = [
    `Name: ${safeText(formData.SenderName)}`,
    `ID: ${safeText(formData.SenderIdNumber)}`,
    `Mobile: ${safeText(formData.SenderMobile)}`,
    `Address: ${safeText(formData.SenderAddress)}`,
    `City: ${safeText(formData.SenderArea)}`,
  ];
// let currentY = bodyStartY + 5;

// senderLines.forEach((line) => {
//   const wrappedText = doc.splitTextToSize(line, 80); // 80 = max width
//   doc.text(wrappedText, 15, currentY);
//   currentY += wrappedText.length * 5; // move Y based on how many lines wrapped
// });

let currentY = bodyStartY + 5;

senderLines.forEach((line) => {
  const wrappedText = doc.splitTextToSize(line, 80); // wrap line to array

  if (line.startsWith("Address:")) {
    // First line x = 15
    doc.text(wrappedText[0], 15, currentY);
    currentY += 5;

    // Remaining lines x = 30
    for (let i = 1; i < wrappedText.length; i++) {
      doc.text(wrappedText[i], 33, currentY);
      currentY += 5;
    }
  } else {
    // For all other lines
    doc.text(wrappedText, 15, currentY);
    currentY += wrappedText.length * 5;
  }
});

  doc.setFont("helvetica", "bold");
  // doc.text("RECEIVER DETAILS:", 130, bodyStartY);
  doc.text("RECEIVER DETAILS:", 120, bodyStartY);
  doc.setFont("helvetica", "normal");
  const receiverLines = [
    `Name: ${safeText(formData.ReceiverName)}`,
    `Mobile 1: ${safeText(formData.ReceiverMobile1)}`,
    `Mobile 2: ${safeText(formData.ReceiverMobile2)}`,
    `Address: ${safeText(formData.ReceiverAddress)}`,
    `City: ${safeText(formData.ReceiverArea)}`,
  ];
  let currentRY = bodyStartY + 5;

  receiverLines.forEach((line) => {
    const wrappedText = doc.splitTextToSize(line, 80); // wrap line to array

    if (line.startsWith("Address:")) {
      // First line x = 15
      doc.text(wrappedText[0], 120, currentRY);
      currentRY += 5;

      // Remaining lines x = 30
      for (let i = 1; i < wrappedText.length; i++) {
        doc.text(wrappedText[i], 138, currentRY);
        currentRY += 5;
      }
    } else {
      // For all other lines
      doc.text(wrappedText, 120, currentRY);
      currentRY += wrappedText.length * 5;
    }
  });









  // let currentRY = bodyStartY + 5;
  // receiverLines.forEach((line) => {
  //   const wrappedText = doc.splitTextToSize(line, 80); // 80 = max width
  //   doc.text(wrappedText, 120, currentRY);
  //   currentRY += wrappedText.length * 5; // move Y based on how many lines wrapped
  // });








  const detailStartY = bodyStartY + Math.max(senderLines.length, receiverLines.length) * 6 + 10;

  doc.setFont("helvetica", "bold");
  doc.text(`Pieces: ${safeText(formData.NoOfPieces)}`, 15, detailStartY);
  doc.text("Item Details:", 15, detailStartY + 10);
  const itemLines = doc.splitTextToSize(safeText(formData.ItemDetails), 200);
  doc.setFont("helvetica", "normal");
  doc.text(itemLines, 15, detailStartY + 16);

  const otherDetailsY = detailStartY + 16 + itemLines.length * 6 + 6;
  doc.setFont("helvetica", "bold");
  doc.text("Other Details:", 15, otherDetailsY);
  const otherLines = doc.splitTextToSize(safeText(formData.OtherDetails), 200);
  doc.setFont("helvetica", "normal");
  doc.text(otherLines, 15, otherDetailsY + 6);

  const tableStartY = otherDetailsY + 6 + otherLines.length * 3 + 5;
  // ========== CHARGES TABLE ==========
autoTable(doc, {
  head: [["#", "CHARGES", "UNIT/RATE", "QUANTITY", "SAR TOTAL"]],
  body: Object.entries(formData.Charges || {}).map(([key, value], index) => [
    index + 1,
    safeText(key),
    `${safeText(value.unitRate)}`,
    value.qty > 0 ? `${value.qty}` : "",
    value.qty > 0 ? `${safeText(value.total)}` : "",
  ]),
  startY: tableStartY,
  theme: "grid",

  // âœ… Center align body columns
  columnStyles: {
    0: { halign: 'center' },
    1: { halign: 'left' },
    2: { halign: 'center' },
    3: { halign: 'center' },
    4: { halign: 'center' },
  },

  // âœ… Center align header text
  headStyles: {
    halign: 'center',
  }
});



  const finalY = doc.lastAutoTable?.finalY || tableStartY + 5;

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

// Calculate vertical start (2 lines Ã— 6px spacing)
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

// ========== AMOUNT IN WORDS ==========
const totalsY = finalY + 10;
  const amountHeading = "Amount in Words:";
  const amountText = safeText(formData.AmountInWords);
  const amountLines = doc.splitTextToSize(amountText, 210);
  const amountHeight = 6 + amountLines.length * 6 + 6;

  
  let amountWordsY = totalsY + summaryItems.length * 10 + 7;

  if (amountWordsY + amountHeight > doc.internal.pageSize.getHeight()) {
    doc.addPage();
    amountWordsY = 5;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(amountHeading, 15, amountWordsY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  amountLines.forEach((line, i) => {
    doc.text(line, 15, amountWordsY + 6 + i * 6);
  });
  const fileName = `booking_${safeText(formData.BiltyNo || "record")}`;

  if (buttonType === "SavePDF") {
    doc.save(`${fileName}.pdf`);
  } else if (buttonType === "Save&PRINT") {
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
  } else if (buttonType === "SendToWhatsapp") {
    const blob = doc.output("blob");
const file = new File([blob], `${fileName}.pdf`, { type: "application/pdf" });
    // console.log(file);
    
   return file
  }
};

