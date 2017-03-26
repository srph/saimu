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

ipc.on('debtors:create', (event, data) => {
  let debtor = db.get('debtors')
    .insert(data)
    .write()

  event.sender.send('debtors:create', debtor)
})


ipc.on('debts:get', (event, id) => {
  const debts = db.get('debts')
    .filter({ debtor_id: id })
    .value()

  debts.forEach(debt => {
    debt.transactions = db.get('transactions')
      .filter({ debt_id: debt.id })
      .value()
  })

  event.sender.send('debts:get', debts)
});

ipc.on('debts:create', (event, data) => {
  let debt = db.get('debts')
    .insert({
      debtor_id: data.debtor_id,
      amount: parseInt(data.amount, 10),
      note: data.note,
      created_at: +new Date()
    })
    .write()

  debt.transactions = []

  event.sender.send('debts:create', debt)
})

ipc.on('transactions:create', (event, data) => {
  let transaction = db.get('transactions')
    .insert(data)
    .write()

  event.sender.send('transactions:create', transaction)
})
