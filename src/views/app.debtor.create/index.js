import React, {Component} from 'react';
import Helmet from 'react-helmet';
import Modal from 'react-modal2';
import {Gateway} from 'react-gateway';
import history from 'app/history';

export default class HomeCreateView extends Component {
  render() {
    return (
      <div>
        <Helmet title="New Record for John Doe" />

        <Gateway into="modal">
          <Modal onClose={this.handleClose}
            backdropClassName="modal-block"
            modalClassName="modal">
            <div className="heading">
              <span>Create New Record</span>
              <button className="close" tabIndex="-1" onClick={this.handleClose}>
                <i className="fa fa-close" />
              </button>
            </div>

            <div className="body">
              <div className="grid-row">
                <div className="column u-size-6">
                  <div className="form-group">
                    <label>Amount</label>
                    <input type="text" className="form-input" placeholder="23,253.00" />
                  </div>
                </div>

                <div className="column u-size-6">
                  <div className="form-group">
                    <label>Note</label>
                    <input type="text" className="form-input" placeholder="Any reminders?" />
                  </div>
                </div>
              </div>
            </div>

            <footer className="footer">
              <div className="u-clearfix">
                <button className="button -primary -rounded -small u-pull-right">
                  New Record
                </button>
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
