import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import {
  Container,
  Heading,
  Button,
  Input,
  Textarea,
  Checkbox,
  FormControl,
  FormLabel,
  FormHelperText,
  Stack,
  Text,
} from "@chakra-ui/react";

const InvoiceUI = () => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("invoiceFormData");
    const parsedData = savedData ? JSON.parse(savedData) : null;

    return {
      invoiceNo: parsedData ? parsedData.invoiceNo : "",
      date: parsedData ? parsedData.date : "",
      billingPeriod: parsedData ? parsedData.billingPeriod : "",
      from: parsedData ? parsedData.from : "",
      to: parsedData ? parsedData.to : "",
      currency: parsedData ? parsedData.currency : "USD",
      taxRate: parsedData ? parsedData.taxRate : 0,
      services: parsedData && Array.isArray(parsedData.services) ? parsedData.services : [],
      customDataSaving: parsedData ? parsedData.customDataSaving : false,
    };
  });

  const [subtotal, setSubtotal] = useState("0.00");
  const [tax, setTax] = useState("0.00");
  const [totalAmount, setTotalAmount] = useState("0.00");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const updatedServices = [...formData.services];
    updatedServices[index][name] = value;

    setFormData((prevData) => ({
      ...prevData,
      services: updatedServices,
    }));
    calculateTotals(updatedServices);
  };

  const addService = () => {
    setFormData((prevData) => ({
      ...prevData,
      services: [...prevData.services, { description: "", amount: "" }],
    }));
  };

  const removeService = (index) => {
    const updatedServices = [...formData.services];
    updatedServices.splice(index, 1);

    setFormData((prevData) => ({
      ...prevData,
      services: updatedServices,
    }));
    calculateTotals(updatedServices);
  };

  const calculateTotals = (services) => {
    const subtotal = services.reduce(
      (sum, service) => sum + parseFloat(service.amount || 0),
      0
    ).toFixed(2);
    const taxRate = parseFloat(formData.taxRate) / 100;
    const tax = (subtotal * taxRate).toFixed(2);
    const totalAmount = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);

    setSubtotal(subtotal);
    setTax(tax);
    setTotalAmount(totalAmount);
  };

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
    doc.text(`Currency: ${formData.currency}`, 10, 70);
    doc.text(`Tax Rate: ${formData.taxRate}%`, 10, 80);


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
        <FormControl id="currency">
          <FormLabel>Currency</FormLabel>
          <Input
            name="currency"
            onChange={handleChange}
            value={formData.currency}
          />
        </FormControl>
        <FormControl id="taxRate">
          <FormLabel>Tax Rate (%)</FormLabel>
          <Input
            name="taxRate"
            type="number"
            onChange={handleChange}
            value={formData.taxRate}
          />
        </FormControl>

        <Stack spacing={4}>
          {formData.services.map((service, index) => (
            <div key={index}>
              <Input
                name="description"
                placeholder="Service Description"
                value={service.description}
                onChange={(e) => handleServiceChange(e, index)}
              />
              <Input
                name="amount"
                type="number"
                placeholder="Amount"
                value={service.amount}
                onChange={(e) => handleServiceChange(e, index)}
              />
              <Button onClick={() => removeService(index)}>
                Remove Service
              </Button>
            </div>
          ))}
        </Stack>

        <Button onClick={addService}>Add Service</Button>

        <div style={{ marginTop: "20px" }}>
          <Checkbox
            name="customDataSaving"
            onChange={handleChange}
            isChecked={formData.customDataSaving}
          >
            Save data for future use
          </Checkbox>
        </div>

        <div style={{ marginTop: "20px" }}>
          <Button type="submit">Generate Invoice</Button>
        </div>
      </form>

      <div>
        <Text>Subtotal: {formData.currency} {subtotal}</Text>
        <Text>Tax: {formData.currency} {tax}</Text>
        <Text>Total Amount: {formData.currency} {totalAmount}</Text>
      </div>
    </Container>
  );
};

export default InvoiceUI;
