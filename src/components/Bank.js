import React, {useState} from 'react';
import TextField from '@mui/material/TextField';

const Bank = ({ onUpdate }) => {
  const [subtotal, setSubtotal] = useState(3000); // Initial Subtotal value
  const [gst, setGST] = useState(0); // Initial GST value

  const calculateTotalAmount = () => {
    const totalAmount = subtotal + gst;
    return totalAmount;
  };

  const [bankName, setBankName] = React.useState('Your Bank Name');
  const [accountNumber, setAccountNumber] = React.useState('1234567890');
  const [ifscCode, setIFSCCode] = React.useState('ABCD1234');
  const [swiftCode, setSwiftCode] = React.useState('EFGH5678');
  const [declaration, setDeclaration] = React.useState(
    'I declare that the supply of service reported on this invoice qualifies as an export of service under Section 16(1) of the IGST Act.'
  );
  const [signature, setSignature] = React.useState('John Doe');

  const handleInputChange = (field, value) => {
    switch (field) {
      case 'subtotal':
        setSubtotal(parseFloat(value) || 0); 
        break;
      case 'gst':
        setGST(parseFloat(value) || 0); 
        break;
      case 'bankName':
        setBankName(value);
        break;
      case 'accountNumber':
        setAccountNumber(value);
        break;
      case 'ifscCode':
        setIFSCCode(value);
        break;
      case 'swiftCode':
        setSwiftCode(value);
        break;
      case 'declaration':
        setDeclaration(value);
        break;
      case 'signature':
        setSignature(value);
        break;
      default:
        break;
    }

    onUpdate({  subtotal, gst, bankName, accountNumber, ifscCode, swiftCode, declaration, signature });
  };

  return (
    <div className="bank-container">
      <TextField
        label="Subtotal"
        variant="outlined"
        fullWidth
        value={subtotal}
        onChange={(e) => handleInputChange('subtotal', e.target.value)}
      />
      <TextField
        label="GST @ 0% (Export of Service)"
        variant="outlined"
        fullWidth
        value={gst}
        onChange={(e) => handleInputChange('gst', e.target.value)}
      />
      <TextField
        label="Total Amount"
        variant="outlined"
        fullWidth
        value={calculateTotalAmount()}
        disabled
      />
      <h3>Bank Details for Payment</h3>
      <TextField
        label="Bank Name"
        variant="outlined"
        fullWidth
        value={bankName}
        onChange={(e) => handleInputChange('bankName', e.target.value)}
      />
      <TextField
        label="Account Number"
        variant="outlined"
        fullWidth
        value={accountNumber}
        onChange={(e) => handleInputChange('accountNumber', e.target.value)}
      />
      <TextField
        label="IFSC Code"
        variant="outlined"
        fullWidth
        value={ifscCode}
        onChange={(e) => handleInputChange('ifscCode', e.target.value)}
      />
      <TextField
        label="SWIFT Code"
        variant="outlined"
        fullWidth
        value={swiftCode}
        onChange={(e) => handleInputChange('swiftCode', e.target.value)}
      />
      <TextField
        label="Declaration"
        variant="outlined"
        fullWidth
        value={declaration}
        onChange={(e) => handleInputChange('declaration', e.target.value)}
      />
      <TextField
        label="Signature"
        variant="outlined"
        fullWidth
        value={signature}
        onChange={(e) => handleInputChange('signature', e.target.value)}
      />
    </div>
  );
};

export default Bank;
