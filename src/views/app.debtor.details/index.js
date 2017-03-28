import React, {Component} from 'react';
import Helmet from 'react-helmet';
import Modal from 'react-modal2';
import {Gateway} from 'react-gateway';
import tinytime from 'tinytime';
import numeral from 'numeral';
import history from 'app/history';
import DebtStatus from 'app/components/DebtStatus';

export default class HomeDetailsView extends Component {
  state = {
    debt: this.props.debts
      .find((debt) => debt.id === this.props.routeParams.debtId)
  }

  render() {
    const {debt} = this.state;

    return (
      <div>
        <Helmet title="View Record" />

        <Gateway into="modal">
          <Modal onClose={this.handleClose}
            backdropClassName="modal-block"
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
                  </tr>
                </thead>

                <tbody>
                  {debt.transactions.map((transaction, i) =>
                    <tr key={i}>
                      <td>{transaction.amount}</td>
                      <td>{tinytime('{MMMM} {DD}').render(transaction.created_at)}</td>
                      <td>{transaction.note}</td>
                    </tr>
                  )}
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
                  <button className="button -primary -rounded -small">
                    New Transaction
                  </button>
                </div>
              </div>
            </footer>
          </Modal>
        </Gateway>
      </div>
    );
  }

  handleClose = () => {
    history.push(`/d/${this.props.debtor.id}`)
  }
}

function Remaining({debt}) {
  const paid = debt.transactions
    .map(transaction => transaction.amount)
    .reduce((prev, next) => prev + next, 0)

  if (!debt.transactions.length || paid >= debt.amount) {
    return null;
  }

  return <span className="info">
    {numeral(paid).format('0,0')}&nbsp;
    <span className="highlight">Out Of</span>&nbsp;
    {numeral(debt.amount).format('0,0')}
  </span>
}
