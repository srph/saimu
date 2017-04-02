import React, { Component } from 'react';
import Transition from 'react-addons-css-transition-group'
import {connect} from 'react-redux'

class Toast extends Component {
  render() {
    return (
      <Transition
        component="div"
        className="toast-float"
        transitionName={{
          enter: '-enter',
          leave: '-leave'
        }}
        transitionEnterTimeout={400}
        transitionLeaveTimeout={400}>
        {this.props.notifications.map(notification =>
          <div className="item" key={notification.id}>
            {notification.message}
          </div>
        )}
      </Transition>
    );
  }
}

export default connect(state => ({
  notifications: state.toast.data
}))(Toast)