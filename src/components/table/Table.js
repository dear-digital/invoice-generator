import React from 'react';

import './Table.css';

class Table extends React.PureComponent {
    
  getRowList = () => {
    const rows = localStorage.getItem('rows');
    if (rows) {
      try {
        return JSON.parse(rows);
      } catch (err) {
        console.error(err);
        return [];
      }
    }
    return [];
  }

  state = {
    rows: this.getRowList(),
    showGenerateRowsModal: false,
    tax: parseFloat(localStorage.getItem('tax')) || 5
  }

  onChangeRowName = (event, aKey) => {
    const rows = this.state.rows.map((row) => {
      if (row.key === aKey) {
        return {
          ...row,
          name: event.currentTarget.textContent
        }
      }
      return row;
    });
    this.updateRows(rows);
  }

  onChangeRowHours = (event, aKey) => {
    const rows = this.state.rows.map((row) => {
      if (row.key === aKey) {
        return {
          ...row,
          hours: parseInt(event.currentTarget.textContent)
        }
      }
      return row;
    });
    this.updateRows(rows);
  }

  onChangeRowPrice = (event, aKey) => {
    const rows = this.state.rows.map((row) => {
      if (row.key === aKey) {
        return {
          ...row,
          price: parseFloat(event.currentTarget.textContent)
        }
      }
      return row;
    });
    this.updateRows(rows);
  }

  getRows = () => {
    return this.state.rows.map((row) => {
    const totalAmount = row.price*row.hours;
    const currencySymbol = this.getCurrencySymbol();
      return (
        <tr className={row.key}>
          <td>
            <span
              contentEditable
              onBlur={(e) => this.onChangeRowName(e, row.key)}
            >{row.name}</span>
            <div className='controls'>
              <button
                className='right'
                onClick={() => this.removeRow(row.key)}>x</button>
            </div>
          </td>
          <td>
          <span
              contentEditable
              onBlur={(e) => this.onChangeRowHours(e, row.key)}
            >
              {row.hours}  
            </span>
          </td>
          <td>
            {currencySymbol}
            <span
              contentEditable
              onBlur={(e) => this.onChangeRowPrice(e, row.key)}
            >
              {row.price}  
            </span>
          </td>
          <td>
            {currencySymbol} {totalAmount}
          </td>
        </tr>
      );
    });
  }

  addRow = () => {
    const rows = [
      ...this.state.rows,
      {
        name: 'Daily work',
        hours: 1,
        price: 10,
        key: Date.now()
      }
    ]
    this.updateRows(rows);
  }

  onChangeTax = (event) => {
    const tax = parseFloat(event.target.textContent);
    this.setState({ tax }, () => this.props.onUpdateState()); // Update state and call onUpdateState
    localStorage.setItem('tax', tax);
  }
  getTotal = () => {
    const taxAmount = this.state.tax;
    const subtotal = this.state.rows.reduce((total, row) => {
      return total + row.price * row.hours;
    }, 0);
    return subtotal + taxAmount;
  }
  
  removeRow = (aKey) => {
    const rows = this.state.rows.filter(({key}) => aKey !== key);
    this.updateRows(rows);
  }

  removeRows = () => {
    this.updateRows([]);
  }

  toggleGenerateRowsModal = () => {
    this.setState({
      showGenerateRowsModal: !this.state.showGenerateRowsModal
    });
  }

  hideGenerateRowsModal = () => {
    this.setState({
      showGenerateRowsModal: false
    });
  }

  onGenerateRows = (rows) => {
    this.updateRows([
      ...this.state.rows,
      ...rows
    ]);
  }

  updateRows = (rows) => {
    this.setState({ rows });
    localStorage.setItem('rows', JSON.stringify(rows));
    this.props.onUpdateState();
  }
  changeCurrency = (event) => {
    const newCurrency = event.target.value;
    this.setState({ currency: newCurrency });
  }


  getCurrencySymbol = () => {
    const { currency } = this.state;
    switch (currency) {
      case 'USD':
        return '$';
      case 'GBP':
        return '£';
      case 'INR':
        return '₹'
      default:
        return '€';
    }
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Hours</th>
              <th>Amount</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {this.getRows()}
          </tbody>
        </table>
        <div className='add-row-table-controls'>
          <button
            className='left'
            onClick={this.addRow}>Add row</button>
        </div>
        {this.state.rows.length > 0 && (
          <div className='right-table-controls'>
            <button
              className='right'
              onClick={this.removeRows}
            >Remove rows</button>
          </div>
        )}
        <select value={this.state.currency} onChange={this.changeCurrency}>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
        </select>
        <p>
          <span>Tax: </span>
          <span
            contentEditable
            onBlur={this.onChangeTax}
          >
            {this.state.tax}
          </span>%
        </p>
        <p className='total'>
          <span>Total: </span>
          <span className='total-number'>{this.getCurrencySymbol()}{this.getTotal()}</span>
        </p>
      </div>
    );
  }
}

export default Table;


