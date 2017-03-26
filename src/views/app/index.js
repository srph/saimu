import React, {cloneElement} from 'react';
import {ipcRenderer as ipc} from 'electron';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import history from 'app/history';

export default class AppView extends React.Component {
  state = {
    debtors: [],
    resolved: false
  }

  componentDidMount() {
    ipc.on('debtors:get', (event, debtors) => {
      this.setState({ debtors, resolved: true })
    })

    ipc.send('debtors:get')
  }

  render() {
    if (!this.state.resolved) {
      return <div />
    }

    return (
      <div>
        <div className="main-layout">
          <aside className="menu">
            <form>
              <div className="pane-search">
                <input type="text" className="input" placeholder="Search by name" />
                <button className="submit">
                  <i className="fa fa-search" />
                </button>
              </div>
            </form>

            <div className="main-pane">
              {this.state.debtors.map((debtor, i) =>
                <Link to={`/d/${debtor.id}`} className="pane-item -active" key={i}>
                  <div className="info">
                    <h4 className="title">{debtor.name}</h4>
                    <h6 className="subtitle">15,629.00 to go</h6>
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
      </div>
    );
  }
}