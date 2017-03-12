import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import history from 'app/history';

export default class HomeView extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Home" />

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
              <a href="#" className="pane-item -active">
                <div className="info">
                  <h4 className="title">JC Ricaro</h4>
                  <h6 className="subtitle">15,629.00 to go</h6>
                </div>
              </a>

              <a href="#" className="pane-item">
                <div className="info">
                  <h4 className="title">Brian Bodollo</h4>
                  <h6 className="subtitle">15,629.00 to go</h6>
                </div>
              </a>

              <a href="#" className="pane-item">
                <div className="info">
                  <h4 className="title">John Doe</h4>
                  <h6 className="subtitle">
                    <i className="fa fa-check" />
                    Paid Up!
                  </h6>
                </div>
              </a>
            </div>
          </aside>

          <div className="content">
            <div className="main-content-menu">
              <div className="heading">
                <h2 className="title">John Doe</h2>
                <h4 className="sub">2,739.00</h4>
              </div>

              <Link to="/create" className="button -primary -rounded">
                New Record
              </Link>
            </div>

            <div className="main-content-section">
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
                  <tr onClick={this.handleClick}>
                    <td>
                      <span className="tag-type -danger">
                        Unpaid
                      </span>
                    </td>
                    <td>
                      2,739.00
                    </td>
                    <td>
                      July 30, 2013
                    </td>
                    <td>
                      November Salary
                    </td>
                    <td>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {this.props.children}
      </div>
    );
  }

  handleClick() {
    history.push('/details');
  }
}
