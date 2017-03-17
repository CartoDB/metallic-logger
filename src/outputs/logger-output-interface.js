import { AbstractClassError, UnimplementedError } from 'metallic-errors'

export default class LoggerOutputInterface {
  constructor () {
    if (new.target === LoggerOutputInterface) {
      throw new AbstractClassError(LoggerOutputInterface.name)
    }
  }

  isAvailable () {
    throw new UnimplementedError()
  }
}
