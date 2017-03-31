import React, {Component} from 'react'
import tinytime from 'tinytime'

class Create extends Component {
  state = {
    amount: 0,
    note: ''
  }

  render() {
    return (
      <tr>
        <td>
          <input value={this.state.amount}
            onChange={this.handleChange('amount')}
            placeholder="800"
            type="number"
            className="form-input" />
        </td>
        <td>
          {tinytime('{MMMM} {DD}').render(new Date())}
        </td>
        <td>
          <input value={this.state.note}
            onChange={this.handleChange('note')}
            placeholder="Any reminders?"
            type="text"
            className="form-input" />
        </td>
        <td width="40">
          <button type="button"
            className="plain-button u-text-success"
            onClick={this.handleSubmit}>
            <i className="fa fa-check" />
          </button>
        </td>
      </tr>
    )
  }

  handleSubmit = evt => {
    evt.preventDefault()
    this.props.onCreate(this.state)
  }

  handleChange = field => {
    return evt => {
      this.setState({
        [field]: evt.target.value
      })
    }
  }
}

export default Create
