import React from 'react';
import jsPDF from 'jspdf';
import { Button } from '@mui/material';

const PDFGenerator = ({ formData }) => {
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
        doc.text('Invoice Generator', 105, 15, { align: 'center', color:"white" });

        // "From" section
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.text('From:', 10, 30);
        doc.text('Name: ' + formData.name, 20, 40);
        doc.text('Address: ' + formData.address, 20, 50);
        doc.text('Phone: ' + formData.phone, 20, 60);
        doc.text('Email: ' + formData.email, 20, 70);

        // "To" section
        doc.text('To:', 10, 90);
        doc.text('Jane Smith,', 20, 100);
        doc.text('XYZ Corp,', 20, 110);
        doc.text('456 Business Avenue, Brussels, Belgium.', 20, 120);

        // Invoice details
        doc.text("Invoice No: " + formData.invoiceNo, 150, 40);
        doc.text("Invoice Date: " + formData.invoiceDate, 150, 50);
        doc.text("Due Date: " + formData.dueDate, 150, 60);

        // Description and Total
        doc.text('Description:', 10, 140);
        doc.text(formData.description, 20, 150);

        doc.text('Total Amount: ' + formData.totalAmount, 10, 170);

        // Bank Details
        doc.text('Bank Details for Payment:', 10, 190);
        doc.text('Bank Name: ' + formData.bankName, 20, 200);
        doc.text('Account Number: ' + formData.accountNumber, 20, 210);
        doc.text('IFSC Code: ' + formData.ifscCode, 20, 220);
        doc.text('SWIFT Code: ' + formData.swiftCode, 20, 230);

        // Declaration
        doc.setFont('times', 'bold');
        doc.setFontSize(16);
        doc.text('Declaration', 10, 250);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.text('I hereby declare that the information provided in this invoice is true to the best of my knowledge.', 10, 260);

        // Signature
        doc.text('Signature:', 10, 280);
        doc.text(formData.name, 20, 290);

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
