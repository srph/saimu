import React, {PropTypes, cloneElement} from 'react';
import {ipcRenderer as ipc} from 'electron';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import groupBy from 'lodash/groupBy';
import tinytime from 'tinytime';
import numeral from 'numeral';
import history from 'app/history';

export default class DebtorView extends React.Component {
  state = {
    debtor: this.props.debtors
      .find((debtor) => debtor.id === this.props.routeParams.id),
    debts: []
  }

  componentDidMount() {
    ipc.on('debts:get', (event, debts) => {
      this.setState({
        debts: debts.map(debt => {
          debt.created_at = new Date(debt.created_at)
          return debt
        })
      })
    })

    ipc.send('debts:get', this.state.debtor.id)
  }

  render() {
    const {debtor, debts} = this.state;

    const years = groupBy(this.state.debts, (debt) => {
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
                  <tr onClick={this.handleClick} key={i}>
                    <td>
                      <span className="tag-type -danger">
                        Unpaid
                      </span>
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
          debtor: debtor
        })}
      </div>
    );
  }

  handleClick = () => {
    history.push(`/d/${this.state.debtor.id}/details`);
  }
}
