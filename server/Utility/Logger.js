const chalk = require('chalk')

// Console Logger
module.exports = {

  goodRequest: (function_name, params) => {
    console.log(`\n${chalk.green(`Request received: ${function_name}()`)}`)

    if (params != null && params != undefined) {
      for (let i in params) {

        let param = params[i]
        console.log(`\t${chalk.blue(param.key)}: ${param.value}`)

      }
    }
  },

  badRequest: (function_name, params) => {
    console.log(`${chalk.red(`\nInvalid Request received: ${function_name}`)}`)

    if (params != null && params != undefined) {
      for (let i in params) {

        let param = params[i]
        console.log(`\t${chalk.orange(param.key)}: ${param.value}`)

      }
    }
  },

  success: (message, _prefix_) => {
    if (_prefix_)
      console.log(`${_prefix_}${chalk.green(message)}`)
    else console.log(`${chalk.green(message)}`)
  },

  error: (message, _prefix_) => {
    if (_prefix_)
      console.log(`${_prefix_}${chalk.red('Error: ')}${message}`)
    else console.log(`${chalk.red(message)}`)
  }
}
