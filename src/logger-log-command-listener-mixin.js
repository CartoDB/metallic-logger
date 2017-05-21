import { ListenerInterface } from 'metallic-listeners'

export default class LoggerLogCommandListenerMixin {
  static mix (superclass) {
    return class extends superclass {
      constructor (logCommandListener, ...args) {
        super(...args)

        if (logCommandListener instanceof ListenerInterface) {
          this.logCommandListener = logCommandListener
          this.logCommandListener.listen(command => {
            return command === this.logCommandListener.command
              ? this.reopenFileStreams()
              : undefined
          })
        }
      }
    }
  }
}
