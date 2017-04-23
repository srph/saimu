import React, {Component} from 'react'
import {Gateway} from 'react-gateway'
import Modal from 'react-modal2'
import {connect} from 'react-redux'
import FolderInput from 'app/components/FolderInput'

class Settings extends Component {
  state = {
    path: this.props.path
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.path !== nextProps.path) {
      this.setState({ path: nextProps.path })
    }
  }

  render() {
    return (
      <Gateway into="modal">
        {this.props.open ? <Modal onClose={this.handleClose}
          backdropClassName="modal-block -spacious"
          modalClassName="modal t-pop-in">
          <div className="heading">
            <span>Settings: Database Location</span>
            <button className="close" tabIndex="-1" onClick={this.handleClose}>
              <i className="fa fa-close" />
            </button>
          </div>

          <div className="body">
            <form onSubmit={this.handleSubmit}>
              <FolderInput
                value={this.state.path}
                onChange={this.handlePathChange}
                className="u-spacer" />
            </form>
          </div>

          <footer className="footer">
            <div className="u-clearfix">
              {this.props.path !== this.state.path ? <button onClick={this.handleClick}
                type="button"
                className="button -primary -rounded -small u-pull-right">
                Update Settings
              </button> : <span>&nbsp;</span>}
            </div>
          </footer>
        </Modal> : null}
      </Gateway>
    );
  }

  update = () => {
    this.props.dispatch({
      type: 'config:update!',
      payload: { path: this.state.path }
    })
  }

  handleClose = () => {
    this.setState({ path: this.props.path })
    this.props.onCancel()
  }

  handlePathChange = value => {
    this.setState({ path: value })
  }

  handleSubmit = evt => {
    evt.preventDefault()
    this.update()
  }

  handleClick = () => {
    this.update()
  }
}

export default connect(state => ({
  path: state.config.data.config_path
    .replace('/.loanerdata', '')
}))(Settings)
