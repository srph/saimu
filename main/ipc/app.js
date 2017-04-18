const ipc = require('../wrapped')
const db = require('./app-db')

ipc.on('debtors:get', (event) => {
  const debtors = db.instance().get('debtors').value()
  event.sender.send('debtors:get', debtors)
})

ipc.on('debtors:create', (event, data) => {
  let debtor = db.instance().get('debtors')
    .insert({
      name: data.name,
      remaining: 0,
      created_at: +new Date()
    })
    .write()

  event.sender.send('debtors:create', debtor)
})

ipc.on('debts:get', (event, id) => {
  const debts = db.instance().get('debts')
    .filter({ debtor_id: id })
    .value()
    .map(debt => ({
      ...debt,
      transactions: db.instance().get('transactions')
        .filter({ debt_id: debt.id })
        .value()
    }))

  event.sender.send('debts:get', debts)
});

ipc.on('debts:create', (event, data) => {
  const amount = parseInt(data.amount, 10)

  const debt = db.instance().get('debts')
    .insert({
      debtor_id: data.debtor_id,
      amount,
      note: data.note,
      created_at: +new Date()
    })
    .write()

  db.instance().get('debtors')
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

  const transaction = db.instance().get('transactions')
    .insert({
      debt_id: data.debt_id,
      amount: amount,
      note: data.note,
      created_at: +new Date()
    })
    .write()

  const debt = db.instance().get('debts')
    .find({ id: data.debt_id })
    .value()

  db.instance().get('debtors')
    .find({ id: debt.debtor_id })
    .update('remaining', remaining => Math.max(remaining - amount, 0))
    .write()

  event.sender.send('transactions:create', transaction)
})
