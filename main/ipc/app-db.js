const low = require('lowdb')

let db = null

module.exports = {
  instance() {
    return db
  },

  set(location) {
    db = low(location)

    db._.mixin(require('lodash-id'))

    db.defaults({
      debts: [],
      transactions: [],
      debtors: []
    }).write()

    return db
  }
}
