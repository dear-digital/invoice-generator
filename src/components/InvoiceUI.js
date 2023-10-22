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
  Select,
  Flex,
  Spacer,
  Box,
} from "@chakra-ui/react";

const InvoiceUI = () => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("invoiceFormData");
    const parsedData = savedData ? JSON.parse(savedData) : null;

    return {
      invoiceNo: parsedData ? parsedData.invoiceNo : "",
      invoiceDate: parsedData ? parsedData.invoiceDate : "",
      billingPeriod: parsedData ? parsedData.billingPeriod : "",
      from: parsedData ? parsedData.from : "",
      to: parsedData ? parsedData.to : "",
      currency: parsedData ? parsedData.currency : "Rs",
      taxRate: parsedData ? parsedData.taxRate : 0,
      services: parsedData.services.map((service, index) => ({
        ...service,
        serialNumber: index + 1,
      }))
        ? parsedData.services
        : [],
      customDataSaving: parsedData ? parsedData.customDataSaving : false,
    };
  });

  const [subtotal, setSubtotal] = useState("0.00");
  const [tax, setTax] = useState("0.00");
  const [totalAmount, setTotalAmount] = useState("0.00");

  useEffect(() => {
    if (formData.customDataSaving) {
      try {
        localStorage.setItem("invoiceFormData", JSON.stringify(formData));
      } catch (error) {
        console.error("Error saving data:", error);
      }
    } else {
      const savedData = localStorage.getItem("invoiceFormData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // Set customDataSaving to false and keep the rest of the data
        parsedData.customDataSaving = false;
        // Save the modified data back to local storage
        localStorage.setItem("invoiceFormData", JSON.stringify(parsedData));
      }
    }
  }, [formData.customDataSaving, formData]);
    
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
    /* setFormData((prevData) => ({
      ...prevData,
      services: [...prevData.services, { description: "", amount: "" }],
    })); */
      console.log(formData.services.length);
      const newService = {
        description: "",
        amount: "",
        serialNumber: formData.services.length + 1,
      };
      setFormData((prevData) => ({
        ...prevData,
        services: [...prevData.services, newService],
      }));
  };

  const removeService = (index) => {
    const updatedServices = [...formData.services];
    updatedServices.splice(index, 1);

    // Update serial numbers
    for (let i = index; i < updatedServices.length; i++) {
      updatedServices[i].serialNumber = i + 1;
    }
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
    doc.text(`Invoice Date: ${formData.invoiceDate}`, 10, 30);
    doc.text(`Billing Period: ${formData.billingPeriod}`, 10, 40);
    doc.text(`From: ${formData.from}`, 10, 50);
    doc.text(`To: ${formData.to}`, 10, 60);
    doc.text(`Currency: ${formData.currency}`, 10, 70);
    doc.text(`Tax Rate: ${formData.taxRate}%`, 10, 80);


    doc.save("invoice.pdf");
  };

  return (
    <Container maxW="1000px">
      <Heading
        as="h1"
        size="xl"
        textAlign="center"
        style={{ padding: "50px 10px" }}
      >
        Invoice Generator
      </Heading>
      <form onSubmit={handleSubmit}>
        <Flex style={{ paddingBottom: "20px" }}>
          <Spacer />
        </Flex>

        <Flex style={{ paddingBottom: "20px" }}>
          <FormControl id="from" w="300px">
            <FormLabel>From</FormLabel>
            <Input
              name="from"
              placeholder="From"
              onChange={handleChange}
              value={formData.from}
            />
          </FormControl>
          <Spacer />
          <FormControl id="invoiceNo" isRequired w="300px">
            <FormLabel>Invoice No</FormLabel>
            <Input
              name="invoiceNo"
              placeholder="Invoice No"
              onChange={handleChange}
              value={formData.invoiceNo}
            />
          </FormControl>
        </Flex>

        <Flex style={{ paddingBottom: "20px" }}>
          <FormControl id="to" w="300px">
            <FormLabel>To</FormLabel>
            <Input
              name="to"
              placeholder="To"
              onChange={handleChange}
              value={formData.to}
            />
          </FormControl>
          <Spacer />
          <FormControl id="invoiceDate" w="300px">
            <FormLabel>Invoice Date</FormLabel>
            <Input
              name="invoiceDate"
              placeholder="Date"
              onChange={handleChange}
              value={formData.date}
            />
          </FormControl>
        </Flex>
        <Flex style={{ paddingBottom: "20px" }}>
          <FormControl id="billingPeriod" w="200px">
            <FormLabel>Billing Period</FormLabel>
            <Input
              name="billingPeriod"
              placeholder="Billing Period"
              onChange={handleChange}
              value={formData.billingPeriod}
            />
          </FormControl>
          <Spacer />
          <FormControl id="dueDate" w="300px">
            <FormLabel>Due Date</FormLabel>
            <Input
              name="dueDate"
              placeholder="Date"
              onChange={handleChange}
              value={formData.dueDate}
            />
          </FormControl>
        </Flex>

        <Flex style={{ paddingBottom: "20px" }}>
          <FormControl id="currency" w="300px">
            <FormLabel>Currency</FormLabel>
            <Select
              name="currency"
              placeholder="Select Currency"
              onChange={handleChange}
              value={formData.currency}
            >
              <option value="Rs.">Rs.</option>
              <option value="USD">USD</option>
            </Select>
          </FormControl>
          <Spacer />
          <FormControl id="taxRate" w="300px">
            <FormLabel>Tax Rate (%)</FormLabel>
            <Input
              name="taxRate"
              type="number"
              onChange={handleChange}
              value={formData.taxRate}
            />
          </FormControl>
        </Flex>

        <FormLabel>Services</FormLabel>
        <Stack spacing={4} gap={4}>
          {formData.services.map((service, index) => (
            <Flex key={index}>
              <Input
                width="10px"
                name="serialNumber"
                value={service.serialNumber}
                isReadOnly
              />
              <span> {service.serialNumber} </span>
              <Input
                width="600px"
                name="description"
                placeholder="Service Description"
                value={service.description}
                onChange={(e) => handleServiceChange(e, index)}
              />
              <Spacer />
              <Input
                width="150px"
                name="amount"
                type="number"
                placeholder="Amount"
                value={service.amount}
                onChange={(e) => handleServiceChange(e, index)}
              />
              <Spacer />
              <Button onClick={() => removeService(index)}>Remove</Button>
            </Flex>
          ))}
        </Stack>
        <div style={{ marginTop: "20px" }}>
          <Button onClick={addService}>Add Service</Button>
        </div>

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
        <Text>
          Subtotal: {formData.currency} {subtotal}
        </Text>
        <Text>
          Tax: {formData.currency} {tax}
        </Text>
        <Text>
          Total Amount: {formData.currency} {totalAmount}
        </Text>
      </div>
    </Container>
  );
};

export default InvoiceUI;
