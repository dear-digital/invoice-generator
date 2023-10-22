import React from 'react';

import './FromTo.css'

class FromTo extends React.PureComponent {

  state = {
    fromName: localStorage.getItem('fromName') || 'Your name',
    GstIn: localStorage.getItem('GstIn') || 'Your GSTIN Number ',
    Pan: localStorage.getItem('Pan') || 'Your PAN Number',
    fromAddress: localStorage.getItem('fromAddress') || '123 Street, City, State, Country, Zip Code',
    fromTelephone: localStorage.getItem('fromTelephone') || '(+1) 123 123 1234',
    fromEmail: localStorage.getItem('fromEmail') || 'your.mail@gmail.com',
    toName: localStorage.getItem('toName') || 'Company name',
    toAddress: localStorage.getItem('toAddress') || '123 Street, City, State, Country, Zip Code',
    toTelephone: localStorage.getItem('toTelephone') || '(+1) 123 123 1234',
    toEmail: localStorage.getItem('toEmail') || 'company@gmail.com'
  }

  updateState = (key, event) => {
    const value = event.target.textContent;
    this.setState({[key]: value});
    localStorage.setItem(key, value);
    this.props.onUpdateState();
  }

  render() {
    return (
      <div className='from-to'>
        <div className='from'>
          <b>From</b>
          <p
            className='name'
            contentEditable
            onBlur={(event) => this.updateState('fromName', event)}
          >
            {this.state.fromName}
          </p>
          {/* <div className='label-input'>
            <b className='label'>GSTIN:</b> */}
            <p
              className='gstin'
              contentEditable
              onBlur={(event) => this.updateState('GstIn', event)}
            >
              {this.state.GstIn}
            </p>
            {/* <b className='label'>PAN</b> */}
          <p
            className='pan'
            contentEditable
            onBlur={(event) => this.updateState('Pan', event)}
          >

          {this.state.Pan}
          </p>
          {/* </div> */}
          <p
            className='address'
            contentEditable
            onBlur={(event) => this.updateState('fromAddress', event)}
          >
            {this.state.fromAddress}
          </p>
          <p
            className='telephone'
            contentEditable
            onBlur={(event) => this.updateState('fromTelephone', event)}
          >
            {this.state.fromTelephone}
          </p>
          <p
            className='email'
            contentEditable
            onBlur={(event) => this.updateState('fromEmail', event)}
          >
            {this.state.fromEmail}
          </p>
        </div>
        <div className='to'>
          <b>To</b>
          <p
            className='name'
            contentEditable
            onBlur={(event) => this.updateState('toName', event)}
          >
            {this.state.toName}
          </p>
          <p
            className='address'
            contentEditable
            onBlur={(event) => this.updateState('toAddress', event)}
          >
            {this.state.toAddress}
          </p>
          <p
            className='telephone'
            contentEditable
            onBlur={(event) => this.updateState('toTelephone', event)}
          >
            {this.state.toTelephone}
          </p>
          <p
            className='email'
            contentEditable
            onBlur={(event) => this.updateState('toEmail', event)}
          >
            {this.state.toEmail}
          </p>
        </div>
      </div>
    );
  }
}

export default FromTo;