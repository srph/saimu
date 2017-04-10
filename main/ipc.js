const ipc = require('./wrapped')

const low = require('lowdb')
const db = low('dummy.json')
db._.mixin(require('lodash-id'))

db.defaults({
  debts: [],
  transactions: [],
  debtors: []
}).write()

ipc.on('debtors:get', (event) => {
  const debtors = db.get('debtors').value()
  event.sender.send('debtors:get', debtors)
})

ipc.on('debtors:create', (event, data) => {
  let debtor = db.get('debtors')
    .insert({
      name: data.name,
      remaining: 0,
      created_at: +new Date()
    })
    .write()

  event.sender.send('debtors:create', debtor)
})


ipc.on('debts:get', (event, id) => {
  const debts = db.get('debts')
    .filter({ debtor_id: id })
    .value()
    .map(debt => ({
      ...debt,
      transactions: db.get('transactions')
        .filter({ debt_id: debt.id })
        .value()
    }))

  event.sender.send('debts:get', debts)
});

ipc.on('debts:create', (event, data) => {
  const amount = parseInt(data.amount, 10)

  const debt = db.get('debts')
    .insert({
      debtor_id: data.debtor_id,
      amount,
      note: data.note,
      created_at: +new Date()
    })
    .write()

  db.get('debtors')
    .find({ id: data.debtor_id })
    .update('remaining', remaining => remaining + amount)
    .write()

  event.sender.send('debts:create', {
    ...debt,
    transactions: []
  })
})

ipc.on('transactions:create', (event, data) => {
  const amount = parseInt(data.amount, 10)

  const transaction = db.get('transactions')
    .insert({
      debt_id: data.debt_id,
      amount: amount,
      note: data.note,
      created_at: +new Date()
    })
    .write()

  const debt = db.get('debts')
    .find({ id: data.debt_id })
    .value()

  db.get('debtors')
    .find({ id: debt.debtor_id })
    .update('remaining', remaining => Math.max(remaining - amount, 0))
    .write()

  event.sender.send('transactions:create', transaction)
})
