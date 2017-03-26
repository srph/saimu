import React, {PropTypes} from 'react';
import {ipcRenderer as ipc} from 'electron';
import Helmet from 'react-helmet';
import {Link} from 'react-router';

export default class HomeView extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Home" />
      </div>
    );
  }
}
