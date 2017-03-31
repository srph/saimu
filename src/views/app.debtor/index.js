import React, {PropTypes, cloneElement} from 'react';
import {ipcRenderer as ipc} from 'electron';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import groupBy from 'lodash/groupBy';
import tinytime from 'tinytime';
import numeral from 'numeral';
import history from 'app/history';
import Status from 'app/components/DebtStatus';

export default class DebtorView extends React.Component {
  state = {
    debtor: {},
    debts: [],
    resolved: false
  }

  componentDidMount() {
    this.fetch()
  }

  componentWillReceiveProps(nextProps) {
    this.fetch(nextProps)
  }

  render() {
    const {debtor, debts, resolved} = this.state;

    if (!resolved) {
      return <div />
    }

    const years = groupBy(debts, (debt) => {
      return debt.created_at.getFullYear()
    })

    return (
      <div>
        <Helmet title={`${debtor.name}'s Debts`} />

        <div className="main-content-menu">
          <div className="heading">
            <h2 className="title">{debtor.name}</h2>
            <h4 className="sub">2,739.00</h4>
          </div>

          <Link to={`/d/${debtor.id}/create`} className="button -primary -rounded">
            New Record
          </Link>
        </div>


        {Object.keys(years).map((year, i) =>
          <div className="main-content-section" key={i}>
            <h4 className="heading">
              2017
            </h4>

            <table className="table -clickable">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Date Added</th>
                  <th>Note</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>

              <tbody>
                {years[year].map((debt, i) =>
                  <tr onClick={this.handleClick(debt.id)} key={i}>
                    <td>
                      <Status debt={debt} />
                    </td>
                    <td>
                      {numeral(debt.amount).format('0,0,00')}
                    </td>
                    <td>
                      {tinytime('{MMMM} {DD}').render(debt.created_at)}
                    </td>
                    <td>
                      {debt.note}
                    </td>
                    <td>&nbsp;</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {this.props.children && cloneElement(this.props.children, {
          debtor: debtor,
          debts: debts,
          onCreate: this.handleCreate,
          onCreateTransaction: this.handleCreateTransaction
        })}
      </div>
    );
  }

  fetch = (props = this.props) => {
    const debtor = props.debtors
      .find((debtor) => debtor.id === props.routeParams.id)

    ipc.once('debts:get', (event, debts) => {
      this.setState({
        debtor,

        debts: debts.map(debt => {
          debt.created_at = new Date(debt.created_at)

          debt.transactions.forEach((transaction) => {
            transaction.created_at = new Date(transaction.created_at)
          })

          return debt
        }),

        resolved: true
      })
    })

    ipc.send('debts:get', debtor.id)
  }

  handleClick = (id) => {
    return () => {
      history.push(`/d/${this.state.debtor.id}/${id}/details`)
    }
  }

  handleCreate = (data) => {
    ipc.on('debts:create', (event, debt) => {
      debt.created_at = new Date(debt.created_at)
      this.setState({ debts: [...this.state.debts, debt] })
    })

    ipc.send('debts:create', {
      ...data,
      debtor_id: this.state.debtor.id,
    })
  }

  handleCreateTransaction = (debtId, data) => {
    this.setState({
      debts: this.state.debts.map(debt => {
        if (debt.id === debtId) {
          return {
            ...debt,
            transactions: [...debt.transactions, data]
          }
        }

        return debt
      })
    })
  }
}
