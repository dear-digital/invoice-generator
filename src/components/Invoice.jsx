import React, { useState, useEffect } from 'react';
import { Container, TextField, Grid, Typography, MenuItem, Box, Button } from '@mui/material';
import Cookies from 'js-cookie';
import PDFGenerator from './PDFGenerator'; // Import the PDF generator component
import Checkbox from '@mui/material/Checkbox';
const InvoiceForm = () => {

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, PDF generation, and other actions here.
        // Save form data to cookies
        Object.keys(formData).forEach((key) => {
            Cookies.set(key, formData[key]);
        });
    };
    const initialFormData = {
        from: '',
        name: '',
        address: '',
        phone: '',
        email: '',
        invoiceNo: '',
        invoiceDate: '',
        amount: '',
        description: '',
        totalAmount: '',
        bankName:'',
        ifscCode:'',
        swiftCode:'',
        accountNumber:''
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
                            label="Email"
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

                        <Box
                            component="form"

                            noValidate
                            autoComplete="off" fullWidth
                        >
                            <div>
                                <TextField
                                    maxWidth
                                    id="currency-selector"
                                    select
                                    label="Select Currency"
                                    value={selectedCurrency}
                                    onChange={handleCurrencyChange}
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
                            Jane Smith
                        </Typography>
                        <Typography variant="body1">
                            XYZ Corp            </Typography>
                        <Typography variant="body1">
                            456 Business Avenue, Brussels, Belgium
                        </Typography>

                    </Grid>

                    {/* Description and Total */}
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="description"
                            label="Description"
                            variant="outlined"
                            value={formData.description}
                            onChange={handleInputChange}
                            sx={fieldPadding}
                            multiline
                        />


                        <TextField
                            fullWidth
                            name="totalAmount"
                            label="Total Amount"
                            variant="outlined"
                            value={formData.totalAmount}
                            onChange={handleInputChange}
                            sx={fieldPadding}
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
                    <Typography sx={fieldPadding} paragraph={fieldMargin}  margin={"10px"}>
                        Declaration
                    </Typography>
                    
                        
                        <Typography sx={fieldPadding} paragraph={fieldMargin} align='center'>
                        <Checkbox {...label} /> I declare that all the details filled above are correct upto my knowlegde.
                        </Typography>
                    
                    <Grid item xs={12}>
                        {/* <Button variant="contained" color="primary" type="submit" onclic>
                            Generate PDF
                        </Button>
                        <Button variant="contained" color="primary" style={{ marginLeft: '10px' }}>
                            Print PDF
                        </Button> */}
                        <PDFGenerator formData={formData} /> {/* Render the PDFGenerator component */}
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
