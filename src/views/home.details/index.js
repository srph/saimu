import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import Modal from 'react-modal2';
import {Gateway} from 'react-gateway';
import history from 'app/history';

export default class HomeDetailsView extends Component {
  render() {
    return (
      <div>
        <Helmet title="View Record" />

        <Gateway into="modal">
          <Modal onClose={this.handleClose}
            backdropClassName="modal-block"
            modalClassName="modal">
            <div className="heading">
              <span>View Record</span>
              <Link to="/" className="close" tabIndex="-1">
                <i className="fa fa-close" />
              </Link>
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
                  <tr>
                    <td>800.00</td>
                    <td>April 11, 2014</td>
                    <td>No note</td>
                  </tr>

                  <tr>
                    <td>800.00</td>
                    <td>April 11, 2014</td>
                    <td>No note</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <footer className="footer">
              <div className="level-block">
                <div className="section">
                  <div className="record-status">
                    <span className="tag-type">Partial</span>

                    <span className="info">
                      1,300.00 <span className="highlight">Out Of</span> 2,500.00
                    </span>
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

  handleClose() {
    history.push('/');
  }
}
