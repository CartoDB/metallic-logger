import LoggerInterface from './logger-interface'

export default class Logger extends LoggerInterface {
  constructor (logger) {
    super()
    this.provider = logger
  }

  reopenFileStreams () {
    this.provider.reopenFileStreams()
  }

  child (requestId) {
    return this.provider.child({ requestId })
  }

  debug () {
    this.provider.debug(...arguments)
  }

  log () {
    this.provider.info(...arguments)
  }

  info () {
    this.provider.info(...arguments)
  }

  warn () {
    this.provider.warn(...arguments)
  }

  error () {
    this.provider.error(...arguments)
  }
}
