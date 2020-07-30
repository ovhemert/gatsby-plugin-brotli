'use strict'

const glob = require('glob')
const path = require('path')
const util = require('util')

const Piscina = require('piscina')

const defaultOptions = {
  extensions: ['css', 'js'],
  path: ''
}

const globAsync = util.promisify(glob)

async function onPostBuild ({ reporter }, pluginOptions) {
  const options = { ...defaultOptions, ...pluginOptions }

  // get the files
  const fileBasePath = path.join(process.cwd(), 'public')
  const patternExt = (options.extensions.length > 1) ? `{${options.extensions.join(',')}}` : options.extensions[0]
  const pattern = `**/*.${patternExt}`
  const files = await globAsync(pattern, { cwd: fileBasePath, ignore: '**/*.br', nodir: true })

  // compress using worker pool
  const pool = new Piscina({ filename: path.resolve(__dirname, 'worker.js') })
  const compress = files.map(file => pool.runTask({ file, options }))
  await Promise.all(compress)

  reporter.info(`Brotli compressed ${pool.completed} files - ${(pool.duration / 1000).toFixed(3)}s - ${(pool.runTime.average / 1000).toFixed(3)}/s`)
}

exports.onPostBuild = onPostBuild
