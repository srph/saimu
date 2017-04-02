import React, {Component} from 'react'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'
import Modal from 'react-modal2'
import {Gateway} from 'react-gateway'
import history from 'app/history'
import {transform, getById} from 'app/store/debts/selector'
import DebtStatus from 'app/components/DebtStatus'
import Transactions from './Transactions'
import Remaining from './Remaining'

class HomeDetailsView extends Component {
  state = {
    creating: false
  }

  render() {
    const {creating} = this.state
    const {debt, debtor} = this.props

    return (
      <div>
        <Helmet title={`View Debt of ${debtor.name}`} />

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
              <Transactions transactions={debt.transactions}
                creating={creating}
                onCreate={this.handleStore} />
            </div>

            <footer className="footer">
              <div className="level-block">
                <div className="section">
                  <div className="record-status">
                    <DebtStatus debt={debt} />

                    <Remaining debt={debt} />
                  </div>
                </div>

                {!debt.isPaid && <div className="section">
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
                </div>}
              </div>
            </footer>
          </Modal>
        </Gateway>
      </div>
    );
  }

  handleCreate = () => {
    this.setState({ creating: !this.state.creating })
  }

  handleStore = data => {
    this.props.dispatch({
      type: 'transactions:create!',
      payload: {
        data,
        debtId: this.props.debt.id,
        debtorId: this.props.debtor.id
      }
    })

    this.setState({ creating: false })
  }

  handleClose = () => {
    history.push(`/d/${this.props.debtor.id}`)
  }
}

export default connect((state, props) => ({
  debt: transform(
    getById(state.debts.data, props.routeParams.debtId)
  )
}), dispatch => ({
  dispatch
}))(HomeDetailsView)