import React from 'react';
import numeral from 'numeral'

function Remaining({debt}) {
  if (debt.isPaid || debt.isUntouched) {
    return null;
  }

  return <span className="info">
    {numeral(debt.paid).format('0,0')}&nbsp;
    <span className="highlight">Out Of</span>&nbsp;
    {numeral(debt.amount).format('0,0')}
  </span>
}

export default Remaining
