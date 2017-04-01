import React from 'react'
import c from 'classnames'

export default function DebtStatus({debt, tooltip = false}) {
  if (!debt.transactions.length) {
    return <span className="tag-type -danger">
      Unpaid
    </span>
  }

  const paid = debt.transactions
    .map(transaction => transaction.amount)
    .reduce((prev, next) => prev + next)

  if (paid < debt.amount) {
    return <span className={c('tag-type', { 'hint--right': tooltip })} aria-label={tooltip && `${paid} out of ${debt.amount}`}>
      Partial
    </span>
  }

  return <span className="tag-type -success">
    Paid
  </span>
}
