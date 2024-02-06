import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import PDFGenerator from './PDFGenerator'; // Import the PDF generator component
import Checkbox from '@mui/material/Checkbox';
import {
    Container,
    TextField,
    Grid,
    Typography,
    MenuItem,
    Box,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
} from '@mui/material';

const InvoiceForm = () => {
    // const [totalAmount, setTotalAmount] = useState(0);
    const [services, setServices] = useState([
        // Sample services data structure
        {
            description: '',
            hsnSACCode: '',
            quantity: 0,
            unitPrice: 0,
            total: 0, 
        },
    ]);

    const calculateTotalAmount = () => {
        let total = 0;
        services.forEach((service) => {
            total += parseFloat(service.total || 0);
        });
        return total.toFixed(2);
    };
      

    const handleServiceInputChange = (event, index, field) => {
        const newServices = [...services];
        newServices[index][field] = event.target.value;

        // Calculate the total for the specific service
        const unitPrice = parseFloat(newServices[index].unitPrice);
        const quantity = parseFloat(newServices[index].quantity);
        if (!isNaN(unitPrice) && !isNaN(quantity)) {
            newServices[index].total = (unitPrice * quantity).toFixed(2);
        } else {
            newServices[index].total = 0;
        }

        setServices(newServices);
        
        // Calculate the total amount for all services
        const totalAmount = calculateTotalAmount();

        // Update the total amount in the formData
        setFormData((prevData) => ({ ...prevData, totalAmount }));
    };

    const addServiceRow = () => {
        setServices([...services, { description: '', hsnSACCode: '', quantity: 0, unitPrice: 0, total: 0 }]);
    };





const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, PDF generation, and other actions here.
    // Save form data to cookies
    Object.keys(formData).forEach((key) => {
        Cookies.set(key, formData[key]);
    });
};
const today = new Date();
const initialFormData = {
    from: '',
    name: '',
    address: '',
    phone: '',
    email: '',
    invoiceNo: '',
    invoiceDate: today.toISOString().split('T')[0], // Set initial invoice date to today
    amount: '',
    totalAmount: '',
    bankName: '',
    ifscCode: '',
    swiftCode: '',
    accountNumber: '',
    dueDate: '',
    total:'',
    unitPrice:'',
    quantity:'',
    description:'',
    hsnSACCode:'',
};


const handleClearForm = () => {
    // Reset the form fields to their initial values
    setFormData(initialFormData);

    // Clear the associated cookies
    Object.keys(initialFormData).forEach((key) => {
        Cookies.remove(key);
    });
};


const [formData, setFormData] = useState(initialFormData);

const fieldPadding = { padding: '8px' };
const fieldMargin = { margin: '5px' };


useEffect(() => {
    // Load saved data from cookies when the component mounts
    Object.keys(formData).forEach((key) => {
        const cookieValue = Cookies.get(key);
        if (cookieValue) {
            setFormData((prevData) => ({ ...prevData, [key]: cookieValue }));
        }
    });
}, [formData]);



const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Update the form data state
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // Update the corresponding cookie
    Cookies.set(name, value);
};


const currencies = [
    {
        value: 'USD',
        label: '$',
        name: 'US Dollar',
    },
    {
        value: 'EUR',
        label: '€',
        name: 'Euro',
    },
    {
        value: 'BTC',
        label: '฿',
        name: 'Bitcoin',
    },
    {
        value: 'JPY',
        label: '¥',
        name: 'Japanese Yen',
    },
    {
        value: 'INR',
        label: '₹',
        name: 'Indian Rupee',
    },
];
const [selectedCurrency, setSelectedCurrency] = React.useState('EUR');

