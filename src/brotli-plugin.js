'use strict'

const glob = require('glob')
const path = require('path')
const util = require('util')
const compressFile = require('./compressFile')

const defaultOptions = {
  extensions: ['css', 'js'],
  path: '',
  parallel: false
}

const globAsync = util.promisify(glob)

async function onPostBuild (args, pluginOptions) {
  const options = { ...defaultOptions, ...pluginOptions }
  const fileBasePath = path.join(process.cwd(), 'public')
  const patternExt = (options.extensions.length > 1) ? `{${options.extensions.join(',')}}` : options.extensions[0]
  const pattern = `**/*.${patternExt}`

  const files = await globAsync(pattern, { cwd: fileBasePath, ignore: '**/*.br', nodir: true })
  if (!options.parallel) {
    const compress = files.map(file => {
      return compressFile(file, pluginOptions)
    })
    return Promise.all(compress)
  } else {
    const workerFarm = require('worker-farm')
    const workers = workerFarm(require.resolve('./worker'))
    const compress = files.map(file => {
      return new Promise((resolve, reject) => {
        workers(file, pluginOptions, err => err ? reject(err) : resolve())
      })
    })
    await Promise.all(compress)
    workerFarm.end(workers)
  }
}

exports.onPostBuild = onPostBuild
