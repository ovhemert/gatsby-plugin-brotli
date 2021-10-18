const fs = require('fs')
const path = require('path')
const test = require('tap').test
const zlib = require('zlib')

const tested = require('../src/worker')

test('brotli compresses test file', t => {
  const cwd = t.testdir({
    public: {
      'test.js': 'contents'
    }
  })
  const from = path.join(cwd, 'public/test.js')
  const to = path.join(cwd, 'public/test.js.br')
  const level = zlib.constants.BROTLI_MAX_QUALITY

  tested({ from, to, level })
    .then(res => {
      const compressed = path.join(cwd, 'public/test.js.br')
      t.ok(fs.existsSync(compressed))
    })
    .catch(err => t.fail(err))
    .finally(() => t.end())
})
