import LoggerInterface from './logger-interface'

export default class DummyLogger extends LoggerInterface {
  reopenFileStreams () {}

  child () {
    return this
  }

  debug () {}

  log () {}

  info () {}

  warn () {}

  error () {}
}
