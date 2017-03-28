import React from 'react';

export default function DebtStatus({debt}) {
  if (!debt.transactions.length) {
    return <span className="tag-type -danger">
      Unpaid
    </span>
  }

  const paid = debt.transactions
    .map(transaction => transaction.amount)
    .reduce((prev, next) => prev + next)

  if (paid < debt.amount) {
    return <span className="tag-type">
      Partial
    </span>
  }

  return <span className="tag-type -success">
    Paid
  </span>
}
