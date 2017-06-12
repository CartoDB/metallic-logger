import assert from 'assert'
import sinon from 'sinon'
import EventEmitter from 'events'
import LoggerInterface from '../../src/logger-interface'
import DummyLogger from '../support/dummy-logger'
import LoggerSighupListenerMixin from '../../src/logger-sighup-listener-mixin'
import SighupListener from '../../src/sighup-listener'

class DummyListener {
  listen () {}
}

describe('logger-sighup-listener-mixin', function () {
  beforeEach(function () {
    const EventedLogger = LoggerSighupListenerMixin.mix(DummyLogger)

    this.sandbox = sinon.sandbox.create()

    this.emitter = new EventEmitter()
    this.sighupListener = new SighupListener(this.emitter)
    this.provider = new DummyLogger()

    this.logger = new EventedLogger({
      sighupListener: this.sighupListener,
      provider: this.provider
    })
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it(`should implement ${LoggerInterface.name}`, function () {
    assert.ok(this.logger instanceof LoggerInterface)
  })

  it('should reopen file streams when message event is emitted', async function () {
    const loggerReopenFileStreamSpy = this.sandbox.spy(this.logger, 'reopenFileStreams')

    this.emitter.emit('SIGHUP')
    await new Promise(resolve => resolve())

    assert.ok(loggerReopenFileStreamSpy.calledOnce)
  })

  it('should not attach handler to emitter', async function () {
    const EventedLogger = LoggerSighupListenerMixin.mix(DummyLogger)

    this.emitter = new EventEmitter()
    this.sighupListener = new DummyListener(this.emitter)
    this.provider = new DummyLogger()

    const sighupListenerListenSpy = this.sandbox.spy(this.sighupListener, 'listen')

    this.logger = new EventedLogger({
      sighupListener: this.sighupListener,
      provider: this.provider
    })

    assert.ok(sighupListenerListenSpy.notCalled)
  })
})
