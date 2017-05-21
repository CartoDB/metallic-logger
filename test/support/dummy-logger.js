import LoggerInterface from '../../src/logger-interface'

export default class DummyLogger extends LoggerInterface {
  reopenFileStreams () {}
  debug () {}
  log () {}
  info () {}
  warn () {}
  error () {}
}
