import { ListenerAbstract } from 'metallic-listeners'

export default class DummyListener extends ListenerAbstract {
  constructor (emitter) {
    super(emitter, 'message')
    this.command = 'wadus'
  }
}
