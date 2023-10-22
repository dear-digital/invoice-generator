import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bank from './components/Bank';
import FromTo from './components/FromTo';
import InvoiceDetails from './components/InvoiceDetails';
import PDFGenerator from './components/PDFGenerator';
import Table from './components/Table';

function App() {
  const [invoiceData, setInvoiceData] = useState({
    subtotal:'',
    gst: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    branch: '',
    declaration: '',
    signature: '',
    fromName: '',
    fromGSTIN: '',
    fromCompany: '',
    fromPAN: '',
    fromAddress: '',
    fromContact: '',
    fromEmail: '',
    toName: '',
    toCompany: '',
    toAddress: '',
    currency: '',
    items: [
      {
        description: '',
        code: '',
        quantity: '',
        price: '',
        total: '',
      },
    ],
  });

  const handleUpdate = (data) => {
    setInvoiceData({ ...invoiceData, ...data });
  };

  const addTableItem = () => {
    const newItem = {
      description: '',
      code: '',
      quantity: '',
      price: '',
      total: '',
    };
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, newItem],
    });
  };

  const deleteTableItem = (index) => {
    const updatedItems = [...invoiceData.items];
    updatedItems.splice(index, 1);
    setInvoiceData({
      ...invoiceData,
      items: updatedItems,
    });
  };

  return (
    <div className="App">
      <Container>
        <div id="pdf-content">
          <h1 className="text-center">Invoice Generator</h1>
          <InvoiceDetails onUpdate={handleUpdate} />
          <FromTo onUpdate={handleUpdate} />
          <Table
            data={invoiceData.items}
            onUpdate={handleUpdate}
            onDelete={deleteTableItem}
          />
          <Button variant="primary" onClick={addTableItem}>
            Add Table Item
          </Button>
          <Bank onUpdate={handleUpdate} />
        </div>
        <PDFGenerator invoiceData={invoiceData} />
      </Container>
    </div>
  );
}

export default App;
