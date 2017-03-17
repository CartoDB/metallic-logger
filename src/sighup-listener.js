import { ListenerAbstract } from 'metallic-listeners'

export default class SighupListener extends ListenerAbstract {
  constructor (emitter, logger) {
    super(emitter, logger)
    this.event = 'SIGHUP'
  }

  listen (reopenFileStreams) {
    const sighupListener = () => reopenFileStreams()

    this.handler = sighupListener
    super.listen()
  }
}
