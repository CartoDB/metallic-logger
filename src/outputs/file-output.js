import LoggerOutputInterface from './logger-output-interface'

export default class FileOutput extends LoggerOutputInterface {
  constructor (enabled, path) {
    super()
    this.level = 'info'
    this.enabled = enabled
    this.path = path
  }

  isAvailable () {
    const { NODE_ENV } = process.env
    return this.enabled && NODE_ENV !== 'development' && NODE_ENV !== undefined
  }
}
