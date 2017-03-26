import assert from 'assert'
import LoggerFactory, { LoggerInterface } from '../src'

describe('logger-factory', function () {
  it('.create() should return a Logger instance', function () {
    const logger = LoggerFactory.create({
      name: 'name',
      extra: {
        role: 'role'
      }
    })

    assert.ok(logger instanceof LoggerInterface)
  })

  it('.create() should return a Logger instance when disabled', function () {
    const logger = LoggerFactory.create({
      enabled: false,
      name: 'name',
      extra: {
        role: 'role'
      }
    })

    assert.ok(logger instanceof LoggerInterface)
  })
})
