import React from 'react';
import numeral from 'numeral'

function Remaining({debt}) {
  const paid = debt.transactions
    .map(transaction => transaction.amount)
    .reduce((prev, next) => prev + next, 0)

  if (!debt.transactions.length || paid >= debt.amount) {
    return null;
  }

  return <span className="info">
    {numeral(paid).format('0,0')}&nbsp;
    <span className="highlight">Out Of</span>&nbsp;
    {numeral(debt.amount).format('0,0')}
  </span>
}

export default Remaining
