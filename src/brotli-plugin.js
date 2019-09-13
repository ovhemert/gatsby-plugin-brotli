'use strict'

const glob = require('glob')
const path = require('path')
const util = require('util')
const workerFarm = require('worker-farm')
const worker = require.resolve('./worker')

const defaultOptions = {
  extensions: ['css', 'js'],
  path: ''
}

const globAsync = util.promisify(glob)

async function onPostBuild (args, pluginOptions) {
  const options = { ...defaultOptions, ...pluginOptions }
  const fileBasePath = path.join(process.cwd(), 'public')
  const patternExt = (options.extensions.length > 1) ? `{${options.extensions.join(',')}}` : options.extensions[0]
  const pattern = `**/*.${patternExt}`

  const files = await globAsync(pattern, { cwd: fileBasePath, ignore: '**/*.br', nodir: true })
  const tmrStart = new Date().getTime()

  const compress = files.map(file => {
    return new Promise((resolve, reject) => {
      worker(file, pluginOptions, err => err ? reject(err) : resolve())
    })
  })
  await Promise.all(compress)
  workerFarm.end(worker)

  const tmrEnd = new Date().getTime()
  console.log(`Brotli compressed ${files.length} files in ${(tmrEnd - tmrStart) / 1000} s`)
}

exports.onPostBuild = onPostBuild
