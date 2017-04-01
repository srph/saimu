export function getById(debts, id) {
  return debts.find(debt => debt.id === id)
}