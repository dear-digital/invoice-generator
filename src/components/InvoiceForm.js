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
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Tooltip,
  Highlight,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const InvoiceForm = () => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("invoiceFormData");
    const parsedData = savedData ? JSON.parse(savedData) : null;

    return {
      invoiceNo: parsedData ? parsedData.invoiceNo : "",
      invoiceDate: parsedData ? parsedData.invoiceDate : "",
      dueDate: parsedData ? parsedData.dueDate : "",
      billingPeriod: parsedData ? parsedData.billingPeriod : "",
      from: parsedData ? parsedData.from : "",
      to: parsedData ? parsedData.to : "",
      currency: parsedData ? parsedData.currency : "₹",
      taxRate: parsedData ? parsedData.taxRate : 0,
      services:
        parsedData && Array.isArray(parsedData.services)
          ? parsedData.services
          : [],
      customDataSaving: parsedData ? parsedData.customDataSaving : false,
    };
  });

  const [subtotal, setSubtotal] = useState("0.00");
  const [tax, setTax] = useState("0.00");
  const [totalAmount, setTotalAmount] = useState("0.00");

  useEffect(() => {
    // Calculate totals when the component mounts
    calculateTotals(formData.services);
  }, []);

  useEffect(() => {
    if (formData.customDataSaving) {
      try {
        localStorage.setItem("invoiceFormData", JSON.stringify(formData));
        calculateTotals(formData.services);
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
    calculateTotals([...formData.services]);
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

  const isServiceValid = (service) => {
    return service.description.trim() !== "" && service.amount.trim() !== "";
  };

  const isAddServiceButtonDisabled = () => {
    return formData.services.some((service) => !isServiceValid(service));
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
    const subtotal = services
      .reduce((sum, service) => sum + parseFloat(service.amount || 0), 0)
      .toFixed(2);
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
              type="date"
              name="invoiceDate"
              placeholder="Date"
              onChange={handleChange}
              value={formData.invoiceDate}
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
              type="date"
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
              <option value="₹"> Rupees (₹)</option>
              <option value="$"> Dollar ($)</option>
              <option value="€"> Euro (€)</option>
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
            <Flex key={index} align="center">
              <Input
                width="45px"
                name="serialNumber"
                isReadOnly
                value={index + 1}
                style={{ marginRight: "8px" }}
              />

              <Input
                required
                width="700px"
                name="description"
                placeholder="Service Description"
                value={service.description}
                onChange={(e) => handleServiceChange(e, index)}
              />
              <Spacer />
              <Input
                required
                width="150px"
                name="amount"
                type="number"
                placeholder="Amount"
                value={service.amount}
                onChange={(e) => handleServiceChange(e, index)}
              />
              <Spacer />

              <Tooltip label="Remove this Service">
                <IconButton
                  isRound={true}
                  colorScheme="blue"
                  aria-label="Remove"
                  size="sm"
                  icon={<CloseIcon />}
                  onClick={() => removeService(index)}
                />
              </Tooltip>
            </Flex>
          ))}
        </Stack>

        <div style={{ marginTop: "20px" }}>
          <Button
            onClick={addService}
            isDisabled={isAddServiceButtonDisabled()}
          >
            Add Service
          </Button>
        </div>

        <div style={{ marginTop: "20px" }}>
          <Card>
            <CardBody>
              <Checkbox
                spacing="0.5rem"
                size="md"
                name="customDataSaving"
                onChange={handleChange}
                isChecked={formData.customDataSaving}
              >
                <Text fontWeight="bold" fontSize="md">
                  <Highlight
                    query="Save data"
                    styles={{
                      px: "1",
                      py: "1",
                      fontWeight: "normal",
                      bg: "blue.100",
                    }}
                  >
                    Save data for future use
                  </Highlight>
                </Text>
              </Checkbox>
            </CardBody>
          </Card>
        </div>

        <div style={{ width: "350px", margin: "20px 0 auto auto" }}>
          <TableContainer>
            <Table variant="simple" size="md">
              <Tbody>
                <Tr>
                  <Td>Subtotal</Td>
                  <Td isNumeric>
                    {formData.currency} {subtotal}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Tax</Td>
                  <Td isNumeric>
                    {formData.currency} {tax}
                  </Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th fontSize="14px">Total Amount</Th>
                  <Th isNumeric fontSize="15px">
                    {formData.currency} {totalAmount}
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </div>

        <div style={{ margin: "0 auto", width: "fit-content" }}>
          <Button style={{ marginTop: "150px" }} type="submit">
            Generate Invoice
          </Button>
        </div>
      </form>

      <div style={{ margin: "100px" }}></div>
    </Container>
  );
};

export default InvoiceForm;
