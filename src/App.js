import React from 'react';

import Table from './components/table/Table';
import FromTo from './components/fromto/FromTo';
import Invoice from './components/invoice/Invoice';
import Bank from './components/bank/Bank'

import printer from './assets/printer.svg';
import save from './assets/save.svg';

class App extends React.PureComponent {

  state = {
    title: localStorage.getItem('title') || 'Invoice',
    saved: 0
  }

  updateTitle = (event) => {
    const title = event.target.textContent;
    this.setState({title});
    localStorage.setItem('title', title);
    this.onUpdateState();
  }

  onUpdateState = () => {
    this.setState({saved: 0})
    setTimeout(() => {
      this.setState({
        saved: Date.now() + 2 * 1000
      })
      setTimeout(() => {
        if (Date.now() > this.state.saved) {
          this.setState({ saved: 0 })
        }
      }, 2500)
    }, 300)
  }

  render() {
    return (
      <div>
        <div className='App'>
          <div className='page'>
            <h1
              contentEditable
              onBlur={this.updateTitle}
            >
              {this.state.title}
            </h1>
            <FromTo onUpdateState={this.onUpdateState} />
            <Invoice onUpdateState={this.onUpdateState} />
            <Table onUpdateState={this.onUpdateState} />
            <Bank onUpdateState={this.onUpdateState} />
          </div>
          <img className='print' src={printer} onClick={() => window.print()} alt='print' />
        </div>
        {!!this.state.saved && (<img className='save' src={save} alt='save' />)}
      </div>
    );
  }
}

export default App;