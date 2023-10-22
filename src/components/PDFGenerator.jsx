import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button } from '@mui/material';

const PDFGenerator = ({ formData, services }) => {
    const generatePDF = () => {
        const doc = new jsPDF();

        // Set background color
        doc.setFillColor("#8575ff");
        doc.rect(0, 0, 210, 25, 'F');

        // Set font size and text color
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);

        // Define the title font and size
        doc.setFont('times', 'bold');
        doc.setFontSize(20);

        // Add a title with a nice font
        doc.text('Invoice Generator', 105, 15, { align: 'center', color: "white" });

        // "From" section
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.text('From:', 10, 40);
        doc.text('Name: ' + formData.name, 20, 50);
        doc.text('Address: ' + formData.address, 20, 60);
        doc.text('Phone: ' + formData.phone, 20, 70);
        doc.text('Email: ' + formData.email, 20, 80);

        // "To" section
        doc.text('To:', 10, 90);
        doc.text('Jane Smith,', 20, 100);
        doc.text('XYZ Corp,', 20, 110);
        doc.text('456 Business Avenue, Brussels, Belgium.', 20, 120);

        // Invoice details
        doc.text("Invoice No: " + formData.invoiceNo, 150, 40);
        doc.text("Invoice Date: " + formData.invoiceDate, 150, 50);
        doc.text("Due Date: " + formData.dueDate, 150, 60);

        // Services Table
        doc.autoTable({
            startY: 130, // Start position of the table
            head: [['Description', 'HSN/SAC Code', 'Quantity', 'Unit Price', 'Total']],
            body: services.map(service => [service.description, service.hsnSACCode, service.quantity, service.unitPrice, service.total]),
        });

        // Total Amount
        doc.text('Total Amount: ' + formData.totalAmount, 150, doc.autoTable.previous.finalY + 10);

        // Bank Details
        doc.text('Bank Details for Payment:', 10, doc.autoTable.previous.finalY + 20);
        doc.text('Bank Name: ' + formData.bankName, 20, doc.autoTable.previous.finalY + 30);
        doc.text('Account Number: ' + formData.accountNumber, 20, doc.autoTable.previous.finalY + 40);
        doc.text('IFSC Code: ' + formData.ifscCode, 20, doc.autoTable.previous.finalY + 50);
        doc.text('SWIFT Code: ' + formData.swiftCode, 20, doc.autoTable.previous.finalY + 60);

        // Declaration
    
        doc.text('Declaration', 10, doc.autoTable.previous.finalY + 70);
        doc.setFont('helvetica', 'normal');
        doc.text('I hereby declare that the information provided in this invoice is true to the best of my knowledge.', 10, doc.autoTable.previous.finalY + 80);

        // Signature
        doc.text('Signature:', 10, doc.autoTable.previous.finalY + 90);
        doc.text(formData.name, 20, doc.autoTable.previous.finalY + 100);

        // Save the PDF
        doc.save('invoice.pdf');
    };

    return (
        <div>
            <Button variant="contained" color="primary" type="submit" onClick={generatePDF}>
                Generate PDF
            </Button>
        </div>
    );
};

export default PDFGenerator;
