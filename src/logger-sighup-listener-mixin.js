import { ListenerInterface } from 'metallic-listeners'

export default class LoggerSighupListenerMixin {
  static mix (superclass) {
    return class extends superclass {
      constructor ({ sighupListener }) {
        super(...arguments)

        if (sighupListener instanceof ListenerInterface) {
          this.sighupListener = sighupListener
          this.sighupListener.listen(() => this.reopenFileStreams())
        }
      }
    }
  }
}
