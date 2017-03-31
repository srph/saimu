import React, {Component} from 'react'
import {ipcRenderer as ipc} from 'electron';
import Helmet from 'react-helmet'
import Modal from 'react-modal2'
import {Gateway} from 'react-gateway'
import tinytime from 'tinytime'
import numeral from 'numeral'
import history from 'app/history'
import DebtStatus from 'app/components/DebtStatus'
import Remaining from './Remaining'
import Create from './Create'

export default class HomeDetailsView extends Component {
  state = {
    debt: this.get(),
    creating: false
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.routeParams.debtId === nextProps.routeParams.debtId) {
      this.setState({
        debt: this.get(nextProps),
      })
    }
  }

  render() {
    const {debt, creating} = this.state;

    return (
      <div>
        <Helmet title="View Record" />

        <Gateway into="modal">
          <Modal onClose={this.handleClose}
            backdropClassName="modal-block -medium"
            modalClassName="modal">
            <div className="heading">
              <span>View Record</span>
              <button className="close" tabIndex="-1" onClick={this.handleClose}>
                <i className="fa fa-close" />
              </button>
            </div>

            <div className="body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Amount</th>
                    <th>Date Added</th>
                    <th>Note</th>
                    <th width="40">&nbsp;</th>
                  </tr>
                </thead>

                <tbody>
                  {debt.transactions.map((transaction, i) =>
                    <tr key={i}>
                      <td>{transaction.amount}</td>
                      <td>{tinytime('{MMMM} {DD}').render(transaction.created_at)}</td>
                      <td>{transaction.note}</td>
                      <td width="40">&nbsp;</td>
                    </tr>
                  )}

                  {creating && <Create onCreate={this.handleStore} />}
                </tbody>
              </table>
            </div>

            <footer className="footer">
              <div className="level-block">
                <div className="section">
                  <div className="record-status">
                    <DebtStatus debt={debt} />

                    <Remaining debt={debt} />
                  </div>
                </div>

                <div className="section">
                  {!creating && <button type="button"
                    className="button -primary -rounded -small"
                    onClick={this.handleCreate}>
                    New Transaction
                  </button>}

                  {creating && <button type="button"
                    className="button -plain -rounded -small"
                    onClick={this.handleCreate}>
                    Cancel Transaction
                  </button>}
                </div>
              </div>
            </footer>
          </Modal>
        </Gateway>
      </div>
    );
  }

  get(props = this.props) {
    return props.debts.find((debt) => debt.id === this.props.routeParams.debtId)
  }

  handleCreate = () => {
    this.setState({ creating: !this.state.creating })
  }

  handleStore = data => {
    ipc.once('transactions:create', (event, data) => {
      data.created_at = new Date(data.created_at)
      this.props.onCreateTransaction(this.state.debt.id, data)
      this.setState({ creating: false })
    })

    ipc.send('transactions:create', {
      ...data,
      debt_id: this.state.debt.id
    })
  }

  handleClose = () => {
    history.push(`/d/${this.props.debtor.id}`)
  }
}
