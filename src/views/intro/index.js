import React, {Component} from 'react'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'
import DefaultView from './DefaultView'
import CustomizeView from './CustomizeView'

class IntroView extends Component {
  render() {
    const {customizing, dispatch} = this.props

    return (
      <div>
        <Helmet title="Introduction" />

        {this.props.customizing ? <CustomizeView dispatch={dispatch} /> : <DefaultView dispatch={dispatch} />}
      </div>
    );
  }
}

export default connect(state => ({
  customizing: state.config.customizing
}), dispatch => ({
  dispatch
}))(IntroView);
