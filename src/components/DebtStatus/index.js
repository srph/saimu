import React from 'react'
import c from 'classnames'

export default function DebtStatus({debt, tooltip = false}) {
  if (debt.isUntouched) {
    return <span className="tag-type -danger">
      Unpaid
    </span>
  }

  if (debt.isPartial) {
    return <span className={c('tag-type', { 'hint--right': tooltip })} aria-label={tooltip && `${debt.paid} out of ${debt.amount}`}>
      Partial
    </span>
  }

  return <span className="tag-type -success">
    Paid
  </span>
}
