import React, {PropTypes, cloneElement} from 'react';
import {connect} from 'react-redux'
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import numeral from 'numeral'
import history from 'app/history';
import {mapTransform, groupByYear, filter} from 'app/store/debts/selector'
import Debts from './Debts'
import TabFilter from './TabFilter'

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
              {debtor.remaining > 0 ? numeral(debtor.remaining).format('0,0') : null}
            </h4>
          </div>

          <Link to={`/d/${debtor.id}/create`} className="button -primary -rounded">
            New Debt
          </Link>
        </div>

        <TabFilter />

        <Debts
          debtor={debtor}
          years={years}
          filter={this.props.location.query.type}
          onClick={this.handleClick} />

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
    history.push(`/d/${this.props.debtor.id}/${id}/details`)
  }
}

export default connect((state, props) => ({
  debtor: state.debtors.data
    .find(debtor => debtor.id == props.routeParams.id),
  years: groupByYear(
    filter(mapTransform(state.debts.data), props.location.query.type)
  ),
  resolved: state.debts.resolved
}), dispatch => ({
  dispatch
}))(DebtorView)
