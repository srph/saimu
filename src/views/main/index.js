import React from 'react';
import {GatewayProvider, GatewayDest} from 'react-gateway';

export default class Main extends React.Component {
  render() {
    return (
      <GatewayProvider>
        <div>
          {this.props.children}

          <GatewayDest name="modal" />
        </div>
      </GatewayProvider>
    );
  }
}
