import Bunyan from 'bunyan'
import { Listeners } from 'metallic-listeners'
import Logger from './logger'
import DisabledLogger from './disabled-logger'
import LoggerOutputs from './outputs/logger-outputs'
import ConsoleOutput from './outputs/console-output'
import FileOutput from './outputs/file-output'
import SighupListener from './sighup-listener'
import LogCommandListener from './log-command-listener'
import defaults from './defaults'

export { default as LoggerInterface } from './logger-interface'

export default class LoggerFactory {
  static create (opts) {
    const options = { ...opts, ...defaults }
    const dummyLogger = new DisabledLogger()

    if (!options.enabled) {
      return dummyLogger
    }

    const path = options.path
    const consoleEnabled = options.console

    const loggerOutputs = new LoggerOutputs()
      .add(new ConsoleOutput(consoleEnabled))
      .add(new FileOutput(path))

    const bunyan = Bunyan.createLogger({
      name: options.name,
      streams: loggerOutputs.toArray(),
      serializers: Bunyan.stdSerializers,
      ...options.extra
    })

    const reopenFileStreamsListeners = new Listeners()
      .add(new SighupListener(process, dummyLogger))
      .add(new LogCommandListener(process, dummyLogger))

    return new Logger(bunyan, reopenFileStreamsListeners)
  }
}
