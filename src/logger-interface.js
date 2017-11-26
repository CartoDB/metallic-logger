import { AbstractClassError, UnimplementedError } from 'metallic-errors'
import { RunnerInterface } from 'metallic-interfaces'

export default class LoggerInterface extends RunnerInterface {
  constructor () {
    if (new.target === LoggerInterface) {
      throw new AbstractClassError(LoggerInterface.name)
    }
    super()
  }

  reopenFileStreams () {
    throw new UnimplementedError()
  }

  debug () {
    throw new UnimplementedError()
  }

  log () {
    throw new UnimplementedError()
  }

  info () {
    throw new UnimplementedError()
  }

  warn () {
    throw new UnimplementedError()
  }

  error () {
    throw new UnimplementedError()
  }
}
