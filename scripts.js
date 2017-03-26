ipc.send('debts:create', {
  debtor_id: "1",
  amount: 5000.00,
  note: "November Salary",
  created_at: +new Date()
})

ipc.send('transactions:create', {
  debt_id: "674b7cad-751a-4565-9e22-45cee58b2119",
  amount: 800,
  note: "December Salary",
  created_at: +new Date()
})

ipc.send('transactions:create', {
  debt_id: "0321ce0d-6f4e-4d75-a2ff-0a6c77d3c253",
  amount: 800,
  note: "December Salary",
  created_at: +new Date()
})
