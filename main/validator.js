const Validator = require('validatorjs')
const fs = require('fs')

Validator.register('fs-accessible', function(value, requirement, attribute) {
  console.log('fs: accessible')

  try {
    fs.accessSync(value, fs.constants.R_OK | fs.constants.W_OK)
  } catch(e) {
    return false
  }

  return true
}, 'The provided file directory is not accessible.')
