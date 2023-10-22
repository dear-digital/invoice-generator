import React from 'react';

class Bank extends React.PureComponent {
    state = {
        bankName: localStorage.getItem('bankName') || 'Your Bank Name',
        accountNumber: localStorage.getItem('accountNumber') || '1234567890',
        ifscCode: localStorage.getItem('ifscCode') || 'ABCD1234567',
        branch: localStorage.getItem('branch') || 'Branch Name',
        declaration: localStorage.getItem('declaration') || 'I declare that the supply of service reported on this invoice qualifies as an export of service under Section 16(1) of the IGST Act.',
        signature: localStorage.getItem('signature') || 'John Doe',
    }

    updateState = (key, event) => {
        const value = event.target.textContent;
        this.setState({ [key]: value });
        localStorage.setItem(key, value);
        this.props.onUpdateState();
    }

    render() {
        return (
            <div className='label-input'>
                <h3>Bank Details for Payment</h3>
                <div className='from-to'>
                    <div className='to' isRequired>
                        <b className='label'>Bank Name:</b>
                        <p
                            className='bank-name'
                            contentEditable
                            onBlur={(event) => this.updateState('bankName', event)}
                        >
                            {this.state.bankName}
                        </p>
                    </div>
                    <div className='to'>
                        <b className='label'>Account Number:</b>
                        <p
                            className='account-number'
                            contentEditable
                            onBlur={(event) => this.updateState('accountNumber', event)}
                        >
                            {this.state.accountNumber}
                        </p>
                    </div>
                    <div className='to'>
                        <b className='label'>IFSC Code:</b>
                        <p
                            className='ifsc-code'
                            contentEditable
                            onBlur={(event) => this.updateState('ifscCode', event)}
                        >
                            {this.state.ifscCode}
                        </p>
                    </div>
                    <div className='to'>
                        <b className='label'>Branch:</b>
                        <p
                            className='branch'
                            contentEditable
                            onBlur={(event) => this.updateState('branch', event)}
                        >
                            {this.state.branch}
                        </p>
                    </div>
                </div>
                <div className='declaration-section'>
                    <h3 className='label'>Declaration:</h3>
                    <p
                        className='declaration'
                        contentEditable
                        onBlur={(event) => this.updateState('declaration', event)}
                    >
                        {this.state.declaration}
                    </p>
                </div>
                <div className='signature-section'>
                    <h3 className='label'>Signature:</h3>
                    <p
                        className='signature'
                        contentEditable
                        onBlur={(event) => this.updateState('signature', event)}
                    >
                        {this.state.signature}
                    </p>
                </div>
            </div>
        );
    }
}

export default Bank;
