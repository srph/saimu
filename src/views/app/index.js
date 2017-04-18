import React, {cloneElement} from 'react'
import Transition from 'react-addons-css-transition-group';
import Helmet from 'react-helmet'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import debounce from 'lodash/debounce'
import numeral from 'numeral'
import Toast from './Toast'

class AppView extends React.Component {
  state = {
    query: '',
    search: '',
    filter: '0'
  }

  timeout = null

  componentDidMount() {
    if (!this.props.configResolved) {
      this.props.dispatch({ type: 'config:fetch!' })
      return
    }

    this.props.dispatch({ type: 'debtors:fetch!' })
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.resolved && !nextProps.resolved) {
      this.props.dispatch({ type: 'debtors:fetch!' })
    }
  }

  render() {
    if (!this.props.resolved || !this.props.configResolved) {
      return <div />
    }

    const {query, search, filter} = this.state

    const debtors = search.length
      ? this.props.debtors.filter(debtor => {
        return ~debtor.name.toLowerCase().indexOf(search.toLowerCase())
      })
      : this.props.debtors

    const filtered = filter !== '0'
      ? debtors.filter(debtor => {
          return filter === '1'
            ? debtor.remaining === 0
            : debtor.remaining > 0
        })
      : debtors

    return (
      <div>
        <div className="main-layout">
          <aside className="menu">
            <div className="pane-heading">
              <button className="action">
                <i className="fa fa-cog" />
              </button>

              <h4 className="title">
                Uomi
              </h4>

              <Link to="/d/create" className="action">
                <i className="fa fa-plus" />
              </Link>
            </div>

            <div className="pane-search">
              <input value={query}
                onChange={this.handleSearch}
                type="text"
                className="input"
                placeholder="Search by name" />

              <select
                value={filter}
                onChange={this.handleSelect}
                className="filter"
                dir="rtl">
                <option value="0">All</option>
                <option value="1">Paid</option>
                <option value="2">Unpaid</option>
              </select>

              <button className="submit">
                <i className="fa fa-search" />
              </button>
            </div>

            <div className="inner">
              {filtered.map((debtor, i) =>
                <Link to={`/d/${debtor.id}`} className="pane-item" activeClassName="-active" key={i}>
                  <div className="info">
                    <h4 className="title">{debtor.name}</h4>
                    <h6 className="subtitle">
                      {debtor.remaining === 0
                        ? <span><i className="fa fa-check" /> Paid Up!</span>
                        : <span>{numeral(debtor.remaining).format('0,0')} to go</span>}
                    </h6>
                  </div>
                </Link>
              )}
            </div>
          </aside>

          <div className="content">
            {cloneElement(this.props.children, {
              debtors: this.state.debtors
            })}
          </div>
        </div>

        <Toast />
      </div>
    );
  }

  handleSelect = evt => {
    this.setState({ filter: evt.target.value })
  }

  handleSearch = evt => {
    this.setState({ query: evt.target.value })

    if (this.timeout) {
      clearTimeout(this.timeout)
    }

    setTimeout(() => {
      this.setState({ search: this.state.query })
    }, 600)
  }
}

export default connect(state => ({
  debtors: state.debtors.data,
  resolved: state.debtors.resolved,
  config: state.config.data,
  configResolved: state.config.resolved
}), dispatch => ({
  dispatch
}))(AppView)
