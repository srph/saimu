import React from 'react'
import {Link} from 'react-router'
import tinytime from 'tinytime'
import numeral from 'numeral'
import Create from './Create'

function Transactions({transactions, creating, onCreate}) {
  if (!transactions.length && !creating) {
    return (
      <div className="empty-state -full">
        <div className="symbol">
          <div className="icon">
            <i className="fa fa-thumbs-o-up" />
          </div>
        </div>

        <h5 className="main">
          No transactions
        </h5>

        <h2 className="sub">
          There doesn't seem to be any progress in here yet.
        </h2>
      </div>
    )
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Amount</th>
          <th>Date Added</th>
          <th>Note</th>
          <th width="40">&nbsp;</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((transaction, i) =>
          <tr key={i}>
            <td>{numeral(transaction.amount).format('0,0')}</td>
            <td>{tinytime('{MMMM} {DD}').render(transaction.created_at)}</td>
            <td>{transaction.note}</td>
            <td width="40">&nbsp;</td>
          </tr>
        )}

        {creating && <Create onCreate={onCreate} />}
      </tbody>
    </table>    
  )
}

export default Transactions