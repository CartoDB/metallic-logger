import { ListenerInterface } from 'metallic-listeners'

export default class LoggerSighupListenerMixin {
  static mix (superclass) {
    return class extends superclass {
      constructor (sighupListener, ...args) {
        super(...args)

        if (sighupListener instanceof ListenerInterface) {
          this.sighupListener = sighupListener
          this.sighupListener.listen(() => this.reopenFileStreams())
        }
      }
    }
  }
}
