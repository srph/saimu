import React, {PropTypes, cloneElement} from 'react';
import {connect} from 'react-redux'
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import tinytime from 'tinytime';
import numeral from 'numeral';
import history from 'app/history';
import Status from 'app/components/DebtStatus';
import {mapTransform, groupByYear} from 'app/store/debts/selector'

class DebtorView extends React.Component {
  componentDidMount() {
    this.fetch()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.routeParams.id !== nextProps.routeParams.id) {
      this.fetch(nextProps)
    }
  }

  render() {
    const {debtor, years, resolved} = this.props;

    if (!resolved) {
      return <div />
    }

    return (
      <div>
        <Helmet title={`${debtor.name}'s Debts`} />

        <div className="main-content-menu">
          <div className="heading">
            <h2 className="title">{debtor.name}</h2>
            <h4 className="sub">
              {debtor.remaining === 0
                ? <span><i className="fa fa-check u-text-success" /> Paid Up!</span>
                : numeral(debtor.remaining).format('0,0')}
            </h4>
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
                      <Status debt={debt} tooltip />
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

  fetch = (props = this.props) => {
    this.props.dispatch({
      type: 'debts:fetch!',
      payload: props.routeParams.id
    })
  }

  handleClick = (id) => {
    return () => {
      history.push(`/d/${this.props.debtor.id}/${id}/details`)
    }
  }
}

export default connect((state, props) => ({
  debtor: state.debtors.data
    .find(debtor => debtor.id == props.routeParams.id),
  years: groupByYear(mapTransform(state.debts.data)),
  resolved: state.debts.resolved
}), dispatch => ({
  dispatch
}))(DebtorView)