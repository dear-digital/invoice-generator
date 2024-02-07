import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button } from '@mui/material';

const PDFGenerator = ({ formData, services }) => {
    const generatePDF = () => {
        const doc = new jsPDF();

        // Improved background color
        doc.setFillColor("#4B4B4C"); // Professional gray
        doc.rect(0, 0, 210, 30, 'F'); // Slightly larger header

        // Standardized font settings
        doc.setFontSize(10); // Default font size
        doc.setTextColor(255, 255, 255); // White text for header

        // Improved title font and size
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.text('Invoice', 105, 20, { align: 'center' });

        // Reset text color for body
        doc.setTextColor(0, 0, 0); // Black text

        // "From" section with Helvetica font
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10); // Consistent font size
        doc.text('From:', 10, 40);
        doc.text(`Name: ${formData.name}`, 20, 50);
        doc.text(`Address: ${formData.address}`, 20, 60);
        doc.text(`Phone: ${formData.phone}`, 20, 70);
        doc.text(`Email: ${formData.email}`, 20, 80);

        // "To" section
        doc.text('To:', 10, 90);
        doc.text('Jane Smith,', 20, 100);
        doc.text('XYZ Corp,', 20, 110);
        doc.text('456 Business Avenue, Brussels, Belgium.', 20, 120);

        // Invoice details
        doc.text(`Invoice No: ${formData.invoiceNo}`, 150, 40);
        doc.text(`Invoice Date: ${formData.invoiceDate}`, 150, 50);
        doc.text(`Due Date: ${formData.dueDate}`, 150, 60);

        // Enhanced Services Table
        doc.autoTable({
            startY: 140,
            head: [['Description', 'HSN/SAC Code', 'Quantity', 'Unit Price', 'Total']],
            body: services.map(service => [service.description, service.hsnSACCode, service.quantity, service.unitPrice, service.total]),
            theme: 'grid',
            headStyles: { fillColor: '#f2f2f2' },
            margin: { horizontal: 10 },
            styles: { cellPadding: 3, fontSize: 10 },
        });

        // Total Amount
        doc.text(`Total Amount: ${formData.totalAmount}`, 150, doc.autoTable.previous.finalY + 10);

        // Bank Details
        doc.text('Bank Details for Payment:', 10, doc.autoTable.previous.finalY + 20);
        doc.text(`Bank Name: ${formData.bankName}`, 20, doc.autoTable.previous.finalY + 30);
        doc.text(`Account Number: ${formData.accountNumber}`, 20, doc.autoTable.previous.finalY + 40);
        doc.text(`IFSC Code: ${formData.ifscCode}`, 20, doc.autoTable.previous.finalY + 50);
        doc.text(`SWIFT Code: ${formData.swiftCode}`, 20, doc.autoTable.previous.finalY + 60);

        // Declaration
        doc.text('Declaration', 10, doc.autoTable.previous.finalY + 70);
        doc.text('I hereby declare that the information provided in this invoice is true to the best of my knowledge.', 10, doc.autoTable.previous.finalY + 80);

        // Signature
        doc.text('Signature:', 10, doc.autoTable.previous.finalY + 90);
        doc.line(20, doc.autoTable.previous.finalY + 95, 60, doc.autoTable.previous.finalY + 95); // Signature line
        doc.text(formData.name, 20, doc.autoTable.previous.finalY + 100);

        // Save the PDF
        doc.save('invoice.pdf');
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={generatePDF}>
                Generate PDF
            </Button>
        </div>
    );
};

export default PDFGenerator;
