import assert from 'assert'
import LoggerFactory, { LoggerInterface } from '../../src'

describe('logger-factory', function () {
  it('.create() should return a Logger instance', function () {
    const options = {
      name: 'wadus',
      extra: {
        role: 'wadus-role'
      }
    }
    const logger = LoggerFactory.create({ options })

    assert.ok(logger instanceof LoggerInterface)
  })

  it('.create() should return "undefined" when disabled', function () {
    const options = {
      enabled: false,
      name: 'wadus',
      extra: {
        role: 'wadus-role'
      }
    }
    const logger = LoggerFactory.create({ options })

    assert.ok(logger === undefined)
  })
})
