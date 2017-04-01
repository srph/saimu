import groupBy from 'lodash/groupBy'

export function transform(debt) {
  return {
    ...debt,
    created_at: new Date(debt.created_at),
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
  return debts.find(debt => debt.id === props.routeParams.debtId)
}