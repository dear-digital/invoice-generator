import React from 'react';
import { Table, Button } from 'react-bootstrap';

const TableComponent = ({ data, onUpdate, onDelete }) => {
  const handleTableChange = (index, key, value) => {
    const updatedItems = [...data];
    updatedItems[index][key] = value;
    onUpdate({ items: updatedItems });
  };

  return (
    <div>
      <h3>Table</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Description</th>
            <th>HSN/SAC Code</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={item.description || 'Web Development Services'} // Default value for Description
                  onChange={(e) => handleTableChange(index, 'description', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.code || '9983XX'} // Default value for HSN/SAC Code
                  onChange={(e) => handleTableChange(index, 'code', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.quantity || '50 hrs'} // Default value for Quantity
                  onChange={(e) => handleTableChange(index, 'quantity', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.price || 'EUR 60'} // Default value for Unit Price
                  onChange={(e) => handleTableChange(index, 'price', e.target.value)}
                />
              </td>
              <td>{item.total}</td>
              <td>
                <Button variant="danger" onClick={() => onDelete(index)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
