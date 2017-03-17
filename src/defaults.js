import path from 'path'
import readPkgUp from 'read-pkg-up'

const pkg = readPkgUp.sync({
  cwd: process.cwd(),
  normalize: false
}).pkg

export default {
  enabled: true,
  console: (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined),
  path: path.join(process.cwd(), pkg.name + '.log')
}
