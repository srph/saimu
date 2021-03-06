import React, {Component} from 'react';
import Helmet from 'react-helmet';
import Modal from 'react-modal2';
import {Gateway} from 'react-gateway';
import {connect} from 'react-redux'
import history from 'app/history'
import FormGroup from 'app/components/FormGroup';

class HomeCreateView extends Component {
  state = {
    amount: '',
    note: ''
  }

  render() {
    const {debtor, errors} = this.props
    
    return (
      <div>
        <Helmet title={`New Debt for ${debtor.name}`} />

        <Gateway into="modal">
          <Modal onClose={this.handleClose}
            backdropClassName="modal-block"
            modalClassName="modal t-pop-in">
            <div className="heading">
              <span>Create New Record</span>
              <button className="close" tabIndex="-1" onClick={this.handleClose}>
                <i className="fa fa-close" />
              </button>
            </div>

            <div className="body">
              <form onSubmit={this.handleSubmit}>
                <div className="grid-row">
                  <div className="column u-size-6">
                    <FormGroup
                      label="Amount"
                      errors={errors.amount}
                      input={<input value={this.state.amount}
                        onChange={this.handleChange('amount')}
                        type="text"
                        className="form-input"
                        placeholder="23,253.00" />
                      } />
                  </div>

                  <div className="column u-size-6">
                    <FormGroup
                      label="Note"
                      input={<input value={this.state.note}
                        onChange={this.handleChange('note')}
                        type="text"
                        className="form-input"
                        placeholder="Any reminders?" />
                      } />
                  </div>
                </div>
              </form>
            </div>

            <footer className="footer">
              <div className="u-clearfix">
                <button onClick={this.handleCreate} type="button" className="button -primary -rounded -small u-pull-right">
                  New Record
                </button>
              </div>
            </footer>
          </Modal>
        </Gateway>
      </div>
    );
  }

  handleChange = (field) => {
    return (evt) => {
      this.setState({ [field]: evt.target.value })
    }
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    this.handleCreate()
  }

  handleCreate = () => {
    this.props.dispatch({
      type: 'debts:create!',
      payload: {
        data: this.state,
        debtorId: this.props.debtor.id
      }
    })
  }

  handleClose = () => {
    history.push(`/d/${this.props.debtor.id}`)
  }
}

export default connect(state => ({
  errors: state.debts.errors
}), dispatch => ({
  dispatch
}))(HomeCreateView)
