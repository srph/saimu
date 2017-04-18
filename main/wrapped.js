import {ipcMain as ipc} from 'electron'
import Validator from 'validatorjs'
const ValidationError = Error.extend('ValidationError')

const wrapped = {
  on(type, cb) {
    ipc.on(type, (event, data) => {
      data = data || {}

      try {
        validate(type, data)
      } catch(e) {
        event.sender.send(type, {
          error: true,
          message: 'There were some problems with your input.',
          errors: e.message
        })

        return
      }

      cb(event, data)
    })
  }
}

function validate(preset, data) {
  let validator

  switch(preset) {
    case 'debtors:create': {
      validator = new Validator(data, {
        name: 'required|min:3'
      })

      break
    }

    case 'debts:create': {
      validator = new Validator(data, {
        amount: 'required|numeric|min:20'
      })

      break
    }

    case 'transactions:create': {
      validator = new Validator(data, {
        debt_id: 'required',
        amount: 'required|numeric|min:20'
      })

      break
    }

    default: {
      return
    }
  }

  if (validator.fails()) {
    throw new ValidationError(validator.errors.all())
  }
}

module.exports = wrapped
