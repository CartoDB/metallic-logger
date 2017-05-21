import { FactoryInterface } from 'metallic-interfaces'
import Bunyan from 'bunyan'
import Logger from './logger'
import LoggerOutputs from './outputs/logger-outputs'
import ConsoleOutput from './outputs/console-output'
import FileOutput from './outputs/file-output'
import SighupListener from './sighup-listener'
import LoggerSighupListenerMixin from './logger-sighup-listener-mixin'
import LogCommandListener from './log-command-listener'
import LoggerLogCommandListenerMixin from './logger-log-command-listener-mixin'
import defaults from './defaults'

export default class LoggerFactory extends FactoryInterface {
  static create (opts) {
    const options = { ...defaults, ...opts }

    if (!options.enabled) {
      return
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

    const sighupListener = new SighupListener(process)
    const logCommandListener = new LogCommandListener(process)
    const EventedLogger = LoggerSighupListenerMixin.mix(
      LoggerLogCommandListenerMixin.mix(
        Logger
      )
    )

    return new EventedLogger(sighupListener, logCommandListener, bunyan)
  }
}
