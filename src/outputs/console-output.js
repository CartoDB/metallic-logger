import LoggerOutputInterface from './logger-output-interface'

export default class ConsoleOutput extends LoggerOutputInterface {
  constructor (enabled = true) {
    super()
    this.level = 'debug'
    this.stream = process.stdout
    this.enabled = enabled
  }

  isAvailable () {
    const { NODE_ENV } = process.env
    return this.enabled && (NODE_ENV === 'development' || NODE_ENV === undefined)
  }
}