const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
};
return (
    <Container maxWidth="md">
        <Typography variant="h5" gutterBottom marginTop={'20px'}>
            Invoice Details
        </Typography>
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                {/* Left side - Invoice details */}
                <Grid item xs={6}>

                    <Typography variant="h6" gutterBottom align="left">
                        From
                    </Typography>
                    <TextField
                        fullWidth
                        name="name"
                        label="Name"
                        variant="outlined"
                        value={formData.name}
                        onChange={handleInputChange}
                        sx={fieldPadding}
                    />
                    <TextField
                        fullWidth
                        name="address"
                        label="Address"
                        variant="outlined"
                        value={formData.address}
                        onChange={handleInputChange}
                        sx={fieldPadding}
                    />
                    <TextField
                        fullWidth
                        name="phone"
                        label="Phone No"
                        variant="outlined"
                        value={formData.phone}
                        onChange={handleInputChange}
                        sx={fieldPadding}
                        inputProps={{
                            maxLength: 10, // Limit to 10 digits
                            pattern: '[0-9]*', // Allow only numeric characters
                            title: 'Enter a valid phone number',
                        }}
                        error={formData.phone && formData.phone.length !== 10}
                        helperText={formData.phone && formData.phone.length !== 10 ? "Phone number must be 10 digits" : ""}
                    />

                    <TextField
                        fullWidth
                        name="email"
                        label="Email ID"
                        variant="outlined"
                        value={formData.email}
                        onChange={handleInputChange}
                        sx={fieldPadding}
                        inputProps={{
                            pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
                            title: 'Enter a valid email address',
                        }}
                        error={formData.email && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)}
                        helperText={formData.email && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email) ? "Please enter a correct Email ID" : ""}
                    />



                </Grid>

                <Grid item xs={6} marginTop={"40px"}>
                    <TextField
                        fullWidth
                        name="invoiceNo"
                        label="Invoice No"
                        variant="outlined"
                        value={formData.invoiceNo}
                        onChange={handleInputChange}
                        sx={fieldPadding}
                    />
                    <TextField
                        margin='20px'
                        fullWidth
                        id="outlined-number"
                        name="invoiceDate"
                        type="date"
                        label="Invoice Date"
                        variant="outlined"
                        value={formData.invoiceDate}
                        onChange={handleInputChange}
                        sx={fieldPadding}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        margin='20px'
                        fullWidth
                        id="outlined-number"
                        name="dueDate"
                        type="date"
                        label="Due Date"
                        variant="outlined"
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        sx={fieldPadding}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <Box
                        component="form"
                        noValidate
                        autoComplete="off" fullWidth
                    >
                        <div>
                            <TextField
                                fullWidth
                                id="currency-selector"
                                select
                                label="Select Currency"
                                value={selectedCurrency}
                                onChange={handleCurrencyChange}
                                sx={fieldPadding}
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label} - {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </Box>
                </Grid>

                {/* Right side - Bill to */}
                <Grid item xs={6} align="left">
                    <Typography variant="h6" gutterBottom>
                        To
                    </Typography>
                    <Typography variant="body1">
                        Jane Smith,
                    </Typography>
                    <Typography variant="body1">
                        XYZ Corp,
                    </Typography>
                    <Typography variant="body1">
                        456 Business Avenue, Brussels, Belgium.
                    </Typography>

                </Grid>

                {/* Description and Total */}


                {/* Services Table */}
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom align="left">
                        Services
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell>HSN/SAC Code</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Unit Price</TableCell>
                                    <TableCell>Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {services.map((service, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <TextField
                                                fullWidth
                                                multiline
                                                name="description"
                                                variant="outlined"
                                                value={service.description}
                                                onChange={(e) => handleServiceInputChange(e, index, 'description')}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                fullWidth
                                                name="hsnSACCode"
                                                variant="outlined"
                                                value={service.hsnSACCode}
                                                onChange={(e) => handleServiceInputChange(e, index, 'hsnSACCode')}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                fullWidth
                                                name="quantity"
                                                variant="outlined"
                                                value={service.quantity}
                                                onChange={(e) => handleServiceInputChange(e, index, 'quantity')}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                fullWidth
                                                name="unitPrice"
                                                variant="outlined"
                                                value={service.unitPrice}
                                                onChange={(e) => handleServiceInputChange(e, index, 'unitPrice')}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                fullWidth
                                                name="total"
                                                variant="outlined"
                                                value={service.total}
                                                disabled
                                                onChange={(e) => handleServiceInputChange(e, index, 'total')}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button variant="outlined" onClick={addServiceRow} style={{ marginTop: "20px" }}>
                        Add Service
                    </Button>
                </Grid>

                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        name="totalAmount"
                        label="Total Amount"
                        variant="outlined"
                        value={formData.totalAmount}
                        onChange={handleInputChange}
                        sx={fieldPadding}
                        disabled
                    />
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="body1" align="left" sx={fieldPadding} paragraph={fieldMargin}>
                        Bank Details
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                name="bankName"
                                label="Bank Name"
                                variant="outlined"
                                value={formData.bankName}
                                onChange={handleInputChange}
                            // sx={fieldPadding}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                name="accountNumber"
                                label="Account Number"
                                variant="outlined"
                                value={formData.accountNumber}
                                onChange={handleInputChange}
                                // sx={fieldPadding}
                                inputProps={{
                                    maxLength: 15, // Limit to 15 digits
                                }}
                                error={formData.accountNumber && formData.accountNumber.length !== 15}
                                helperText={formData.accountNumber && formData.accountNumber.length !== 15 ? "Account number must be of 15 digits" : ""}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                name="ifscCode"
                                label="IFSC Code"
                                variant="outlined"
                                value={formData.ifscCode}
                                onChange={handleInputChange}
                            // sx={fieldPadding}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                name="swiftCode"
                                label="SWIFT Code"
                                variant="outlined"
                                value={formData.swiftCode}
                                onChange={handleInputChange}
                            // sx={fieldPadding}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Typography sx={fieldPadding} paragraph={fieldMargin} margin={"10px"}>
                    Declaration
                </Typography>


                <Typography sx={fieldPadding} paragraph={fieldMargin} align='center'>
                    <Checkbox {...label} /> I hereby declare that the information provided in this invoice is true to the best of my knowledge.
                </Typography>

                <Grid item xs={12}>
                    {/* <Button variant="contained" color="primary" type="submit" onclic>
                            Generate PDF
                        </Button>
                        <Button variant="contained" color="primary" style={{ marginLeft: '10px' }}>
                            Print PDF
                        </Button> */}
                    <PDFGenerator formData={formData}  services={services} /> {/* Render the PDFGenerator component */}
                    <Button
                        variant="contained"
                        style={{ margin: '10px' }}
                        onClick={handleClearForm}
                    >
                        Clear Form
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Container>
);
};

export default InvoiceForm;

