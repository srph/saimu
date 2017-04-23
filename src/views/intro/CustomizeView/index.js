import React from 'react'
import FolderInput from 'app/components/FolderInput'

class CustomizeView extends React.Component {
  state = {
    path: ''
  }

  render() {
    const {dispatch} = this.props
    return (
      <section className="intro-section">
        <h5 className="heading">Database File</h5>

        <FolderInput value={this.state.path} onChange={this.handleChange} />

        <div className="actions">
          <button
            onClick={() => dispatch({ type: 'config:customize' })}
            type="button"
            className="button -clear -paddingless">
            Cancel
          </button>

          <button
            onClick={this.handleProceed}
            className="button -success -paddingless">
            Proceed
            <i className="fa fa-angle-right iconright" />
          </button>
        </div>
      </section>
    )
  }

  handleChange = (value) => {
    this.setState({ path: value })
  }

  handleProceed = () => {
    this.props.dispatch({
      type: 'config:create!',
      payload: this.state
    })
  }
}

export default CustomizeView
