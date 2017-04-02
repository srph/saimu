import React from 'react'
import {Link} from 'react-router'

function Empty() {
  return (
    <div className="empty-state">
      <img src="img/formal.svg" className="symbol" />

      <h5 className="main">
        No debtors
      </h5>

      <h2 className="sub">
        You haven't registered a debtor yet!
      </h2>

      <div className="action">
        <Link to="/d/create" className="button -primary -rounded">
          New debtor
        </Link>
      </div>
    </div>
  )
}

export default Empty