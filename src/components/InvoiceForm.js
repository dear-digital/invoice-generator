import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import {
  Container,
  Heading,
  Button,
  Input,
  Textarea,
  Checkbox,
} from "@chakra-ui/react";

const InvoiceForm = () => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("invoiceFormData");
    const parsedData = savedData ? JSON.parse(savedData) : null;

    return {
      invoiceNo: parsedData ? parsedData.invoiceNo : "",
      date: parsedData ? parsedData.date : "",
      billingPeriod: parsedData ? parsedData.billingPeriod : "",
      from: parsedData ? parsedData.from : "",
      to: parsedData ? parsedData.to : "",
      services: parsedData ? parsedData.services : "",
      customDataSaving: parsedData ? parsedData.customDataSaving : formData.customDataSaving,
    };
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    //console.log(value);

    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
    console.log(formData.customDataSaving);
    // Update local storage here for all fields when any field is edited
    
  };

  useEffect(() => {
    if (formData.customDataSaving) {
      try {
        localStorage.setItem("invoiceFormData", JSON.stringify(formData));
      } catch (error) {
        console.error("Error saving data:", error);
      }
    }
    else {
      formData.customDataSaving = false;
    }
  }, [formData]);

  useEffect(() => {

    // Set the "Save data for future use" checkbox based on the stored data
    const savedData = localStorage.getItem("invoiceFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
    }
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF(formData);
  };

  const generatePDF = (formData) => {
    const doc = new jsPDF();
    doc.text("Invoice Details", 10, 10);
    doc.text(`Invoice No: ${formData.invoiceNo}`, 10, 20);
    doc.text(`Date: ${formData.date}`, 10, 30);
    doc.text(`Billing Period: ${formData.billingPeriod}`, 10, 40);
    doc.text(`From: ${formData.from}`, 10, 50);
    doc.text(`To: ${formData.to}`, 10, 60);
    doc.text(`Services: ${formData.services}`, 10, 70);
    // // Add more text and formatting for the PDF
    doc.save("invoice.pdf");
  };

  return (
    <Container>
      <Heading as="h1" size="xl" textAlign="center">
        Invoice Generator
      </Heading>
      <form onSubmit={handleSubmit}>
        <Input
          name="invoiceNo"
          placeholder="Invoice No"
          onChange={handleChange}
          value={formData.invoiceNo}
        />
        <Input
          name="date"
          placeholder="Date"
          onChange={handleChange}
          value={formData.date}
        />
        <Input
          name="billingPeriod"
          placeholder="Billing Period"
          onChange={handleChange}
          value={formData.billingPeriod}
        />
        <Input
          name="from"
          placeholder="From"
          onChange={handleChange}
          value={formData.from}
        />
        <Input
          name="to"
          placeholder="To"
          onChange={handleChange}
          value={formData.to}
        />
        <Textarea
          name="services"
          placeholder="Services"
          onChange={handleChange}
          value={formData.services}
        />
        <Checkbox
          name="customDataSaving"
          onChange={handleChange}
          isChecked={formData.customDataSaving}
        >
          Save data for future use
        </Checkbox>
        <div style={{ marginTop: "50px" }}>
          <Button type="submit">Generate Invoice</Button>
        </div>
      </form>
    </Container>
  );
};

export default InvoiceForm;
