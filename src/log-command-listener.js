import { ListenerAbstract } from 'metallic-listeners'

export default class LogCommandListener extends ListenerAbstract {
  constructor (emitter, logger) {
    super(emitter, logger)
    this.event = 'message'
    this.command = 'logger:reopen-file-streams'
  }

  listen (reopenFileStreams) {
    const reopenFileStreamsListener = command => command === this.command
        ? reopenFileStreams()
        : undefined

    this.handler = reopenFileStreamsListener
    super.listen()
  }
}
