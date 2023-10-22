import React from 'react';
import { Grid, Paper, TextField } from '@mui/material';

const FromTo = ({ onUpdate }) => {
  const [from, setFrom] = React.useState({
    name: 'John Doe',
    gstin: '12ABCD1234E1Z1',
    company: 'ABC Software Solutions',
    pan: 'AABCDE1234F',
    address: '123 Tech Street, Bangalore, India',
    contact: '+91-9876543210',
    email: 'john.doe@email.com',
  });

  const [to, setTo] = React.useState({
    name: 'Jane Smith',
    company: 'XYZ Corp',
    address: '456 Business Avenue, Brussels, Belgium',
  });

  const handleFromChange = (field, value) => {
    setFrom({ ...from, [field]: value });
    onUpdate({ from, to });
  };

  const handleToChange = (field, value) => {
    setTo({ ...to, [field]: value });
    onUpdate({ from, to });
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper elevation={3}>
            <h3>From:</h3>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={from.name}
              onChange={(e) => handleFromChange('name', e.target.value)}
            />
            <TextField
              label="GSTIN"
              variant="outlined"
              fullWidth
              value={from.gstin}
              onChange={(e) => handleFromChange('gstin', e.target.value)}
            />
            <TextField
              label="Company"
              variant="outlined"
              fullWidth
              value={from.company}
              onChange={(e) => handleFromChange('company', e.target.value)}
            />
            <TextField
              label="PAN"
              variant="outlined"
              fullWidth
              value={from.pan}
              onChange={(e) => handleFromChange('pan', e.target.value)}
            />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              value={from.address}
              onChange={(e) => handleFromChange('address', e.target.value)}
            />
            <TextField
              label="Contact"
              variant="outlined"
              fullWidth
              value={from.contact}
              onChange={(e) => handleFromChange('contact', e.target.value)}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={from.email}
              onChange={(e) => handleFromChange('email', e.target.value)}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3}>
            <h3>To:</h3>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={to.name}
              onChange={(e) => handleToChange('name', e.target.value)}
            />
            <TextField
              label="Company"
              variant="outlined"
              fullWidth
              value={to.company}
              onChange={(e) => handleToChange('company', e.target.value)}
            />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              value={to.address}
              onChange={(e) => handleToChange('address', e.target.value)}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default FromTo;
