import React, { Component } from 'react'
import Helmet from 'react-helmet'
import {connect} from 'react-redux'

class DebtorCreateView extends Component {
  state = {
    name: ''
  }

  render() {
    return (
      <div className="t-pop-in">
        <Helmet title="Create New Debtor" />

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

    this.props.dispatch({ type: 'debtors:create!', payload: this.state })
  }
}

export default connect(state => state, dispatch => ({
  dispatch
}))(DebtorCreateView)
