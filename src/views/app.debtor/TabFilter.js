import React, {PropTypes as T} from 'react'
import {Link} from 'react-router'
import c from 'classnames'

function TabFilter(props, {location}) {
  const path = location.pathname
  const {type} = location.query

  return (
    <div className="tab-nav u-spacer-large">
      <Link to={`${path}`} className={c({ '-active': !Boolean(type) })}>All</Link>
      <Link to={`${path}?type=1`} className={c({ '-active': type == 1 })}>Paid</Link>
      <Link to={`${path}?type=2`} className={c({ '-active': type == 2 })}>Partial</Link>
      <Link to={`${path}?type=3`} className={c({ '-active': type == 3 })}>Unpaid</Link>
    </div>
  )
}

TabFilter.contextTypes = {
  location: T.object
}

export default TabFilter
