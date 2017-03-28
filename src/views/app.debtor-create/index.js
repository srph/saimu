import React, { Component } from 'react';
import {ipcRenderer as ipc} from 'electron';

export default class DebtorCreateView extends Component {
  state = {
    name: ''
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="main-content-menu">
            <div className="heading">
              <input value={this.state.name}
                onChange={this.handleChange}
                type="text"
                className="input"
                placeholder="Enter name" />
              <h4 className="sub">0,0.00</h4>
            </div>

            <button className="button -primary -rounded">
              New Debtor
            </button>
          </div>
        </form>
      </div>
    );
  }

  handleChange = (evt) => {
    this.setState({ name: evt.target.value })
  }

  handleSubmit = (evt) => {
    evt.preventDefault()

    if (!this.state.name) {
      return
    }

    ipc.once('debtors:create', (event, data) => {
      this.props.onCreateDebtor(data)
    })

    ipc.send('debtors:create', {
      name: this.state.name
    })
  }
}
