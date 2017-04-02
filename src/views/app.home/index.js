import React from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class HomeView extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Select a debtor" />

        {this.props.debtors.length ? <Unselected /> : <Empty />}
      </div>
    );
  }
}

function Unselected() {
  return (
    <div className="empty-state">
      <img src="img/nerd.svg" className="symbol" />

      <h5 className="main">
        Debtor who?!
      </h5>

      <h2 className="sub">
        You haven't selected a debtor yet!
      </h2>
    </div>
  )
}

function Empty() {
  return (
    <div className="empty-state">
      <img src="img/formal.svg" className="symbol" />

      <h5 className="main">
        No debtors
      </h5>

      <h2 className="sub">
        You haven't registered a debtor yet!
      </h2>

      <div className="action">
        <Link to="/d/create" className="button -primary -rounded">
          New debtor
        </Link>
      </div>
    </div>
  )
}

export default connect(state => ({
  debtors: state.debtors.data
}))(HomeView)