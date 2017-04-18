import React, {Component} from 'react'

export default class FileInput extends Component {
  file = null

  render() {
    const {value} = this.props

    return (
      <div aria-label={value} className="form-combo hint--bottom">
        <input readOnly
          type="text"
          className="input"
          value={value}
          placeholder="Select a directory" />

        <div className="addon">
          <button
            onClick={this.handleClick}
            type="button"
            className="button -sub -x-small">
            Browse
          </button>
        </div>

        <input type="file"
          ref={node => {
            if (node) {
              node.webkitdirectory = true
              this.file = node
            }
          }}
          onChange={this.handleChange}
          style={{ display: 'none' }} />
      </div>
    );
  }

  handleClick = () => {
    this.file.click()
  }

  handleChange = (evt) => {
    const path = evt.target.files

    if (path.length) {
      this.props.onChange(path[0].path)
    }
  }
}
