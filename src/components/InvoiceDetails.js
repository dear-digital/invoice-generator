import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InvoiceDetails = ({ onUpdate }) => {
  const [invoiceNo, setInvoiceNo] = useState('INV1');
  const [date, setDate] = useState(new Date('2023-10-01'));
  const [billingPeriod, setBillingPeriod] = useState(new Date('2023-09-01'));

  const handleInputChange = (name, value) => {
    onUpdate({ invoiceNo, date, billingPeriod});
  };

  return (
    <div>
      <h3>Invoice Details</h3>
      <TextField
        label="Invoice No"
        variant="outlined"
        fullWidth
        value={invoiceNo}
        onChange={(e) => {
          setInvoiceNo(e.target.value);
          handleInputChange('invoiceNo', e.target.value);
        }}
      />
      <div>
        <label>Date</label>
        <DatePicker
          selected={date}
          onChange={(newDate) => {
            setDate(newDate);
            onUpdate({ invoiceNo, date: newDate, billingPeriod});
          }}
        />
      </div>
      <div>
        <label>Billing Period</label>
        <DatePicker
          selected={billingPeriod}
          onChange={(newDate) => {
            setBillingPeriod(newDate);
            onUpdate({ invoiceNo, date, billingPeriod: newDate });
          }}
        />
      </div>
    </div>
  );
};

export default InvoiceDetails;
