import React from 'react'
import tinytime from 'tinytime'
import numeral from 'numeral'
import history from 'app/history'
import Status from 'app/components/DebtStatus'

function Debts({debtor, years, onClick}) {
  const keys = Object.keys(years)

  if (!keys.length) {
    // We'll assign the debtor's id so that we can force
    // an animation when viewing another debtor. Otherwise,
    // React diffs it as same.
    return (
      <div className="empty-state t-fade-in-late" key={debtor.id}>
        <div className="symbol">
          <div className="icon">
            <i className="fa fa-star-o" />
          </div>
        </div>

        <h5 className="main">
          Clear and tidy!
        </h5>

        <h2 className="sub">
          This debtor doesn't have any recorded debts yet!
        </h2>
      </div>
    )
  }

  return (
    <div className="t-fade-in-late" key={debtor.id}>
      {keys.map((year, i) =>
        <div className="main-content-section" key={i}>
          <h4 className="heading">
            {year}
          </h4>

          <table className="table -clickable">
            <thead>
              <tr>
                <th>Status</th>
                <th>Amount</th>
                <th>Date Added</th>
                <th>Note</th>
                <th>&nbsp;</th>
              </tr>
            </thead>

            <tbody>
              {years[year].map((debt, i) =>
                <tr onClick={() => onClick(debt.id)} key={i}>
                  <td>
                    <Status debt={debt} tooltip />
                  </td>
                  <td>
                    {numeral(debt.amount).format('0,0,00')}
                  </td>
                  <td>
                    {tinytime('{MMMM} {DD}').render(debt.created_at)}
                  </td>
                  <td>
                    {debt.note}
                  </td>
                  <td>&nbsp;</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Debts
