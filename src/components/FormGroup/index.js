import React, {Component} from 'react'

/**
 *
 *       <FormGroup
 *         error={errors.x}
 *         label="Amount"
 *         input={} />
  */
class FormGroup extends Component {
  render() {
    const {label, input, errors} = this.props

    return (
      <div className="form-group">
        <label>{label}</label>
        {input}
        {Boolean(errors) ? <p className="message">{errors[0]}</p> : null}
      </div>
    );
  }
}

export default FormGroup