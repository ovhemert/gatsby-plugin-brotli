const fs = require('fs')
const path = require('path')
const sinon = require('sinon')
const test = require('tap').test

const TEST_DIR = {
  public: {
    'test.css': 'contents of a .css file',
    'test.html': 'contents of a .html file',
    'test.js': 'contents of a .js file'
  }
}

const tested = require('../src/brotli-plugin')

test('compress only default extensions', t => {
  const cwd = t.testdir(TEST_DIR)
  const args = { reporter: { info: sinon.fake() } }
  tested.onPostBuild(args, { cwd })
    .then(res => {
      t.ok(fs.existsSync(path.join(cwd, 'public/test.css.br')))
      t.ok(fs.existsSync(path.join(cwd, 'public/test.js.br')))
      t.notOk(fs.existsSync(path.join(cwd, 'public/test.html.br')))
    })
    .catch(err => t.fail(err))
    .finally(() => t.end())
})

test('compress only single extension', t => {
  const cwd = t.testdir(TEST_DIR)
  const args = { reporter: { info: sinon.fake() } }
  tested.onPostBuild(args, { cwd, extensions: ['css'] })
    .then(res => {
      t.ok(fs.existsSync(path.join(cwd, 'public/test.css.br')))
      t.notOk(fs.existsSync(path.join(cwd, 'public/test.js.br')))
      t.notOk(fs.existsSync(path.join(cwd, 'public/test.html.br')))
    })
    .catch(err => t.fail(err))
    .finally(() => t.end())
})
