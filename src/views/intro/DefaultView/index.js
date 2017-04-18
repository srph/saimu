import React from 'react'

function DefaultView({dispatch}) {
  return (
    <section className="intro-section">
      <h5 className="heading">Database File</h5>

      <p className="text">
        By default, your file is stored in ~/.loaner, but you may customize this later to any location you see fit.
      </p>

      <div className="actions">
        <button
          onClick={() => dispatch({ type: 'config:customize' })}
          type="button"
          className="button -clear -paddingless">
          Customize now
        </button>

        <button
          onClick={() => dispatch({ type: 'config:create!' })}
          type="button"
          className="button -success -paddingless">
          Nah, just proceed
          <i className="fa fa-angle-right iconright" />
        </button>
      </div>
    </section>
  )
}

export default DefaultView
