import groupBy from 'lodash/groupBy'

export function transform(debt) {
  const paid = debt.transactions
    .map(transaction => transaction.amount)
    .reduce((prev, next) => prev + next, 0)

  return {
    ...debt,
    created_at: new Date(debt.created_at),
    paid: paid,
    remaining: Math.max(debt.amount - paid, debt.amount),
    isPaid: paid >= debt.amount,
    isPartial: Boolean(debt.transactions.length) && paid < debt.amount,
    isUntouched: !Boolean(debt.transactions.length),
    transactions: debt.transactions.map(transaction => ({
      ...transaction,
      created_at: new Date(transaction.created_at)
    }))
  }
}

export function mapTransform(debts) {
  return debts.map(transform)
}

export function groupByYear(debts) {
  return groupBy(debts, (debt) => {
    return debt.created_at.getFullYear()
  })
}

export function getById(debts, id) {
  return debts.find(debt => debt.id === id)
}