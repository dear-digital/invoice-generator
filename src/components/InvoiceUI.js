import React, { useState, useEffect } from "react";
import '../App.css'
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
  Divider,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const InvoiceUI = () => {
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

 


  return (
    <Container maxW="1000px">
      <Heading
        as="h1"
        size="xl"
        textAlign="center"
        style={{ padding: "50px 10px 10px 10px" }}
        className="print-hidden"
      >
        Invoice Generator
      </Heading>

      <Heading
        as="h2"
        size="lg"
        textAlign="left"
        style={{ textTransform: "uppercase" }}
        className="print-element"
      >
        Invoice
      </Heading>

      <Divider style={{ margin: "20px 0" }} />
      <form>
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
          <FormControl id="billingPeriod" w="300px">
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

        <Divider style={{ margin: "20px 0" }} />

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
              <span style={{ margin: "0 5px 0 8px" }}>{formData.currency}</span>

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

              <Tooltip label="Remove this Service" className="print-hidden">
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

        <div style={{ marginTop: "20px" }} className="print-hidden">
          <Button
            onClick={addService}
            isDisabled={isAddServiceButtonDisabled()}
          >
            Add Service
          </Button>
        </div>

        <Divider style={{ margin: "20px 0" }} />

        <div style={{ marginTop: "20px" }} className="print-hidden">
          
              <Checkbox
                spacing="0.5rem"
                size="md"
                name="customDataSaving"
                onChange={handleChange}
                isChecked={formData.customDataSaving}
              >
                <Text fontWeight="bold" fontSize="md">
                  
                    Save Data for Future Use
                 
                </Text>
              </Checkbox>
            
        </div>

        <div
          style={{ width: "350px", margin: "20px 0 auto auto" }}
          className="print-media"
        >
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
                <Tr>
                  <Th fontSize="15px">Total Amount</Th>
                  <Th isNumeric fontSize="15px">
                    {formData.currency} {totalAmount}
                  </Th>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </div>

        <div
          style={{ margin: "0 auto", width: "fit-content" }}
          className="print-hidden"
        >
          <div style={{ marginTop: "20px" }}>
            <Button onClick={() => window.print()}>Print Invoice</Button>
          </div>
        </div>
      </form>
      <Heading
        as="h3"
        size="sm"
        textAlign="left"
        style={{ textTransform: "uppercase" }}
        className="print-element"
      >
        <Box position="relative" padding="10">
          <Divider />
          <AbsoluteCenter bg="white" px="4">
            Thank You
          </AbsoluteCenter>
        </Box>
      </Heading>
      <div style={{ margin: "80px" }}></div>
    </Container>
  );
};

export default InvoiceUI;
