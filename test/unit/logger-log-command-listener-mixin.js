import assert from 'assert'
import sinon from 'sinon'
import EventEmitter from 'events'
import LoggerInterface from '../../src/logger-interface'
import DummyLogger from '../support/dummy-logger'
import LoggerLogCommandListenerMixin from '../../src/logger-log-command-listener-mixin'
import LogCommandListener from '../../src/log-command-listener'

class DummyListener {
  listen () {}
}

describe('logger-log-command-listener-mixin', function () {
  beforeEach(function () {
    const EventedLogger = LoggerLogCommandListenerMixin.mix(DummyLogger)

    this.sandbox = sinon.sandbox.create()

    this.emitter = new EventEmitter()
    this.logCommandListener = new LogCommandListener(this.emitter)
    this.provider = new DummyLogger()

    this.logger = new EventedLogger({
      logCommandListener: this.logCommandListener,
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

    this.emitter.emit('message', 'logger:reopen-file-streams')
    await new Promise(resolve => resolve())

    assert.ok(loggerReopenFileStreamSpy.calledOnce)
  })

  it('should not reopen streams when event is emitted witn another command', async function () {
    const loggerReopenFileStreamSpy = this.sandbox.spy(this.logger, 'reopenFileStreams')

    this.emitter.emit('message', 'wadus')
    await new Promise(resolve => resolve())

    assert.ok(loggerReopenFileStreamSpy.notCalled)
  })

  it('should not attach handler to emitter', async function () {
    const EventedLogger = LoggerLogCommandListenerMixin.mix(DummyLogger)

    this.emitter = new EventEmitter()
    this.logCommandListener = new DummyListener(this.emitter)
    this.provider = new DummyLogger()

    const logCommandListenerListenSpy = this.sandbox.spy(this.logCommandListener, 'listen')

    this.logger = new EventedLogger({
      logCommandListener: this.logCommandListener,
      provider: this.provider
    })

    assert.ok(logCommandListenerListenSpy.notCalled)
  })
})
