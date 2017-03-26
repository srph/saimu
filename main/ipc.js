const ipc = require('electron').ipcMain

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

ipc.on('debts:get', (event, id) => {
  const debts = db.get('debts')
    .filter({ debtor_id: id })
    .value() || []

  debts.forEach(debt => {
    debt.transactions = db.get('transactions')
      .find({ debt_id: debt.id })
      .value()
  })

  event.sender.send('debts:get', debts)
});

ipc.on('debts:create', (event, data) => {
  let debt = db.get('debts')
    .insert(data)
    .write()

  event.sender.send('debts:create', debt)
})

ipc.on('transactions:create', (data) => {
  let transaction = db.get('transactions')
    .insert(data)
    .write()

  event.sender.send('transactions:create', transaction)
})

ipc.on('debtors:create', (data) => {
  let debtor = db.get('debtors')
    .insert(data)
    .write()

  event.sender.send('debtors:create', debtor)
})
