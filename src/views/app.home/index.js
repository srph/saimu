import React, {PropTypes} from 'react';
import {ipcRenderer as ipc} from 'electron';
import Helmet from 'react-helmet';
import {Link} from 'react-router';

export default class HomeView extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Select a debtor" />

        <div className="empty-state">
          <img src="img/nerd.svg" className="symbol" />

          <h5 className="main">
            Debtor who?!
          </h5>

          <h2 className="sub">
            You haven't selected a debtor yet!
          </h2>
        </div>
      </div>
    );
  }
}
