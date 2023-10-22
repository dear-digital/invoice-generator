import React from 'react';
import Button from '@mui/material/Button';

const PdfGenerator = ({ invoiceData }) => {
  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => window.print()}>
        Generate PDF
      </Button>
    </div>
  );
};

export default PdfGenerator;
