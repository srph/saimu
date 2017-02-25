import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';

export default class HomeView extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Home" />

        <div className="main-layout">
          <aside className="menu">
            <div className="main-pane">
              <form>
                <div className="pane-search">
                  <input type="text" className="input" placeholder="Search by name" />
                  <button className="submit">
                    <i className="fa fa-search" />
                  </button>
                </div>
              </form>

              <a href="#" className="pane-item -active">
                <div className="info">
                  <h1 className="title">JC Ricaro</h1>
                  <h4 className="subtitle">15,629.00 to go</h4>
                </div>
              </a>

              <a href="#" className="pane-item">
                <div className="info">
                  <h1 className="title">Brian Bodollo</h1>
                  <h4 className="subtitle">15,629.00 to go</h4>
                </div>
              </a>

              <a href="#" className="pane-item">
                <div className="info">
                  <h1 className="title">Brian Bodollo</h1>
                  <h4 className="subtitle">
                    <i className="fa fa-check" />
                    Paid Up!
                  </h4>
                </div>
              </a>
            </div>
          </aside>

          <div className="content">
          </div>
        </div>
      </div>
    );
  }
}
